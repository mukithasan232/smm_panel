import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Search, Filter, ExternalLink, RefreshCw, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminPayments = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [processing, setProcessing] = useState(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/payments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setRequests(data.data || []);
      } else {
        toast.error(data.message || 'পেমেন্ট লোড ব্যর্থ হয়েছে।');
      }
    } catch (err) {
      toast.error('সার্ভারের সাথে যোগাযোগ করা সম্ভব হয়নি।');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    setProcessing(id + status);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/payments/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(status === 'Approved' ? '✅ পেমেন্ট অনুমোদিত হয়েছে!' : '❌ পেমেন্ট বাতিল করা হয়েছে।');
        fetchPayments();
      } else {
        toast.error(data.message || 'একশন ব্যর্থ হয়েছে।');
      }
    } catch (err) {
      toast.error('সার্ভারের সাথে যোগাযোগ করা সম্ভব হয়নি।');
    } finally {
      setProcessing(null);
    }
  };

  useEffect(() => { fetchPayments(); }, []);

  const filtered = requests.filter(r => 
    r.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
    r.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-emerald-400 bg-emerald-400/10';
      case 'Rejected': return 'text-red-400 bg-red-400/10';
      default: return 'text-orange-400 bg-orange-400/10';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black mb-2 font-['Outfit'] tracking-tighter uppercase">Payment Requests</h1>
          <p className="text-secondary text-sm font-medium">Verify and approve manual capital deposits from your clients.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="TrxID বা নাম দিয়ে সার্চ..." 
              className="input-glass pl-10 py-2.5 text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={fetchPayments} className="btn-secondary py-2.5 px-4">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="glass overflow-hidden shadow-2xl shadow-black/20">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                  <th className="rounded-tl-2xl">Client</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Transaction ID</th>
                  <th>Timestamp</th>
                  <th>Current State</th>
                  <th className="text-right rounded-tr-2xl">Operations</th>
                </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center text-secondary">কোনো পেমেন্ট রিকোয়েস্ট নেই।</td>
                    </tr>
                  ) : filtered.map((req, idx) => (
                    <motion.tr 
                      key={req._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group"
                    >
                      <td className="font-medium text-white">{req.user?.name || 'N/A'}</td>
                      <td>
                        <span className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            req.method?.includes('bKash') ? 'bg-pink-500' : 
                            req.method?.includes('Nagad') ? 'bg-orange-500' : 'bg-purple-500'
                          }`} />
                          {req.method}
                        </span>
                      </td>
                      <td className="font-bold text-emerald-500">৳ {req.amount}</td>
                      <td>
                        <div className="flex items-center gap-2 font-mono text-secondary group-hover:text-blue-400 transition-colors">
                          {req.transactionId}
                          <ExternalLink className="w-3 h-3 cursor-pointer" />
                        </div>
                      </td>
                      <td className="text-secondary text-sm">
                        {new Date(req.createdAt).toLocaleString('bn-BD')}
                      </td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="text-right">
                        {req.status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleAction(req._id, 'Approved')}
                              disabled={processing === req._id + 'Approved'}
                              className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50"
                            >
                              {processing === req._id + 'Approved' 
                                ? <Clock className="w-4 h-4 animate-spin" />
                                : <Check className="w-4 h-4" />}
                            </button>
                            <button 
                              onClick={() => handleAction(req._id, 'Rejected')}
                              disabled={processing === req._id + 'Rejected'}
                              className="h-9 w-9 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                            >
                              {processing === req._id + 'Rejected'
                                ? <Clock className="w-4 h-4 animate-spin" />
                                : <X className="w-4 h-4" />}
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-secondary px-4">Done</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPayments;
