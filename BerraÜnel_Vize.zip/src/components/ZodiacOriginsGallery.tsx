import React, { useState } from 'react';
import { NatalChartData } from '../utils/astrologyCalc';
import { ConstellationSvg } from './ConstellationSvg';
import { Sparkles, Compass, Search, BookOpen, Eye, Info, Flame, Mountain, Wind, Droplets, X, ZoomIn, Star } from 'lucide-react';

export interface ZodiacSignOrigin {
  id: string;
  name: string;
  latinName: string;
  dates: string;
  symbol: string;
  element: 'Ateş' | 'Toprak' | 'Hava' | 'Su';
  modality: 'Öncü' | 'Sabit' | 'Değişken';
  ruler: string;
  elementColor: string;
  image: string;
  nameOrigin: string; // Adı nereden nasıl geldi? (Net & kısa)
  symbolOrigin: string; // Sembolü neden öyle oldu? (Net & kısa)
  archetypeRole: string; // Arketip ve karakter özeti
  mythologicalFigure: string; // Mitolojik karşılık
  strengths: string[];
}

export const ZODIAC_ORIGINS_DATA: ZodiacSignOrigin[] = [
  {
    id: 'aries',
    name: 'Koç',
    latinName: 'Aries',
    dates: '21 Mart - 19 Nisan',
    symbol: '♈',
    element: 'Ateş',
    modality: 'Öncü',
    ruler: 'Mars',
    elementColor: '#f97316',
    image: '/assets/images/zodiac_aries_card_1793493607284.jpg',
    nameOrigin:
      'Antik Yunan mitolojisinde çocukları kurtaran ve Argonotlar\'ın peşine düştüğü "Altın Postlu Uçan Koç" Chrysomallos efsanesinden gelir. Babil astronomisinde ise ilkbahar ekinoksunu ve yeni yaşam döngüsünü başlatan başboynuzlu koç takımyıldızı olarak adlandırılmıştır.',
    symbolOrigin:
      'Koçun iki yana kıvrılan görkemli boynuzlarını ve topraktan fışkıran ilk ilkbahar filizini simgeler. Enerjinin tek bir merkezden patlayarak dışa doğru yayılmasını temsil eder.',
    archetypeRole: 'Korkusuz Öncü & Cesur Başlatıcı',
    mythologicalFigure: 'Ares (Savaş ve İrade Tanrısı) & Altın Postlu Koç',
    strengths: ['Cesaret', 'Durdurulamaz İrade', 'Liderlik', 'Samimiyet'],
  },
  {
    id: 'taurus',
    name: 'Boğa',
    latinName: 'Taurus',
    dates: '20 Nisan - 20 Mayıs',
    symbol: '♉',
    element: 'Toprak',
    modality: 'Sabit',
    ruler: 'Venüs',
    elementColor: '#10b981',
    image: '/assets/images/zodiac_taurus_card_1793493572256.jpg',
    nameOrigin:
      'Babil\'de "Göklerin Boğası" (Gugalanna) olarak anılırdı. Yunan mitolojisinde ise baş tanrı Zeus\'un prenses Europa\'yı sırtında Girit adasına kaçırmak için dönüştüğü heybetli ve uysal beyaz boğa figüründen adını almıştır; toprağın bereketini ve sarsılmaz gücünü simgeler.',
    symbolOrigin:
      'Boğa başını ve hilal şeklindeki boynuzlarını resmeder. Üstteki yay aynı zamanda Ay hilalini (sezgi ve üretkenlik), alttaki tam daire ise Güneş\'i (maddi beden ve köklenme) birleştirir.',
    archetypeRole: 'Toprağın Efendisi & Güven Mimarı',
    mythologicalFigure: 'Aphrodite (Venüs) & Girit Boğası',
    strengths: ['Sadakat', 'Sabır', 'Estetik Zevk', 'Maddi Bereket'],
  },
  {
    id: 'gemini',
    name: 'İkizler',
    latinName: 'Gemini',
    dates: '21 Mayıs - 20 Haziran',
    symbol: '♊',
    element: 'Hava',
    modality: 'Değişken',
    ruler: 'Merkür',
    elementColor: '#38bdf8',
    image: '/assets/aistudio/image_8b80aa3f.png',
    nameOrigin:
      'Yunan mitolojisinde kraliçe Leda\'nın ikiz oğulları Castor ve Pollux\'tan (Dioscuri) gelir. Biri ölümlü, diğeri ölümsüz olan bu iki kardeşin birbirine olan sarsılmaz sevgisi ve ayrılmaz yoldaşlığı gökyüzüne taşınmıştır.',
    symbolOrigin:
      'Roma rakamıyla 2 (II) sayısını ve evrendeki düalizmi simgeler. İki dikey sütun zihnin iki kutbunu (madde ve mana, bilinç ve bilinçaltı), yatay çizgiler ise bu ikisini birbirine bağlayan düşünce köprülerini ifade eder.',
    archetypeRole: 'Meraklı Kaşif & Kozmik Haberci',
    mythologicalFigure: 'Hermes (Merkür) & Castor-Pollux',
    strengths: ['Hızlı Zeka', 'Adaptasyon', 'İletişim Ustası', 'Merak'],
  },
  {
    id: 'cancer',
    name: 'Yengeç',
    latinName: 'Cancer',
    dates: '21 Haziran - 22 Temmuz',
    symbol: '♋',
    element: 'Su',
    modality: 'Öncü',
    ruler: 'Ay',
    elementColor: '#6366f1',
    image: '/assets/images/zodiac_cancer_card_1793493608418.jpg',
    nameOrigin:
      'Herkül çok başlı su canavarı Hydra ile savaşırken, tanrıça Hera\'nın Herkül\'ün dikkatini dağıtması için gönderdiği sadık dev yengeç Karkinos\'tan gelir. Kahramanca savaşan yengecin fedakarlığı ödüllendirilerek göğe bir takımyıldız olarak yükseltilmiştir.',
    symbolOrigin:
      'Yengecin koruyucu iki kıskacını veya bir annenin kucağındaki iki göğsü tasvir eder. İçeriye doğru kıvrılan kapalı halkalar, içsel duygusal mahremiyeti ve aileyi koruyan kabuğu simgeler.',
    archetypeRole: 'Kutsal Şefkat & Hafıza Muhafızı',
    mythologicalFigure: 'Selene (Ay Tanrıçası) & Karkinos',
    strengths: ['Yüksek Empati', 'Korumacılık', 'Derin Sezgi', 'Bağlılık'],
  },
  {
    id: 'leo',
    name: 'Aslan',
    latinName: 'Leo',
    dates: '23 Temmuz - 22 Ağustos',
    symbol: '♌',
    element: 'Ateş',
    modality: 'Sabit',
    ruler: 'Güneş',
    elementColor: '#f59e0b',
    image: '/assets/images/zodiac_leo_card_1793493545979.jpg',
    nameOrigin:
      'Herkül\'ün 12 görevinden ilki olan ve postu hiçbir okla delinemeyen efsanevi Nemea Aslanı\'ndan gelir. Güneşin en yakıcı ve parıltılı olduğu yaz zirvesini temsil ettiği için antik Mısır ve Babil\'de kraliyetin ve tanrısal ışıltının simgesi sayılmıştır.',
    symbolOrigin:
      'Kükreyen bir aslanın rüzgarda dalgalanan görkemli yelesini ve kıvrılan kuyruğunu çizer. Ezoterik anatomide ise kalbin sol karıncığı ile aort damarının kıvrımını ve yaşam enerjisini simgeler.',
    archetypeRole: 'Işıltılı Hükümdar & Yaratıcı Kalp',
    mythologicalFigure: 'Apollon (Güneş ve Sanat Tanrısı)',
    strengths: ['Cömertlik', 'Karizma', 'Yaratıcılık', 'Özgüven'],
  },
  {
    id: 'virgo',
    name: 'Başak',
    latinName: 'Virgo',
    dates: '23 Ağustos - 22 Eylül',
    symbol: '♍',
    element: 'Toprak',
    modality: 'Değişken',
    ruler: 'Merkür',
    elementColor: '#10b981',
    image: '/assets/images/zodiac_virgo_card_1793493610071.jpg',
    nameOrigin:
      'Babil\'de bereket ve hasat tanrıçası Shala ("Eline Buğday Başağı Tutan Bakire") olarak adlandırılmıştır. Yunan mitolojisinde ise yeryüzündeki kötülüklere dayanamayıp göğe yükselen son masum tanrıça, adalet ve saflığın simgesi Astraea ile özdeşleşir.',
    symbolOrigin:
      'Hasat edilmiş buğday başaklarını ve el değmemiş saflığı simgeler. "M" harfi formu "Medicus" (şifacı) kökünden gelirken, içeriye doğru kıvrılan kuyruk içsel arılığı, titizliği ve enerjiyi dışa saçmama disiplinini temsil eder.',
    archetypeRole: 'Titiz Şifacı & Düzen Mimarı',
    mythologicalFigure: 'Demeter (Hasat Tanrıçası) & Astraea',
    strengths: ['Analitik Zeka', 'Faydalılık', 'Detay Ustalığı', 'Alçakgönüllülük'],
  },
  {
    id: 'libra',
    name: 'Terazi',
    latinName: 'Libra',
    dates: '23 Eylül - 22 Ekim',
    symbol: '♎',
    element: 'Hava',
    modality: 'Öncü',
    ruler: 'Venüs',
    elementColor: '#38bdf8',
    image: '/assets/images/zodiac_libra_card_1793493608291.jpg',
    nameOrigin:
      'Zodyaktaki tek canlı olmayan nesne burcudur. Babil\'de "Göklerin Dengesi" (Zibanitu) olarak anılırdı. Roma döneminde, gece ile gündüzün eşitlendiği sonbahar ekinoksunu ve adalet tanrıçası Themis ile Astraea\'nın elindeki adalet terazisini simgelemek üzere bağımsız bir burç ilan edildi.',
    symbolOrigin:
      'Eski Mısır ve Babil\'de ufuk çizgisinde batan güneşi ve dengelenmiş iki kefeli bir adalet terazisini resmeder. Doğadaki gece-gündüz eşitliğinin geometrik ifadesidir.',
    archetypeRole: 'Barış Elçisi & Estetik Diplomat',
    mythologicalFigure: 'Themis (Adalet Tanrıçası) & Aphrodite',
    strengths: ['Adalet Duygusu', 'Zarafet', 'Diplomasi', 'Uyum'],
  },
  {
    id: 'scorpio',
    name: 'Akrep',
    latinName: 'Scorpio',
    dates: '23 Ekim - 21 Kasım',
    symbol: '♏',
    element: 'Su',
    modality: 'Sabit',
    ruler: 'Plüton & Mars',
    elementColor: '#6366f1',
    image: '/assets/images/zodiac_scorpio_card_1793493559487.jpg',
    nameOrigin:
      'Yunan mitolojisinde kibirli dev avcı Orion\'u tek bir zehirli iğne darbesiyle dize getiren Gaia\'nın koruyucu akrebinden gelir. Bu yüzden gökyüzünde Akrep takımyıldızı doğarken Orion batı ufkunda batar; iki ebedi rakip asla aynı anda gökte görünmez.',
    symbolOrigin:
      'Akrep kuyruğundaki zehirli ve keskin iğneyi simgeler. Başak\'ın içine kıvrılan "M" harfine karşılık, Akrep\'in "M" harfi dışa doğru fırlayan sivri bir ok ile biter; derin savunma ve küllerinden doğuş gücünü gösterir.',
    archetypeRole: 'Gizemlerin Simyacısı & Dönüşüm Ustası',
    mythologicalFigure: 'Hades / Plüton (Yeraltı ve Dönüşüm Tanrısı)',
    strengths: ['Sarsılmaz İrade', 'Tutku', 'Sezgi Gücü', 'Yenilenme'],
  },
  {
    id: 'sagittarius',
    name: 'Yay',
    latinName: 'Sagittarius',
    dates: '22 Kasım - 21 Aralık',
    symbol: '♐',
    element: 'Ateş',
    modality: 'Değişken',
    ruler: 'Jüpiter',
    elementColor: '#ea580c',
    image: '/assets/images/zodiac_sagittarius_card_1793493625495.jpg',
    nameOrigin:
      'Mitolojide tıp, müzik ve kehanet ustası bilge Sentor (yarı insan, yarı at) Kheiron ile Babil\'in ok atan kanatlı savaş tanrısı Nergal\'den türetilmiştir. İnsanın ilkel içgüdülerinden sıyrılarak göksel felsefeye ve yüksek bilince doğru ok fırlatmasını simgeler.',
    symbolOrigin:
      'Gök kubbeye doğru gerilmiş bir yayın fırlattığı yukarı yönlü oku ve yayın kirişini temsil eder. Maddiyattan sıyrılarak manevi ufuklara yönelen insan arayışını simgeler.',
    archetypeRole: 'Gezgin Filozof & Hakikat Arayıcısı',
    mythologicalFigure: 'Zeus (Jüpiter) & Bilge Sentor Kheiron',
    strengths: ['Optimizm', 'Geniş Vizyon', 'Özgürlük Tutkusu', 'Cömertlik'],
  },
  {
    id: 'capricorn',
    name: 'Oğlak',
    latinName: 'Capricorn',
    dates: '22 Aralık - 19 Ocak',
    symbol: '♑',
    element: 'Toprak',
    modality: 'Öncü',
    ruler: 'Satürn',
    elementColor: '#059669',
    image: '/assets/images/zodiac_capricorn_card_1793493626622.jpg',
    nameOrigin:
      'Babil\'in bilgelik ve derin sular tanrısı Ea\'nın sembolü olan yarı keçi, yarı balık kutsal yaratık Suhur-mashu\'dan gelir. Yunan mitolojisinde ise canavar Typhon\'dan kaçarken Nil nehrine atlayıp alt bedeni balığa dönüşen dağ tanrısı Pan ile özdeşleşir.',
    symbolOrigin:
      'Dağ keçisinin boynuzları ile denizin dibine dalan balık kuyruğunun birleşimini çizer. "V" harfi dağın zirvesine tırmanan keçiyi, kıvrımlı spiral kuyruk ise denizin derinliklerindeki ruhsal hafızayı simgeler.',
    archetypeRole: 'Zirve Mimarı & Zamanın Bilgesi',
    mythologicalFigure: 'Kronos (Satürn - Zaman Tanrısı) & Pan',
    strengths: ['Disiplin', 'Sabır', 'Sorumluluk', 'Dayanıklılık'],
  },
  {
    id: 'aquarius',
    name: 'Kova',
    latinName: 'Aquarius',
    dates: '20 Ocak - 18 Şubat',
    symbol: '♒',
    element: 'Hava',
    modality: 'Sabit',
    ruler: 'Uranüs & Satürn',
    elementColor: '#0284c7',
    image: '/assets/images/zodiac_aquarius_card_1793493627784.jpg',
    nameOrigin:
      'Babil\'de ulu tanrı Ea\'nın göksel testilerden yeryüzüne hayat ve bilgelik suyu dökmesiyle doğdu. Yunan mitolojisinde ise Olympos dağında tanrılara nektar ve ölümsüzlük suyu sunan prens Ganymedes\'in gökyüzündeki siluetidir.',
    symbolOrigin:
      'Göksel testiden dökülen iki paralel su veya elektrik/frekans dalgasını simgeler. Ezoterik olarak bu dalgalar hava elementinin zihinsel titreşimlerini ve bilginin insanlığa akışını tasvir eder.',
    archetypeRole: 'Vizyoner Reformist & Özgür Ruh',
    mythologicalFigure: 'Uranos (Gökyüzü Tanrısı) & Ganymedes',
    strengths: ['Özgünlük', 'Hümanizm', 'İleri Görüşlülük', 'Yenilikçilik'],
  },
  {
    id: 'pisces',
    name: 'Balık',
    latinName: 'Pisces',
    dates: '19 Şubat - 20 Mart',
    symbol: '♓',
    element: 'Su',
    modality: 'Değişken',
    ruler: 'Neptün & Jüpiter',
    elementColor: '#3b82f6',
    image: '/assets/images/zodiac_pisces_card_1793493627059.jpg',
    nameOrigin:
      'Aşk tanrıçası Aphrodite ve oğlu Eros\'un alev saçan canavar Typhon\'dan kaçmak için Fırat nehrine atlayıp dönüştükleri iki kutsal balıktan gelir. Birbirlerini hırçın dalgalarda kaybetmemek için kuyruklarından gümüş bir kordonla bağlıdırlar.',
    symbolOrigin:
      'Zıt yönlere doğru yüzen iki hilal balığı ve onları göbekten birbirine bağlayan gümüş kader kordonunu tasvir eder. Biri dünyaya, diğeri ruhsal aleme yüzen iki zıt kutbun birliğini simgeler.',
    archetypeRole: 'Kozmik Rüyacı & Koşulsuz Sevgi',
    mythologicalFigure: 'Poseidon (Neptün) & Aphrodite/Eros',
    strengths: ['Koşulsuz Sevgi', 'Güçlü Sezgi', 'Sanatsal Ruh', 'Empati'],
  },
];

