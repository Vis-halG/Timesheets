import React, { useState } from 'react';
import { Users, Plus, Globe, MoreVertical, MessageSquare, X } from 'lucide-react';

const Clients = () => {
  const initialClients = [
    { id: 1, name: 'Acme Corp', industry: 'Manufacturing', projects: 4, revenue: '$24,500', website: 'acme.com' },
    { id: 2, name: 'Northstar Labs', industry: 'Technology', projects: 2, revenue: '$18,200', website: 'northstar.io' },
    { id: 3, name: 'Stellar Design', industry: 'Design', projects: 3, revenue: '$12,000', website: 'stellar.design' },
  ];
  const [clients, setClients] = useState(initialClients);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', industry: 'Technology', website: '' });

  const addClient = () => {
    const nextClient = {
      id: Date.now(),
      name: form.name || 'New Client',
      industry: form.industry,
      projects: 0,
      revenue: '$0',
      website: form.website || 'company.com',
    };

    setClients([nextClient, ...clients]);
    setShowModal(false);
    setForm({ name: '', industry: 'Technology', website: '' });
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Clients</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Client Portfolio & Revenue</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white font-black px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 text-sm uppercase tracking-widest">
          <Plus size={18} />
          Add Client
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Name</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Projects</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Lifetime Revenue</th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.map(client => (
              <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center font-black text-indigo-600 text-lg">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 mb-0.5">{client.name}</h3>
                      <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px]">
                        <Globe size={10} />
                        {client.website}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-slate-500">{client.industry}</td>
                <td className="px-8 py-6 text-center">
                  <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-700">{client.projects} Projects</span>
                </td>
                <td className="px-8 py-6 text-right text-sm font-black text-slate-900">{client.revenue}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><MessageSquare size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><MoreVertical size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Add Client</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900">
                  <X size={24} />
                </button>
              </div>
              <form className="space-y-6" onSubmit={(event) => { event.preventDefault(); addClient(); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Client Name</label>
                  <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Client name" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Industry</label>
                  <select value={form.industry} onChange={(event) => setForm({ ...form, industry: event.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none">
                    <option>Technology</option>
                    <option>Manufacturing</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Website</label>
                  <input value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} placeholder="company.com" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all uppercase tracking-[0.2em] text-xs">
                  Save Client
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
