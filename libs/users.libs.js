const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getPagination } = require("../helpers/pagination");

module.exports = {
  createUsers: async (req, res, next) => {
    try {
      let { name, email, password, profile } = req.body;

      let newUsers = await prisma.users.create({
        data: {
          name: name,
          email: email,
          password: password,
          profile: {
            create: profile,
          },
        },
      });

      res.status(201).json({
        status: true,
        message: "User berhasil ditambahkan",
        data: newUsers,
      });
    } catch (err) {
      next(err);
    }
  },

  // all Users
  getAllUsers: async (req, res, next) => {
    try {
      let { limit = 10, page = 1 } = req.query;
      limit = Number(limit);
      page = Number(page);

      let users = await prisma.users.findMany({
        include: {
          profile: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      });
      const { _count } = await prisma.users.aggregate({
        _count: { id: true },
      });

      let pagination = getPagination(req, _count.id, page, limit);

      res.status(201).json({
        status: true,
        message: "OK",
        data: { pagination, users },
      });
    } catch (err) {
      next(err);
    }
  },

  //users detail by id
  getDetailUsers: async (req, res, next) => {
    try {
      let { id } = req.params;

      let users = await prisma.users.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          profile: true,
        },
      });

      if (!users) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          data: "Tidak ditemukan user dengan id: " + id,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  },

  // update
  updateUsers: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { name, email, password, profile, bank_accounts } = req.body;

      let updateOperation = await prisma.users.update({
        where: { id: parseInt(id) },
        data: {
          name,
          email,
          password,
        },
      });

      res.status(200).json({
        status: true,
        message: "Data berhasil diupdate",
        data: updateOperation,
      });
    } catch (err) {
      next(err);
    }
  },

  // delete
  deleteUsers: async (req, res, next) => {
    try {
      const { id } = req.params;
      const existingProfile = await prisma.profiles.findUnique({
        where: { user_id: Number(id) },
      });

      if (existingProfile) {
        await prisma.profiles.delete({
          where: { user_id: Number(id) },
        });
      }

      const deleteOperation = await prisma.users.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({
        status: true,
        message: "User berhasil dihapus",
        data: deleteOperation,
      });
    } catch (err) {
      next(err);
    }
  },
};
