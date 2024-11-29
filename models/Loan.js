const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  purpose: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  applicationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Loan', LoanSchema);

