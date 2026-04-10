import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  ShieldCheck, 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  Zap, 
  PlusCircle, 
  Wallet,
  Smartphone
} from 'lucide-react';
import toast from 'react-hot-toast';

const AddFunds = () => {
  const [selectedMethod, setSelectedMethod] = useState('bkash');
  const [loading, setLoading] = useState(false);

  const methods = [
    { 
      id: 'bkash', 
      name: 'bKash', 
      number: '01700-000000', 
      type: 'Personal', 
      color: '#e2136e', 
      icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670151.png' 
    },
    { 
      id: 'nagad', 
      name: 'Nagad', 
      number: '01800-000000', 
      type: 'Personal', 
      color: '#f7941d', 
      icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Nagad_Logo.svg/1024px-Nagad_Logo.svg.png' 
    },
    { 
      id: 'rocket', 
      name: 'Rocket', 
      number: '01900-000000', 
      type: 'Personal', 
      color: '#8c3494', 
      icon: 'https://vymaps.com/logo/91104/dutch-bangla-rocket.png' 
    }
  ];

  const currentMethod = methods.find(m => m.id === selectedMethod);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    const verifyToast = toast.loading('ভেরিফিকেশন রিকোয়েস্ট পাঠানো হচ্ছে...');
    
    // Simulate API call
    setTimeout(() => {
      toast.success('রিকোয়েস্ট সফল হয়েছে! অ্যাডমিন প্যানেল চেক করা হচ্ছে।', { id: verifyToast });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-accent-primary text-[10px] uppercase font-black tracking-[0.3em] mb-3 block leading-none">Wallet System</span>
          <h1 className="text-5xl font-black font-['Outfit'] tracking-tighter">Add Funds</h1>
        </div>
        <div className="flex items-center gap-3 px-5 py-3 glass rounded-2xl border-white/5 shadow-xl">
           <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-accent-primary" />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase text-secondary tracking-widest leading-none mb-1">Current Balance</p>
              <p className="text-xl font-black font-['Outfit'] tracking-tight">৳ ৮৫০.০০</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 space-y-8">
          {/* Method Selection Tabs */}
          <div className="space-y-4">
             <label className="text-xs font-black uppercase tracking-widest text-secondary ml-2">Choose Payment Method</label>
             <div className="flex flex-wrap gap-4">
               {methods.map((m) => (
                 <button
                   key={m.id}
                   onClick={() => setSelectedMethod(m.id)}
                   className={`flex-1 min-w-[140px] p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-4 group ${
                     selectedMethod === m.id 
                     ? 'bg-white/5 border-white/20 shadow-2xl shadow-white/5' 
                     : 'bg-transparent border-white/5 hover:border-white/10'
                   }`}
                 >
                   <div className="w-14 h-14 rounded-2xl bg-white/5 p-2 border border-white/5 group-hover:scale-110 transition-transform">
                      <img src={m.icon} alt={m.name} className="w-full h-full object-contain" />
                   </div>
                   <div className="text-center">
                     <p className={`font-black text-xs uppercase tracking-widest ${selectedMethod === m.id ? 'text-white' : 'text-secondary'}`}>{m.name}</p>
                     {selectedMethod === m.id && (
                        <motion.div layoutId="activeDot" className="w-1.5 h-1.5 bg-accent-primary rounded-full mx-auto mt-2" />
                     )}
                   </div>
                 </button>
               ))}
             </div>
          </div>

          {/* Account Details Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMethod}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 opacity-20 blur-3xl pointer-events-none" 
                style={{ backgroundColor: currentMethod.color }}
              ></div>
              <div className="relative glass border-white/10 rounded-[2.5rem] p-10 flex flex-col md:flex-row justify-between items-center gap-10 shadow-3xl">
                <div className="space-y-4 text-center md:text-left">
                   <div className="flex items-center justify-center md:justify-start gap-3">
                      <Smartphone className="w-6 h-6 text-white" />
                      <span className="text-xl font-bold uppercase tracking-widest">{currentMethod.name} {currentMethod.type}</span>
                   </div>
                   <h2 className="text-5xl md:text-6xl font-black font-['Outfit'] tracking-tighter text-gradient">{currentMethod.number}</h2>
                   <p className="text-secondary font-medium italic">"Send Money to this number and verify below"</p>
                </div>
                <div className="w-40 h-40 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-4">
                    {/* Placeholder for QR Code */}
                    <div className="w-full h-full border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center text-[10px] text-center uppercase tracking-widest font-black text-secondary">
                        QR CODE<br/>COMING SOON
                    </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Payment Instructions */}
          <div className="glass border-white/5 rounded-3.5xl p-8 grid md:grid-cols-3 gap-8 relative overflow-hidden">
             <div className="md:col-span-3 pb-4 border-b border-white/5 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                <h3 className="text-lg font-black font-['Outfit'] uppercase tracking-tight">Payment Security Guidelines</h3>
             </div>
             {[
               { icon: <PlusCircle className="text-accent-primary"/>, title: 'Send Money', desc: 'Use Send Money option only (not Cash In).' },
               { icon: <Zap className="text-amber-500"/>, title: 'Collect TRX', desc: 'Keep the Transaction ID after payment.' },
               { icon: <Clock className="text-blue-500"/>, title: 'Verification', desc: 'Balances are added in 5-15 mins.' }
             ].map((step, i) => (
                <div key={i} className="space-y-3">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">{step.icon}</div>
                   <h4 className="font-bold text-sm">{step.title}</h4>
                   <p className="text-xs text-secondary leading-relaxed font-semibold">{step.desc}</p>
                </div>
             ))}
          </div>
        </div>

        {/* Verification Sidebar Form */}
        <div className="lg:col-span-2">
           <div className="sticky top-32 glass border-accent-primary/20 rounded-[3rem] p-10 space-y-8 shadow-2xl relative">
              <div className="absolute top-0 right-10 w-20 h-20 bg-accent-primary/10 blur-3xl rounded-full"></div>
              
              <div>
                <h3 className="text-2xl font-black font-['Outfit'] tracking-tight mb-2 uppercase">Verify Deposit</h3>
                <p className="text-xs text-secondary font-bold uppercase tracking-widest">Selected: <span className="text-white">{selectedMethod}</span></p>
              </div>

              <form onSubmit={handleVerify} className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Payment Amount (৳)</label>
                    <div className="relative group">
                       <input 
                         type="number" 
                         required
                         placeholder="e.g. 500"
                         className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 font-['Outfit'] text-2xl font-black focus:outline-none focus:border-accent-primary focus:bg-accent-primary/5 transition-all outline-none placeholder:text-neutral-700" 
                       />
                       <Zap className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 group-focus-within:text-accent-primary transition-colors" />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Transaction ID</label>
                    <input 
                      type="text" 
                      required
                      placeholder="8X7Y6Z..."
                      className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 font-mono font-bold tracking-widest focus:outline-none focus:border-accent-primary focus:bg-accent-primary/5 transition-all outline-none placeholder:text-neutral-700 uppercase" 
                    />
                 </div>

                 <div className="bg-accent-primary/5 p-5 rounded-2.5xl border border-accent-primary/10 flex gap-4">
                    <HelpCircle className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-accent-primary font-bold leading-relaxed uppercase tracking-wider">Payments are verified manually by our finance team to ensure maximum security.</p>
                 </div>

                 <button 
                  disabled={loading}
                  className="w-full h-16 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-2.5xl font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-accent-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                 >
                   {loading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Zap/></motion.div> : <><CheckCircle2 className="w-5 h-5" /> Submit Request</>}
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AddFunds;
