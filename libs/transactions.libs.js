const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getPagination } = require("../helpers/pagination");

async function updateAccountBalance(accountId, amount, isIncrement) {
  return prisma.bankAccounts.update({
    where: { id: accountId },
    data: {
      balance: isIncrement ? { increment: amount } : { decrement: amount },
    },
  });
}

module.exports = {
  createTransactions: async (req, res, next) => {
    try {
      const { source_account_id, destination_account_id, amount } = req.body;

      const sourceAccount = await prisma.bankAccounts.findUnique({
        where: { id: source_account_id },
      });

      const destinationAccount = await prisma.bankAccounts.findUnique({
        where: { id: destination_account_id },
      });

      if (!sourceAccount || !destinationAccount) {
        return res.status(400).json({
          status: false,
          message: "akun tidak ada",
          data: null,
        });
      }

      if (sourceAccount.balance < amount) {
        return res.status(400).json({
          status: false,
          message: "Balance tidak tepat",
          data: null,
        });
      }

      await prisma.transactions.create({
        data: {
          source_account_id,
          destination_account_id,
          amount,
        },
      });

      await updateAccountBalance(source_account_id, amount, false);
      await updateAccountBalance(destination_account_id, amount, true);

      res.status(200).json({
        status: true,
        message: "Transaksi berhasil",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  },

  getAllTransactions: async (req, res, next) => {
    try {
      let { limit = 10, page = 1 } = req.query;
      limit = Number(limit);
      page = Number(page);

      const transactions = await prisma.transactions.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });

      const { _count } = await prisma.transactions.aggregate({
        _count: { id: true },
      });

      const pagination = getPagination(req, _count.id, page, limit);

      res.status(200).json({
        status: true,
        message: "OK",
        data: { pagination, transactions },
      });
    } catch (err) {
      next(err);
    }
  },

  getDetailTransactions: async (req, res, next) => {
    try {
      const { id } = req.params;

      const transactionWithDetails = await prisma.transactions.findUnique({
        where: { id: Number(id) },
        include: {
          source_account: true,
          destination_account: true,
        },
      });

      if (!transactionWithDetails) {
        return res.status(404).json({
          status: false,
          message: "Transaksi tidak ditemukan",
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: transactionWithDetails,
      });
    } catch (err) {
      next(err);
    }
  },
};
