const express = require('express');
const serviceController = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', serviceController.getAllServices);
router.get('/provider-balance', protect, authorize('admin'), serviceController.getProviderBalance);

module.exports = router;
