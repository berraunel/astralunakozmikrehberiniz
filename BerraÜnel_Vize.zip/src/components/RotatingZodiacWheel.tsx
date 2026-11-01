import React, { useState } from 'react';
import { ZODIAC_SIGNS } from '../utils/astrologyCalc';
import { Sparkles } from 'lucide-react';

interface RotatingZodiacWheelProps {
  onSelectSign?: (signId: string) => void;
  className?: string;
  size?: number;
}

export const RotatingZodiacWheel: React.FC<RotatingZodiacWheelProps> = ({
  onSelectSign,
  className = '',
  size = 380,
}) => {
  const [hoveredSign, setHoveredSign] = useState<typeof ZODIAC_SIGNS[0] | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.44;
  const rInner = size * 0.32;
  const rCenter = size * 0.18;

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredSign(null);
      }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Subtle Ambient Cosmic Glow Behind Wheel */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/20 via-amber-500/15 to-indigo-600/20 blur-2xl pointer-events-none" />

        {/* Rotating SVG Ring */}
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className={`w-full h-full transition-transform duration-1000 ${
            isPaused ? '' : 'animate-[spin_70s_linear_infinite]'
          }`}
        >
          <defs>
            <radialGradient id="centerHubGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#25173e" />
              <stop offset="70%" stopColor="#11162d" />
              <stop offset="100%" stopColor="#080b17" />
            </radialGradient>

            <linearGradient id="goldFiligreeRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Outer Ornamental Circles */}
          <circle
            cx={cx}
            cy={cy}
            r={rOuter + 6}
            fill="none"
            stroke="url(#goldFiligreeRing)"
            strokeWidth="1.5"
            strokeDasharray="2 3"
          />
          <circle
            cx={cx}
            cy={cy}
            r={rOuter}
            fill="rgba(11, 14, 24, 0.7)"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeOpacity="0.8"
          />
          <circle
            cx={cx}
            cy={cy}
            r={rInner}
            fill="none"
            stroke="url(#goldFiligreeRing)"
            strokeWidth="1.5"
          />
          <circle
            cx={cx}
            cy={cy}
            r={rInner - 4}
            fill="none"
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray="1 3"
          />

          {/* 12 Dividing Spokes */}
          {ZODIAC_SIGNS.map((_, i) => {
            const rad = (i * 30 * Math.PI) / 180;
            const x1 = cx + rInner * Math.cos(rad);
            const y1 = cy + rInner * Math.sin(rad);
            const x2 = cx + rOuter * Math.cos(rad);
            const y2 = cy + rOuter * Math.sin(rad);

            return (
              <line
                key={`spoke-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#c084fc"
                strokeWidth="1"
                strokeOpacity="0.4"
              />
            );
          })}

          {/* 12 Zodiac Symbols placed around the rotating ring */}
          {ZODIAC_SIGNS.map((sign, idx) => {
            const angleDeg = idx * 30 + 15;
            const rad = (angleDeg * Math.PI) / 180;
            const rMid = (rOuter + rInner) / 2;
            const x = cx + rMid * Math.cos(rad);
            const y = cy + rMid * Math.sin(rad);

            const isHovered = hoveredSign?.id === sign.id;

            return (
              <g
                key={sign.id}
                className="cursor-pointer group"
                onClick={() => onSelectSign && onSelectSign(sign.id)}
                onMouseEnter={() => setHoveredSign(sign)}
              >
                {/* Symbol circle backer on hover */}
                <circle
                  cx={x}
                  cy={y}
                  r="14"
                  fill={isHovered ? 'rgba(251, 191, 36, 0.3)' : 'transparent'}
                  stroke={isHovered ? '#fbbf24' : 'transparent'}
                  strokeWidth="1.5"
                  className="transition-all"
                />

                {/* Glyphs */}
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isHovered ? '#ffffff' : sign.elementColor}
                  fontSize={size * 0.05}
                  fontWeight="bold"
                  className="transition-transform group-hover:scale-125"
                >
                  {sign.symbol}
                </text>
              </g>
            );
          })}

          {/* Inner Static Center Circle */}
          <circle
            cx={cx}
            cy={cy}
            r={rCenter}
            fill="url(#centerHubGrad)"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />

          {/* Center Mystic Celestial Eye / Sun Sigil */}
          <circle cx={cx} cy={cy} r="6" fill="#fbbf24" className="animate-pulse" />
          <circle cx={cx} cy={cy} r="16" fill="none" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3 3" />
        </svg>

        {/* Center Live Display Info (Overlayed so it doesn't spin!) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-28 text-center space-y-0.5">
            {hoveredSign ? (
              <div className="animate-fadeIn">
                <div className="text-xl font-bold" style={{ color: hoveredSign.elementColor }}>
                  {hoveredSign.symbol}
                </div>
                <div className="text-xs font-cinzel font-bold text-white leading-tight">
                  {hoveredSign.name}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-amber-300 font-mono">
                  {hoveredSign.element}
                </div>
              </div>
            ) : (
              <div className="opacity-80">
                <Sparkles className="w-4 h-4 mx-auto text-amber-300 animate-spin" style={{ animationDuration: '12s' }} />
                <div className="text-[10px] font-cinzel font-bold text-amber-200 mt-1">
                  12 ZODYAK
                </div>
                <div className="text-[8px] text-slate-400 uppercase tracking-widest font-mono">
                  KOZMİK ÇARK
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1.5 opacity-80">
        <span>Kadim Göksel Çark · Durdurmak ve incelemek için üzerine gelin</span>
      </div>
    </div>
  );
};
