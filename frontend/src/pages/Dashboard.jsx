import React from 'react';
import { 
  LayoutDashboard, 
  Clock, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  ChevronRight,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Target,
  BarChart3
} from 'lucide-react';

const Dashboard = ({ userRole }) => {
  const isAdmin = userRole === 'admin';

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {isAdmin ? 'Management Overview' : 'Executive Overview'}
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
            {isAdmin ? 'Monitor project and task completion metrics' : 'Real-time workspace activity & insights'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-4 border-slate-50 flex items-center justify-center text-[10px] font-black text-slate-500 shadow-sm">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full bg-indigo-600 border-4 border-slate-50 flex items-center justify-center text-[10px] font-black text-white shadow-lg">+12</div>
          </div>
          <button className="bg-white border border-slate-200 text-slate-900 font-black px-6 py-3 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-sm uppercase tracking-widest shadow-sm">
            <Calendar size={18} />
            Today
          </button>
        </div>
      </div>

      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project Completion Card */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-3">Project Completion</p>
                <h3 className="text-4xl font-black text-slate-900">78%</h3>
              </div>
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <Target size={32} />
              </div>
            </div>
            <div className="space-y-6">
              {[
                { name: 'Acme Redesign', progress: 85, color: 'bg-indigo-600' },
                { name: 'Mobile App QA', progress: 62, color: 'bg-emerald-500' },
                { name: 'Internal Admin', progress: 95, color: 'bg-amber-500' },
              ].map((p, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">{p.name}</span>
                    <span className="text-slate-900">{p.progress}%</span>
                  </div>
                  <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
                    <div className={`h-full ${p.color} transition-all duration-1000`} style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-50 rounded-full -z-10 opacity-20" />
          </div>

          {/* Task Completion Card */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-3">Task Velocity</p>
                <h3 className="text-4xl font-black text-slate-900">142</h3>
              </div>
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={32} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-[24px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Completed</p>
                <p className="text-2xl font-black text-slate-900">118</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-[24px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pending</p>
                <p className="text-2xl font-black text-slate-900">24</p>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                <TrendingUp size={14} />
                +12% from last week
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-50 rounded-full -z-10 opacity-20" />
          </div>
        </div>
      )}

      {!isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Weekly Earnings', value: '$14,240', change: '+12.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Active Timers', value: '8', change: 'Running', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Project Health', value: '94%', change: 'Excellent', icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Pending Tasks', value: '24', change: '-12%', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
              <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-3">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-black text-slate-900 leading-none">{stat.value}</p>
                  <span className={`text-[9px] font-black px-2 py-1 rounded-lg ${stat.change.startsWith('+') || stat.change === 'Excellent' || stat.change === 'Running' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-200 shadow-sm p-10">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Team Productivity</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-xl">Weekly</button>
              <button className="px-4 py-2 bg-slate-50 text-slate-400 text-[10px] font-black rounded-xl hover:text-slate-600 transition-colors">Monthly</button>
            </div>
          </div>
          <div className="space-y-8">
            {[
              { name: 'John Doe', role: 'UI Designer', tasks: 85, color: 'bg-indigo-600' },
              { name: 'Jane Smith', role: 'Developer', tasks: 92, color: 'bg-emerald-500' },
              { name: 'Mike Ross', role: 'Manager', tasks: 45, color: 'bg-amber-500' },
            ].map((member, i) => (
              <div key={i} className="flex items-center gap-8 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-sm font-black text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="text-sm font-black text-slate-900">{member.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.role}</p>
                    </div>
                    <span className="text-sm font-black text-slate-900">{member.tasks}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden">
                    <div className={`h-full ${member.color} transition-all duration-1000 ease-out`} style={{ width: `${member.tasks}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">

          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Latest Activity</h3>
              <button className="text-indigo-600 hover:text-indigo-700 transition-colors"><ChevronRight size={18} /></button>
            </div>
            <div className="space-y-6">
              {[
                { type: 'Project', title: 'Acme Redesign', action: 'Approved', time: '2m ago' },
                { type: 'Expense', title: 'Server Hosting', action: 'Pending', time: '14m ago' },
                { type: 'Timer', title: 'Daily Sync', action: 'Running', time: 'Now' },
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${act.action === 'Running' ? 'bg-indigo-600 animate-pulse' : 'bg-slate-200'}`} />
                    <div>
                      <p className="text-xs font-black text-slate-900">{act.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{act.action} - {act.type}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
