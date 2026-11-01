import React, { useState, useRef, useEffect } from 'react';
import { ZODIAC_SIGNS, NatalChartData } from '../utils/astrologyCalc';
import { Sparkles, History, Compass, Download, Share2, Check, ArrowRight, Shield, Award, UserCheck, Orbit, BookOpen } from 'lucide-react';

interface PastLifeKarmaInfo {
  signId: string;
  signName: string;
  pastRole: string;
  era: string;
  comfortZone: string;
  karmicMission: string;
  superpower: string;
  soulMotto: string;
}

export const PAST_LIFE_DATABASE: Record<string, PastLifeKarmaInfo> = {
  aries: {
    signId: 'aries',
    signName: 'Koç',
    pastRole: 'İskenderiye Saray Diplomatı & Uzlaştırıcı',
    era: 'Antik Helenistik Dönem',
    comfortZone: 'Başkalarını memnun etmek için kendi isteklerini yutmak, çatışmadan kaçmak ve kararsızlık.',
    karmicMission: 'Kendi başına cesur kararlar almak, liderlik etmek ve içindeki bağımsız savaşçıyı serbest bırakmak.',
    superpower: 'Çatışmaları önceden sezip insanları tek bir hedef etrafında toplama zekası.',
    soulMotto: 'Bu hayatta var olmak için kimseden izin istemiyorum.',
  },
  taurus: {
    signId: 'taurus',
    signName: 'Boğa',
    pastRole: 'Gizli Loncanın Simyacısı & Kriz Yöneticisi',
    era: 'Rönesans Dönemi İtalya',
    comfortZone: 'Sürekli kriz, drama, şüphe ve her an her şey yıkılacakmış gibi tetikte yaşamak.',
    karmicMission: 'Huzurlu, sakin, üretken bir yaşam inşa etmek; dünyevi güzelliklerin ve sadakatin tadını çıkarmak.',
    superpower: 'En büyük yıkımlardan bile sapasağlam çıkabilen sarsılmaz psikolojik dayanıklılık.',
    soulMotto: 'Huzur ve güveni dışarıda değil, kendi ellerimle inşa ettiğim değerlerde bulurum.',
  },
  gemini: {
    signId: 'gemini',
    signName: 'İkizler',
    pastRole: 'Tapınak Tepesindeki Münzevi Bilge & Gezgin Filozof',
    era: 'Antik Hindistan / Tibet',
    comfortZone: 'Fildişi kulesinden büyük teoriler üretmek, pratik hayattan kopuk vaazlar vermek ve dogmatizm.',
    karmicMission: 'İnsanların arasına karışmak, soru sormak, dinlemek, öğrenmek ve bilgiyi neşeyle paylaşmak.',
    superpower: 'En karmaşık felsefi hakikatleri herkesin anlayabileceği basitlikte anlatabilme dehası.',
    soulMotto: 'Öğrendikçe büyüyorum, konuştukça köprüler kuruyorum.',
  },
  cancer: {
    signId: 'cancer',
    signName: 'Yengeç',
    pastRole: 'Sert Feodal Kale Muhafızı & Taşra Yöneticisi',
    era: 'Ortaçağ Avrupası',
    comfortZone: 'Duyguları bastırmak, zayıf görünmekten korkmak ve sadece görev ve sorumluluklarla yaşamak.',
    karmicMission: 'Kalbini yumuşatmak, sevdiklerini sarıp sarmalamak, ağlamaktan utanmamak ve şefkatli bir yuva kurmak.',
    superpower: 'Tehlikeleri kilometrelerce öteden sezen ve sevdiklerini koruyan doğuştan radar.',
    soulMotto: 'Duygularım benim zayıflığım değil, en büyük rehberimdir.',
  },
  leo: {
    signId: 'leo',
    signName: 'Aslan',
    pastRole: 'Gölgede Kalan İsyankar Bilim İnsanı & Kolektif Reformist',
    era: 'Aydınlanma Çağı',
    comfortZone: 'Grupta kalabalığın arasına saklanmak, bireysel ışığını söndürüp sadece ideallere sığınmak.',
    karmicMission: 'Sahneye çıkmak, kalbinin ateşini yaratıcılıkla parlatmak, alkışlanmaktan çekinmemek ve ilham olmak.',
    superpower: 'Toplumsal vizyonu bireysel bir sanat eserine ve karizmatik liderliğe dönüştürme gücü.',
    soulMotto: 'Kendi sahnemin başrolüyüm ve ışığımla dünyayı ısıtıyorum.',
  },
  virgo: {
    signId: 'virgo',
    signName: 'Başak',
    pastRole: 'Kendini Feda Eden Mistik Şair & Manastır Şifacısı',
    era: 'Bizans Dönemi',
    comfortZone: 'Sınırsız fedakarlık, kurban rolü, gerçeklerden kaçış ve sınır koyamama.',
    karmicMission: 'Pratik bir düzen kurmak, detaylara hakim olmak, "hayır" diyebilmek ve dünyevi şifayı elleriyle üretmek.',
    superpower: 'Ruhsal ilhamı somut, çalışan ve faydalı bir sisteme dönüştürme ustalığı.',
    soulMotto: 'Hizmetim düzenimden, gücüm berrak aklımdan doğar.',
  },
  libra: {
    signId: 'libra',
    signName: 'Terazi',
    pastRole: 'Yalnız Bozkır Savaşçısı & Korkusuz Öncü',
    era: 'Antik Avrasya Bozkırları',
    comfortZone: 'Tek başına savaşmak, kimseye güvenmemek, "ben bilirim" tavrı ve fevri öfke.',
    karmicMission: 'Bir partnerle eşit yürümeyi öğrenmek, uzlaşmak, adaleti savunmak ve estetik barış inşa etmek.',
    superpower: 'Zor zamanlarda korkusuzca öne atılabilen doğal bir adalet içgüdüsü.',
    soulMotto: 'Gerçek güç kılıçta değil, kalpleri birleştiren zarafettedir.',
  },
  scorpio: {
    signId: 'scorpio',
    signName: 'Akrep',
    pastRole: 'Geniş Toprakların Zengin Tüccarı & Rahat Malikane Ağası',
    era: 'Osmanlı & Akdeniz Ticaret Çağı',
    comfortZone: 'Statükoya takılıp kalmak, konfor alanından çıkmamak, paraya ve eşyalara aşırı bağımlılık.',
    karmicMission: 'Küllerinden doğmayı göze almak, görünmeyenin derinine inmek ve ruhsal güçle dönüşmek.',
    superpower: 'Maddi ve manevi kaynakları sıfırdan yaratabilen sınırsız bir bereket potansiyeli.',
    soulMotto: 'Beni yıkan her şey beni çok daha güçlü yeniden doğurur.',
  },
  sagittarius: {
    signId: 'sagittarius',
    signName: 'Yay',
    pastRole: 'Pazar Yerinin Dedikoducu Katibi & Şehirli Haberci',
    era: 'Antik Roma',
    comfortZone: 'Küçük detaylarda kaybolmak, sığ dedikodularla zihnini oyalamak ve büyük resmi görememek.',
    karmicMission: 'Uzak ufuklara yelken açmak, hayat felsefesi geliştirmek, hakikati aramak ve inancı keşfetmek.',
    superpower: 'Milyonlarca küçük bilgiyi birleştirip geleceğin haritasını çıkarma dehası.',
    soulMotto: 'Ufkun ötesinde daima keşfedilmeyi bekleyen bir mucize vardır.',
  },
  capricorn: {
    signId: 'capricorn',
    signName: 'Oğlak',
    pastRole: 'Klanın Koruması Altındaki Masum ve Bağımlı Evlat',
    era: 'Antik Kabile Çağları',
    comfortZone: 'Çocuksu sızlanmalar, birilerinin onu kurtarmasını beklemek ve sorumluluktan kaçmak.',
    karmicMission: 'Olgunlaşmak, kendi hayatının efendisi olmak, dağın zirvesine tırmanmak ve kalıcı bir miras bırakmak.',
    superpower: 'En derin içsel kırılganlığı çelik gibi bir kararlılık ve otoriteye çevirme kudreti.',
    soulMotto: 'Zaman benim dostumdur; sabırla adım atar, zirvede kalırım.',
  },
  aquarius: {
    signId: 'aquarius',
    signName: 'Kova',
    pastRole: 'Tahtında Yalnız Kalan Aristokrat Hükümdar',
    era: '18. Yüzyıl Monarşileri',
    comfortZone: 'Sürekli ilgi ve takdir bekleme, egomerkezlilik ve sadece kendi sarayında yaşamak.',
    karmicMission: 'İnsanlıkla eşitlenmek, ayrıcalıklardan vazgeçip kolektif adalet ve teknolojik özgürlük için çalışmak.',
    superpower: 'Doğuştan gelen asil bir vizyonu insanlığın ortak refahına adayabilme cömertliği.',
    soulMotto: 'Hepimiz aynı gökyüzünün eşit yıldızlarıyız.',
  },
  pisces: {
    signId: 'pisces',
    signName: 'Balık',
    pastRole: 'Kuralcı Kütüphaneci & Titiz Saat Tamircisi',
    era: 'Viktorya Dönemi İngiltere',
    comfortZone: 'Sürekli eleştiri, kontrol takıntısı, en küçük pürüzde evham ve her şeyi akılla çözme inadı.',
    karmicMission: 'Akışa teslim olmak, evrenin görünmeyen planına güvenmek, affetmek ve sınırsız koşulsuz sevgiyi tatmak.',
    superpower: 'Görünmeyen enerji boyutlarını ve psişik hisleri kusursuz bir sezgiyle algılama gücü.',
    soulMotto: 'Bırakıyorum ve evrenin kollarına güvenle teslim oluyorum.',
  },
};

