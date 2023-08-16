const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema(
  {
    type: String,
    category: String,
    description: String,
    note: String,
    amount: mongoose.Decimal128,
    date: Date,
    account_type: String,
    transactionId: Number
  }
);

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    transactions: [detailSchema]
  },
  {
    timestamps: true,
    toObject: {
        transform: (doc, ret, options) => {
          ret.id = ret._id
          delete ret._id
          delete ret.createdAt
          delete ret.updatedAt
          delete ret.__v
          return ret
        }
    }
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);