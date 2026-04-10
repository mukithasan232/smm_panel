import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  User, 
  Mail, 
  Lock, 
  Zap,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const toastId = toast.loading(isLogin ? 'Authenticating...' : 'Creating account...');
    
    try {
      const response = await fetch(isLogin ? '/api/auth/login' : '/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLogin ? { email, password } : { name, email, password })
      });

      const result = await response.json();
      
      if (result.success) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!', { id: toastId });
        navigate(result.data.user.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        toast.error(result.message || 'Authentication failed', { id: toastId });
      }
    } catch (error) {
      toast.error('Network error. Please try again.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col relative selection:bg-accent-primary selection:text-white overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#7c4dff]/5 blur-[100px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(124,77,255,0.02)_0%,transparent_70%)]"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full overflow-y-auto no-scrollbar">
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-accent-primary/20">
              <TrendingUp className="text-white w-7 h-7" />
            </div>
            <span className="text-3xl font-black tracking-tighter font-['Outfit']">
              SMM<span className="text-accent-primary">Gen</span>
            </span>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[460px]"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-black font-['Outfit'] tracking-tight mb-4">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h1>
            <p className="text-neutral-500 font-medium">
              {isLogin ? 'Log in to manage your social growth engine' : 'Start your journey towards social excellence today.'}
            </p>
          </div>

          <div className="bg-[#0c0c14]/80 backdrop-blur-3xl p-8 sm:p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
            {/* Top highlight bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, mb: 0 }}
                    animate={{ opacity: 1, height: 'auto', mb: 24 }}
                    exit={{ opacity: 0, height: 0, mb: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-1">Full Name</label>
                    <div className="relative group/input">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 group-focus-within/input:text-accent-primary transition-colors" />
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="input-glass h-14 pl-12 bg-black/40 border-white/5 group-hover/input:border-white/10 focus:border-accent-primary/40 transition-all text-sm font-medium"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-1">Email Address</label>
                <div className="relative group/input">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 group-focus-within/input:text-accent-primary transition-colors" />
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="input-glass h-14 pl-12 bg-black/40 border-white/5 group-hover/input:border-white/10 focus:border-accent-primary/40 transition-all text-sm font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Password</label>
                   {isLogin && <button type="button" className="text-[10px] font-black uppercase text-accent-primary hover:text-white transition-colors">Forgot?</button>}
                </div>
                <div className="relative group/input">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 group-focus-within/input:text-accent-primary transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="input-glass h-14 pl-12 bg-black/40 border-white/5 group-hover/input:border-white/10 focus:border-accent-primary/40 transition-all text-sm font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary w-full h-16 rounded-2xl text-[13px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-accent-primary/20 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all"
              >
                {isLoading ? <Zap className="w-5 h-5 animate-pulse" /> : (isLogin ? 'Sign In' : 'Create Account')}
                {!isLoading && <ChevronRight className="w-5 h-5" />}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 text-center relative z-10">
              <p className="text-neutral-500 text-sm font-medium">
                {isLogin ? "Don't have an account?" : "Already a member?"}
                <button 
                  onClick={() => navigate(isLogin ? '/signup' : '/login')}
                  className="text-white font-black ml-2 hover:text-accent-primary transition-colors"
                >
                  {isLogin ? 'Join Now' : 'Sign In Now'}
                </button>
              </p>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><ShieldCheck className="w-4 h-4" /> SECURED</div>
             <div className="w-1.5 h-1.5 rounded-full bg-neutral-700"></div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><CheckCircle2 className="w-4 h-4" /> ELITE TRUST</div>
          </div>
        </motion.div>
      </div>

      <footer className="p-10 text-center relative z-10 text-neutral-600 shrink-0 bg-transparent">
         <p className="text-[10px] font-black uppercase tracking-[0.4em]">
           &copy; {new Date().getFullYear()} SMMGEN WORLDWIDE • PREMIUM AUTHENTICATION
         </p>
      </footer>
    </div>
  );
};

export default Auth;

