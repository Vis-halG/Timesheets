import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Clock, MapPin } from 'lucide-react';

const CalendarPage = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [events, setEvents] = useState([
    { id: 1, day: 16, title: 'Project Sync', time: '10:00', color: 'bg-indigo-600 text-white border-indigo-500' },
    { id: 2, day: 16, title: 'Client Meeting', time: '14:00', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  ]);
  const [form, setForm] = useState({ title: '', date: '', time: '10:00', location: '' });
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date();
  const currentMonth = date.toLocaleString('default', { month: 'long' });
  const currentYear = date.getFullYear();

  // Mock days for the grid
  const calendarDays = Array.from({ length: 35 }, (_, i) => i - 3);

  const addEvent = () => {
    const selectedDate = form.date ? new Date(`${form.date}T00:00:00`) : new Date();
    const day = selectedDate.getDate();

    setEvents([
      {
        id: Date.now(),
        day,
        title: form.title || 'New Event',
        time: form.time,
        color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      },
      ...events,
    ]);
    setForm({ title: '', date: '', time: '10:00', location: '' });
    setShowEventModal(false);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Calendar</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Schedule and manage your events</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <button className="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors border-r border-slate-100"><ChevronLeft size={20} /></button>
            <div className="px-6 py-2.5 text-sm font-black text-slate-900 uppercase tracking-widest flex items-center">{currentMonth} {currentYear}</div>
            <button className="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors border-l border-slate-100"><ChevronRight size={20} /></button>
          </div>
          <button 
            onClick={() => setShowEventModal(true)}
            className="bg-indigo-600 text-white font-black px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 text-sm uppercase tracking-widest"
          >
            <Plus size={18} />
            Add Event
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-100">
          {days.map(day => (
            <div key={day} className="py-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/50">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {calendarDays.map((day, i) => (
            <div 
              key={i} 
              className={`min-h-[140px] p-4 border-r border-b border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer group relative ${day < 1 || day > 31 ? 'bg-slate-50/30' : ''}`}
            >
              <span className={`text-sm font-black ${day === 16 ? 'text-indigo-600 bg-indigo-50 w-8 h-8 flex items-center justify-center rounded-xl' : 'text-slate-400'} ${day < 1 || day > 31 ? 'opacity-20' : ''}`}>
                {day > 0 && day <= 31 ? day : ''}
              </span>

              {events.some((event) => event.day === day) && (
                <div className="mt-4 space-y-2">
                  {events.filter((event) => event.day === day).map((event) => (
                    <div key={event.id} className={`p-2.5 rounded-xl border animate-in slide-in-from-top-1 duration-300 ${event.color}`}>
                      <p className="text-[9px] font-black uppercase tracking-tighter truncate">{event.title}</p>
                      <p className="text-[8px] font-bold opacity-80 uppercase tracking-tighter">{event.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Add New Event</h2>
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); addEvent(); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Event Title</label>
                  <input type="text" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Design Review" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Date</label>
                    <div className="relative">
                      <CalendarIcon size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Time</label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Location / Link</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Zoom or Meeting Room" className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all uppercase tracking-[0.2em] text-xs"
                  >
                    Save Event
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

export default CalendarPage;
