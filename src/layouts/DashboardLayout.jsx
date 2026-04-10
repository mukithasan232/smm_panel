import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  PlusCircle, 
  History, 
  Wallet, 
  HelpCircle, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  User,
  Settings,
  Code2,
  ShoppingCart,
  Moon,
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
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarLink = ({ to, icon, label, collapsed, onClick }) => (
  <NavLink 
    to={to} 
    onClick={onClick}
    className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group
      ${isActive 
        ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' 
        : 'text-neutral-400 hover:bg-white/5 hover:text-white'
      }
      ${collapsed ? 'justify-center px-0 w-12 mx-auto' : ''}
    `}
  >
    <div className={`shrink-0 transition-transform duration-300 ${collapsed ? '' : 'group-hover:scale-110'}`}>
      {icon}
    </div>
    {!collapsed && <motion.span 
      initial={{ opacity: 0, x: -10 }} 
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="truncate"
    >
      {label}
    </motion.span>}
  </NavLink>
);

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile drawer
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // For desktop collapse
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // AUTH PROTECT: Redirect to login if no token found
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!token || !user) {
      navigate('/login');
    } else {
      setUserData(user);
    }
  }, [navigate]);

  const menuItems = [
    { to: '/dashboard', icon: <PlusCircle className="w-5 h-5" />, label: 'New order' },
    { to: '/dashboard/mass-order', icon: <Code2 className="w-5 h-5" />, label: 'Mass order' },
    { to: '/dashboard/orders', icon: <History className="w-5 h-5" />, label: 'Orders' },
    { to: '/dashboard/services', icon: <TrendingUp className="w-5 h-5" />, label: 'Services' },
    { to: '/dashboard/add-funds', icon: <Wallet className="w-5 h-5" />, label: 'Add funds' },
    { to: '/dashboard/support', icon: <HelpCircle className="w-5 h-5" />, label: 'Support Box' },
  ];

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className="h-screen bg-bg-primary text-white flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed inset-y-0 left-0 z-[200] bg-slate-900/95 backdrop-blur-3xl border-r border-white/10 flex flex-col transition-all duration-300
        lg:static lg:translate-x-0 shrink-0
        ${isSidebarCollapsed ? 'w-24' : 'w-72'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full relative p-6">
          {/* Logo Section */}
          <div className={`mb-12 mt-2 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-primary rounded-2xl flex items-center justify-center shadow-lg shadow-accent-primary/25 shrink-0">
                <TrendingUp className="text-white w-5 h-5" />
              </div>
              {!isSidebarCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl font-bold tracking-tight whitespace-nowrap"
                >
                  SMM<span className="text-accent-primary font-black">Gen</span>
                </motion.span>
              )}
            </Link>
            
            {/* Close Button Mobile */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar -mx-2 px-2">
            {menuItems.map(item => (
              <SidebarLink 
                key={item.to}
                {...item} 
                collapsed={isSidebarCollapsed}
                onClick={() => setIsSidebarOpen(false)}
              />
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-auto space-y-4 pt-4 border-t border-white/5">
            <button 
              onClick={toggleSidebar}
              className={`
                hidden lg:flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-neutral-400 hover:bg-white/5 hover:text-white transition-all
                ${isSidebarCollapsed ? 'justify-center' : ''}
              `}
            >
              <LayoutGrid className="w-5 h-5 shrink-0" />
              {!isSidebarCollapsed && <span>Collapse Menu</span>}
            </button>
            
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
              }}
              className={`
              flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all
              ${isSidebarCollapsed ? 'justify-center' : ''}
            `}>
              <LogOut className="w-5 h-5 shrink-0" />
              {!isSidebarCollapsed && <span>Log Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen transition-all duration-300">
        {/* Top Header */}
        <header className="sticky top-0 bg-[#111827]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 z-[100] h-20 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden md:flex items-center gap-3 bg-bg-secondary border border-white/5 rounded-2xl px-5 py-3 focus-within:border-accent-primary/50 transition-all duration-300 shadow-inner group">
               <Search className="w-5 h-5 text-neutral-600 group-focus-within:text-accent-primary transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search services..." 
                 className="bg-transparent border-none outline-none text-sm w-80 placeholder:text-neutral-600 font-semibold"
               />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* User Stats - Condensed for Top Nav */}
            <div className="hidden sm:flex items-center gap-5 pr-6 border-r border-white/5 h-10">
               <div className="flex flex-col items-end justify-center">
                  <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest leading-none mb-1">Available Balance</p>
                  <p className="text-lg font-black text-white tabular-nums leading-none">৳ {userData?.balance?.toFixed(2) || '0.00'}</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-accent-primary/5 flex items-center justify-center border border-accent-primary/20 shadow-inner">
                  <Wallet className="w-5 h-5 text-accent-primary" />
               </div>
            </div>
            
            <div className="flex items-center gap-3 pl-2 relative">
              <button className="p-2.5 text-neutral-400 hover:text-white relative transition-all rounded-xl hover:bg-white/5">
                <Bell className="w-5 h-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-[#111827]"></span>
              </button>
              
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-11 h-11 rounded-2xl overflow-hidden border border-white/10 hover:border-accent-primary transition-all duration-300 shadow-xl"
              >
                <img src="https://ui-avatars.com/api/?name=MK&background=6366F1&color=fff&bold=true" alt="Profile" className="w-full h-full object-cover" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="profile-dropdown z-20"
                    >
                      <div className="px-4 py-3 border-b border-glass-border mb-2 bg-white/5 rounded-t-xl group">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[10px] text-accent-primary uppercase tracking-widest font-black leading-none bg-accent-primary/10 px-2 py-0.5 rounded-full border border-accent-primary/20">{userData?.role || 'User'}</p>
                        </div>
                        <p className="text-sm font-bold truncate">{userData?.name || 'maddoggamingbd'}</p>
                        <p className="text-xs text-neutral-500 truncate">{userData?.email}</p>
                      </div>
                      <div className="p-1">
                        <button onClick={() => setIsProfileOpen(false)} className="dropdown-item">
                          <User className="w-4 h-4" /> Profile
                        </button>
                        <button onClick={() => setIsProfileOpen(false)} className="dropdown-item">
                          <Settings className="w-4 h-4" /> Settings
                        </button>
                        <button onClick={() => setIsProfileOpen(false)} className="dropdown-item">
                          <Code2 className="w-4 h-4" /> Developer API
                        </button>
                        <div className="my-2 border-t border-glass-border" />
                        <button 
                          onClick={() => { 
                             setIsProfileOpen(false);
                             localStorage.removeItem('token');
                             localStorage.removeItem('user');
                             navigate('/login'); 
                          }} 
                          className="dropdown-item text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative z-0">
          <div className="max-w-7xl mx-auto w-full pb-20">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
