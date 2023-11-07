const {
  createTransactions,
  getAllTransactions,
  getDetailTransactions,
} = require('../libs/transactions.libs');

module.exports = {
  createTransaction: async (req, res, next) => {
    try {
      let { source_account_id, destination_account_id, amount } = req.body;

      try {
        let transaction = await createTransactions({
          data: {
            source_account_id,
            destination_account_id,
            amount,
          },
        });

        return res.status(201).json({
          status: false,
          message: 'OK',
          data: transaction,
        });
        r;
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null,
        });
      }
    } catch (err) {
      next(err);
    }
  },

  getAllTransaction: async (req, res, next) => {
    try {
      const { id } = req.params;

      try {
        const transaction = await getAllTransactions(Number(id));

        return res.status(200).json({
          status: false,
          message: 'OK',
          data: transaction,
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null,
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err,
        data: null,
      });
    }
  },

  getDetailTransaction: async (req, res, next) => {
    try {
      const { id } = req.params;

      try {
        const transaction = await getDetailTransactions(Number(id));

        return res.status(200).json({
          status: false,
          message: 'OK',
          data: transaction,
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null,
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err,
        data: null,
      });
    }
  },
};
