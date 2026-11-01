import React, { useState, useEffect } from 'react';
import { CelestialBody, NatalChartData, ZODIAC_SIGNS } from '../utils/astrologyCalc';
import { Info, Sparkles, Compass, Play, RotateCcw } from 'lucide-react';

interface NatalChartWheelProps {
  chart: NatalChartData;
  onSelectPlacement?: (item: { type: 'planet' | 'house'; data: any }) => void;
}

export const NatalChartWheel: React.FC<NatalChartWheelProps> = ({ chart }) => {
  const [hoveredPlanet, setHoveredPlanet] = useState<CelestialBody | null>(null);
  const [isGlided, setIsGlided] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    subtitle: string;
    description: string;
    badge: string;
  } | null>(null);

  // Trigger smooth glide-in animation when component mounts or birth data changes
  const triggerGlideAnimation = () => {
    setIsGlided(false);
    const timer = setTimeout(() => {
      setIsGlided(true);
    }, 120);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const cleanup = triggerGlideAnimation();
    return cleanup;
  }, [chart.birthData.birthDate, chart.birthData.birthTime, chart.birthData.cityName]);

  const cx = 250;
  const cy = 250;
  const rOuter = 230;
  const rSigns = 195;
  const rHouses = 160;
  const rPlanets = 125;
  const rAspects = 90;

  // Rotation offset: Orient Ascendant at the traditional 9 o'clock position (180°)
  const ascLon = chart.ascendant.longitude;
  const getScreenAngle = (eclipticLon: number) => {
    const angle = 180 - (eclipticLon - ascLon);
    return ((angle % 360) + 360) % 360;
  };

  const toXY = (angleDeg: number, radius: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  // Group all celestial bodies for plotting (including Sun, Moon, Planets, Nodes)
  const allPlotBodies: CelestialBody[] = [
    chart.sun,
    chart.moon,
    ...chart.planets,
    chart.northNode,
    chart.southNode,
  ];

  return (
    <div className="w-full bg-[#0b1021]/95 border border-amber-500/25 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl space-y-4">
      {/* Top Banner explaining hover interaction & Replay Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-amber-300 font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Animasyonlu Doğum Haritası Çarkı</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
            {isGlided ? '✓ Gezegenler Yerleşti' : 'Yerleşiyor...'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-[11px] font-mono hidden sm:inline">
            Gezegenin üzerine gelerek evi ve burcu görün
          </span>
          <button
            onClick={() => triggerGlideAnimation()}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 text-xs font-medium transition-all shadow-sm active:scale-95"
            title="Gezegenlerin çarka kayarak yerleşme animasyonunu yeniden izle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Yeniden Canlandır</span>
          </button>
        </div>
      </div>

      {/* Live hover notification pill (always clear above chart) */}
      <div className="min-h-[38px] flex items-center justify-center">
        {hoveredPlanet ? (
          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/25 via-purple-500/25 to-indigo-500/25 border border-amber-400/50 text-amber-200 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg animate-fadeIn">
            <span className="text-base">{hoveredPlanet.symbol}</span>
            <span>
              <strong>{hoveredPlanet.name} {hoveredPlanet.sign.name}'da, {hoveredPlanet.house}. ev</strong> ({hoveredPlanet.degreeInSign}° {hoveredPlanet.minuteInSign}')
            </span>
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>Çarkın üzerindeki gezegen sembollerinin üzerine gelin veya tıklayın</span>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* SVG Chart Wheel */}
        <div className="relative w-full max-w-[500px] aspect-square select-none flex items-center justify-center">
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full drop-shadow-[0_0_25px_rgba(245,158,11,0.18)] overflow-visible"
          >
            <defs>
              <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1e2238" />
                <stop offset="100%" stopColor="#080c1a" />
              </radialGradient>
              <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Background Disc */}
            <circle cx={cx} cy={cy} r={rOuter} fill="#060913" stroke="url(#goldRing)" strokeWidth="2" />
            <circle cx={cx} cy={cy} r={rAspects} fill="url(#hubGrad)" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

            {/* 12 Zodiac Sign Ring Sectors */}
            {ZODIAC_SIGNS.map((sign, idx) => {
              const startAngle = getScreenAngle(idx * 30);
              const endAngle = getScreenAngle((idx + 1) * 30);
              const midAngle = getScreenAngle(idx * 30 + 15);

              const p1 = toXY(startAngle, rOuter);
              const p2 = toXY(endAngle, rOuter);
              const p3 = toXY(endAngle, rSigns);
              const p4 = toXY(startAngle, rSigns);

              const glyphPos = toXY(midAngle, (rOuter + rSigns) / 2);

              return (
                <g key={sign.id} className="cursor-pointer group">
                  <path
                    d={`M ${p1.x} ${p1.y} A ${rOuter} ${rOuter} 0 0 0 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rSigns} ${rSigns} 0 0 1 ${p4.x} ${p4.y} Z`}
                    fill={idx % 2 === 0 ? 'rgba(30, 41, 59, 0.4)' : 'rgba(15, 23, 42, 0.6)'}
                    stroke="#1e293b"
                    strokeWidth="1"
                    className="hover:fill-amber-500/20 transition-colors"
                    onClick={() => {
                      setSelectedItem({
                        title: `${sign.name} Burcu (${sign.latinName})`,
                        subtitle: `${sign.element} Elementi · ${sign.modality} Nitelik · Yönetici: ${sign.ruler}`,
                        description: `Gök kubbede ${idx * 30}° - ${(idx + 1) * 30}° arasındaki dilim. Temel enerjisi: ${sign.polarity}.`,
                        badge: sign.symbol,
                      });
                    }}
                  />
                  <text
                    x={glyphPos.x}
                    y={glyphPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={sign.elementColor}
                    fontSize="17"
                    fontWeight="bold"
                    className="pointer-events-none group-hover:scale-110 transition-transform"
                  >
                    {sign.symbol}
                  </text>
                </g>
              );
            })}

            {/* 12 House Dividing Spokes and Labels */}
            {chart.houses.map((house) => {
              const houseAngle = getScreenAngle(house.longitude);
              const pInner = toXY(houseAngle, rAspects);
              const pOuter = toXY(houseAngle, rSigns);

              const midHouseAngle = getScreenAngle((house.longitude + 15) % 360);
              const labelPos = toXY(midHouseAngle, (rHouses + rAspects) / 2);

              const isAngleAxis = house.houseNumber === 1 || house.houseNumber === 7 || house.houseNumber === 4 || house.houseNumber === 10;

              return (
                <g key={`house-${house.houseNumber}`}>
                  {/* House Cusp Line */}
                  <line
                    x1={pInner.x}
                    y1={pInner.y}
                    x2={pOuter.x}
                    y2={pOuter.y}
                    stroke={isAngleAxis ? '#f59e0b' : '#334155'}
                    strokeWidth={isAngleAxis ? '2' : '1'}
                    strokeDasharray={isAngleAxis ? 'none' : '2 2'}
                  />
                  {/* House Number */}
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isAngleAxis ? '#fde68a' : '#94a3b8'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight={isAngleAxis ? 'bold' : 'normal'}
                    className="cursor-pointer hover:fill-amber-300"
                    onClick={() => {
                      setSelectedItem({
                        title: `${house.name} - ${house.sign.name} Burcunda`,
                        subtitle: house.theme,
                        description: `Bu ev ${house.sign.name} (${house.degreeInSign}° ${house.minuteInSign}') burcu tarafından kesilmektedir. Bu yaşam alanında ${house.sign.name} burcunun ${house.sign.element} enerjisiyle hareket edersiniz.`,
                        badge: `${house.houseNumber}. EV`,
                      });
                    }}
                  >
                    {house.houseNumber}
                  </text>
                </g>
              );
            })}

            {/* Ascendant & Descendant (ASC - DSC) Horizon Axis */}
            <g>
              <line
                x1={toXY(180, rOuter).x}
                y1={toXY(180, rOuter).y}
                x2={toXY(0, rOuter).x}
                y2={toXY(0, rOuter).y}
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeOpacity="0.85"
              />
              {/* ASC badge at 9 o'clock */}
              <text
                x={toXY(180, rOuter - 18).x}
                y={toXY(180, rOuter - 18).y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#fbbf24"
                fontSize="12"
                fontWeight="800"
              >
                ASC
              </text>
              {/* DSC badge at 3 o'clock */}
              <text
                x={toXY(0, rOuter - 18).x}
                y={toXY(0, rOuter - 18).y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#94a3b8"
                fontSize="11"
                fontWeight="600"
              >
                DSC
              </text>
            </g>

            {/* Aspect Lines in the center */}
            {chart.aspects.slice(0, 15).map((asp, aIdx) => {
              const b1 = allPlotBodies.find((b) => b.name === asp.planet1);
              const b2 = allPlotBodies.find((b) => b.name === asp.planet2);
              if (!b1 || !b2) return null;

              const p1 = toXY(getScreenAngle(b1.longitude), rAspects - 5);
              const p2 = toXY(getScreenAngle(b2.longitude), rAspects - 5);

              let aspColor = '#38bdf8';
              if (asp.type === 'Üçgen') aspColor = '#fbbf24';
              else if (asp.type === 'Kare') aspColor = '#ef4444';
              else if (asp.type === 'Karşıt') aspColor = '#a855f7';
              else if (asp.type === 'Kavuşum') aspColor = '#22c55e';

              return (
                <line
                  key={`asp-${aIdx}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={aspColor}
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                  className="hover:stroke-opacity-100 hover:stroke-width-2 transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedItem({
                      title: `${asp.planet1} ${asp.type} ${asp.planet2} (${asp.angle}°)`,
                      subtitle: `${asp.nature} Açı · Tolerans: ${asp.orb}°`,
                      description: asp.description,
                      badge: asp.type,
                    });
                  }}
                />
              );
            })}

            {/* Center Hub */}
            <circle cx={cx} cy={cy} r="6" fill="#f59e0b" />

            {/* ANIMATED GLIDING PLANETS PLOTTED USING CSS TRANSFORM TRANSLATE */}
            {allPlotBodies.map((body, bIdx) => {
              const targetAngle = getScreenAngle(body.longitude);
              // Slight radial jitter if planets are crowded
              const radiusOffset = (bIdx % 2 === 0 ? 0 : 8) * (bIdx % 3 === 0 ? -1 : 1);
              const finalRadius = rPlanets + radiusOffset;

              // Target position in the wheel
              const targetPos = toXY(targetAngle, finalRadius);

              // Initial spawn position: clustered at the center disk
              const spawnPos = toXY(180 + bIdx * 30, rAspects * 0.45);

              // Position based on isGlided state
              const currentX = isGlided ? targetPos.x : spawnPos.x;
              const currentY = isGlided ? targetPos.y : spawnPos.y;

              const isSunOrMoon = body.id === 'sun' || body.id === 'moon';
              const isHovered = hoveredPlanet?.id === body.id;

              return (
                <g
                  key={body.id}
                  className="cursor-pointer group"
                  style={{
                    transform: `translate(${currentX}px, ${currentY}px)`,
                    transition: 'transform 1.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
                    transitionDelay: isGlided ? `${bIdx * 65}ms` : '0ms',
                    opacity: isGlided ? 1 : 0.4,
                  }}
                  onMouseEnter={() => setHoveredPlanet(body)}
                  onMouseLeave={() => setHoveredPlanet(null)}
                  onClick={() => {
                    setSelectedItem({
                      title: `${body.name} (${body.symbol}) ${body.degreeInSign}° ${body.sign.name}`,
                      subtitle: `${body.house}. Evde Yerleşim ${body.isRetrograde ? '· Retrograd' : '· Düz Hareket'}`,
                      description: `${body.meaning} ${body.sign.name} burcunda olması, bu enerjinin ${body.sign.element} elementi ve ${body.sign.modality} niteliğiyle dışa vurulduğunu gösterir.`,
                      badge: body.symbol,
                    });
                  }}
                >
                  {/* Highlight connector line to wheel center when hovered */}
                  {isHovered && (
                    <line
                      x1={0}
                      y1={0}
                      x2={cx - currentX}
                      y2={cy - currentY}
                      stroke="#fbbf24"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      opacity="0.8"
                    />
                  )}

                  {/* Pulsing beacon ring on hover */}
                  {isHovered && (
                    <circle
                      cx={0}
                      cy={0}
                      r={isSunOrMoon ? 24 : 20}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="2"
                      className="animate-ping"
                      style={{ animationDuration: '1.2s' }}
                    />
                  )}

                  {/* Planet Disc */}
                  <circle
                    cx={0}
                    cy={0}
                    r={isSunOrMoon ? 15 : 12}
                    fill={isHovered ? '#1e1b4b' : '#0f172a'}
                    stroke={isHovered ? '#fbbf24' : body.sign.elementColor}
                    strokeWidth={isHovered ? '2.5' : isSunOrMoon ? '2' : '1.5'}
                    className="transition-all duration-300 shadow-xl"
                  />

                  {/* Planet Symbol Glyph */}
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isHovered ? '#fef08a' : '#f8fafc'}
                    fontSize={isSunOrMoon ? '14' : '11'}
                    fontWeight="bold"
                    className="pointer-events-none group-hover:scale-125 transition-transform"
                  >
                    {body.symbol}
                  </text>
                </g>
              );
            })}

            {/* ON-WHEEL HOVER TOOLTIP POPUP (Matches: “Güneş Aslan’da, 5. ev”) */}
            {hoveredPlanet && (() => {
              const targetAngle = getScreenAngle(hoveredPlanet.longitude);
              const pos = toXY(targetAngle, rPlanets);
              // Tooltip coordinates adjusted so it stays inside viewBox
              const ttX = Math.max(90, Math.min(410, pos.x));
              const ttY = pos.y < 110 ? pos.y + 40 : pos.y - 32;

              return (
                <g className="pointer-events-none transition-all duration-200" style={{ zIndex: 100 }}>
                  <rect
                    x={ttX - 110}
                    y={ttY - 15}
                    width="220"
                    height="30"
                    rx="15"
                    fill="#070a16"
                    stroke="#fbbf24"
                    strokeWidth="1.8"
                    filter="drop-shadow(0 6px 14px rgba(0,0,0,0.9))"
                  />
                  <text
                    x={ttX}
                    y={ttY + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#fef08a"
                    fontSize="11"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                  >
                    {hoveredPlanet.name} {hoveredPlanet.sign.name}’da, {hoveredPlanet.house}. ev
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Interactive Placement Detail / Legend Panel */}
        <div className="w-full lg:flex-1 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-semibold tracking-wider uppercase text-amber-200">
                Gezegen Çarkı Bilgi Paneli
              </h4>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {hoveredPlanet ? (
                <span className="text-amber-300 font-bold">
                  {hoveredPlanet.name} ({hoveredPlanet.symbol})
                </span>
              ) : (
                'Gezegenlere tıklayın veya üzerine gelin'
              )}
            </span>
          </div>

          {/* Dynamic Hover Card */}
          {hoveredPlanet && (
            <div className="p-4 bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-slate-900 border border-amber-400/40 rounded-xl space-y-2 shadow-lg animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono">
                  {hoveredPlanet.name} ({hoveredPlanet.symbol})
                </span>
                <span className="text-xs font-semibold text-slate-200">
                  {hoveredPlanet.house}. Ev Yerleşimi
                </span>
              </div>
              <h5 className="text-sm font-bold text-white font-cinzel">
                {hoveredPlanet.name} {hoveredPlanet.sign.name}’da, {hoveredPlanet.house}. ev ({hoveredPlanet.degreeInSign}° {hoveredPlanet.minuteInSign}')
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                {hoveredPlanet.meaning} Bu enerjinin {hoveredPlanet.house}. evde olması, hayatınızda doğrudan bu yaşam sahasını ve burcun {hoveredPlanet.sign.element} niteliğini aydınlatır.
              </p>
            </div>
          )}

          {/* Click Selected Item Card */}
          {selectedItem && !hoveredPlanet && (
            <div className="p-4 bg-slate-900/90 border border-amber-500/30 rounded-xl space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono">
                  {selectedItem.badge}
                </span>
              </div>
              <h5 className="text-sm font-bold text-white font-cinzel">
                {selectedItem.title}
              </h5>
              <p className="text-xs text-amber-200/80 font-mono">
                {selectedItem.subtitle}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          )}

          {/* Planet Placement Quick Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            {allPlotBodies.map((body) => {
              const isHov = hoveredPlanet?.id === body.id;
              return (
                <div
                  key={body.id}
                  onMouseEnter={() => setHoveredPlanet(body)}
                  onMouseLeave={() => setHoveredPlanet(null)}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                    isHov
                      ? 'bg-amber-500/20 border-amber-400 scale-[1.02] shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white flex items-center gap-1">
                      <span>{body.symbol}</span>
                      <span>{body.name}</span>
                    </span>
                    <span className="text-[10px] text-amber-300">{body.house}. Ev</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                    {body.sign.name} ({body.degreeInSign}°)
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
