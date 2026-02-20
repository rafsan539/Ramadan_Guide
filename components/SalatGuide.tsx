
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronRight, ChevronLeft, Info, BookOpen, CheckCircle2 } from 'lucide-react';

interface SalatStep {
  id: number;
  title: string;
  arabic: string;
  instruction: string;
  details: string[];
}

const SALAT_STEPS: SalatStep[] = [
  {
    id: 1,
    title: "🤲 নিয়ত ও তাকবীরে তাহরীমা",
    arabic: "اللَّهُ أَكْبَرُ",
    instruction: "উভয় হাত কান পর্যন্ত উঠিয়ে 'আল্লাহু আকবার' বলে হাত বাঁধা।",
    details: [
      "নামাজের জন্য কিবলামুখী হয়ে দাঁড়ান।",
      "মনে মনে কোন ওয়াক্তের নামাজ পড়ছেন তার নিয়ত করুন।",
      "পুরুষরা উভয় হাত কান পর্যন্ত এবং মহিলারা কাঁধ পর্যন্ত উঠাবেন।",
      "বৃদ্ধাঙ্গুলি কানের লতি স্পর্শ করবে (পুরুষদের জন্য)।"
    ]
  },
  {
    id: 2,
    title: "🧍 কিয়াম (দাঁড়ানো অবস্থা)",
    arabic: "سُবْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ...",
    instruction: "নাভির নিচে (পুরুষ) বা বুকের ওপর (মহিলা) হাত বেঁধে সানা, সূরা ফাতিহা ও অন্য একটি সূরা পড়া।",
    details: [
      "দৃষ্টি সিজদার জায়গায় রাখুন।",
      "প্রথমে সানা পড়ুন।",
      "এরপর আউযুবিল্লাহ ও বিসমিল্লাহ পড়ে সূরা ফাতিহা পড়ুন।",
      "ফাতিহা শেষে অন্য একটি সূরা বা অন্তত ৩টি ছোট আয়াত পড়ুন।"
    ]
  },
  {
    id: 3,
    title: "🙇 রুকু (অবনত হওয়া)",
    arabic: "سُবْحَانَ رَبِّيَ الْعَظِيمِ",
    instruction: "'আল্লাহু আকবার' বলে মাথা নিচু করে দুই হাত দিয়ে হাঁটু ধরা।",
    details: [
      "পিঠ ও মাথা এক সমান্তরালে থাকবে।",
      "হাতের আঙুলগুলো ফাঁক করে হাঁটু শক্ত করে ধরুন।",
      "কমপক্ষে ৩ বার 'সুবহানা রাব্বিয়াল আজিম' পড়ুন।"
    ]
  },
  {
    id: 4,
    title: "🧍 কওমা (রুকু থেকে দাঁড়ানো)",
    arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
    instruction: "রুকু থেকে সোজা হয়ে দাঁড়িয়ে 'সামিআল্লাহু লিমান হামিদাহ' বলা।",
    details: [
      "সোজা হয়ে দাঁড়িয়ে 'রাব্বানা লাকাল হামদ' বলুন।",
      "শরীরের প্রতিটি অঙ্গ স্থির হওয়া পর্যন্ত অপেক্ষা করুন।",
      "এটি নামাজের একটি গুরুত্বপূর্ণ ওয়াজিব কাজ।"
    ]
  },
  {
    id: 5,
    title: "🙇‍♂️ সিজদাহ (প্রথম সিজদাহ)",
    arabic: "سُবْحَانَ رَبِّيَ الْأَعْلَى",
    instruction: "'আল্লাহু আকবার' বলে মাটিতে কপাল, নাক, দুই হাত, হাঁটু ও পায়ের আঙুল রাখা।",
    details: [
      "প্রথমে হাঁটু, তারপর হাত, তারপর নাক ও সবশেষে কপাল মাটিতে রাখুন।",
      "পায়ের আঙুলগুলো কিবলার দিকে মুড়িয়ে রাখুন।",
      "কমপক্ষে ৩ বার 'সুবহানা রাব্বিয়াল আলা' পড়ুন।"
    ]
  },
  {
    id: 6,
    title: "🧎 জলসা (দুই সিজদার মাঝে বসা)",
    arabic: "اللَّهُمَّ اغْفِرْ لِي",
    instruction: "প্রথম সিজদাহ থেকে উঠে সোজা হয়ে বসা।",
    details: [
      "বাম পায়ের ওপর বসুন এবং ডান পা খাড়া করে রাখুন।",
      "দুই হাত হাঁটুর ওপর স্বাভাবিকভাবে রাখুন।",
      "এই সময় 'আল্লাহুম্মাগফিরলী' দোয়াটি পড়া সুন্নাত।"
    ]
  },
  {
    id: 7,
    title: "🧎 তাশাহহুদ ও শেষ বৈঠক",
    arabic: "التَّحِيَّاتُ لِلَّهِ...",
    instruction: "শেষ রাকাতে সিজদাহ শেষে বসে আত্তাহিয়াতু, দরুদ ও দোয়া মাসুরা পড়া।",
    details: [
      "আত্তাহিয়াতু পড়ার সময় 'আশহাদু আল্লা ইলাহা' বলার সময় শাহাদাত আঙুল তুলুন।",
      "এরপর দরুদে ইব্রাহিম পড়ুন।",
      "সবশেষে দোয়া মাসুরা পড়ে সালামের প্রস্তুতি নিন।"
    ]
  },
  {
    id: 8,
    title: "👋 সালাম (নামাজ শেষ করা)",
    arabic: "السَّلَامُ عَلَيْكُمْ وَরَحْمَةُ اللَّهِ",
    instruction: "প্রথমে ডানে এবং পরে বামে মুখ ফিরিয়ে সালাম দেওয়া।",
    details: [
      "ডান দিকে মুখ ফিরিয়ে বলুন 'আসসালামু আলাইকুম ওয়া রহমাতুল্লাহ'।",
      "এরপর বাম দিকে মুখ ফিরিয়ে একইভাবে সালাম দিন।",
      "সালামের মাধ্যমে আপনার নামাজ সম্পন্ন হলো।"
    ]
  }
];

const SalatGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < SALAT_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-12 pb-24 px-4">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1 rounded-full">
          <BookOpen className="w-3 h-3 text-emerald-500" />
          <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Salat Learning Guide</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
          সহজ পদ্ধতিতে <span className="text-amber-500 italic">সালাত শিক্ষা</span>
        </h1>
        <p className="text-emerald-100/60 text-lg max-w-2xl mx-auto">
          নামাজের প্রতিটি ধাপের সঠিক নিয়ম ও দোয়া। ইসলামের দ্বিতীয় স্তম্ভ সালাত সঠিকভাবে আদায়ের পূর্ণাঙ্গ গাইড।
        </p>
      </motion.div>

      {/* Main Guide Interface */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Step List (Desktop & Mobile) */}
        <div className="lg:col-span-4 space-y-3 order-2 lg:order-1">
          <div className="flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible scrollbar-hide">
            {SALAT_STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(idx)}
                className={`flex-shrink-0 lg:w-full text-left p-4 lg:p-5 rounded-2xl border transition-all flex items-center gap-4 group ${
                  currentStep === idx 
                    ? 'bg-amber-500 border-amber-400 text-emerald-950 shadow-lg shadow-amber-500/20' 
                    : 'bg-emerald-900/20 border-emerald-800/50 text-emerald-100/60 hover:bg-emerald-800/30'
                }`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                  currentStep === idx ? 'bg-emerald-950 text-amber-500' : 'bg-emerald-950 text-emerald-500'
                }`}>
                  {idx + 1}
                </span>
                <span className="font-bold text-sm whitespace-nowrap lg:whitespace-normal">{step.title}</span>
                {currentStep === idx && <ChevronRight className="hidden lg:block ml-auto w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active Step Detail */}
        <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-emerald-900/30 backdrop-blur-xl border border-emerald-800/50 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              {/* Content Section */}
              <div className="p-8 md:p-12 space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-amber-500 text-emerald-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">ধাপ {currentStep + 1}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white">{SALAT_STEPS[currentStep].title}</h2>
                </div>

                {/* Arabic & Instruction */}
                <div className="space-y-6">
                  <div className="bg-emerald-950/50 p-8 rounded-3xl border border-amber-500/10 text-center">
                    <p className="arabic text-4xl md:text-5xl text-amber-400 mb-4" dir="rtl">{SALAT_STEPS[currentStep].arabic}</p>
                    <p className="text-emerald-400 font-bold text-lg">{SALAT_STEPS[currentStep].instruction}</p>
                  </div>
                </div>

                {/* Detailed Rules */}
                <div className="space-y-6">
                  <h3 className="text-white font-black text-lg flex items-center gap-3">
                    <Info className="w-5 h-5 text-amber-500" />
                    পালনীয় নিয়মাবলী:
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {SALAT_STEPS[currentStep].details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-3 bg-emerald-950/30 p-4 rounded-2xl border border-emerald-800/30">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                        <p className="text-emerald-100/80 text-sm leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons (Mobile & Desktop) */}
                <div className="flex items-center justify-between pt-8 border-t border-emerald-800/50">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 text-emerald-400 font-bold hover:text-amber-400 disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" /> আগের ধাপ
                  </button>
                  <div className="text-emerald-800 font-black text-xs uppercase tracking-widest">
                    {currentStep + 1} / {SALAT_STEPS.length}
                  </div>
                  <button
                    onClick={nextStep}
                    disabled={currentStep === SALAT_STEPS.length - 1}
                    className="flex items-center gap-2 text-amber-500 font-bold hover:text-amber-400 disabled:opacity-30 transition-colors"
                  >
                    পরের ধাপ <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Tips */}
          <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-3xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-amber-500 font-black text-sm uppercase tracking-widest mb-1">বিশেষ টিপস</h4>
              <p className="text-emerald-100/60 text-sm leading-relaxed">
                নামাজের প্রতিটি রুকন বা ধাপ ধীরস্থিরভাবে আদায় করা ওয়াজিব। তাড়াহুড়ো করলে নামাজের সওয়াব কমে যায় এবং অনেক ক্ষেত্রে নামাজ নষ্ট হয়ে যেতে পারে।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-4xl mx-auto text-center bg-emerald-950/50 p-10 rounded-[3rem] border border-emerald-800/50 space-y-6">
        <h3 className="text-2xl font-black text-white">নামাজের প্রয়োজনীয় শর্তাবলী</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-amber-500 text-2xl">🚿</div>
            <p className="text-white font-bold text-sm">পবিত্রতা (ওজু)</p>
            <p className="text-emerald-100/40 text-xs">শরীর, কাপড় ও জায়গা পবিত্র হওয়া।</p>
          </div>
          <div className="space-y-2">
            <div className="text-amber-500 text-2xl">🕋</div>
            <p className="text-white font-bold text-sm">কিবলামুখী হওয়া</p>
            <p className="text-emerald-100/40 text-xs">পবিত্র কাবার দিকে মুখ করে দাঁড়ানো।</p>
          </div>
          <div className="space-y-2">
            <div className="text-amber-500 text-2xl">⏰</div>
            <p className="text-white font-bold text-sm">সঠিক সময়</p>
            <p className="text-emerald-100/40 text-xs">ওয়াক্ত অনুযায়ী নামাজ আদায় করা।</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalatGuide;
