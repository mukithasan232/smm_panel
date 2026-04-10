import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  History, 
  CreditCard, 
  Zap, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  Download,
  Smartphone,
  ChevronRight,
  TrendingUp,
  FileText,
  X,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const AddFunds = () => {
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'history'
  const [selectedMethod, setSelectedMethod] = useState('bkash');
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ balance: 0, totalSpend: 0, orders: 0 });
  const [invoiceItem, setInvoiceItem] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [userRes, paymentsRes, ordersRes] = await Promise.all([
        fetch('/api/users/profile', { headers }),
        fetch('/api/payments/my-payments', { headers }),
        fetch('/api/orders/my-orders', { headers })
      ]);

      const [userData, paymentsData, ordersData] = await Promise.all([
        userRes.json(),
        paymentsRes.json(),
        ordersRes.json()
      ]);

      if (userData.success) setStats(prev => ({ ...prev, balance: userData.data.balance }));
      if (paymentsData.success) setRequests(paymentsData.data || []);
      if (ordersData.success) {
        const myOrders = ordersData.data || [];
        setStats(prev => ({ 
          ...prev, 
          orders: myOrders.length,
          totalSpend: myOrders.reduce((sum, o) => sum + (o.charge || 0), 0)
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!amount || !transactionId) return toast.error('Please enter amount and TrxID');
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/payments/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          method: selectedMethod.toUpperCase(),
          amount: parseFloat(amount),
          trxId: transactionId
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Request submitted! Admin will verify soon.');
        setAmount('');
        setTransactionId('');
        fetchUserData();
        setActiveTab('history');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const methods = [
    { id: 'bkash', name: 'bKash', color: '#e2136e' },
    { id: 'nagad', name: 'Nagad', color: '#f7941d' },
    { id: 'rocket', name: 'Rocket', color: '#8c3494' }
  ];

  return (
    <div className="space-y-8">
      {/* Invoice Modal */}
      <AnimatePresence>
        {invoiceItem && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setInvoiceItem(null)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl print:shadow-none print:m-0"
            >
              <div className="p-10 space-y-8" id="invoice-printable">
                <div className="flex justify-between items-start">
                   <div>
                      <h1 className="text-3xl font-black font-['Outfit'] tracking-tight text-indigo-600 uppercase">SMM GROWS</h1>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Official Payment Receipt</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Transaction ID</p>
                      <p className="text-lg font-mono font-bold">#{invoiceItem.transactionId}</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-10 py-10 border-y border-slate-100">
                   <div className="space-y-4">
                      <div>
                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Billed To</p>
                         <p className="font-bold">{JSON.parse(localStorage.getItem('user'))?.name}</p>
                         <p className="text-xs text-slate-500">{JSON.parse(localStorage.getItem('user'))?.email}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Payment Method</p>
                         <p className="font-bold uppercase">{invoiceItem.method}</p>
                      </div>
                   </div>
                   <div className="space-y-4 text-right">
                      <div>
                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Issue Date</p>
                         <p className="font-bold">{new Date(invoiceItem.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Status</p>
                         <p className={`font-black uppercase text-xs inline-block px-3 py-1 rounded-full ${invoiceItem.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                            {invoiceItem.status}
                         </p>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex justify-between items-center py-2 text-sm font-bold border-b border-slate-100">
                      <span className="text-slate-500 uppercase tracking-widest text-[10px]">Description</span>
                      <span className="text-slate-500 uppercase tracking-widest text-[10px]">Total</span>
                   </div>
                   <div className="flex justify-between items-center py-4">
                      <div>
                         <p className="font-bold text-lg">Wallet Top-up</p>
                         <p className="text-xs text-slate-400">Credit added to SMM Grows account</p>
                      </div>
                      <p className="text-2xl font-black font-['Outfit']">৳ {invoiceItem.amount.toFixed(2)}</p>
                   </div>
                </div>

                <div className="pt-10 flex justify-between items-center opacity-50">
                   <p className="text-[10px] font-bold uppercase tracking-widest">smmgrows.com - 2026</p>
                   <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                      <Check className="w-5 h-5" />
                   </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 flex justify-end gap-3 border-t border-slate-100 print:hidden">
                 <button onClick={() => setInvoiceItem(null)} className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-200 transition-all">Close</button>
                 <button onClick={handlePrint} className="btn-primary shadow-none h-11 px-8">
                    <Download className="w-4 h-4" /> Download PDF / Print
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Username', value: JSON.parse(localStorage.getItem('user'))?.name || 'maddoggamingbd', icon: <Smartphone className="text-blue-500" /> },
          { label: 'Balance', value: `৳ ${stats.balance.toFixed(2)}`, icon: <Wallet className="text-emerald-500" /> },
          { label: 'Total Spend', value: `৳ ${stats.totalSpend.toFixed(2)}`, icon: <TrendingUp className="text-orange-500" /> },
          { label: 'Your Orders', value: stats.orders, icon: <FileText className="text-indigo-500" /> }
        ].map((s, i) => (
          <div key={i} className="bg-bg-secondary/50 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">{s.icon}</div>
            <div>
              <p className="text-[10px] uppercase font-black text-secondary tracking-widest leading-none mb-1">{s.label}</p>
              <h3 className="text-lg font-black font-['Outfit'] tracking-tight truncate max-w-[150px]">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-bg-secondary/50 rounded-2xl w-fit border border-white/5">
            <button 
              onClick={() => setActiveTab('add')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'add' ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'text-secondary hover:text-white'}`}
            >
              <CreditCard className="w-4 h-4 inline-block mr-2" /> Add Fund
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-secondary hover:text-white'}`}
            >
              <History className="w-4 h-4 inline-block mr-2" /> Transactions
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'add' ? (
              <motion.div 
                key="add" 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass rounded-3xl p-8 space-y-8"
              >
                <div>
                   <h2 className="text-2xl font-black font-['Outfit'] tracking-tighter">Submit Deposit</h2>
                   <p className="text-secondary text-sm">Send money to our numbers and verify your transaction.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {methods.map(m => (
                    <button 
                      key={m.id}
                      onClick={() => setSelectedMethod(m.id)}
                      className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${selectedMethod === m.id ? 'border-accent-primary bg-accent-primary/5' : 'border-white/5 hover:border-white/10'}`}
                    >
                      <p className="text-xs font-black uppercase tracking-widest">{m.name}</p>
                    </button>
                  ))}
                </div>

                <form onSubmit={handleVerify} className="space-y-6 max-w-md">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Payment Amount (৳)</label>
                     <input 
                       type="number" 
                       required
                       className="input-glass h-14"
                       value={amount}
                       onChange={(e) => setAmount(e.target.value)}
                       placeholder="Min: 50 BDT"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Transaction ID</label>
                     <input 
                       type="text" 
                       required
                       className="input-glass h-14 font-mono uppercase"
                       value={transactionId}
                       onChange={(e) => setTransactionId(e.target.value)}
                       placeholder="8X7Y6Z..."
                     />
                   </div>
                   <button 
                    disabled={loading}
                    className="btn-primary w-full h-14"
                   >
                     {loading ? <Clock className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                     Submit Request
                   </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass rounded-3xl overflow-hidden"
              >
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th className="px-6 py-4">ID</th>
                        <th>Date</th>
                        <th>Method</th>
                        <th>Amount</th>
                        <th className="text-right pr-6">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {requests.length === 0 ? (
                        <tr><td colSpan={5} className="py-12 text-center text-secondary">No transactions found.</td></tr>
                      ) : requests.map((req) => (
                        <tr key={req._id}>
                          <td className="px-6 py-4 font-mono text-accent-primary truncate max-w-[100px]">#{req._id.slice(-6).toUpperCase()}</td>
                          <td className="text-xs text-secondary">{new Date(req.createdAt).toLocaleString()}</td>
                          <td>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 uppercase">{req.method}</span>
                          </td>
                          <td className="font-bold text-emerald-500">৳ {req.amount.toFixed(2)}</td>
                          <td className="text-right pr-6">
                            <button 
                              onClick={() => setInvoiceItem(req)}
                              className="px-5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                            >
                               Invoice
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
           <div className="glass rounded-[2rem] p-8 space-y-6">
              <div className="flex items-center gap-3 text-white">
                 <HelpCircle className="w-5 h-5 text-accent-primary" />
                 <h3 className="font-black font-['Outfit'] uppercase tracking-tight">More Information</h3>
              </div>
              
              <div className="space-y-3">
                 {[
                   { t: 'Binance Payment', d: 'Send USDT to our Binance ID and submit TRX.' },
                   { t: 'bKash / Nagad / Rocket', d: 'Available for Bangladeshi Users (Min 50৳).' },
                   { t: 'Payment Support', d: 'Response time: 5-30 Minutes.' }
                 ].map((info, i) => (
                   <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-accent-primary/20 transition-all">
                      <p className="text-xs font-black uppercase tracking-widest mb-1 group-hover:text-accent-primary transition-colors">{info.t}</p>
                      <p className="text-[11px] text-secondary leading-normal">{info.d}</p>
                   </div>
                 ))}
              </div>

              <div className="pt-4 border-t border-white/5">
                 <p className="text-[10px] text-secondary mb-3 uppercase font-black tracking-widest text-center">Need instant help?</p>
                 <a href="#" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-accent-primary/10 text-accent-primary text-xs font-bold hover:bg-accent-primary hover:text-white transition-all">
                    Create Ticket or Msg on Telegram
                    <ChevronRight className="w-4 h-4" />
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AddFunds;
