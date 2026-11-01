/**
 * AstraLogia - Professional Astrologer Knowledge Base
 * Educational, crystal-clear, deep and accessible to absolute beginners.
 */

export interface ZodiacDetail {
  id: string;
  name: string;
  latinName: string;
  symbol: string;
  dates: string;
  element: 'Ateş' | 'Toprak' | 'Hava' | 'Su';
  modality: 'Öncü' | 'Sabit' | 'Değişken';
  polarity: 'Eril (Yang)' | 'Dişil (Yin)';
  ruler: string;
  archetype: string;
  motto: string;
  color: string;
  overview: string;
  strengths: string[];
  shadows: string[];
  loveDescription: string;
  careerDescription: string;
  bodyPart: string;
}

export const ZODIAC_PROFILES: Record<string, ZodiacDetail> = {
  aries: {
    id: 'aries',
    name: 'Koç',
    latinName: 'Aries',
    symbol: '♈',
    dates: '21 Mart - 19 Nisan',
    element: 'Ateş',
    modality: 'Öncü',
    polarity: 'Eril (Yang)',
    ruler: 'Mars',
    archetype: 'Savaşçı, Öncü, Girişimci',
    motto: 'Ben Varım ve Başlatırım',
    color: '#ef4444',
    overview: 'Zodyak çemberinin ilk burcu olan Koç, ilkbaharın taze ve patlayıcı enerjisini temsil eder. Bir tohumun toprağı delip güneşe fırlaması gibidir. Doğal bir lider, korkusuz bir kaşif ve saf yaşam arzusudur.',
    strengths: ['Cesur ve doğrudan', 'Yüksek motivasyon ve coşku', 'Dürüstlük ve dobra yaklaşım', 'Hızlı karar alabilme'],
    shadows: ['Sabırsızlık ve acelecilik', 'Öfke patlamaları', 'Başkalarının hislerini gözden kaçırma', 'Başladığı işi bitirmekte zorlanma'],
    loveDescription: 'Tutkulu, ilk adımı atmaktan çekinmeyen ve heyecan arayan bir aşıktır. Avlanma ve fethetme dürtüsü yüksektir; monotonluktan hızla sıkılır.',
    careerDescription: 'Girişimcilik, liderlik, kriz yönetimi, spor, cerrahi ve kendi kurallarını koyabildiği bağımsız meslekler için biçilmiş kaftandır.',
    bodyPart: 'Baş, beyin, yüz ve gözler.',
  },
  taurus: {
    id: 'taurus',
    name: 'Boğa',
    latinName: 'Taurus',
    symbol: '♉',
    dates: '20 Nisan - 20 Mayıs',
    element: 'Toprak',
    modality: 'Sabit',
    polarity: 'Dişil (Yin)',
    ruler: 'Venüs',
    archetype: 'İnşa Edici, Muhafız, Sanatkar',
    motto: 'Sahip Olurum ve Değer Katarım',
    color: '#10b981',
    overview: 'Boğa burcu, doğanın kök salmasını, bereketini ve beş duyuyla hissedilen dünyevi güzellikleri simgeler. Güvenlik, huzur ve somut üretkenlik onun vazgeçilmez pusulasıdır.',
    strengths: ['Sarsılmaz sadakat ve sabır', 'Estetik zevk ve güzellik algısı', 'Pratik finansal zeka', 'Güvenilirlik ve sakinlik'],
    shadows: ['İnatçılık ve değişime direnç', 'Maddecilik ve aşırı sahiplenme', 'Konfor alanına hapsolma', 'Tembellik eğilimi'],
    loveDescription: 'Tensel, şefkatli ve uzun vadeli bağlılık isteyen bir aşıktır. Sadakat onun için her şeydir; huzurlu bir yuva ve güven arar.',
    careerDescription: 'Finans, bankacılık, gayrimenkul, tarım, gastronomi, mimarlık, müzik ve sanat dallarında kalıcı başarılar yakalar.',
    bodyPart: 'Boğaz, ses telleri, boyun ve tiroid bezi.',
  },
  gemini: {
    id: 'gemini',
    name: 'İkizler',
    latinName: 'Gemini',
    symbol: '♊',
    dates: '21 Mayıs - 20 Haziran',
    element: 'Hava',
    modality: 'Değişken',
    polarity: 'Eril (Yang)',
    ruler: 'Merkür',
    archetype: 'Haberci, Öğrenci, Zihinsel Gezgin',
    motto: 'Düşünürüm ve Bağlantı Kurarım',
    color: '#0ea5e9',
    overview: 'İkizler, bilginin, kelimelerin ve merakın burcudur. Rüzgar gibi hafif, çok yönlü ve daima zihinsel uyarılma arayışındadır. Bir konu hakkında her şeyi bilmek ve bunu başkalarıyla paylaşmak ister.',
    strengths: ['Yüksek zeka ve espri yeteneği', 'Hızlı adaptasyon ve esneklik', 'Güçlü iletişim becerileri', 'Çoklu görev (multitasking) kabiliyeti'],
    shadows: ['Yüzeysellik ve odaklanamama', 'Huzursuzluk ve çabuk sıkılma', 'Duygusal derinlikten kaçma', 'Dedikoduya meyil'],
    loveDescription: 'Zihinsel çekim olmadan aşık olamaz. Konuşabileceği, gülebileceği ve zihnini canlı tutan entelektüel partnerlere çekilir.',
    careerDescription: 'Gazetecilik, yazarlık, pazarlama, halkla ilişkiler, yazılım, çeviri ve ticaret alanlarında parlar.',
    bodyPart: 'Omuzlar, kollar, eller, akciğerler ve sinir sistemi.',
  },
  cancer: {
    id: 'cancer',
    name: 'Yengeç',
    latinName: 'Cancer',
    symbol: '♋',
    dates: '21 Haziran - 22 Temmuz',
    element: 'Su',
    modality: 'Öncü',
    polarity: 'Dişil (Yin)',
    ruler: 'Ay',
    archetype: 'Besleyici Anne, Koruyucu, Şifacı',
    motto: 'Hissederim ve Korurum',
    color: '#6366f1',
    overview: 'Yengeç, zodyakın duygusal hafızası ve kalbidir. Sert kabuğunun altında derin bir şefkat, zengin bir hayal gücü ve sevdiklerini koruma içgüdüsü taşır. Aidiyet ve yuva onun merkezidir.',
    strengths: ['Derin empati ve sezgisellik', 'Şefkatli ve besleyici doğa', 'Güçlü hafıza ve aidiyet bağı', 'Sadık ve fedakar sevgi'],
    shadows: ['Aşırı alınganlık ve duygu dalgalanmaları', 'Geçmişe takılıp kalma', 'Duygusal şantaj veya içine kapanma', 'Bağımlılık geliştirme'],
    loveDescription: 'Duygusal güvence, sarıp sarmalama ve ruhsal bağ arar. Sevildiğinden emin olduğunda karşılıksız bir bağlılık ve romantizm sunar.',
    careerDescription: 'Psikoloji, hemşirelik, tarih, aşçılık, eğitim, insan kaynakları, antika ve iç mimarlık gibi alanlarda çok başarılıdır.',
    bodyPart: 'Göğüs, mide, sindirim sistemi ve rahim.',
  },
  leo: {
    id: 'leo',
    name: 'Aslan',
    latinName: 'Leo',
    symbol: '♌',
    dates: '23 Temmuz - 22 Ağustos',
    element: 'Ateş',
    modality: 'Sabit',
    polarity: 'Eril (Yang)',
    ruler: 'Güneş',
    archetype: 'Kral, Sahne Sanatçısı, Cömert Yürek',
    motto: 'Işıldarım ve Yaratırım',
    color: '#f59e0b',
    overview: 'Güneş tarafından yönetilen Aslan, zodyakın merkez sahnesidir. Sıcakkanlı, cömert, dramatik ve doğal bir karizmaya sahiptir. Yaşamı bir sahne, kendini ise o sahnenin başrolü olarak deneyimler.',
    strengths: ['Cömertlik ve asil duruş', 'Yaratıcılık ve sahne karizması', 'Cesur ve koruyucu sadakat', 'Yaşam sevinci ve neşe saçma'],
    shadows: ['Kibir ve ego merkezlilik', 'Aşırı onay ve övgü açlığı', 'Buyurgan tavırlar', 'Eleştiriye tahammülsüzlük'],
    loveDescription: 'Büyük jestler, romantik jestler ve tutkulu jestlerle sever. Partneriyle gurur duymak ve kendisi de takdir edilmek ister.',
    careerDescription: 'Oyunculuk, sahne sanatları, yöneticilik, tasarım, lüks marka yönetimi ve organizasyon liderliği için idealdir.',
    bodyPart: 'Kalp, omurga, sırt ve dolaşım sistemi.',
  },
  virgo: {
    id: 'virgo',
    name: 'Başak',
    latinName: 'Virgo',
    symbol: '♍',
    dates: '23 Ağustos - 22 Eylül',
    element: 'Toprak',
    modality: 'Değişken',
    polarity: 'Dişil (Yin)',
    ruler: 'Merkür',
    archetype: 'Analist, Usta Zanaatkar, Hizmetkar',
    motto: 'İncelerim ve İyileştiririm',
    color: '#84cc16',
    overview: 'Başak, detayların, analizin ve mükemmelleştirmenin burcudur. Kaosu düzene sokmak, faydalı olmak ve işleyen bir sistem kurmak onun dehasıdır. Alçakgönüllü ve üretkendir.',
    strengths: ['Kusursuz gözlem ve analiz', 'Çalışkanlık ve metodik yaklaşım', 'Yardımseverlik ve alçakgönüllülük', 'Sağlık ve pratiklik bilinci'],
    shadows: ['Aşırı eleştirellik ve mükemmeliyetçilik', 'Sürekli evham ve endişe', 'Detaylarda boğulup bütünü kaçırma', 'Kendine acımasız davranma'],
    loveDescription: 'Sevgisini kelimelerden çok hizmet ederek, partnerinin hayatını kolaylaştırarak ve özenli pratik adımlarla gösterir.',
    careerDescription: 'Tıp, eczacılık, kalite kontrol, veri analitiği, muhasebe, editörlük, araştırma ve diyetisyenlik.',
    bodyPart: 'Bağırsaklar, sindirim sistemi ve karın bölgesi.',
  },
  libra: {
    id: 'libra',
    name: 'Terazi',
    latinName: 'Libra',
    symbol: '♎',
    dates: '23 Eylül - 22 Ekim',
    element: 'Hava',
    modality: 'Öncü',
    polarity: 'Eril (Yang)',
    ruler: 'Venüs',
    archetype: 'Diplomat, Estet, Adalet Arayıcısı',
    motto: 'Dengelerim ve Uyum Yaratırım',
    color: '#06b6d4',
    overview: 'Terazi, zarafet, adalet, estetik ve ikili ilişkilerin sembolüdür. Her şeyde bir ahenk ve simetri arar. Çatışmalardan hoşlanmaz; köprü kurucu ve uzlaştırıcı rolü üstlenir.',
    strengths: ['Üstün diplomasi ve uzlaşma', 'Adalet ve hakkaniyet duygusu', 'Kusursuz estetik ve stil', 'Nezaket ve sosyal zarafet'],
    shadows: ['Kararsızlık ve erteleme', 'Çatışmadan kaçmak için taviz verme', 'Yüzeysel uyum arayışı', 'Yalnız kalma korkusu'],
    loveDescription: 'Aşk ve evlilik onun hayat okuludur. Eşitlikçi, romantik ve zarif bir birliktelik hayal eder; kaba davranışlardan soğur.',
    careerDescription: 'Hukuk, arabuluculuk, diplomasi, moda, iç mekan tasarımı, sanat danışmanlığı ve halkla ilişkiler.',
    bodyPart: 'Böbrekler, bel bölgesi ve kalçalar.',
  },
  scorpio: {
    id: 'scorpio',
    name: 'Akrep',
    latinName: 'Scorpio',
    symbol: '♏',
    dates: '23 Ekim - 21 Kasım',
    element: 'Su',
    modality: 'Sabit',
    polarity: 'Dişil (Yin)',
    ruler: 'Plüton & Mars',
    archetype: 'Simyacı, Dedektif, Anka Kuşu',
    motto: 'Dönüştürürüm ve Derine İnerim',
    color: '#9333ea',
    overview: 'Akrep, zodyakın en yoğun, tutkulu ve dönüştürücü burcudur. Görünenin altındaki sırları keşfetme yeteneğine sahiptir. Küllerinden yeniden doğmayı ve krizleri aşmayı bilir.',
    strengths: ['Derin sezgiler ve psişik güç', 'Korkusuz dayanıklılık ve irade', 'Manyetik çekim gücü', 'Gizlilik ve sarsılmaz sırdaşlık'],
    shadows: ['Kıskançlık ve intikam duygusu', 'Aşırı şüphecilik ve paranoya', 'Kontrol ve manipülasyon arzusu', 'Affetmekte zorlanma'],
    loveDescription: 'Yarım yamalak ilişkilere tahammülü yoktur; ya hep ya hiç felsefesiyle sever. Partneriyle ruhsal ve tensel tam bir birleşme arzular.',
    careerDescription: 'Psikiyatri, cerrahi, kriminal dedektiflik, gizli istihbarat, stratejik finans, kriz yönetimi ve okült araştırmalar.',
    bodyPart: 'Üreme organları ve boşaltım sistemi.',
  },
  sagittarius: {
    id: 'sagittarius',
    name: 'Yay',
    latinName: 'Sagittarius',
    symbol: '♐',
    dates: '22 Kasım - 21 Aralık',
    element: 'Ateş',
    modality: 'Değişken',
    polarity: 'Eril (Yang)',
    ruler: 'Jüpiter',
    archetype: 'Filozof, Gezgin, Hakikat Avcısı',
    motto: 'Genişletirim ve Anlam Ararım',
    color: '#f97316',
    overview: 'Yay burcu, ufukları aşma, yeni kültürler tanıma ve hayatın derin felsefi anlamını bulma arzusunun simgesidir. Neşeli, iyimser, bağımsızlığına düşkün ve özgür ruhludur.',
    strengths: ['Sonsuz iyimserlik ve umut', 'Felsefi derinlik ve vizyonerlik', 'Dürüstlük ve hakikat sevgisi', 'Maceracı ve açık fikirli doğa'],
    shadows: ['Patavatsızlık ve dobralık aşırılığı', 'Taahhütlerden kaçma', 'Aşırı genelleme ve bilgiçlik taslama', 'Huzursuz sabırsızlık'],
    loveDescription: 'Özgürlüğünü kısıtlamayacak, birlikte dünyayı gezebileceği ve felsefe yapabileceği yoldaş ruhlar arar.',
    careerDescription: 'Akademisyenlik, felsefe, turizm, yayıncılık, uluslararası ticaret, hukuk ve koçluk alanları.',
    bodyPart: 'Uyluklar, kalçalar, karaciğer ve siyatik sinir.',
  },
  capricorn: {
    id: 'capricorn',
    name: 'Oğlak',
    latinName: 'Capricorn',
    symbol: '♑',
    dates: '22 Aralık - 19 Ocak',
    element: 'Toprak',
    modality: 'Öncü',
    polarity: 'Dişil (Yin)',
    ruler: 'Satürn',
    archetype: 'Usta Stratejist, Dağ Keçisi, Bilge Yaşlı',
    motto: 'Kullanırım ve Zirveye Tırmanırım',
    color: '#22c55e',
    overview: 'Oğlak, sabrın, zamanın ve somut hedeflere adım adım ulaşmanın burcudur. Dağın en dik yamacına bile düşmeden tırmanan keçi gibi, engelleri teker teker aşarak kalıcı bir miras bırakır.',
    strengths: ['Çelik gibi disiplin ve azim', 'Stratejik planlama ve sorumluluk', 'Güvenilirlik ve olgunluk', 'Zaman yönetimi ve gerçekçilik'],
    shadows: ['Aşırı katılık ve melankoli', 'Duyguları bastırma', 'Kariyer ve başarıya takıntılı olma', 'Kötümserlik eğilimi'],
    loveDescription: 'Aşkta temkinli ve ağırdır ama bir kez bağlandığında ömürlük bir dayanak olur. Güven ve saygı onun için şarttır.',
    careerDescription: 'Üst düzey yöneticilik (CEO), siyaset, kamu yönetimi, inşaat mühendisliği, mimarlık ve kurumsal liderlik.',
    bodyPart: 'İskelet sistemi, kemikler, eklemler, dizler ve dişler.',
  },
  aquarius: {
    id: 'aquarius',
    name: 'Kova',
    latinName: 'Aquarius',
    symbol: '♒',
    dates: '20 Ocak - 18 Şubat',
    element: 'Hava',
    modality: 'Sabit',
    polarity: 'Eril (Yang)',
    ruler: 'Uranüs & Satürn',
    archetype: 'İsyankar Deha, Hümanist, Gelecek Vizyoneri',
    motto: 'Bilirim ve Geleceği Tasarlarım',
    color: '#3b82f6',
    overview: 'Kova, insanlığın kolektif bilincini, teknolojiyi ve özgünlüğü temsil eder. Geleneksel kalıplara sığmaz; toplumun ilerisi için düşünen bir vizyoner ve adalet savunucusudur.',
    strengths: ['Özgün ve yenilikçi düşünce', 'İnsancıl ve hümanist yaklaşım', 'Objektiflik ve rasyonel bakış', 'Grup çalışmalarında vizyonerlik'],
    shadows: ['Duygusal mesafelilik ve soğukluk', 'Aşırı dik kafalılık ve marjinallik', 'Kural tanımazlık', 'Fildişi kuleye çekilme'],
    loveDescription: 'Önce arkadaşlık kurmak ister. Bağımsızlığına saygı duyan, zeki ve vizyon sahibi bireylere ilgi duyar.',
    careerDescription: 'Yapay zeka, teknoloji, uzay bilimleri, sosyoloji, sivil toplum kuruluşları, mucitlik ve astroloji.',
    bodyPart: 'Baldırlar, kaval kemikleri, ayak bilekleri ve dolaşım sistemi.',
  },
  pisces: {
    id: 'pisces',
    name: 'Balık',
    latinName: 'Pisces',
    symbol: '♓',
    dates: '19 Şubat - 20 Mart',
    element: 'Su',
    modality: 'Değişken',
    polarity: 'Dişil (Yin)',
    ruler: 'Neptün & Jüpiter',
    archetype: 'Mistik Şair, Hayalperest, Kozmik Ruh',
    motto: 'İnanırım ve Bütünleşirim',
    color: '#8b5cf6',
    overview: 'Zodyakın son burcu olan Balık, tüm burçların deneyimlerini bünyesinde eriten okyanus gibidir. Sınırsız şefkat, psişik algılar ve evrensel sevgi onun doğasıdır.',
    strengths: ['Sınırsız şefkat ve empati', 'Zengin sanatsal hayal gücü', 'Ruhsal ve psişik duyarlılık', 'Fedakar ve affedici yürek'],
    shadows: ['Gerçeklerden kaçış ve kurban psikolojisi', 'Sınır koyamama ve suiistimal edilme', 'Aşırı hayalperestlik ve dalgınlık', 'Bağımlılıklara yatkınlık'],
    loveDescription: 'Masalsı, ruh eşi seviyesinde bir aşk hayal eder. Partnerinin duygusal dünyasında kaybolmayı ve koşulsuz sevmeyi arzular.',
    careerDescription: 'Sinema, müzik, şiir, fotoğrafçılık, psikoloji, spiritüel danışmanlık, şifacılık ve denizcilik.',
    bodyPart: 'Ayaklar, lenf sistemi ve bağışıklık sistemi.',
  },
};

