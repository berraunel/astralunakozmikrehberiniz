import React from 'react';

interface StarNode {
  x: number;
  y: number;
  r?: number;
  label?: string;
  isMajor?: boolean;
}

interface ConstellationData {
  stars: StarNode[];
  lines: [number, number][]; // pairs of star indexes
  viewBox: string;
}

export const CONSTELLATIONS: Record<string, ConstellationData> = {
  aries: {
    viewBox: '0 0 100 80',
    stars: [
      { x: 80, y: 35, r: 2.8, label: 'Hamal', isMajor: true },
      { x: 55, y: 48, r: 2.4, label: 'Sheratan' },
      { x: 38, y: 55, r: 2.0, label: 'Mesarthim' },
      { x: 18, y: 58, r: 1.8 },
      { x: 68, y: 22, r: 1.6 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [0, 4],
    ],
  },
  taurus: {
    viewBox: '0 0 100 85',
    stars: [
      { x: 55, y: 52, r: 3.2, label: 'Aldebaran', isMajor: true },
      { x: 42, y: 45, r: 2.2, label: 'Ain' },
      { x: 48, y: 62, r: 2.0 },
      { x: 34, y: 55, r: 1.8 },
      { x: 75, y: 22, r: 2.4, label: 'Elnath' }, // North horn
      { x: 88, y: 40, r: 2.2, label: 'Tiangu' }, // South horn
      { x: 22, y: 30, r: 2.0, label: 'Pleiades' },
      { x: 20, y: 24, r: 1.4 },
      { x: 26, y: 26, r: 1.4 },
    ],
    lines: [
      [0, 1],
      [1, 3],
      [3, 2],
      [2, 0], // Hyades V
      [1, 4], // To North Horn
      [0, 5], // To South Horn
      [1, 6],
    ],
  },
  gemini: {
    viewBox: '0 0 100 90',
    stars: [
      { x: 30, y: 15, r: 3.0, label: 'Castor', isMajor: true },
      { x: 50, y: 18, r: 3.2, label: 'Pollux', isMajor: true },
      { x: 25, y: 35, r: 2.0 },
      { x: 45, y: 38, r: 2.0 },
      { x: 22, y: 58, r: 2.0 },
      { x: 42, y: 60, r: 2.0 },
      { x: 15, y: 80, r: 2.2, label: 'Alhena' },
      { x: 28, y: 82, r: 1.8 },
      { x: 48, y: 80, r: 2.0 },
      { x: 60, y: 76, r: 1.8 },
    ],
    lines: [
      [0, 2],
      [2, 4],
      [4, 6],
      [4, 7], // Castor body
      [1, 3],
      [3, 5],
      [5, 8],
      [5, 9], // Pollux body
      [2, 3], // Hands joined
      [0, 1], // Heads
    ],
  },
  cancer: {
    viewBox: '0 0 100 80',
    stars: [
      { x: 50, y: 40, r: 2.2, label: 'Praesepe', isMajor: true },
      { x: 35, y: 25, r: 2.0 },
      { x: 65, y: 25, r: 2.0 },
      { x: 48, y: 65, r: 2.4, label: 'Altarf' },
      { x: 30, y: 70, r: 1.8 },
      { x: 70, y: 68, r: 1.8, label: 'Acubens' },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [0, 3],
      [3, 4],
      [3, 5],
    ],
  },
  leo: {
    viewBox: '0 0 100 85',
    stars: [
      { x: 75, y: 65, r: 3.4, label: 'Regulus', isMajor: true },
      { x: 80, y: 45, r: 2.4, label: 'Algieba' },
      { x: 74, y: 32, r: 2.0, label: 'Adhafera' },
      { x: 62, y: 22, r: 2.0 },
      { x: 54, y: 30, r: 1.8 },
      { x: 50, y: 48, r: 2.4, label: 'Zosma' },
      { x: 52, y: 65, r: 2.2, label: 'Chertan' },
      { x: 20, y: 45, r: 2.8, label: 'Denebola', isMajor: true },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4], // Sickle head
      [1, 5], // Neck to back
      [5, 6],
      [6, 0], // Body loop
      [5, 7],
      [6, 7], // Hindquarters triangle to Denebola
    ],
  },
  virgo: {
    viewBox: '0 0 100 90',
    stars: [
      { x: 65, y: 72, r: 3.4, label: 'Spica', isMajor: true },
      { x: 58, y: 50, r: 2.4, label: 'Porrima' },
      { x: 48, y: 35, r: 2.2 },
      { x: 35, y: 20, r: 2.4, label: 'Vindemiatrix' },
      { x: 32, y: 45, r: 2.0 },
      { x: 22, y: 60, r: 2.0 },
      { x: 42, y: 70, r: 2.2, label: 'Heze' },
      { x: 78, y: 55, r: 1.8 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3], // Spine to head
      [2, 4],
      [4, 5], // Wing / arm
      [1, 6],
      [6, 0], // Torso loop
      [0, 7], // Wheat sheaf
    ],
  },
  libra: {
    viewBox: '0 0 100 80',
    stars: [
      { x: 48, y: 20, r: 3.0, label: 'Zubeneschamali', isMajor: true },
      { x: 22, y: 48, r: 3.0, label: 'Zubenelgenubi', isMajor: true },
      { x: 74, y: 45, r: 2.4 },
      { x: 55, y: 68, r: 2.2, label: 'Brachium' },
      { x: 20, y: 65, r: 1.8 },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3], // Main Diamond
      [1, 4], // Left pan
    ],
  },
  scorpio: {
    viewBox: '0 0 100 95',
    stars: [
      { x: 80, y: 20, r: 2.4, label: 'Graffias' },
      { x: 78, y: 30, r: 2.2, label: 'Dschubba' },
      { x: 70, y: 40, r: 3.4, label: 'Antares', isMajor: true },
      { x: 60, y: 52, r: 2.2 },
      { x: 50, y: 65, r: 2.2 },
      { x: 42, y: 78, r: 2.2 },
      { x: 32, y: 85, r: 2.4 },
      { x: 20, y: 80, r: 2.6, label: 'Shaula', isMajor: true },
      { x: 18, y: 70, r: 2.2, label: 'Lesath' },
      { x: 86, y: 15, r: 1.8 },
      { x: 86, y: 38, r: 1.8 },
    ],
    lines: [
      [9, 0],
      [0, 1],
      [1, 10], // Claws
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7], // J-Tail
      [7, 8], // Stinger tip
    ],
  },
  sagittarius: {
    viewBox: '0 0 100 85',
    stars: [
      { x: 68, y: 35, r: 2.4, label: 'Kaus Borealis' },
      { x: 80, y: 50, r: 2.8, label: 'Kaus Media' },
      { x: 72, y: 68, r: 3.2, label: 'Kaus Australis', isMajor: true },
      { x: 52, y: 62, r: 2.2, label: 'Ascella' },
      { x: 40, y: 45, r: 3.0, label: 'Nunki', isMajor: true },
      { x: 42, y: 28, r: 2.0 },
      { x: 55, y: 38, r: 2.2 },
      { x: 22, y: 40, r: 2.2, label: 'Rukbat' },
      { x: 92, y: 48, r: 2.0, label: 'Alnasl' }, // Teapot Spout
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 0], // Teapot lid & body
      [0, 6],
      [3, 6],
      [1, 8],
      [2, 8], // Spout
      [4, 7], // Handle
    ],
  },
  capricorn: {
    viewBox: '0 0 100 80',
    stars: [
      { x: 18, y: 32, r: 2.6, label: 'Algedi' },
      { x: 26, y: 38, r: 2.6, label: 'Dabih' },
      { x: 45, y: 62, r: 2.0 },
      { x: 65, y: 65, r: 2.0 },
      { x: 82, y: 42, r: 2.4, label: 'Nashira' },
      { x: 88, y: 32, r: 3.0, label: 'Deneb Algedi', isMajor: true },
      { x: 50, y: 25, r: 1.8 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5], // Triangle bottom
      [5, 6],
      [6, 0], // Top rim
      [1, 6],
    ],
  },
  aquarius: {
    viewBox: '0 0 100 85',
    stars: [
      { x: 30, y: 22, r: 3.0, label: 'Sadalmelik', isMajor: true },
      { x: 45, y: 28, r: 3.0, label: 'Sadalsuud', isMajor: true },
      { x: 20, y: 38, r: 2.2 },
      { x: 32, y: 42, r: 2.0 },
      { x: 48, y: 48, r: 2.2 },
      { x: 65, y: 58, r: 2.4, label: 'Skat' },
      { x: 78, y: 68, r: 2.0 },
      { x: 85, y: 78, r: 2.2 },
      { x: 55, y: 75, r: 1.8 },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [2, 3], // Urn
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7], // Stream 1
      [4, 8], // Stream 2
    ],
  },
  pisces: {
    viewBox: '0 0 100 85',
    stars: [
      { x: 22, y: 70, r: 3.2, label: 'Alrescha', isMajor: true }, // Knot
      { x: 32, y: 55, r: 2.0 },
      { x: 42, y: 40, r: 2.0 },
      { x: 58, y: 28, r: 2.2 },
      { x: 72, y: 25, r: 2.4 }, // North Fish
      { x: 80, y: 32, r: 2.0 },
      { x: 68, y: 38, r: 1.8 },
      { x: 28, y: 78, r: 2.0 },
      { x: 48, y: 76, r: 2.2 },
      { x: 72, y: 68, r: 2.4 }, // West Fish
      { x: 82, y: 75, r: 2.0 },
      { x: 70, y: 82, r: 1.8 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 3], // North Ribbon & Circlet
      [0, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 9], // West Ribbon & Circlet
    ],
  },
};

