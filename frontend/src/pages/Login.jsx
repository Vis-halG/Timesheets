import React, { useState } from "react";
import axios from "axios";
import { BriefcaseBusiness, Lock, Mail, ShieldCheck, UserRound } from "lucide-react";

const demoAccounts = [
  {
    role: "Admin",
    email: "admin@company.com",
    password: "admin123",
    icon: ShieldCheck,
    description: "Manage team, projects, approvals, and reports",
  },
  {
    role: "Employee",
    email: "employee@company.com",
    password: "employee123",
    icon: UserRound,
    description: "Track time, view tasks, and manage own timesheet",
  },
];

const Login = ({ apiUrl, onLogin }) => {
  const [email, setEmail] = useState("employee@company.com");
  const [password, setPassword] = useState("employee123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
      onLogin(response.data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  const useAccount = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <section className="hidden lg:flex flex-1 bg-slate-950 text-white p-14 flex-col justify-between">
        <div className="flex items-center gap-3 text-2xl font-black">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-950">
            <BriefcaseBusiness size={24} />
          </div>
          TimeFlow
        </div>

        <div className="max-w-xl space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.35em]">Software Company Timesheets</p>
            <h1 className="text-5xl font-black tracking-tight leading-tight">One workspace, two clean access levels.</h1>
            <p className="text-slate-300 font-semibold leading-7">
              Admins manage people and approvals. Employees focus on tracking work, tasks, leave, and their own timesheet.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {demoAccounts.map((account) => (
              <button
                key={account.role}
                onClick={() => useAccount(account)}
                className="text-left p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
              >
                <account.icon size={22} className="text-indigo-300 mb-4" />
                <p className="text-sm font-black uppercase tracking-widest">{account.role}</p>
                <p className="text-xs text-slate-400 font-semibold mt-2 leading-5">{account.description}</p>
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-500 font-bold">Demo build ready for Firebase integration.</p>
      </section>

      <main className="w-full lg:w-[480px] bg-white flex items-center justify-center p-8 border-l border-slate-200">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <div className="lg:hidden flex items-center gap-3 text-slate-900 font-black text-2xl mb-8">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                <BriefcaseBusiness size={24} />
              </div>
              TimeFlow
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Sign in</h2>
            <p className="text-sm text-slate-500 font-bold">Use one of the demo accounts to enter the workspace.</p>
          </div>

          <form className="space-y-5" onSubmit={submit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-black">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 disabled:opacity-60 shadow-xl shadow-indigo-100 transition-all uppercase tracking-[0.2em] text-xs"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="grid grid-cols-2 gap-3">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => useAccount(account)}
                className="px-4 py-3 bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                {account.role}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
