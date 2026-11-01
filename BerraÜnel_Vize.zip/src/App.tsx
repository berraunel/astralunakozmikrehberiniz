import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MythologicalEntrance } from './components/MythologicalEntrance';
import { AstrologyHistory } from './components/AstrologyHistory';
import { BirthDataForm } from './components/BirthDataForm';
import { BirthSkyDome } from './components/BirthSkyDome';
import { NatalChartWheel } from './components/NatalChartWheel';
import { BigThreeCards } from './components/BigThreeCards';
import { PlanetPlacementsTable } from './components/PlanetPlacementsTable';
import { ElementsModalitiesBar } from './components/ElementsModalitiesBar';
import { SignInHousesMatrix } from './components/SignInHousesMatrix';
import { AstrologyAtlas } from './components/AstrologyAtlas';
import { CosmicSynastryMatrix } from './components/CosmicSynastryMatrix';
import { CosmicStyleBeautyGuide } from './components/CosmicStyleBeautyGuide';
import { PastLifeKarmaLibrary } from './components/PastLifeKarmaLibrary';
import { ZodiacOriginsGallery } from './components/ZodiacOriginsGallery';
import { PersonalizedHousesAnalysis } from './components/PersonalizedHousesAnalysis';
import { MoonPhaseVisualizer } from './components/MoonPhaseVisualizer';
import { AiAstrologerModal } from './components/AiAstrologerModal';
import { calculateNatalChart, NatalChartData } from './utils/astrologyCalc';
import { Compass, Bot, Sparkles, Heart, Shirt, History } from 'lucide-react';

