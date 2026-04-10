const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All order routes need authentication

router.post('/', orderController.createOrder);
router.get('/my-orders', orderController.getMyOrders);

// Admin only route
router.get('/', authorize('admin'), orderController.getAllOrders);

module.exports = router;
