
import React, { useState, useEffect } from 'react';
import { DISTRICTS, DHAKA_SCHEDULE_2026 } from '../constants';
import { DailyTime } from '../types';
import { motion } from 'motion/react';
import { MapPin, Clock, Calendar, ChevronRight, Sparkles, Moon } from 'lucide-react';

const RamadanTimes: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS[0]);
  const [schedule, setSchedule] = useState<DailyTime[]>([]);

  const toBn = (n: number | string) => n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

  useEffect(() => {
    const adjusted = DHAKA_SCHEDULE_2026.map(day => {
      const adjustTime = (timeStr: string, offset: number) => {
        const [h, m] = timeStr.split(':').map(Number);
        let date = new Date();
        date.setHours(h);
        date.setMinutes(m + offset);
        
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        
        return toBn(`${displayHours.toString().padStart(2, '0')}:${displayMinutes}`);
      };

      return {
        ...day,
        sahari: adjustTime(day.sahari, selectedDistrict.sahariOffset),
        iftar: adjustTime(day.iftar, selectedDistrict.iftarOffset)
      };
    });
    setSchedule(adjusted);
  }, [selectedDistrict]);

  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12 pb-16 sm:pb-20 md:pb-24 px-2 sm:px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3 sm:space-y-4"
      >
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span className="text-amber-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Ramadan Schedule 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tighter">
          সাহরি ও ইফতারের <span className="gold-text serif-display italic">সময়সূচী</span>
        </h1>
        <p className="text-emerald-100/60 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
          ইসলামিক ফাউন্ডেশনের তথ্য অনুযায়ী ২০২৬ সালের পূর্ণাঙ্গ রমজান ক্যালেন্ডার। আপনার জেলা নির্বাচন করে সঠিক সময় জেনে নিন।
        </p>
      </motion.div>

      <div className="flex justify-center px-4">
        <div className="relative group w-full max-w-md">
          <div className="absolute inset-0 bg-amber-500 blur-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative flex items-center gap-2 sm:gap-3 bg-emerald-900/40 backdrop-blur-xl border border-white/10 p-2 rounded-2xl">
            <div className="pl-3 sm:pl-4 flex items-center gap-2 text-emerald-400 shrink-0">
              <MapPin className="w-4 h-4" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">জেলা:</span>
            </div>
            <select 
              value={selectedDistrict.id}
              onChange={(e) => setSelectedDistrict(DISTRICTS.find(d => d.id === e.target.value) || DISTRICTS[0])}
              className="bg-emerald-950 text-white rounded-xl px-4 sm:px-6 py-3 w-full focus:outline-none focus:ring-1 focus:ring-amber-500 font-bold text-xs sm:text-sm cursor-pointer appearance-none"
            >
              {DISTRICTS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <div className="pr-3 sm:pr-4 pointer-events-none text-amber-500 shrink-0">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="premium-card rounded-[2rem] md:rounded-[3rem] overflow-hidden mx-4"
      >
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-0">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-4 md:px-8 py-4 md:py-6 text-amber-500 font-black uppercase text-xs md:text-sm tracking-[0.2em]">রমজান</th>
                <th className="px-4 md:px-8 py-4 md:py-6 text-emerald-100/80 font-black uppercase text-xs md:text-sm tracking-[0.2em]">তারিখ ও বার</th>
                <th className="px-4 md:px-8 py-4 md:py-6 text-emerald-100/80 font-black uppercase text-xs md:text-sm tracking-[0.2em]">
                  <div className="flex items-center gap-2"><Clock className="w-3 h-3 md:w-4 md:h-4 text-amber-500/50" /> সাহরির শেষ</div>
                </th>
                <th className="px-4 md:px-8 py-4 md:py-6 text-emerald-100/80 font-black uppercase text-xs md:text-sm tracking-[0.2em] text-right">
                  <div className="flex items-center justify-end gap-2"><Moon className="w-3 h-3 md:w-4 md:h-4 text-amber-500/50" /> ইফতার শুরু</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {schedule.map((day) => (
                <tr 
                  key={day.ramadan} 
                  className={`group transition-all hover:bg-white/5 ${day.ramadan === 1 ? 'bg-amber-500/5' : ''}`}
                >
                  <td className="px-4 md:px-8 py-4 md:py-6">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-950 border border-white/10 flex items-center justify-center text-amber-500 font-black text-sm md:text-base group-hover:border-amber-500/30 transition-all shadow-lg">
                        {toBn(day.ramadan)}
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-emerald-100/60 uppercase tracking-widest">রমজান</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-8 py-4 md:py-6">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-amber-500/40" />
                      <span className="text-white font-bold text-sm md:text-lg whitespace-nowrap">{day.date}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-8 py-4 md:py-6">
                    <div className="flex items-baseline gap-1 md:gap-2">
                      <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">{day.sahari}</span>
                      <span className="text-[10px] md:text-xs font-bold text-emerald-500 uppercase tracking-widest">ভোর</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-8 py-4 md:py-6 text-right">
                    <div className="flex items-baseline justify-end gap-1 md:gap-2">
                      <span className="text-2xl md:text-3xl font-black text-amber-500 tracking-tighter">{day.iftar}</span>
                      <span className="text-[10px] md:text-xs font-bold text-amber-500/60 uppercase tracking-widest">সন্ধ্যা</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      <div className="premium-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group mx-4">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <div className="space-y-2">
            <p className="text-emerald-100/80 text-sm md:text-base font-medium leading-relaxed italic">
              * ২০২৬ সালের রমজান শুরুর তারিখ চাঁদ দেখার ওপর নির্ভর করে পরিবর্তিত হতে পারে। <br className="hidden md:block"/>
              এই সময়সূচী ইসলামিক ফাউন্ডেশনের তথ্য এবং ২০২৬ সালের সম্ভাব্য ক্যালেন্ডার অনুযায়ী নিখুঁতভাবে তৈরি।
            </p>
            <p className="text-amber-500/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">সর্বশেষ আপডেট: ফেব্রুয়ারি ২০২৬</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RamadanTimes;
