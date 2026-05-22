import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Clock,
  Calendar,
  List,
  DollarSign,
  LayoutDashboard,
  PieChart,
  Briefcase,
  Users,
  Tag,
  CheckCircle2,
  Settings as SettingsIcon,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import "./styles.css";

import TrackerPage from "./pages/TimeTracker";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Projects from "./pages/Projects";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import TrialInfo from "./pages/TrialInfo";
import CalendarPage from "./pages/Calendar";
import Schedule from "./pages/Schedule";
import Expenses from "./pages/Expenses";
import TimeOff from "./pages/TimeOff";
import Kiosks from "./pages/Kiosks";
import Approvals from "./pages/Approvals";
import Team from "./pages/Team";
import Clients from "./pages/Clients";
import Tags from "./pages/Tags";
import TimesheetPage from "./pages/Timesheet";
import Activity from "./pages/Activity";
import Settings from "./pages/Settings";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const AUTH_TOKEN_KEY = "timeflow_auth_token";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

function Sidebar({ isOpen, setIsOpen, user }) {
  const isAdmin = user.role === "admin";

  const employeeItems = [
    { icon: Clock, label: "Time Tracker", path: "/" },
    { icon: List, label: "My Tasks", path: "/tasks" },
    { icon: List, label: "My Timesheet", path: "/timesheet" },
    { icon: Calendar, label: "Calendar", path: "/calendar" },
    { icon: Clock, label: "Time Off", path: "/time-off", badge: true },
    { icon: DollarSign, label: "Expenses", path: "/expenses" },
  ];

  const adminItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: CheckCircle2, label: "Approvals", path: "/approvals", badge: true },
    { icon: Users, label: "Team", path: "/team" },
    { icon: Briefcase, label: "Projects", path: "/projects" },
    { icon: List, label: "Tasks", path: "/tasks" },
    { icon: PieChart, label: "Reports", path: "/reports" },
    { icon: Users, label: "Clients", path: "/clients" },
    { icon: Tag, label: "Tags", path: "/tags" },
  ];

  const secondaryItems = isAdmin
    ? [
        { icon: Calendar, label: "Schedule", path: "/schedule" },
        { icon: LayoutDashboard, label: "Kiosks", path: "/kiosks" },
        { icon: PieChart, label: "Activity", path: "/activity" },
      ]
    : [{ icon: PieChart, label: "Activity", path: "/activity" }];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-20 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 bg-white border-r border-slate-200 text-slate-600 flex flex-col h-screen
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-slate-100 justify-between bg-white">
          <div className="flex items-center gap-3 text-slate-900 font-black text-xl">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100">
              <Clock size={20} className="text-white" />
            </div>
            <span className="tracking-tight italic">TimeFlow</span>
          </div>
          <button className="md:hidden text-slate-400 hover:text-slate-900" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
          <NavSection title={isAdmin ? "Admin" : "Employee"} items={isAdmin ? adminItems : employeeItems} />
          <NavSection title="Workspace" items={secondaryItems} />
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <NavLink to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm">
            <SettingsIcon size={18} />
            Settings
          </NavLink>
        </div>
      </aside>
    </>
  );
}

