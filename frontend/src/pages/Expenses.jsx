import React, { useState } from 'react';
import { DollarSign, Plus, Search, FileText, MoreVertical, X, Upload, Check, ChevronDown } from 'lucide-react';

const MOCK_EXPENSES = [
  { id: 1, title: 'Server Hosting', category: 'Infrastructure', amount: '$450.00', status: 'Approved', date: '2024-05-15', project: 'Acme Redesign' },
  { id: 2, title: 'Team Lunch', category: 'Food', amount: '$120.00', status: 'Pending', date: '2024-05-14', project: 'Internal' },
  { id: 3, title: 'UI Kit License', category: 'Software', amount: '$89.00', status: 'Approved', date: '2024-05-12', project: 'Acme Redesign' },
];

const Expenses = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expenses, setExpenses] = useState(MOCK_EXPENSES);
  const [form, setForm] = useState({ title: '', amount: '', project: 'Acme Corp Redesign' });

  const addExpense = () => {
    const nextExpense = {
      id: Date.now(),
      title: form.title || 'New Expense',
      category: 'Software',
      amount: `$${Number(form.amount || 0).toFixed(2)}`,
      status: 'Pending',
      date: new Date().toISOString().slice(0, 10),
      project: form.project,
    };

    setExpenses([nextExpense, ...expenses]);
    setForm({ title: '', amount: '', project: 'Acme Corp Redesign' });
    setShowAddModal(false);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Expenses</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Track your workspace financial activity</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white font-black px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 text-sm uppercase tracking-widest"
        >
          <Plus size={18} />
          Add New Expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Spent', value: '$12,450', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Pending Approval', value: '$840', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Reimbursed', value: '$9,200', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex items-center gap-6 hover:shadow-lg transition-all group">
            <div className={`w-16 h-16 ${stat.bg} rounded-[24px] flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <DollarSign className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 leading-none">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search expenses..." 
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 text-slate-400 hover:text-slate-900 bg-white border border-slate-200 rounded-xl transition-all"><ChevronDown size={18} /></button>
          </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Expense</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Project</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.filter((expense) => expense.title.toLowerCase().includes(searchQuery.toLowerCase()) || expense.project.toLowerCase().includes(searchQuery.toLowerCase())).map(exp => (
              <tr key={exp.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shadow-sm">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{exp.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">{exp.project}</td>
                <td className="px-8 py-6 text-sm font-bold text-slate-400 tracking-tight">{exp.date}</td>
                <td className="px-8 py-6 text-sm font-black text-slate-900 text-right">{exp.amount}</td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
                    exp.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {exp.status === 'Approved' ? <Check size={12} /> : <FileText size={12} />}
                    {exp.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Add Expense</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); addExpense(); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Description</label>
                  <input type="text" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="What was this for?" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Amount</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black">$</span>
                      <input type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="0.00" className="w-full pl-10 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Project</label>
                    <select value={form.project} onChange={(event) => setForm({ ...form, project: event.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none">
                      <option>Acme Corp Redesign</option>
                      <option>Mobile App QA</option>
                      <option>Internal</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Attachment</label>
                  <div className="border-2 border-dashed border-slate-100 rounded-[24px] p-8 text-center hover:border-indigo-200 transition-all cursor-pointer bg-slate-50/50 group">
                    <Upload size={32} className="mx-auto text-slate-300 mb-3 group-hover:text-indigo-400 transition-colors" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">Click to upload receipt</p>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all uppercase tracking-[0.2em] text-xs"
                  >
                    Save Expense
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

export default Expenses;