// Element Color Theme Configurator (Ateş = sıcak turuncu/amber, Toprak = zümrüt/yeşil, Hava = gök mavisi/cyan, Su = derin okyanus/mavi)
const ELEMENT_THEMES = {
  Ateş: {
    border: 'border-amber-500/40 hover:border-orange-400',
    cardBg: 'from-[#1c1214] via-[#121625] to-[#0a0d18]',
    glowBg: '#f97316',
    badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    button: 'bg-gradient-to-r from-orange-500 to-amber-600 text-slate-950 hover:from-orange-400 hover:to-amber-500',
    accent: '#f97316',
    glow: 'rgba(249, 115, 22, 0.45)',
  },
  Toprak: {
    border: 'border-emerald-500/40 hover:border-emerald-400',
    cardBg: 'from-[#101b17] via-[#121625] to-[#0a0d18]',
    glowBg: '#10b981',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    button: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:from-emerald-400 hover:to-teal-500',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.45)',
  },
  Hava: {
    border: 'border-sky-500/40 hover:border-sky-400',
    cardBg: 'from-[#101b2a] via-[#121625] to-[#0a0d18]',
    glowBg: '#38bdf8',
    badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    button: 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-400 hover:to-indigo-500',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.45)',
  },
  Su: {
    border: 'border-indigo-500/40 hover:border-blue-400',
    cardBg: 'from-[#12152f] via-[#121625] to-[#0a0d18]',
    glowBg: '#6366f1',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    button: 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-400 hover:to-blue-500',
    accent: '#818cf8',
    glow: 'rgba(99, 102, 241, 0.45)',
  },
};

