import React, { useState, useEffect } from 'react';
import { Search, LayoutGrid, Info, ShoppingCart, Loader2 } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const result = await response.json();
        if (result.success) {
          setServices(result.data);
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = ['All', ...new Set(services.map(s => s.category))];

  const filteredServices = services.filter(s => {
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.service.toString().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-accent-primary">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-bold animate-pulse text-lg tracking-widest uppercase">Fetching API Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
         <h1 className="text-3xl font-bold mb-2 font-['Outfit']">Service List</h1>
         <p className="text-neutral-400 text-sm">Browse our full range of SMM services across all platforms.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search by name or ID..."
              className="input-glass pl-12 bg-white/5 border-glass-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>

         <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
            {categories.slice(0, 5).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'bg-white/5 text-neutral-400 hover:text-white border border-glass-border'}`}
              >
                {cat}
              </button>
            ))}
         </div>
      </div>

      <div className="table-container glass border border-glass-border overflow-x-auto w-full">
         <table className="min-w-full">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Service Name</th>
                  <th>Rate / 1k</th>
                  <th>Min</th>
                  <th>Max</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {filteredServices.slice(0, 100).map(s => (
                  <tr key={s.service}>
                     <td className="font-bold text-accent-primary">#{s.service}</td>
                     <td className="max-w-[150px] md:max-w-sm">
                        <div className="flex flex-col">
                           <span className="font-semibold text-sm truncate" title={s.name}>{s.name}</span>
                           <span className="text-[10px] text-neutral-500 uppercase tracking-wider truncate" title={s.category}>{s.category}</span>
                        </div>
                     </td>
                     <td className="font-bold">৳ {s.rate}</td>
                     <td className="text-neutral-400">{s.min}</td>
                     <td className="text-neutral-400">{s.max}</td>
                     <td>
                        <button className="p-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-lg transition-colors">
                           <ShoppingCart className="w-4 h-4" />
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         {filteredServices.length === 0 && (
            <div className="p-12 text-center text-neutral-500">
               No services found matching your criteria.
            </div>
         )}
      </div>
    </div>
  );
};

export default Services;
