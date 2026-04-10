const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // First, delete if exists to ensure clean insert
    await User.deleteOne({ email: 'mdmukithasan429@gmail.com' });

    // Create new admin manually so .pre('save') hook hashes the password!
    await User.create({
      name: 'MD Mukit Hasan',
      email: 'mdmukithasan429@gmail.com',
      password: 'SmmAdminPassword@2026', 
      role: 'admin',
      balance: 10000
    });
    
    console.log('✅ Created your custom admin account with securely hashed password.');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
