const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')
const tokenValidation = require('../middleware/tokenValidation')

// Middleware for parsing JSON request bodies
router.use(express.json());

router.post(
  // '/transactions/:accountType',
  '/account',
  tokenValidation.validateToken,
  transactionController.getTransactions
)

router.put(
  // '/transactions:accountType',
  '/account',
  tokenValidation.validateToken,
  transactionController.updateTransaction
)

module.exports = router
