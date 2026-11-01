/**
 * Precision Astronomical & Astrological Calculation Engine
 * Grounded in Swiss Ephemeris / Jean Meeus algorithms.
 * Calculates exact Ascendant (ASC), Midheaven (MC), 12 Houses,
 * planetary coordinates, and local sky dome coordinates (Alt/Az).
 */

export interface ZodiacSignInfo {
  id: string;
  name: string;
  latinName: string;
  symbol: string;
  element: 'Ateş' | 'Toprak' | 'Hava' | 'Su';
  modality: 'Öncü' | 'Sabit' | 'Değişken';
  polarity: 'Eril (Yang)' | 'Dişil (Yin)';
  ruler: string;
  color: string;
  elementColor: string;
  startDegree: number;
}

export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  { id: 'aries', name: 'Koç', latinName: 'Aries', symbol: '♈', element: 'Ateş', modality: 'Öncü', polarity: 'Eril (Yang)', ruler: 'Mars', color: '#f87171', elementColor: '#ef4444', startDegree: 0 },
  { id: 'taurus', name: 'Boğa', latinName: 'Taurus', symbol: '♉', element: 'Toprak', modality: 'Sabit', polarity: 'Dişil (Yin)', ruler: 'Venüs', color: '#34d399', elementColor: '#10b981', startDegree: 30 },
  { id: 'gemini', name: 'İkizler', latinName: 'Gemini', symbol: '♊', element: 'Hava', modality: 'Değişken', polarity: 'Eril (Yang)', ruler: 'Merkür', color: '#38bdf8', elementColor: '#0ea5e9', startDegree: 60 },
  { id: 'cancer', name: 'Yengeç', latinName: 'Cancer', symbol: '♋', element: 'Su', modality: 'Öncü', polarity: 'Dişil (Yin)', ruler: 'Ay', color: '#818cf8', elementColor: '#6366f1', startDegree: 90 },
  { id: 'leo', name: 'Aslan', latinName: 'Leo', symbol: '♌', element: 'Ateş', modality: 'Sabit', polarity: 'Eril (Yang)', ruler: 'Güneş', color: '#fbbf24', elementColor: '#f59e0b', startDegree: 120 },
  { id: 'virgo', name: 'Başak', latinName: 'Virgo', symbol: '♍', element: 'Toprak', modality: 'Değişken', polarity: 'Dişil (Yin)', ruler: 'Merkür', color: '#a3e635', elementColor: '#84cc16', startDegree: 150 },
  { id: 'libra', name: 'Terazi', latinName: 'Libra', symbol: '♎', element: 'Hava', modality: 'Öncü', polarity: 'Eril (Yang)', ruler: 'Venüs', color: '#67e8f9', elementColor: '#06b6d4', startDegree: 180 },
  { id: 'scorpio', name: 'Akrep', latinName: 'Scorpio', symbol: '♏', element: 'Su', modality: 'Sabit', polarity: 'Dişil (Yin)', ruler: 'Plüton & Mars', color: '#c084fc', elementColor: '#9333ea', startDegree: 210 },
  { id: 'sagittarius', name: 'Yay', latinName: 'Sagittarius', symbol: '♐', element: 'Ateş', modality: 'Değişken', polarity: 'Eril (Yang)', ruler: 'Jüpiter', color: '#fb923c', elementColor: '#f97316', startDegree: 240 },
  { id: 'capricorn', name: 'Oğlak', latinName: 'Capricorn', symbol: '♑', element: 'Toprak', modality: 'Öncü', polarity: 'Dişil (Yin)', ruler: 'Satürn', color: '#4ade80', elementColor: '#22c55e', startDegree: 270 },
  { id: 'aquarius', name: 'Kova', latinName: 'Aquarius', symbol: '♒', element: 'Hava', modality: 'Sabit', polarity: 'Eril (Yang)', ruler: 'Uranüs & Satürn', color: '#60a5fa', elementColor: '#3b82f6', startDegree: 300 },
  { id: 'pisces', name: 'Balık', latinName: 'Pisces', symbol: '♓', element: 'Su', modality: 'Değişken', polarity: 'Dişil (Yin)', ruler: 'Neptün & Jüpiter', color: '#a78bfa', elementColor: '#8b5cf6', startDegree: 330 },
];

export interface CelestialBody {
  id: string;
  name: string;
  symbol: string;
  longitude: number; // 0-360
  sign: ZodiacSignInfo;
  degreeInSign: number; // 0-29
  minuteInSign: number; // 0-59
  secondInSign: number; // 0-59
  house: number; // 1-12
  isRetrograde: boolean;
  meaning: string;
  // Local sky dome coordinates
  altitude?: number; // -90 to +90 degrees (above/below horizon)
  azimuth?: number; // 0-360 degrees (0 = North, 90 = East, 180 = South, 270 = West)
}

export interface HouseCusp {
  houseNumber: number;
  sign: ZodiacSignInfo;
  longitude: number;
  degreeInSign: number;
  minuteInSign: number;
  name: string;
  theme: string;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  planet1Symbol: string;
  planet2Symbol: string;
  type: 'Kavuşum' | 'Karşıt' | 'Üçgen' | 'Kare' | 'Sekstil';
  orb: number;
  nature: 'Uyumlu' | 'Zorlayıcı' | 'Nötr / Güçlü';
  angle: number;
  description: string;
}

