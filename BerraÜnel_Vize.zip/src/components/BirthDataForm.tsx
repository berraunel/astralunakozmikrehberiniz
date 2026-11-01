import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Sparkles, Wand2, Sliders, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CITIES_DATABASE, CityLocation } from '../data/cities';
import { calculateNatalChart, NatalChartData, getHistoricalTurkeyTimezone } from '../utils/astrologyCalc';

interface BirthDataFormProps {
  onChartCalculated: (chart: NatalChartData) => void;
}

export const BirthDataForm: React.FC<BirthDataFormProps> = ({ onChartCalculated }) => {
  const [fullName, setFullName] = useState<string>('Deniz Yılmaz');
  const [birthDate, setBirthDate] = useState<string>('2000-03-21');
  const [birthTime, setBirthTime] = useState<string>('14:30');
  const [isTimeUnknown, setIsTimeUnknown] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<CityLocation>(CITIES_DATABASE[0]); // Istanbul
  const [citySearch, setCitySearch] = useState<string>('İstanbul');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Advanced coordinates and timezone options
  const [showAdvancedCoords, setShowAdvancedCoords] = useState<boolean>(false);
  const [customLat, setCustomLat] = useState<number>(41.0082);
  const [customLon, setCustomLon] = useState<number>(28.9784);
  const [customTz, setCustomTz] = useState<number>(2); // 2000-03-21 in TR was UTC+2 (winter EET)

  // Update timezone automatically when date or city changes
  useEffect(() => {
    if (birthDate) {
      const [y, m, d] = birthDate.split('-').map(Number);
      if (selectedCity.country === 'Türkiye') {
        const histTz = getHistoricalTurkeyTimezone(y, m, d);
        setCustomTz(histTz);
      } else {
        setCustomTz(selectedCity.timezone);
      }
    }
  }, [birthDate, selectedCity]);

  const filteredCities = CITIES_DATABASE.filter((city) =>
    city.name.toLocaleLowerCase('tr').includes(citySearch.toLocaleLowerCase('tr'))
  );

  const handleCitySelect = (city: CityLocation) => {
    setSelectedCity(city);
    setCitySearch(city.name);
    setCustomLat(city.latitude);
    setCustomLon(city.longitude);
    setIsDropdownOpen(false);
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!birthDate) return;

    const chart = calculateNatalChart({
      fullName: fullName.trim() || 'Ziyaretçi',
      birthDate,
      birthTime: isTimeUnknown ? '12:00' : birthTime || '12:00',
      cityName: selectedCity.name,
      latitude: customLat,
      longitude: customLon,
      timezone: customTz,
      isTimeUnknown,
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#fbbf24', '#818cf8', '#38bdf8'],
      });
    } catch {
      // Ignore if confetti fails in sandbox
    }

    onChartCalculated(chart);

    const element = document.getElementById('results-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const loadPreset = (type: 'ataturk' | 'einstein' | 'now') => {
    if (type === 'ataturk') {
      setFullName('Mustafa Kemal Atatürk');
      setBirthDate('1881-05-19');
      setBirthTime('09:00');
      setIsTimeUnknown(false);
      const selanikCity: CityLocation = { name: 'Selanik', country: 'Yunanistan', latitude: 40.6401, longitude: 22.9444, timezone: 2 };
      setSelectedCity(selanikCity);
      setCitySearch('Selanik');
      setCustomLat(40.6401);
      setCustomLon(22.9444);
      setCustomTz(2);
    } else if (type === 'einstein') {
      setFullName('Albert Einstein');
      setBirthDate('1879-03-14');
      setBirthTime('11:30');
      setIsTimeUnknown(false);
      const ulmCity: CityLocation = { name: 'Ulm', country: 'Almanya', latitude: 48.4011, longitude: 9.9876, timezone: 1 };
      setSelectedCity(ulmCity);
      setCitySearch('Ulm');
      setCustomLat(48.4011);
      setCustomLon(9.9876);
      setCustomTz(1);
    } else {
      const now = new Date();
      setFullName('Gökyüzü Anlık Transit');
      setBirthDate(now.toISOString().split('T')[0]);
      setBirthTime(now.toTimeString().slice(0, 5));
      setIsTimeUnknown(false);
      setSelectedCity(CITIES_DATABASE[0]);
      setCitySearch('İstanbul');
      setCustomLat(41.0082);
      setCustomLon(28.9784);
      setCustomTz(3);
    }
  };

  return (
    <div className="w-full bg-[#0d1326]/90 border border-amber-500/25 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Subtle cosmic aura */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400/90 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Swiss Ephemeris / Hassas Koordinat Motoru
            </span>
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-100 mt-0.5">
              Hassas Doğum Haritası ve Yükselen Burç Hesabı
            </h3>
          </div>

          {/* Quick preset selector buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 mr-1 flex items-center gap-1">
              <Wand2 className="w-3 h-3 text-amber-400" /> Örnekler:
            </span>
            <button
              type="button"
              onClick={() => loadPreset('ataturk')}
              className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-amber-200/90 border border-slate-700 transition-colors"
            >
              M. K. Atatürk
            </button>
            <button
              type="button"
              onClick={() => loadPreset('einstein')}
              className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-amber-200/90 border border-slate-700 transition-colors"
            >
              A. Einstein
            </button>
            <button
              type="button"
              onClick={() => loadPreset('now')}
              className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-amber-200/90 border border-slate-700 transition-colors"
            >
              Şu Anki Gökyüzü
            </button>
          </div>
        </div>

        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                İsminiz veya Takma Ad
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Örn: Ayşe Kaya"
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Doğum Tarihi (Gün / Ay / Yıl)
              </label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />
            </div>

            {/* Birth Time */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Doğum Saati (Saat : Dakika)
                </label>
                <label className="text-xs text-slate-400 flex items-center gap-1.5 cursor-pointer hover:text-slate-200">
                  <input
                    type="checkbox"
                    checked={isTimeUnknown}
                    onChange={(e) => setIsTimeUnknown(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Saatimi bilmiyorum (12:00 al)</span>
                </label>
              </div>
              <input
                type="time"
                disabled={isTimeUnknown}
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className={`w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors ${
                  isTimeUnknown ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              />
              <p className="text-[11px] text-slate-400 mt-1">
                * Yükselen Burcun tam derecesi ve doğu ufkundaki yeri doğum dakikasına göre hesaplanır.
              </p>
            </div>

            {/* Birth City */}
            <div className="relative">
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Doğum Yeri / Şehir
              </label>
              <input
                type="text"
                value={citySearch}
                onFocus={() => setIsDropdownOpen(true)}
                onChange={(e) => {
                  setCitySearch(e.target.value);
                  setIsDropdownOpen(true);
                }}
                placeholder="Şehir arayın (Örn: İstanbul, Ankara, İzmir)"
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />

              {isDropdownOpen && filteredCities.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50">
                  {filteredCities.slice(0, 10).map((city) => (
                    <button
                      key={`${city.name}-${city.country}`}
                      type="button"
                      onClick={() => handleCitySelect(city)}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-200 hover:bg-amber-500/20 hover:text-amber-200 flex items-center justify-between transition-colors"
                    >
                      <span>{city.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {city.latitude.toFixed(2)}°N, {city.longitude.toFixed(2)}°E
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Toggle for Advanced Astronomical Coordinates */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowAdvancedCoords(!showAdvancedCoords)}
              className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1.5 font-medium"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showAdvancedCoords ? 'Hassas Koordinatları Gizle' : 'Hassas Enlem, Boylam & Zaman Dilimi Ayarı (Gelişmiş)'}</span>
            </button>

            {showAdvancedCoords && (
              <div className="mt-3 p-4 bg-slate-900/90 border border-slate-700 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Enlem (Latitude °N):</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={customLat}
                    onChange={(e) => setCustomLat(parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Boylam (Longitude °E):</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={customLon}
                    onChange={(e) => setCustomLon(parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">UTC Saat Farkı (Offset):</label>
                  <select
                    value={customTz}
                    onChange={(e) => setCustomTz(parseInt(e.target.value, 10))}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  >
                    <option value={2}>UTC+2 (Türkiye Kış / Doğu Avrupa EET)</option>
                    <option value={3}>UTC+3 (Türkiye Yaz & Kalıcı Saat TRT)</option>
                    <option value={0}>UTC+0 (Londra GMT)</option>
                    <option value={1}>UTC+1 (Orta Avrupa CET)</option>
                    <option value={4}>UTC+4 (Bakü / Dubai)</option>
                    <option value={-5}>UTC-5 (New York EST)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Konum:
              </span>
              <span className="text-amber-300 font-medium">{selectedCity.name}</span>
              <span className="text-slate-500">·</span>
              <span className="font-mono text-slate-400 text-[11px]">
                {customLat.toFixed(2)}°N, {customLon.toFixed(2)}°E · UTC+{customTz}
              </span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold text-sm tracking-wider uppercase rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:from-amber-300 hover:to-amber-400 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              Doğum Haritamı ve Gökyüzümü Hesapla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
