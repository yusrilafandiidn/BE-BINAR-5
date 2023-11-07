const {createAccounts, getAllAccounts, getDetailAccounts, updateAccounts, deleteAccounts} = require('../libs/accounts.libs');
  
  module.exports = {
    createAccount: async (req, res, next) => {
      try {
        let { user_id, bank_name, bank_account_number,balance } = req.body;
  
        try {
          let account = await createAccounts({
            data: {
                user_id,
                bank_name,
                bank_account_number,
                balance,
            },
          });
  
          return res.status(201).json({
            status: false,
            message: 'OK',
            data: account,
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
  
    getAllAccount: async (req, res, next) => {
      try {
        const { id } = req.params;
  
        try {
          const account = await getAllAccounts(Number(id));
  
          return res.status(200).json({
            status: false,
            message: 'OK',
            data: account,
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
  
    getDetailAccount: async (req, res, next) => {
      try {
        const { id } = req.params;
  
        try {
          const account = await getDetailAccounts(Number(id));
  
          return res.status(200).json({
            status: false,
            message: 'OK',
            data: account,
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
  
    updateAccount: async (req, res, next) => {
      try {
        const { id } = req.params;
        const { user_id, bank_name, bank_account_number, balance } = req.body;
  
        try {
          const account = await updateAccounts(Number(id), { user_id, bank_name, bank_account_number, balance });
  
          return res.status(200).json({
            status: false,
            message: 'OK',
            data: account,
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
  
    deleteAccount: async (req, res, next) => {
      try {
        const { id } = req.params;
  
        try {
          const account = await deleteAccounts(Number(id));
  
          return res.status(200).json({
            status: false,
            message: 'OK',
            data: account,
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
  