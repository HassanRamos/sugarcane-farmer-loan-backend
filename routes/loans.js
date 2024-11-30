const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const auth = require('../middleware/auth');

// Apply for a loan
router.post('/apply', auth, async (req, res) => {
  try {
    const { amount, purpose } = req.body;
    const newLoan = new Loan({
      user: req.user.id,
      amount,
      purpose,
      status: 'Pending'
    });
    await newLoan.save();
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(500).json({ message: 'Error applying for loan', error: error.message });
  }
});

// Get all loans for a user
router.get('/user-loans', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans', error: error.message });
  }
});

// Get loan history for a user
router.get('/history', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id }).sort({ applicationDate: -1 });
    res.json(loans);
  } catch (error) {
    console.error('Error fetching loan history:', error);
    res.status(500).json({ message: 'Error fetching loan history', error: error.message });
  }
});

// Get details for a specific loan
router.get('/:id', auth, async (req, res) => {
  try {
    const loan = await Loan.findOne({ _id: req.params.id, user: req.user.id });
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.json(loan);
  } catch (error) {
    console.error('Error fetching loan details:', error);
    res.status(500).json({ message: 'Error fetching loan details', error: error.message });
  }
});

// Initiate loan repayment
router.post('/:id/repay', auth, async (req, res) => {
  try {
    const loan = await Loan.findOne({ _id: req.params.id, user: req.user.id });
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    if (loan.status !== 'Approved') {
      return res.status(400).json({ message: 'Loan is not eligible for repayment' });
    }
    // In a real application, you would integrate with a payment gateway here
    loan.status = 'Repayment Initiated';
    await loan.save();
    res.json({ message: 'Loan repayment initiated successfully', loan });
  } catch (error) {
    console.error('Error initiating loan repayment:', error);
    res.status(500).json({ message: 'Error initiating loan repayment', error: error.message });
  }
});

module.exports = router;

