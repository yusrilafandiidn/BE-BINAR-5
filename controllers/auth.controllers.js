const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getPagination } = require('../helpers/pagination');
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  register: async (req, res, next) => {
    try {
        await prisma.$connect();

        let { name, email, password, password_confirmation, profile } = req.body;

        if (password != password_confirmation) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                err: 'please ensure that the password and password confirmation match!',
                data: null,
            });
        }

        let userExist = await prisma.users.findUnique({ where: { email } });

        if (userExist) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                err: 'user has already been used!',
                data: null,
            });
        }

        let encryptedPassword = await bcrypt.hash(password, 10);

        // Create the user
        let userProfile = await prisma.users.create({
          data: {
            name,
            email,
            password: encryptedPassword,
            profile: {
              create: profile,
            },
          }
        });

        return res.status(201).json({
            status: true,
            message: 'User and profile created successfully',
            err: null,
            data: { profile: userProfile },
        });
    } catch (err) {
        next(err);
    } finally {
        await prisma.$disconnect();
    }
},

  login: async (req, res, next) => {
    try {
      let { email, password } = req.body;

      let user = await prisma.users.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          err: 'invalid email or password!',
          data: null,
        });
      }

      let isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          err: 'invalid email or password!',
          data: null,
        });
      }

      let token = jwt.sign({ id: user.id }, JWT_SECRET_KEY);

      return res.status(200).json({
        status: true,
        message: 'OK',
        err: null,
        data: { user, token },
      });
    } catch (err) {
      next(err);
    }
  },

  whoami: (req, res, next) => {
    return res.status(200).json({
      status: true,
      message: 'OK',
      err: null,
      data: { user: req.user },
    });
  },

  authenticateUser: (req, res, next) => {
    try {
      if (req.authenticationIsSuccessful()) {
        return res.status(200).json({
          status: true,
          message: 'Autentikasi berhasil',
          data: { user: req.user },
        });
      } else {
        return res.status(401).json({
          status: false,
          message: 'Autentikasi gagal',
          data: null,
        });
      }
    } catch (err) {
      next(err);
    } 
  },

  usersPagination: (req, res, next) => {
    try {
      if (req.usersPagination()) {
        return res.status(200).json({
          status: true,
          message: 'Autentikasi berhasil',
          data: { user: getPagination },
        });
      } else {
        return res.status(401).json({
          status: false,
          message: 'Autentikasi gagal',
          data: null,
        });
      }
    } catch (err) {
      next(err);
    } 
  },

  usersById: (req, res, next) => {
    try {
      if (req.usersById()) {
        return res.status(200).json({
          status: true,
          message: 'Autentikasi berhasil',
          data: { user: id },
        });
      } else {
        return res.status(401).json({
          status: false,
          message: 'Autentikasi gagal',
          data: null,
        });
      }
    } catch (err) {
      next(err);
    } 
  },
  
};
