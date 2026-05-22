import React, { useState } from 'react';
import { BarChart3, PieChart, Download, Filter, Calendar, Clock, DollarSign, FileText, X } from 'lucide-react';

const Reports = () => {
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reports</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Analyze your workspace performance</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Calendar size={16} />
            May 1 - May 31
          </button>
          <button 
            onClick={() => setShowExportModal(true)}
            className="bg-indigo-600 text-white font-black px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 text-sm uppercase tracking-widest"
          >
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: 'Total Hours', value: '1,240', change: '+12%', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Billable Amount', value: '$24,500', change: '+8%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Projects', value: '12', change: '-2', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Team Capacity', value: '84%', change: '+5%', icon: PieChart, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-lg transition-all group relative overflow-hidden">
            <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <div className="flex items-end gap-3">
                <p className="text-3xl font-black text-slate-900 leading-none">{stat.value}</p>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${stat.change.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-200 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Billable Hours Trend</h2>
            <button className="p-2 text-slate-400 hover:text-slate-900"><Filter size={18} /></button>
          </div>
          <div className="h-64 flex items-end gap-4">
            {[40, 70, 45, 90, 65, 80, 55, 75, 95, 60, 85, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-slate-50 rounded-t-xl relative group">
                <div 
                  className="absolute bottom-0 inset-x-0 bg-indigo-600 rounded-t-xl transition-all duration-1000 ease-out group-hover:bg-indigo-400"
                  style={{ height: `${h}%` }}
                />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ${h * 100}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Dec</span>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">Project Allocation</h2>
          <div className="space-y-6">
            {[
              { name: 'Acme Redesign', percent: 45, color: 'bg-indigo-600' },
              { name: 'Mobile App QA', percent: 30, color: 'bg-emerald-500' },
              { name: 'Internal Admin', percent: 15, color: 'bg-amber-500' },
              { name: 'Others', percent: 10, color: 'bg-slate-300' },
            ].map((p, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">{p.name}</span>
                  <span className="text-slate-900">{p.percent}%</span>
                </div>
                <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full ${p.color} transition-all duration-1000`} style={{ width: `${p.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Export Report</h2>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-sm font-bold text-slate-500">Choose your preferred export format and data range.</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-6 border-2 border-indigo-600 bg-indigo-50 rounded-3xl text-center transition-all group">
                    <FileText size={32} className="mx-auto text-indigo-600 mb-2" />
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-600">CSV Spreadsheet</span>
                  </button>
                  <button className="p-6 border-2 border-slate-100 hover:border-indigo-200 bg-white rounded-3xl text-center transition-all group">
                    <FileText size={32} className="mx-auto text-slate-300 group-hover:text-indigo-400 mb-2" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600">PDF Document</span>
                  </button>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => setShowExportModal(false)}
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all uppercase tracking-[0.2em] text-xs"
                  >
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
