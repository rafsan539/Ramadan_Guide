
import React, { useState } from 'react';

const TasbihCounter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-md mx-auto space-y-6 sm:space-y-8 animate-in zoom-in duration-300 px-2 sm:px-4">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-400 mb-2 tracking-tight">ডিজিটাল তসবীহ</h1>
        <p className="text-emerald-300 font-bold opacity-80 text-xs sm:text-sm">প্রতিটি স্মরণে মহান আল্লাহর ইবাদত করুন</p>
      </div>

      <div className="bg-emerald-900 rounded-xl sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-8 md:p-10 lg:p-12 border border-emerald-800 shadow-2xl flex flex-col items-center">
        <div className="bg-emerald-950 w-full rounded-lg sm:rounded-[1.5rem] md:rounded-[2rem] p-4 sm:p-6 md:p-8 border border-emerald-800 mb-6 sm:mb-8 md:mb-10 text-center shadow-inner">
          <span className="text-emerald-600 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-2 block">সংখ্যা</span>
          <span className="text-5xl sm:text-6xl md:text-7xl font-mono text-amber-400 font-black">{count.toString().padStart(3, '0')}</span>
        </div>

        <button
          onClick={() => setCount(prev => prev + 1)}
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-amber-500 rounded-full border-6 sm:border-8 border-emerald-800 shadow-[0_15px_40px_rgba(0,0,0,0.5)] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center group"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-amber-400 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-emerald-950 group-active:scale-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </button>

        <div className="mt-6 sm:mt-8 md:mt-10 flex gap-3 sm:gap-4">
          <button
            onClick={() => setCount(0)}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-emerald-800 border border-emerald-700 text-emerald-100 rounded-lg sm:rounded-2xl text-[9px] sm:text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg"
          >
            রিসেট করুন
          </button>
        </div>
      </div>

      <div className="bg-emerald-900/40 p-5 sm:p-6 rounded-lg sm:rounded-2xl border border-emerald-800 text-center text-emerald-400 text-xs sm:text-sm font-bold italic opacity-80">
        "সুবহানাল্লাহ, আলহামদুলিল্লাহ, আল্লাহু আকবার"
      </div>
    </div>
  );
};

export default TasbihCounter;
