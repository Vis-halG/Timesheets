import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  X, 
  Calendar, 
  Users, 
  Target, 
  ArrowRight,
  MoreVertical,
  Check
} from 'lucide-react';

const MOCK_TASKS = [
  { id: 1, project: 'Acme Redesign', description: 'Hero section development', coordinateWith: 'John Doe', priority: 'High', targetDate: '2024-05-20', completionDate: null, status: 'In Progress' },
  { id: 2, project: 'Mobile App QA', description: 'Bug fixing in login flow', coordinateWith: 'Jane Smith', priority: 'Medium', targetDate: '2024-05-18', completionDate: '2024-05-17', status: 'Completed' },
];

const Tasks = ({ userRole }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [form, setForm] = useState({
    project: 'Acme Corp Redesign',
    description: '',
    coordinateWith: 'Vishal Staff',
    priority: 'Medium',
    targetDate: '2026-05-25',
  });

  const isAdmin = userRole === 'admin';

  const completeTask = (taskId) => {
    setTasks(tasks.map((task) => (
      task.id === taskId
        ? { ...task, status: 'Completed', completionDate: new Date().toISOString().slice(0, 10) }
        : task
    )));
  };

  const createTask = () => {
    const nextTask = {
      id: Date.now(),
      project: form.project,
      description: form.description || 'New assigned task',
      coordinateWith: form.coordinateWith || 'Vishal Staff',
      priority: form.priority,
      targetDate: form.targetDate,
      completionDate: null,
      status: 'In Progress',
    };

    setTasks([nextTask, ...tasks]);
    setShowCreateModal(false);
    setForm({
      project: 'Acme Corp Redesign',
      description: '',
      coordinateWith: 'Vishal Staff',
      priority: 'Medium',
      targetDate: '2026-05-25',
    });
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {isAdmin ? 'Task Management' : 'My Tasks'}
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
            {isAdmin ? 'Assign and monitor team tasks' : 'View and update your assigned tasks'}
          </p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 text-white font-black px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 text-sm uppercase tracking-widest"
          >
            <Plus size={18} />
            Assign New Task
          </button>
        )}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b-2 border-indigo-600">Active</button>
            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900">Completed</button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {tasks.map(task => (
            <div key={task.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50/50 transition-all group">
              <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                  task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {task.status === 'Completed' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-0.5">{task.description}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{task.project}</span>
                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Users size={12} />
                      With {task.coordinateWith}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-10 mt-4 md:mt-0">
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Priority</p>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    task.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {task.priority}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Date</p>
                  <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                    <Calendar size={14} className="text-slate-300" />
                    {task.targetDate}
                  </div>
                </div>

                {task.completionDate && (
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Completed</p>
                    <div className="flex items-center gap-2 text-sm font-black text-emerald-600">
                      <Check size={14} />
                      {task.completionDate}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {!isAdmin && task.status !== 'Completed' && (
                    <button onClick={() => completeTask(task.id)} className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                      <Check size={18} />
                    </button>
                  )}
                  <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin: Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Assign New Task</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); createTask(); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Project Name</label>
                  <select value={form.project} onChange={(event) => setForm({ ...form, project: event.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none">
                    <option>Acme Corp Redesign</option>
                    <option>Mobile App QA</option>
                    <option>Internal Admin</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Task Description</label>
                  <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="What needs to be done?" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" rows="3"></textarea>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Coordinate With</label>
                    <input type="text" value={form.coordinateWith} onChange={(event) => setForm({ ...form, coordinateWith: event.target.value })} placeholder="Employee Name" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Priority</label>
                    <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Date</label>
                    <input type="date" value={form.targetDate} onChange={(event) => setForm({ ...form, targetDate: event.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Initial Status</label>
                    <div className="flex bg-slate-50 p-1 rounded-2xl">
                      <button type="button" className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest bg-white text-indigo-600 rounded-xl shadow-sm">Planned</button>
                      <button type="button" className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Active</button>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all uppercase tracking-[0.2em] text-xs"
                  >
                    Assign Task
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

export default Tasks;