function NavSection({ title, items }) {
  return (
    <div>
      <div className="px-4 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{title}</div>
      <div className="space-y-1.5">
        {items.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-between px-4 py-3 rounded-2xl transition-all text-sm font-bold
              ${isActive
                ? "bg-indigo-50 text-indigo-700 shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
            `}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={isActive ? "text-indigo-600" : "text-slate-400"} />
                  <span className="uppercase tracking-widest text-[10px]">{item.label}</span>
                </div>
                {item.badge && <span className="w-2 h-2 rounded-full bg-orange-500 shadow-md shadow-orange-200" />}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function Topbar({ toggleSidebar, user, onLogout }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-slate-500 hover:text-slate-800" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signed in as</p>
          <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{user.role}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden lg:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects or tasks..."
            className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all w-72"
          />
        </div>

        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
          <Bell size={20} />
        </button>
        <div className="h-8 w-px bg-slate-200" />
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-900">{user.name}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user.designation}</p>
          </div>
          <div className="h-10 w-10 bg-indigo-600 rounded-xl text-white flex items-center justify-center font-black text-sm shadow-xl shadow-indigo-100">
            {user.name.charAt(0)}
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

function RequireRole({ user, roles, children }) {
  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppRoutes({ user, entries, addEntry, deleteEntry }) {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/trial-info" element={<TrialInfo />} />

      <Route path="/" element={user.role === "admin" ? <Dashboard userRole={user.role} /> : <TrackerPage entries={entries} addEntry={addEntry} deleteEntry={deleteEntry} />} />
      <Route path="/dashboard" element={<RequireRole user={user} roles={["admin"]}><Dashboard userRole={user.role} /></RequireRole>} />
      <Route path="/reports" element={<RequireRole user={user} roles={["admin"]}><Reports /></RequireRole>} />
      <Route path="/projects" element={<RequireRole user={user} roles={["admin"]}><Projects /></RequireRole>} />
      <Route path="/tasks" element={<Tasks userRole={user.role} />} />

      <Route path="/calendar" element={<RequireRole user={user} roles={["employee"]}><CalendarPage /></RequireRole>} />
      <Route path="/schedule" element={<RequireRole user={user} roles={["admin"]}><Schedule /></RequireRole>} />
      <Route path="/expenses" element={<RequireRole user={user} roles={["employee"]}><Expenses /></RequireRole>} />
      <Route path="/time-off" element={<RequireRole user={user} roles={["employee"]}><TimeOff /></RequireRole>} />
      <Route path="/kiosks" element={<RequireRole user={user} roles={["admin"]}><Kiosks /></RequireRole>} />
      <Route path="/approvals" element={<RequireRole user={user} roles={["admin"]}><Approvals /></RequireRole>} />
      <Route path="/team" element={<RequireRole user={user} roles={["admin"]}><Team /></RequireRole>} />
      <Route path="/clients" element={<RequireRole user={user} roles={["admin"]}><Clients /></RequireRole>} />
      <Route path="/tags" element={<RequireRole user={user} roles={["admin"]}><Tags /></RequireRole>} />
      <Route path="/timesheet" element={<RequireRole user={user} roles={["employee"]}><TimesheetPage entries={entries} /></RequireRole>} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="*" element={<div className="p-8 font-black text-slate-900 bg-slate-50 min-h-full flex items-center justify-center">404 - Page Not Found</div>} />
    </Routes>
  );
}

function LoginShell({ setUser }) {
  const navigate = useNavigate();

  const handleLogin = ({ token, user }) => {
    setAuthToken(token);
    setUser(user);
    navigate("/", { replace: true });
  };

  return <Login apiUrl={API_URL} onLogin={handleLogin} />;
}

function App() {
  const [entries, setEntries] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [entriesLoading, setEntriesLoading] = useState(false);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      if (!token) {
        setLoading(false);
        return;
      }

      setAuthToken(token);

      try {
        const response = await axios.get(`${API_URL}/auth/me`);
        setUser(response.data);
      } catch (error) {
        console.error("Error restoring session:", error);
        setAuthToken(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  React.useEffect(() => {
    if (!user) {
      setEntries([]);
      return;
    }

    const fetchEntries = async () => {
      setEntriesLoading(true);

      try {
        const response = await axios.get(`${API_URL}/entries`);
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setEntriesLoading(false);
      }
    };

    fetchEntries();
  }, [user]);

  const addEntry = async (entry) => {
    try {
      const response = await axios.post(`${API_URL}/entries`, entry);
      setEntries([response.data, ...entries]);
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  const deleteEntry = async (entryId) => {
    try {
      await axios.delete(`${API_URL}/entries/${entryId}`);
      setEntries(entries.filter((entry) => entry.id !== entryId));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setAuthToken(null);
      setUser(null);
      setEntries([]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Router>
      {!user ? (
        <Routes>
          <Route path="/login" element={<LoginShell setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <div className="flex h-screen overflow-hidden bg-slate-50">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} user={user} />

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Topbar
              toggleSidebar={() => setIsSidebarOpen(true)}
              user={user}
              onLogout={logout}
            />

            <main className="flex-1 overflow-y-auto">
              {entriesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : (
                <AppRoutes user={user} entries={entries} addEntry={addEntry} deleteEntry={deleteEntry} />
              )}
            </main>
          </div>
        </div>
      )}
    </Router>
  );
}

createRoot(document.getElementById("root")).render(<App />);
