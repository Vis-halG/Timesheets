import React, { useState } from 'react';
import { Plus, Hash, Trash2, X } from 'lucide-react';

const Tags = () => {
  const initialTags = [
    { id: 1, name: 'Design', color: 'bg-blue-100 text-blue-600', entries: 145 },
    { id: 2, name: 'Development', color: 'bg-purple-100 text-purple-600', entries: 230 },
    { id: 3, name: 'Meeting', color: 'bg-emerald-100 text-emerald-600', entries: 84 },
    { id: 4, name: 'QA', color: 'bg-rose-100 text-rose-600', entries: 56 },
    { id: 5, name: 'Marketing', color: 'bg-amber-100 text-amber-600', entries: 32 },
  ];
  const [tags, setTags] = useState(initialTags);
  const [showModal, setShowModal] = useState(false);
  const [tagName, setTagName] = useState('');

  const createTag = () => {
    setTags([{ id: Date.now(), name: tagName || 'New Tag', color: 'bg-indigo-100 text-indigo-600', entries: 0 }, ...tags]);
    setTagName('');
    setShowModal(false);
  };

  const deleteTag = (tagId) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tags</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Categorize Time & Expenses</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white font-black px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 text-sm uppercase tracking-widest">
          <Plus size={18} />
          Create Tag
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tags.map(tag => (
          <div key={tag.id} className="bg-white rounded-[24px] border border-slate-200 p-6 flex items-center justify-between group hover:border-indigo-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 ${tag.color.split(' ')[0]} rounded-xl flex items-center justify-center`}>
                <Hash className={tag.color.split(' ')[1]} size={18} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">{tag.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tag.entries} Entries</p>
              </div>
            </div>
            <button onClick={() => deleteTag(tag.id)} className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl p-10 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900">Create Tag</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900">
                <X size={24} />
              </button>
            </div>
            <form className="space-y-6" onSubmit={(event) => { event.preventDefault(); createTag(); }}>
              <input value={tagName} onChange={(event) => setTagName(event.target.value)} placeholder="Tag name" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              <button type="submit" className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all uppercase tracking-[0.2em] text-xs">
                Save Tag
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tags;
