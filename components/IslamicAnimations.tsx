
import React from 'react';
import { motion } from 'motion/react';

const IslamicAnimations: React.FC = () => {
  // Twinkling stars data
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));

  // Floating Ramadan elements
  const ramadanElements = [
    { icon: '🌙', label: 'রমজান' },
    { icon: '⭐', label: 'মুবারক' },
    { icon: '📿', label: 'তসবীহ' },
    { icon: '📖', label: 'কুরআন' },
  ];

  const floatingItems = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    ...ramadanElements[i % ramadanElements.length],
    left: `${Math.random() * 90 + 5}%`,
    duration: Math.random() * 20 + 25,
    delay: Math.random() * 15,
    size: Math.random() * 15 + 15,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-b from-[#0a0a1a] via-[#0f172a] to-[#022c22] opacity-30">
      {/* 1. Twinkling Stars Background */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.9)',
          }}
          animate={{
            opacity: [0.1, 1, 0.1],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 2. Floating Ramadan Symbols & Text */}
      {floatingItems.map((item) => (
        <motion.div
          key={`float-${item.id}`}
          className="absolute flex flex-col items-center gap-1 text-amber-500/20 select-none"
          style={{
            left: item.left,
            bottom: '-15%',
          }}
          animate={{
            y: ['0vh', '-130vh'],
            x: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
        >
          <span style={{ fontSize: item.size }}>{item.icon}</span>
          <span className="text-[10px] font-black tracking-widest uppercase opacity-60">{item.label}</span>
        </motion.div>
      ))}

      {/* 3. Central Stylized Illustration (Enhanced) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <motion.div 
          className="relative w-[320px] h-[320px] md:w-[550px] md:h-[550px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5 }}
        >
          {/* Large Glowing Crescent Moon */}
          <motion.div 
            className="absolute top-0 left-0 text-[220px] md:text-[400px] text-amber-400 drop-shadow-[0_0_50px_rgba(251,191,36,0.6)]"
            animate={{ 
              rotate: [-2, 2, -2],
              filter: ["drop-shadow(0 0 30px rgba(251,191,36,0.4))", "drop-shadow(0 0 60px rgba(251,191,36,0.7))", "drop-shadow(0 0 30px rgba(251,191,36,0.4))"]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            🌙
          </motion.div>

          {/* Animated Clouds */}
          <motion.div 
            className="absolute bottom-10 left-[-10%] text-7xl md:text-9xl opacity-70"
            animate={{ x: [-30, 30, -30] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            ☁️
          </motion.div>
          <motion.div 
            className="absolute bottom-24 right-[-10%] text-7xl md:text-9xl opacity-70"
            animate={{ x: [30, -30, 30] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          >
            ☁️
          </motion.div>

          {/* Ramadan Mubarak Text Floating */}
          <motion.div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-amber-400 font-black text-2xl md:text-4xl tracking-[0.3em] whitespace-nowrap"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            রমজান মুবারক
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#022c22]/80 to-transparent opacity-30"></div>
    </div>
  );
};

export default IslamicAnimations;
