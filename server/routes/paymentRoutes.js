const express = require('express');
const paymentController = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All payment routes need authentication

router.post('/request', paymentController.requestFunding);
router.get('/my-payments', paymentController.getMyPayments);

// Admin only routes
router.get('/', authorize('admin'), paymentController.getAllPayments);
router.patch('/:id', authorize('admin'), paymentController.updatePaymentStatus);

module.exports = router;
