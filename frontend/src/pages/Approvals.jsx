import React, { useState } from 'react';
import { CheckCircle2, Check, X, MoreVertical, Search, Calendar } from 'lucide-react';

const MOCK_APPROVALS = [
  { id: 1, user: 'John Doe', project: 'Acme Redesign', hours: '40:00', period: 'May 1 - May 7', status: 'Pending' },
  { id: 2, user: 'Jane Smith', project: 'Mobile App QA', hours: '35:30', period: 'May 1 - May 7', status: 'Approved' },
  { id: 3, user: 'Mike Ross', project: 'Internal Admin', hours: '12:00', period: 'May 8 - May 14', status: 'Pending' },
];

const Approvals = () => {
  const [filter, setFilter] = useState('Pending');
  const [approvals, setApprovals] = useState(MOCK_APPROVALS);

  const updateStatus = (id, status) => {
    setApprovals(approvals.map((approval) => (
      approval.id === id ? { ...approval, status } : approval
    )));
  };

  const approveAll = () => {
    setApprovals(approvals.map((approval) => (
      approval.status === 'Pending' ? { ...approval, status: 'Approved' } : approval
    )));
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Time Approvals</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Review and verify team timesheets</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={approveAll}
            className="bg-emerald-600 text-white font-black px-6 py-3 rounded-xl hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all flex items-center gap-2 text-[10px] uppercase tracking-widest"
          >
            <CheckCircle2 size={16} />
            Approve All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {['Pending', 'Approved', 'Rejected'].map(s => (
              <button 
                key={s}
                onClick={() => setFilter(s)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === s ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search team..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none" />
            </div>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Team Member</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Project</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Period</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total Hours</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {approvals.filter(a => a.status === filter || filter === 'All').map(app => (
              <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black text-xs">
                      {app.user.charAt(0)}
                    </div>
                    <span className="text-sm font-black text-slate-900">{app.user}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">{app.project}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                    <Calendar size={14} />
                    {app.period}
                  </div>
                </td>
                <td className="px-8 py-6 text-right text-sm font-black text-slate-900">{app.hours}</td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    app.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                    app.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 
                    'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    {app.status === 'Pending' && (
                      <>
                        <button onClick={() => updateStatus(app.id, 'Approved')} className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"><Check size={16} /></button>
                        <button onClick={() => updateStatus(app.id, 'Rejected')} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"><X size={16} /></button>
                      </>
                    )}
                    <button className="p-2.5 text-slate-300 hover:text-slate-900 transition-colors"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approvals;
