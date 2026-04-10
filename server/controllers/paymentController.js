const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @desc    Submit a funding request
// @route   POST /api/payments/request
exports.requestFunding = async (req, res) => {
  try {
    const { amount, trxId, method } = req.body;

    // Check if TrxID already exists
    const existingTx = await Transaction.findOne({ trxId });
    if (existingTx) {
      return res.status(400).json({ 
        success: false, 
        message: 'এই ট্রানজেকশন আইডিটি ইতিমধ্যে ব্যবহার করা হয়েছে।' 
      });
    }

    const transaction = await Transaction.create({
      userId: req.user.id,
      amount,
      trxId,
      method
    });

    res.status(201).json({
      success: true,
      message: 'আপনার পেমেন্ট রিকোয়েস্টটি পাঠানো হয়েছে। অ্যাডমিন ভেরিফাই করার পর আপনার ব্যালেন্স যোগ হয়ে যাবে।',
      data: { transaction }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get user's transaction history
// @route   GET /api/payments/my-payments
exports.getMyPayments = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort('-createdAt');
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: { transactions }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Approve or Reject payment (Admin only)
// @route   PATCH /api/payments/:id
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'ট্রানজেকশনটি খুঁজে পাওয়া যায়নি' });
    }

    if (transaction.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'এই ট্রানজেকশনটি ইতিমধ্যে প্রসেস করা হয়েছে' });
    }

    if (status === 'approved') {
      // Add balance to user
      const user = await User.findById(transaction.userId);
      if (!user) {
         return res.status(404).json({ success: false, message: 'ইউজার খুঁজে পাওয়া যায়নি' });
      }
      user.balance += transaction.amount;
      await user.save();
    }

    transaction.status = status;
    await transaction.save();

    res.status(200).json({
      success: true,
      message: `পেমেন্ট রিকোয়েস্টটি ${status === 'approved' ? 'এপ্রুভ' : 'রিজেক্ট'} করা হয়েছে।`,
      data: { transaction }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all payment requests (Admin only)
// @route   GET /api/payments
exports.getAllPayments = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('userId', 'name email').sort('-createdAt');
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: { transactions }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
