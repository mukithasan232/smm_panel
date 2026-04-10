import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';

const AdminOverview = () => {
  const stats = [
    { label: 'মোট রেভিনিউ', value: '৳ ৪৮,৪৫০.০০', icon: <TrendingUp className="text-emerald-500" />, trend: '+১২.৫%', trendUp: true, bgColor: 'bg-emerald-500/10' },
    { label: 'মোট ইউজার', value: '১,২৪০', icon: <Users className="text-blue-500" />, trend: '+৫.২%', trendUp: true, bgColor: 'bg-blue-500/10' },
    { label: 'পেন্ডিং অর্ডার', value: '৪২', icon: <ShoppingCart className="text-orange-500" />, trend: '-৩.১%', trendUp: false, bgColor: 'bg-orange-500/10' },
    { label: 'পেন্ডিং পেমেন্ট', value: '১২', icon: <CreditCard className="text-pink-500" />, trend: '+৮.৪%', trendUp: true, bgColor: 'bg-pink-500/10' },
  ];

  const recentOrders = [
    { id: 5042, user: 'মুকিত হাসান', service: 'FB Page Followers', quantity: '১০০০', cost: '৳ ১২০', status: 'Processing' },
    { id: 5041, user: 'তানভীর আহমেদ', service: 'YT Watch Time', quantity: '৪০০০', cost: '৳ ৮৫০', status: 'Pending' },
    { id: 5040, user: 'সাকিব আল হাসান', service: 'IG Likes', quantity: '৫০০', cost: '৳ ৪০', status: 'Completed' },
    { id: 5039, user: 'রাকিবুল ইসলাম', service: 'TikTok Views', quantity: '১০০০০', cost: '৳ ১৫০', status: 'Processing' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-emerald-400 bg-emerald-400/10';
      case 'Pending': return 'text-orange-400 bg-orange-400/10';
      case 'Processing': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-secondary bg-white/5';
    }
  };

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 group hover:border-accent-primary/50 transition-all cursor-default relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-accent-primary/10 transition-colors"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-xl border border-white/5 bg-white/5`}>{stat.icon}</div>
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-black tracking-widest leading-none ${stat.trendUp ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-500 bg-red-500/10'}`}>
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
        <div className="flex justify-between items-end px-2">
          <div>
            <span className="text-accent-primary text-[10px] uppercase font-black tracking-[0.3em] mb-2 block leading-none">Global Log</span>
            <h2 className="text-4xl font-black font-['Outfit'] tracking-tighter">Recent Orders</h2>
          </div>
          <button className="px-6 py-2.5 rounded-xl border border-glass-border hover:border-accent-primary text-xs font-bold transition-all hover:bg-accent-primary/10">View All</button>
        </div>

        <div className="glass border-white/5 overflow-hidden rounded-3xl">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="py-5">Order ID</th>
                  <th>ইউজার</th>
                  <th>সার্ভিস</th>
                  <th>পরিমান</th>
                  <th>কস্ট (Cost)</th>
                  <th className="w-32">স্ট্যাটাস</th>
                  <th className="text-right pr-8">একশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 font-bold font-['Outfit'] text-accent-primary px-6">#{order.id}</td>
                    <td className="font-medium">{order.user}</td>
                    <td className="text-neutral-400 font-medium">{order.service}</td>
                    <td className="font-black text-xs tracking-widest">{order.quantity}</td>
                    <td className="font-black font-['Outfit'] text-lg">{order.cost}</td>
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
