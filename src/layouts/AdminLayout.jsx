import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  ShoppingCart, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  User,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarLink = ({ to, icon, label, onClick }) => (
  <NavLink 
    to={to} 
    onClick={onClick}
    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
    end={to === '/admin'}
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();

  // Auth Guard: Admin only
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!token || !user || user.role !== 'admin') {
      navigate('/login');
    } else {
      setAdminUser(user);
    }
  }, [navigate]);

  const menuItems = [
    { to: '/admin', icon: <LayoutDashboard className="w-5 h-5" />, label: 'ওভারভিউ' },
    { to: '/admin/users', icon: <Users className="w-5 h-5" />, label: 'ইউজার ম্যানেজ' },
    { to: '/admin/payments', icon: <CreditCard className="w-5 h-5" />, label: 'পেমেন্ট রিকোয়েস্ট' },
    { to: '/admin/orders', icon: <ShoppingCart className="w-5 h-5" />, label: 'সব অর্ডার' },
    { to: '/dashboard', icon: <LogOut className="w-5 h-5 rotate-180" />, label: 'ড্যাশবোর্ডে ফিরুন' },
  ];

  return (
    <div className="h-screen bg-bg-primary text-white flex overflow-hidden">
      {/* Background Orbs */}
      <div className="bg-animation">
        <div className="orb w-96 h-96 bg-accent-primary/10 top-[-10%] left-[-10%]"></div>
        <div className="orb w-[500px] h-[500px] bg-purple-600/5 bottom-[-10%] right-[-10%]"></div>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 w-[280px] bg-bg-secondary/60 backdrop-blur-xl border-r border-glass-border hidden lg:flex lg:static shrink-0 flex-col p-8 z-50">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10 px-2 flex-shrink-0">
            <div className="p-2.5 bg-accent-primary rounded-xl shadow-lg shadow-accent-primary/20">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter font-['Outfit']">SMM<span className="text-accent-primary">Grows</span> <span className="text-xs uppercase opacity-30 tracking-[0.3em] font-black ml-1">Staff</span></span>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            {menuItems.map(item => <SidebarLink key={item.to} {...item} />)}
          </nav>

          <div className="pt-6 mt-6 border-t border-glass-border flex-shrink-0">
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
              }}
              className="sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <LogOut className="w-5 h-5" />
              <span>প্রস্থান করুন</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Sidebar - Mobile drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] lg:hidden"
            />
            <motion.aside 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed left-0 top-0 h-full w-[280px] bg-slate-900/95 backdrop-blur-2xl border-r border-glass-border flex flex-col p-6 z-[70] lg:hidden"
            >
              <div className="flex items-center justify-between mb-10 px-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-accent-primary w-6 h-6" />
                  <span className="text-xl font-black tracking-tighter">SMM<span className="text-accent-primary">Grows</span></span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="p-2 text-secondary hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 space-y-2">
                {menuItems.map(item => (
                  <SidebarLink key={item.to} {...item} onClick={() => setIsSidebarOpen(false)} />
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Top Header */}
        <header className="sticky top-0 bg-bg-primary/95 backdrop-blur-2xl border-b border-glass-border flex items-center justify-between px-6 md:px-10 z-[100] h-20 shrink-0">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-secondary hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block">
              <h1 className="text-xl font-black font-['Outfit'] tracking-tight uppercase flex items-center gap-3">
                <LayoutDashboard className="w-5 h-5 text-accent-primary" />
                Dashboard Overview
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-2.5 px-4 py-2 bg-accent-primary/5 rounded-2xl border border-accent-primary/20">
              <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary leading-none">Management Mode</span>
            </div>
            
            <div className="flex items-center gap-4 relative">
              <button className="p-2 text-secondary hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent-primary rounded-full border-2 border-bg-secondary"></span>
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center hover:bg-accent-primary/20 transition-all overflow-hidden"
                >
                  <Shield className="w-5 h-5 text-accent-primary" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-4 w-64 p-3 bg-bg-secondary/95 backdrop-blur-xl border border-glass-border rounded-2xl shadow-2xl space-y-1"
                    >
                      <div className="px-4 py-3 border-b border-white/5 mb-2">
                        <p className="text-[10px] text-secondary uppercase tracking-[0.2em] font-black mb-1 leading-none">Administrator</p>
                        <p className="text-sm font-bold truncate">{adminUser?.email || 'admin@smmelitebd.com'}</p>
                        <p className="text-xs text-secondary">{adminUser?.name}</p>
                      </div>
                      <button onClick={() => setIsProfileOpen(false)} className="dropdown-item">
                        <User className="w-4 h-4" /> প্রোফাইল সেটিংস
                      </button>
                      <button 
                        onClick={() => { 
                          setIsProfileOpen(false); 
                          localStorage.removeItem('token');
                          localStorage.removeItem('user');
                          navigate('/login'); 
                        }} 
                        className="dropdown-item text-red-400 hover:bg-red-500/10 hover:text-red-300 mt-2"
                      >
                        <LogOut className="w-4 h-4" /> সাইন আউট
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto pt-14 pb-24 px-6 md:px-10 custom-scrollbar relative z-0">
          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
