import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';

const steps = [
  { id: 1, title: 'Step 1' },
  { id: 2, title: 'Step 2' },
  { id: 3, title: 'Step 3' },
  { id: 4, title: 'Step 4' },
];

const industries = [
  'Accounting & Finance', 'Design & Architecture', 'Education & Training', 
  'Engineering & Construction', 'Healthcare & Medical', 'Human Resources & Recruitment',
  'Information Technology & Services', 'Legal Services', 'Management & Consulting',
  'Marketing & Advertising', 'Media', 'Non-Profit Organizations', 'Other'
];

const companySizes = ['Self-employed', '2-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5001-10000', '10000+'];
const teamSizes = ['Only me', '2-5', '6-10', '11-20', '21-50', '51-100', '101-250', '250+'];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCompanySize, setSelectedCompanySize] = useState('');
  const [selectedTeamSize, setSelectedTeamSize] = useState('');

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else navigate('/trial-info');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl shadow-slate-200 border border-slate-100 p-12">
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-16 px-4">
          {steps.map((step) => (
            <div key={step.id} className="flex-1 h-1 bg-slate-100 relative rounded-full overflow-hidden">
              <div 
                className={`absolute inset-0 bg-indigo-500 transition-all duration-500 ${currentStep >= step.id ? 'translate-x-0' : '-translate-x-full'}`}
              />
              <div className="absolute -top-6 left-0 text-[10px] font-black uppercase tracking-widest text-slate-400">
                {step.title} {currentStep > step.id && <Check className="inline w-3 h-3 text-emerald-500 ml-1" />}
              </div>
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-slate-900 mb-10 leading-tight">
              The industry your company operates in:
            </h2>
            <div className="flex flex-wrap gap-3">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-6 py-3.5 rounded-full text-sm font-bold border-2 transition-all ${
                    selectedIndustry === ind 
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md' 
                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8 leading-tight">How large is your company?</h2>
              <div className="flex flex-wrap gap-3">
                {companySizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedCompanySize(size)}
                    className={`px-6 py-3.5 rounded-full text-sm font-bold border-2 transition-all ${
                      selectedCompanySize === size 
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md' 
                      : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8 leading-tight">How many people will be working with you?</h2>
              <div className="flex flex-wrap gap-3">
                {teamSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedTeamSize(size)}
                    className={`px-6 py-3.5 rounded-full text-sm font-bold border-2 transition-all ${
                      selectedTeamSize === size 
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md' 
                      : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep > 2 && (
          <div className="text-center py-20 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">You're all set!</h2>
            <p className="text-slate-500 font-bold">Setting up your personalized workspace...</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-16 pt-8 border-t border-slate-50">
          <button 
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
            className="text-indigo-600 font-bold uppercase tracking-widest text-sm hover:underline"
          >
            {currentStep > 1 ? 'Back' : ''}
          </button>
          <button 
            onClick={nextStep}
            className="bg-[#4dc3ff] text-white font-black px-12 py-4 rounded-xl hover:bg-[#3db3ef] shadow-xl shadow-[#4dc3ff]/20 transition-all uppercase tracking-widest text-sm"
          >
            {currentStep === 4 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