export interface HouseInfo {
  number: number;
  traditionalName: string;
  theme: string;
  astrologicalSignificance: string;
  keyQuestions: string[];
}

export const HOUSES_GUIDE: HouseInfo[] = [
  {
    number: 1,
    traditionalName: '1. Ev (Ascendant - Yükselen)',
    theme: 'Benlik, Kişilik, Dış Görünüş, Dünyaya İlk İntiba',
    astrologicalSignificance: 'Doğduğun anda ufuk çizgisinde yükselen burçtur. Beden dilini, hayatı karşılama üslubunu ve başkalarının seninle ilk karşılaştığında hissettiği enerjiyi belirler.',
    keyQuestions: ['Ben kimim?', 'Dışarıya hangi yüzümü gösteriyorum?', 'Hayata nasıl adım atıyorum?'],
  },
  {
    number: 2,
    traditionalName: '2. Ev (Maddi ve Manevi Değerler)',
    theme: 'Para, Gelir Kaynakları, Öz Saygı, Yetenekler',
    astrologicalSignificance: 'Kendi emeğinle kazandığın parayı, sahip olduğun maddi varlıkları ve en önemlisi kendine biçtiğin "öz değer" duygusunu simgeler.',
    keyQuestions: ['Parayı nasıl kazanırım?', 'Kendime ne kadar değer veriyorum?', 'Hangi yeteneklerim berekete dönüşür?'],
  },
  {
    number: 3,
    traditionalName: '3. Ev (Zihin ve Yakın Çevre)',
    theme: 'İletişim, Kardeşler, Komşular, Erken Eğitim, Seyahatler',
    astrologicalSignificance: 'Zihninin nasıl çalıştığını, düşüncelerini nasıl aktardığını, kardeşlerinle ve yakın çevrenle olan dinamiklerini yönetir.',
    keyQuestions: ['Nasıl düşünür ve konuşurum?', 'Öğrenme stilim nedir?', 'Yakın çevremle nasıl bağ kurarım?'],
  },
  {
    number: 4,
    traditionalName: '4. Ev (IC - Dip Noktası)',
    theme: 'Ev, Aile, Kökler, Anne/Baba, İç Huzur',
    astrologicalSignificance: 'Haritanın en dip, en mahrem noktasıdır. Çocukluk evini, aile bağlarını, atalarını ve günün sonunda sığındığın içsel mabedini temsil eder.',
    keyQuestions: ['Köklerim nerede?', 'Kendimi nerede ve nasıl güvende hissederim?', 'Ailemle ilişkim nasıldır?'],
  },
  {
    number: 5,
    traditionalName: '5. Ev (Yaratıcılık ve Neşe)',
    theme: 'Aşk, Flört, Çocuklar, Hobiler, Sahne, Şans Oyunları',
    astrologicalSignificance: 'İçindeki çocuğun coştuğu alandır. Romantik flörtler, yaratıcı projeler, sanatsal üretim ve hayattan aldığın saf zevk bu evdedir.',
    keyQuestions: ['Beni ne mutlu eder?', 'Aşkı nasıl yaşarım?', 'Yaratıcılığımı nasıl ortaya koyarım?'],
  },
  {
    number: 6,
    traditionalName: '6. Ev (Hizmet ve Sağlık)',
    theme: 'Günlük Rutinler, Beden Sağlığı, İş Ortamı, Evcil Hayvanlar',
    astrologicalSignificance: 'Günün nasıl geçtiğini, çalışma disiplinini, beslenme alışkanlıklarını ve bedenine nasıl baktığını gösteren pratik hayat evidir.',
    keyQuestions: ['Günlük hayatımı nasıl düzenlerim?', 'Bedenim benden ne istiyor?', 'Hizmet etme anlayışım nedir?'],
  },
  {
    number: 7,
    traditionalName: '7. Ev (Descendant - Alçalan)',
    theme: 'Evlilik, Uzun Süreli Ortaklıklar, Aynalama, Anlaşmalar',
    astrologicalSignificance: 'Benliğin karşısındaki "Biz" alanıdır. Hayatına çektiğin partner tipini, evlilik dinamiklerini ve seni tamamlayan özellikleri yansıtır.',
    keyQuestions: ['İlişkilerde ne arıyorum?', 'Kimi kendime çekerim?', 'Ortaklıklarda dengeyi nasıl sağlarım?'],
  },
  {
    number: 8,
    traditionalName: '8. Ev (Dönüşüm ve Paylaşımlar)',
    theme: 'Krizler, Ortak Maddiyat, Miras, Okült, Cinsellik',
    astrologicalSignificance: 'Derin psikolojik dönüşümlerin, krizlerden doğan gücün, başkalarının kaynaklarının (kredi, miras, eşin parası) ve ruhsal simyanın evidir.',
    keyQuestions: ['Krizlerle nasıl baş ederim?', 'Başkalarıyla kaynaklarımı nasıl paylaşırım?', 'Korkularımı nasıl güce dönüştürürüm?'],
  },
  {
    number: 9,
    traditionalName: '9. Ev (Uzak Ufuklar ve Bilgelik)',
    theme: 'Yüksek Felsefe, Yurt Dışı, Akademi, İnançlar, Hukuk',
    astrologicalSignificance: 'Zihnin genişlediği yerdir. Farklı kültürler, yabancı diller, yüksek öğrenim, hayat felsefesi ve inanç arayışını simgeler.',
    keyQuestions: ['Hayatın anlamı nedir?', 'İnançlarım ve değerlerim neler?', 'Ufuklarımı nasıl genişletirim?'],
  },
  {
    number: 10,
    traditionalName: '10. Ev (Medium Coeli - MC / Tepe Noktası)',
    theme: 'Kariyer, Toplumsal Statü, Başarı, Liderlik, Saygınlık',
    astrologicalSignificance: 'Haritanın öğle güneşi gibi parlayan en yüksek noktasıdır. Dünyada neyle tanınmak istediğini, mesleki zirveni ve toplumdaki itibarını gösterir.',
    keyQuestions: ['Hangi alanda iz bırakacağım?', 'Toplum beni nasıl tanır?', 'Kariyer hedefim nedir?'],
  },
  {
    number: 11,
    traditionalName: '11. Ev (Kolektif ve Gelecek)',
    theme: 'Hayaller, Arkadaş Grupları, Topluluklar, Gelecek Vizyonu',
    astrologicalSignificance: 'Bireysel çıkarların ötesine geçip insanlığa fayda sağlama alanıdır. Dostluklar, dernekler, kolektif idealler ve umutlar bu evdedir.',
    keyQuestions: ['Hangi topluluklara aidim?', 'Gelecekten ne umuyorum?', 'Topluma ne katabilirim?'],
  },
  {
    number: 12,
    traditionalName: '12. Ev (Bilinçaltı ve Ruhsal Mabed)',
    theme: 'Bilinçaltı, Gizli Sırlar, İnziva, Rüyalar, Ruhsal Arınma',
    astrologicalSignificance: 'Zodyakın görünmeyen okyanusudur. Kolektif bilinçdışı, rüyalar, gizli korkular, karmik dersler ve yalnız kalarak ulaşılan içsel aydınlanmadır.',
    keyQuestions: ['Bilinçaltımda ne saklı?', 'Kendi kendimi nasıl sabote ediyorum?', 'Ruhumu nasıl dinlendiririm?'],
  },
];

