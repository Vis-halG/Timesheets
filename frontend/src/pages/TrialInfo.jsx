import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Info, Star } from 'lucide-react';

const proFeatures = [
  'Break', 'Force timer', 'Labor cost & profit', 'Screenshots', 'Scheduling',
  'Expenses', 'GPS tracking', 'Time off', 'Export & share data',
  'Billability & billable rates', 'Approval', 'Forecasting', 'Kiosk', 'Budget & estimates'
];

const TrialInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl shadow-slate-200 flex flex-col md:flex-row overflow-hidden border border-slate-100">
        {/* Left Side: Features */}
        <div className="flex-1 bg-[#f1f5f9]/50 p-12 border-r border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-8 tracking-tight">
            Try these Pro plan features at no additional cost
          </h2>
          <div className="space-y-4">
            {proFeatures.map((feature) => (
              <div key={feature} className="flex items-center justify-between group cursor-help">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{feature}</span>
                </div>
                <Info className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Welcome */}
        <div className="flex-1 p-16 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-[#6ea14a] rounded-full flex items-center justify-center mb-10 shadow-xl shadow-green-100 animate-bounce">
            <Star className="text-white w-10 h-10 fill-white" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
            Your free trial starts today!
          </h1>
          <p className="text-slate-600 font-bold mb-10">
            Explore Pro features for free for 7 days.<br />
            <span className="text-slate-400">No credit card required.</span>
          </p>
          
          <div className="bg-slate-50 p-6 rounded-2xl mb-12 border border-slate-100">
            <p className="text-sm font-bold text-slate-500">
              When your trial ends, stay on Clockify's Free plan or upgrade.
            </p>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="group flex items-center gap-3 bg-[#0284c7] text-white font-black px-12 py-5 rounded-2xl hover:bg-[#0369a1] shadow-2xl shadow-sky-200 transition-all uppercase tracking-widest"
          >
            Let's go
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrialInfo;
