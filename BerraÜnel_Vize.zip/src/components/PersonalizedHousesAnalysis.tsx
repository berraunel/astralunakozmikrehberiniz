import React, { useState } from 'react';
import { NatalChartData, HouseCusp, CelestialBody } from '../utils/astrologyCalc';
import { Sparkles, Compass, Shield, Award, CheckCircle2, ChevronRight, Eye, Star, Flame, Mountain, Wind, Droplets } from 'lucide-react';

interface HouseDetails {
  number: number;
  latinName: string;
  title: string;
  category: 'Köşe (Angular)' | 'Ardıl (Succedent)' | 'Düşük (Cadent)';
  categoryType: 'angular' | 'succedent' | 'cadent';
  coreMeaning: string;
  governs: string[];
}

export const HOUSES_META: Record<number, HouseDetails> = {
  1: {
    number: 1,
    latinName: 'Vita (Yaşam)',
    title: 'Benlik, Beden, Dış Görünüş ve İlk İntiba',
    category: 'Köşe (Angular)',
    categoryType: 'angular',
    coreMeaning:
      'Doğum haritasının en kritik başlangıç noktasıdır (Yükselen / ASC). Dünyaya nasıl "Merhaba" dediğinizi, insanların sizi ilk gördüklerinde hissettikleri aurayı, fiziksel beden dilinizi, canlılığınızı ve hayata karşı temel yaklaşımınızı yönetir.',
    governs: ['Fiziksel duruş ve beden', 'İlk intiba ve aura', 'Kişisel hedefler ve cesaret', 'Hayata başlama refleksi'],
  },
  2: {
    number: 2,
    latinName: 'Lucrum (Kazanç)',
    title: 'Maddi Kaynaklar, Para, Öz Değer ve Yetenekler',
    category: 'Ardıl (Succedent)',
    categoryType: 'succedent',
    coreMeaning:
      'Kendi emeğinizle kazandığınız parayı, maddi güvenliğe bakış açınızı ve en önemlisi "Kendime ne kadar değer veriyorum?" sorusunun cevabını temsil eder. Sahip olduğunuz eşyalar ve doğuştan getirdiğiniz somut yetenekler bu evin konusudur.',
    governs: ['Kazanma ve biriktirme biçimi', 'Öz değer ve kendine güven', 'Taşınabilir mülkler', 'Tüketim ve harcama alışkanlıkları'],
  },
  3: {
    number: 3,
    latinName: 'Fratres (Kardeşler)',
    title: 'Zihinsel İşleyiş, İletişim, Kardeşler ve Yakın Çevre',
    category: 'Düşük (Cadent)',
    categoryType: 'cadent',
    coreMeaning:
      'Zihninizin nasıl çalıştığını, kelimeleri nasıl seçtiğinizi, merak duygunuzu ve günlük iletişim tarzınızı yönetir. Kardeşler, kuzenler, komşular, kısa seyahatler ve temel eğitim bu evin çatısı altındadır.',
    governs: ['Konuşma ve yazma yeteneği', 'Öğrenme hızı ve merak', 'Kardeşler ve yakın çevre', 'Gündelik seyahatler ve trafik'],
  },
  4: {
    number: 4,
    latinName: 'Genitor (Ebeveyn)',
    title: 'Yuva, Aile Kökleri, İçsel Güvenlik ve Ev Hayatı',
    category: 'Köşe (Angular)',
    categoryType: 'angular',
    coreMeaning:
      'Haritanın en dip noktasıdır (Imum Coeli - IC). Geldiğiniz soyu, aile kültürünüzü, çocukluğunuzun geçtiği evi ve yalnız kaldığınızda sığındığınız güvenli kaleyi simgeler. Duygusal temelinizin nerede atıldığını gösterir.',
    governs: ['Aile ve ata bağları', 'Yaşadığınız ev ve gayrimenkul', 'Bilinçaltı güvenlik ihtiyacı', 'Hayatın son demleri ve köklenme'],
  },
  5: {
    number: 5,
    latinName: 'Nati (Çocuklar)',
    title: 'Aşk, Yaratıcılık, Hobiler, Sahne ve Yaşam Sevinci',
    category: 'Ardıl (Succedent)',
    categoryType: 'succedent',
    coreMeaning:
      'Hayattan nasıl keyif aldığınızı, kalbinizin neyle çarptığını ve ruhunuzun nasıl yarattığını anlatır. Romantik aşklar, flörtler, sahne sanatları, risk alma arzusu ve çocuklarla ilişkiler bu evdedir.',
    governs: ['Romantik aşk ve flört tarzı', 'Yaratıcı sanatlar ve hobiler', 'Çocuklar ve içsel çocuk', 'Oyun, şans oyunları ve eğlence'],
  },
  6: {
    number: 6,
    latinName: 'Valetudo (Sağlık)',
    title: 'Günlük Rutinler, Çalışma Ortamı, Sağlık ve Hizmet',
    category: 'Düşük (Cadent)',
    categoryType: 'cadent',
    coreMeaning:
      'Gözlerden uzak her gün yaptığınız işleri, çalışma masanızı, iş arkadaşlarınızla ilişkilerinizi, beden sağlığınızı ve beslenme disiplininizi simgeler. Verimli ve faydalı olma arzunuz burada şekillenir.',
    governs: ['Günlük alışkanlıklar ve iş düzeni', 'Beden sağlığı ve bağışıklık', 'İş arkadaşları ve çalışanlar', 'Evcil hayvanlar'],
  },
  7: {
    number: 7,
    latinName: 'Uxor (Eş)',
    title: 'Evlilik, Ciddi Ortaklıklar, Açık Düşmanlar ve Aynalama',
    category: 'Köşe (Angular)',
    categoryType: 'angular',
    coreMeaning:
      'Benliğin tam karşısındaki "Biz" kapısıdır (Alçalan / DSC). Hayatınıza çektiğiniz romantik partnerleri, uzun süreli evliliği, iş ortaklıklarını ve kendinizde kabul etmeyip başkalarında aradığınız gölge tarafları yansıtır.',
    governs: ['Evlilik ve uzun vadeli ilişkiler', 'Ortaklıklar ve kontratlar', 'İkili ilişkilerde adalet', 'Açık rakipler ve yüzleşmeler'],
  },
  8: {
    number: 8,
    latinName: 'Mors (Dönüşüm)',
    title: 'Derin Dönüşümler, Ortak Paralar, Miras, Gizem ve Cinsellik',
    category: 'Ardıl (Succedent)',
    categoryType: 'succedent',
    coreMeaning:
      'Ruhsal simyanın ve krizlerden yeniden doğuşun evidir. Başkalarından gelen kaynaklar (eşin parası, miras, banka kredileri, ortak yatırımlar), okült konular, derin psikolojik korkular ve tutkulu cinsel bağlar bu evde incelenir.',
    governs: ['Psikolojik dayanıklılık ve yenilenme', 'Eşin geliri ve ortak bütçe', 'Miras, vergi ve borçlar', 'Ruhsal gizemler ve tabular'],
  },
  9: {
    number: 9,
    latinName: 'Iter (Yolculuk)',
    title: 'Yüksek Felsefe, Yurt Dışı, İnançlar, Akademi ve Ufuklar',
    category: 'Düşük (Cadent)',
    categoryType: 'cadent',
    coreMeaning:
      'Zihnin sınırlarının aşıldığı sonsuz gök kubbedir. Hayatın anlamını arayışınız, inanç sisteminiz, felsefi görüşleriniz, yabancı kültürler, yabancı diller, yükseköğrenim ve uzun uluslararası seyahatler bu evi temsil eder.',
    governs: ['Hayat felsefesi ve dünya görüşü', 'Yurt dışı ve uluslararası ilişkiler', 'Akademik eğitim ve yayıncılık', 'İnanç, etik ve hukuk'],
  },
  10: {
    number: 10,
    latinName: 'Regnum (Hükümranlık)',
    title: 'Kariyer, Toplumsal Statü, Başarı, Şan ve Miras',
    category: 'Köşe (Angular)',
    categoryType: 'angular',
    coreMeaning:
      'Haritanın öğle güneşi gibi parlayan en yüksek doruk noktasıdır (Medium Coeli / MC). Toplumda neyle tanınacağınızı, mesleki zirvenizi, saygınlığınızı ve dünyada bırakmak istediğiniz kalıcı izinizi gösterir.',
    governs: ['Kariyer ve mesleki unvanlar', 'Toplumsal saygınlık ve otorite', 'Görünür başarılar ve ödüller', 'Topluma önderlik etme tarzı'],
  },
  11: {
    number: 11,
    latinName: 'Benefacta (İyilikler)',
    title: 'Dostluklar, Kolektif Gruplar, Gelecek Hayalleri ve İdealler',
    category: 'Ardıl (Succedent)',
    categoryType: 'succedent',
    coreMeaning:
      'Bireyselliğin ötesine geçip insanlığa fayda sağlama evidir. Arkadaş çevreleriniz, dahil olduğunuz topluluklar, dernekler, hümanist vizyonunuz ve geleceğe dair en büyük umutlarınız bu evin himayesindedir.',
    governs: ['Dostluklar ve sosyal çevre', 'Topluluk projeleri ve dernekler', 'Gelecek planları ve umutlar', 'Kolektife katkı sağlama arzusu'],
  },
  12: {
    number: 12,
    latinName: 'Carcer (Gizli Mabed)',
    title: 'Bilinçaltı, Gizli Düşmanlar, İnziva, Rüyalar ve Ruhsal Şifa',
    category: 'Düşük (Cadent)',
    categoryType: 'cadent',
    coreMeaning:
      'Zodyakın görünmeyen okyanusudur. Kolektif bilinçdışı, rüyalar, kendi kendinizi sabote ettiğiniz kör noktalar, manevi inziva ve yalnız kalarak ulaştığınız ruhsal aydınlanma bu evde vuku bulur.',
    governs: ['Bilinçaltı kodları ve sezgiler', 'Rüyalar ve psişik yetenekler', 'Yalnızlık ve meditasyon ihtiyacı', 'Karmik temizlik ve şifa'],
  },
};