// Meaning of Signs in Houses (Astrologer Eye Comprehensive Matrix)
export interface SignHouseInterpretation {
  headline: string;
  interpretation: string;
  advice: string;
}

export function getSignHouseInterpretation(signId: string, houseNumber: number): SignHouseInterpretation {
  const sign = ZODIAC_PROFILES[signId] || ZODIAC_PROFILES.aries;
  const house = HOUSES_GUIDE[houseNumber - 1] || HOUSES_GUIDE[0];

  const customMatrix: Record<string, SignHouseInterpretation> = {
    'aries_1': {
      headline: 'Doğal Öncü, Dinamik ve Cesur Duruş',
      interpretation: '1. Evde Koç burcu, dünyayı bir fetih alanı olarak gören, doğrudan ve enerjik bir kimlik verir. İnsanlar sizi ilk gördüklerinde kararlı, bağımsız ve çekinmeyen bir mizaca sahip olduğunuzu hemen hissederler.',
      advice: 'Aceleci tepkiler yerine sabırlı adımlar atmayı öğrenmek liderliğinizi taçlandırır.',
    },
    'taurus_2': {
      headline: 'Güçlü Finansal Sezgiler ve Sağlam Öz Değer',
      interpretation: '2. Evde Boğa, parayı kalıcı ve somut kaynaklara yatırma ustalığı verir. Kendi değerinizi ürettiğiniz eserlerde ve koruduğunuz güven ortamında bulursunuz.',
      advice: 'Tasarruf ve yatırım zekanız harikadır; ancak eşyalara aşırı bağımlılık geliştirmemeye dikkat edin.',
    },
    'gemini_3': {
      headline: 'Kıvrak Zeka, Güçlü İletişim ve Merak',
      interpretation: '3. Evde İkizler, kelimeleri ustalıkla kullanan, sürekli okuyan, araştıran ve yakın çevresiyle canlı diyaloglar kuran bir zihinsel yapı verir.',
      advice: 'Aynı anda birden fazla konuya odaklanmak yerine bir alanda derinleşmeyi deneyin.',
    },
    'cancer_4': {
      headline: 'Köklerine Bağlı, Sıcak ve Koruyucu Bir Yuva',
      interpretation: '4. Evde Yengeç, ailenizi ve çocukluğunuzu hayatınızın temeli yapar. Eviniz sizin için dış dünyanın gürültüsünden arındığınız kutsal bir sığınaktır.',
      advice: 'Geçmişin nostaljisine takılmadan şimdiki anın sıcaklığını yaşamaya özen gösterin.',
    },
    'leo_5': {
      headline: 'Aşkta Asil Coşku ve Parlayan Yaratıcılık',
      interpretation: '5. Evde Aslan, yaratıcılığınızı bir sanat eserine, aşk hayatınızı ise masalsı bir romana dönüştürür. Sahneye çıkmaktan ve takdir edilmekten zevk alırsınız.',
      advice: 'Cömertliğiniz ışıldarken, sevdiklerinizin de kendi ışıklarını sergilemelerine alan tanıyın.',
    },
    'virgo_6': {
      headline: 'Kusursuz Hizmet, Detaylara Hakimiyet ve Sağlık',
      interpretation: '6. Evde Başak, günlük rutinlerde intizam, çalışma hayatında analitik titizlik ve bedene özenli bir bakım getirir.',
      advice: 'Mükemmeliyetçilik stresine kapılmadan "yeterince iyi" olanın kıymetini bilin.',
    },
    'libra_7': {
      headline: 'Zarafet, Eşitlik ve Ruhsal Uyum Arayışı',
      interpretation: '7. Evde Terazi, evlilik ve ortaklıklarda nezaket, adalet ve estetik uyum arayan bir mizaç verir. Çatışmalardan kaçınır, uzlaşma ararsınız.',
      advice: 'Barışı korumak adına kendi sınırlarınızdan ve arzularınızdan vazgeçmeyin.',
    },
    'scorpio_8': {
      headline: 'Küllerinden Doğuş ve Derin Sezgisel Güç',
      interpretation: '8. Evde Akrep, krizleri ve kayıpları bir güce dönüştürme yeteneği verir. Ortak finansal konularda ve psikolojik dönüşümlerde son derece dirençlisinizdir.',
      advice: 'Aşırı şüphecilik yerine güvendiğiniz insanlara kalbinizi açmayı deneyimleyin.',
    },
    'sagittarius_9': {
      headline: 'Sonsuz Ufuklar, Felsefe ve Macera Tutkusu',
      interpretation: '9. Evde Yay, yabancı kültürleri keşfetme, yüksek öğrenim ve hayat felsefesi geliştirme konusunda büyük bir şans ve heves vadeder.',
      advice: 'Vizyonunuz genişken pratik ayrıntıları gözden kaçırmamaya dikkat edin.',
    },
    'capricorn_10': {
      headline: 'Kariyerde Zirveye Adım Adım Tırmanan Azim',
      interpretation: '10. Evde Oğlak, toplum önünde güvenilir, saygın ve otoriter bir profil çizer. Genç yaşta sorumluluk alabilir ve geç olgunlaşan kalıcı başarılara imza atarsınız.',
      advice: 'Başarı peşinde koşarken özel hayatınızı ve neşenizi ihmal etmeyin.',
    },
    'aquarius_11': {
      headline: 'Vizyoner Dostluklar ve Gelecek İdealleri',
      interpretation: '11. Evde Kova, farklı ve yenilikçi arkadaş çevreleri, toplumsal projelere adanmışlık ve özgürlükçü idealler kazandırır.',
      advice: 'Kolektif hedefler uğruna bireysel sıcak dostluklarınızı da koruyun.',
    },
    'pisces_12': {
      headline: 'Mistik Sezgiler, Şifa ve Zengin Bilinçaltı',
      interpretation: '12. Evde Balık, güçlü rüyalar, psişik hassasiyet ve evrenle görünmez bir bağ kurma yeteneği verir. Yalnızlık sizin için bir yenilenme kaynağıdır.',
      advice: 'Dünyevi gerçeklerden kaçmak yerine manevi enerjinizi sanata veya başkalarına şifa vermeye yönlendirin.',
    },
  };

  const key = `${signId}_${houseNumber}`;
  if (customMatrix[key]) {
    return customMatrix[key];
  }

  // Astrological synthesis engine for all other 132 permutations
  return {
    headline: `${sign.name} Enerjisinin ${house.number}. Ev Hayat Alanındaki Yansıması`,
    interpretation: `Bu yerleşim, ${sign.name} burcunun ${sign.element.toLowerCase()} elementi ve ${sign.modality.toLowerCase()} niteliğini doğrudan ${house.theme.toLowerCase()} alanına odaklar. ${sign.ruler} gezegeninin etkisiyle, bu yaşam alanında ${sign.archetype.toLowerCase()} gibi davranır, kararlarınızı ${sign.strengths[0].toLowerCase()} ve ${sign.strengths[1].toLowerCase()} temelinde alırsınız.`,
    advice: `${sign.name} burcunun gölge yönü olan "${sign.shadows[0]}" tuzağına düşmeden, bu hayat alanında bilinçli denge kurmayı hedefleyin.`,
  };
}
