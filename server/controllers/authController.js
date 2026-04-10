const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to Create and Send Token
const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        balance: user.balance
      }
    }
  });
};

// @desc    Register User
// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password
    });

    createSendToken(user, 201, res);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Login User
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'দয়া করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন' });
    }

    // 2. Check if user exists & password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ success: false, message: 'ভুল ইমেইল অথবা পাসওয়ার্ড' });
    }

    // 3. If everything ok, send token
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get Current User
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
// @desc    Seed Demo Users
// @route   GET /api/auth/seed-demo
exports.seedDemo = async (req, res) => {
  try {
    const users = [
      {
        name: 'Demo Admin',
        email: 'admin@demo.com',
        password: 'adminpassword123',
        role: 'admin',
        balance: 5000
      },
      {
        name: 'Demo User',
        email: 'user@demo.com',
        password: 'userpassword123',
        role: 'user',
        balance: 100
      }
    ];

    // Clear old ones
    await User.deleteMany({ email: { $in: ['admin@demo.com', 'user@demo.com'] } });
    
    // Create new ones
    await User.create(users);

    res.status(200).json({
      success: true,
      message: '✅ Demo accounts created!',
      accounts: {
        admin: 'admin@demo.com / adminpassword123',
        user: 'user@demo.com / userpassword123'
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