// Deep, curated astrological interpretations for all sign + house combinations
export function getPersonalizedHouseInterpretation(signId: string, houseNumber: number, signName: string) {
  const specificMap: Record<string, { role: string; interpretation: string; advice: string }> = {
    // 1. House placements
    'aries_1': {
      role: 'Korkusuz ve Kararlı Öncü',
      interpretation: '1. Eviniz Koç burcunda. Dünyaya bir savaşçı ve lider gibi yaklaşırsınız. Odaya girdiğinizde canlı, dolaysız ve kararlı auranız hemen dikkat çeker. Beklemekten hoşlanmaz, ilk adımı daima kendiniz atarsınız.',
      advice: 'Cesaretiniz harika; ancak ani parlamalar yerine sabır ve diplomasiyi de alet çantanıza ekleyin.',
    },
    'taurus_1': {
      role: 'Sakin, Karizmatik ve Güven Veren Duruş',
      interpretation: '1. Eviniz Boğa burcunda. İnsanlara güven, sükunet ve dingin bir zarafet aşılarsınız. Acele etmekten hoşlanmaz, sağlam ve kararlı adımlarla ilerlersiniz. Estetik zevkiniz ve kaliteli duruşunuz ilk bakışta fark edilir.',
      advice: 'Huzur ve kararlılığınız gücünüzdür; fakat değişime karşı inatçı bir direnç göstermemeye özen gösterin.',
    },
    'gemini_1': {
      role: 'Kıvrak Zekalı, Genç Ruhlu ve İletişim Ustası',
      interpretation: '1. Eviniz İkizler burcunda. Çevrenize konuşkan, meraklı, zeki ve son derece esnek bir enerji yayarsınız. İnsanlar sizinle sohbet ederken zamanın nasıl geçtiğini anlamaz. Çok yönlü ve daima yeni bilgi peşindesinizdir.',
      advice: 'Merakınız sizi zenginleştirir; ancak enerjinizi tek bir büyük projede odaklamayı da deneyimleyin.',
    },
    'cancer_1': {
      role: 'Şefkatli, Sezgisel ve Koruyucu Bir Varlık',
      interpretation: '1. Eviniz Yengeç burcunda. İnsanlar sizin yanınızda kendilerini güvende ve anlaşılmış hissederler. Sezgileriniz son derece güçlüdür; ortamın duygusal havasını hemen solursunuz. Yüz ifadeniz duygularınızı saklayamaz.',
      advice: 'Duygusal derinliğiniz rehberinizdir; ancak aşırı alınganlık geliştirip kabuğunuza çekilmekten kaçının.',
    },
    'leo_1': {
      role: 'Işıltılı, Sıcakkanlı ve Doğal Hükümdar',
      interpretation: '1. Eviniz Aslan burcunda (Yükselen Aslan!). Vitrininiz Güneş gibi parıldar. Odaya girdiğinizde sıcak, karizmatik ve asil duruşunuz insanları büyüler. Beden diliniz kendine güvenli, saçlarınız veya gülüşünüz dikkat çekicidir. Hayata yaratıcı bir sahne gibi yaklaşır, saygı ve takdir görmeyi hak edersiniz.',
      advice: 'Işığınız dünyayı ısıtır; sevdiklerinizin de kendi sahnelerinde parlamalarını yürekten destekleyin.',
    },
    'virgo_1': {
      role: 'Zarif, Titiz, Analitik ve Gözlemci',
      interpretation: '1. Eviniz Başak burcunda. İnsanlar sizi ölçülü, temiz, dikkatli ve güvenilir biri olarak algılar. Gözlem yeteneğiniz kusursuzdur; kimsenin görmediği detayları bir bakışta fark edersiniz. Pratik ve faydalı çözümler üretirsiniz.',
      advice: 'Mükemmeliyetçiliğinizi kendinize ve başkalarına karşı aşırı eleştiriye dönüştürmemeye dikkat edin.',
    },
    'libra_1': {
      role: 'Diplomatik, Büyüleyici ve Barışçıl Ahenk',
      interpretation: '1. Eviniz Terazi burcunda. Zarafetiniz, nezaketiniz ve estetik uyumunuz insanları derhal büyüler. Çatışmalardan uzak durur, ortamdaki gerilimleri tatlı dille çözen doğal bir diplomat gibi davranırsınız.',
      advice: 'Herkesi memnun etme çabasıyla kendi kişisel sınırlarınızdan ve hedeflerinizden taviz vermeyin.',
    },
    'scorpio_1': {
      role: 'Derin, Manyetik ve Karizmatik Güç',
      interpretation: '1. Eviniz Akrep burcunda. Bakışlarınız delici, auranız ise gizemli ve sarsılmaz bir çekim gücüne sahiptir. İnsanların gerçek niyetlerini hemen sezersiniz. Kolay kolay sır vermez, krizleri güce çeviren bir direnç sergilersiniz.',
      advice: 'Gücünüz muazzamdır; ancak gereksiz şüphecilik yerine güvendiğiniz insanlara kalbinizi açmayı deneyin.',
    },
    'sagittarius_1': {
      role: 'Neşeli, Cesur ve Vizyoner Seyyah',
      interpretation: '1. Eviniz Yay burcunda. Pozitif enerjiniz, samimi kahkahanız ve geniş ufuklarınız insanlara umut aşılar. Hayata bir macera ve keşif yolculuğu gibi bakar, kısıtlanmaya ve kalıplara asla tahammül edemezsiniz.',
      advice: 'Büyük resme odaklanırken hayatın küçük pratik detaylarını ve sorumluluklarını göz ardı etmeyin.',
    },
    'capricorn_1': {
      role: 'Olgun, Saygın ve Sarsılmaz Otorite',
      interpretation: '1. Eviniz Oğlak burcunda. Genç yaşta bile olgun, vakur ve disiplinli bir duruş sergilersiniz. İnsanlar size doğal olarak saygı duyar ve sorumluluk emanet eder. Zamanın değerini bilir, hedeflerinize sabırla tırmanırsınız.',
      advice: 'Ciddiyetiniz başarı getirir; ancak hayatın neşeli ve oyun dolu anlarına da kalbinizde yer açın.',
    },
    'aquarius_1': {
      role: 'Özgün, Vizyoner ve Bağımsız Birey',
      interpretation: '1. Eviniz Kova burcunda. Sıra dışı stiliniz, entelektüel bakışınız ve bağımsız duruşunuzla kalabalıklardan hemen ayrılırsınız. İnsan haklarına saygılı, geleceğe odaklı ve hiçbir dayatmaya boyun eğmeyen bir kimliğiniz vardır.',
      advice: 'Özgürlük aşkınız takdire şayandır; ancak duygusal yakınlıklarda mesafeli kalmamaya özen gösterin.',
    },
    'pisces_1': {
      role: 'Mistik, Şefkatli ve Büyüleyici Rüyacı',
      interpretation: '1. Eviniz Balık burcunda. Gözleriniz derin bir bilgelik ve şefkat taşır. Dünyaya yumuşak, affedici ve sanatsal bir pencereden bakarsınız. İnsanların dertlerini sünger gibi çeker, ortama mistik bir huzur katarsınız.',
      advice: 'Empatiniz paha biçilemez; fakat başkalarının olumsuz enerjilerine karşı enerjisel sınırlar çekmeyi öğrenin.',
    },
  };

  const key = `${signId}_${houseNumber}`;
  if (specificMap[key]) {
    return specificMap[key];
  }

  // Astrologer Synthesis Engine for other houses
  const signAdjectives: Record<string, { tone: string; power: string; shadow: string }> = {
    aries: { tone: 'cesur, doğrudan ve dinamik', power: 'inisiyatif alma ve mücadele gücü', shadow: 'acelecilik ve sabırsızlık' },
    taurus: { tone: 'sağlam, üretken ve huzurlu', power: 'sabır, güvenilirlik ve kalıcı değer inşa etme', shadow: 'inatçılık ve konfor tuzağı' },
    gemini: { tone: 'kıvrak, meraklı ve çok yönlü', power: 'hızlı iletişim, öğrenme ve adaptasyon', shadow: 'odak dağınıklığı ve yüzeysellik' },
    cancer: { tone: 'şefkatli, sezgisel ve koruyucu', power: 'derin empati ve duygusal aidiyet', shadow: 'aşırı alınganlık ve geçmişe takılma' },
    leo: { tone: 'asil, ışıltılı ve yaratıcı', power: 'doğal karizma, cömertlik ve liderlik', shadow: 'ego çatışması ve onay bağımlılığı' },
    virgo: { tone: 'titiz, analitik ve düzenli', power: 'kusursuz detay yönetimi ve pratik şifa', shadow: 'aşırı eleştiri ve evham' },
    libra: { tone: 'diplomatik, zarif ve dengeli', power: 'uzlaşma zekası ve estetik adalet', shadow: 'kararsızlık ve çatışmadan kaçış' },
    scorpio: { tone: 'tutkulu, derin ve dönüştürücü', power: 'sarsılmaz psikolojik güç ve gizemleri çözme', shadow: 'şüphecilik ve kontrol takıntısı' },
    sagittarius: { tone: 'özgür, vizyoner ve neşeli', power: 'büyük resmi görme ve felsefi bilgelik', shadow: 'abartı ve detayları savsaklama' },
    capricorn: { tone: 'disiplinli, sabırlı ve stratejik', power: 'kalıcı başarı, saygınlık ve dayanıklılık', shadow: 'katılık ve aşırı görev odaklılık' },
    aquarius: { tone: 'özgün, yenilikçi ve hümanist', power: 'vizyoner düşünce ve kolektif zeka', shadow: 'duygusal soğukluk ve tecrit' },
    pisces: { tone: 'sezgisel, merhametli ve akışta', power: 'sınırsız hayal gücü ve ruhsal şefkat', shadow: 'gerçeklerden kaçış ve kurban rolü' },
  };

  const adj = signAdjectives[signId] || signAdjectives.aries;
  const house = HOUSES_META[houseNumber] || HOUSES_META[1];

  return {
    role: `${signName} Enerjisinin ${house.number}. Evdeki Yansıması`,
    interpretation: `Haritanızda ${house.number}. Ev ${signName} burcuyla başlıyor. Bu yerleşim, ${house.title.toLowerCase()} alanına ${adj.tone} bir nitelik kazandırır. Bu sahada kararlarınızı ${adj.power} ile alır; hayatın bu alanında sıradan çözümler yerine ${signName} burcunun özgün prensiplerini uygularsınız.`,
    advice: `Bu yaşam alanında ${adj.shadow} tuzağına düşmeden, ${signName} burcunun yüksek frekanslı yapıcı potansiyelini sergileyin.`,
  };
}

