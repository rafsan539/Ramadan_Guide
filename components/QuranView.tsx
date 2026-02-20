import React, { useState, useEffect } from 'react';
import { Surah, Ayah } from '../types';
import { COMPREHENSIVE_PRONUNCIATIONS } from '../utils/comprehensivePronunciations';

// Use comprehensive pronunciations that cover all 114 surahs
const PRE_GENERATED_PRONUNCIATIONS = COMPREHENSIVE_PRONUNCIATIONS;

const QuranView: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.alquran.cloud/v1/surah');
      const data = await res.json();
      setSurahs(data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchAyahs = async (surahNumber: number) => {
    setLoading(true);
    try {
      const [arRes, bnRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/bn.bengali`)
      ]);
      const arData = await arRes.json();
      const bnData = await bnRes.json();
      
      // Get pre-generated pronunciations for this surah
      const surahPronunciations = PRE_GENERATED_PRONUNCIATIONS[surahNumber] || {};

      const combined = arData.data.ayahs.map((ayah: any, idx: number) => ({
        ...ayah,
        translation: bnData.data.ayahs[idx].text,
        pronunciation: surahPronunciations[ayah.numberInSurah.toString()] || ""
      }));
      
      setAyahs(combined);
      setLoading(false);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.number.toString().includes(searchTerm)
  );

  return (
<div className="space-y-4 sm:space-y-5 md:space-y-6 min-h-[60vh] px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 flex-wrap">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-400 tracking-tight">আল কুরআন</h1>
          
          {!selectedSurah && (
            <div className="relative flex-1 sm:flex-none w-full sm:w-auto min-w-0 sm:min-w-[300px]">
              <input 
                type="text"
                placeholder="সূরা খুঁজুন (নাম বা নম্বর)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-emerald-900/50 border border-emerald-800 rounded-lg sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              />
            </div>
          )}
          
          {selectedSurah && (
            <button 
              onClick={() => { setSelectedSurah(null); setAyahs([]); }}
              className="w-full sm:w-auto bg-emerald-900/50 border border-emerald-800 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-2xl text-amber-400 hover:text-amber-300 font-bold flex items-center justify-center gap-2 transition-all text-xs sm:text-sm md:text-base"
          >
            ← সূরার তালিকা
          </button>
        )}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      )}

      {!loading && !selectedSurah && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredSurahs.map(s => (
            <button
              key={s.number}
              onClick={() => { setSelectedSurah(s); fetchAyahs(s.number); }}
              className="bg-emerald-900/30 border border-emerald-800/50 p-6 md:p-8 rounded-[2rem] hover:border-amber-500/50 transition-all text-left group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="bg-emerald-950 text-amber-400 w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border border-emerald-800">{s.number}</span>
                <span className="arabic text-2xl text-emerald-400 group-hover:text-amber-400 transition-colors">{s.name}</span>
              </div>
              <h3 className="font-black text-xl text-emerald-100 mb-1 relative z-10 group-hover:text-amber-400 transition-colors">{s.englishName}</h3>
              <p className="text-xs font-bold text-emerald-400/60 uppercase tracking-widest relative z-10">{s.englishNameTranslation} • {s.numberOfAyahs} আয়াত</p>
            </button>
          ))}
        </div>
      )}

      {selectedSurah && !loading && (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
          <div className="text-center bg-emerald-900/40 p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-emerald-800/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')] opacity-5 pointer-events-none"></div>
            <h2 className="arabic text-5xl md:text-7xl text-amber-400 mb-4 relative z-10">{selectedSurah.name}</h2>
            <h3 className="text-3xl md:text-4xl font-black mb-2 relative z-10">{selectedSurah.englishName}</h3>
            <p className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-xs md:text-sm relative z-10">
              {selectedSurah.englishNameTranslation} • {selectedSurah.revelationType === 'Meccan' ? 'মাক্কী' : 'মাদানী'}
            </p>
          </div>

          <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
            {ayahs.map((ayah) => (
              <div key={ayah.number} className="bg-emerald-900/20 p-6 md:p-10 rounded-[2rem] border border-emerald-800/50 hover:border-emerald-700/50 transition-all group">
                <div className="flex justify-between items-start mb-6 md:mb-8">
                  <span className="bg-amber-500/10 text-amber-500 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-amber-500/20">
                    আয়াত {ayah.numberInSurah}
                  </span>
                </div>
                <p className="arabic text-3xl sm:text-4xl md:text-6xl text-right leading-[1.8] md:leading-[2] text-emerald-100 mb-8 md:mb-10" dir="rtl">
                  {ayah.text}
                </p>
                {ayah.pronunciation && (
                  <div className="bg-emerald-950/50 p-5 md:p-8 rounded-2xl mb-8 md:mb-10 border border-amber-500/10">
                    <p className="text-amber-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-3">উচ্চারণ (পড়ুন):</p>
                    <p className="text-amber-400 font-bold text-base sm:text-lg md:text-xl leading-relaxed">{ayah.pronunciation}</p>
                  </div>
                )}
                <div className="border-t border-emerald-800/30 pt-6 md:pt-8">
                  <p className="text-emerald-100 text-base md:text-xl leading-relaxed font-bold opacity-90">
                    {ayah.translation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuranView;
