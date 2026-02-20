
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const start = new Date(2026, 1, 19);
      const end = new Date(2026, 2, 20);
      
      if (now < start) return setProgress(0);
      if (now > end) return setProgress(100);
      
      const total = end.getTime() - start.getTime();
      const current = now.getTime() - start.getTime();
      setProgress((current / total) * 100);
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 3600000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: 'সময়সূচী', path: '/times' },
    { name: 'কুরআন', path: '/quran' },
    { name: 'হাদিস', path: '/hadith' },
    { name: 'তসবীহ', path: '/tasbih' },
    { name: 'যাকাত', path: '/zakat' },
    { name: 'সালাত', path: '/salat' },
    { name: 'এআই সহকারী', path: '/assistant' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="container mx-auto px-2 sm:px-4">
        <div className={`relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border transition-all duration-500 ${
          scrolled 
            ? 'bg-emerald-950/80 backdrop-blur-2xl border-emerald-800/50 shadow-2xl' 
            : 'bg-emerald-900/40 backdrop-blur-md border-emerald-800/30'
        }`}>
          <div className="flex justify-between items-center h-14 sm:h-16 px-4 sm:px-6 md:px-10">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 sm:gap-3 group shrink-0"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="relative">
                <motion.div 
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg sm:rounded-xl flex items-center justify-center text-emerald-950 shadow-lg"
                  whileHover={{ rotate: 12, scale: 1.1 }}
                >
                  <Moon className="w-5 h-5 sm:w-6 sm:h-6 fill-emerald-950/20" />
                </motion.div>
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-amber-300 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-lg font-black text-white tracking-tight leading-none group-hover:text-amber-400 transition-colors">রমজান গাইড</span>
                <span className="text-[7px] sm:text-[9px] font-bold text-amber-500/80 uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-0.5 sm:mt-1">Mubarak 2026</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 group ${
                    location.pathname === item.path 
                      ? 'text-amber-400' 
                      : 'text-emerald-100/70 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {location.pathname === item.path && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute inset-0 bg-emerald-800/50 border border-emerald-700/50 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-500 rounded-full group-hover:w-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-800/50 flex items-center justify-center text-emerald-100 hover:bg-emerald-700 transition-colors border border-emerald-700/50"
            >
              {isOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

          {/* Mobile Nav */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden border-t border-emerald-800/50 overflow-hidden"
              >
                <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-2 bg-emerald-950/50">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black uppercase tracking-widest transition-all ${
                        location.pathname === item.path 
                          ? 'bg-amber-500 text-emerald-950 shadow-lg' 
                          : 'text-emerald-100 hover:bg-emerald-800/50'
                      }`}
                    >
                      {item.name}
                      {location.pathname === item.path && <Sparkles className="w-4 h-4" />}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ramadan Progress Bar */}
          <div className="h-[2px] w-full bg-emerald-950/30 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
