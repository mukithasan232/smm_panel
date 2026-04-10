const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${scrolled ? 'bg-white text-slate-900 border-b border-slate-200 py-3' : 'bg-transparent py-6 text-white'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-12">
        <Link to="/" className="flex items-center gap-2 group">
           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <TrendingUp className="text-white w-6 h-6" />
           </div>
           <span className="text-2xl font-black tracking-tight font-['Outfit']">SMM<span className="text-indigo-600">Gen</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
           {['Sign in', 'Blog', 'About Us', 'Contact Us'].map(item => (
             <a key={item} href="#" className="text-xs font-black uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">{item}</a>
           ))}
           <Link to="/signup" className="px-8 py-3 rounded-xl bg-indigo-600 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:-translate-y-0.5 transition-all">
             Sign Up
           </Link>
        </div>
      </div>
    </nav>
  );
};

const Landing = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white selection:bg-indigo-600 selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
               <h1 className="text-6xl md:text-7xl font-black font-['Outfit'] tracking-tight leading-[1] mb-8">
                 Best & <span className="text-indigo-500">Cheap SMM <br/> Panel</span> for Social <br/> Media Growth
               </h1>
               <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl mb-12">
                 SMMGen is the cheapest SMM Panel that helps your business grow on social media. Many users trust us because we give real results. Start growing today.
               </p>

               {/* Integrated Login Box */}
               <div className="max-w-md space-y-6">
                  <form onSubmit={handleLogin} className="grid grid-cols-2 gap-4">
                     <div className="col-span-1">
                        <input 
                          type="text" 
                          placeholder="Username" 
                          className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-medium focus:outline-none focus:border-indigo-600 transition-all"
                        />
                     </div>
                     <div className="col-span-1">
                        <input 
                          type="password" 
                          placeholder="Password" 
                          className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-medium focus:outline-none focus:border-indigo-600 transition-all"
                        />
                     </div>
                     <div className="col-span-1 flex items-center gap-2 px-1">
                        <input type="checkbox" id="rem" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                        <label htmlFor="rem" className="text-xs font-bold text-slate-500">Remember me</label>
                     </div>
                     <div className="col-span-1 text-right">
                        <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-500">Forgot password? <span className="text-slate-400">Reset</span></a>
                     </div>
                     <button className="col-span-1 h-14 bg-indigo-600 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all">Sign in</button>
                     <button type="button" className="col-span-1 h-14 bg-white border border-slate-200 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                        <img src="https://www.google.com/favicon.ico" className="w-4 h-4" /> Sign In with Google
                     </button>
                  </form>
                  <p className="text-sm font-bold text-slate-400">Don't Have an Account? <Link to="/signup" className="text-indigo-600">Signup Now</Link></p>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
               <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=2000" className="w-full h-auto" />
               </div>
               {/* Floating Overlays */}
               <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -left-10 bottom-20 z-20 glass-light p-5 rounded-2xl shadow-xl border border-white/50 bg-white/70 backdrop-blur-xl">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Follower Growth</p>
                  <p className="text-2xl font-black text-indigo-600">16.2k</p>
                  <div className="h-2 w-32 bg-slate-100 rounded-full mt-2 overflow-hidden"><div className="w-2/3 h-full bg-indigo-600"></div></div>
               </motion.div>
               <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -right-5 top-20 z-20 glass-light p-5 rounded-2xl shadow-xl border border-white/50 bg-white/70 backdrop-blur-xl max-w-[200px]">
                  <p className="text-xs font-bold text-slate-900 mb-1">Facebook Real Followers</p>
                  <span className="text-[9px] font-bold text-emerald-600 uppercase">In progress</span>
               </motion.div>
            </motion.div>
         </div>
      </section>

      {/* Services Grid (Condensed) */}
      <section className="py-20 max-w-7xl mx-auto px-6">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Instagram', 'Facebook', 'YouTube', 'TikTok'].map(s => (
               <div key={s} className="p-8 bg-white border border-slate-100 rounded-3xl hover:border-indigo-600/30 transition-all shadow-sm group">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                     <Monitor className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{s} Services</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">High quality engagement and followers with 100% safety.</p>
               </div>
            ))}
         </div>
      </section>

      <footer className="py-10 border-t border-slate-100 text-center">
         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">&copy; 2026 SMMGen Network. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;

