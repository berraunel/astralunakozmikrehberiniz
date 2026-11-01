import React from 'react';
import { Sun, Compass, Moon } from 'lucide-react';
import { NatalChartData } from '../utils/astrologyCalc';
import { ZODIAC_PROFILES } from '../data/astrologyData';

interface BigThreeCardsProps {
  chart: NatalChartData;
}

export const BigThreeCards: React.FC<BigThreeCardsProps> = ({ chart }) => {
  const sunProfile = ZODIAC_PROFILES[chart.sun.sign.id] || ZODIAC_PROFILES.aries;
  const ascProfile = ZODIAC_PROFILES[chart.ascendant.sign.id] || ZODIAC_PROFILES.aries;
  const moonProfile = ZODIAC_PROFILES[chart.moon.sign.id] || ZODIAC_PROFILES.cancer;

  return (
    <div className="w-full space-y-6">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
          Astrolojinin Kutsal Üçlüsü
        </span>
        <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-100 mt-1">
          Büyük Üçlü: Güneş, Yükselen ve Ay
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          Kişiliğin üç ana sütunudur. Hiç astroloji bilmeseniz bile bu üçlüyü anladığınızda doğum haritanızın yüzde yetmişini çözmüş olursunuz.
        </p>
      </div>

      {/* 3-Column Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sun Sign Card */}
        <div className="bg-[#0f172a]/90 border border-amber-500/25 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm group hover:border-amber-400/50 transition-all shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Sun className="w-5 h-5" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold font-cinzel text-amber-200">
                {chart.sun.sign.symbol}
              </span>
              <div className="text-[11px] font-mono text-slate-400">
                {chart.sun.degreeInSign}° {chart.sun.minuteInSign}'
              </div>
            </div>
          </div>

          <div className="mb-2">
            <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
              Ruhun & Bilinçli Özün
            </span>
            <h4 className="text-xl font-bold font-cinzel text-slate-100">
              Güneş {chart.sun.sign.name} Burcunda
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>{chart.sun.sign.element}</span>
              <span aria-hidden="true">·</span>
              <span>{chart.sun.sign.modality}</span>
              <span aria-hidden="true">·</span>
              <span>{chart.sun.house}. Ev</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mt-3">
            Güneş senin yaşam enerjin, iraden ve karakterinin omurgasıdır. <strong>{chart.sun.sign.name}</strong> Güneş; seni {sunProfile.strengths[0].toLowerCase()}, {sunProfile.strengths[1].toLowerCase()} ve hedeflerine {chart.sun.sign.element.toLowerCase()} elementiyle odaklanan biri yapar.
          </p>

          <div className="mt-4 pt-4 border-t border-slate-800 text-xs">
            <span className="text-slate-400 block font-medium mb-1">Astrolog Mottosu:</span>
            <span className="italic text-amber-300 font-cormorant text-sm">
              "{sunProfile.motto}"
            </span>
          </div>
        </div>

        {/* Ascendant (Rising) Card */}
        <div className="bg-[#0f172a]/90 border border-sky-500/25 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm group hover:border-sky-400/50 transition-all shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold font-cinzel text-sky-200">
                {chart.ascendant.sign.symbol}
              </span>
              <div className="text-[11px] font-mono text-slate-400">
                {chart.ascendant.degreeInSign}° {chart.ascendant.minuteInSign}'
              </div>
            </div>
          </div>

          <div className="mb-2">
            <span className="text-[11px] uppercase tracking-wider text-sky-400 font-semibold">
              Dünyaya Açılan Kapın & Masken
            </span>
            <h4 className="text-xl font-bold font-cinzel text-slate-100">
              Yükselen {chart.ascendant.sign.name} (ASC)
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>{chart.ascendant.sign.element}</span>
              <span aria-hidden="true">·</span>
              <span>{chart.ascendant.sign.modality}</span>
              <span aria-hidden="true">·</span>
              <span>1. Ev Girişi</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mt-3">
            Yükselen burcun doğduğun an ufukta beliren burçtur. İnsanların seni ilk gördüğünde aldığı elektrik, dış görünüşün ve yeni durumlara ilk yaklaşım tarzındır. <strong>{chart.ascendant.sign.name}</strong> yükselen ile dış dünyaya {ascProfile.strengths[0].toLowerCase()} bir duruş sergilersin.
          </p>

          <div className="mt-4 pt-4 border-t border-slate-800 text-xs">
            <span className="text-slate-400 block font-medium mb-1">İlk İntiba Arketipi:</span>
            <span className="italic text-sky-300 font-cormorant text-sm">
              "{ascProfile.archetype}"
            </span>
          </div>
        </div>

        {/* Moon Sign Card */}
        <div className="bg-[#0f172a]/90 border border-indigo-500/25 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm group hover:border-indigo-400/50 transition-all shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Moon className="w-5 h-5" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold font-cinzel text-indigo-200">
                {chart.moon.sign.symbol}
              </span>
              <div className="text-[11px] font-mono text-slate-400">
                {chart.moon.degreeInSign}° {chart.moon.minuteInSign}'
              </div>
            </div>
          </div>

          <div className="mb-2">
            <span className="text-[11px] uppercase tracking-wider text-indigo-400 font-semibold">
              Bilinçaltın & Duygusal Güvenliğin
            </span>
            <h4 className="text-xl font-bold font-cinzel text-slate-100">
              Ay {chart.moon.sign.name} Burcunda
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>{chart.moon.sign.element}</span>
              <span aria-hidden="true">·</span>
              <span>{chart.moon.sign.modality}</span>
              <span aria-hidden="true">·</span>
              <span>{chart.moon.house}. Ev</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mt-3">
            Ay burcun yalnız kaldığında kim olduğun, stres anında nasıl tepki verdiğin ve ne zaman gerçekten güvende hissettiğindir. <strong>{chart.moon.sign.name}</strong> Ay; duygusal ihtiyaçlarını {moonProfile.element.toLowerCase()} elementi yoluyla doyurur.
          </p>

          {/* Moon Phase Drawing Widget */}
          <div className="mt-3.5 p-3 rounded-xl bg-indigo-950/50 border border-indigo-400/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-950 border border-indigo-400/50 flex items-center justify-center shrink-0 shadow-inner text-2xl">
              {chart.moonPhase.emoji}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-indigo-300 font-mono">
                  Doğum Günü Ay Evresi:
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-400/20 text-indigo-200 font-bold font-mono">
                  %{chart.moonPhase.illuminationPct}
                </span>
              </div>
              <div className="text-xs font-bold text-white font-cinzel mt-0.5">
                {chart.moonPhase.phaseName}
              </div>
              <p className="text-[10px] text-slate-300 leading-tight mt-0.5">
                {chart.moonPhase.meaning}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-xs">
            <span className="text-slate-400 block font-medium mb-1">Duygusal Besin:</span>
            <span className="italic text-indigo-300 font-cormorant text-sm">
              "{moonProfile.strengths[0]} ve içsel huzur"
            </span>
          </div>
        </div>
      </div>

      {/* Synthesis Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-transparent border border-amber-500/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
            Astrolog Gözünden Üçlü Sentez:
          </span>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
            {chart.chartSummary}
          </p>
        </div>
        <div className="shrink-0 text-xs text-slate-400 font-mono">
          Baskın Element: <strong className="text-amber-300">{chart.dominantElement}</strong> ({chart.dominantModality})
        </div>
      </div>
    </div>
  );
};
