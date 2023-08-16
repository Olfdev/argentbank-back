const transactionService = require('../services/transactionService')

module.exports.getTransactions = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await transactionService.getTransactions(req)
    response.status = 200
    response.message = 'Successfully got user transactions data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in getTransactions in transactionsController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.updateTransaction = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await transactionService.updateTransaction(req)
    response.status = 200
    response.message = 'Successfully updated user transaction data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateTransaction - transactionController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}