interface ZodiacOriginsGalleryProps {
  chart?: NatalChartData;
}

export const ZodiacOriginsGallery: React.FC<ZodiacOriginsGalleryProps> = ({ chart }) => {
  const [selectedElement, setSelectedElement] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalSign, setActiveModalSign] = useState<ZodiacSignOrigin | null>(null);

  const filteredSigns = ZODIAC_ORIGINS_DATA.filter((sign) => {
    const matchesElement = selectedElement === 'Tümü' || sign.element === selectedElement;
    const matchesSearch =
      sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sign.latinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sign.archetypeRole.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesElement && matchesSearch;
  });

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'Ateş':
        return <Flame className="w-3.5 h-3.5 text-orange-400" />;
      case 'Toprak':
        return <Mountain className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Hava':
        return <Wind className="w-3.5 h-3.5 text-sky-400" />;
      case 'Su':
        return <Droplets className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Compass className="w-3.5 h-3.5 text-amber-300" />;
    }
  };

  return (
    <section id="zodiac-origins" className="w-full space-y-8 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-4 border-b border-purple-400/20">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Burçlar Galerisi & Takımyıldızlar
          </span>
          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-slate-100 mt-1">
            12 Burcun Mitolojik Çizimleri, Takımyıldızları ve Kökenleri
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Her burç kendi elementinin renk temasında (Ateş: sıcak turuncu, Su: mavi vb.), altın varaklı mitolojik çizimi ve hafif çizgisel SVG takımyıldız illüstrasyonu ile sergilenmektedir.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Burç veya özellik ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Filter Tabs by Element */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {['Tümü', 'Ateş', 'Toprak', 'Hava', 'Su'].map((elem) => (
            <button
              key={elem}
              onClick={() => setSelectedElement(elem)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                selectedElement === elem
                  ? 'bg-gradient-to-r from-amber-500/25 to-purple-500/25 text-amber-200 border border-amber-400/50 shadow-md'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {elem !== 'Tümü' && getElementIcon(elem)}
              <span>{elem}</span>
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Gösterilen: <span className="text-amber-300 font-bold">{filteredSigns.length}</span> / 12 Burç
        </div>
      </div>

      {/* Grid of 12 Signs with Element Color Themes & Constellation Line Art */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSigns.map((sign) => {
          const theme = ELEMENT_THEMES[sign.element] || ELEMENT_THEMES.Ateş;
          const isUserSun = chart?.sun.sign.id === sign.id;
          const isUserRising = chart?.ascendant.sign.id === sign.id;
          const isUserMoon = chart?.moon.sign.id === sign.id;

          return (
            <div
              key={sign.id}
              className={`bg-gradient-to-b ${theme.cardBg} border ${theme.border} rounded-2xl overflow-hidden backdrop-blur-md shadow-xl transition-all duration-300 flex flex-col justify-between group`}
            >
              {/* Mythological Tarot Card Poster Image */}
              <div
                className="relative aspect-[3/4] overflow-hidden bg-slate-950 cursor-pointer group/img"
                onClick={() => setActiveModalSign(sign)}
              >
                <img
                  src={sign.image}
                  alt={`${sign.name} Burcu Mitolojik Çizimi`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Top Badge: Glyph & Element with element theme */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span
                    className={`text-xs uppercase font-bold px-2 py-0.5 rounded-full backdrop-blur-md border flex items-center gap-1 shadow-lg ${theme.badge}`}
                  >
                    {getElementIcon(sign.element)}
                    {sign.element}
                  </span>

                  <span className="w-7 h-7 rounded-full bg-slate-950/80 border border-amber-400/50 flex items-center justify-center text-sm font-bold shadow text-amber-300">
                    {sign.symbol}
                  </span>
                </div>

                {/* Zoom Hint */}
                <div className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-slate-950/80 border border-amber-400/40 text-amber-300 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-semibold">
                  <ZoomIn className="w-3.5 h-3.5" />
                  Büyüt
                </div>

                {/* Bottom title inside image */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300/90 block">
                    {sign.dates}
                  </span>
                  <h3 className="text-xl font-cinzel font-bold text-white drop-shadow-md">
                    {sign.name} <span className="text-xs font-mono text-slate-300 font-normal">({sign.latinName})</span>
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* User Chart Tag (If matches calculated chart) */}
                  {(isUserSun || isUserRising || isUserMoon) && (
                    <div className="flex flex-wrap gap-1.5">
                      {isUserSun && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                          ☀️ Güneş Burcun
                        </span>
                      )}
                      {isUserRising && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                          ⬆️ Yükselen Burcun
                        </span>
                      )}
                      {isUserMoon && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold">
                          🌙 Ay Burcun
                        </span>
                      )}
                    </div>
                  )}

                  {/* Çizgisel Takımyıldız İllüstrasyonu (SVG - Noktaları Birleştiren Yıldızlar) */}
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-amber-300 font-semibold">
                        <Star className="w-3 h-3" /> {sign.latinName} Takımyıldızı
                      </span>
                      <span>Göksel Çizim</span>
                    </div>
                    <ConstellationSvg
                      signId={sign.id}
                      color={theme.accent}
                      glowColor={theme.glow}
                      className="h-20 my-0.5"
                    />
                  </div>

                  {/* Arketip Özeti */}
                  <div className="text-xs font-medium text-amber-200/90 italic">
                    "{sign.archetypeRole}"
                  </div>

                  {/* Section A: Adı Nereden ve Nasıl Geldi? (Net & Kısa) */}
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                    <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Adı Nereden Geldi?
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {sign.nameOrigin}
                    </p>
                  </div>

                  {/* Section B: Sembolü Neden Öyle Oldu? (Net & Kısa) */}
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-400/20 space-y-1">
                    <span className="text-[11px] font-bold text-purple-300 flex items-center gap-1">
                      <Compass className="w-3 h-3 text-purple-400" />
                      Sembolü Neden Böyle?
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {sign.symbolOrigin}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Detail Button using element theme */}
                <div className="pt-3 mt-2 border-t border-slate-800/60">
                  <button
                    onClick={() => setActiveModalSign(sign)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 ${theme.button}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Çizimi & Mitolojiyi İncele
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Gallery & Lore Modal */}
      {activeModalSign && (() => {
        const theme = ELEMENT_THEMES[activeModalSign.element] || ELEMENT_THEMES.Ateş;

        return (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`bg-[#10162a] border ${theme.border} rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[92vh] overflow-y-auto`}>
              <button
                onClick={() => setActiveModalSign(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Column: Full Mythological Poster */}
                <div className="md:col-span-5 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl aspect-[3/4] bg-slate-950">
                  <img
                    src={activeModalSign.image}
                    alt={activeModalSign.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Right Column: Detailed Lore & Explanations */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold bg-slate-900 border border-amber-400/40 shadow-lg text-amber-300"
                    >
                      {activeModalSign.symbol}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-slate-100">
                          {activeModalSign.name} Burcu
                        </h3>
                        <span className="text-sm font-mono text-slate-400">
                          ({activeModalSign.latinName})
                        </span>
                      </div>
                      <p className="text-xs text-amber-300 font-mono mt-0.5">
                        {activeModalSign.dates} · {activeModalSign.element} Elementi · {activeModalSign.modality}
                      </p>
                    </div>
                  </div>

                  {/* Takımyıldız SVG Çizimi Modal İçi */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <div className="text-[11px] font-mono text-amber-300 font-bold flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5" /> {activeModalSign.latinName} Çizgisel Takımyıldızı:
                    </div>
                    <ConstellationSvg
                      signId={activeModalSign.id}
                      color={theme.accent}
                      glowColor={theme.glow}
                      className="h-28"
                    />
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Adı Nereden ve Nasıl Geldi? (Kadim Mitoloji)
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        {activeModalSign.nameOrigin}
                      </p>
                      <p className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                        Mitolojik Figür / Tanrı: <strong className="text-slate-200">{activeModalSign.mythologicalFigure}</strong>
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-400/30 space-y-1">
                      <h4 className="font-bold text-purple-300 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <Compass className="w-3.5 h-3.5 text-purple-400" />
                        Sembolü (Glifi) Neden Öyle Çizildi?
                      </h4>
                      <p className="text-slate-200 leading-relaxed text-xs">
                        {activeModalSign.symbolOrigin}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                      <h4 className="font-bold text-emerald-300 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <Info className="w-3.5 h-3.5 text-emerald-400" />
                        Karakteristik Güçlü Yönleri
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeModalSign.strengths.map((str, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold"
                          >
                            {str}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModalSign(null)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all ${theme.button}`}
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};
