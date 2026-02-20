
import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Facebook, Mail, Phone, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'হোম', path: '/' },
    { name: 'সময়সূচী', path: '/times' },
    { name: 'কুরআন', path: '/quran' },
    { name: 'হাদিস', path: '/hadith' },
  ];

  const tools = [
    { name: 'তসবীহ কাউন্টার', path: '/tasbih' },
    { name: 'যাকাত ক্যালকুলেটর', path: '/zakat' },
    { name: 'এআই সহকারী', path: '/assistant' },
  ];

  return (
    <footer className="bg-emerald-950 border-t border-emerald-800/50 pt-12 sm:pt-16 md:pt-20 pb-4 sm:pb-6 relative overflow-hidden z-10">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-1 sm:px-0">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <motion.div 
                  className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-950 shadow-xl"
                  whileHover={{ rotate: 12, scale: 1.1 }}
                >
                  <Moon className="w-7 h-7 md:w-8 md:h-8 fill-emerald-950/20" />
                </motion.div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 text-amber-300 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black text-white tracking-tight leading-none group-hover:text-amber-400 transition-colors">রমজান গাইড</span>
                <span className="text-[10px] md:text-[11px] font-bold text-amber-500 uppercase tracking-[0.3em] mt-1">Mubarak 2026</span>
              </div>
            </Link>
            <p className="text-emerald-100/60 text-sm leading-relaxed">
              পবিত্র রমজান মাসের পূর্ণাঙ্গ গাইড। আমরা চেষ্টা করছি আপনাকে সঠিক সময়সূচী, কুরআন ও হাদিসের জ্ঞান এবং প্রয়োজনীয় ডিজিটাল টুলস দিয়ে সহায়তা করতে।
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/md.rafsan7120" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-emerald-900/50 border border-emerald-800 flex items-center justify-center text-emerald-400 hover:bg-amber-500 hover:text-emerald-950 hover:border-amber-500 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="mailto:rafsanzanirizon539@gmail.com" className="w-10 h-10 rounded-xl bg-emerald-900/50 border border-emerald-800 flex items-center justify-center text-emerald-400 hover:bg-amber-500 hover:text-emerald-950 hover:border-amber-500 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              প্রয়োজনীয় লিঙ্ক
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-emerald-100/60 hover:text-amber-400 text-sm flex items-center gap-2 transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 text-emerald-800 group-hover:text-amber-500 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              ডিজিটাল টুলস
            </h3>
            <ul className="space-y-4">
              {tools.map((tool) => (
                <li key={tool.path}>
                  <Link 
                    to={tool.path} 
                    className="text-emerald-100/60 hover:text-amber-400 text-sm flex items-center gap-2 transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 text-emerald-800 group-hover:text-amber-500 transition-colors" />
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              যোগাযোগ ও তথ্য
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-emerald-100/60">ঢাকা, বাংলাদেশ (ইসলামিক ফাউন্ডেশন অনুমোদিত সময়সূচী অনুযায়ী)</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-emerald-100/60">০১৩০৮০৭৮৫৩৫</p>
              </div>
              <div className="bg-emerald-900/30 border border-emerald-800/50 p-4 rounded-2xl mt-4">
                <div className="flex items-center gap-2 text-amber-500 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">বিশেষ দ্রষ্টব্য</span>
                </div>
                <p className="text-[11px] text-emerald-400/80 leading-relaxed">
                  চাঁদ দেখার ওপর ভিত্তি করে রমজানের তারিখ ১ দিন পরিবর্তন হতে পারে।
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
