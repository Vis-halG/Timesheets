import React, { useState } from 'react';
import { Monitor, Smartphone, Plus, Power, MapPin, X, Save } from 'lucide-react';

const Kiosks = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [kiosks, setKiosks] = useState([
    { id: 1, name: 'Main Lobby Kiosk', location: 'Floor 1 - Main Entrance', status: 'Online', type: 'Tablet', battery: '98%' },
    { id: 2, name: 'Warehouse Entry', location: 'Dock A - Entrance', status: 'Offline', type: 'Wall Mount', battery: '0%' },
    { id: 3, name: 'Breakroom Station', location: 'Floor 2 - East Wing', status: 'Online', type: 'Desktop', battery: '100%' },
  ]);
  const [form, setForm] = useState({ name: '', location: '', type: 'Tablet', pin: '' });
  
  const registerKiosk = () => {
    setKiosks([
      {
        id: Date.now(),
        name: form.name || 'New Kiosk',
        location: form.location || 'Office Floor',
        status: 'Online',
        type: form.type,
        battery: form.type === 'Desktop' ? '100%' : '96%',
      },
      ...kiosks,
    ]);
    setForm({ name: '', location: '', type: 'Tablet', pin: '' });
    setShowAddModal(false);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kiosks</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">On-site Time Tracking Stations</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white font-black px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 text-sm uppercase tracking-widest"
        >
          <Plus size={18} />
          Register New Kiosk
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {kiosks.map(kiosk => (
          <div key={kiosk.id} className="bg-white rounded-[32px] border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
            <div className="flex items-start justify-between mb-8">
              <div className={`w-14 h-14 ${kiosk.status === 'Online' ? 'bg-indigo-50' : 'bg-slate-100'} rounded-[24px] flex items-center justify-center transition-colors group-hover:scale-110`}>
                {kiosk.type === 'Tablet' ? <Smartphone className={kiosk.status === 'Online' ? 'text-indigo-600' : 'text-slate-400'} size={28} /> : <Monitor className={kiosk.status === 'Online' ? 'text-indigo-600' : 'text-slate-400'} size={28} />}
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                kiosk.status === 'Online' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${kiosk.status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                {kiosk.status}
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-2">{kiosk.name}</h3>
            <div className="flex items-center gap-2 text-slate-400 mb-6 font-bold text-xs">
              <MapPin size={14} />
              {kiosk.location}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Type</p>
                <p className="text-sm font-black text-slate-700">{kiosk.type}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Battery</p>
                <p className="text-sm font-black text-slate-700">{kiosk.battery}</p>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-900 font-black py-3 rounded-2xl text-xs uppercase tracking-widest transition-all">Settings</button>
              <button className="px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-2xl transition-all">
                <Power size={18} />
              </button>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-50 rounded-full -z-10 opacity-30" />
          </div>
        ))}
      </div>

      {/* Register Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Register Kiosk</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); registerKiosk(); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kiosk Name</label>
                  <input type="text" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Front Desk Tablet" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Location</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Building A, Floor 2" className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Device Type</label>
                    <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none">
                      <option>Tablet</option>
                      <option>Desktop</option>
                      <option>Wall Mount</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Security PIN</label>
                    <input type="password" value={form.pin} onChange={(event) => setForm({ ...form, pin: event.target.value })} placeholder="****" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    Register Device
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kiosks;
