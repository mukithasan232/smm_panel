import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Search, Filter, ExternalLink } from 'lucide-react';

const AdminPayments = () => {
  const requests = [
    { id: 1, user: 'মুকিত হাসান', method: 'bKash Personal', amount: '৳ ৫০০', trxid: 'BKW8294JS83', date: '2026-04-10 12:30', status: 'Pending' },
    { id: 2, user: 'তানভীর আহমেদ', method: 'Nagad Personal', amount: '৳ ১০০০', trxid: 'NGD3948KSL2', date: '2026-04-10 11:15', status: 'Pending' },
    { id: 3, user: 'সায়েম চৌধুরী', method: 'Rocket Personal', amount: '৳ ২০০', trxid: 'RKT8234MMN1', date: '2026-04-10 10:45', status: 'Pending' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div>
          <h1 className="text-3xl font-bold mb-1 font-['Outfit'] tracking-tight">পেমেন্ট রিকোয়েস্ট</h1>
          <p className="text-secondary text-sm">ইউজারদের পাঠানো ম্যানুয়াল পেমেন্টগুলো এখান থেকে এপ্রুভ করুন।</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="TrxID দিয়ে সার্চ..." 
              className="input-glass pl-10 py-2.5 text-xs" 
            />
          </div>
          <button className="btn-secondary py-2.5 px-4"><Filter className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="glass overflow-hidden shadow-2xl shadow-black/20">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ইউজার</th>
                <th>পেমেন্ট মেথড</th>
                <th>পরিমান</th>
                <th>ট্রানজেকশন আইডি (TrxID)</th>
                <th>তারিখ</th>
                <th className="text-right">একশন</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, idx) => (
                <motion.tr 
                  key={req.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group"
                >
                  <td className="font-medium text-white">{req.user}</td>
                  <td>
                    <span className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        req.method.includes('bKash') ? 'bg-pink-500' : 
                        req.method.includes('Nagad') ? 'bg-orange-500' : 'bg-purple-500'
                      }`}></div>
                      {req.method}
                    </span>
                  </td>
                  <td className="font-bold text-emerald-500">{req.amount}</td>
                  <td>
                    <div className="flex items-center gap-2 font-mono text-secondary group-hover:text-blue-400 transition-colors">
                      {req.trxid}
                      <ExternalLink className="w-3 h-3 cursor-pointer" />
                    </div>
                  </td>
                  <td className="text-secondary text-sm">{req.date}</td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/10">
                        <Check className="w-4 h-4" />
                      </button>
                      <button className="h-9 w-9 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {requests.length === 0 && (
        <div className="glass p-20 text-center flex flex-col items-center gap-4">
          <div className="p-4 bg-white/5 rounded-full">
            <Check className="w-8 h-8 text-secondary" />
          </div>
          <p className="text-secondary font-medium">কোনো পেমেন্ট রিকোয়েস্ট এই মুহূর্তে নেই।</p>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
