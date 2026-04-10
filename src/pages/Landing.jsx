import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Monitor, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Globe
} from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 h-16' : 'bg-transparent h-20'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-full">
        <Link to="/" className="flex items-center gap-3 group">
           <div className="w-11 h-11 bg-accent-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-accent-primary/20 group-hover:rotate-12 transition-transform">
              <TrendingUp className="text-white w-6 h-6" />
           </div>
           <span className="text-2xl font-black tracking-tight font-['Outfit'] text-white">SMM<span className="text-accent-primary">Grows</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
           {['Services', 'API', 'Blog', 'Contact'].map(item => (
             <a key={item} href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors">{item}</a>
           ))}
           <Link to="/login" className="px-8 py-3 rounded-2xl bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-neutral-200 transition-all active:scale-95">
             Get Started
           </Link>
        </div>
      </div>
    </nav>
  );
};

const Landing = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="bg-[#060608] min-h-screen text-white selection:bg-accent-primary selection:text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-32 overflow-hidden" style={{ marginTop: '80px' }}>
         {/* Background Glows */}
         <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent-primary/10 blur-[150px] rounded-full"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#7c4dff]/5 blur-[120px] rounded-full"></div>

         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-8">
                  <Zap className="w-4 h-4 text-accent-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent-primary">New: v4.0 Elite Panel Live</span>
               </div>
               
               <h1 className="text-6xl md:text-8xl font-black font-['Outfit'] tracking-tighter leading-[0.9] mb-8">
                 Best <span className="text-accent-primary">SMM Panel</span> <br/> in Bangladesh <br/> & Asia.
               </h1>
               <p className="text-neutral-500 text-lg font-medium leading-relaxed max-w-xl mb-12">
                 Join 50k+ elite vendors using SMM Grows to scale their social presence. The fastest, cheapest, and most secure automated growth engine for BD and beyond.
               </p>

               {/* Integrated Login Box */}
               <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>
                  <form onSubmit={handleLogin} className="grid grid-cols-2 gap-5">
                     <div className="col-span-1 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-1">Username</label>
                        <input 
                          type="text" 
                          placeholder="Elite Account ID" 
                          className="w-full h-14 bg-black/40 border border-white/5 rounded-2xl px-6 text-sm font-bold focus:outline-none focus:border-accent-primary transition-all shadow-inner"
                        />
                     </div>
                     <div className="col-span-1 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-1">Password</label>
                        <input 
                          type="password" 
                          placeholder="••••••••" 
                          className="w-full h-14 bg-black/40 border border-white/5 rounded-2xl px-6 text-sm font-bold focus:outline-none focus:border-accent-primary transition-all shadow-inner"
                        />
                     </div>
                     <button className="col-span-2 h-16 bg-accent-primary text-white rounded-2xl text-[13px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                        Sign In Now <ArrowRight className="w-5 h-5" />
                     </button>
                  </form>
                  <p className="text-center mt-6 text-sm font-bold text-neutral-600">New around here? <Link to="/signup" className="text-white hover:text-accent-primary transition-colors">Join the Elite</Link></p>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative">
               <div className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 relative z-10 group">
                  <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2000" className="w-full h-auto grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent opacity-60"></div>
               </div>
               
               {/* Dashboard Overlays */}
               <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -left-12 bottom-20 z-20 bg-slate-900/80 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/10 flex items-center gap-5">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                     <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Global Progress</p>
                     <p className="text-2xl font-black tabular-nums">98.4%</p>
                  </div>
               </motion.div>
            </motion.div>
         </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative bg-white/[0.01] border-y border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
               <span className="text-accent-primary text-[10px] font-black uppercase tracking-[0.4em]">Elite Infrastructure</span>
               <h2 className="text-5xl font-black font-['Outfit'] tracking-tight">One Dashboard. All Platforms.</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { n: 'Instagram', d: 'Premium quality views and high-retention followers.', c: 'bg-pink-500' },
                 { n: 'Facebook', d: 'Page likes and real profile followers with 0% drop.', c: 'bg-blue-600' },
                 { n: 'YouTube', d: 'Ad-sense safe views and organic subscribers.', c: 'bg-red-600' },
                 { n: 'TikTok', d: 'Rapid delivery signals for algorithmic viral boost.', c: 'bg-slate-400' }
               ].map((s, i) => (
                  <motion.div 
                    key={s.n} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 bg-white/5 border border-white/5 rounded-[3rem] hover:bg-white/[0.08] hover:border-white/10 transition-all group"
                  >
                     <div className={`w-14 h-14 rounded-2xl ${s.c}/10 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform`}>
                        <Monitor className="w-7 h-7" />
                     </div>
                     <h3 className="text-2xl font-black font-['Outfit'] mb-4 tracking-tight">{s.n}</h3>
                     <p className="text-sm text-neutral-500 font-medium leading-relaxed">{s.d}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Footer System */}
      <footer className="pt-32 pb-16 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 relative z-10">
            <div className="lg:col-span-4 space-y-8">
               <Link to="/" className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-primary rounded-2xl flex items-center justify-center shadow-xl shadow-accent-primary/20">
                     <TrendingUp className="text-white w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black font-['Outfit'] tracking-tighter">SMM<span className="text-accent-primary">Grows</span></span>
               </Link>
               <p className="text-neutral-500 text-sm font-medium leading-relaxed max-w-sm">
                  The world's most advanced SMM infrastructure providers in Bangladesh and Asia. We power growth for over 50,000 businesses worldwide through automation and elite networking.
               </p>
               <div className="flex gap-4">
                  {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                    <button key={i} className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-neutral-400 hover:bg-accent-primary hover:text-white transition-all">
                       <Icon className="w-5 h-5" />
                    </button>
                  ))}
               </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Platform</h4>
               <ul className="space-y-4 text-sm font-bold text-neutral-500">
                  {['Services', 'API Docs', 'Updates', 'Status'].map(v => (
                    <li key={v}><a href="#" className="hover:text-white transition-colors">{v}</a></li>
                  ))}
               </ul>
            </div>

            <div className="lg:col-span-2 space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Company</h4>
               <ul className="space-y-4 text-sm font-bold text-neutral-500">
                  {['About', 'Our Team', 'Privacy', 'Terms'].map(v => (
                    <li key={v}><a href="#" className="hover:text-white transition-colors">{v}</a></li>
                  ))}
               </ul>
            </div>

            <div className="lg:col-span-4 space-y-8 p-10 bg-accent-primary/5 rounded-[3rem] border border-accent-primary/10">
               <div>
                  <h4 className="text-lg font-black font-['Outfit'] mb-2">Join the Newsletter</h4>
                  <p className="text-[11px] font-bold text-neutral-600 uppercase tracking-widest leading-relaxed">Weekly elite market insights delivered.</p>
               </div>
               <div className="relative group">
                  <input type="email" placeholder="Your work email" className="w-full h-14 bg-black/40 border border-white/5 rounded-2xl px-6 text-sm font-bold focus:outline-none focus:border-accent-primary transition-all shadow-inner" />
                  <button className="absolute right-2 top-2 h-10 px-6 bg-accent-primary rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/20 hover:scale-105 active:scale-95 transition-all">Submit</button>
               </div>
               <div className="flex items-center gap-3 text-accent-primary">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted Growth</span>
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-6 mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold text-neutral-700 uppercase tracking-[0.4em]">&copy; 2026 SMM Grows Network • Global Elite HQ</p>
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-700 uppercase tracking-[0.2em]"><Globe className="w-4 h-4" /> Bangladesh</div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-700 uppercase tracking-[0.2em]"><Zap className="w-4 h-4" /> v4.0.2</div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Landing;

