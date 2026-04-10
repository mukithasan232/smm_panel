import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Send, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  ChevronDown, 
  Menu, 
  X,
  CreditCard,
  TrendingUp,
  Globe,
  Star,
  ZapOff,
  Clock,
  CheckCircle2,
  ChevronRight,
  Monitor,
  Smartphone,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Payments', href: '#payments' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${scrolled ? 'bg-slate-900/95 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-12">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-accent-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-accent-primary/20 group-hover:rotate-12 transition-transform duration-500">
            <TrendingUp className="text-white w-7 h-7" />
          </div>
          <span className="text-3xl font-black tracking-tighter font-['Outfit']">
            SMM<span className="text-accent-primary">Gen</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-4 pl-6 border-l border-glass-border">
            <Link to="/login" className="text-sm font-black uppercase tracking-widest hover:text-accent-primary transition-colors">Login</Link>
            <Link to="/signup" className="px-8 py-3.5 rounded-2xl bg-accent-primary hover:bg-[#6e3dfa] text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-accent-primary/20 hover:shadow-accent-primary/40 -translate-y-0.5 hover:-translate-y-1 active:scale-[0.98]">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden w-12 h-12 flex items-center justify-center bg-white/5 border border-glass-border rounded-xl text-white" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-0 w-full p-4 lg:hidden z-50"
          >
            <div className="bg-[#0f0f18] rounded-[2.5rem] border border-glass-border shadow-2xl p-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-[1px] bg-white/5 my-2" />
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full h-14 rounded-2xl flex items-center justify-center border border-glass-border text-sm font-black uppercase tracking-widest hover:bg-white/5 transition-all">Login</Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full h-14 rounded-2xl flex items-center justify-center bg-accent-primary text-sm font-black uppercase tracking-widest shadow-xl shadow-accent-primary/20">Sign Up</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-52 pb-32 overflow-hidden">
    {/* Abstract Glows */}
    <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-accent-primary/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-accent-primary/30 bg-accent-primary/10 text-accent-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-lg shadow-accent-primary/5">
          <Star className="w-4 h-4 fill-current" /> Bangladesh's Elite SMM Hub
        </div>
        <h1 className="text-6xl md:text-[5.5rem] lg:text-[6rem] font-black leading-[0.9] font-['Outfit'] tracking-tighter mb-10">
          Scale Your <br />
          <span className="text-accent-primary">Digital Empire</span> <br />
          Instantly.
        </h1>
        <p className="text-xl text-neutral-500 mb-14 max-w-xl leading-relaxed font-medium">
          The ultimate engine for social growth. Secure, automated, and lightning-fast services for creators who demand the best.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link to="/signup" className="w-full sm:w-auto px-10 py-5 rounded-2.5xl bg-accent-primary hover:bg-[#6e3dfa] text-lg font-black uppercase tracking-widest transition-all shadow-2xl shadow-accent-primary/30 hover:shadow-accent-primary/50 -translate-y-1 hover:-translate-y-2 flex items-center justify-center gap-3">
            Start Growing <Zap className="w-5 h-5 fill-current" />
          </Link>
          <div className="flex -space-x-3">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-primary overflow-hidden">
                 <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
               </div>
             ))}
             <div className="w-10 h-10 rounded-full border-2 border-bg-primary bg-neutral-800 flex items-center justify-center text-[10px] font-bold">+10k</div>
          </div>
          <span className="text-sm font-bold text-neutral-500">Trusted by creators</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotate: 5 }} 
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative perspective-1000"
      >
        <div className="absolute inset-0 bg-accent-primary/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="relative z-10 p-4 bg-white/5 border border-glass-border rounded-[3rem] backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)] transform-gpu hover:rotate-2 transition-transform duration-700">
           <img 
            src={heroImg} 
            alt="SMMGen Dashboard Preview" 
            className="w-full h-auto rounded-[2.5rem] drop-shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-500" 
          />
        </div>
        
        {/* Floating Stat Card */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-3xl shadow-2xl border border-white/20 text-bg-primary hidden lg:block"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Growth Index</p>
          <p className="text-3xl font-black font-['Outfit']">+420%</p>
          <div className="flex gap-1 mt-2">
            {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-accent-primary rounded-full"></div>)}
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const TrustBar = () => (
  <section className="py-20 border-y border-glass-border bg-black/40 relative">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
      {[ 
        { label: 'Total Orders', value: '1.2M+', icon: <Zap className="w-5 h-5" /> }, 
        { label: 'Cloud Servers', value: '48+', icon: <Globe className="w-5 h-5" /> }, 
        { label: 'Active Users', value: '25.4k', icon: <Users className="w-5 h-5" /> }, 
        { label: 'Uptime', value: '99.9%', icon: <CheckCircle2 className="w-5 h-5" /> } 
      ].map((stat, idx) => (
        <div key={idx} className="flex flex-col items-center md:items-start group">
          <div className="text-accent-primary flex items-center gap-3 text-4xl font-black font-['Outfit'] mb-3 group-hover:-translate-y-1 transition-transform">
            {stat.icon} {stat.value}
          </div>
          <p className="text-neutral-500 text-xs font-black uppercase tracking-[0.2em]">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="group p-10 bg-white/5 border border-glass-border rounded-[2.5rem] hover:bg-white/10 hover:border-accent-primary/30 transition-all duration-500"
  >
    <div className="mb-8 w-16 h-16 bg-accent-primary/10 rounded-2xl flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all duration-500 shadow-inner">
      {icon}
    </div>
    <h3 className="text-2xl font-black mb-4 font-['Outfit'] tracking-tight">{title}</h3>
    <p className="text-neutral-500 leading-relaxed font-medium">{desc}</p>
  </motion.div>
);

const Services = () => (
  <section id="services" className="py-32 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-20">
        <div className="max-w-xl">
          <span className="text-accent-primary text-xs font-black uppercase tracking-[0.3em] mb-4 block">Premium Catalog</span>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Everything You Need <br /> In One Place.</h2>
        </div>
        <p className="text-neutral-500 max-w-sm mb-2 font-medium">From viral TikTok trends to professional LinkedIn authority, we've got the tools to scale every platform.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard 
          delay={0.1}
          icon={<Facebook className="w-8 h-8" />}
          title="Facebook Elite"
          desc="Page followers, post engagement, and massive watch time packages."
        />
        <FeatureCard 
          delay={0.2}
          icon={<Instagram className="w-8 h-8" />}
          title="Instagram Pro"
          desc="Grow your presence with genuine profile visits and story expansion."
        />
        <FeatureCard 
          delay={0.3}
          icon={<Youtube className="w-8 h-8" />}
          title="YouTube Viral"
          desc="The fastest way to reach monetization with stable watch hours."
        />
        <FeatureCard 
          delay={0.4}
          icon={<Send className="w-8 h-8" />}
          title="Global Reach"
          desc="TikTok, Telegram, and Discord services optimized for speed."
        />
      </div>
    </div>
  </section>
);

const ManualPayments = () => (
  <section id="payments" className="py-32 bg-accent-primary/5 border-y border-accent-primary/10 relative overflow-hidden">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/10 blur-[150px] pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-[#0c0c14] border border-glass-border rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden shadow-3xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <span className="text-accent-primary text-xs font-black uppercase tracking-[0.3em] mb-4 block">Secure Infrastructure</span>
            <h2 className="text-5xl font-black mb-8 leading-tight">Trust Your Capital With <span className="text-accent-primary">The Best</span>.</h2>
            <p className="text-xl text-neutral-500 mb-12 font-medium italic">"Payment security is our #1 priority. We support all leading Bangladeshi gateways with manual verification."</p>
            
            <div className="space-y-6">
              {[ 
                'Instant balance approval via manual check', 
                'Zero transaction fees on local gateways', 
                '24/7 financial support for order disputes' 
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-accent-primary/20 rounded-full flex items-center justify-center shrink-0 mt-1 border border-accent-primary/30">
                    <CheckCircle2 className="w-4 h-4 text-accent-primary" />
                  </div>
                  <span className="text-neutral-300 font-bold">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[ 
              { label: 'bKash Personal', val: '01700-000000', color: 'border-pink-500', bg: 'bg-pink-500/10', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670151.png' }, 
              { label: 'Nagad Personal', val: '01900-000000', color: 'border-orange-500', bg: 'bg-orange-500/10', icon: 'https://seeklogo.com/images/N/nagad-logo-7A70BB6604-seeklogo.com.png' }, 
              { label: 'Rocket Personal', val: '01800-000000', color: 'border-purple-500', bg: 'bg-purple-500/10', icon: 'https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png' } 
            ].map((method, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ x: 10 }}
                className={`p-8 bg-white/5 border border-glass-border rounded-3xl flex items-center justify-between group transition-all`}
              >
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">{method.label}</p>
                   <p className="text-2xl font-black font-mono tracking-tighter group-hover:text-accent-primary transition-colors">{method.val}</p>
                </div>
                <div className={`w-14 h-14 ${method.bg} rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform`}>
                  <CreditCard className="w-7 h-7" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = [ 
    { q: 'How fast is the delivery?', a: 'Most services start instantly. Larger orders are dripped over 24-48 hours to ensure maximum safety and profile stability.' }, 
    { q: 'Is it safe for my account?', a: 'Completely. We use private server clusters and organic distribution methods. We will NEVER ask for your password.' }, 
    { q: 'Can I get a refund?', a: 'Yes. If your order cannot be completed for any technical reason, the funds are instantly returned to your panel balance.' }, 
    { q: 'How do I add funds?', a: 'Simply choose bKash, Nagad or Rocket, send the money, and submit your Transaction ID. Balance is added within 5-15 minutes.' } 
  ];

  return (
    <section id="faq" className="py-32">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-5xl font-black mb-16 text-center font-['Outfit']">Frequently Asked <span className="text-accent-primary">Questions</span></h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white/5 rounded-[2rem] border border-glass-border overflow-hidden">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)} 
                className="w-full p-8 text-left flex justify-between items-center group"
              >
                <span className="font-black text-xl group-hover:text-accent-primary transition-colors">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform ${openIdx === idx ? 'rotate-180 bg-accent-primary text-white' : ''}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="p-8 pt-0 text-neutral-500 font-medium leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
);
};

const Footer = () => (
  <footer className="pt-32 pb-16 bg-[#08080c] border-t border-glass-border">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-4 gap-20 mb-20">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-accent-primary w-8 h-8" />
            <span className="text-3xl font-black font-['Outfit'] tracking-tighter">SMM<span className="text-accent-primary">Gen</span></span>
          </div>
          <p className="text-neutral-500 text-lg max-w-md leading-relaxed font-medium">
            Building the infrastructure for modern social growth. The most trusted SMM engine in South Asia, serving thousands of marketers worldwide.
          </p>
          <div className="flex gap-4 mt-8">
             {[Facebook, Instagram, Youtube, Send].map((Icon, i) => (
               <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-glass-border flex items-center justify-center hover:bg-accent-primary transition-all group">
                 <Icon className="w-6 h-6 text-neutral-400 group-hover:text-white" />
               </a>
             ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-10 col-span-2">
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-8">Platform</h4>
            <div className="flex flex-col gap-4 text-neutral-500 font-bold">
               <a href="#services" className="hover:text-accent-primary transition-all">Our Services</a>
               <a href="#payments" className="hover:text-accent-primary transition-all">Add Funds</a>
               <a href="/login" className="hover:text-accent-primary transition-all">Dashboard</a>
               <a href="/signup" className="hover:text-accent-primary transition-all">Sign Up</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-8">Support</h4>
            <div className="flex flex-col gap-4 text-neutral-500 font-bold">
               <a href="#" className="flex items-center gap-2 hover:text-accent-primary transition-all"><Monitor className="w-4 h-4" /> Live Support</a>
               <a href="#" className="flex items-center gap-2 hover:text-accent-primary transition-all"><Smartphone className="w-4 h-4" /> WhatsApp</a>
               <a href="#" className="flex items-center gap-2 hover:text-accent-primary transition-all"><Send className="w-4 h-4" /> Telegram</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-600 text-[10px] font-black uppercase tracking-[0.3em]">
         <p>&copy; 2026 SMMGEN NETWORK. ALL RIGHTS RESERVED.</p>
         <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-all">Terms of Service</a>
         </div>
      </div>
    </div>
  </footer>
);

const Landing = () => (
  <div className="bg-bg-primary text-white selection:bg-accent-primary selection:text-white">
    <Navbar />
    <main>
      <Hero />
      <TrustBar />
      <Services />
      <ManualPayments />
      <FAQ />
    </main>
    <Footer />
  </div>
);

export default Landing;

