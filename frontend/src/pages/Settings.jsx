import React, { useState } from 'react';
import { Globe, Lock, Bell, CreditCard, ShieldCheck, Save, Check } from 'lucide-react';

const Settings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 relative">
      {showSaved && (
        <div className="fixed top-8 right-8 z-50 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-4 duration-300 font-black uppercase tracking-widest text-[10px]">
          <Check size={18} />
          Changes saved successfully
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Workspace Settings</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Configure your team and billing</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-indigo-600 text-white font-black px-8 py-3 rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 text-sm uppercase tracking-widest disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* General Settings */}
          <div className="bg-white rounded-[40px] border border-slate-200 p-10 space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="text-indigo-600" size={24} />
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">General Configuration</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Workspace Name</label>
                <input type="text" defaultValue="Vishal's Workspace" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Timezone</label>
                <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none outline-none">
                  <option>(GMT+05:30) India Standard Time</option>
                  <option>(GMT-08:00) Pacific Time</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-[40px] border border-slate-200 p-10 space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="text-emerald-600" size={24} />
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Security & Access</h2>
            </div>
            
            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px]">
              <div>
                <p className="text-sm font-black text-slate-900 mb-1">Two-Factor Authentication</p>
                <p className="text-xs font-bold text-slate-400">Add an extra layer of security to your account</p>
              </div>
              <div className="w-14 h-7 bg-indigo-600 rounded-full relative p-1 cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full ml-auto shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="space-y-4">
          {[
            { icon: Bell, label: 'Notifications', active: false },
            { icon: CreditCard, label: 'Subscription', active: true },
            { icon: Lock, label: 'Privacy', active: false },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-4 p-8 rounded-[32px] border transition-all group ${
              item.active ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-200' : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-300 hover:text-indigo-600'
            }`}>
              <item.icon size={24} className={item.active ? 'text-white' : 'text-slate-300 group-hover:text-indigo-600'} />
              <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
