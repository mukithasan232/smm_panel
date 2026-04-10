const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'অর্ডার অবশ্যই একটি ইউজারের সাথে যুক্ত হতে হবে']
  },
  serviceId: {
    type: Number,
    required: [true, 'সার্ভিস আইডি প্রদান করা বাধ্যতামূলক']
  },
  serviceName: {
    type: String,
    required: [true, 'সার্ভিসের নাম প্রদান করা বাধ্যতামূলক']
  },
  link: {
    type: String,
    required: [true, 'লিংক প্রদান করা বাধ্যতামূলক'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'পরিমান (Quantity) প্রদান করা বাধ্যতামূলক'],
    min: [10, 'নূন্যতম পরিমান ১০ হতে হবে']
  },
  charge: {
    type: Number,
    required: true
  },
  smmgenOrderId: {
    type: String, // ID returned from SMMGen API
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'canceled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
