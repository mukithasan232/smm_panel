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
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="input-glass h-14 pl-12 pr-12 bg-black/40 border-white/5 group-hover/input:border-white/10 focus:border-accent-primary/40 transition-all text-sm font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
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

            <div className="relative flex items-center gap-4 py-2 mt-8 relative z-10">
              <div className="h-[1px] flex-1 bg-white/5"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Or continue with</span>
              <div className="h-[1px] flex-1 bg-white/5"></div>
            </div>
            
            <button
              type="button"
              onClick={() => toast.error('Google login API integration coming soon!')}
              className="relative z-10 w-full h-14 bg-white hover:bg-neutral-200 text-black rounded-2xl text-[13px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-colors mt-6 shadow-xl"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Google
            </button>

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

