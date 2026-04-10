const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'ট্রানজেকশন অবশ্যই একটি ইউজারের সাথে যুক্ত হতে হবে']
  },
  amount: {
    type: Number,
    required: [true, 'পরিমান (Amount) প্রদান করা বাধ্যতামূলক']
  },
  trxId: {
    type: String,
    required: [true, 'ট্রানজেকশন আইডি (TrxID) প্রদান করা বাধ্যতামূলক'],
    unique: true,
    trim: true
  },
  method: {
    type: String,
    required: [true, 'পেমেন্ট মেথড (e.g. bKash, Nagad) সিলেক্ট করুন'],
    enum: ['bKash', 'Nagad', 'Rocket']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
