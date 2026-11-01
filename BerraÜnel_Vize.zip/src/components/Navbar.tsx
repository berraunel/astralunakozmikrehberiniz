import React from 'react';
import { Heart, Sparkles, Wand2, History, Compass, Bot, Scroll } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenCalculator }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#090c16]/90 backdrop-blur-md border-b border-purple-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Lockup matching user screenshot */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-3 text-left group"
        >
          {/* Gradient Squircle Icon with soft glow */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_18px_rgba(168,85,247,0.45)] group-hover:scale-105 transition-transform shrink-0" />
          
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white block">
              AstraLuna
            </span>
            <span className="text-[9px] uppercase tracking-widest text-pink-300/80 font-medium font-sans">
              GÖK GÜNLÜĞÜNÜZ & KOZMİK REHBERİNİZ
            </span>
          </div>
        </button>

        {/* Navigation links matching user screenshot */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium tracking-wide text-slate-300">
          <button
            onClick={() => onNavigate('synastry')}
            className="hover:text-pink-300 transition-colors flex items-center gap-1.5 py-1 group"
          >
            <div className="w-5 h-5 rounded-md bg-rose-500/15 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              <Heart className="w-3.5 h-3.5 fill-rose-400/20" />
            </div>
            <span>Kozmik Uyum</span>
          </button>

          <button
            onClick={() => onNavigate('style-beauty')}
            className="hover:text-purple-300 transition-colors flex items-center gap-1.5 py-1 group"
          >
            <div className="w-5 h-5 rounded-md bg-purple-500/15 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
              <Wand2 className="w-3.5 h-3.5" />
            </div>
            <span>Stil & Güzellik</span>
          </button>

          <button
            onClick={() => onNavigate('karma-past-life')}
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1 group"
          >
            <div className="w-5 h-5 rounded-md bg-amber-500/15 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
              <History className="w-3.5 h-3.5" />
            </div>
            <span>Geçmiş Yaşam</span>
          </button>

          <button
            onClick={() => onNavigate('zodiac-origins')}
            className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 py-1 group"
          >
            <div className="w-5 h-5 rounded-md bg-emerald-500/15 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>Burç Çizimleri</span>
          </button>

          <button
            onClick={() => onNavigate('personalized-houses-section')}
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1 group"
          >
            <div className="w-5 h-5 rounded-md bg-amber-500/15 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span>12 Ev Analizi</span>
          </button>

          <button
            onClick={() => onNavigate('history')}
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1 group"
          >
            <div className="w-5 h-5 rounded-md bg-amber-500/15 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
              <Scroll className="w-3.5 h-3.5" />
            </div>
            <span>Tarihçe & Mitoloji</span>
          </button>

          <button
            onClick={() => onNavigate('calculator')}
            className="hover:text-sky-300 transition-colors flex items-center gap-1.5 py-1 group"
          >
            <div className="w-5 h-5 rounded-md bg-sky-500/15 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span>Harita & Gökyüzü</span>
          </button>

          <button
            onClick={() => onNavigate('ai-astrologer')}
            className="hover:text-purple-300 transition-colors flex items-center gap-1.5 py-1 text-purple-300 font-semibold group"
          >
            <div className="w-5 h-5 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-200 group-hover:scale-110 transition-transform">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <span>AI Astrolog</span>
          </button>
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCalculator}
            className="px-4 py-2 text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Harita Çıkar
          </button>
        </div>
      </div>
    </header>
  );
};
