
import React, { useState } from 'react';
import { HADITHS, HADITH_BOOKS } from '../constants';

const HadithSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all' 
    ? HADITHS 
    : HADITHS.filter(h => h.category === activeCategory);

  const categories = [
    { id: 'all', label: 'সবগুলো' },
    { id: 'fasting', label: 'রোজা' },
    { id: 'taraweeh', label: 'তারাবীহ' },
    { id: 'laylatul-qadr', label: 'লাইলাতুল কদর' },
    { id: 'zakat', label: 'যাকাত' },
    { id: 'dua', label: 'দোয়া' }
  ];

  return (
    <div className="space-y-10 sm:space-y-12 md:space-y-16 pb-16 sm:pb-20 md:pb-20 px-2 sm:px-4">
      {/* Background Decorative Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/islamic-art.png')` }}></div>

      {/* Major Hadith Books Section - MOVED TO TOP FOR DIRECT ACCESS */}
      <section className="space-y-8 sm:space-y-10 pt-2 sm:pt-4">
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-amber-400 tracking-tight">বিখ্যাত হাদিস গ্রন্থসমূহ</h1>
          <p className="text-emerald-300 max-w-xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg font-bold opacity-80">ইসলামের সবচেয়ে নির্ভরযোগ্য ও বিশুদ্ধ ৬টি হাদিস গ্রন্থ (সিহাহ সিত্তা) সরাসরি অনলাইনে পড়ুন।</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 px-1 sm:px-0">
          {HADITH_BOOKS.map((book, idx) => (
            <a 
              key={idx} 
              href={book.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-emerald-900/40 backdrop-blur-md border border-emerald-800 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] hover:border-amber-500/40 transition-all group relative overflow-hidden flex flex-col h-full shadow-xl"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 -mr-12 -mt-12 rounded-full group-hover:bg-amber-500/10 transition-colors"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-950 rounded-xl flex items-center justify-center text-amber-500 text-lg md:text-xl font-bold border border-emerald-800 mb-6 group-hover:rotate-6 transition-transform">
                  📚
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-1 group-hover:text-amber-400 transition-colors">{book.name}</h3>
                  <p className="text-emerald-500 text-[10px] md:text-xs font-black mb-4 uppercase tracking-widest">{book.englishName}</p>
                  <p className="text-emerald-100/70 text-sm leading-relaxed mb-4 font-medium">{book.desc}</p>
                  <p className="text-amber-500/60 text-[10px] md:text-xs italic font-bold">সংকলক: {book.author}</p>
                </div>
                <div className="mt-8 flex justify-between items-center text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-amber-500 border-t border-emerald-800/50 pt-4">
                  <span>সরাসরি পড়ুন</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-800 to-transparent"></div>

      {/* Hadith Selection Section */}
      <div className="text-center space-y-4 relative">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">নির্বাচিত হাদিসসমূহ</h2>
        <p className="text-emerald-300 max-w-xl mx-auto text-base md:text-lg font-bold opacity-80">পবিত্র রমজানের ফজিলত ও আমল সম্পর্কিত কিছু গুরুত্বপূর্ণ হাদিস নিচে দেওয়া হলো।</p>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-6">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 md:px-6 py-2 rounded-xl text-xs md:text-sm font-black transition-all border uppercase tracking-widest ${
                activeCategory === cat.id 
                  ? 'bg-amber-500 text-emerald-950 border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.4)]' 
                  : 'bg-emerald-900/50 text-emerald-300 border-emerald-800 hover:border-amber-500/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hadith Cards Grid */}
      <div className="grid gap-6 md:gap-8 relative">
        {filtered.map((h, idx) => (
          <div 
            key={h.id} 
            className="group bg-emerald-900/40 backdrop-blur-md border border-emerald-800 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 hover:border-amber-500/30 transition-all shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 md:w-2 h-full bg-amber-500/20 group-hover:bg-amber-500 transition-colors"></div>
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <span className="bg-emerald-950 px-3 md:px-4 py-1 rounded-lg text-[9px] md:text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] border border-emerald-800">
                HADITH #{h.id}
              </span>
              <span className="text-emerald-500 text-[10px] md:text-sm font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                {categories.find(c => c.id === h.category)?.label}
              </span>
            </div>
            
            <div className="space-y-6 md:space-y-8">
              <p className="arabic text-3xl sm:text-4xl md:text-6xl text-right text-emerald-100 leading-[1.8]" dir="rtl">{h.arabic}</p>
              
              <div className="bg-emerald-950/80 p-5 md:p-8 rounded-2xl border border-amber-500/20 shadow-inner">
                <p className="text-amber-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-3">সহীহ উচ্চারণ (পড়ুন):</p>
                <p className="text-amber-400 font-bold text-lg sm:text-xl md:text-2xl leading-relaxed tracking-tight">
                  {h.pronunciation}
                </p>
              </div>

              <div className="pt-6 md:pt-8 border-t border-emerald-800/50">
                <p className="text-lg sm:text-xl md:text-3xl text-white font-bold leading-relaxed italic opacity-90">
                  "{h.bangla}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px w-8 md:w-12 bg-amber-500/30"></div>
                  <p className="text-[10px] md:text-sm text-amber-500 font-black uppercase tracking-widest">
                    — {h.reference}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-20 md:py-24 bg-emerald-900/20 rounded-[2.5rem] md:rounded-[3rem] border-2 border-dashed border-emerald-800 text-emerald-500 flex flex-col items-center mx-4">
            <span className="text-5xl md:text-6xl mb-4 opacity-20">📿</span>
            <p className="text-base md:text-lg font-black opacity-60 uppercase tracking-widest">এই ক্যাটাগরিতে বর্তমানে কোনো হাদিস সংরক্ষিত নেই।</p>
          </div>
        )}
      </div>

      {/* Info Notice */}
      <div className="bg-emerald-950/50 border border-emerald-800 p-8 rounded-[2rem] text-center max-w-2xl mx-auto">
        <p className="text-emerald-300 text-sm leading-relaxed">
          "যিনি কোনো নেক কাজের দিকে পথ দেখান, তিনি সেই কাজ সম্পাদনকারীর সমান সওয়াব পান।" <br/>
          <span className="text-amber-500 font-bold mt-2 inline-block">— সহীহ মুসলিম</span>
        </p>
      </div>
    </div>
  );
};

export default HadithSection;