interface PersonalizedHousesAnalysisProps {
  chart: NatalChartData;
}

export const PersonalizedHousesAnalysis: React.FC<PersonalizedHousesAnalysisProps> = ({ chart }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'angular' | 'succedent' | 'cadent'>('all');
  const [activeHouseModal, setActiveHouseModal] = useState<HouseCusp | null>(null);

  // Group houses by category
  const filteredHouses = chart.houses.filter((h) => {
    const meta = HOUSES_META[h.houseNumber];
    if (selectedFilter === 'all') return true;
    return meta.categoryType === selectedFilter;
  });

  // Get planets residing in a specific house
  const getPlanetsInHouse = (houseNum: number): CelestialBody[] => {
    const bodies = [
      chart.sun,
      chart.moon,
      ...chart.planets,
      chart.northNode,
      chart.southNode,
    ];
    return bodies.filter((b) => b.house === houseNum);
  };

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'Ateş':
        return <Flame className="w-3.5 h-3.5 text-red-400" />;
      case 'Toprak':
        return <Mountain className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Hava':
        return <Wind className="w-3.5 h-3.5 text-sky-400" />;
      case 'Su':
        return <Droplets className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-amber-300" />;
    }
  };

  return (
    <div id="personalized-houses" className="w-full space-y-8 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-4 border-b border-purple-400/20">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Kişiye Özel Doğum Haritası Analizi
          </span>
          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-slate-100 mt-1">
            12 Evin Derinlemesine Anlamı & Astrolog Yorumları
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            {chart.birthData.fullName} için hesaplanan ufuk çizgisi ve gökyüzü koordinatlarına göre; 1'den 12'ye her evin temsil ettiği hayat alanı, o evinizde bulunan burcunuz ve o evin kapısını aralayan gezegenlerinizin astrolojik sentezi.
          </p>
        </div>

        {/* Quick Info Box */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-purple-400/30 text-xs text-slate-300 space-y-0.5 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">1. Ev (Yükselen):</span>
            <span className="font-semibold text-white">{chart.ascendant.sign.name} ({chart.ascendant.degreeInSign}° {chart.ascendant.minuteInSign}')</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-300 font-bold">10. Ev (Tepe Noktası - MC):</span>
            <span className="font-semibold text-white">{chart.midheaven.sign.name} ({chart.midheaven.degreeInSign}° {chart.midheaven.minuteInSign}')</span>
          </div>
        </div>
      </div>

      {/* Kişiye Özel Doğum Haritası Kimlik & Koordinat Kartı */}
      <div className="bg-gradient-to-r from-[#11162b] via-[#161d38] to-[#121629] border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold font-mono">
                ✦ KİŞİYE ÖZEL DOĞUM HARİTASI RAPORU
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30 font-semibold">
                Doğrulandı
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mt-1">
              {chart.birthData.fullName}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 font-sans">
              Bu analiz, belirttiğiniz doğum saati ve coğrafi koordinatların gök kubbedeki izdüşümüne göre özel olarak çıkarılmıştır.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-400/30 text-center">
              <span className="text-[10px] text-amber-300/80 uppercase font-mono block">Güneş Burcu</span>
              <span className="text-sm font-bold text-amber-200">{chart.sun.sign.name} ({chart.sun.degreeInSign}°)</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-sky-500/10 border border-sky-400/30 text-center">
              <span className="text-[10px] text-sky-300/80 uppercase font-mono block">Yükselen (ASC)</span>
              <span className="text-sm font-bold text-sky-200">{chart.ascendant.sign.name} ({chart.ascendant.degreeInSign}°)</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-indigo-500/10 border border-indigo-400/30 text-center">
              <span className="text-[10px] text-indigo-300/80 uppercase font-mono block">Ay Burcu</span>
              <span className="text-sm font-bold text-indigo-200">{chart.moon.sign.name} ({chart.moon.degreeInSign}°)</span>
            </div>
          </div>
        </div>

        {/* 4 Detail Grid: Date, Time, Location Coordinates, LST Timezone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">📅 Doğum Tarihi</span>
            <span className="text-sm font-bold text-white font-mono mt-0.5 block">{chart.birthData.birthDate}</span>
            <span className="text-[10px] text-slate-400">Yıl / Ay / Gün</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">⏰ Doğum Saati</span>
            <span className="text-sm font-bold text-amber-300 font-mono mt-0.5 block">{chart.birthData.birthTime}</span>
            <span className="text-[10px] text-slate-400">Hassas Doğum Dakikası</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">📍 Doğum Yeri & Konum</span>
            <span className="text-sm font-bold text-white font-mono mt-0.5 block">{chart.birthData.cityName}</span>
            <span className="text-[10px] text-slate-400 font-mono">
              {chart.birthData.latitude.toFixed(4)}°N, {chart.birthData.longitude.toFixed(4)}°E
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">🌐 Zaman & Yıldız Saati</span>
            <span className="text-sm font-bold text-indigo-300 font-mono mt-0.5 block">
              UTC+{chart.birthData.timezone} (LST: {chart.birthData.lstHours.toFixed(2)}h)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Yerel Yıldız Zamanı</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === 'all'
                ? 'bg-gradient-to-r from-amber-500/30 to-purple-500/30 text-amber-200 border border-amber-400/50 shadow-md'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            Tüm 12 Ev
          </button>
          <button
            onClick={() => setSelectedFilter('angular')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === 'angular'
                ? 'bg-gradient-to-r from-amber-500/30 to-purple-500/30 text-amber-200 border border-amber-400/50 shadow-md'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            Köşe Evler (1, 4, 7, 10 - Ana Direkler)
          </button>
          <button
            onClick={() => setSelectedFilter('succedent')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === 'succedent'
                ? 'bg-gradient-to-r from-amber-500/30 to-purple-500/30 text-amber-200 border border-amber-400/50 shadow-md'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            Ardıl Evler (2, 5, 8, 11 - Kaynak & Yaratıcılık)
          </button>
          <button
            onClick={() => setSelectedFilter('cadent')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === 'cadent'
                ? 'bg-gradient-to-r from-amber-500/30 to-purple-500/30 text-amber-200 border border-amber-400/50 shadow-md'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            Düşük Evler (3, 6, 9, 12 - Zihin, Sağlık & Ruh)
          </button>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Gösterilen: <span className="text-amber-300 font-bold">{filteredHouses.length}</span> / 12 Ev
        </div>
      </div>

      {/* Grid of 12 Houses Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHouses.map((h) => {
          const meta = HOUSES_META[h.houseNumber] || HOUSES_META[1];
          const interp = getPersonalizedHouseInterpretation(h.sign.id, h.houseNumber, h.sign.name);
          const planetsInThisHouse = getPlanetsInHouse(h.houseNumber);

          return (
            <div
              key={h.houseNumber}
              className="bg-[#12182c]/90 hover:bg-[#151e3a] border border-purple-400/20 hover:border-amber-400/40 rounded-2xl p-6 backdrop-blur-md shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Gold & lilac corner accents */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/10 via-purple-500/5 to-transparent pointer-events-none rounded-tr-2xl" />

              <div className="space-y-4">
                {/* Header: House Number, Name, Sign Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30">
                        {h.houseNumber}. EV
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {meta.latinName}
                      </span>
                    </div>
                    <h3 className="text-lg font-cinzel font-bold text-slate-100 mt-1.5 leading-snug">
                      {meta.title}
                    </h3>
                  </div>

                  {/* Sign Pill */}
                  <div className="text-right shrink-0">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700/80 shadow">
                      <span className="text-base font-bold" style={{ color: h.sign.elementColor }}>
                        {h.sign.symbol}
                      </span>
                      <div className="text-left">
                        <span className="text-xs font-bold text-slate-100 block leading-none">
                          {h.sign.name}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 leading-none">
                          {h.degreeInSign}° {h.minuteInSign}'
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section A: Bu Ev Ne Anlama Geliyor? */}
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <span className="text-[11px] font-bold text-purple-300 flex items-center gap-1">
                    <Compass className="w-3 h-3 text-purple-400" />
                    Bu Ev Hayatınızda Ne Anlama Geliyor?
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {meta.coreMeaning}
                  </p>
                </div>

                {/* Section B: Bu Evdeki Burcun Anlamı (Kişiye Özel Astrolog Yorumu) */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-transparent border border-amber-400/25 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Haritanızdaki {h.sign.name} Burcunun Bu Evdeki Yorumu:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {interp.interpretation}
                  </p>
                </div>

                {/* Section C: Bu Evdeki Gezegenler (Eğer varsa) */}
                {planetsInThisHouse.length > 0 ? (
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-400/25 space-y-2">
                    <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                      <Star className="w-3 h-3 text-emerald-400" />
                      Bu Evde Yerleşen Gezegenleriniz ({planetsInThisHouse.length}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {planetsInThisHouse.map((p) => (
                        <div
                          key={p.id}
                          className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 flex items-center gap-1.5 text-xs text-slate-200 shadow-sm"
                          title={p.meaning}
                        >
                          <span className="font-bold text-amber-400">{p.symbol}</span>
                          <span className="font-medium">{p.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({p.sign.name} {p.degreeInSign}°)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-500 italic px-1">
                    Bu evde gezegen yerleşimi yok; evin yönetimi doğrudan yönetici burç olan <strong className="text-slate-400">{h.sign.name}</strong> ve yöneticisi <strong className="text-slate-400">{h.sign.ruler}</strong> üzerinden akar.
                  </div>
                )}

                {/* Section D: Astrolog Tavsiyesi */}
                <div className="pt-1 text-[11px] text-slate-400 border-t border-slate-800/80 space-y-0.5">
                  <span className="font-bold text-amber-300 block">Astrolog Tavsiyesi & Denge Noktası:</span>
                  <p className="text-slate-300 text-xs leading-relaxed">{interp.advice}</p>
                </div>
              </div>

              {/* Bottom Trigger */}
              <div className="mt-4 pt-3 border-t border-slate-800/60">
                <button
                  onClick={() => setActiveHouseModal(h)}
                  className="w-full py-2 bg-slate-900/90 hover:bg-amber-400/20 border border-slate-700/60 hover:border-amber-400/40 rounded-xl text-xs font-semibold text-slate-200 hover:text-amber-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-300" />
                  {h.houseNumber}. Evin Detaylı Raporunu Oku
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal for Selected House */}
      {activeHouseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12182c] border border-amber-400/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveHouseModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              ✕
            </button>

            {/* Modal Header */}
            {(() => {
              const meta = HOUSES_META[activeHouseModal.houseNumber] || HOUSES_META[1];
              const interp = getPersonalizedHouseInterpretation(
                activeHouseModal.sign.id,
                activeHouseModal.houseNumber,
                activeHouseModal.sign.name
              );
              const planetsInHouse = getPlanetsInHouse(activeHouseModal.houseNumber);

              return (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold bg-slate-900 border border-amber-400/40 text-amber-300 shadow-lg">
                      {activeHouseModal.houseNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-bold">
                          {meta.latinName} · {meta.category}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {activeHouseModal.sign.name} ({activeHouseModal.degreeInSign}° {activeHouseModal.minuteInSign}')
                        </span>
                      </div>
                      <h3 className="text-2xl font-cinzel font-bold text-slate-100 mt-1">
                        {meta.title}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-200">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <Compass className="w-4 h-4 text-amber-400" />
                        Bu Ev Genel Olarak Ne Anlama Geliyor?
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        {meta.coreMeaning}
                      </p>
                      <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
                        {meta.governs.map((gov, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-800/80 text-[11px] text-purple-300">
                            • {gov}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 space-y-2">
                      <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        Haritanızdaki {activeHouseModal.sign.name} Burcunun Bu Evdeki Astrolog Analizi
                      </h4>
                      <p className="text-slate-100 leading-relaxed font-medium">
                        {interp.interpretation}
                      </p>
                    </div>

                    {planetsInHouse.length > 0 && (
                      <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-400/30 space-y-2">
                        <h4 className="font-bold text-emerald-300 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                          <Star className="w-4 h-4 text-emerald-400" />
                          Bu Evdeki Gezegenleriniz ve Kozmik Etkileri
                        </h4>
                        <div className="space-y-2">
                          {planetsInHouse.map((p) => (
                            <div key={p.id} className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                              <div className="flex items-center gap-2 font-bold text-amber-300">
                                <span>{p.symbol}</span>
                                <span>{p.name}</span>
                                <span className="font-mono text-slate-400">({p.sign.name} burcunda {p.degreeInSign}°)</span>
                              </div>
                              <p className="text-slate-300 text-[11px] leading-relaxed">
                                {p.meaning}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <Shield className="w-4 h-4 text-amber-400" />
                        Astrolog Tavsiyesi & Hayat Dersi
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        {interp.advice}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveHouseModal(null)}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-purple-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:from-amber-400 hover:to-purple-500 transition-all"
                  >
                    Raporu Kapat
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
