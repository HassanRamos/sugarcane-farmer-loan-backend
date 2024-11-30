const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Repayment Initiated', 'Repaid'],
    default: 'Pending'
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  interestRate: {
    type: Number,
    required: true
  },
  term: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Loan', LoanSchema);

