
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DHAKA_SCHEDULE_2026, HADITHS, DISTRICTS } from '../constants';
import { motion } from 'motion/react';

const Home: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS.find(d => d.id === 'dhaka') || DISTRICTS[0]);
  const [todayData, setTodayData] = useState({
    ramadanDay: '০১',
    dateStr: '১৮ ফেব্রুয়ারি, ২০২৬',
    dayName: 'বুধবার',
    sahari: '০৫:১৮',
    iftar: '০৫:৫৮',
    isIftarTime: false
  });

  const toBn = (n: number | string) => n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

  const formatTo12hWithOffset = (timeStr: string, offset: number) => {
    const [h, m] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(h);
    date.setMinutes(m + offset);
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    const displayH = hours % 12 || 12;
    return `${displayH.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const calculateToday = () => {
      const now = new Date();
      const startDate = new Date(2026, 1, 19); 
      const diffTime = now.getTime() - startDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      let dayIndex = diffDays >= 1 && diffDays <= 30 ? diffDays : 1;
      const scheduleItem = DHAKA_SCHEDULE_2026.find(item => item.ramadan === dayIndex) || DHAKA_SCHEDULE_2026[0];
      
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const formatter = new Intl.DateTimeFormat('bn-BD', options);
      const dayFormatter = new Intl.DateTimeFormat('bn-BD', { weekday: 'long' });
      
      const currentHour = now.getHours();
      const isEvening = currentHour >= 12;

      setTodayData({
        ramadanDay: toBn(dayIndex.toString().padStart(2, '0')),
        dateStr: formatter.format(now),
        dayName: dayFormatter.format(now),
        sahari: toBn(formatTo12hWithOffset(scheduleItem.sahari, selectedDistrict.sahariOffset)),
        iftar: toBn(formatTo12hWithOffset(scheduleItem.iftar, selectedDistrict.iftarOffset)),
        isIftarTime: isEvening
      });
    };

    calculateToday();
    const interval = setInterval(calculateToday, 60000);
    return () => clearInterval(interval);
  }, [selectedDistrict]);

  const featuredHadith = HADITHS[0];

  const quickLinks = [
    { 
      name: 'রমজান হাদিস', 
      path: '/hadith', 
      iconUrl: 'https://img.icons8.com/fluency/512/literature.png', 
      fallback: '📚'
    },
    { 
      name: 'সাহরি ও ইফতার', 
      path: '/times', 
      iconUrl: 'https://img.icons8.com/fluency/512/dates.png', 
      fallback: '🥗'
    },
    { 
      name: 'বাংলা কুরআন', 
      path: '/quran', 
      iconUrl: 'https://img.icons8.com/fluency/512/quran.png', 
      fallback: '📖'
    },
    { 
      name: 'তসবীহ কাউন্টার', 
      path: '/tasbih', 
      iconUrl: 'https://img.icons8.com/fluency/512/beads.png', 
      fallback: '📿'
    },
    { 
      name: 'সালাত শিক্ষা', 
      path: '/salat', 
      iconUrl: 'https://img.icons8.com/fluency/512/pray.png', 
      fallback: '🤲'
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 md:space-y-16 pb-12 sm:pb-16 md:pb-24 animate-in fade-in duration-1000 px-2 sm:px-4">
      
      {/* 1. Elegant Hero Section */}
      <section className="relative rounded-xl sm:rounded-[2rem] md:rounded-[5rem] overflow-hidden border border-emerald-800/30 shadow-2xl min-h-[380px] sm:min-h-[450px] md:min-h-[650px] flex items-center justify-center text-center px-3 sm:px-4 md:px-6 group bg-[#022c22]">
        {/* Background Image - High Visibility Implementation */}
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src="https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Ramadan Background" 
            className="w-full h-full object-cover opacity-90 transition-transform duration-[10s] group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Lighter Overlay for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#022c22]/80 via-[#022c22]/30 to-[#022c22]/90"></div>
        </div>

        {/* Decorative Art Pattern */}
        <div className="absolute inset-0 z-[1] opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')] grayscale invert pointer-events-none"></div>
        
        {/* Floating Glows */}
        <div className="absolute top-1/4 left-1/4 z-[2] w-64 h-64 bg-amber-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 z-[2] w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px] animate-pulse [animation-delay:2s] pointer-events-none"></div>

        <motion.div 
          className="relative z-10 space-y-6 sm:space-y-8 md:space-y-10 max-w-5xl px-2 sm:px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Top Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 bg-emerald-900/40 backdrop-blur-xl border border-emerald-700/30 px-8 py-2.5 rounded-full shadow-lg">
              <span className="text-amber-500 animate-bounce">🌙</span>
              <span className="text-emerald-100/90 text-[11px] font-black tracking-[0.4em] uppercase">
                রামাদানুল মুবারক ২০২৬
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] sm:leading-[1.2] md:leading-[1.1] tracking-tight drop-shadow-2xl">
              আধ্যাত্মিকতার পথে <br className="hidden sm:block"/>
              <span className="relative inline-block mt-2 md:mt-0">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600">
                  আপনার ডিজিটাল সঙ্গী
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-amber-500/20 rounded-full blur-sm"></span>
              </span>
            </h1>
          </div>

          {/* Quote */}
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute -top-6 -left-4 text-6xl text-amber-500/10 font-serif">"</div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-emerald-100/80 font-medium leading-relaxed italic">
              হে মুমিনগণ! তোমাদের ওপর রোজা ফরজ করা হয়েছে, যেমন ফরজ করা হয়েছিল তোমাদের পূর্ববর্তীদের ওপর।
            </p>
            <div className="absolute -bottom-10 -right-4 text-6xl text-amber-500/10 font-serif">"</div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 pt-6 sm:pt-8">
            <Link 
              to="/times" 
              className="w-full sm:w-auto relative group/btn overflow-hidden bg-amber-500 text-emerald-950 font-black py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 rounded-xl sm:rounded-2xl flex items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base hover:bg-amber-400 transition-all shadow-[0_20px_50px_rgba(245,158,11,0.2)] hover:shadow-amber-500/40"
            >
              <span className="relative z-10 flex items-center gap-3">
                সময়সূচী দেখুন 
                <svg className="w-6 h-6 group-hover/btn:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            </Link>

            <Link 
              to="/assistant" 
              className="w-full sm:w-auto bg-emerald-900/30 backdrop-blur-xl text-white border border-emerald-700/40 font-black py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 rounded-xl sm:rounded-2xl flex items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base hover:bg-emerald-800/50 transition-all shadow-xl group/ai"
            >
              এআই সহকারী
              <div className="relative">
                <svg className="w-6 h-6 text-emerald-400 group-hover/ai:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
              </div>
            </Link>
          </div>
        </motion.div>
        
        {/* Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-800/50 to-transparent"></div>
      </section>

      {/* 2. Today's Stats Widget - Reimagined */}
      <section className="bg-emerald-950/40 backdrop-blur-3xl border border-emerald-800/50 rounded-xl sm:rounded-[2rem] md:rounded-[3.5rem] p-5 sm:p-8 md:p-12 lg:p-14 shadow-2xl relative overflow-hidden group hover:border-emerald-700/50 transition-all duration-500 mx-2 sm:mx-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 -mr-32 -mt-32 rounded-full blur-[100px]"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center relative z-10">
          
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
              <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${todayData.isIftarTime ? 'bg-amber-500' : 'bg-emerald-400'} animate-ping`}></span>
              <div className="text-amber-500 text-xs sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em]">
                {todayData.isIftarTime ? 'ইফতারের পবিত্র সময়' : 'বরকতময় সাহরির সময়'}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-5 md:gap-6">
              <motion.span 
                className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                animate={{ 
                  scale: [1, 1.05, 1],
                  textShadow: ["0 0 0px rgba(251, 191, 36, 0)", "0 0 20px rgba(251, 191, 36, 0.3)", "0 0 0px rgba(251, 191, 36, 0)"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {todayData.ramadanDay}
              </motion.span>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-500">রমজান</span>
                <span className="text-emerald-300 font-bold text-xs sm:text-sm md:text-base opacity-70 mt-1">{todayData.dayName}, {todayData.dateStr}</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1 h-40 border-r border-emerald-800/60 mx-auto"></div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 md:gap-6">
            <div className="bg-emerald-900/30 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-[2rem] md:rounded-[3rem] border border-emerald-800/50 flex flex-col items-center justify-center relative hover:bg-emerald-800/40 transition-all group/card shadow-lg">
              <span className="text-emerald-500 text-[9px] sm:text-[10px] font-black uppercase block mb-3 sm:mb-4 md:mb-6 tracking-[0.3em] sm:tracking-[0.4em] opacity-60">সাহরির শেষ</span>
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter group-hover/card:scale-105 transition-transform">{todayData.sahari}</span>
                <span className="text-emerald-400 font-bold text-xs sm:text-sm uppercase">ভোর</span>
              </div>
            </div>
            <div className="bg-emerald-900/30 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-[2rem] md:rounded-[3rem] border border-amber-500/20 flex flex-col items-center justify-center relative hover:bg-emerald-800/40 transition-all group/card shadow-lg">
              <span className="text-amber-500 text-[9px] sm:text-[10px] font-black uppercase block mb-3 sm:mb-4 md:mb-6 tracking-[0.3em] sm:tracking-[0.4em] opacity-80">ইফতার শুরু</span>
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-amber-500 tracking-tighter group-hover/card:scale-105 transition-transform">{todayData.iftar}</span>
                <span className="text-slate-300 font-bold text-xs sm:text-sm uppercase">সন্ধ্যা</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-emerald-800/30 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 text-emerald-400 text-xs sm:text-sm font-semibold">
            <div className="p-2 bg-emerald-900/50 rounded-lg">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* Fixed redundant </path> closing tag as <path /> is self-closing */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <span>বর্তমানে <span className="text-amber-400 font-black">{selectedDistrict.name}</span> জেলার সময় দেখানো হচ্ছে</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 bg-emerald-900/40 p-1 sm:p-1.5 rounded-lg sm:rounded-2xl border border-emerald-800/50">
            <span className="pl-2 sm:pl-4 text-[9px] sm:text-[10px] text-slate-500 font-black uppercase tracking-widest">জেলা:</span>
            <select 
              value={selectedDistrict.id}
              onChange={(e) => setSelectedDistrict(DISTRICTS.find(d => d.id === e.target.value) || DISTRICTS[0])}
              className="bg-emerald-950 text-emerald-100 rounded-lg sm:rounded-xl px-3 sm:px-5 py-2 sm:py-2.5 text-xs font-black focus:outline-none ring-1 ring-emerald-800 focus:ring-amber-500 transition-all cursor-pointer appearance-none min-w-[120px] sm:min-w-[140px]"
            >
              {DISTRICTS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 3. Quick Menu Grid - Visual Overhaul */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {quickLinks.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Link 
              to={item.path} 
              className="group h-40 sm:h-48 md:h-56 lg:h-64 rounded-xl sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3.5rem] border border-emerald-800/40 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 transition-all hover:-translate-y-2 bg-emerald-900/20 hover:bg-emerald-800/30 hover:border-amber-500/30 shadow-2xl backdrop-blur-lg relative overflow-hidden"
            >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-emerald-950/80 rounded-xl sm:rounded-[1.75rem] md:rounded-[2rem] lg:rounded-[2.5rem] flex items-center justify-center shadow-inner border border-emerald-800 group-hover:border-amber-500/20 transition-all relative z-10 mb-4 sm:mb-5 md:mb-6">
              <img 
                src={item.iconUrl} 
                alt={item.name} 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain group-hover:scale-125 transition-all duration-700" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fb = e.currentTarget.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                  if (fb) fb.classList.remove('hidden');
                }}
              />
              <span className="fallback-icon hidden text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{item.fallback}</span>
            </div>
            <h3 className="text-white font-black text-xs sm:text-sm md:text-base lg:text-lg tracking-tight group-hover:text-amber-400 transition-colors text-center relative z-10">{item.name}</h3>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* 4. Extra Quote Section - Minimal & Deep */}
      <div className="py-16 flex flex-col items-center text-center space-y-8 relative">
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent rounded-full"></div>
        <div className="relative">
          <span className="absolute -top-10 -left-10 text-8xl text-emerald-800/20 font-serif">"</span>
          <p className="text-2xl md:text-4xl text-slate-100 font-bold max-w-4xl leading-relaxed px-4">
            রোজার মূল উদ্দেশ্য হলো মানুষের মনে তাকওয়া বা আল্লাহভীতি সৃষ্টি করা।
          </p>
          <span className="absolute -bottom-16 -right-10 text-8xl text-emerald-800/20 font-serif">"</span>
        </div>
        <div className="pt-4 flex items-center gap-4">
           <div className="h-px w-8 bg-emerald-800"></div>
           <p className="text-amber-500 font-black text-xs uppercase tracking-[0.5em]">আল কুরআন</p>
           <div className="h-px w-8 bg-emerald-800"></div>
        </div>
      </div>

      {/* 5. Quran Education & Zakat - Premium Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-emerald-950/60 backdrop-blur-2xl border border-emerald-800/50 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-14 flex flex-col justify-between hover:border-amber-500/30 transition-all shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <div className="p-2.5 md:p-3 bg-emerald-900/50 rounded-2xl border border-emerald-800">
                <span className="text-xl md:text-2xl">📖</span>
              </div>
              <h2 className="text-amber-500 font-black text-lg md:text-xl tracking-tight">কুরআন থেকে শিক্ষা</h2>
            </div>
            <div className="space-y-6 md:space-y-8">
              <p className="arabic text-4xl sm:text-5xl md:text-6xl text-right text-emerald-50/90 leading-relaxed" dir="rtl">فَإِنَّ مَعَ الْعُسْرِ يُسْرًا</p>
              
              <div className="bg-emerald-900/50 p-4 rounded-xl border border-amber-500/10">
                <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1">উচ্চারণ (পড়ুন):</p>
                <p className="text-amber-400 font-bold text-base md:text-lg leading-relaxed">ফাইন্না মা'আল উসরি ইউসরা</p>
              </div>

              <div className="space-y-3">
                <p className="text-xl sm:text-2xl md:text-3xl text-white font-black leading-relaxed">"নিশ্চয়ই কষ্টের সাথেই স্বস্তি রয়েছে"</p>
                <div className="inline-flex items-center gap-3 text-emerald-500 font-black text-[9px] md:text-[10px] uppercase tracking-widest bg-emerald-950 px-4 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  সূরা আশ-শারহ, আয়াত ৫
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 md:mt-14 relative z-10">
            <Link to="/quran" className="inline-flex items-center gap-3 text-amber-500 font-black hover:text-amber-400 transition-colors text-xs md:text-sm uppercase tracking-widest">
              কুরআন পড়ুন <span className="text-xl">→</span>
            </Link>
          </div>
        </div>

        <div className="bg-emerald-950/60 backdrop-blur-2xl border border-emerald-800/50 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-14 flex flex-col justify-between hover:border-amber-500/30 transition-all shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <div className="p-2.5 md:p-3 bg-emerald-900/50 rounded-2xl border border-emerald-800">
                <span className="text-xl md:text-2xl">💰</span>
              </div>
              <h2 className="text-amber-500 font-black text-lg md:text-xl tracking-tight">যাকাত ও সাদাকাহ</h2>
            </div>
            <p className="text-emerald-100/60 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-md">
              যাকাত ইসলামের পঞ্চস্তম্ভের একটি। এটি আপনার সম্পদকে পবিত্র করে এবং দরিদ্র মানুষের অধিকার রক্ষা করে। আজই আপনার সম্পদের সঠিক হিসাব করুন।
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Link to="/zakat" className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-700 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl text-xs md:text-sm uppercase tracking-widest text-center">
                ক্যালকুলেটর
              </Link>
              <div className="w-full sm:w-auto bg-amber-500/5 border border-amber-500/20 px-6 py-4 rounded-3xl backdrop-blur-md text-center sm:text-left">
                <span className="text-amber-500 font-black text-[10px] md:text-[11px] tracking-widest uppercase block mb-1">যাকাত নেসাব ২০২৬</span>
                <span className="text-white font-bold text-sm">৫২.৫ তোলা রূপা</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Featured Hadith Section - Atmospheric */}
      <section className="bg-emerald-900/10 border border-emerald-800/40 p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/5 to-transparent"></div>
        <div className="relative z-10 space-y-8 md:space-y-10">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="h-px flex-grow bg-emerald-800/60"></div>
            <h2 className="text-amber-500 font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[9px] md:text-[11px] bg-emerald-950 px-4 md:px-6 py-2 rounded-full border border-emerald-800 text-center">আজকের নির্বাচিত হাদিস</h2>
            <div className="h-px flex-grow bg-emerald-800/60"></div>
          </div>
          <p className="arabic text-3xl sm:text-4xl md:text-6xl text-center text-emerald-100 leading-[1.8] drop-shadow-md" dir="rtl">{featuredHadith.arabic}</p>
          
          {/* Added Bengali Pronunciation below Arabic */}
          <div className="bg-emerald-950/50 p-5 md:p-6 rounded-2xl border border-amber-500/10 max-w-3xl mx-auto">
            <p className="text-amber-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-2 text-center">উচ্চারণ (পড়ুন):</p>
            <p className="text-amber-400 font-bold text-base sm:text-lg md:text-xl leading-relaxed text-center">{featuredHadith.pronunciation}</p>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-bold leading-relaxed italic opacity-90">"{featuredHadith.bangla}"</p>
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <div className="w-8 md:w-10 h-px bg-amber-500/40"></div>
              <p className="text-amber-500 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em]">{featuredHadith.reference}</p>
              <div className="w-8 md:w-10 h-px bg-amber-500/40"></div>
            </div>
          </div>
          <div className="text-center pt-6 md:pt-8">
            <Link to="/hadith" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-900/40 border border-emerald-800 text-emerald-400 hover:text-amber-400 font-black py-4 px-8 md:px-10 rounded-2xl text-[10px] md:text-xs transition-all uppercase tracking-widest">
              আরও হাদিস পড়ুন <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. AI Assistant CTA (AMBER SECTION - VIBRANT) */}
      <section className="bg-amber-500 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 shadow-[0_35px_60px_-15px_rgba(251,191,36,0.3)] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12 group">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')] opacity-10 pointer-events-none"></div>
        <div className="relative z-10 space-y-6 md:space-y-8 max-w-2xl text-center lg:text-left">
          <div className="inline-block bg-emerald-950/10 text-emerald-950 border border-emerald-950/20 px-6 py-1.5 rounded-full text-[9px] md:text-[10px] font-black tracking-widest uppercase mb-2">
            AI Powered Support
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-emerald-950 leading-tight">রমজান নিয়ে <br className="hidden sm:block"/>কোনো প্রশ্ন আছে?</h2>
          <p className="text-emerald-900 font-bold text-base sm:text-lg md:text-xl opacity-80 leading-relaxed">
            আমাদের এআই সহকারীর সাথে সরাসরি কথা বলুন। মাসয়ালা-মাসায়েল থেকে শুরু করে যেকোনো তথ্য মুহূর্তেই জেনে নিন।
          </p>
          <Link 
            to="/assistant" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-emerald-950 text-white font-black py-4 md:py-5 px-10 md:px-12 rounded-[1.5rem] md:rounded-[2rem] hover:bg-emerald-900 transition-all shadow-2xl group/btn"
          >
            সহকারীর সাথে কথা বলুন 
            <span className="bg-amber-500 text-emerald-950 rounded-full p-1 group-hover/btn:translate-x-2 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </span>
          </Link>
        </div>
        <div className="relative shrink-0 flex items-center justify-center">
          <div className="absolute w-48 h-48 sm:w-72 sm:h-72 bg-emerald-950/5 rounded-full blur-[50px] animate-pulse"></div>
          <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-emerald-950/10 rounded-[2.5rem] md:rounded-[4rem] flex items-center justify-center border border-emerald-950/20 backdrop-blur-sm relative group-hover:rotate-6 transition-transform duration-700">
             <img 
               src="https://img.icons8.com/fluency/512/crescent-moon.png" 
               alt="Moon" 
               className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-bounce [animation-duration:5s]"
             />
          </div>
        </div>
      </section>
      
      {/* Footer Quote */}
      <div className="text-center pb-20 relative z-10">
        <p className="text-amber-500 font-black text-sm uppercase tracking-[0.8em] mb-4 drop-shadow-sm">Ramadan Kareem</p>
        <p className="text-emerald-100/60 text-sm italic">"আপনার ইবাদত কবুল হোক, আমীন।"</p>
      </div>
    </div>
  );
};

export default Home;