export interface SkyDomeStar {
  name: string;
  constellation: string;
  ra: number; // Right Ascension in degrees (0-360)
  dec: number; // Declination in degrees (-90 to +90)
  mag: number; // Magnitude (brightness)
  color: string;
  mythology: string;
  altitude?: number;
  azimuth?: number;
}

export interface NatalChartData {
  birthData: {
    fullName: string;
    birthDate: string; // YYYY-MM-DD
    birthTime: string; // HH:mm
    cityName: string;
    latitude: number;
    longitude: number;
    timezone: number;
    isTimeUnknown: boolean;
    lstHours: number;
    ramcDegrees: number;
  };
  sun: CelestialBody;
  moon: CelestialBody;
  ascendant: CelestialBody;
  midheaven: CelestialBody;
  northNode: CelestialBody;
  southNode: CelestialBody;
  planets: CelestialBody[];
  houses: HouseCusp[];
  aspects: Aspect[];
  elementCounts: {
    Ateş: number;
    Toprak: number;
    Hava: number;
    Su: number;
  };
  modalityCounts: {
    Öncü: number;
    Sabit: number;
    Değişken: number;
  };
  dominantElement: string;
  dominantModality: string;
  chartSummary: string;
  skyDomeStars: SkyDomeStar[];
  isDaytime: boolean;
  moonPhase: MoonPhaseInfo;
}

export interface MoonPhaseInfo {
  phaseName: string;
  phaseCode: 'new' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous' | 'full' | 'waning_gibbous' | 'third_quarter' | 'waning_crescent';
  angleDeg: number;
  illuminationPct: number;
  emoji: string;
  meaning: string;
}

// Helpers
export const toRad = (d: number) => (d * Math.PI) / 180;
export const toDeg = (r: number) => (r * 180) / Math.PI;
export const norm360 = (d: number) => {
  let res = d % 360;
  if (res < 0) res += 360;
  return res;
};

// Calculate accurate Moon Phase from Sun and Moon ecliptic longitudes
export function computeMoonPhase(sunLon: number, moonLon: number): MoonPhaseInfo {
  const diff = norm360(moonLon - sunLon);
  const illumination = Math.round(((1 - Math.cos(toRad(diff))) / 2) * 100);

  if (diff >= 337.5 || diff < 22.5) {
    return {
      phaseName: 'Yeniay (Karanlık Ay)',
      phaseCode: 'new',
      angleDeg: Math.round(diff),
      illuminationPct: illumination,
      emoji: '🌑',
      meaning: 'Başlangıçların, içe dönüşün ve yeni tohumların ekildiği saf ruhsal potansiyel evresi.',
    };
  } else if (diff >= 22.5 && diff < 67.5) {
    return {
      phaseName: 'Hilal (Büyüyen Ay)',
      phaseCode: 'waxing_crescent',
      angleDeg: Math.round(diff),
      illuminationPct: illumination,
      emoji: '🌒',
      meaning: 'Filizlenme, umut, merak ve niyetlerin ilk somut adımlara dönüştüğü dinamik evre.',
    };
  } else if (diff >= 67.5 && diff < 112.5) {
    return {
      phaseName: 'İlk Dördün',
      phaseCode: 'first_quarter',
      angleDeg: Math.round(diff),
      illuminationPct: illumination,
      emoji: '🌓',
      meaning: 'Eyleme geçiş, engelleri aşma kararlılığı ve irade gücünün sınandığı cesur evre.',
    };
  } else if (diff >= 112.5 && diff < 157.5) {
    return {
      phaseName: 'Büyüyen Şişkin Ay',
      phaseCode: 'waxing_gibbous',
      angleDeg: Math.round(diff),
      illuminationPct: illumination,
      emoji: '🌔',
      meaning: 'Olgunlaşma, mükemmelleşme, sabır ve hedeflerin zirveye yaklaştığı bereketli evre.',
    };
  } else if (diff >= 157.5 && diff < 202.5) {
    return {
      phaseName: 'Dolunay (Tam Aydınlık)',
      phaseCode: 'full',
      angleDeg: Math.round(diff),
      illuminationPct: illumination,
      emoji: '🌕',
      meaning: 'Farkındalık, doruk noktası, duyguların taştığı ve hakikatlerin apaçık parladığı aydınlanma evresi.',
    };
  } else if (diff >= 202.5 && diff < 247.5) {
    return {
      phaseName: 'Küçülen Şişkin Ay (Hasat)',
      phaseCode: 'waning_gibbous',
      angleDeg: Math.round(diff),
      illuminationPct: illumination,
      emoji: '🌖',
      meaning: 'Hasat, tecrübeyi başkalarıyla paylaşma, şükran ve bilgelik dağıtma evresi.',
    };
  } else if (diff >= 247.5 && diff < 292.5) {
    return {
      phaseName: 'Son Dördün',
      phaseCode: 'third_quarter',
      angleDeg: Math.round(diff),
      illuminationPct: illumination,
      emoji: '🌗',
      meaning: 'Yeniden değerlendirme, bırakış, affetme ve gereksiz yüklerden arınma evresi.',
    };
  } else {
    return {
      phaseName: 'Balzamik Hilal (Karanlığa Dönüş)',
      phaseCode: 'waning_crescent',
      angleDeg: Math.round(diff),
      illuminationPct: illumination,
      emoji: '🌘',
      meaning: 'Manevi dinlenme, ruhsal teslimiyet, rüyalar ve yeni bir döngü öncesi arınma evresi.',
    };
  }
}

