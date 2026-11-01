import React from 'react';
import { Heart, Wand2, History, Compass, Scroll, Sparkles, ChevronRight, Bot } from 'lucide-react';
import { RotatingZodiacWheel } from './RotatingZodiacWheel';

interface MythologicalEntranceProps {
  onNavigate: (sectionId: string) => void;
  onOpenAi: () => void;
}

export const MythologicalEntrance: React.FC<MythologicalEntranceProps> = ({ onNavigate, onOpenAi }) => {
  return (
    <div className="w-full space-y-12">
      {/* Hero Section matching user reference screenshot */}
      <div className="text-center max-w-4xl mx-auto space-y-6 pt-4 sm:pt-8">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e1735]/80 border border-purple-400/30 text-purple-200 text-xs font-medium shadow-[0_0_15px_rgba(192,132,252,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span>Astroloji & Kişisel Farkındalık Portalı</span>
        </div>

        {/* Display Typography */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-playfair font-extrabold tracking-tight text-white leading-[1.15]">
          <span className="block">Gökyüzünün</span>
          <span className="block mt-1">
            Rehberliğinde{' '}
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-purple-400 bg-clip-text text-transparent">
              Ahengi
            </span>
          </span>
          <span className="block mt-1 bg-gradient-to-r from-pink-200 via-rose-200 to-amber-200 bg-clip-text text-transparent">
            Keşfet
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-300/90 max-w-3xl mx-auto leading-relaxed font-sans">
          İlişkilerindeki enerjisel uyumu hesapla, yükselen burcunla parlayan kişisel stil kılavuzunu incele, geçmiş yaşam karmalarının ruhsal derslerini öğren ve 12 burcun mitolojik kökenlerini keşfet.
        </p>

        {/* Dönen Burç Çarkı (Ana Sayfa Göksel Halka Merkezi) */}
        <div className="pt-2 pb-4 flex justify-center">
          <RotatingZodiacWheel
            size={330}
            onSelectSign={() => onNavigate('zodiac-origins')}
          />
        </div>

        {/* 4 Prominent Interactive Roadmap Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-left">
          {/* Card 1: Uyum Matrisi */}
          <button
            onClick={() => onNavigate('synastry')}
            className="p-5 rounded-2xl bg-[#121526]/85 hover:bg-[#161a30] border border-purple-500/15 hover:border-pink-500/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#2e152d] border border-pink-500/30 flex items-center justify-center text-pink-400 mb-3 shadow-[0_0_12px_rgba(244,63,94,0.2)] group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 fill-pink-400/20" />
              </div>
              <h3 className="text-base font-serif font-bold text-white group-hover:text-pink-200 transition-colors">
                Uyum Matrisi
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Aşk veya arkadaşlık dinamiklerinizde tutku, iletişim ve güven frekanslarını eğlenceli analizlerle keşfedin.
              </p>
            </div>

            <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-pink-300/80 group-hover:text-pink-200 font-medium">
              <span>Uyumu Hesapla</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Stil Rehberi */}
          <button
            onClick={() => onNavigate('style-beauty')}
            className="p-5 rounded-2xl bg-[#121526]/85 hover:bg-[#161a30] border border-purple-500/15 hover:border-purple-400/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#221738] border border-purple-400/30 flex items-center justify-center text-purple-300 mb-3 shadow-[0_0_12px_rgba(192,132,252,0.2)] group-hover:scale-105 transition-transform">
                <Wand2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-white group-hover:text-purple-200 transition-colors">
                Stil Rehberi
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Burcunuza ve yükseleninize özel imza renk paletleri (HEX), gardırop, takı ve güzellik ritüelleri.
              </p>
            </div>

            <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-300/80 group-hover:text-purple-200 font-medium">
              <span>Stilini İncele</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 3: Geçmiş Yaşam */}
          <button
            onClick={() => onNavigate('karma-past-life')}
            className="p-5 rounded-2xl bg-[#121526]/85 hover:bg-[#161a30] border border-purple-500/15 hover:border-amber-400/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#2e2315] border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3 shadow-[0_0_12px_rgba(245,158,11,0.2)] group-hover:scale-105 transition-transform">
                <History className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                Geçmiş Yaşam
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Karmik Ay Düğümleri ile geçmiş yaşam kimliğinizi ve bu hayattaki ruhsal tekamül dersinizi öğrenin.
              </p>
            </div>

            <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-300/80 group-hover:text-amber-200 font-medium">
              <span>Zaman Tüneline Gir</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 4: Burç Kökenleri */}
          <button
            onClick={() => onNavigate('zodiac-origins')}
            className="p-5 rounded-2xl bg-[#121526]/85 hover:bg-[#161a30] border border-purple-500/15 hover:border-emerald-400/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#142820] border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-3 shadow-[0_0_12px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-white group-hover:text-emerald-200 transition-colors">
                Mitolojik Burç Çizimleri
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                12 burcun altın varaklı kadim mitolojik posterleri, adlarının kökeni ve sembollerinin derin hikayeleri.
              </p>
            </div>

            <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-300/80 group-hover:text-emerald-200 font-medium">
              <span>Kökenleri İncele</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Quick Actions & Navigation Bar under cards */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('calculator')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs tracking-wider uppercase rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            Hassas Doğum Haritanı Çıkar
          </button>

          <button
            onClick={() => onNavigate('history')}
            className="px-5 py-3 bg-[#131728]/80 hover:bg-[#181d33] border border-purple-500/25 text-purple-200 font-medium text-xs rounded-xl transition-colors flex items-center gap-2"
          >
            <Scroll className="w-4 h-4 text-purple-300" />
            Astroloji Tarihçesini Oku
          </button>

          <button
            onClick={onOpenAi}
            className="px-5 py-3 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-200 font-medium text-xs rounded-xl transition-colors flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-amber-300" />
            AI Astrologa Danış
          </button>
        </div>
      </div>
    </div>
  );
};
