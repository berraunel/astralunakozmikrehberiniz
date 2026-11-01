import React from 'react';
import { NatalChartData } from '../utils/astrologyCalc';
import { Moon, Sparkles, Compass, Eye } from 'lucide-react';

interface MoonPhaseVisualizerProps {
  chart: NatalChartData;
}

export const MoonPhaseVisualizer: React.FC<MoonPhaseVisualizerProps> = ({ chart }) => {
  const { moonPhase, moon, sun } = chart;
  const illumination = moonPhase.illuminationPct;
  const angle = moonPhase.angleDeg; // 0 = New Moon, 90 = First Quarter, 180 = Full Moon, 270 = Last Quarter

  // Calculate realistic SVG moon phase rendering:
  // We draw a dark moon circle (r=45), and then an illuminated path based on elongation angle
  const r = 45;
  const cx = 55;
  const cy = 55;

  // Illumination path construction
  // If angle < 180: Waxing (Büyüyen) - right side is lit
  // If angle >= 180: Waning (Küçülen) - left side is lit
  const isWaxing = angle < 180;
  // Normalized elongation from 0 to 180
  const normAngle = angle <= 180 ? angle : 360 - angle;
  // Curvature rx for the terminator ellipse (-r at new moon, 0 at quarter, +r at full moon)
  const k = Math.cos((normAngle * Math.PI) / 180);
  const rx = Math.abs(k * r);

  return (
    <div className="w-full bg-gradient-to-br from-[#0c1024] via-[#0f1730] to-[#141b3a] border border-indigo-500/30 rounded-2xl p-6 lg:p-7 backdrop-blur-md shadow-2xl relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
        {/* Left: Moon SVG Graphic */}
        <div className="flex items-center gap-5">
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            {/* Atmospheric Outer Moon Glow */}
            <div
              className="absolute inset-0 rounded-full blur-md transition-all duration-700"
              style={{
                background: `radial-gradient(circle, rgba(226, 232, 255, ${0.15 + (illumination / 100) * 0.35}) 0%, transparent 70%)`,
              }}
            />

            {/* Realistic Detailed SVG Moon Illustration */}
            <svg viewBox="0 0 110 110" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(165,180,252,0.45)]">
              <defs>
                <radialGradient id="darkSideGrad" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#1e2235" />
                  <stop offset="70%" stopColor="#0c101d" />
                  <stop offset="100%" stopColor="#060810" />
                </radialGradient>
                <radialGradient id="lightSideGrad" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="45%" stopColor="#e2e8f0" />
                  <stop offset="85%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </radialGradient>
                <clipPath id="moonDiscClip">
                  <circle cx={cx} cy={cy} r={r} />
                </clipPath>
              </defs>

              {/* Base Moon Sphere (Dark Side with subtle craters) */}
              <circle cx={cx} cy={cy} r={r} fill="url(#darkSideGrad)" stroke="#334155" strokeWidth="1.5" />

              {/* Subtle Crater Textures on Dark Side */}
              <g opacity="0.3" clipPath="url(#moonDiscClip)">
                <circle cx={cx - 15} cy={cy - 10} r="7" fill="#05070e" />
                <circle cx={cx + 10} cy={cy + 18} r="9" fill="#05070e" />
                <circle cx={cx - 8} cy={cy + 22} r="5" fill="#05070e" />
                <circle cx={cx + 16} cy={cy - 16} r="6" fill="#05070e" />
              </g>

              {/* Dynamic Illuminated Phase Overlay */}
              <g clipPath="url(#moonDiscClip)">
                {illumination >= 98 ? (
                  // Full Moon
                  <circle cx={cx} cy={cy} r={r} fill="url(#lightSideGrad)" />
                ) : illumination <= 2 ? (
                  // New Moon (remains dark)
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                ) : isWaxing ? (
                  // Waxing Phase (Right side illuminated)
                  normAngle <= 90 ? (
                    // Crescent: Right semicircle minus terminator ellipse
                    <path
                      d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${rx} ${r} 0 0 1 ${cx} ${cy - r} Z`}
                      fill="url(#lightSideGrad)"
                    />
                  ) : (
                    // Gibbous: Right semicircle plus terminator ellipse
                    <path
                      d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${rx} ${r} 0 0 0 ${cx} ${cy - r} Z`}
                      fill="url(#lightSideGrad)"
                    />
                  )
                ) : (
                  // Waning Phase (Left side illuminated)
                  normAngle <= 90 ? (
                    // Crescent
                    <path
                      d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${rx} ${r} 0 0 0 ${cx} ${cy - r} Z`}
                      fill="url(#lightSideGrad)"
                    />
                  ) : (
                    // Gibbous
                    <path
                      d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${rx} ${r} 0 0 1 ${cx} ${cy - r} Z`}
                      fill="url(#lightSideGrad)"
                    />
                  )
                )}

                {/* Crater Highlights on Illuminated Region */}
                <g opacity={illumination > 15 ? 0.25 : 0.05}>
                  <circle cx={cx + 12} cy={cy - 8} r="6" fill="#64748b" />
                  <circle cx={cx + 18} cy={cy + 14} r="8" fill="#64748b" />
                  <circle cx={cx - 10} cy={cy - 15} r="5" fill="#64748b" />
                </g>
              </g>

              {/* Edge Rim Specular Ring */}
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="#a5b4fc" strokeWidth="1" strokeOpacity="0.4" />
            </svg>

            {/* Emoji badge */}
            <span className="absolute -bottom-1 -right-1 text-xl select-none" title={moonPhase.phaseName}>
              {moonPhase.emoji}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Doğduğun Günün Ay Evresi
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 font-mono font-bold">
                %{illumination} Aydınlık
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-cinzel font-bold text-white flex items-center gap-2">
              {moonPhase.phaseName}
            </h4>
            <p className="text-xs text-slate-300 font-mono">
              Güneş-Ay Açısı: {Math.round(angle)}° · {moon.sign.name} Burcunda ({moon.degreeInSign}° {moon.minuteInSign}')
            </p>
          </div>
        </div>

        {/* Middle / Right: Astrological Interpretation of the Phase */}
        <div className="flex-1 max-w-xl bg-slate-900/70 border border-indigo-500/20 rounded-xl p-4 text-xs text-slate-200 leading-relaxed space-y-2">
          <div className="flex items-center justify-between text-indigo-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5" /> Doğum Anı Ay Arketipi & Ruhsal Enerji
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {chart.birthData.birthDate}
            </span>
          </div>
          <p className="text-slate-300">
            {moonPhase.meaning}
          </p>
          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <div>
              <span className="text-amber-400 font-medium">Güneş: </span>
              {sun.sign.name} ({sun.degreeInSign}°)
            </div>
            <div>
              <span className="text-indigo-400 font-medium">Ay: </span>
              {moon.sign.name} ({moon.degreeInSign}°)
            </div>
            <div>
              <span className="text-emerald-400 font-medium">Faz Tipi: </span>
              {isWaxing ? 'Büyüyen Faz (Girişim & İnşa)' : 'Küçülen Faz (Hasat & Bilgelik)'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
