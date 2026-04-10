import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  RefreshCw,
  ExternalLink,
  Copy,
  RotateCw,
  XCircle,
  Eye
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminOverview = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenu, setOpenMenu] = useState(null); // tracks which order's menu is open
  const [syncing, setSyncing] = useState(null); // tracks which order is syncing

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [ordersRes, usersRes, paymentsRes, balanceRes] = await Promise.all([
        fetch('/api/orders', { headers }),
        fetch('/api/users', { headers }),
        fetch('/api/payments', { headers }),
        fetch('/api/services/provider-balance', { headers }),
      ]);

      const ordersData = await ordersRes.json();
      const usersData = await usersRes.json();
      const paymentsData = await paymentsRes.json();
      const balanceData = await balanceRes.json();

      const allOrders = ordersData.success ? ordersData.data : [];
      const allUsers = usersData.success ? usersData.data : [];
      const allPayments = paymentsData.success ? paymentsData.data : [];

      const totalRevenue = allOrders
        .filter(o => ['completed', 'Completed'].includes(o.status))
        .reduce((sum, o) => sum + (o.charge || 0), 0);

      const pendingOrders = allOrders.filter(o => ['pending', 'Pending', 'processing', 'Processing', 'In Progress'].includes(o.status)).length;
      const pendingPayments = allPayments.filter(p => ['pending', 'Pending'].includes(p.status)).length;

      const smmBalanceUSD = parseFloat(balanceData.data?.balance || '0');
      const smmBalanceBDT = (smmBalanceUSD * 120).toFixed(2);

      setStats([
        { label: 'Platform Revenue', value: `৳ ${totalRevenue.toFixed(2)}`, icon: <TrendingUp className="text-emerald-500" />, bgColor: 'bg-emerald-500/10', trendUp: true, trend: 'Net' },
        { label: 'Total Clients', value: allUsers.length.toLocaleString(), icon: <Users className="text-blue-500" />, bgColor: 'bg-blue-500/10', trendUp: true, trend: `+${allUsers.length}` },
        { label: 'Active Pipeline', value: pendingOrders.toString(), icon: <ShoppingCart className="text-orange-500" />, bgColor: 'bg-orange-500/10', trendUp: false, trend: 'Queue' },
        { label: 'Funding Requests', value: pendingPayments.toString(), icon: <CreditCard className="text-pink-500" />, bgColor: 'bg-pink-500/10', trendUp: true, trend: `${pendingPayments} New` },
        { label: 'API Wallet (BDT)', value: `৳ ${smmBalanceBDT}`, icon: <RefreshCw className="text-purple-500" />, bgColor: 'bg-purple-500/10', trendUp: true, trend: `$ ${smmBalanceUSD}` },
      ]);

      setOrders(allOrders.slice(0, 10));
    } catch (err) {
      setError('ডাটা লোড করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'completed') return 'text-emerald-400 bg-emerald-400/10';
    if (s === 'pending') return 'text-orange-400 bg-orange-400/10';
    if (s === 'processing' || s === 'in progress') return 'text-blue-400 bg-blue-400/10';
    if (s === 'cancelled' || s === 'canceled') return 'text-red-400 bg-red-400/10';
    return 'text-secondary bg-white/5';
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
        <p className="text-secondary text-sm">ডাটা লোড হচ্ছে...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="glass p-10 text-center space-y-4">
      <p className="text-red-400">{error}</p>
      <button onClick={fetchData} className="btn-primary gap-2 mx-auto">
        <RefreshCw className="w-4 h-4" /> আবার চেষ্টা করুন
      </button>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats?.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 group hover:border-accent-primary/50 transition-all cursor-default relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-accent-primary/10 transition-colors" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 rounded-xl border border-white/5 bg-white/5">{stat.icon}</div>
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-black tracking-widest leading-none ${stat.trendUp ? 'text-emerald-500 bg-emerald-500/10' : 'text-orange-500 bg-orange-500/10'}`}>
                {stat.trend}
                {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <p className="text-secondary text-[10px] uppercase font-black tracking-widest mb-1 relative z-10 leading-none">{stat.label}</p>
            <h3 className="text-3xl font-black font-['Outfit'] tracking-tighter relative z-10">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-accent-primary/5 border border-accent-primary/10">
              <span className="text-secondary text-[10px] uppercase font-black tracking-[0.3em] leading-none">Management Log</span>
            </div>
            <h2 className="text-5xl font-black font-['Outfit'] tracking-tighter text-white">API Execution Queue</h2>
          </div>
          <button onClick={fetchData} className="px-8 h-14 rounded-2xl border border-glass-border hover:border-accent-primary text-xs font-black uppercase tracking-widest transition-all hover:bg-accent-primary/10 flex items-center gap-2 group shadow-xl">
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" /> Refresh Data
          </button>
        </div>

        <div className="glass border-white/5 overflow-hidden rounded-3xl">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="py-6 px-10">Reference ID</th>
                  <th>Client</th>
                  <th>Package Name</th>
                  <th>Quantity</th>
                  <th>Charge</th>
                  <th className="w-32">Order Status</th>
                  <th className="text-right pr-10">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-secondary">কোনো অর্ডার পাওয়া যায়নি।</td>
                  </tr>
                ) : orders.map((order) => (
                  <tr key={order._id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 font-bold font-['Outfit'] text-accent-primary px-6">#{order._id?.slice(-5).toUpperCase()}</td>
                    <td className="font-medium">{order.userId?.name || 'N/A'}</td>
                    <td className="text-neutral-400 font-medium truncate max-w-[200px]">{order.serviceName || order.serviceId}</td>
                    <td className="font-black text-xs tracking-widest">{order.quantity?.toLocaleString()}</td>
                    <td className="font-black font-['Outfit'] text-lg">৳ {order.charge?.toFixed(2)}</td>
                    <td>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest leading-none ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-right pr-6 relative">
                      <button 
                        onClick={() => setOpenMenu(openMenu === order._id ? null : order._id)}
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-transparent hover:border-glass-border"
                      >
                        <MoreVertical className="w-4 h-4 text-secondary" />
                      </button>

                      <AnimatePresence>
                        {openMenu === order._id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                            <motion.div
                              initial={{ opacity: 0, y: 5, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 5, scale: 0.95 }}
                              className="absolute right-6 top-full mt-2 w-52 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-20 p-1.5 overflow-hidden"
                            >
                              <button
                                disabled={syncing === order._id}
                                onClick={async () => {
                                  setOpenMenu(null);
                                  setSyncing(order._id);
                                  try {
                                    const token = localStorage.getItem('token');
                                    const res = await fetch(`/api/orders/${order._id}/status`, { headers: { Authorization: `Bearer ${token}` } });
                                    const data = await res.json();
                                    if (data.success) {
                                      setOrders(prev => prev.map(o => o._id === order._id ? { ...o, status: data.status } : o));
                                      toast.success(`Status synced: ${data.status}`);
                                    } else {
                                      toast.error(data.message || 'Sync failed');
                                    }
                                  } catch { toast.error('Sync error'); }
                                  finally { setSyncing(null); }
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 text-xs font-bold text-white hover:bg-accent-primary/10 rounded-xl transition-all"
                              >
                                <RotateCw className={`w-4 h-4 text-accent-primary ${syncing === order._id ? 'animate-spin' : ''}`} /> Sync Status
                              </button>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(order.link || '');
                                  toast.success('Link copied!');
                                  setOpenMenu(null);
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 text-xs font-bold text-white hover:bg-white/5 rounded-xl transition-all"
                              >
                                <Copy className="w-4 h-4 text-blue-400" /> Copy Link
                              </button>
                              <button
                                onClick={() => {
                                  window.open(order.link, '_blank');
                                  setOpenMenu(null);
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 text-xs font-bold text-white hover:bg-white/5 rounded-xl transition-all"
                              >
                                <ExternalLink className="w-4 h-4 text-emerald-400" /> Open Link
                              </button>
                              <div className="border-t border-white/5 my-1" />
                              <button
                                onClick={() => {
                                  toast(`Order #${order._id?.slice(-5).toUpperCase()}\nService: ${order.serviceName}\nQty: ${order.quantity}\nCharge: ৳${order.charge?.toFixed(2)}\nProvider ID: ${order.smmgenOrderId || 'N/A'}`, { icon: '📋', duration: 5000 });
                                  setOpenMenu(null);
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 text-xs font-bold text-white hover:bg-white/5 rounded-xl transition-all"
                              >
                                <Eye className="w-4 h-4 text-purple-400" /> View Details
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
