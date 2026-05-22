import React from 'react';
import { List as ListIcon, Calendar, Filter, MoreVertical, Play } from 'lucide-react';

const TimesheetPage = ({ entries }) => {
  const grouped = entries.reduce((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);
    return acc;
  }, {});

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Timesheet</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Weekly Entry Overview</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 font-black px-6 py-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-sm uppercase tracking-widest shadow-sm">
            <Calendar size={18} />
            May 12 - May 18
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{date}</h3>
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Day Total</span>
                <span className="text-sm font-black text-slate-900">08:00:00</span>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {items.map(item => (
                <div key={item.id} className="px-8 py-6 flex items-center justify-between group hover:bg-slate-50/30 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className={`w-3 h-3 rounded-full ${item.project?.color || 'bg-slate-200'}`} />
                    <div>
                      <p className="text-sm font-black text-slate-900 mb-0.5">{item.description}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.project?.client} - {item.project?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Duration</p>
                      <p className="text-sm font-black text-slate-900 tabular-nums">{item.duration}</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Play size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 rounded-xl transition-all"><MoreVertical size={18} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimesheetPage;
