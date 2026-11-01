import React, { useState } from 'react';
import { NatalChartData } from '../utils/astrologyCalc';
import { Compass, Sparkles, Moon, Sun, Star, Info, Sunrise, Play, RotateCcw } from 'lucide-react';

interface BirthSkyDomeProps {
  chart: NatalChartData;
}

export const BirthSkyDome: React.FC<BirthSkyDomeProps> = ({ chart }) => {
  const [selectedEntity, setSelectedEntity] = useState<{
    name: string;
    type: 'Yıldız' | 'Gezegen' | 'Nokta' | 'Yükselen (ASC)';
    subtitle: string;
    description: string;
    altitude: number;
    azimuth: number;
    color: string;
  } | null>(null);

  const [isAscRisingAnimated, setIsAscRisingAnimated] = useState<boolean>(true);

  // Re-trigger ascendant rising animation
  const triggerAscRise = () => {
    setIsAscRisingAnimated(false);
    setTimeout(() => {
      setIsAscRisingAnimated(true);
    }, 100);
  };

  // SVG dimensions for Sky Dome
  const width = 720;
  const height = 460;
  const cx = width / 2;
  const cy = height - 70; // Horizon base

  // Hemispherical dome mapping:
  const getSkyCoords = (altDeg: number, azDeg: number) => {
    const zenithX = cx;
    const zenithY = cy - 150;
    const maxRadius = 220; // Horizon radius (Altitude 0°)

    const r = Math.max(0, ((90 - altDeg) / 90) * maxRadius);
    // Angle in radians (North=0 up, East=90 right, South=180 down, West=270 left)
    const rad = ((azDeg - 90) * Math.PI) / 180;

    return {
      x: zenithX + r * Math.cos(rad),
      y: zenithY + r * Math.sin(rad),
      isAboveHorizon: altDeg >= 0,
    };
  };

  const isDay = chart.isDaytime;
  // East horizon is Azimuth 90°, Altitude 0°: exactly at zenithX + 220, zenithY
  const ascendantCoords = getSkyCoords(0, 90);

  return (
    <div className="w-full bg-[#080d1e]/95 border border-amber-500/25 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
              <Sunrise className="w-3.5 h-3.5" /> Doğum Anı Gökyüzü Simülasyonu
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
              Yerel Yıldız Saati: {chart.birthData.lstHours.toFixed(2)}h
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-100 mt-1">
            Doğduğun Saatte Gökyüzü ve Ufukta Yükselen Burç
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {chart.birthData.cityName} ufkunda doğduğun an ({chart.birthData.birthTime}) yükselen nokta: <strong>{chart.ascendant.sign.name} ({chart.ascendant.degreeInSign}°)</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Day / Night Badge */}
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs">
            {isDay ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-amber-200">Gündüz Göğü</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                <span className="text-indigo-200">Gece Göğü</span>
              </>
            )}
          </div>

          {/* Animate Rise Button */}
          <button
            onClick={triggerAscRise}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold transition-all shadow-sm active:scale-95"
            title="Yükselen burcun ufuktan doğuş anını canlandır"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
            <span>Yükselişi Canlandır</span>
          </button>
        </div>
      </div>

      {/* Visual explainer bar: Why Ascendant is the East Horizon */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-slate-900 border border-amber-500/30 text-xs text-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
            <Sunrise className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-amber-200">Yükselen Burç (ASC) Nedir ve Neden Ufuktadır?</span>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Dünya kendi ekseni etrafında dönerken, doğduğun an ({chart.birthData.birthTime}) doğu ufkunda ({chart.birthData.cityName}) yükselmekte olan burç <strong>{chart.ascendant.sign.name}</strong> burcuydu.
            </p>
          </div>
        </div>
        <div className="shrink-0 text-[11px] font-mono text-amber-300/90 bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-500/30">
          Ufuk Açısı: 0° İrtifa · 90° Doğu
        </div>
      </div>

      {/* Interactive Sky Dome Graphic & Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Sky Dome Canvas */}
        <div className="lg:col-span-8 relative aspect-[7/5] w-full bg-gradient-to-b from-[#030611] via-[#081026] to-[#0d1633] rounded-2xl border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
          <svg viewBox="0 0 720 460" className="w-full h-full select-none overflow-visible">
            <defs>
              {/* Day / Night Atmospheric Radial Wash */}
              <radialGradient id="skyZenith" cx="50%" cy="35%" r="65%">
                <stop offset="0%" stopColor={isDay ? '#1e3a5f' : '#151e3f'} stopOpacity="0.85" />
                <stop offset="60%" stopColor={isDay ? '#0f2444' : '#090d21'} stopOpacity="0.9" />
                <stop offset="100%" stopColor="#040714" stopOpacity="1" />
              </radialGradient>

              {/* Sun Glow */}
              <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
                <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>

              {/* Ascendant Dawn Rising Glow */}
              <radialGradient id="ascDawnGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
              </radialGradient>

              {/* Horizon Ring Gradient */}
              <linearGradient id="horizonLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="25%" stopColor="#fbbf24" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.5" />
                <stop offset="75%" stopColor="#94a3b8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Dome Background Fill */}
            <rect width="720" height="460" fill="url(#skyZenith)" />

            {/* Background Constellation Guide Rings (Altitudes: 30°, 60°) */}
            <circle cx={cx} cy={cy - 150} r="73" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx={cx} cy={cy - 150} r="146" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Horizon Circle (Altitude = 0° plane) */}
            <circle cx={cx} cy={cy - 150} r="220" fill="none" stroke="url(#horizonLineGrad)" strokeWidth="2.5" />

            {/* Zenith Center Crosshair */}
            <circle cx={cx} cy={cy - 150} r="3" fill="#f59e0b" />
            <text x={cx} y={cy - 160} textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
              Zenith (Tam Başucu: 90°)
            </text>

            {/* Cardinal Horizon Labels */}
            <g>
              {/* BATI - DESCENDANT */}
              <text x={cx - 235} y={cy - 146} textAnchor="end" dominantBaseline="central" fill="#94a3b8" fontSize="11" fontWeight="bold">
                BATI (DSC)
              </text>
              {/* GÜNEY - MC */}
              <text x={cx} y={cy + 85} textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                GÜNEY (Tepe Noktası - MC)
              </text>
              {/* KUZEY */}
              <text x={cx} y={cy - 380} textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                KUZEY
              </text>
            </g>

            {/* Visual Guide: Visible Sky vs Below Horizon Labels */}
            <text x={cx} y={cy - 20} textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
              · UFUK ÇİZGİSİ (Alt=0°) ·
            </text>

            {/* PROMINENT ASCENDANT HORIZON BEACON (Yükselen Burcun Ufukta Doğduğu Nokta) */}
            <g
              className="cursor-pointer group/asc"
              style={{
                transform: isAscRisingAnimated ? 'translateY(0px)' : 'translateY(35px)',
                opacity: isAscRisingAnimated ? 1 : 0.3,
                transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease',
              }}
              onClick={() => {
                setSelectedEntity({
                  name: `Yükselen Burç (ASC): ${chart.ascendant.sign.name}`,
                  type: 'Yükselen (ASC)',
                  subtitle: `Doğu Ufkunda Doğan Nokta (${chart.ascendant.degreeInSign}° ${chart.ascendant.minuteInSign}')`,
                  description: `Yükselen Burç, doğum anınızda (${chart.birthData.birthTime}) doğu ufkunda tam olarak yükselmekte olan burçtur. Bu gökyüzü simülasyonunda doğu ufkunda ${chart.ascendant.sign.name} burcu doğuyor ve dünyaya sunduğunuz vitrini, beden auranızı ve hayat enerjinizi temsil ediyor.`,
                  altitude: 0,
                  azimuth: 90,
                  color: '#fbbf24',
                });
              }}
            >
              {/* Dawn Sunrise Light Rays from East */}
              <circle cx={ascendantCoords.x} cy={ascendantCoords.y} r="42" fill="url(#ascDawnGlow)" className="animate-pulse" />
              
              {/* Horizon Beacon Ring */}
              <circle
                cx={ascendantCoords.x}
                cy={ascendantCoords.y}
                r="12"
                fill="#fbbf24"
                stroke="#ffffff"
                strokeWidth="2.5"
                className="group-hover/asc:scale-125 transition-transform origin-center"
              />
              <circle
                cx={ascendantCoords.x}
                cy={ascendantCoords.y}
                r="22"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="1.8"
                strokeDasharray="4 4"
                className="animate-spin"
                style={{ animationDuration: '7s' }}
              />

              {/* Rising Horizon Indicator Arrow */}
              <path
                d={`M ${ascendantCoords.x - 10} ${ascendantCoords.y + 28} L ${ascendantCoords.x} ${ascendantCoords.y + 16} L ${ascendantCoords.x + 10} ${ascendantCoords.y + 28}`}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="animate-bounce"
              />

              {/* Explicit East Ascendant Label Badge */}
              <rect
                x={ascendantCoords.x + 14}
                y={ascendantCoords.y - 24}
                width="215"
                height="46"
                rx="10"
                fill="#0b0f20"
                stroke="#fbbf24"
                strokeWidth="1.8"
                filter="drop-shadow(0 6px 14px rgba(0,0,0,0.85))"
              />
              <text x={ascendantCoords.x + 24} y={ascendantCoords.y - 7} fill="#fbbf24" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">
                🌅 DOĞU UFKU (ASC) · DOĞAN BURÇ
              </text>
              <text x={ascendantCoords.x + 24} y={ascendantCoords.y + 12} fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="serif">
                Yükselen: {chart.ascendant.sign.name} ({chart.ascendant.degreeInSign}°)
              </text>
            </g>

            {/* Major Sky Stars Plotted */}
            {chart.skyDomeStars.map((star, idx) => {
              const coords = getSkyCoords(star.altitude || 0, star.azimuth || 0);
              const isVisible = star.altitude !== undefined && star.altitude > -5;

              return (
                <g
                  key={idx}
                  className="cursor-pointer group"
                  onClick={() => {
                    setSelectedEntity({
                      name: star.name,
                      type: 'Yıldız',
                      subtitle: `${star.constellation} Takımyıldızı · Parlaklık: ${star.mag}`,
                      description: `${star.mythology} ${
                        isVisible
                          ? `Doğduğun anda ${chart.birthData.cityName} ufkunda ${Math.round(star.altitude || 0)}° yükseklikte parıldıyordu.`
                          : 'Doğduğun an ufkun altındaydı (Dünyanın diğer yarımküresini aydınlatıyordu).'
                      }`,
                      altitude: Math.round(star.altitude || 0),
                      azimuth: Math.round(star.azimuth || 0),
                      color: star.color,
                    });
                  }}
                >
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={isVisible ? (star.mag < 0 ? 8 : 5) : 3}
                    fill={star.color}
                    opacity={isVisible ? 0.9 : 0.25}
                    className="group-hover:scale-150 transition-transform origin-center"
                  />
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={isVisible ? (star.mag < 0 ? 14 : 9) : 4}
                    fill={star.color}
                    opacity={isVisible ? 0.2 : 0.05}
                  />
                  {isVisible && (
                    <text
                      x={coords.x}
                      y={coords.y - 8}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="9"
                      fontFamily="sans-serif"
                      opacity="0.8"
                      className="pointer-events-none group-hover:opacity-100 group-hover:fill-amber-300"
                    >
                      {star.name.split(' ')[0]}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Celestial Bodies: Sun, Moon, Planets Plotted on Sky Dome */}
            {[chart.sun, chart.moon, ...chart.planets].map((body) => {
              const coords = getSkyCoords(body.altitude || 0, body.azimuth || 0);
              const isAbove = (body.altitude || 0) >= 0;
              const isSun = body.id === 'sun';
              const isMoon = body.id === 'moon';

              return (
                <g
                  key={body.id}
                  className="cursor-pointer group"
                  onClick={() => {
                    setSelectedEntity({
                      name: `${body.name} (${body.symbol})`,
                      type: 'Gezegen',
                      subtitle: `${body.sign.name} Burcunda (${body.degreeInSign}° ${body.minuteInSign}') · ${body.house}. Ev`,
                      description: `${body.meaning} Doğduğun anda gökyüzünde İrtifa: ${Math.round(body.altitude || 0)}°, Azimut: ${Math.round(body.azimuth || 0)}° konumundaydı. ${
                        isAbove ? 'Ufkun üzerinde çıplak gözle görülebilirdi.' : 'Ufkun altındaydı.'
                      }`,
                      altitude: Math.round(body.altitude || 0),
                      azimuth: Math.round(body.azimuth || 0),
                      color: body.sign.elementColor,
                    });
                  }}
                >
                  {/* Sun or Moon specific halo */}
                  {isSun && isAbove && (
                    <circle cx={coords.x} cy={coords.y} r="28" fill="url(#sunGlow)" className="animate-pulse" />
                  )}

                  {/* Planet body disc */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={isSun ? 13 : isMoon ? 11 : 9}
                    fill={isSun ? '#f59e0b' : isMoon ? '#e2e8f0' : '#1e1b4b'}
                    stroke={body.sign.elementColor}
                    strokeWidth={isSun || isMoon ? '2.5' : '1.5'}
                    opacity={isAbove ? 1 : 0.4}
                    className="group-hover:scale-125 transition-transform origin-center"
                  />

                  {/* Body symbol text */}
                  <text
                    x={coords.x}
                    y={coords.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isSun ? '#451a03' : isMoon ? '#0f172a' : '#f8fafc'}
                    fontSize={isSun || isMoon ? '11' : '9.5'}
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {body.symbol}
                  </text>

                  {/* Label */}
                  <text
                    x={coords.x}
                    y={coords.y + 16}
                    textAnchor="middle"
                    fill={isAbove ? '#f8fafc' : '#64748b'}
                    fontSize="9"
                    fontFamily="sans-serif"
                    opacity={isAbove ? 0.9 : 0.6}
                    className="pointer-events-none group-hover:fill-amber-300"
                  >
                    {body.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Entity Details Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Gökyüzü Detayları
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Doğum Anı: {chart.birthData.birthTime}
            </span>
          </div>

          {selectedEntity ? (
            <div className="p-4 bg-slate-900/90 border border-amber-500/30 rounded-xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  {selectedEntity.type}
                </span>
                <span className="text-xs font-mono text-slate-300">
                  İrtifa: {selectedEntity.altitude}°
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-cinzel">
                  {selectedEntity.name}
                </h4>
                <p className="text-xs text-amber-200/80 font-mono mt-0.5">
                  {selectedEntity.subtitle}
                </p>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedEntity.description}
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Azimut: {selectedEntity.azimuth}°</span>
                <span className={selectedEntity.altitude >= 0 ? 'text-emerald-400' : 'text-slate-500'}>
                  {selectedEntity.altitude >= 0 ? '✓ Ufkun Üstünde' : 'Ufkun Altında'}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
                <Info className="w-4 h-4 text-amber-400" />
                <span>Gök Cisimlerini İnceleyin</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Haritadaki <strong>🌅 Doğu Ufku (ASC)</strong> noktasına, Güneş'e, Ay'a veya parlayan sabit yıldızlara tıklayarak o an gökyüzündeki gerçek konumlarını ve astrolojik etkilerini görüntüleyebilirsiniz.
              </p>
              <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Yükselen Burç:</span>
                  <span className="font-semibold text-amber-300">{chart.ascendant.sign.name} ({chart.ascendant.degreeInSign}°)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Güneş Konumu:</span>
                  <span className="font-semibold text-white">{chart.sun.sign.name} ({chart.sun.degreeInSign}°)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Ay Konumu:</span>
                  <span className="font-semibold text-white">{chart.moon.sign.name} ({chart.moon.degreeInSign}°)</span>
                </div>
              </div>
            </div>
          )}

          {/* Educational Quick Note */}
          <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-200/90 leading-relaxed">
            💡 <strong>Astrolog Notu:</strong> Ufkun üstündeki (0° ile 90° arası) gezegenler doğum anında gözle görülebilen bilinçli enerjilerdir; ufkun altındakiler ise bilinçaltı ve içsel potansiyelleri yönetir.
          </div>
        </div>
      </div>
    </div>
  );
};
