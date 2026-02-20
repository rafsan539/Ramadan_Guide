
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RamadanTimes from './components/RamadanTimes';
import QuranView from './components/QuranView';
import HadithSection from './components/HadithSection';
import TasbihCounter from './components/TasbihCounter';
import ZakatCalculator from './components/ZakatCalculator';
import AiAssistant from './components/AiAssistant';
import SalatGuide from './components/SalatGuide';
import ScrollToTop from './components/ScrollToTop';
import IslamicAnimations from './components/IslamicAnimations';
import Footer from './components/Footer';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

const AppContent: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-emerald-950 text-white selection:bg-amber-500 selection:text-emerald-950 relative">
      <IslamicAnimations />
      <Navbar />
      
      {/* Added top padding to account for fixed navbar - responsive */}
      <main className="flex-grow container mx-auto px-2 sm:px-4 pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 md:pb-12 min-h-[70vh] relative z-10 w-full max-w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/times" element={<RamadanTimes />} />
              <Route path="/quran" element={<QuranView />} />
              <Route path="/hadith" element={<HadithSection />} />
              <Route path="/tasbih" element={<TasbihCounter />} />
              <Route path="/zakat" element={<ZakatCalculator />} />
              <Route path="/assistant" element={<AiAssistant />} />
              <Route path="/salat" element={<SalatGuide />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;
