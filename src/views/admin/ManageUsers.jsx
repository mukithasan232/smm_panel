import React, { useState, useEffect } from 'react';
import { Search, Filter, Mail, ShieldAlert, Ban, RefreshCw, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.data || []);
      } else {
        toast.error(data.message || 'ইউজার লোড ব্যর্থ হয়েছে।');
      }
    } catch (err) {
      toast.error('সার্ভারের সাথে যোগাযোগ করা সম্ভব হয়নি।');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black mb-2 font-['Outfit'] tracking-tighter uppercase">User Management</h1>
          <p className="text-secondary text-sm font-medium">Manage and monitor all platform users from a single command center.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="input-glass pl-10 h-12 text-sm font-bold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={fetchUsers} className="btn-secondary py-2.5 px-4">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="glass overflow-hidden">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="rounded-tl-2xl">Identity ID</th>
                  <th>Client Details</th>
                  <th>Wallet Balance</th>
                  <th>Access Level</th>
                  <th>Joined Date</th>
                  <th className="text-right rounded-tr-2xl">Operations</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-secondary">কোনো ইউজার পাওয়া যায়নি।</td>
                  </tr>
                ) : filtered.map((user) => (
                  <tr key={user._id}>
                    <td className="font-mono text-emerald-500">#{user._id?.slice(-5).toUpperCase()}</td>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-bold text-white">{user.name}</span>
                        <span className="text-xs text-secondary flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {user.email}
                        </span>
                      </div>
                    </td>
                    <td className="font-bold text-emerald-500">৳ {(user.balance || 0).toFixed(2)}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        user.role === 'admin' ? 'text-purple-400 bg-purple-400/10' : 'text-blue-400 bg-blue-400/10'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="text-secondary text-sm">
                      {new Date(user.createdAt).toLocaleDateString('bn-BD')}
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          title="Make Admin"
                          className="p-2 text-secondary hover:text-purple-400 transition-colors"
                        >
                          <ShieldAlert className="w-4 h-4" />
                        </button>
                        <button 
                          title="Ban User"
                          className="p-2 text-secondary hover:text-red-400 transition-colors"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer stats */}
          <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
            <p className="text-secondary text-xs">মোট <span className="text-white font-bold">{users.length}</span> জন ইউজার</p>
            <p className="text-secondary text-xs">Admins: <span className="text-purple-400 font-bold">{users.filter(u => u.role === 'admin').length}</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
