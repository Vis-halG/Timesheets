import React, { useState } from 'react';
import { Calendar, Plus, Clock, MoreVertical, X, ChevronLeft, ChevronRight } from 'lucide-react';

const MOCK_LEAVE = [
  { id: 1, type: 'Vacation', start: '2024-06-10', end: '2024-06-14', days: 5, status: 'Approved' },
  { id: 2, type: 'Sick Leave', start: '2024-05-20', end: '2024-05-21', days: 2, status: 'Pending' },
];

const TimeOff = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState(MOCK_LEAVE);
  const [form, setForm] = useState({ type: 'Vacation', start: '', end: '', reason: '' });

  const submitRequest = () => {
    const start = form.start || new Date().toISOString().slice(0, 10);
    const end = form.end || start;
    const days = Math.max(1, Math.round((new Date(end) - new Date(start)) / 86400000) + 1);

    setLeaveRequests([
      {
        id: Date.now(),
        type: form.type,
        start,
        end,
        days,
        status: 'Pending',
      },
      ...leaveRequests,
    ]);
    setForm({ type: 'Vacation', start: '', end: '', reason: '' });
    setShowRequestModal(false);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Time Off</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Manage your leave and balances</p>
        </div>
        <button 
          onClick={() => setShowRequestModal(true)}
          className="bg-indigo-600 text-white font-black px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 text-sm uppercase tracking-widest"
        >
          <Plus size={18} />
          Request Time Off
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Vacation Days', value: '12 / 20', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Sick Leave', value: '4 / 10', color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Floating Holidays', value: '2 / 5', color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-lg transition-all group overflow-hidden relative">
            <div className={`w-16 h-16 ${stat.bg} rounded-[24px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <Clock className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 leading-none">{stat.value}</p>
            </div>
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-slate-50 rounded-full -z-10 opacity-50" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Recent Requests</h2>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><ChevronLeft size={20} /></button>
            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {leaveRequests.map(leave => (
            <div key={leave.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-0.5">{leave.type}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{leave.start} - {leave.end}</p>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                  <p className="text-sm font-black text-slate-900">{leave.days} Days</p>
                </div>
                <div className="min-w-[120px] text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    leave.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {leave.status}
                  </span>
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Request Leave</h2>
                <button 
                  onClick={() => setShowRequestModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); submitRequest(); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Leave Type</label>
                  <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none">
                    <option>Vacation</option>
                    <option>Sick Leave</option>
                    <option>Personal Day</option>
                    <option>Unpaid Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Start Date</label>
                    <input type="date" value={form.start} onChange={(event) => setForm({ ...form, start: event.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">End Date</label>
                    <input type="date" value={form.end} onChange={(event) => setForm({ ...form, end: event.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Reason (Optional)</label>
                  <textarea rows="3" value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} placeholder="Brief explanation..." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"></textarea>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all uppercase tracking-[0.2em] text-xs"
                  >
                    Submit Request
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

export default TimeOff;
