const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI is not defined in the .env file!');
    }

    // Log a safe, partial URI so credentials are never exposed in terminal
    const safeUri = uri.replace(/:\/\/(.*?)@/, '://<credentials>@');
    console.log(`🔌 Attempting MongoDB connection to: ${safeUri.substring(0, 50)}...`);

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // Fail fast if Atlas is unreachable (10s)
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Connection FAILED!');
    console.error(`   Reason: ${error.message}`);
    process.exit(1); // Kill the process — no point running without a DB
  }
};

module.exports = connectDB;
