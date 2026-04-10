const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

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

const seedDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smm_panel');
    console.log(`Connected to Database: ${conn.connection.host}`);

    // Delete existing demo users to avoid duplicates if re-run
    await User.deleteMany({ email: { $in: ['admin@demo.com', 'user@demo.com'] } });
    console.log('Old demo users cleared.');

    // Create users
    await User.create(users);
    console.log('✅ Demo users created successfully!');
    
    console.log('\n--- Login Details ---');
    console.log('Admin: admin@demo.com / adminpassword123');
    console.log('User:  user@demo.com / userpassword123');
    console.log('---------------------\n');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
