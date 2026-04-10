import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const OrderHistory = () => {
  const orders = [
    { 
      id: 5042, 
      date: 'Apr 10, 2026', 
      time: '18:24', 
      service: 'Facebook Page Followers', 
      amount: '1,000', 
      charge: '৳ ১২০.৫০', 
      status: 'Completed' 
    },
    { 
      id: 5041, 
      date: 'Apr 10, 2026', 
      time: '15:10', 
      service: 'Instagram Likes (Targeted)', 
      amount: '৫০০', 
      charge: '৳ ৫০.০০', 
      status: 'Pending' 
    },
    { 
      id: 5040, 
      date: 'Apr 09, 2026', 
      time: '22:45', 
      service: 'TikTok Views (High Quality)', 
      amount: '৫,০০০', 
      charge: '৳ ৮০.০০', 
      status: 'In Progress' 
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Pending': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'In Progress': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'Canceled': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-secondary bg-white/5 border-white/5';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="w-3 h-3" />;
      case 'Pending': return <Clock className="w-3 h-3" />;
      case 'In Progress': return <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}><Clock className="w-3 h-3" /></motion.div>;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 px-2">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
             <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
             <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Transaction Logs</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight text-white">Order History</h1>
          <p className="text-neutral-500 text-sm font-medium">Manage and track your social media growth progress.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
           <div className="relative flex-1 md:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 group-focus-within:text-accent-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search by ID or Service Name..." 
                className="w-full h-16 bg-[#1f2937]/40 backdrop-blur-md border border-white/5 rounded-2xl pl-14 pr-6 text-sm focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all placeholder:text-neutral-700 font-bold text-white shadow-xl"
              />
           </div>
           <button className="w-16 h-16 rounded-2xl bg-[#1f2937]/40 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-neutral-400 hover:text-white shadow-xl">
              <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="bg-[#1f2937]/30 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl mx-1">
        <div className="table-container">
          <table className="w-full">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/5">
                <th className="py-8 px-10 tracking-[0.2em] font-black text-[10px] text-neutral-500 uppercase text-left">Reference ID</th>
                <th className="tracking-[0.2em] font-black text-[10px] text-neutral-500 uppercase text-left">Service details</th>
                <th className="tracking-[0.2em] font-black text-[10px] text-neutral-500 uppercase text-left">Order Size</th>
                <th className="tracking-[0.2em] font-black text-[10px] text-neutral-500 uppercase text-left">Unit Charge</th>
                <th className="tracking-[0.2em] font-black text-[10px] text-neutral-500 uppercase text-left">Current Status</th>
                <th className="text-right pr-10 tracking-[0.2em] font-black text-[10px] text-neutral-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {orders.map((order, idx) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-8 px-10">
                    <div className="flex flex-col">
                       <span className="text-accent-primary font-black text-xl leading-none mb-2 tabular-nums">#{order.id}</span>
                       <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">{order.date} • {order.time}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-accent-primary/40 transition-all shadow-inner">
                          <ClipboardList className="w-5 h-5 text-neutral-600 group-hover:text-accent-primary transition-colors" />
                       </div>
                       <span className="font-bold text-sm tracking-tight text-white">{order.service}</span>
                    </div>
                  </td>
                  <td>
                    <span className="font-black text-neutral-400 tabular-nums">{order.amount}</span>
                  </td>
                  <td>
                    <span className="text-lg font-black tracking-tight text-white tabular-nums">{order.charge}</span>
                  </td>
                  <td>
                    <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest leading-none shadow-sm ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </td>
                  <td className="text-right pr-10">
                    <button className="w-12 h-12 rounded-2xl bg-white/5 border border-transparent hover:border-white/10 flex items-center justify-center hover:bg-white/10 transition-all ml-auto group/btn shadow-inner">
                       <ExternalLink className="w-4 h-4 text-neutral-500 group-hover/btn:text-white transition-colors" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
         <button className="w-16 h-16 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-neutral-600 opacity-50 cursor-not-allowed">
            Prev
         </button>
         <div className="flex gap-3">
            <button className="w-16 h-16 rounded-3xl bg-accent-primary flex items-center justify-center text-sm font-black text-white shadow-xl shadow-accent-primary/30">1</button>
            <button className="w-16 h-16 rounded-3xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm font-black text-neutral-400 transition-all shadow-xl">2</button>
         </div>
         <button className="w-16 h-16 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:bg-white/10 transition-all shadow-xl">
            Next
         </button>
      </div>
    </div>
  );
};

export default OrderHistory;