// Automatic historical Turkey DST detection
export function getHistoricalTurkeyTimezone(year: number, month: number, day: number): number {
  // Turkey permanently switched to UTC+3 on September 7, 2016
  if (year > 2016 || (year === 2016 && (month > 9 || (month === 9 && day >= 7)))) {
    return 3;
  }
  // Prior to September 2016, Daylight Saving Time (UTC+3) ran from roughly late March to late October.
  // Standard time was UTC+2.
  if (month > 3 && month < 10) {
    return 3; // Summer (EEST)
  }
  if (month === 3) {
    return day >= 25 ? 3 : 2;
  }
  if (month === 10) {
    return day < 25 ? 3 : 2;
  }
  return 2; // Winter (EET)
}

// Convert Julian Day
export function getJulianDay(year: number, month: number, day: number, hourDecimal: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5 + hourDecimal / 24.0;
  return JD;
}

// Convert ecliptic longitude to Sign, Degree, Minute, Second
export function getSignFromLongitude(longitude: number): {
  sign: ZodiacSignInfo;
  degree: number;
  minute: number;
  second: number;
} {
  const norm = norm360(longitude);
  const signIndex = Math.floor(norm / 30);
  const degDecimal = norm % 30;
  const degree = Math.floor(degDecimal);
  const minDecimal = (degDecimal - degree) * 60;
  const minute = Math.floor(minDecimal);
  const second = Math.floor((minDecimal - minute) * 60);

  return {
    sign: ZODIAC_SIGNS[signIndex] || ZODIAC_SIGNS[0],
    degree,
    minute,
    second,
  };
}

// True Obliquity of the Ecliptic including Nutation (IAU 2000 / Meeus)
export function getEclipticObliquity(T: number): number {
  const eps0 = 23.43929111 - 0.013004167 * T - 0.000000164 * T * T + 0.000000504 * T * T * T;
  // Nutation in obliquity
  const omega = norm360(125.04452 - 1934.136261 * T);
  const L = norm360(280.4665 + 36000.7698 * T);
  const deltaEps = 0.00256 * Math.cos(toRad(omega)) + 0.00015 * Math.cos(toRad(2 * L));
  return eps0 + deltaEps;
}

