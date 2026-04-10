import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Search, 
  LayoutGrid, 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  Music2, 
  Send, 
  Linkedin, 
  Globe, 
  MessageSquare,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  PlusCircle,
  Wallet
} from 'lucide-react';

const iconMap = {
  'instagram': <Instagram className="w-5 h-5" />,
  'facebook': <Facebook className="w-5 h-5" />,
  'youtube': <Youtube className="w-5 h-5" />,
  'twitter': <Twitter className="w-5 h-5" />,
  'spotify': <Music2 className="w-5 h-5" />,
  'tiktok': <Music2 className="w-5 h-5" />,
  'telegram': <Send className="w-5 h-5" />,
  'linkedin': <Linkedin className="w-5 h-5" />,
  'discord': <MessageSquare className="w-5 h-5" />,
  'traffic': <Globe className="w-5 h-5" />,
};

import toast from 'react-hot-toast';

const StepIndicator = ({ step, activeStep, label }) => (
  <div className="flex items-center gap-3">
    <div className={`
      w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all duration-500
      ${activeStep >= step 
        ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20 scale-110' 
        : 'bg-white/5 text-neutral-600 border border-white/5'}
    `}>
      {step}
    </div>
    <span className={`text-xs font-bold uppercase tracking-widest hidden sm:block ${activeStep >= step ? 'text-white' : 'text-neutral-600'}`}>
      {label}
    </span>
  </div>
);

