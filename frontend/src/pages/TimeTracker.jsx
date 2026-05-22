import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  Play,
  PlusCircle,
  Tag as TagIcon,
  DollarSign,
  MoreVertical,
  Plus,
  Trash2,
  Calendar,
  X,
} from "lucide-react";

const MOCK_PROJECTS = [
  { id: 1, name: "Acme Corp Redesign", color: "bg-blue-500", client: "Acme Corp" },
  { id: 2, name: "Mobile App QA", color: "bg-purple-500", client: "Northstar Labs" },
  { id: 3, name: "Internal Admin", color: "bg-emerald-500", client: "Internal" },
];

const MOCK_TAGS = ["Design", "Development", "Meeting", "QA", "Research"];

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

function EntryGroup({ date, entries, totalDuration, onDelete }) {
  return (
    <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border border-slate-200 rounded-t-2xl">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{date}</h3>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total:</span>
          <span className="text-sm font-black text-slate-900">{formatTime(totalDuration)}</span>
        </div>
      </div>
      <div className="border border-t-0 border-slate-200 rounded-b-2xl bg-white divide-y divide-slate-100 overflow-hidden shadow-sm shadow-slate-100">
        {entries.map(entry => (
          <div key={entry.id} className="flex flex-col md:flex-row items-center gap-4 p-5 hover:bg-slate-50/50 transition-all group">
            <div className="flex-1 text-sm text-slate-900 font-bold">
              {entry.description}
            </div>
            
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end text-sm">
              {entry.project && (
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                  <span className={`w-2 h-2 rounded-full ${entry.project.color}`}></span>
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider">{entry.project.client} - {entry.project.name}</span>
                </div>
              )}

              {entry.tags?.length > 0 && (
                <div className="flex gap-1">
                  {entry.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase rounded-md tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-3 text-slate-400 font-bold text-xs">
                <span>{entry.startTime}</span>
                <ArrowRight size={12} className="text-slate-200" />
                <span>{entry.endTime}</span>
              </div>

              <div className="text-slate-900 font-black tabular-nums w-20 text-right">
                {entry.duration}
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                  <Play size={16} />
                </button>
                <button 
                  onClick={() => onDelete(entry.id)}
                  className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ArrowRight = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const TrackerPage = ({ entries, addEntry, deleteEntry }) => {
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [billable, setBillable] = useState(true);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isTracking) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTracking]);

  const toggleTimer = () => {
    if (isTracking) {
      setIsTracking(false);
      const newEntry = {
        id: Date.now(),
        description: description || "(no description)",
        project: selectedProject,
        tags: selectedTags,
        billable,
        startTime: new Date(startTimeRef.current).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: formatTime(elapsedTime),
        durationMs: elapsedTime,
        date: "Today",
      };
      addEntry(newEntry);
      setDescription("");
      setSelectedTags([]);
      setElapsedTime(0);
      startTimeRef.current = null;
    } else {
      setIsTracking(true);
      startTimeRef.current = Date.now() - elapsedTime;
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const groupedEntries = entries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = { entries: [], totalDurationMs: 0 };
    }
    acc[entry.date].entries.push(entry);
    acc[entry.date].totalDurationMs += entry.durationMs;
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Time Tracker</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">What are you working on today?</p>
        </div>
      </div>
      
      {/* Tracker Bar */}
      <div className="bg-white border border-slate-200 rounded-[28px] shadow-2xl shadow-slate-200/50 p-4 flex flex-col lg:flex-row items-center gap-6 group hover:border-indigo-200 transition-all">
        <input
          type="text"
          placeholder="Enter task description..."
          className="flex-1 w-full outline-none text-slate-900 text-sm font-bold placeholder:text-slate-300 px-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
          {/* Project Dropdown */}
          <div className="relative">
            <button 
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest ${
                selectedProject ? 'bg-slate-50 text-slate-700 border border-slate-100' : 'text-indigo-600 hover:bg-indigo-50'
              }`}
              onClick={() => { setShowProjectDropdown(!showProjectDropdown); setShowTagDropdown(false); }}
            >
              {selectedProject ? (
                <>
                  <span className={`w-2 h-2 rounded-full ${selectedProject.color}`}></span>
                  <span className="truncate max-w-[100px]">{selectedProject.name}</span>
                </>
              ) : (
                <>
                  <PlusCircle size={16} />
                  <span>Project</span>
                </>
              )}
            </button>

            {showProjectDropdown && (
              <div className="absolute top-full right-0 mt-3 w-64 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 py-3 animate-in zoom-in-95 duration-200">
                <div className="px-4 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Project</div>
                {MOCK_PROJECTS.map(p => (
                  <button 
                    key={p.id} 
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                    onClick={() => { setSelectedProject(p); setShowProjectDropdown(false); }}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${p.color}`}></span>
                    <div>
                      <p className="text-xs font-black text-slate-900">{p.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{p.client}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-8 w-px bg-slate-100 hidden lg:block"></div>

          {/* Tags Dropdown */}
          <div className="relative">
            <button 
              className={`p-3 rounded-2xl transition-all ${selectedTags.length > 0 ? 'bg-indigo-50 text-indigo-600' : 'text-slate-300 hover:text-indigo-600 hover:bg-indigo-50'}`}
              onClick={() => { setShowTagDropdown(!showTagDropdown); setShowProjectDropdown(false); }}
            >
              <TagIcon size={20} />
              {selectedTags.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">{selectedTags.length}</span>}
            </button>

            {showTagDropdown && (
              <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 py-4 animate-in zoom-in-95 duration-200">
                <div className="px-5 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tags</div>
                <div className="max-h-60 overflow-y-auto px-2 space-y-1">
                  {MOCK_TAGS.map(tag => (
                    <button 
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedTags.includes(tag) ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {tag}
                      {selectedTags.includes(tag) && <Plus size={14} className="rotate-45" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            className={`p-3 rounded-2xl transition-all ${billable ? 'bg-indigo-50 text-indigo-600' : 'text-slate-300 hover:text-indigo-600'}`}
            onClick={() => setBillable(!billable)}
          >
            <DollarSign size={20} />
          </button>

          <div className="h-10 w-px bg-slate-100 hidden lg:block ml-2"></div>

          <div className="text-2xl font-black text-slate-900 tabular-nums w-32 text-right tracking-tighter">
            {formatTime(elapsedTime)}
          </div>

          <button 
            onClick={toggleTimer}
            className={`flex items-center justify-center min-w-[120px] py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl ${
              isTracking 
              ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
            }`}
          >
            {isTracking ? "Stop" : "Start"}
          </button>
        </div>
      </div>

      {/* Entries List */}
      <div className="mt-12">
        {Object.entries(groupedEntries).map(([date, data]) => (
          <EntryGroup 
            key={date}
            date={date}
            entries={data.entries}
            totalDuration={data.totalDurationMs}
            onDelete={deleteEntry}
          />
        ))}
        
        {entries.length === 0 && (
          <div className="text-center py-24 bg-white border-2 border-slate-100 border-dashed rounded-[40px]">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock size={32} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-800">Your timeline is empty</h3>
            <p className="text-slate-400 font-bold mt-2">Start your first timer to track progress.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackerPage;
