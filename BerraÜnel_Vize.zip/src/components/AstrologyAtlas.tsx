import React, { useState } from 'react';
import { ZODIAC_PROFILES, HOUSES_GUIDE } from '../data/astrologyData';
import { ZODIAC_SIGNS } from '../utils/astrologyCalc';
import { Flame, Mountain, Wind, Droplets, Heart, Briefcase, Sparkles, Check, AlertCircle } from 'lucide-react';

export const AstrologyAtlas: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'zodiac' | 'groups' | 'houses' | 'planets'>('zodiac');
  const [selectedZodiacId, setSelectedZodiacId] = useState<string>('aries');

  const selectedSign = ZODIAC_PROFILES[selectedZodiacId] || ZODIAC_PROFILES.aries;

  return (
    <div id="astrology-atlas" className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
            Temel & İleri Rehber
          </span>
          <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-100 mt-1">
            Astroloji Atlası: Burçlar, Gruplar ve Evler
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Hiç astroloji bilmeyen birinin bile 5 dakikada kavrayabileceği, güvenilir ve astrolog gözünden hazırlanmış açık kaynak bilgi kütüphanesi.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('zodiac')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'zodiac'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            12 Burç Profili
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'groups'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Burç Grupları & Elementler
          </button>
          <button
            onClick={() => setActiveTab('houses')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'houses'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            12 Ev Rehberi
          </button>
          <button
            onClick={() => setActiveTab('planets')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'planets'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Gezegenler
          </button>
        </div>
      </div>

      {/* Tab 1: 12 Zodiac Profiles */}
      {activeTab === 'zodiac' && (
        <div className="space-y-6">
          {/* Sign Horizontal Selector Strip */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {ZODIAC_SIGNS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedZodiacId(s.id)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  selectedZodiacId === s.id
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-lg scale-105'
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="text-xl font-bold" style={{ color: s.elementColor }}>
                  {s.symbol}
                </div>
                <div className="text-xs font-medium mt-1">{s.name}</div>
              </button>
            ))}
          </div>

          {/* Detailed Selected Profile Card */}
          <div className="bg-[#0e1428]/95 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-3xl font-bold shrink-0 shadow-inner"
                  style={{ color: selectedSign.color }}
                >
                  {selectedSign.symbol}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-2xl font-bold font-cinzel text-slate-100">
                      {selectedSign.name} Burcu
                    </h4>
                    <span className="text-xs text-slate-400 font-mono">
                      ({selectedSign.latinName})
                    </span>
                  </div>
                  <p className="text-xs text-amber-400 font-medium mt-0.5">
                    {selectedSign.dates} · Arketip: {selectedSign.archetype}
                  </p>
                </div>
              </div>

              {/* Tag Info */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                  Element: <strong className="text-amber-300">{selectedSign.element}</strong>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                  Nitelik: <strong className="text-sky-300">{selectedSign.modality}</strong>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                  Kutup: <strong>{selectedSign.polarity}</strong>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                  Yönetici: <strong className="text-indigo-300">{selectedSign.ruler}</strong>
                </span>
              </div>
            </div>

            {/* Overview & Motto */}
            <div className="space-y-3">
              <blockquote className="p-4 rounded-xl bg-amber-500/10 border-l-2 border-amber-400 text-sm italic font-cormorant text-amber-200">
                "{selectedSign.motto}"
              </blockquote>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedSign.overview}
              </p>
            </div>

            {/* Strengths & Shadows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/20 space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Güçlü Yönleri (Aydınlık Taraf)
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedSign.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-red-500/20 space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Gölge Yönleri (Dönüşüm Alanı)
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedSign.shadows.map((shd, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                      <span>{shd}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Love & Career Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1.5">
                <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-400" /> Aşk ve İlişkilerde {selectedSign.name}
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedSign.loveDescription}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1.5">
                <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-amber-400" /> Kariyer ve Başarı Alanları
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedSign.careerDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Burç Grupları (Elements & Modalities) */}
      {activeTab === 'groups' && (
        <div className="space-y-8">
          {/* Elements Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-cinzel text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              1. Dört Temel Element (Ateş, Toprak, Hava, Su)
            </h4>
            <p className="text-xs text-slate-400">
              Elementler ruhun ham maddesidir. Haritanızda hangi element yoğunsa hayatı o filtreden deneyimlersiniz.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fire */}
              <div className="p-5 rounded-2xl bg-[#140f1a] border border-red-500/25 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-red-300 font-cinzel">Ateş Elementi</h5>
                    <span className="text-[11px] text-slate-400">Koç (♈), Aslan (♌), Yay (♐)</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  İlham, tutku, cesaret ve yaşam kıvılcımıdır. Ateş insanları beklemeyi sevmez; doğrudan harekete geçer, risk alır ve çevrelerine coşku yayarlar.
                </p>
                <div className="text-[11px] text-slate-400 pt-1">
                  <strong className="text-red-300">Dengesizlikte:</strong> Fazlalığı öfke ve sabırsızlık; eksikliği ise motivasyon ve yaşama sevinci azlığı doğurabilir.
                </div>
              </div>

              {/* Earth */}
              <div className="p-5 rounded-2xl bg-[#0f1714] border border-emerald-500/25 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Mountain className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-emerald-300 font-cinzel">Toprak Elementi</h5>
                    <span className="text-[11px] text-slate-400">Boğa (♉), Başak (♍), Oğlak (♑)</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Maddiyat, somutlaşma, sabır ve kalıcılıktır. Hayal edilenleri gerçeğe dönüştürür; güvenilir, sadık ve üretkendir.
                </p>
                <div className="text-[11px] text-slate-400 pt-1">
                  <strong className="text-emerald-300">Dengesizlikte:</strong> Fazlalığı katı inatçılık ve maddecilik; eksikliği ise pratik işleri organize etmekte zorlanma yaratır.
                </div>
              </div>

              {/* Air */}
              <div className="p-5 rounded-2xl bg-[#0f151f] border border-sky-500/25 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Wind className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-sky-300 font-cinzel">Hava Elementi</h5>
                    <span className="text-[11px] text-slate-400">İkizler (♊), Terazi (♎), Kova (♒)</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Zihin, fikirler, iletişim ve sosyal bağlardır. Bilgiyi taşır, tarafsız gözlem yapar ve köprüler kurar.
                </p>
                <div className="text-[11px] text-slate-400 pt-1">
                  <strong className="text-sky-300">Dengesizlikte:</strong> Fazlalığı havada kalma ve duygulardan kopuş; eksikliği ise objektif olmakta güçlük çekmedir.
                </div>
              </div>

              {/* Water */}
              <div className="p-5 rounded-2xl bg-[#111124] border border-indigo-500/25 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-indigo-300 font-cinzel">Su Elementi</h5>
                    <span className="text-[11px] text-slate-400">Yengeç (♋), Akrep (♏), Balık (♓)</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Duygular, sezgiler, şifa ve görünmeyen manevi derinliktir. Empati kurar, hisseder ve ruhsal bağlar kurar.
                </p>
                <div className="text-[11px] text-slate-400 pt-1">
                  <strong className="text-indigo-300">Dengesizlikte:</strong> Fazlalığı aşırı alınganlık ve melankoli; eksikliği ise hisleri ifade etmekte kuruluk yaratır.
                </div>
              </div>
            </div>
          </div>

          {/* Modalities Section */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h4 className="text-lg font-bold font-cinzel text-slate-100">
              2. Üç Nitelik / Modalite (Hayata Yaklaşım Tarzları)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 font-mono">ÖNCÜ (Kardinal)</span>
                <h5 className="text-base font-bold text-slate-100 font-cinzel">Mevsimi Başlatanlar</h5>
                <p className="text-xs text-slate-400">Koç, Yengeç, Terazi, Oğlak</p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  Liderlik, yeni projeleri başlatma enerjisi ve ilk adımı atma cesaretidir. Ancak sürdürmekte desteğe ihtiyaç duyabilirler.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-teal-400 font-mono">SABİT (Fixed)</span>
                <h5 className="text-base font-bold text-slate-100 font-cinzel">Mevsimi Olgunlaştıranlar</h5>
                <p className="text-xs text-slate-400">Boğa, Aslan, Akrep, Kova</p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  İstikrar, sabır, kararlılık ve başladığı işi ne olursa olsun tamamlama gücüdür. Değişime direnebilirler.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-purple-400 font-mono">DEĞİŞKEN (Mutable)</span>
                <h5 className="text-base font-bold text-slate-100 font-cinzel">Mevsimi Dönüştürenler</h5>
                <p className="text-xs text-slate-400">İkizler, Başak, Yay, Balık</p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  Esneklik, adaptasyon yeteneği ve geçişleri yönetme ustalığıdır. Çok yönlüdürler ancak odak dağılması yaşayabilirler.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: 12 Houses Guide */}
      {activeTab === 'houses' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
            Astroloji haritası 12 eşit hayat dilimine bölünmüştür. 1. Ev doğum anında başınızı çevirdiğiniz ufuk çizgisinden başlar ve saat yönünün tersine tüm hayat temalarını kapsar.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {HOUSES_GUIDE.map((h) => (
              <div
                key={h.number}
                className="p-5 rounded-2xl bg-[#0c1224] border border-slate-800 hover:border-amber-400/30 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-400/10">
                    {h.number}. EV
                  </span>
                  <span className="text-[11px] text-slate-500">Hayat Alanı</span>
                </div>
                <h5 className="text-sm font-bold text-slate-100 font-cinzel">{h.traditionalName}</h5>
                <p className="text-xs text-amber-300/80">{h.theme}</p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {h.astrologicalSignificance}
                </p>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="text-slate-500 block mb-0.5">Sorduğu Soru:</span>
                  <span className="italic text-slate-300">{h.keyQuestions[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Planets Guide */}
      {activeTab === 'planets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Güneş (☉)', type: 'Kişisel', desc: 'Ruhun özü, bilinçli kimlik, ego, yaşam sevinci ve kalbin arzusu. Haritanın merkez ışığıdır.' },
            { name: 'Ay (☽)', type: 'Kişisel', desc: 'Bilinçaltı hafıza, çocukluk, duygusal beslenme, içsel güvenlik ve sezgiler.' },
            { name: 'Merkür (☿)', type: 'Kişisel', desc: 'Zihnin çalışma şekli, konuşma üslubu, bilgi toplama ve analitik zeka.' },
            { name: 'Venüs (♀)', type: 'Kişisel', desc: 'Sevgi dili, romantik çekim, sanat zevki, estetik ve maddi değerlere yaklaşım.' },
            { name: 'Mars (♂)', type: 'Kişisel', desc: 'Eylem gücü, arzu, mücadele arzusu, cesaret, libido ve savunma mekanizması.' },
            { name: 'Jüpiter (♃)', type: 'Sosyal', desc: 'Büyük şans gezegeni, bilgelik, büyüme, yabancı kültürler ve hayat felsefesi.' },
            { name: 'Satürn (♄)', type: 'Sosyal', desc: 'Zamanın efendisi, karma, disiplin, sorumluluklar, sabır ve hayatın sınavları.' },
            { name: 'Uranüs (♅)', type: 'Jenerasyonel', desc: 'Devrimler, ani aydınlanmalar, özgünlük, teknoloji ve gelenekleri yıkma arzusu.' },
            { name: 'Neptün (♆)', type: 'Jenerasyonel', desc: 'Hayaller, sinema, maneviyat, empati, evrensel birlik ve ilham verici sanat.' },
            { name: 'Plüton (♇)', type: 'Jenerasyonel', desc: 'Küllerinden doğuş, ölüm ve yeniden doğum, derin psikolojik arınma ve dönüştürücü güç.' },
          ].map((planet, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#0c1224] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-base font-bold text-amber-200 font-cinzel">{planet.name}</h5>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                  {planet.type} Gezegen
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {planet.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
