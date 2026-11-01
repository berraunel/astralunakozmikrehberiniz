import React from 'react';
import { NatalChartData } from '../utils/astrologyCalc';

interface PlanetPlacementsTableProps {
  chart: NatalChartData;
}

export const PlanetPlacementsTable: React.FC<PlanetPlacementsTableProps> = ({ chart }) => {
  const allCelestial = [
    chart.sun,
    chart.moon,
    chart.ascendant,
    chart.midheaven,
    ...chart.planets,
  ];

  return (
    <div className="w-full bg-[#0c1224]/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-2">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
            Gökyüzü Konumları
          </span>
          <h3 className="text-xl font-cinzel font-bold text-slate-100 mt-0.5">
            Gezegenler, Burçlar ve Ev Yerleşimleri
          </h3>
        </div>
        <div className="text-xs text-slate-400">
          Toplam 10 Gezegen + ASC & MC Açısı
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
              <th className="py-3 px-3">Gezegen / Nokta</th>
              <th className="py-3 px-3">Burç</th>
              <th className="py-3 px-3 text-right">Derece</th>
              <th className="py-3 px-3 text-center">Ev</th>
              <th className="py-3 px-3 text-center">Durum</th>
              <th className="py-3 px-3">Astrolog Yorumu & Arketip</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {allCelestial.map((body) => (
              <tr key={body.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-3 font-medium text-slate-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-slate-100 flex items-center justify-center font-bold text-sm"
                      style={{ color: body.sign.elementColor }}
                    >
                      {body.symbol}
                    </span>
                    <span>{body.name}</span>
                  </span>
                </td>

                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 font-medium text-slate-100">
                    <span style={{ color: body.sign.elementColor }}>{body.sign.symbol}</span>
                    <span>{body.sign.name}</span>
                    <span className="text-[11px] text-slate-500 font-normal">({body.sign.element})</span>
                  </div>
                </td>

                <td className="py-3 px-3 text-right font-mono tabular-nums text-amber-200 whitespace-nowrap">
                  {body.degreeInSign}° {body.minuteInSign}'
                </td>

                <td className="py-3 px-3 text-center whitespace-nowrap">
                  <span className="font-mono text-slate-300 font-semibold">
                    {body.house}. Ev
                  </span>
                </td>

                <td className="py-3 px-3 text-center whitespace-nowrap">
                  {body.isRetrograde ? (
                    <span className="text-amber-400 font-bold font-mono text-[11px]" title="Retrograd: Gezegen enerjisi içe dönük çalışır">
                      ℞ Retro
                    </span>
                  ) : (
                    <span className="text-slate-400 font-mono text-[11px]">
                      Düz
                    </span>
                  )}
                </td>

                <td className="py-3 px-3 text-slate-300 min-w-[280px] leading-relaxed">
                  {body.meaning}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