// House descriptions for personalized karmic analysis
const HOUSE_KARMIC_SPHERES: Record<number, { arena: string; pastHabit: string; lesson: string }> = {
  1: {
    arena: 'Bireysel Kimlik ve Beden',
    pastHabit: 'Sürekli tek başına mücadele etmek ve kimseye güvenmeden dünyayı tek başına sırtlamak.',
    lesson: 'Bireysel cesaretini korurken başkalarıyla köprüler kurmayı ve paylaşmayı öğrenmek.',
  },
  2: {
    arena: 'Maddi Güvenlik ve Öz Değer',
    pastHabit: 'Maddiyata, mülkiyete ve konfora aşırı tutunarak risk almaktan kaçınmak.',
    lesson: 'Gerçek zenginliğin içsel özdeğer ve manevi güç olduğunu deneyimlemek.',
  },
  3: {
    arena: 'İletişim, Çevre ve Zihin',
    pastHabit: 'Bilgiyi sadece zihinde depolamak, dedikodulara kapılmak ve yüzeysel iletişimle oyalanmak.',
    lesson: 'Sözcüklerini derin felsefi hakikatleri yaymak ve insanları eğitmek için kullanmak.',
  },
  4: {
    arena: 'Kökler, Aile ve Yuva',
    pastHabit: 'Geçmişe, aile baskılarına ve güvenli kabuğa sığınarak dünyaya açılmaktan korkmak.',
    lesson: 'Toplumda kendi ayakları üzerinde durup kariyerinde bağımsız bir otorite inşa etmek.',
  },
  5: {
    arena: 'Yaratıcılık, Aşk ve Sahne',
    pastHabit: 'Sürekli sahnede olmak, alkış ve hayranlık beklentisiyle egoyu beslemek.',
    lesson: 'Bireysel yaratıcılığını kolektifin, dostlarının ve insanlığın faydasına sunmak.',
  },
  6: {
    arena: 'Hizmet, Düzen ve Sağlık',
    pastHabit: 'Aşırı mükemmeliyetçilik, kusur arama ve kendini başkalarının hizmetinde tüketme.',
    lesson: 'Hayatın akışına teslim olmak, sezgilerine güvenmek ve ruhsal şifaya alan açmak.',
  },
  7: {
    arena: 'İlişkiler ve Ortaklıklar',
    pastHabit: 'Kendi kimliğini partnerinin gölgesinde eritmek, bağımlı ilişkiler ve "hayır" diyememek.',
    lesson: 'Kendi bağımsız benliğini koruyarak eşit ve sağlıklı dengeli birliktelikler kurmak.',
  },
  8: {
    arena: 'Dönüşüm, Kriz ve Gizem',
    pastHabit: 'Kriz bağımlılığı, güç savaşları, kıskançlık ve her durumu manipüle etme isteği.',
    lesson: 'Sakin, dingin ve üretken bir güven limanı inşa etmek; affedebilmek.',
  },
  9: {
    arena: 'Yüksek Bilgelik ve İnanç',
    pastHabit: 'Kendi inancını tek mutlak hakikat sanmak, dogmatik yargılar ve fildişi kulesinde yaşamak.',
    lesson: 'Farklı görüşlere açık olmak, günlük hayatta insanları merakla dinlemek ve öğrenci kalmak.',
  },
  10: {
    arena: 'Kariyer, Statü ve Toplum',
    pastHabit: 'Sadece unvan, güç, başarı ve otorite peşinde koşarak duygusal bağları ihmal etmek.',
    lesson: 'Kalbini yumuşatmak, aile sıcaklığını ve duygusal şefkati hayatının merkezine koymak.',
  },
  11: {
    arena: 'Kolektif, Topluluklar ve İdealler',
    pastHabit: 'Grup içinde kaybolmak, kitlelerin düşüncelerini sorgulamadan benimsemek.',
    lesson: 'Kendi bireysel yaratıcılığını korkusuzca sergilemek, özgün rengini cesurca parlatmak.',
  },
  12: {
    arena: 'Bilinçaltı, Rüyalar ve Ruhsal Tecrit',
    pastHabit: 'Gerçek dünyadan kopup hayal alemine kaçmak, kurban psikolojisi ve dağınıklık.',
    lesson: 'Maddi dünyada disiplinli, düzenli, pratik ve üretken bir sistem kurarak şifa dağıtmak.',
  },
};

