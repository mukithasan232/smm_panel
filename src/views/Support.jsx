import React, { useState } from 'react';
import { 
  Headphones, 
  MessageSquare, 
  Send, 
  PlusCircle, 
  MessageCircle, 
  Rocket, 
  HelpCircle,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Support = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const supportToast = toast.loading('টিকিট প্রসেস হচ্ছে...');
    
    setTimeout(() => {
      toast.success('সফলভাবে টিকিট ওপেন হয়েছে! আমাদের টিম শীঘ্রই যোগাযোগ করবে।', { id: supportToast });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-accent-primary text-[10px] uppercase font-black tracking-[0.3em] mb-3 block leading-none">Concierge Support</span>
          <h1 className="text-5xl font-black font-['Outfit'] tracking-tighter">Support Center</h1>
        </div>
        <div className="px-6 py-3 bg-accent-primary/5 border border-accent-primary/20 rounded-2xl hidden md:flex items-center gap-3">
           <Zap className="w-5 h-5 text-accent-primary animate-pulse" />
           <p className="text-xs font-black uppercase tracking-widest text-accent-primary">Avg. Reply Time: 8 Mins</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Ticket Generation Form */}
        <div className="lg:col-span-3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass border-white/5 p-10 rounded-[3rem] relative overflow-hidden shadow-2xl"
          >
             <div className="absolute top-0 left-0 w-32 h-32 bg-accent-primary/5 blur-3xl rounded-full -ml-10 -mt-10"></div>
             
             <div className="relative z-10 space-y-8">
               <div className="flex items-center gap-4 mb-2">
                 <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                    <PlusCircle className="text-accent-primary w-6 h-6" />
                 </div>
                 <h3 className="text-2xl font-black font-['Outfit'] tracking-tight uppercase">Open New Support Ticket</h3>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Subject / বিষয়</label>
                       <input 
                         required
                         type="text" 
                         placeholder="e.g. Payment Issue" 
                         className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 font-bold focus:outline-none focus:border-accent-primary transition-all outline-none" 
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Priority Level</label>
                       <select className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 font-bold focus:outline-none focus:border-accent-primary transition-all outline-none appearance-none">
                          <option className="bg-bg-secondary" value="low">Standard Speed</option>
                          <option className="bg-bg-secondary" value="medium">Medium Priority</option>
                          <option className="bg-bg-secondary" value="high">Urgent Growth</option>
                       </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Message Detail / বিস্তারিত</label>
                    <textarea 
                      required
                      placeholder="Explain your problem in detail..." 
                      className="w-full h-48 bg-white/5 border border-white/5 rounded-[2rem] p-6 font-medium focus:outline-none focus:border-accent-primary transition-all outline-none resize-none"
                    ></textarea>
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full h-16 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-2.5xl font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-accent-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? "Processing..." : <><Send className="w-5 h-5" /> Submit Ticket Request</>}
                  </button>
               </form>
             </div>
          </motion.div>
        </div>

        {/* Quick Contact Sidebar */}
        <div className="lg:col-span-2 space-y-6">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="glass border-emerald-500/20 rounded-[2.5rem] p-8 group hover:bg-emerald-500/5 transition-all cursor-pointer relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl pointer-events-none"></div>
              <div className="flex items-center gap-6 relative z-10">
                 <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                    <MessageCircle className="w-8 h-8" />
                 </div>
                 <div>
                    <h4 className="text-xl font-black font-['Outfit'] uppercase mb-1">WhatsApp Support</h4>
                    <p className="text-xs text-secondary font-bold mb-4 tracking-widest">Available 24/7 (Instant)</p>
                    <a href="https://wa.me/your-number" target="_blank" className="inline-flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest hover:underline">
                       Chat Now <CheckCircle2 className="w-3 h-3" />
                    </a>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="glass border-blue-500/20 rounded-[2.5rem] p-8 group hover:bg-blue-500/5 transition-all cursor-pointer relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl pointer-events-none"></div>
              <div className="flex items-center gap-6 relative z-10">
                 <div className="w-16 h-16 bg-blue-500/10 rounded-3xl flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                    <Headphones className="w-8 h-8" />
                 </div>
                 <div>
                    <h4 className="text-xl font-black font-['Outfit'] uppercase mb-1">Telegram Base</h4>
                    <p className="text-xs text-secondary font-bold mb-4 tracking-widest">Global Support Channel</p>
                    <a href="#" className="inline-flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-widest hover:underline">
                       Join Channel <Rocket className="w-3 h-3" />
                    </a>
                 </div>
              </div>
           </motion.div>

           <div className="glass border-white/5 rounded-[2.5rem] p-10 space-y-6">
              <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-3">
                 <HelpCircle className="w-5 h-5 text-accent-primary" /> FAQ Shortcut
              </h3>
              <div className="space-y-4">
                 {[
                   'How quickly are funds added?',
                   'What if my order is dropped?',
                   'Can I cancel a processing order?'
                 ].map((q, i) => (
                    <div key={i} className="group cursor-pointer">
                       <p className="text-sm font-bold text-secondary group-hover:text-white transition-colors">{q}</p>
                       <div className="h-[1px] bg-white/5 mt-3 group-hover:bg-accent-primary/20 transition-colors"></div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
