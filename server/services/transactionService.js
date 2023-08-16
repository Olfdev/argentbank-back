const Transactions = require('../database/models/transactionModel')
const jwt = require('jsonwebtoken')

module.exports.getTransactions = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const transactions = await Transactions.findOne({ userId: decodedJwtToken.id })

    if (!transactions) {
      throw new Error('Cannot retrieve transactions for this user and account type');
    }

    return transactions.toObject()
  } catch (error) {
    console.error('Error in getTransactions - userService.js', error)
    throw new Error(error)
  }
}

module.exports.updateTransaction = async serviceData => {
  try {
      const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim();
      const decodedJwtToken = jwt.decode(jwtToken);

      // Find the correct transactions in the database based on userId
      const transactions = await Transactions.findOne({ userId: decodedJwtToken.id });

      if (!transactions) {
          throw new Error('User transactions not found');
      }

      // Find the correct transaction within the transactions array based on transactionId
      const transactionToUpdate = transactions.transactions.find(transaction => {
          return transaction.transactionId === serviceData.body.transactionId;
      });

      if (!transactionToUpdate) {
          throw new Error('This transaction was not found');
      }

      // Update the category and note
      transactionToUpdate.category = serviceData.body.category;
      transactionToUpdate.note = serviceData.body.note;

      // Save the updated transaction
      const updatedTransaction = await transactions.save();

      return updatedTransaction.toObject();
  } catch (error) {
      console.error('Error in updateTransaction - transactionService.js', error);
      throw new Error(error);
  }
};