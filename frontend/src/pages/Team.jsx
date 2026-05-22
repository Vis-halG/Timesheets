import React, { useState } from 'react';
import { UserPlus, Search, Mail, Phone, MoreHorizontal, X, Shield, Star, Check } from 'lucide-react';

const MOCK_MEMBERS = [
  { id: 1, name: 'John Doe', role: 'UI Designer', email: 'john@example.com', rate: '$50/hr', status: 'Active', admin: true },
  { id: 2, name: 'Jane Smith', role: 'Full Stack Developer', email: 'jane@example.com', rate: '$65/hr', status: 'Active', admin: false },
  { id: 3, name: 'Mike Ross', role: 'Product Manager', email: 'mike@example.com', rate: '$80/hr', status: 'On Leave', admin: false },
  { id: 4, name: 'Sarah Connor', role: 'QA Lead', email: 'sarah@example.com', rate: '$45/hr', status: 'Active', admin: false },
];

const Team = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [invite, setInvite] = useState({ email: '', accessRole: 'Member', rate: '50' });

  const sendInvite = () => {
    const name = invite.email ? invite.email.split('@')[0].replace(/[._-]/g, ' ') : 'New Member';
    setMembers([
      {
        id: Date.now(),
        name: name.replace(/\b\w/g, (letter) => letter.toUpperCase()),
        role: invite.accessRole,
        email: invite.email || 'new.member@company.com',
        rate: `$${invite.rate || 0}/hr`,
        status: 'Active',
        admin: invite.accessRole === 'Admin',
      },
      ...members,
    ]);
    setInvite({ email: '', accessRole: 'Member', rate: '50' });
    setShowInviteModal(false);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Team Members</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Manage your team workspace access</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="bg-indigo-600 text-white font-black px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 text-sm uppercase tracking-widest"
        >
          <UserPlus size={18} />
          Invite New Member
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">3 Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-200" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">1 On Leave</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y divide-slate-100 border-t border-slate-100">
          {members.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()) || member.email.toLowerCase().includes(searchQuery.toLowerCase())).map(member => (
            <div key={member.id} className="p-8 hover:bg-slate-50/50 transition-all group relative overflow-hidden">
              <div className="absolute top-4 right-4 flex gap-2">
                {member.admin && (
                  <div className="w-6 h-6 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shadow-sm" title="Workspace Admin">
                    <Shield size={14} />
                  </div>
                )}
                <button className="w-6 h-6 text-slate-300 hover:text-slate-900 transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white border-2 border-slate-100 rounded-[28px] flex items-center justify-center text-2xl font-black text-indigo-600 mb-6 group-hover:scale-110 group-hover:border-indigo-200 transition-all shadow-sm">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">{member.name}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{member.role}</p>
                
                <div className="w-full space-y-3 mb-8 px-2">
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Rate</span>
                    <span className="text-slate-900">{member.rate}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Status</span>
                    <span className={member.status === 'Active' ? 'text-emerald-500' : 'text-rose-500'}>{member.status}</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full">
                  <button className="flex-1 p-3 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all">
                    <Mail size={16} className="mx-auto" />
                  </button>
                  <button className="flex-1 p-3 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all">
                    <Phone size={16} className="mx-auto" />
                  </button>
                  <button className="flex-1 p-3 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all">
                    <Star size={16} className="mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Invite Member</h2>
                <button 
                  onClick={() => setShowInviteModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); sendInvite(); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                  <input type="email" value={invite.email} onChange={(event) => setInvite({ ...invite, email: event.target.value })} placeholder="email@company.com" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Access Role</label>
                    <select value={invite.accessRole} onChange={(event) => setInvite({ ...invite, accessRole: event.target.value })} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none">
                      <option>Member</option>
                      <option>Manager</option>
                      <option>Admin</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Billable Rate</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black">$</span>
                      <input type="number" value={invite.rate} onChange={(event) => setInvite({ ...invite, rate: event.target.value })} placeholder="0.00" className="w-full pl-10 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all uppercase tracking-[0.2em] text-xs"
                  >
                    Send Invitation
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

export default Team;
