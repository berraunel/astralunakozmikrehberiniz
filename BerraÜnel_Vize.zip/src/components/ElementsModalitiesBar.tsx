import React from 'react';
import { NatalChartData } from '../utils/astrologyCalc';
import { Flame, Mountain, Wind, Droplets, Compass } from 'lucide-react';

interface ElementsModalitiesBarProps {
  chart: NatalChartData;
}

export const ElementsModalitiesBar: React.FC<ElementsModalitiesBarProps> = ({ chart }) => {
  const totalElements = Object.values(chart.elementCounts).reduce((a, b) => a + b, 0) || 1;
  const totalModalities = Object.values(chart.modalityCounts).reduce((a, b) => a + b, 0) || 1;

  const elementPercentages = {
    Ateş: Math.round((chart.elementCounts.Ateş / totalElements) * 100),
    Toprak: Math.round((chart.elementCounts.Toprak / totalElements) * 100),
    Hava: Math.round((chart.elementCounts.Hava / totalElements) * 100),
    Su: Math.round((chart.elementCounts.Su / totalElements) * 100),
  };

  const modalityPercentages = {
    Öncü: Math.round((chart.modalityCounts.Öncü / totalModalities) * 100),
    Sabit: Math.round((chart.modalityCounts.Sabit / totalModalities) * 100),
    Değişken: Math.round((chart.modalityCounts.Değişken / totalModalities) * 100),
  };

  const getElementAdvice = (dominant: string) => {
    switch (dominant) {
      case 'Ateş':
        return 'Yüksek yaşam enerjisi, cesaret ve liderlik dürtüsü. Fikirlerinizi hemen eyleme dökersiniz; sabırlı olmayı ve sakinleşmeyi hayatınıza katmalısınız.';
      case 'Toprak':
        return 'Pratik zeka, ayakları yere basan gerçekçilik ve finansal/fiziksel güvenlik önceliği. Düzeniniz sağlamdır; esnekliğe ve değişime alan açmalısınız.';
      case 'Hava':
        return 'Entelektüel merak, sosyal zeka ve objektif bakış açısı. İletişim gücünüz yüksektir; düşüncelerinizin yanı sıra duygusal hislerinizi de dinlemelisiniz.';
      case 'Su':
        return 'Derin sezgiler, empati ve ruhsal hassasiyet. İnsanların hislerini kelimesiz anlarsınız; kendinize sağlıklı sınırlar koymayı ihmal etmemelisiniz.';
      default:
        return 'Dengeli bir element dağılımına sahipsiniz.';
    }
  };

  return (
    <div className="w-full bg-[#0d1428]/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
            Kozmik Denge Analizi
          </span>
          <h3 className="text-xl font-cinzel font-bold text-slate-100 mt-0.5">
            Element ve Nitelik Dağılımınız
          </h3>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Baskın: {chart.dominantElement} / {chart.dominantModality}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 4 Elements Section */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-300">
            Dört Temel Element (Ateş, Toprak, Hava, Su)
          </h4>

          {/* Stacked Progress Bar */}
          <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex">
            <div style={{ width: `${elementPercentages.Ateş}%` }} className="bg-red-500 transition-all duration-700" title={`Ateş %${elementPercentages.Ateş}`} />
            <div style={{ width: `${elementPercentages.Toprak}%` }} className="bg-emerald-500 transition-all duration-700" title={`Toprak %${elementPercentages.Toprak}`} />
            <div style={{ width: `${elementPercentages.Hava}%` }} className="bg-sky-400 transition-all duration-700" title={`Hava %${elementPercentages.Hava}`} />
            <div style={{ width: `${elementPercentages.Su}%` }} className="bg-indigo-500 transition-all duration-700" title={`Su %${elementPercentages.Su}`} />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-slate-900/70 border border-red-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-400" />
                <span className="text-xs font-medium text-slate-200">Ateş</span>
              </div>
              <span className="text-xs font-mono font-bold text-red-400">%{elementPercentages.Ateş}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/70 border border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium text-slate-200">Toprak</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">%{elementPercentages.Toprak}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/70 border border-sky-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-medium text-slate-200">Hava</span>
              </div>
              <span className="text-xs font-mono font-bold text-sky-400">%{elementPercentages.Hava}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/70 border border-indigo-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-medium text-slate-200">Su</span>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-400">%{elementPercentages.Su}</span>
            </div>
          </div>
        </div>

        {/* 3 Modalities Section */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-300">
            Üç Nitelik / Modalite (Öncü, Sabit, Değişken)
          </h4>

          {/* Stacked Progress Bar */}
          <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex">
            <div style={{ width: `${modalityPercentages.Öncü}%` }} className="bg-amber-500 transition-all duration-700" title={`Öncü %${modalityPercentages.Öncü}`} />
            <div style={{ width: `${modalityPercentages.Sabit}%` }} className="bg-teal-500 transition-all duration-700" title={`Sabit %${modalityPercentages.Sabit}`} />
            <div style={{ width: `${modalityPercentages.Değişken}%` }} className="bg-purple-500 transition-all duration-700" title={`Değişken %${modalityPercentages.Değişken}`} />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-slate-900/70 border border-amber-500/20">
              <div className="text-[11px] text-slate-400">Öncü (Kardinal)</div>
              <div className="text-xs font-mono font-bold text-amber-400 mt-1">%{modalityPercentages.Öncü}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Başlatma Gücü</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/70 border border-teal-500/20">
              <div className="text-[11px] text-slate-400">Sabit (Fixed)</div>
              <div className="text-xs font-mono font-bold text-teal-400 mt-1">%{modalityPercentages.Sabit}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Koruma & Sabır</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/70 border border-purple-500/20">
              <div className="text-[11px] text-slate-400">Değişken (Mutable)</div>
              <div className="text-xs font-mono font-bold text-purple-400 mt-1">%{modalityPercentages.Değişken}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Uyum & Esneklik</div>
            </div>
          </div>
        </div>
      </div>

      {/* Astrologer Wisdom Note */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-300">
        <strong className="text-amber-300 block mb-1">Astrolog Tavsiyesi ({chart.dominantElement} Elementi):</strong>
        <p className="leading-relaxed">
          {getElementAdvice(chart.dominantElement)}
        </p>
      </div>
    </div>
  );
};