const NewOrder = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [activeCategory, setActiveCategory] = useState('Everythings');
  const [activeTab, setActiveTab] = useState('new');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [link, setLink] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchServicesList = async () => {
      try {
        const response = await fetch('/api/services');
        const result = await response.json();
        if (result.success) {
          setServices(result.data);
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServicesList();
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedServiceId || !link || !quantity) {
      return toast.error('সবগুলো ঘর পূরণ করুন!');
    }

    setOrderLoading(true);
    const orderToast = toast.loading('অর্ডার প্রসেস হচ্ছে...');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceId: selectedServiceId,
          link,
          quantity: parseInt(quantity)
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success('অর্ডার সফলভাবে গ্রহণ করা হয়েছে!', { id: orderToast });
        setQuantity('');
        setLink('');
        setActiveStep(1); // Reset to first step
      } else {
        toast.error(result.message || 'অর্ডার করতে সমস্যা হয়েছে।', { id: orderToast });
      }
    } catch (err) {
      toast.error('সার্ভারে যোগাযোগ করা সম্ভব হয়নি।', { id: orderToast });
    } finally {
      setOrderLoading(false);
    }
  };

  // Extraction Logic
  const dropdownCategories = [...new Set(services.map(s => s.category).filter(Boolean))];
  const categoriesList = ['Everythings', ...dropdownCategories];

  // Auto-select first category if none is selected
  useEffect(() => {
    if (dropdownCategories.length > 0 && !selectedCategory) {
      setSelectedCategory(dropdownCategories[0]);
    }
  }, [dropdownCategories, selectedCategory]);

  // Handle Step Advancement
  useEffect(() => {
    if (selectedCategory && activeStep === 1) setActiveStep(2);
    if (selectedServiceId && activeStep === 2) setActiveStep(3);
  }, [selectedCategory, selectedServiceId]);

  // Robust Filtering
  const servicesInCategory = services.filter(s => {
    if (!selectedCategory || selectedCategory === 'Everythings') return true;
    return String(s.category).toLowerCase().trim() === String(selectedCategory).toLowerCase().trim();
  });
  
  const currentService = services.find(s => String(s.service) === String(selectedServiceId));

  const calculateCharge = () => {
    if (!currentService || !quantity) return "0.00";
    const chargeVal = (parseFloat(quantity) / 1000) * (parseFloat(currentService.rate) || 0);
    return isNaN(chargeVal) ? "0.00" : chargeVal.toFixed(2);
  };

  const getIcon = (catName) => {
    const key = catName.toLowerCase();
    for (const [iconKey, icon] of Object.entries(iconMap)) {
      if (key.includes(iconKey)) return icon;
    }
    return <LayoutGrid className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-accent-primary">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-bold animate-pulse text-lg tracking-widest uppercase">Loading Services...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Dashboard Top Stats - New Prominent Balance View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
        <div className="md:col-span-2 bg-gradient-to-br from-indigo-600/10 to-transparent rounded-[2.5rem] p-8 border border-indigo-500/20 relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full transition-all duration-700 group-hover:scale-125"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
               <h1 className="text-3xl font-black tracking-tight text-white mb-1">Welcome back, Boss! 🚀</h1>
               <p className="text-neutral-400 font-medium">Your SMM panel is powered up and ready for new orders.</p>
            </div>
            <div className="bg-[#111827]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-end min-w-[200px] shadow-2xl">
               <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Total Balance</p>
               <h2 className="text-3xl font-black text-white">৳ ১১০.৬৭</h2>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col justify-center bg-white/5 rounded-[2.5rem] p-8 border border-white/5 hover:border-indigo-500/20 transition-all duration-300">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                 <Zap className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">System Status</p>
                 <p className="text-sm font-black text-green-400 uppercase tracking-widest">Optimized & Online</p>
              </div>
           </div>
           <p className="text-xs text-neutral-500 leading-relaxed">Servers are running at <span className="text-white font-bold">100% capacity</span>. Average delivery time: 14 mins.</p>
        </div>
      </div>

      {/* Stepper Logic */}
      <div className="max-w-4xl mx-auto w-full px-2">
        <div className="flex items-center justify-between relative mb-12">
          {/* Stepper Line */}
          <div className="absolute left-0 top-5 w-full h-px bg-white/5 -z-10">
            <div 
              className="h-full bg-accent-primary transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
              style={{ width: `${(activeStep - 1) * 50}%` }}
            />
          </div>
          
          <StepIndicator step={1} activeStep={activeStep} label="Select Service" />
          <StepIndicator step={2} activeStep={activeStep} label="Configuration" />
          <StepIndicator step={3} activeStep={activeStep} label="Place Order" />
        </div>

        {/* Order Form Container */}
        <div className="bg-[#1f2937]/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12 space-y-10">
            
            {/* Step 1: Select Category & Service */}
            {activeStep >= 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4 text-accent-primary" /> 1. Platform Category
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full h-14 bg-[#111827] border border-white/5 rounded-2xl px-6 text-sm font-bold text-white focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all appearance-none cursor-pointer"
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setSelectedServiceId('');
                          setActiveStep(1);
                        }}
                      >
                        <option value="">Choose Platform</option>
                        {dropdownCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent-primary" /> 2. Pick a Service
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full h-14 bg-[#111827] border border-white/5 rounded-2xl px-6 text-sm font-bold text-white focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all appearance-none cursor-pointer disabled:opacity-50"
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        disabled={!selectedCategory}
                      >
                        <option value="">{selectedCategory ? 'Select package...' : 'Waiting for platform...'}</option>
                        {servicesInCategory.map(s => (
                          <option key={s.service} value={s.service}>
                            #{s.service} - {s.name} (৳{s.rate})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Link & Quantity */}
            {activeStep >= 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-8 pt-4"
              >
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                    <Send className="w-4 h-4 text-accent-primary" /> 3. Target URL / Link
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., https://instagram.com/user"
                    className="w-full h-14 bg-[#111827] border border-white/5 rounded-2xl px-6 text-sm font-bold text-white placeholder:text-neutral-700 focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-accent-primary" /> 4. Quantity
                    </label>
                    {currentService && <span className="text-[10px] font-black text-neutral-600">LIMIT: {currentService.min} - {currentService.max}</span>}
                  </div>
                  <input 
                    type="number" 
                    placeholder="Min. package amount"
                    className="w-full h-14 bg-[#111827] border border-white/5 rounded-2xl px-6 text-sm font-bold text-white focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all font-mono"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation & Submit */}
            {activeStep === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pt-6 space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                      <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Pricing / 1K</p>
                      <p className="text-lg font-black text-white">৳ {currentService?.rate || '0.00'}</p>
                   </div>
                   <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                      <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Estimated Speed</p>
                      <p className="text-lg font-black text-green-400">Instant ✨</p>
                   </div>
                   <div className="bg-accent-primary/10 rounded-2xl p-6 border border-accent-primary/20 shadow-inner">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Total Payable</p>
                      <p className="text-xl font-black text-white">৳ {calculateCharge()}</p>
                   </div>
                </div>

                <div className="flex gap-4 pt-4">
                   <button 
                    onClick={() => { setActiveStep(1); setSelectedServiceId(''); setSelectedCategory(''); }}
                    className="flex-[0.5] h-16 rounded-2xl font-black uppercase tracking-widest text-neutral-400 border border-white/10 hover:bg-white/5 transition-all text-xs"
                   >
                     Reset Form
                   </button>
                   <button 
                    onClick={handlePlaceOrder}
                    disabled={!selectedServiceId || !quantity || !link || orderLoading}
                    className="flex-1 h-16 bg-accent-primary hover:bg-indigo-500 rounded-2xl font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-accent-primary/40 transition-all hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    {orderLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                      <>
                        <PlusCircle className="w-5 h-5" />
                        Push Order Now
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
            
          </div>
        </div>

        {/* Informational Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12 pb-12">
            <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-widest">Crucial Note</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">Please ensure the target profile/link is <b>PUBLIC</b> before placing an order. Private accounts will result in failed orders without refunds.</p>
            </div>
            
            <div className="bg-indigo-500/5 rounded-[2.5rem] p-8 border border-indigo-500/10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-widest">Elite Support</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">Having issues with your order? Our elite support team is active 24/7 in the Support Box section. Responses within 5 minutes!</p>
            </div>
        </div>
      </div>
    </div>
  );
};


export default NewOrder;
