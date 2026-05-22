import React from 'react';
import { Activity as ActivityIcon, Clock, User, Zap } from 'lucide-react';

const Activity = () => {
  const activities = [
    { id: 1, user: 'John Doe', action: 'started a new timer', target: 'Acme Redesign', time: '2 mins ago', icon: <Zap size={14} /> },
    { id: 2, user: 'Jane Smith', action: 'completed a task', target: 'Mobile App Debugging', time: '15 mins ago', icon: <Zap size={14} /> },
    { id: 3, user: 'Mike Ross', action: 'approved an expense', target: 'Server Hosting', time: '1 hour ago', icon: <Zap size={14} /> },
    { id: 4, user: 'Sarah Connor', action: 'updated project status', target: 'Internal Admin', time: '3 hours ago', icon: <Zap size={14} /> },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Activity Feed</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Real-time Team Updates</p>
        </div>
      </div>

      <div className="max-w-3xl">
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100">
          {activities.map(activity => (
            <div key={activity.id} className="relative flex items-center justify-between group">
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:border-indigo-200 group-hover:text-indigo-600 transition-all z-10">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    <span className="font-black underline decoration-slate-200 underline-offset-4 mr-1">{activity.user}</span> 
                    {activity.action} 
                    <span className="ml-1 text-indigo-600 font-black italic">"{activity.target}"</span>
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1">
                    <Clock size={10} />
                    {activity.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
