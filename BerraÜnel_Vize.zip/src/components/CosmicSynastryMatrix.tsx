import React, { useState } from 'react';
import { ZODIAC_SIGNS, ZodiacSignInfo } from '../utils/astrologyCalc';
import { Heart, Users, Sparkles, Flame, Shield, MessageCircle, RefreshCw } from 'lucide-react';

interface SynastryScore {
  overall: number;
  elementMatch: number;
  communication: number;
  passion: number;
  trust: number;
  headline: string;
  chemistry: string;
  fights: string;
  advice: string;
}

export const CosmicSynastryMatrix: React.FC = () => {
  const [sign1Id, setSign1Id] = useState<string>('leo');
  const [sign2Id, setSign2Id] = useState<string>('sagittarius');
  const [relationType, setRelationType] = useState<'love' | 'friendship'>('love');

  const sign1 = ZODIAC_SIGNS.find((s) => s.id === sign1Id) || ZODIAC_SIGNS[4];
  const sign2 = ZODIAC_SIGNS.find((s) => s.id === sign2Id) || ZODIAC_SIGNS[8];

  // Dynamic compatibility calculation engine
  const calculateSynastry = (s1: ZodiacSignInfo, s2: ZodiacSignInfo, type: 'love' | 'friendship'): SynastryScore => {
    const isSameSign = s1.id === s2.id;
    const isSameElement = s1.element === s2.element;

    // Harmonic element pairs (Fire-Air, Earth-Water)
    const isHarmonicElement =
      (s1.element === 'Ateş' && s2.element === 'Hava') ||
      (s1.element === 'Hava' && s2.element === 'Ateş') ||
      (s1.element === 'Toprak' && s2.element === 'Su') ||
      (s1.element === 'Su' && s2.element === 'Toprak');

    // Challenging element pairs (Fire-Water, Air-Earth, etc.)
    const isFrictionElement =
      (s1.element === 'Ateş' && s2.element === 'Su') ||
      (s1.element === 'Su' && s2.element === 'Ateş') ||
      (s1.element === 'Hava' && s2.element === 'Toprak') ||
      (s1.element === 'Toprak' && s2.element === 'Hava');

    let overall = 80;
    let elementMatch = 75;
    let communication = 78;
    let passion = 82;
    let trust = 80;

    if (isSameSign) {
      overall = 85;
      elementMatch = 95;
      communication = 88;
      passion = 79;
      trust = 85;
    } else if (isSameElement) {
      overall = 94;
      elementMatch = 98;
      communication = 92;
      passion = type === 'love' ? 95 : 88;
      trust = 90;
    } else if (isHarmonicElement) {
      overall = 91;
      elementMatch = 90;
      communication = 94;
      passion = 89;
      trust = 88;
    } else if (isFrictionElement) {
      overall = 74;
      elementMatch = 65;
      communication = 70;
      passion = type === 'love' ? 96 : 65; // High friction often creates electric passion
      trust = 68;
    } else {
      // Fire-Earth, Air-Water
      overall = 78;
      elementMatch = 72;
      communication = 76;
      passion = 80;
      trust = 75;
    }

    // Witty & Astrological descriptions
    let headline = '';
    let chemistry = '';
    let fights = '';
    let advice = '';

    if (isSameElement) {
      headline = `${s1.element} & ${s2.element}: Aynı Frekansta Titreşen İki Ruh`;
      chemistry = `İkiniz de hayata aynı elementin gözlükleriyle bakıyorsunuz. ${s1.name} ile ${s2.name} bir araya geldiğinde lafı ağızdan kapma oranı %99’dur. ${type === 'love' ? 'Aranızdaki çekim zahmetsiz ve akıcıdır; sanki birbirinizi yüzyıllardır tanıyor gibisiniz.' : 'Mükemmel bir suç ortağı ve yol arkadaşısınız; plan yaparken hiç zorlanmazsınız.'}`;
      fights = `Tek risk, iki tarafın da aynı kusurlara sahip olması! ${s1.element === 'Ateş' ? 'Kavga anında iki kıvılcım yangına dönebilir; yangın söndürücüyü ilk alan kazanır.' : s1.element === 'Hava' ? 'Tartışmalar sabaha kadar süren bitmeyen bir felsefe kongresine dönüşebilir.' : s1.element === 'Su' ? 'İki taraf da içine kapanıp kimin daha çok kırıldığını yarıştırabilir.' : 'İki inatçı keçi gibi haftalarca kimse özür dilemeyebilir.'}`;
      advice = `Birbirinize ayna tuttuğunuzu unutmayın. Farklı bakış açılarına da hayatınızda alan açın.`;
    } else if (isHarmonicElement) {
      headline = `${s1.element} ve ${s2.element}: Birbirini Besleyen Kusursuz Simya`;
      chemistry = `${s1.element === 'Ateş' || s2.element === 'Ateş' ? 'Ateş ile Hava: Biri esintiyi getirir, diğeri alevi harlar! Birbirinizi zihnen ve kalben sürekli canlı tutarsınız.' : 'Toprak ile Su: Su toprağı bereketlendirir, toprak ise suya güvenli bir vaha inşa eder. Birbirinizi sakinleştiren ve köklendiren bir huzur vardır.'}`;
      fights = `Fikir ayrılıkları genelde yaratıcı bir uzlaşmayla çözülür. Biri mantığı, diğeri hissi masaya koyar.`;
      advice = `Bu uyum nadir bulunan bir armağandır; birbirinizin doğal yeteneklerini takdir etmeyi sürdürün.`;
    } else if (isFrictionElement) {
      headline = `Zıt Kutupların Manyetik Çekimi`;
      chemistry = `Kimya adeta kıvılcımlı! ${s1.name} ve ${s2.name} ilk bakışta "biz asla yapamayız" der ama gözlerini de birbirlerinden alamazlar. Zıtlıklar birbirini çılgınca çeker.`;
      fights = `Biri duygusal derinlik ve his ararken, diğeri hız veya mantık bekleyebilir. İletişim kopuklukları "sen beni hiç anlamıyorsun" cümlesiyle başlayabilir.`;
      advice = `Karşınızdakini kendinize benzetmeye çalışmak yerine, sahip olmadığı özelliklerine hayran kalmayı deneyin.`;
    } else {
      headline = `Farklı Dünyaların Birbirini Büyüten Dansı`;
      chemistry = `Farklı mizaçlara sahip olsanız da birbirinize daha önce hiç tatmadığınız deneyimler armağan edebilirsiniz. Biri plan yaparken diğeri hayal kurar.`;
      fights = `Ortak bir dil bulmak biraz zaman alabilir ama sabır gösterildiğinde sarsılmaz bir bağa dönüşür.`;
      advice = `İlişkinizde açık iletişimi elden bırakmayın, varsayımlar yerine açıkça konuşun.`;
    }

    return { overall, elementMatch, communication, passion, trust, headline, chemistry, fights, advice };
  };

  const result = calculateSynastry(sign1, sign2, relationType);

  // Quick preset pairs
  const presets = [
    { name: 'Koç & Terazi', s1: 'aries', s2: 'libra', tag: 'Zıt Kutupların Çekimi' },
    { name: 'Boğa & Başak', s1: 'taurus', s2: 'virgo', tag: 'Toprak Sadakati' },
    { name: 'İkizler & Kova', s1: 'gemini', s2: 'aquarius', tag: 'Zihin Fırtınası' },
    { name: 'Yengeç & Akrep', s1: 'cancer', s2: 'scorpio', tag: 'Ruh Eşi Bağı' },
    { name: 'Aslan & Yay', s1: 'leo', s2: 'sagittarius', tag: 'Alev Alan Tutku' },
    { name: 'Oğlak & Balık', s1: 'capricorn', s2: 'pisces', tag: 'Kaya ile Okyanus' },
  ];

  return (
    <section id="synastry" className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-4 border-b border-purple-400/20">
        <div>
          <span className="text-xs uppercase tracking-widest text-purple-300 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Kozmik Uyum Matrisi (Sinastri)
          </span>
          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-slate-100 mt-1">
            Burç Uyumu & Kimya Analizi
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Sen ve partnerin (veya en yakın arkadaşın) gökyüzünde nasıl bir melodi oluşturuyorsunuz? Element dengesi, tutku, güven ve iletişim testi.
          </p>
        </div>

        {/* Relationship Type Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-700/80 rounded-xl shrink-0">
          <button
            onClick={() => setRelationType('love')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              relationType === 'love'
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Aşk & Romantizm
          </button>
          <button
            onClick={() => setRelationType('friendship')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              relationType === 'friendship'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Dostluk & İş
          </button>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-400" /> Popüler İkililer:
        </span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSign1Id(p.s1);
              setSign2Id(p.s2);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-900/60 hover:bg-purple-500/20 text-slate-300 hover:text-purple-200 border border-slate-800 hover:border-purple-400/40 transition-colors"
          >
            {p.name} <span className="text-[10px] text-purple-400/80">({p.tag})</span>
          </button>
        ))}
      </div>

      {/* Interactive Picker & Visual Board */}
      <div className="bg-[#12182c]/90 border border-purple-400/20 rounded-3xl p-6 lg:p-8 backdrop-blur-md shadow-2xl space-y-8">
        {/* Sign Selection Dual Area */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Sign 1 */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-[#161d36] border border-slate-700/60 space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-purple-300 font-semibold block">
              1. Burç (Senin Burcun)
            </span>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-2xl font-bold shrink-0"
                style={{ color: sign1.elementColor }}
              >
                {sign1.symbol}
              </div>
              <div className="flex-1">
                <select
                  value={sign1Id}
                  onChange={(e) => setSign1Id(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-sm font-semibold focus:outline-none focus:border-purple-400"
                >
                  {ZODIAC_SIGNS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.symbol}) - {s.element}
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-400 mt-1">
                  Element: {sign1.element} · Nitelik: {sign1.modality}
                </div>
              </div>
            </div>
          </div>

          {/* VS Heart Icon */}
          <div className="md:col-span-1 flex justify-center py-2 md:py-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500/20 via-purple-500/20 to-sky-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-lg">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400/20 animate-pulse" />
            </div>
          </div>

          {/* Sign 2 */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-[#161d36] border border-slate-700/60 space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-purple-300 font-semibold block">
              2. Burç (Partnerin / Arkadaşın)
            </span>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-2xl font-bold shrink-0"
                style={{ color: sign2.elementColor }}
              >
                {sign2.symbol}
              </div>
              <div className="flex-1">
                <select
                  value={sign2Id}
                  onChange={(e) => setSign2Id(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-sm font-semibold focus:outline-none focus:border-purple-400"
                >
                  {ZODIAC_SIGNS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.symbol}) - {s.element}
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-400 mt-1">
                  Element: {sign2.element} · Nitelik: {sign2.modality}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Big Synergy Score Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-slate-900/60 border border-purple-400/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] uppercase tracking-wider text-purple-300 font-semibold">
              Kozmik Sinerji Skoru
            </span>
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-slate-100">
              {result.headline}
            </h3>
            <p className="text-xs text-slate-300">
              {sign1.name} ({sign1.element}) & {sign2.name} ({sign2.element})
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="w-20 h-20 rounded-full bg-slate-950/80 border-2 border-purple-400 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(192,132,252,0.3)]">
              <span className="text-2xl font-bold font-mono text-purple-200">
                %{result.overall}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                Uyum
              </span>
            </div>
          </div>
        </div>

        {/* 4 Metrics Progress Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Element Uyumu
              </span>
              <span className="font-mono font-bold text-amber-300">%{result.elementMatch}</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${result.elementMatch}%` }}
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <MessageCircle className="w-3.5 h-3.5 text-sky-400" /> İletişim & Espri
              </span>
              <span className="font-mono font-bold text-sky-300">%{result.communication}</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${result.communication}%` }}
                className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-700"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Flame className="w-3.5 h-3.5 text-rose-400" /> {relationType === 'love' ? 'Tutku & Çekim' : 'Ortak Motivasyon'}
              </span>
              <span className="font-mono font-bold text-rose-300">%{result.passion}</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${result.passion}%` }}
                className="h-full bg-gradient-to-r from-rose-400 to-red-500 rounded-full transition-all duration-700"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Sadakat & Güven
              </span>
              <span className="font-mono font-bold text-emerald-300">%{result.trust}</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${result.trust}%` }}
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Witty Astrological Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Chemistry */}
          <div className="p-5 rounded-2xl bg-[#141b33] border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 block">
              1. Çekim Kimyası
            </span>
            <h4 className="text-sm font-bold text-slate-100 font-cinzel">
              Neden Birbirlerine Tutulurlar?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.chemistry}
            </p>
          </div>

          {/* Fights & Friction */}
          <div className="p-5 rounded-2xl bg-[#141b33] border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300 block">
              2. Kriz Anları & Kavgalar
            </span>
            <h4 className="text-sm font-bold text-slate-100 font-cinzel">
              Kavga Çıktığında Ne Olur?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.fights}
            </p>
          </div>

          {/* Prescription */}
          <div className="p-5 rounded-2xl bg-[#141b33] border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">
              3. Astrolog Reçetesi
            </span>
            <h4 className="text-sm font-bold text-slate-100 font-cinzel">
              İlişkiyi Zirveye Taşıma Tavsiyesi
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.advice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