interface ConstellationSvgProps {
  signId: string;
  className?: string;
  color?: string;
  glowColor?: string;
  animate?: boolean;
}

export const ConstellationSvg: React.FC<ConstellationSvgProps> = ({
  signId,
  className = 'w-full h-28',
  color = '#fde047',
  glowColor = 'rgba(253, 224, 71, 0.4)',
  animate = true,
}) => {
  const data = CONSTELLATIONS[signId] || CONSTELLATIONS.aries;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox={data.viewBox}
        className="w-full h-full overflow-visible drop-shadow-[0_0_12px_rgba(253,224,71,0.3)]"
      >
        <defs>
          <filter id={`glow-${signId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Constellation Connecting Lines */}
        {data.lines.map(([idx1, idx2], lIdx) => {
          const s1 = data.stars[idx1];
          const s2 = data.stars[idx2];
          if (!s1 || !s2) return null;

          return (
            <line
              key={`line-${lIdx}`}
              x1={s1.x}
              y1={s1.y}
              x2={s2.x}
              y2={s2.y}
              stroke={color}
              strokeWidth="0.9"
              strokeOpacity="0.55"
              strokeDasharray={lIdx % 3 === 0 ? 'none' : 'none'}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Stars */}
        {data.stars.map((star, sIdx) => {
          const radius = star.r || 2;
          const isMajor = star.isMajor;

          return (
            <g key={`star-${sIdx}`} className="group/star">
              {/* Star Outer Glow */}
              <circle
                cx={star.x}
                cy={star.y}
                r={radius * (isMajor ? 2.4 : 1.8)}
                fill={glowColor}
                filter={`url(#glow-${signId})`}
                className={animate ? 'animate-pulse' : ''}
                style={{ animationDuration: `${2 + (sIdx % 3)}s` }}
              />

              {/* Star Core Point */}
              <circle
                cx={star.x}
                cy={star.y}
                r={radius}
                fill="#ffffff"
                stroke={color}
                strokeWidth={isMajor ? '1' : '0.5'}
              />

              {/* Major Star 4-Point Ray */}
              {isMajor && (
                <path
                  d={`M ${star.x} ${star.y - radius * 2.2} L ${star.x} ${star.y + radius * 2.2} M ${star.x - radius * 2.2} ${star.y} L ${star.x + radius * 2.2} ${star.y}`}
                  stroke="#ffffff"
                  strokeWidth="0.6"
                  strokeOpacity="0.8"
                />
              )}

              {/* Star Name Label (if available) */}
              {star.label && (
                <text
                  x={star.x}
                  y={star.y - radius - 3}
                  textAnchor="middle"
                  fill="#fef08a"
                  fontSize="4.5"
                  fontFamily="sans-serif"
                  fontWeight="600"
                  opacity="0.75"
                  className="pointer-events-none tracking-tight"
                >
                  {star.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
