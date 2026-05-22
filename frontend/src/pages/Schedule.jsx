import React from 'react';
import { Clock, Users, ArrowRight } from 'lucide-react';

const Schedule = () => {
  const shifts = [
    { id: 1, user: 'John Doe', role: 'Designer', time: '09:00 - 17:00', project: 'Acme Redesign', color: 'bg-blue-500' },
    { id: 2, user: 'Jane Smith', role: 'Developer', time: '10:00 - 18:00', project: 'Mobile App', color: 'bg-purple-500' },
    { id: 3, user: 'Mike Ross', role: 'Manager', time: '08:00 - 16:00', project: 'Internal Admin', color: 'bg-emerald-500' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Schedule</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Team Shifts & Planning</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 text-sm font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Day</button>
          <button className="px-6 py-2.5 text-sm font-black text-indigo-600 bg-indigo-50 rounded-xl uppercase tracking-widest">Week</button>
          <button className="px-4 py-2.5 text-sm font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Month</button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-6 divide-x divide-slate-100">
          <div className="col-span-1 p-6 bg-slate-50/50 border-r border-slate-100">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Team Members</h3>
            <div className="space-y-8">
              {shifts.map(shift => (
                <div key={shift.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-sm font-black text-slate-900 shadow-sm">
                    {shift.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">{shift.user}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{shift.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-5 p-6 space-y-8">
            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>08:00 AM</span>
              <span>10:00 AM</span>
              <span>12:00 PM</span>
              <span>02:00 PM</span>
              <span>04:00 PM</span>
              <span>06:00 PM</span>
            </div>
            {shifts.map(shift => (
              <div key={shift.id} className="relative h-12 bg-slate-50 rounded-2xl overflow-hidden">
                <div 
                  className={`absolute top-0 bottom-0 ${shift.color} opacity-20`}
                  style={{ left: shift.id === 3 ? '0%' : shift.id === 1 ? '10%' : '20%', right: shift.id === 2 ? '0%' : '30%' }}
                />
                <div 
                  className={`absolute top-0 bottom-0 ${shift.color} border-l-4 border-white/50 flex items-center px-4`}
                  style={{ left: shift.id === 3 ? '0%' : shift.id === 1 ? '10%' : '20%', right: shift.id === 2 ? '0%' : '30%' }}
                >
                  <span className="text-[10px] font-black text-slate-900 truncate">{shift.project} - {shift.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
