import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  RefreshCw
} from 'lucide-react';

const AdminOverview = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        .filter(o => o.status === 'Completed')
        .reduce((sum, o) => sum + (o.charge || 0), 0);

      const pendingOrders = allOrders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
      const pendingPayments = allPayments.filter(p => p.status === 'Pending').length;

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
    switch (status) {
      case 'Completed': return 'text-emerald-400 bg-emerald-400/10';
      case 'Pending': return 'text-orange-400 bg-orange-400/10';
      case 'Processing': return 'text-blue-400 bg-blue-400/10';
      case 'Cancelled': return 'text-red-400 bg-red-400/10';
      default: return 'text-secondary bg-white/5';
    }
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
                    <td className="font-medium">{order.user?.name || 'N/A'}</td>
                    <td className="text-neutral-400 font-medium truncate max-w-[200px]">{order.serviceName || order.serviceId}</td>
                    <td className="font-black text-xs tracking-widest">{order.quantity?.toLocaleString()}</td>
                    <td className="font-black font-['Outfit'] text-lg">৳ {order.charge?.toFixed(2)}</td>
                    <td>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest leading-none ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-right pr-6">
                      <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-transparent hover:border-glass-border">
                        <MoreVertical className="w-4 h-4 text-secondary" />
                      </button>
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