export default function App() {
  // Default chart initialized with precision Swiss Ephemeris algorithm (Leo Rising!)
  const [chartData, setChartData] = useState<NatalChartData>(() =>
    calculateNatalChart({
      fullName: 'Deniz Yılmaz',
      birthDate: '2000-03-21',
      birthTime: '14:30',
      cityName: 'İstanbul',
      latitude: 41.0082,
      longitude: 28.9784,
      timezone: 2, // 2000 March 21 in Turkey was UTC+2 (EET)
      isTimeUnknown: false,
    })
  );

  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'ai-astrologer') {
      setIsAiModalOpen(true);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-slate-100 selection:bg-purple-500 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenCalculator={() => handleNavigate('calculator')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-24">
        {/* Section 1: Mythological Entrance & Top Usage Roadmap */}
        <section id="hero" className="scroll-mt-20">
          <MythologicalEntrance
            onNavigate={handleNavigate}
            onOpenAi={() => setIsAiModalOpen(true)}
          />
        </section>

        {/* Section 2: Precision Birth Data Calculator Form */}
        <section id="calculator" className="scroll-mt-20">
          <BirthDataForm onChartCalculated={(chart) => setChartData(chart)} />
        </section>

        {/* Section 3: Calculated Chart & Real Sky Dome Output */}
        <section id="results-section" className="scroll-mt-20 space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-400/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-purple-300 font-medium">
                  Swiss Ephemeris Hesaplama Sonucu
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono font-bold">
                  Yükselen: {chartData.ascendant.sign.name} ({chartData.ascendant.degreeInSign}° {chartData.ascendant.minuteInSign}')
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono font-bold flex items-center gap-1">
                  <span>{chartData.moonPhase.emoji}</span>
                  <span>{chartData.moonPhase.phaseName.split(' ')[0]} (%{chartData.moonPhase.illuminationPct})</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-slate-100 mt-1">
                {chartData.birthData.fullName} İçin Doğum Haritası ve Gökyüzü
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Tarih: {chartData.birthData.birthDate} · Saat: {chartData.birthData.birthTime} · Konum: {chartData.birthData.cityName} ({chartData.birthData.latitude.toFixed(2)}°N, {chartData.birthData.longitude.toFixed(2)}°E) · UTC+{chartData.birthData.timezone}
              </p>
            </div>

            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600/40 to-indigo-600/40 hover:from-purple-600/60 hover:to-indigo-600/60 border border-purple-400/40 text-purple-200 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 self-start sm:self-auto shadow-md"
            >
              <Bot className="w-4 h-4 text-purple-300" />
              Bu Haritayı AI Astrologa Yorumlat
            </button>
          </div>

          {/* Big Three Cards */}
          <div id="big-three">
            <BigThreeCards chart={chartData} />
          </div>

          {/* Dedicated Moon Phase Drawing & Archetype */}
          <div id="moon-phase">
            <MoonPhaseVisualizer chart={chartData} />
          </div>

          {/* Real Sky Dome at the Exact Birth Minute */}
          <div id="sky-dome">
            <BirthSkyDome chart={chartData} />
          </div>

          {/* 360° Circular Natal Chart Wheel */}
          <div className="space-y-4">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-purple-300 font-medium">
                Geleneksel Gezegen Çarkı
              </span>
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-slate-100 mt-0.5">
                360° Doğum Haritası Çarkı
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Ufuk çizgisi (ASC - Yükselen {chartData.ascendant.sign.name}) sol tarafta 9 o'clock hizasında yer alır.
              </p>
            </div>
            <NatalChartWheel chart={chartData} />
          </div>

          {/* Elements & Modalities Balance */}
          <ElementsModalitiesBar chart={chartData} />

          {/* Detailed Planetary Positions Table */}
          <PlanetPlacementsTable chart={chartData} />

          {/* Kişiye Özel 12 Evin Derinlemesine Anlamı & Astrolog Yorumları */}
          <div id="personalized-houses-section">
            <PersonalizedHousesAnalysis chart={chartData} />
          </div>
        </section>

        {/* Section 4: NEW MODULE 1 - Kozmik Uyum Matrisi (Aşk & Arkadaşlık) */}
        <section id="synastry" className="scroll-mt-20">
          <CosmicSynastryMatrix />
        </section>

        {/* Section 5: NEW MODULE 2 - Yıldızların Tarzı & Güzellik Rehberi */}
        <section id="style-beauty" className="scroll-mt-20">
          <CosmicStyleBeautyGuide />
        </section>

        {/* Section 6: NEW MODULE 3 - Kozmik Geçmiş Yaşam & Karma Kütüphanesi (Kişiye Özel Hesaplama) */}
        <section id="karma-past-life" className="scroll-mt-20">
          <PastLifeKarmaLibrary chart={chartData} />
        </section>

        {/* Section 7: NEW MODULE 4 - 12 Burcun Mitolojik Kökenleri ve Sembol Hikayesi */}
        <section id="zodiac-origins" className="scroll-mt-20">
          <ZodiacOriginsGallery chart={chartData} />
        </section>

        {/* Section 8: "Hangi Burç Hangi Evde?" Matrix */}
        <section id="houses-matrix" className="scroll-mt-20">
          <SignInHousesMatrix chart={chartData} />
        </section>

        {/* Section 8: Astroloji Tarihçesi */}
        <section id="history" className="scroll-mt-20">
          <AstrologyHistory />
        </section>

        {/* Section 9: Comprehensive Astrology Atlas */}
        <section id="astrology-atlas" className="scroll-mt-20">
          <AstrologyAtlas />
        </section>
      </main>

      {/* Floating AI Astrologer Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="px-4 py-3 bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-[0_0_25px_rgba(192,132,252,0.4)] hover:scale-105 transition-all flex items-center gap-2 group"
        >
          <Bot className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          <span>AI Astrologa Sor</span>
        </button>
      </div>

      {/* AI Astrologer Chat Modal */}
      <AiAstrologerModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        chart={chartData}
      />

      {/* Footer */}
      <footer className="mt-28 border-t border-purple-400/20 bg-[#090d19] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(168,85,247,0.4)] shrink-0" />
            <div>
              <span className="font-serif text-base font-bold text-slate-100 block">
                AstraLuna
              </span>
              <span className="text-[10px] uppercase tracking-widest text-pink-300/80 font-sans">
                GÖK GÜNLÜĞÜNÜZ & KOZMİK REHBERİNİZ
              </span>
            </div>
          </div>

          <div className="text-center md:text-left text-xs text-slate-400 space-y-1">
            <p>Yapay Zeka Araçları Kullanımı Dersi Proje Ödevi</p>
            <p className="text-slate-500">
              Swiss Ephemeris Esaslı Hassas Hesaplama & Yaşam Portalı · 2026
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-purple-300 transition-colors"
            >
              Yukarı Çık ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
