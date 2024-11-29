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

module.exports = router;

