const Order = require('../models/Order');
const User = require('../models/User');
const smmProvider = require('../utils/smmProvider');

// @desc    Create new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { serviceId, link, quantity } = req.body;
    console.log(`\n[ORDER FLOW] 📥 New Order Request Received:`);
    console.log(`- Service ID: ${serviceId}`);
    console.log(`- Link: ${link}`);
    console.log(`- Quantity: ${quantity}`);
    console.log(`- User: ${req.user.name} (${req.user._id})`);

    // 1. Fetch service details to get rate and name
    const rawServices = await smmProvider.fetchServices();
    const service = rawServices.find(s => s.service.toString() === serviceId.toString());

    if (!service) {
      console.warn(`[ORDER FLOW] ❌ Service not found: ${serviceId}`);
      return res.status(404).json({ success: false, message: 'সার্ভিসটি পাওয়া যায়নি।' });
    }

    // 2. Calculate final charge with 40% margin and 120 BDT conversion
    const USD_TO_BDT = 120;
    const MARGIN = 1.40;
    const unitRate = (parseFloat(service.rate) * USD_TO_BDT * MARGIN).toFixed(4);
    const charge = (quantity / 1000) * unitRate;

    console.log(`- Calculated Charge: ৳${charge.toFixed(2)} (Unit Rate: ৳${unitRate})`);

    // 3. Check user balance
    const user = await User.findById(req.user._id);
    if (user.balance < charge) {
      console.warn(`[ORDER FLOW] ❌ Insufficient balance. Required: ৳${charge}, Available: ৳${user.balance}`);
      return res.status(400).json({ success: false, message: 'আপনার ব্যালেন্স পর্যাপ্ত নয়।' });
    }

    // 4. Submit to SMMGen API
    console.log(`[ORDER FLOW] 📤 Sending request to SMMGen API...`);
    const providerResponse = await smmProvider.placeOrder(serviceId, link, quantity);
    
    if (providerResponse.error) {
      console.error(`[ORDER FLOW] ❌ SMMGen API Error:`, providerResponse.error);
      return res.status(400).json({ success: false, message: 'Provider Error: ' + providerResponse.error });
    }

    console.log(`[ORDER FLOW] ✅ SMMGen Response received. Provider Order ID: ${providerResponse.order}`);

    // 5. Deduct balance and Save order
    user.balance -= charge;
    await user.save();

    const order = await Order.create({
      userId: req.user._id,
      serviceId,
      serviceName: service.name,
      link,
      quantity,
      charge: charge.toFixed(2),
      smmgenOrderId: providerResponse.order,
      status: 'pending'
    });

    console.log(`[ORDER FLOW] 💾 Order saved to DB: ${order._id}`);
    res.status(201).json({
      success: true,
      message: 'আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।',
      data: { 
        order, 
        newBalance: user.balance 
      }
    });
  } catch (err) {
    console.error('Order Error:', err);
    res.status(500).json({ success: false, message: 'সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন।' });
  }
};

// @desc    Get user's order history
// @route   GET /api/orders/my-orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort('-createdAt');
    res.status(200).json({
      success: true,
      count: orders.length,
      data: { orders }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').sort('-createdAt');
    res.status(200).json({
      success: true,
      count: orders.length,
      data: { orders }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
