import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Check, ChevronRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    language: 'English',
    companySize: '1 - 5 employees',
    interest: 'Use it in my company'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl shadow-slate-200 overflow-hidden">
        <div className="p-12">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black text-slate-900 mb-2 italic">Get <span className="text-indigo-600 underline decoration-indigo-300">Started</span></h1>
            <p className="text-slate-500 font-bold tracking-tight">Free instant access. No credit card required.</p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl mb-10 border border-slate-100">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100">
              <Clock className="text-white w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">Timesheets</p>
            </div>
            <button className="text-xs font-bold text-indigo-600 bg-white px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
              Change apps selection
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <input 
                type="text" placeholder="First and Last Name" required
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <input 
                type="text" placeholder="Company Name" required
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <input 
                type="email" placeholder="Email" required
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 px-1">Phone Number</label>
              <div className="flex gap-2">
                <span className="bg-slate-50 px-4 py-4 rounded-2xl font-bold text-slate-500 border border-transparent">+91</span>
                <input 
                  type="tel" placeholder="Phone Number" required
                  className="flex-1 px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 px-1">Country</label>
              <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all font-bold appearance-none">
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 px-1">Language</label>
              <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all font-bold appearance-none">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 px-1">Company size</label>
              <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all font-bold appearance-none">
                <option>1 - 5 employees</option>
                <option>6 - 20 employees</option>
                <option>21 - 100 employees</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 px-1">Primary Interest</label>
              <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all font-bold appearance-none">
                <option>Use it in my company</option>
                <option>Personal use</option>
              </select>
            </div>

            <div className="md:col-span-2 text-center mt-6">
              <p className="text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-wider">
                By clicking on <span className="text-slate-700">Start Now</span>, you accept our <span className="text-indigo-600 underline cursor-pointer">Subscription Agreement</span> and <span className="text-indigo-600 underline cursor-pointer">Privacy Policy</span>
              </p>
              <button 
                type="submit"
                className="w-full md:w-auto min-w-[200px] bg-[#634e63] text-white font-black px-12 py-5 rounded-2xl hover:bg-[#523d52] shadow-xl shadow-[#634e63]/20 transition-all uppercase tracking-widest"
              >
                Start Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
