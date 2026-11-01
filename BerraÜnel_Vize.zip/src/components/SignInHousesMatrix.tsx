import React, { useState } from 'react';
import { HOUSES_GUIDE, getSignHouseInterpretation, ZODIAC_PROFILES } from '../data/astrologyData';
import { NatalChartData, ZODIAC_SIGNS } from '../utils/astrologyCalc';
import { BookOpen, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

interface SignInHousesMatrixProps {
  chart?: NatalChartData;
}

export const SignInHousesMatrix: React.FC<SignInHousesMatrixProps> = ({ chart }) => {
  const [viewMode, setViewMode] = useState<'myChart' | 'explore'>(chart ? 'myChart' : 'explore');
  const [selectedHouseNum, setSelectedHouseNum] = useState<number>(1);
  const [selectedSignId, setSelectedSignId] = useState<string>('aries');

  const currentHouse = HOUSES_GUIDE[selectedHouseNum - 1] || HOUSES_GUIDE[0];
  const currentSign = ZODIAC_PROFILES[selectedSignId] || ZODIAC_PROFILES.aries;
  const interpretation = getSignHouseInterpretation(selectedSignId, selectedHouseNum);

  return (
    <div id="houses-matrix" className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
            Kapsamlı Astroloji Matrisi
          </span>
          <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-100 mt-1">
            Hangi Burç Hangi Evde Ne Anlama Gelir?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Evler hayatın sahneleridir, burçlar ise o sahnede büründüğünüz roldür.
            Haritanızdaki evleri inceleyebilir veya 144 burç-ev kombinasyonundan dilediğinizi seçebilirsiniz.
          </p>
        </div>

        {/* View Mode Toggle */}
        {chart && (
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => setViewMode('myChart')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'myChart'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Doğum Haritamın 12 Evi
            </button>
            <button
              onClick={() => setViewMode('explore')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'explore'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Serbest Kombinasyon Keşfi
            </button>
          </div>
        )}
      </div>

      {/* Mode 1: User's Actual 12 Houses */}
      {viewMode === 'myChart' && chart ? (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-amber-500/10 via-slate-900 to-transparent border border-amber-500/20 rounded-xl flex items-center justify-between text-xs text-slate-300">
            <span>
              Haritanızdaki <strong>12 Ev Cusp (Giriş)</strong> burçları ve hayat alanınızdaki astrolog yorumları:
            </span>
            <span className="text-amber-300 font-medium hidden sm:inline">
              1. Ev = Yükselen {chart.ascendant.sign.name}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chart.houses.map((h) => {
              const signProfile = ZODIAC_PROFILES[h.sign.id] || ZODIAC_PROFILES.aries;
              const hInterp = getSignHouseInterpretation(h.sign.id, h.houseNumber);

              return (
                <div
                  key={h.houseNumber}
                  className="bg-[#0e1428]/90 border border-slate-800 hover:border-amber-500/30 rounded-xl p-5 backdrop-blur-sm transition-all shadow-md group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                        {h.houseNumber}. EV
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                        <span style={{ color: h.sign.elementColor }}>{h.sign.symbol}</span>
                        <span>{h.sign.name}</span>
                        <span className="font-mono text-slate-400 text-[11px]">{h.degreeInSign}°</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-slate-100 font-cinzel mb-1">
                      {h.name}
                    </h4>
                    <p className="text-[11px] text-amber-300/80 mb-3">
                      {h.theme}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {hInterp.interpretation}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <strong className="text-amber-300 block mb-0.5">Astrolog Tavsiyesi:</strong>
                    <span>{hInterp.advice}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Mode 2: Interactive 144 Combination Explorer */
        <div className="bg-[#0d1428]/95 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-800">
            {/* House Picker */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> 1. Hayat Alanını Seçin (Ev)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {HOUSES_GUIDE.map((h) => (
                  <button
                    key={h.number}
                    onClick={() => setSelectedHouseNum(h.number)}
                    className={`p-2 rounded-lg text-left transition-colors border ${
                      selectedHouseNum === h.number
                        ? 'bg-amber-400/20 border-amber-400 text-amber-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold font-mono">{h.number}. Ev</div>
                    <div className="text-[10px] text-slate-400 truncate">{h.theme.split(',')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sign Picker */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> 2. Burcu Seçin (Enerji)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {ZODIAC_SIGNS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSignId(s.id)}
                    className={`p-2 rounded-lg text-left transition-colors border flex items-center justify-between ${
                      selectedSignId === s.id
                        ? 'bg-amber-400/20 border-amber-400 text-amber-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-medium">{s.name}</span>
                    <span className="text-sm font-bold" style={{ color: s.elementColor }}>
                      {s.symbol}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Selected Result Card */}
          <div className="p-6 bg-slate-900/80 border border-amber-500/30 rounded-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-xl font-bold"
                  style={{ color: currentSign.color }}
                >
                  {currentSign.symbol}
                </div>
                <div>
                  <h4 className="text-lg font-bold font-cinzel text-amber-100">
                    {currentSign.name} Burcu {currentHouse.number}. Evde
                  </h4>
                  <p className="text-xs text-slate-400">
                    {currentHouse.traditionalName} · {currentHouse.theme}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {currentSign.element} Elementi
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {currentSign.modality}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Yönetici: {currentSign.ruler}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-bold text-amber-300">
                {interpretation.headline}
              </h5>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {interpretation.interpretation}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-xs font-semibold text-emerald-400 block mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Olumlu Potansiyeller
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentSign.name} burcunun {currentSign.strengths.slice(0, 2).join(' ve ')} özellikleri bu hayat alanında üretken ve yapıcı bir güç olarak ortaya çıkar.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-xs font-semibold text-amber-400 block mb-1">
                  Astrolog Tavsiyesi & Denge Noktası
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {interpretation.advice}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
