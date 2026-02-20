
import React, { useState, useRef, useEffect } from 'react';
import { askRamadanAssistant } from '../services/geminiService';
import { Sparkles, Send, User, Bot, Moon, Info } from 'lucide-react';
import Markdown from 'react-markdown';

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'আসসালামু আলাইকুম! আমি আপনার রমজান সহকারী। রোজা, তারাবীহ বা রমজান সম্পর্কিত যেকোনো প্রশ্ন করতে পারেন। আমি কুরআন ও হাদিসের আলোকে আপনাকে উত্তর দেওয়ার চেষ্টা করব।' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await askRamadanAssistant(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'দুঃখিত, বর্তমানে কোনো সমস্যা হচ্ছে। অনুগ্রহ করে আবার চেষ্টা করুন।' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[75vh] sm:h-[80vh] md:h-[85vh] flex flex-col relative group px-2 sm:px-4 py-2 sm:py-4">
      {/* Decorative Background Glows */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex-grow flex flex-col bg-emerald-950/40 backdrop-blur-2xl border border-emerald-800/50 rounded-lg sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
        {/* Header */}
        <div className="bg-emerald-900/40 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 border-b border-emerald-800/50 flex items-center justify-between shrink-0 rounded-t-lg sm:rounded-t-2xl md:rounded-t-3xl">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-950 shadow-lg shadow-amber-500/20">
                <Moon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-emerald-950/20" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-emerald-500 border-2 border-emerald-950 rounded-full"></div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-black text-white tracking-tight">এআই রমজান সহকারী</h2>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-emerald-400 uppercase tracking-widest">অনলাইন • কুরআন ও হাদিস ভিত্তিক</p>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2 bg-emerald-950/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-emerald-800/50">
            <Info className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
            <span className="text-[8px] sm:text-[9px] font-bold text-emerald-300 uppercase tracking-wider">রেফারেন্স সহ উত্তর</span>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8 scrollbar-thin scrollbar-thumb-emerald-800/50 scrollbar-track-transparent"
        >
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
            >
              <div className={`flex max-w-[90%] sm:max-w-[85%] gap-2 sm:gap-3 md:gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center border ${
                  m.role === 'user' 
                    ? 'bg-amber-500 border-amber-400 text-emerald-950' 
                    : 'bg-emerald-900 border-emerald-800 text-amber-500'
                }`}>
                  {m.role === 'user' ? <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                </div>
                
                <div className={`relative px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-2xl md:rounded-3xl text-xs sm:text-sm md:text-base leading-relaxed shadow-xl ${
                  m.role === 'user' 
                    ? 'bg-amber-500 text-emerald-950 font-bold rounded-tr-none' 
                    : 'bg-emerald-900/80 text-emerald-50 border border-emerald-800/50 rounded-tl-none'
                }`}>
                  <div className="markdown-body prose prose-invert prose-sm max-w-none">
                    <Markdown>{m.content}</Markdown>
                  </div>
                  <div className={`absolute top-0 w-4 h-4 ${
                    m.role === 'user' 
                      ? '-right-2 bg-amber-500' 
                      : '-left-2 bg-emerald-900/80 border-l border-t border-emerald-800/50'
                  } rotate-45 -z-10`}></div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-900 border border-emerald-800 flex items-center justify-center text-amber-500">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div className="bg-emerald-900/80 px-6 py-4 rounded-3xl rounded-tl-none border border-emerald-800/50 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-emerald-900/40 border-t border-emerald-800/50 shrink-0">
          <div className="relative flex items-center gap-2 md:gap-3">
            <div className="relative flex-grow group">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="রমজান সম্পর্কে প্রশ্ন করুন..."
                className="w-full bg-emerald-950/80 border border-emerald-800/50 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white placeholder:text-emerald-700 transition-all pr-12"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-800 group-focus-within:text-amber-500/50 transition-colors hidden sm:block">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-amber-500 text-emerald-950 p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-amber-400 disabled:opacity-50 transition-all shadow-lg shadow-amber-500/20 shrink-0 group active:scale-95"
            >
              <Send className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
          <p className="text-[9px] text-center mt-4 text-emerald-600 font-bold uppercase tracking-[0.2em]">
            এআই ভুল করতে পারে। গুরুত্বপূর্ণ বিষয়ে আলেমদের পরামর্শ নিন।
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
