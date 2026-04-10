// Load env vars FIRST — before any other import reads process.env
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');


// Route files
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware');

// Connect to database
connectDB();


const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);

// Error Handler Middleware
app.use(errorHandler);

// ── Health check ────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 SMM Elite BD API is running!',
    timestamp: new Date().toISOString(),
  });
});


// Port
const PORT = process.env.PORT || 5001;

// Export for Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;

// Handle unhandled promise rejections gracefully
process.on('unhandledRejection', (err) => {
  console.error(`\n🔴 UNHANDLED REJECTION: ${err.message}`);
  console.error('   Shutting down server...');
  server.close(() => process.exit(1));
});