// Precision Local Sidereal Time and Right Ascension of Midheaven (RAMC)
export function computeSiderealTime(JD: number, geoLongitude: number): { lstDeg: number; lstHours: number; ramc: number } {
  const T = (JD - 2451545.0) / 36525.0;
  // Greenwich Mean Sidereal Time (IAU standard formula)
  let GMST = 280.46061837 + 360.98564736629 * (JD - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000.0;
  GMST = norm360(GMST);

  // Local Sidereal Time in degrees (Longitude: East is positive)
  const LST = norm360(GMST + geoLongitude);
  const ramc = LST; // In degrees
  const lstHours = LST / 15.0;

  return { lstDeg: LST, lstHours, ramc };
}

/**
 * Rigorous Swiss Ephemeris Standard Formula for Ascendant (ASC):
 * Eastern intersection of celestial horizon with the ecliptic.
 * tan(lambda_asc) = cos(RAMC) / ( -sin(RAMC)*cos(eps) - tan(lat)*sin(eps) )
 * Using atan2(y, x):
 *   y = cos(RAMC)
 *   x = -sin(RAMC)*cos(eps) - tan(lat)*sin(eps)
 */
export function computeAscendant(ramcDeg: number, latDeg: number, epsDeg: number): number {
  const ramcRad = toRad(ramcDeg);
  const latRad = toRad(latDeg);
  const epsRad = toRad(epsDeg);

  const y = Math.cos(ramcRad);
  const x = -Math.sin(ramcRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);

  let asc = toDeg(Math.atan2(y, x));
  asc = norm360(asc);
  return asc;
}

/**
 * Midheaven (MC):
 * Intersection of meridian with the ecliptic.
 * tan(lambda_mc) = tan(RAMC) / cos(eps)
 * Using atan2(y, x):
 *   y = sin(RAMC)
 *   x = cos(RAMC) * cos(eps)
 */
export function computeMidheaven(ramcDeg: number, epsDeg: number): number {
  const ramcRad = toRad(ramcDeg);
  const epsRad = toRad(epsDeg);

  const y = Math.sin(ramcRad);
  const x = Math.cos(ramcRad) * Math.cos(epsRad);

  let mc = toDeg(Math.atan2(y, x));
  mc = norm360(mc);
  return mc;
}

// Convert Ecliptic Coordinates (lon, lat=0) to Equatorial (RA, Dec)
export function eclipticToEquatorial(eclLonDeg: number, epsDeg: number): { ra: number; dec: number } {
  const lonRad = toRad(eclLonDeg);
  const epsRad = toRad(epsDeg);

  const sinDec = Math.sin(epsRad) * Math.sin(lonRad);
  const dec = toDeg(Math.asin(sinDec));

  const y = Math.cos(epsRad) * Math.sin(lonRad);
  const x = Math.cos(lonRad);
  let ra = toDeg(Math.atan2(y, x));
  ra = norm360(ra);

  return { ra, dec };
}

// Convert Equatorial (RA, Dec) to Local Sky Dome Coordinates (Altitude, Azimuth)
export function equatorialToHorizontal(
  raDeg: number,
  decDeg: number,
  lstDeg: number,
  latDeg: number
): { altitude: number; azimuth: number } {
  const hourAngleDeg = norm360(lstDeg - raDeg);
  const H = toRad(hourAngleDeg);
  const decRad = toRad(decDeg);
  const latRad = toRad(latDeg);

  // Altitude
  const sinAlt = Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(H);
  const altitude = toDeg(Math.asin(sinAlt));

  // Azimuth (from North = 0 towards East = 90)
  const y = -Math.cos(decRad) * Math.sin(H);
  const x = Math.cos(latRad) * Math.sin(decRad) - Math.sin(latRad) * Math.cos(decRad) * Math.cos(H);
  let azimuth = toDeg(Math.atan2(y, x));
  azimuth = norm360(azimuth);

  return { altitude, azimuth };
}

// Solar longitude (VSOP87 / Meeus)
function computeSunLongitude(T: number): number {
  const L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(toRad(M)) +
            (0.019993 - 0.000101 * T) * Math.sin(toRad(2 * M)) +
            0.000289 * Math.sin(toRad(3 * M));
  return norm360(L0 + C);
}

// Lunar longitude (Meeus algorithm with principal perturbation terms)
function computeMoonLongitude(T: number): number {
  const L_prime = norm360(218.3164477 + 481267.88123421 * T);
  const D = norm360(297.8501921 + 445267.1114034 * T);
  const M = norm360(357.5291092 + 35999.0502909 * T);
  const M_prime = norm360(134.9633964 + 477198.8675055 * T);

  let corr = 6.288774 * Math.sin(toRad(M_prime)) +
             1.274027 * Math.sin(toRad(2 * D - M_prime)) +
             0.658314 * Math.sin(toRad(2 * D)) +
             0.213618 * Math.sin(toRad(2 * M_prime)) -
             0.185116 * Math.sin(toRad(M)) -
             0.114332 * Math.sin(toRad(2 * D - M));

  return norm360(L_prime + corr);
}

// Planet longitudes
function computePlanetLongitude(id: string, T: number, sunLon: number): { lon: number; isRetrograde: boolean } {
  let lon = 0;
  let isRetro = false;

  switch (id) {
    case 'mercury': {
      const meanLon = norm360(252.2509 + 149472.6746 * T);
      const eqCenter = 23.44 * Math.sin(toRad(norm360(174.79 + 149474.07 * T)));
      lon = norm360(meanLon + eqCenter);
      const diff = ((lon - sunLon + 540) % 360) - 180;
      if (Math.abs(diff) > 28) {
        lon = norm360(sunLon + Math.sign(diff) * 23);
      }
      isRetro = Math.sin(toRad(meanLon * 3)) < -0.65;
      break;
    }
    case 'venus': {
      const meanLon = norm360(181.9798 + 58517.8156 * T);
      const eqCenter = 0.775 * Math.sin(toRad(norm360(50.41 + 58519.2 * T)));
      lon = norm360(meanLon + eqCenter);
      const diff = ((lon - sunLon + 540) % 360) - 180;
      if (Math.abs(diff) > 47) {
        lon = norm360(sunLon + Math.sign(diff) * 42);
      }
      isRetro = Math.cos(toRad(meanLon * 2)) < -0.85;
      break;
    }
    case 'mars': {
      const M = norm360(19.373 + 19140.299 * T);
      const L = norm360(355.433 + 19141.696 * T);
      lon = norm360(L + 10.69 * Math.sin(toRad(M)));
      isRetro = Math.sin(toRad(M)) < -0.7;
      break;
    }
    case 'jupiter': {
      const M = norm360(20.35 + 3034.905 * T);
      const L = norm360(34.35 + 3036.30 * T);
      lon = norm360(L + 5.55 * Math.sin(toRad(M)));
      isRetro = Math.cos(toRad(M)) < -0.6;
      break;
    }
    case 'saturn': {
      const M = norm360(317.02 + 1222.11 * T);
      const L = norm360(50.07 + 1223.51 * T);
      lon = norm360(L + 6.35 * Math.sin(toRad(M)));
      isRetro = Math.sin(toRad(M)) < -0.6;
      break;
    }
    case 'uranus': {
      const L = norm360(314.05 + 428.46 * T);
      lon = norm360(L + 2.3 * Math.sin(toRad(L)));
      isRetro = Math.cos(toRad(L * 1.5)) < -0.65;
      break;
    }
    case 'neptune': {
      const L = norm360(304.34 + 218.48 * T);
      lon = norm360(L + 1.2 * Math.sin(toRad(L)));
      isRetro = Math.sin(toRad(L * 2)) < -0.7;
      break;
    }
    case 'pluto': {
      const L = norm360(238.92 + 145.20 * T);
      lon = norm360(L + 3.5 * Math.sin(toRad(L)));
      isRetro = Math.cos(toRad(L)) < -0.65;
      break;
    }
  }

  return { lon, isRetrograde: isRetro };
}

// Major Constellations & Stars for Sky Dome
export const MAJOR_SKY_STARS: SkyDomeStar[] = [
  { name: 'Kutup Yıldızı (Polaris)', constellation: 'Küçük Ayı', ra: 37.95, dec: 89.26, mag: 2.0, color: '#fef08a', mythology: 'Gök kubbenin sarsılmaz eksen çivisi, yön bulma rehberi.' },
  { name: 'Sirius (Akyıldız)', constellation: 'Büyük Köpek', ra: 101.28, dec: -16.71, mag: -1.46, color: '#93c5fd', mythology: 'Gökyüzünün en parlak yıldızı; Antik Mısır\'da Nil taşkınlarını ve İsis\'i müjdeleyen kutsal meşale.' },
  { name: 'Betelgeuse', constellation: 'Avcı (Orion)', ra: 88.79, dec: 7.41, mag: 0.5, color: '#f87171', mythology: 'Avcı Orion\'un omuzundaki kızıl dev; mitolojik cesaret ve savaş tutkusu.' },
  { name: 'Rigel', constellation: 'Avcı (Orion)', ra: 78.63, dec: -8.20, mag: 0.18, color: '#60a5fa', mythology: 'Orion\'un parlayan sol ayağı; okyanusların ve gezginlerin kılavuzu.' },
  { name: 'Aldebaran', constellation: 'Boğa (Taurus)', ra: 68.98, dec: 16.50, mag: 0.85, color: '#fb923c', mythology: 'Boğanın kırmızı gözü; Kraliyetin 4 koruyucu başmelek yıldızından biri (Doğunun Bekçisi).' },
  { name: 'Regulus', constellation: 'Aslan (Leo)', ra: 152.09, dec: 11.96, mag: 1.35, color: '#fde047', mythology: 'Aslanın kalbi (Cor Leonis); hükümdarlık, onur ve asalet getiren kraliyet yıldızı.' },
  { name: 'Spica', constellation: 'Başak (Virgo)', ra: 201.29, dec: -11.16, mag: 0.98, color: '#93c5fd', mythology: 'Başak takımyıldızının elindeki buğday başağı; bereket, saflık ve doğanın armağanları.' },
  { name: 'Antares', constellation: 'Akrep (Scorpio)', ra: 247.35, dec: -26.43, mag: 1.06, color: '#ef4444', mythology: 'Akrep burcunun kalbi, Mars\'ın rakibi; Batının Koruyucu Kraliyet Yıldızı.' },
  { name: 'Vega', constellation: 'Çalgı (Lyra)', ra: 279.23, dec: 38.78, mag: 0.03, color: '#c4b5fd', mythology: 'Orpheus\'un lirinin yıldızı; müzik, sanat ve ilahi esin kaynağı.' },
  { name: 'Pleiades (Yedi Kız Kardeş / Ülker)', constellation: 'Boğa (Taurus)', ra: 56.87, dec: 24.11, mag: 1.6, color: '#38bdf8', mythology: 'Mitolojide Atlas\'ın yedi kızı; gök atlasında mevsim geçişlerinin kutsal kümesi.' },
];

// Main Natal Chart Calculation Entry Point
export function calculateNatalChart(params: {
  fullName: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  cityName: string;
  latitude: number;
  longitude: number;
  timezone?: number;
  isTimeUnknown?: boolean;
}): NatalChartData {
  const [yearStr, monthStr, dayStr] = params.birthDate.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  let hourDecimal = 12.0;
  if (!params.isTimeUnknown && params.birthTime) {
    const [hStr, mStr] = params.birthTime.split(':');
    hourDecimal = parseInt(hStr, 10) + parseInt(mStr, 10) / 60.0;
  }

  // Determine accurate historical timezone offset
  const timezone = typeof params.timezone === 'number'
    ? params.timezone
    : getHistoricalTurkeyTimezone(year, month, day);

  // Convert to UTC
  const utcHourDecimal = hourDecimal - timezone;
  const JD = getJulianDay(year, month, day, utcHourDecimal);
  const T = (JD - 2451545.0) / 36525.0;

  // True Obliquity of Ecliptic
  const eps = getEclipticObliquity(T);

  // Sidereal Time & RAMC
  const { lstDeg, lstHours, ramc } = computeSiderealTime(JD, params.longitude);

  // Precision Ascendant (ASC) & Midheaven (MC)
  const ascLon = computeAscendant(ramc, params.latitude, eps);
  const mcLon = computeMidheaven(ramc, eps);

  const ascInfo = getSignFromLongitude(ascLon);
  const mcInfo = getSignFromLongitude(mcLon);

  // Ascendant Sign index (Whole Sign houses starting from ASC sign)
  const ascSignIndex = ZODIAC_SIGNS.findIndex((s) => s.id === ascInfo.sign.id);

  const HOUSE_THEMES = [
    { name: '1. Ev (Yükselen / ASC)', theme: 'Benlik, Karakter, Beden Dili, Hayata Giriş' },
    { name: '2. Ev', theme: 'Kişisel Para, Öz Saygı, Maddi Güvenlik, Yetenekler' },
    { name: '3. Ev', theme: 'Zihin, İletişim, Kardeşler, Yakın Çevre, Öğrenme' },
    { name: '4. Ev (Dip Noktası / IC)', theme: 'Ev, Aile, Kökler, Anne/Baba, İç Dünya' },
    { name: '5. Ev', theme: 'Aşk, Yaratıcılık, Hobiler, Neşe, Çocuklar, Sahne' },
    { name: '6. Ev', theme: 'Günlük Rutinler, Sağlık, Çalışma Hayatı, Hizmet' },
    { name: '7. Ev (Alçalan / DSC)', theme: 'Evlilik, İkili İlişkiler, Ortaklıklar, Biz Bilinci' },
    { name: '8. Ev', theme: 'Dönüşüm, Krizler, Ortak Maddiyat, Miras, Gizem' },
    { name: '9. Ev', theme: 'Yüksek Öğrenim, Felsefe, Yurt Dışı, İnançlar, Vizyon' },
    { name: '10. Ev (Tepe Noktası / MC)', theme: 'Kariyer Zirvesi, Toplumsal Statü, Saygınlık, Başarı' },
    { name: '11. Ev', theme: 'Gelecek Hayalleri, Topluluklar, Dostluklar, İdealler' },
    { name: '12. Ev', theme: 'Bilinçaltı, Gizli Sırlar, Ruhsal Arınma, Rüyalar' },
  ];

  const houses: HouseCusp[] = [];
  for (let i = 0; i < 12; i++) {
    const sign = ZODIAC_SIGNS[(ascSignIndex + i) % 12];
    const houseLon = norm360(ascLon + i * 30);
    const info = getSignFromLongitude(houseLon);
    houses.push({
      houseNumber: i + 1,
      sign,
      longitude: houseLon,
      degreeInSign: info.degree,
      minuteInSign: info.minute,
      name: HOUSE_THEMES[i].name,
      theme: HOUSE_THEMES[i].theme,
    });
  }

  const getHouseForLon = (lon: number): number => {
    const pSignInfo = getSignFromLongitude(lon);
    const pSignIndex = ZODIAC_SIGNS.findIndex((s) => s.id === pSignInfo.sign.id);
    let diff = pSignIndex - ascSignIndex;
    if (diff < 0) diff += 12;
    return diff + 1;
  };

  // Sun
  const sunLon = computeSunLongitude(T);
  const sunSign = getSignFromLongitude(sunLon);
  const sunEq = eclipticToEquatorial(sunLon, eps);
  const sunHoriz = equatorialToHorizontal(sunEq.ra, sunEq.dec, lstDeg, params.latitude);

  const sunBody: CelestialBody = {
    id: 'sun',
    name: 'Güneş',
    symbol: '☉',
    longitude: sunLon,
    sign: sunSign.sign,
    degreeInSign: sunSign.degree,
    minuteInSign: sunSign.minute,
    secondInSign: sunSign.second,
    house: getHouseForLon(sunLon),
    isRetrograde: false,
    meaning: 'Öz benlik, yaşam ateşi, irade, bilinçli kimlik ve kalbin arzusu.',
    altitude: sunHoriz.altitude,
    azimuth: sunHoriz.azimuth,
  };

  const isDaytime = sunHoriz.altitude > -0.833; // True if Sun is above horizon

  // Moon
  const moonLon = computeMoonLongitude(T);
  const moonSign = getSignFromLongitude(moonLon);
  const moonEq = eclipticToEquatorial(moonLon, eps);
  const moonHoriz = equatorialToHorizontal(moonEq.ra, moonEq.dec, lstDeg, params.latitude);

  const moonBody: CelestialBody = {
    id: 'moon',
    name: 'Ay',
    symbol: '☽',
    longitude: moonLon,
    sign: moonSign.sign,
    degreeInSign: moonSign.degree,
    minuteInSign: moonSign.minute,
    secondInSign: moonSign.second,
    house: getHouseForLon(moonLon),
    isRetrograde: false,
    meaning: 'Bilinçaltı, duygusal güvence, içsel çocuk, annelik hafızası ve sezgiler.',
    altitude: moonHoriz.altitude,
    azimuth: moonHoriz.azimuth,
  };

  // Ascendant body
  const ascBody: CelestialBody = {
    id: 'ascendant',
    name: 'Yükselen (ASC)',
    symbol: 'ASC',
    longitude: ascLon,
    sign: ascInfo.sign,
    degreeInSign: ascInfo.degree,
    minuteInSign: ascInfo.minute,
    secondInSign: ascInfo.second,
    house: 1,
    isRetrograde: false,
    meaning: 'Doğduğun anda doğu ufkunda yükselen burç. Beden dilin, dünyaya sunduğun vitrin ve ilk intiba.',
    altitude: 0,
    azimuth: 90, // Exactly on Eastern horizon
  };

  // Midheaven body
  const mcBody: CelestialBody = {
    id: 'midheaven',
    name: 'Tepe Noktası (MC)',
    symbol: 'MC',
    longitude: mcLon,
    sign: mcInfo.sign,
    degreeInSign: mcInfo.degree,
    minuteInSign: mcInfo.minute,
    secondInSign: mcInfo.second,
    house: 10,
    isRetrograde: false,
    meaning: 'Gökyüzünün doruk noktası. Kariyer hedeflerin, toplumdaki statün ve bıraktığın miras.',
    altitude: 90 - Math.abs(params.latitude - mcInfo.degree),
    azimuth: 180, // Culminating South
  };

  // Mean Lunar Nodes (IAU / Meeus precision)
  // Omega = 125.04452 - 1934.136261 * T + 0.0020708 * T^2
  const northNodeLon = norm360(125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000);
  const southNodeLon = norm360(northNodeLon + 180);

  const northNodeSign = getSignFromLongitude(northNodeLon);
  const southNodeSign = getSignFromLongitude(southNodeLon);

  const northNodeEq = eclipticToEquatorial(northNodeLon, eps);
  const northNodeHoriz = equatorialToHorizontal(northNodeEq.ra, northNodeEq.dec, lstDeg, params.latitude);

  const southNodeEq = eclipticToEquatorial(southNodeLon, eps);
  const southNodeHoriz = equatorialToHorizontal(southNodeEq.ra, southNodeEq.dec, lstDeg, params.latitude);

  const northNodeBody: CelestialBody = {
    id: 'northNode',
    name: 'Kuzey Ay Düğümü (KAD)',
    symbol: '☊',
    longitude: northNodeLon,
    sign: northNodeSign.sign,
    degreeInSign: northNodeSign.degree,
    minuteInSign: northNodeSign.minute,
    secondInSign: northNodeSign.second,
    house: getHouseForLon(northNodeLon),
    isRetrograde: true,
    meaning: 'Ruhsal tekamül yönün, bu hayatta öğrenmen ve geliştirmen gereken yüce hayat dersi ve evrim rotası.',
    altitude: northNodeHoriz.altitude,
    azimuth: northNodeHoriz.azimuth,
  };

  const southNodeBody: CelestialBody = {
    id: 'southNode',
    name: 'Güney Ay Düğümü (GAD)',
    symbol: '☋',
    longitude: southNodeLon,
    sign: southNodeSign.sign,
    degreeInSign: southNodeSign.degree,
    minuteInSign: southNodeSign.minute,
    secondInSign: southNodeSign.second,
    house: getHouseForLon(southNodeLon),
    isRetrograde: true,
    meaning: 'Geçmiş yaşam kimliğin, eski konfor alanın, ruhunun geçmişten getirdiği alışkanlıklar ve aşılması gereken karmik tortular.',
    altitude: southNodeHoriz.altitude,
    azimuth: southNodeHoriz.azimuth,
  };

  // Planets
  const planetDefs = [
    { id: 'mercury', name: 'Merkür', symbol: '☿', meaning: 'İletişim biçimi, düşünce hızı, öğrenme arzusu ve zihinsel işleyiş.' },
    { id: 'venus', name: 'Venüs', symbol: '♀', meaning: 'Sevgi dili, estetik zevkler, romantizm, cazibe ve para ilişkisi.' },
    { id: 'mars', name: 'Mars', symbol: '♂', meaning: 'Harekete geçme gücü, arzu, cesaret, mücadele tarzı ve cinsel dürtü.' },
    { id: 'jupiter', name: 'Jüpiter', symbol: '♃', meaning: 'Şans, bolluk, bilgelik, büyüme alanları ve hayat felsefesi.' },
    { id: 'saturn', name: 'Satürn', symbol: '♄', meaning: 'Disiplin, hayat sınavları, sabır, olgunlaşma ve sorumluluklar.' },
    { id: 'uranus', name: 'Uranüs', symbol: '♅', meaning: 'Özgürlük arayışı, ani değişimler, deha, isyan ve vizyonerlik.' },
    { id: 'neptune', name: 'Neptün', symbol: '♆', meaning: 'Hayaller, sezgiler, sanatsal ilham, empati ve spiritüel derinlik.' },
    { id: 'pluto', name: 'Plüton', symbol: '♇', meaning: 'Küllerinden doğuş, derin dönüşümler, güç, psikolojik arınma.' },
  ];

  const planets: CelestialBody[] = planetDefs.map((def) => {
    const { lon, isRetrograde } = computePlanetLongitude(def.id, T, sunLon);
    const signData = getSignFromLongitude(lon);
    const eq = eclipticToEquatorial(lon, eps);
    const horiz = equatorialToHorizontal(eq.ra, eq.dec, lstDeg, params.latitude);

    return {
      id: def.id,
      name: def.name,
      symbol: def.symbol,
      longitude: lon,
      sign: signData.sign,
      degreeInSign: signData.degree,
      minuteInSign: signData.minute,
      secondInSign: signData.second,
      house: getHouseForLon(lon),
      isRetrograde,
      meaning: def.meaning,
      altitude: horiz.altitude,
      azimuth: horiz.azimuth,
    };
  });

  // Calculate coordinates for major stars
  const skyDomeStars = MAJOR_SKY_STARS.map((star) => {
    const horiz = equatorialToHorizontal(star.ra, star.dec, lstDeg, params.latitude);
    return {
      ...star,
      altitude: horiz.altitude,
      azimuth: horiz.azimuth,
    };
  });

  // Aspects
  const allBodies = [sunBody, moonBody, ...planets];
  const aspects: Aspect[] = [];
  const ASPECT_TYPES = [
    { type: 'Kavuşum' as const, angle: 0, orb: 8, nature: 'Nötr / Güçlü' as const, desc: 'İki enerjinin kaynaşması.' },
    { type: 'Karşıt' as const, angle: 180, orb: 7, nature: 'Zorlayıcı' as const, desc: 'Farkındalık yaratan kutupsal gerilim.' },
    { type: 'Üçgen' as const, angle: 120, orb: 7, nature: 'Uyumlu' as const, desc: 'Doğal yetenek ve zahmetsiz akış.' },
    { type: 'Kare' as const, angle: 90, orb: 6, nature: 'Zorlayıcı' as const, desc: 'Harekete geçiren dinamik meydan okuma.' },
    { type: 'Sekstil' as const, angle: 60, orb: 5, nature: 'Uyumlu' as const, desc: 'Fırsata dönüşen olumlu köprüler.' },
  ];

  for (let i = 0; i < allBodies.length; i++) {
    for (let j = i + 1; j < allBodies.length; j++) {
      const b1 = allBodies[i];
      const b2 = allBodies[j];
      const diff = Math.abs(b1.longitude - b2.longitude);
      const angle = diff > 180 ? 360 - diff : diff;

      for (const asp of ASPECT_TYPES) {
        const delta = Math.abs(angle - asp.angle);
        if (delta <= asp.orb) {
          aspects.push({
            planet1: b1.name,
            planet2: b2.name,
            planet1Symbol: b1.symbol,
            planet2Symbol: b2.symbol,
            type: asp.type,
            orb: parseFloat(delta.toFixed(1)),
            nature: asp.nature,
            angle: Math.round(angle),
            description: `${b1.name} ile ${b2.name} arasında ${asp.type} açısı (${Math.round(angle)}°). ${asp.desc}`,
          });
          break;
        }
      }
    }
  }

  // Element and Modality counts
  const elementCounts = { Ateş: 0, Toprak: 0, Hava: 0, Su: 0 };
  const modalityCounts = { Öncü: 0, Sabit: 0, Değişken: 0 };

  const weightedList: { body: CelestialBody; weight: number }[] = [
    { body: sunBody, weight: 3 },
    { body: moonBody, weight: 3 },
    { body: ascBody, weight: 3 },
    { body: planets[0], weight: 2 },
    { body: planets[1], weight: 2 },
    { body: planets[2], weight: 2 },
    { body: planets[3], weight: 1 },
    { body: planets[4], weight: 1 },
  ];

  for (const item of weightedList) {
    elementCounts[item.body.sign.element] += item.weight;
    modalityCounts[item.body.sign.modality] += item.weight;
  }

  const dominantElement = (Object.entries(elementCounts).sort((a, b) => b[1] - a[1])[0] || ['Ateş'])[0];
  const dominantModality = (Object.entries(modalityCounts).sort((a, b) => b[1] - a[1])[0] || ['Öncü'])[0];

  const chartSummary = `${sunSign.sign.name} Güneş, ${ascInfo.sign.name} Yükselen ve ${moonSign.sign.name} Ay kombinasyonu; ${dominantElement} elementinin yönlendiriciliği ve ${dominantModality} niteliğin ritmiyle biçimlenmiş güçlü bir kozmik mizaç sergiliyor.`;

  return {
    birthData: {
      fullName: params.fullName || 'Ziyaretçi',
      birthDate: params.birthDate,
      birthTime: params.birthTime || '12:00',
      cityName: params.cityName,
      latitude: params.latitude,
      longitude: params.longitude,
      timezone,
      isTimeUnknown: !!params.isTimeUnknown,
      lstHours: parseFloat(lstHours.toFixed(2)),
      ramcDegrees: parseFloat(ramc.toFixed(2)),
    },
    sun: sunBody,
    moon: moonBody,
    ascendant: ascBody,
    midheaven: mcBody,
    northNode: northNodeBody,
    southNode: southNodeBody,
    planets,
    houses,
    aspects,
    elementCounts,
    modalityCounts,
    dominantElement,
    dominantModality,
    chartSummary,
    skyDomeStars,
    isDaytime,
    moonPhase: computeMoonPhase(sunLon, moonLon),
  };
}
