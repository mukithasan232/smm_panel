const smmProvider = require('../utils/smmProvider');

// @desc    Get all services from SMMGen
// @route   GET /api/services
exports.getAllServices = async (req, res) => {
  try {
    const rawServices = await smmProvider.fetchServices();
    
    // ── Business Logic: 40% Profit Margin & USD to BDT Conversion ──
    // Formula: DisplayPrice = (api_rate * 120) * 1.40
    // We assume SMMGen rates are in USD per 1000
    const USD_TO_BDT = 120;
    const MARGIN = 1.30; // 30% Profit Margin (Reduced from 40%)

    const services = rawServices.map(service => {
      const originalRate = parseFloat(service.rate);
      const markupRate = (originalRate * USD_TO_BDT * MARGIN).toFixed(2);
      
      return {
        ...service,
        rate: markupRate, // Overwriting with BDT + Margin
        currency: 'BDT',
        originalRate: originalRate // Keep for internal reference if needed
      };
    });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'সেবা প্রদানকারীর কাছ থেকে ডাটা আনতে সমস্যা হয়েছে।',
      error: err.message
    });
  }
};

// @desc    Get SMMGen Provider Balance (Admin only)
// @route   GET /api/services/provider-balance
exports.getProviderBalance = async (req, res) => {
  try {
    const balanceData = await smmProvider.checkProviderBalance();
    res.status(200).json({
      success: true,
      data: balanceData
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'সেবা প্রদানকারীর ব্যালেন্স আনতে সমস্যা হয়েছে।',
      error: err.message
    });
  }
};
