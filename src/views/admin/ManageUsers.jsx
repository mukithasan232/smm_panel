import React from 'react';
import { Search, Filter, Mail, ShieldAlert, Ban } from 'lucide-react';

const ManageUsers = () => {
  const users = [
    { id: 1, name: 'মুকিত হাসান', email: 'mukit@mail.com', balance: '৳ ১৫,২০০.০০', registered: '2026-03-01', status: 'Active' },
    { id: 2, name: 'তানভীর আহমেদ', email: 'tanvir@mail.com', balance: '৳ ২,৪৫০.০০', registered: '2026-03-15', status: 'Active' },
    { id: 3, name: 'সায়েম চৌধুরী', email: 'sayem@mail.com', balance: '৳ ৫১০.০০', registered: '2026-04-01', status: 'Banned' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div>
          <h1 className="text-3xl font-bold mb-1 font-['Outfit'] tracking-tight">ইউজার ম্যানেজমেন্ট</h1>
          <p className="text-secondary text-sm">আপনার প্ল্যাটফর্মের সব ইউজারের তথ্য এখান থেকে নিয়ন্ত্রণ করুন।</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input type="text" placeholder="ইউজার নেম বা ইমেইল..." className="input-glass pl-10 py-2.5 text-xs" />
          </div>
          <button className="btn-secondary py-2.5 px-4"><Filter className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="glass overflow-hidden">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ইউজার আইডি</th>
                <th>নাম ও ইমেইল</th>
                <th>ব্যালেন্স</th>
                <th>রেজিস্টার্ড</th>
                <th>স্ট্যাটাস</th>
                <th className="text-right">একশন</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="font-mono text-emerald-500">#{user.id.toString().padStart(4, '0')}</td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-bold text-white">{user.name}</span>
                      <span className="text-xs text-secondary flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</span>
                    </div>
                  </td>
                  <td className="font-bold text-emerald-500">{user.balance}</td>
                  <td className="text-secondary text-sm">{user.registered}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      user.status === 'Active' ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                        <button className="p-2 text-secondary hover:text-blue-400 transition-colors"><ShieldAlert className="w-4 h-4" /></button>
                        <button className="p-2 text-secondary hover:text-red-400 transition-colors"><Ban className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
