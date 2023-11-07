const {
  createUsers,
  getAllUsers,
  getDetailUsers,
  deleteUsers,
} = require('../libs/users.libs');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      let { name, email, password,profile } = req.body;

      try {
        let user = await createUsers({
          data: {
            name: name,
            email: email,
            password: password,
            profile: {
              create: profile,
            },
          },
        });

        return res.status(201).json({
          status: false,
          message: 'OK',
          data: user,
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

  getAllUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      try {
        const user = await getAllUsers(Number(id));

        return res.status(200).json({
          status: false,
          message: 'OK',
          data: user,
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

  getDetailUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      try {
        const user = await getDetailUsers(Number(id));

        return res.status(200).json({
          status: false,
          message: 'OK',
          data: user,
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

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      try {
        const user = await updateUsers(Number(id), { name, email, password });

        return res.status(200).json({
          status: false,
          message: 'OK',
          data: user,
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

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      try {
        const user = await deleteUsers(Number(id));

        return res.status(200).json({
          status: false,
          message: 'OK',
          data: user,
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
