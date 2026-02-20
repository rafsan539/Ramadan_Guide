
import React, { useState } from 'react';

const ZakatCalculator: React.FC = () => {
  const [values, setValues] = useState({
    cash: 0,
    gold: 0,
    silver: 0,
    business: 0,
    debt: 0
  });

  const total = (values.cash + values.gold + values.silver + values.business) - values.debt;
  const zakat = total > 0 ? (total * 0.025) : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: Number(e.target.value) });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 px-2 sm:px-4 pb-12 sm:pb-16">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-400 mb-2 tracking-tight">যাকাত ক্যালকুলেটর</h1>
        <p className="text-emerald-300 font-bold opacity-80 text-xs sm:text-sm">আপনার যাকাতযোগ্য সম্পদের হিসাব করুন</p>
      </div>

      <div className="bg-emerald-900 border border-emerald-800 rounded-lg sm:rounded-[2rem] md:rounded-[3rem] p-5 sm:p-8 md:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-amber-500/5 -mr-12 -mt-12 rounded-full blur-3xl"></div>
        <div className="grid gap-4 sm:gap-5 md:gap-6 relative z-10">
          {[
            { label: 'হাতে বা ব্যাংকে থাকা নগদ টাকা', name: 'cash' },
            { label: 'স্বর্ণের বর্তমান বাজারমূল্য', name: 'gold' },
            { label: 'রূপার বর্তমান বাজারমূল্য', name: 'silver' },
            { label: 'ব্যবসায়িক পণ্যের মূল্য', name: 'business' },
            { label: 'পরিশোধযোগ্য ঋণ (বিয়োগ হবে)', name: 'debt' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-xs md:text-sm font-black text-emerald-400 mb-2 uppercase tracking-widest">{field.label}</label>
              <input
                type="number"
                name={field.name}
                value={values[field.name as keyof typeof values] || ''}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl md:rounded-2xl px-5 py-3 md:py-4 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-100 font-bold transition-all"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-10 pt-8 border-t border-emerald-800 space-y-4 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-base md:text-lg">
            <span className="text-emerald-300 font-bold opacity-70">মোট যাকাতযোগ্য সম্পদ:</span>
            <span className="font-black text-emerald-100">৳ {total.toLocaleString()}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xl md:text-3xl pt-2">
            <span className="text-amber-500 font-black uppercase tracking-tight">দেয় যাকাত (২.৫%):</span>
            <span className="font-black text-amber-500 drop-shadow-lg">৳ {zakat.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="bg-emerald-900/30 p-6 rounded-2xl border border-emerald-800 text-[10px] md:text-xs text-emerald-400 space-y-3 font-bold opacity-80">
        <p className="flex gap-2"><span className="text-amber-500">•</span> নেসাব পরিমাণ সম্পদ (সাধারণত ৭.৫ তোলা সোনা বা ৫২.৫ তোলা রূপার মূল্য) ১ বছর পূর্ণ হলে যাকাত ফরজ হয়।</p>
        <p className="flex gap-2"><span className="text-amber-500">•</span> এটি একটি প্রাথমিক হিসাব মাত্র। নির্ভুল হিসাবের জন্য বিজ্ঞ আলেমদের পরামর্শ নিন।</p>
      </div>
    </div>
  );
};

export default ZakatCalculator;
