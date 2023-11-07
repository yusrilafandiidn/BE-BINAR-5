const express = require("express");
const router = express.Router();
const { getAllUsers, getDetailUsers, deleteUsers, updateUsers } = require("../libs/users.libs");
const { createAccounts, getAllAccounts, getDetailAccounts, deleteAccounts, updateAccounts } = require("../libs/accounts.libs");
const { createTransactions, getAllTransactions, getDetailTransactions } = require("../libs/transactions.libs");

const { register, login, whoami, authenticateUser, usersPagination } = require('../controllers/auth.controllers');
const { restrict } = require('../middlewares/auth.middlewares');

// Welcome route
router.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'Welcome to Basic Banking System',
        data: null
    });
});

// Endpoint /auth/authenticate
router.get('/users/authenticate', restrict, (req, res) => {
   const authenticatedUser = req.user;
    res.status(200).json({
        status: true,
        message: 'Authentication successful',
        data: { user: authenticatedUser }
    });
});
 
// Auth
router.post('/users/register', register);
router.post('/users/login', login);
router.get('/users/whoami', restrict, whoami);
router.post('/users/auth/authenticate', restrict, authenticateUser);

// Users
router.get("/users/pagination", restrict, getAllUsers);
router.get("/users/all", restrict, getAllUsers);
router.get("/users/detail/:id", restrict, getDetailUsers);
router.put("/users/update/:id", restrict, updateUsers);
router.delete("/users/delete/:id", restrict, deleteUsers);

// Accounts
router.post("/accounts/create", restrict, createAccounts);
router.get("/accounts/pagination", restrict, getAllAccounts);
router.get("/accounts/all", restrict, getAllAccounts);
router.get("/accounts/detail/:id", restrict, getDetailAccounts);
router.put("/accounts/update/:id", restrict, updateAccounts);
router.delete("/accounts/delete/:id", restrict, deleteAccounts);

// Transactions
router.post("/transactions/create", restrict, createTransactions);
router.get("/transactions/pagination", restrict, getAllTransactions);
router.get("/transactions/all", restrict, getAllTransactions);
router.get("/transactions/detail/:id", restrict, getDetailTransactions);

module.exports = router;
