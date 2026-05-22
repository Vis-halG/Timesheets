import React, { useState } from 'react';
import { Briefcase, Plus, Users, Search, MoreVertical, Globe, Settings, X, Check } from 'lucide-react';

const MOCK_PROJECTS = [
  { id: 1, name: 'Acme Corp Redesign', client: 'Acme Corp', members: 5, status: 'In Progress', visibility: 'Public', color: 'bg-blue-500' },
  { id: 2, name: 'Mobile App QA', client: 'Northstar Labs', members: 3, status: 'In Progress', visibility: 'Private', color: 'bg-purple-500' },
  { id: 3, name: 'Internal Admin', client: 'Internal', members: 2, status: 'Completed', visibility: 'Public', color: 'bg-emerald-500' },
];

const Projects = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [form, setForm] = useState({ name: '', client: 'Acme Corp' });

  const createProject = () => {
    const nextProject = {
      id: Date.now(),
      name: form.name || 'New Software Project',
      client: form.client,
      members: 1,
      status: 'In Progress',
      visibility: 'Public',
      color: 'bg-indigo-500',
    };

    setProjects([nextProject, ...projects]);
    setShowCreateModal(false);
    setForm({ name: '', client: 'Acme Corp' });
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Projects</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Manage your workspace projects</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white font-black px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 text-sm uppercase tracking-widest"
        >
          <Plus size={18} />
          Create New Project
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900">All</button>
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b-2 border-indigo-600">Active</button>
            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900">Archived</button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {projects.filter((project) => project.name.toLowerCase().includes(searchQuery.toLowerCase()) || project.client.toLowerCase().includes(searchQuery.toLowerCase())).map(project => (
            <div key={project.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50/50 transition-all group cursor-pointer">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 ${project.color} rounded-2xl flex items-center justify-center shadow-lg shadow-slate-100 group-hover:scale-105 transition-transform`}>
                  <Briefcase size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-0.5">{project.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{project.client}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${project.visibility === 'Private' ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {project.visibility}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-12 mt-4 md:mt-0">
                <div className="flex flex-col items-end">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Team</p>
                  <div className="flex -space-x-2">
                    {[...Array(project.members)].map((_, i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-500">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-right min-w-[100px]">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    project.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                    <Settings size={18} />
                  </button>
                  <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Create Project</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); createProject(); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Project Name</label>
                  <input type="text" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Website Redesign" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Client</label>
                  <select value={form.client} onChange={(event) => setForm({ ...form, client: event.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none">
                    <option>Acme Corp</option>
                    <option>Northstar Labs</option>
                    <option>Internal</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Privacy</label>
                    <div className="flex bg-slate-50 p-1 rounded-2xl">
                      <button type="button" className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest bg-white text-indigo-600 rounded-xl shadow-sm">Public</button>
                      <button type="button" className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600">Private</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Billable</label>
                    <div className="flex bg-slate-50 p-1 rounded-2xl">
                      <button type="button" className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest bg-white text-emerald-600 rounded-xl shadow-sm">Yes</button>
                      <button type="button" className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600">No</button>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all uppercase tracking-[0.2em] text-xs"
                  >
                    Create Project
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

export default Projects;