interface PastLifeKarmaLibraryProps {
  chart?: NatalChartData;
}

export const PastLifeKarmaLibrary: React.FC<PastLifeKarmaLibraryProps> = ({ chart }) => {
  // Mode: 'personal' (calculated from birth data) vs 'browse' (12 sign archive)
  const [activeTab, setActiveTab] = useState<'personal' | 'browse'>(chart ? 'personal' : 'browse');
  const [selectedSignId, setSelectedSignId] = useState<string>(
    chart?.southNode ? chart.southNode.sign.id : 'scorpio'
  );
  const [customName, setCustomName] = useState<string>(chart?.birthData.fullName || 'Deniz Yılmaz');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Sync when chart changes
  useEffect(() => {
    if (chart?.southNode) {
      setSelectedSignId(chart.southNode.sign.id);
      if (chart.birthData.fullName) {
        setCustomName(chart.birthData.fullName);
      }
    }
  }, [chart]);

  // Compute personal analysis details if chart is present
  const isPersonal = activeTab === 'personal' && !!chart;
  const currentSign = ZODIAC_SIGNS.find((s) => s.id === selectedSignId) || ZODIAC_SIGNS[7];
  const genericKarma = PAST_LIFE_DATABASE[selectedSignId] || PAST_LIFE_DATABASE.scorpio;

  // Personalized Dynamic Archetype Engine
  const personalSign = chart?.southNode.sign || currentSign;
  const personalHouse = chart?.southNode.house || 8;
  const houseInfo = HOUSE_KARMIC_SPHERES[personalHouse] || HOUSE_KARMIC_SPHERES[8];
  const northNodeSign = chart?.northNode.sign || ZODIAC_SIGNS[1]; // Taurus default
  const northNodeHouse = chart?.northNode.house || 2;

  // Build Personalized Past Life Role combining South Node Sign + House
  const getPersonalizedRole = () => {
    if (!chart) return genericKarma.pastRole;
    const signName = chart.southNode.sign.name;
    const houseNum = chart.southNode.house;

    const rolesByCombination: Record<string, string> = {
      '1': `${signName} Enerjili Bağımsız Savaşçı & Öncü Gezgin`,
      '2': `${signName} Hanedanının Baş Hazinedarı & Mülk Muhafızı`,
      '3': `${signName} Antik Loncasının Şehir Ulağı & Katibi`,
      '4': `${signName} Soyunun Kale Muhafızı & Anaerkil Koruyucusu`,
      '5': `${signName} Sarayının Başaktörü & Kraliyet Sanatçısı`,
      '6': `${signName} Mabedinin Titiz Şifacısı & Baş Eczacısı`,
      '7': `${signName} İmparatorluk Başdiplomatı & Yüksek Hakemi`,
      '8': `${signName} Yeraltı Tapınağının Simyacısı & Sırlar Bekçisi`,
      '9': `${signName} İpek Yolu Bilgesi & Gezgin Filozofu`,
      '10': `${signName} Yüksek Şura Reisi & İmparatorluk Komutanı`,
      '11': `${signName} Reformist Halk Meclisi Sözcüsü & Astronomu`,
      '12': `${signName} Denizler Aşırı Manastır Mistiği & Tapınak Rüyacısı`,
    };

    return rolesByCombination[houseNum.toString()] || `${signName} Burcunun Antik Bilgesi`;
  };

  const activeRole = isPersonal ? getPersonalizedRole() : genericKarma.pastRole;
  const activeEra = isPersonal
    ? `Antik Kadim Çağlar · Karmik Odak: ${personalHouse}. Ev (${houseInfo.arena})`
    : genericKarma.era;
  const activeComfortZone = isPersonal
    ? `${genericKarma.comfortZone} ${houseInfo.pastHabit}`
    : genericKarma.comfortZone;
  const activeMission = isPersonal
    ? `Kuzey Ay Düğümün ${northNodeSign.name} burcunda ve ${northNodeHouse}. evde parlıyor: ${genericKarma.karmicMission} Bu yaşamında ${houseInfo.lesson}`
    : genericKarma.karmicMission;
  const activeSuperpower = genericKarma.superpower;
  const activeMotto = genericKarma.soulMotto;

  // High-Resolution Story / TikTok / Instagram PNG Card Generator
  const handleDownloadCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1440; // 3:4 High-res social portrait
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient (Soft midnight dark mode with lilac undertones)
    const grad = ctx.createLinearGradient(0, 0, 1080, 1440);
    grad.addColorStop(0, '#0b0e18');
    grad.addColorStop(0.35, '#13192f');
    grad.addColorStop(0.7, '#1b1b36');
    grad.addColorStop(1, '#090c15');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1440);

    // Subtle background stars / specks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    const pseudoRandStars = [
      [120, 140], [920, 160], [250, 480], [820, 520], [180, 890],
      [890, 940], [310, 1220], [770, 1280], [530, 240], [640, 780]
    ];
    for (const [sx, sy] of pseudoRandStars) {
      ctx.beginPath();
      ctx.arc(sx, sy, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer Elegant Frames
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, 1000, 1360);

    ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(55, 55, 970, 1330);

    // Brand Header
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 26px serif';
    ctx.textAlign = 'center';
    ctx.fillText('A S T R A L U N A', 540, 125);

    ctx.fillStyle = '#c084fc';
    ctx.font = '18px sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('KİŞİSEL KOZMİK GEÇMİŞ YAŞAM KARTI', 540, 165);

    // Decorative Divider Line
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.3)';
    ctx.beginPath();
    ctx.moveTo(140, 195);
    ctx.lineTo(940, 195);
    ctx.stroke();

    // User Name & Date
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px serif';
    const displayName = customName || (chart ? chart.birthData.fullName : 'Kozmik Yolcu');
    ctx.fillText(displayName, 540, 260);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px sans-serif';
    const birthSubtitle = chart
      ? `${chart.birthData.birthDate} · ${chart.birthData.cityName} · GAD: ${personalSign.name} (${personalHouse}. Ev)`
      : `${currentSign.name} Burcu Karmik Analizi`;
    ctx.fillText(birthSubtitle, 540, 298);

    // Past Life Role Box
    ctx.fillStyle = 'rgba(192, 132, 252, 0.12)';
    ctx.fillRect(90, 340, 900, 180);
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(90, 340, 900, 180);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('GEÇMİŞ YAŞAMDAKİ ROLÜNÜZ & ÇAĞINIZ', 540, 385);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px serif';
    ctx.fillText(activeRole, 540, 440);

    ctx.fillStyle = '#a5b4fc';
    ctx.font = 'italic 20px sans-serif';
    ctx.fillText(activeEra, 540, 485);

    // Karmic Lesson Section
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('BU HAYATTAKİ RUHSAL DERSİN & TEKAMÜLÜN', 540, 580);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '22px sans-serif';
    const missionWords = activeMission.split(' ');
    let line = '';
    let y = 625;
    for (let n = 0; n < missionWords.length; n++) {
      const testLine = line + missionWords[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 820 && n > 0) {
        ctx.fillText(line, 540, y);
        line = missionWords[n] + ' ';
        y += 34;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    // Superpower Section
    y += 55;
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('GEÇMİŞTEN GETİRDİĞİN DOĞUŞTAN SÜPER GÜÇ', 540, y);

    y += 40;
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '20px sans-serif';
    ctx.fillText(activeSuperpower, 540, y);

    // Soul Motto Banner
    y += 65;
    ctx.fillStyle = 'rgba(251, 191, 36, 0.1)';
    ctx.fillRect(90, y, 900, 110);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1;
    ctx.strokeRect(90, y, 900, 110);

    ctx.fillStyle = '#fef08a';
    ctx.font = 'italic 26px serif';
    ctx.fillText(`"${activeMotto}"`, 540, y + 65);

    // Footer Watermark
    ctx.fillStyle = '#64748b';
    ctx.font = '16px sans-serif';
    ctx.fillText('AstraLuna · Kişiye Özel Doğum Haritası ve Yaşam Rehberi', 540, 1350);

    // Trigger Download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `AstraLuna-Gecmis-Yasam-${(displayName).replace(/\s+/g, '-')}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleCopyText = () => {
    const text = `✨ Kozmik Geçmiş Yaşam Analizim (${customName}):\n` +
      `📜 Geçmiş Yaşam Rolüm: ${activeRole} (${activeEra})\n` +
      `🔮 Bu Hayattaki Ruhsal Dersim: ${activeMission}\n` +
      `⚡ Doğuştan Süper Gücüm: ${activeSuperpower}\n` +
      `🕊️ Ruh Mottosu: "${activeMotto}"\n\n` +
      `AstraLuna Astroloji ve Yaşam Portalı`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="karma-past-life" className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-4 border-b border-purple-400/20">
        <div>
          <span className="text-xs uppercase tracking-widest text-purple-300 font-semibold flex items-center gap-1.5">
            <History className="w-3.5 h-3.5" /> Kozmik Geçmiş Yaşam & Karma Kütüphanesi
          </span>
          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-slate-100 mt-1">
            "Geçmiş Yaşamda Kimdim?" Zaman Tüneli
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Doğum bilgilerinizle hesaplanan Güney ve Kuzey Ay Düğümleri (Rahu & Ketu) üzerinden ruhunuzun kadim geçmişteki kimliğini, eski konfor alanını ve bu hayattaki asıl tekamül dersini keşfedin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Karttaki İsminiz"
            className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-purple-400 w-40"
          />
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {chart && (
          <button
            onClick={() => {
              setActiveTab('personal');
              setSelectedSignId(chart.southNode.sign.id);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'personal'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20 border border-purple-400'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <UserCheck className="w-4 h-4 text-amber-300" />
            <span>Kişisel Haritana Özel Sonuç ({chart.birthData.fullName})</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('browse')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'browse'
              ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20 border border-purple-400'
              : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4 text-purple-300" />
          <span>Tüm Burçların Karmik Arşivi (12 Burç)</span>
        </button>
      </div>

      {/* If Personal Mode Active: Show Exact Astrological Coordinates Banner */}
      {isPersonal && chart && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900/60 border border-purple-400/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-lg text-amber-300 font-bold">
              ☋
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300">
                  Güney Ay Düğümü (GAD): {chart.southNode.sign.name} ({chart.southNode.degreeInSign}° {chart.southNode.minuteInSign}')
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-purple-300 border border-purple-400/30">
                  {chart.southNode.house}. Ev Konumu
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Kuzey Ay Düğümü (KAD): {chart.northNode.sign.name} ({chart.northNode.degreeInSign}° {chart.northNode.minuteInSign}'), {chart.northNode.house}. Ev
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Hesaplanan Doğum: {chart.birthData.birthDate} {chart.birthData.birthTime} · {chart.birthData.cityName}
          </div>
        </div>
      )}

      {/* 12 Sign Selector (Shown in browse mode or for exploration) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{activeTab === 'personal' ? 'Diğer Burçların Arketipini İncelemek İçin Seçin:' : 'İncelemek İstediğiniz Burcu Seçin:'}</span>
          <span className="text-purple-300 font-medium">Seçili: {currentSign.name}</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
          {ZODIAC_SIGNS.map((s) => {
            const isSelected = selectedSignId === s.id;
            const isUserSouthNode = chart?.southNode.sign.id === s.id;

            return (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedSignId(s.id);
                  if (activeTab === 'personal' && s.id !== chart?.southNode.sign.id) {
                    setActiveTab('browse');
                  }
                }}
                className={`p-2 rounded-xl border text-center transition-all relative ${
                  isSelected
                    ? 'bg-purple-500/25 border-purple-400 text-purple-100 shadow-lg scale-105'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {isUserSouthNode && (
                  <span className="absolute -top-1.5 -right-1 text-[8px] bg-amber-400 text-slate-950 font-bold px-1 rounded-full shadow">
                    GAD
                  </span>
                )}
                <div className="text-lg font-bold" style={{ color: s.elementColor }}>
                  {s.symbol}
                </div>
                <div className="text-[11px] font-medium mt-0.5 truncate">{s.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Portal Showcase & Card Display */}
      <div className="bg-[#12182c]/90 border border-purple-400/20 rounded-3xl p-6 lg:p-10 backdrop-blur-md shadow-2xl space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-6 border-b border-slate-800">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              {isPersonal ? `Kişiye Özel Karmik Hesaplama: ${customName}` : 'Karmik Hafıza & Ay Düğümü Yolu'}
            </div>

            <div>
              <span className="text-xs text-slate-400 block font-mono">
                {activeEra}
              </span>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-slate-100 mt-0.5">
                {activeRole}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Eski Konfor Alanın (Güney Ay Düğümü Tortusu):
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeComfortZone}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-400/30 space-y-1">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> Bu Hayattaki Ruhsal Görevin (Kuzey Ay Düğümü Rotası):
                </span>
                <p className="text-xs text-slate-100 leading-relaxed font-medium">
                  {activeMission}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Geçmiş Yaşamından Getirdiğin Doğuştan Süper Güç:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeSuperpower}
                </p>
              </div>
            </div>

            {/* Actions: Download Card & Copy */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadCard}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2 hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" />
                Kozmik Kartı İndir (.PNG)
              </button>

              <button
                onClick={handleCopyText}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                {isCopied ? 'Kopyalandı!' : 'Metni Kopyala'}
              </button>
            </div>
          </div>

          {/* Time Tunnel Portal Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-purple-400/30 aspect-[4/3] shadow-xl group">
            <img
              src="/assets/images/karma_past_life_1793491719145.jpg"
              alt="Kozmik Zaman Tüneli ve Reenkarnasyon Spirali"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-xs font-mono text-purple-300">Ruh Mottosu:</span>
              <p className="text-sm font-cormorant italic text-amber-200 mt-0.5">
                "{activeMotto}"
              </p>
            </div>
          </div>
        </div>

        {/* Live Card Preview Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-[#10172e] to-slate-950 border border-purple-400/30 text-center max-w-xl mx-auto space-y-3 shadow-xl">
          <div className="text-[10px] uppercase tracking-widest text-purple-300 font-mono">
            Story / TikTok Paylaşım Kartı Önizlemesi
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400/40 mx-auto flex items-center justify-center text-xl font-bold" style={{ color: currentSign.elementColor }}>
            {currentSign.symbol}
          </div>
          <h4 className="text-xl font-bold font-cinzel text-slate-100">
            {customName || 'Kozmik Yolcu'} · {isPersonal ? personalSign.name : genericKarma.signName}
          </h4>
          <p className="text-xs text-amber-300 font-semibold">
            Geçmiş Yaşam Rolü: {activeRole}
          </p>
          <blockquote className="text-xs font-cormorant italic text-slate-300 border-t border-b border-slate-800 py-2">
            "{activeMotto}"
          </blockquote>
          <p className="text-[11px] text-slate-400 line-clamp-2">
            Karmik Ders: {activeMission}
          </p>
        </div>
      </div>
    </section>
  );
};
