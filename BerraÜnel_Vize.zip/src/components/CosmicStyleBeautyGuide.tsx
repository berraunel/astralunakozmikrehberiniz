import React, { useState } from 'react';
import { ZODIAC_SIGNS } from '../utils/astrologyCalc';
import { Sparkles, Palette, Shirt, Gem, Smile, Copy, Check, Heart } from 'lucide-react';

interface StyleBeautyProfile {
  id: string;
  signName: string;
  tagline: string;
  palette: { name: string; hex: string; desc: string }[];
  wardrobe: {
    vibe: string;
    keyItems: string[];
    fabrics: string;
    styleAdvice: string;
  };
  accessories: {
    stones: string;
    metal: string;
    signatureItem: string;
  };
  beauty: {
    makeupStyle: string;
    lipEye: string;
    perfumeNotes: string;
    skincareRitual: string;
  };
}

export const COSMIC_STYLE_PROFILES: Record<string, StyleBeautyProfile> = {
  aries: {
    id: 'aries',
    signName: 'Koç',
    tagline: 'Korkusuz, Dinamik ve Cesur Silüetler',
    palette: [
      { name: 'Kızıl Mercan', hex: '#EF4444', desc: 'İçindeki liderlik ve ateş enerjisini açığa çıkaran ton.' },
      { name: 'Obsidyen Siyahı', hex: '#1E293B', desc: 'Net ve keskin sınırları vurgulayan baz renk.' },
      { name: 'Alev Turuncusu', hex: '#F97316', desc: 'Spontane ve enerjik auranın sembolü.' },
      { name: 'Ham Beyaz', hex: '#F8FAFC', desc: 'Taze bir başlangıç hissi veren minimalist kontrast.' },
    ],
    wardrobe: {
      vibe: 'Athleisure-chic, modern deri ceketler, dinamik kesimler ve hareket özgürlüğü.',
      keyItems: ['Oversize deri bomber ceket', 'Yüksek bel keskin pantolon', 'Tasarım sneakerlar', 'Minimalist kargo parçalar'],
      fabrics: 'Doğal deri, yüksek kaliteli pamuklu gabardin, nefes alan teknik kumaşlar.',
      styleAdvice: 'Aşırı karmaşık katmanlardan kaçının. Tek bir iddialı parça ve net çizgiler tarzınızı zirveye taşır.',
    },
    accessories: {
      stones: 'Kırmızı Akik, Jasper ve Pırlanta.',
      metal: 'Titanyum, mat çelik ve fırçalanmış gümüş.',
      signatureItem: 'Keskin hatlı tasarım güneş gözlüğü veya sportif lüks kronograf saat.',
    },
    beauty: {
      makeupStyle: 'Fresh & Bold: Belirgin yukarı taranmış kaşlar, ışıltılı temiz bir ten.',
      lipEye: 'İmza kırmızı ruj (mat kiremit kırmızısı) veya sade nude dudaklar ve grafik eyeliner.',
      perfumeNotes: 'Karabiber, zencefil, narenciye ve sedir ağacı gibi canlandırıcı odunsu-baharatlı notalar.',
      skincareRitual: 'Hızlı ve etkili C vitamini serumu ile sabahları canlandırıcı buz masajı.',
    },
  },
  taurus: {
    id: 'taurus',
    signName: 'Boğa',
    tagline: 'Sessiz Lüks (Quiet Luxury), Dokunsal Zevkler ve Huzur',
    palette: [
      { name: 'Adaçayı Yeşili', hex: '#10B981', desc: 'Doğayla köklenen dingin zenginlik.' },
      { name: 'Kaşmir Krem', hex: '#F5EBE0', desc: 'Tensel konforun ve zarafetin baz tonu.' },
      { name: 'Toprak Taba', hex: '#A27B5C', desc: 'Kalıcı, güvenilir ve zamansız asalet.' },
      { name: 'Zümrüt Derinliği', hex: '#064E3B', desc: 'Venüsyen bereket ve lüks algısı.' },
    ],
    wardrobe: {
      vibe: 'Old-money estetiği, kusursuz dökümlü kumaşlar ve zamansız kapsül gardırop.',
      keyItems: ['Kaşmir triko kazak', 'Geniş paça keten pantolon', 'Kusursuz trençkot', 'Deri loafer ayakkabılar'],
      fabrics: 'Kaşmir, organik ipek, yumuşak süet ve yıkanmış keten.',
      styleAdvice: 'Trendlerin peşinden koşmak yerine ömürlük kumaş kalitesine yatırım yapın.',
    },
    accessories: {
      stones: 'Zümrüt, Malakit ve Pembe Kuvars.',
      metal: 'Sarı altın ve antik pirinç.',
      signatureItem: 'Boynu zarifçe saran saf ipek fular ve el yapımı deri çanta.',
    },
    beauty: {
      makeupStyle: 'Velvet Glow: Kadifemsi, nemli ve sağlıklı "makyajsız makyaj" duruşu.',
      lipEye: 'Gül kurusu veya şeftali tonlu kremsi dudaklar; sıcak kahve ve bronz farlar.',
      perfumeNotes: 'Gül yaprakları, vanilya, sandal ağacı ve taze incir kokuları.',
      skincareRitual: 'Gül suyu toniği, yoğun nemlendirici seramid kremleri ve gua sha boyun masajı.',
    },
  },
  gemini: {
    id: 'gemini',
    signName: 'İkizler',
    tagline: 'Eklektik, Oyunbaz ve Zekice Katmanlar',
    palette: [
      { name: 'Elektrik Sarısı', hex: '#FBBF24', desc: 'Zihinsel kıvraklık ve neşe enerjisi.' },
      { name: 'Gökyüzü Mavisi', hex: '#38BDF8', desc: 'Fikirlerin hafifliği ve iletişim özgürlüğü.' },
      { name: 'Lavanta Lila', hex: '#C084FC', desc: 'Modern ve meraklı ruh hali.' },
      { name: 'Grafit Grisi', hex: '#334155', desc: 'Şehirli ve entelektüel dengeleyici.' },
    ],
    wardrobe: {
      vibe: 'Karıştır-yakıştır (Mix & Match), sokak stili ile kolej stilinin flörtü.',
      keyItems: ['Çift taraflı ceketler', 'Grafik tişörtler üzerine oversize blazer', 'Desenli mini etek veya şort', 'Çok cepli tote bag'],
      fabrics: 'Hafif pamuklu poplin, denim, jakar ve modern file örgüler.',
      styleAdvice: 'Günün moduna göre değişebilen, katmanlı ve dönüştürülebilir kombinler tam size göredir.',
    },
    accessories: {
      stones: 'Akik (Agat), Sitrin ve Akuamarin.',
      metal: 'Gümüş, beyaz altın ve renkli emaye takılar.',
      signatureItem: 'İnce tasarım bileklikler, çoklu yüzükler ve dikkat çekici telefon askısı.',
    },
    beauty: {
      makeupStyle: 'Playful & Fresh: Eğlenceli renk dokunuşları, parlak dudaklar ve aydınlık göz pınarları.',
      lipEye: 'Işıltılı lip gloss, pastel renkli göz kalemleri veya hafif dumanlı şeftali far.',
      perfumeNotes: 'Yeşil çay, bergamot, nane ve taze portakal çiçeği gibi kıpır kıpır havadar esintiler.',
      skincareRitual: 'Hafif su bazlı nemlendiriciler ve gün içinde ferahlatıcı termal yüz spreyi.',
    },
  },
  cancer: {
    id: 'cancer',
    signName: 'Yengeç',
    tagline: 'Romantik, Nostaljik ve Koruyucu Zarafet',
    palette: [
      { name: 'İnci Beyazı', hex: '#F1F5F9', desc: 'Ay ışığının saflığı ve ruhsal berraklık.' },
      { name: 'Gümüşi Gri', hex: '#94A3B8', desc: 'Nostaljik ve koruyucu zırh tonu.' },
      { name: 'Toz Pembe', hex: '#F472B6', desc: 'Şefkat ve içsel çocuk sıcaklığı.' },
      { name: 'Okyanus Gecesi', hex: '#1E1B4B', desc: 'Derin duygusal aidiyet hissi.' },
    ],
    wardrobe: {
      vibe: 'Vintage romantizm, sarıp sarmalayan yumuşak hırkalar ve feminen dökümler.',
      keyItems: ['Dantel detaylı ipek bluz', 'Yumuşacık triko hırka', 'A-kesim kloş etek', 'Babet veya yumuşak deri mary-jane ayakkabı'],
      fabrics: 'İpek saten, tiftik yün, pamuklu vual ve nostaljik danteller.',
      styleAdvice: 'Sizi duygusal olarak güvende hissettiren, teninize şefkatle dokunan yumuşak dokuları seçin.',
    },
    accessories: {
      stones: 'Aytaşı (Moonstone), İnci ve Selenit.',
      metal: 'Saf gümüş ve antik platinyum.',
      signatureItem: 'Aile yadigarı bir broş, inci kolye veya minyatür madalyon kolye ucu.',
    },
    beauty: {
      makeupStyle: 'Dewy Moonlight: Ay ışığı gibi aydınlık, ıslak ten bitişi ve pembe allık.',
      lipEye: 'Doğal dudak renginde balmlar, buğulu kirpikler ve sedefli şampanya far.',
      perfumeNotes: 'Beyaz leylak, pudra, yasemin, süt inciri ve beyaz misk.',
      skincareRitual: 'Gece besleyici uyku maskeleri, yatıştırıcı papatya özlü tonikler ve nemlendirici ampuller.',
    },
  },
  leo: {
    id: 'leo',
    signName: 'Aslan',
    tagline: 'Görkemli, Karizmatik ve Sahne Işıltısı',
    palette: [
      { name: 'Güneş Altını', hex: '#F59E0B', desc: 'Zirvede parlayan kraliyet karizması.' },
      { name: 'Asil Bordo', hex: '#991B1B', desc: 'Tutku ve otoritenin görkemli buluşması.' },
      { name: 'Sıcak Amber', hex: '#D97706', desc: 'Cömert ve sıcakkanlı yaşam enerjisi.' },
      { name: 'İmparatorluk Moru', hex: '#581C87', desc: 'Sahne ışığı ve büyüleyici cazibe.' },
    ],
    wardrobe: {
      vibe: 'Göz alıcı statement parçalar, aslan yelesi gibi hacimli saçlar ve lüks kesimler.',
      keyItems: ['Vurgulu omuzlu smokin ceket', 'Yırtmaçlı altın detaylı elbise', 'İpek gömlek', 'Göz alıcı topuklu ayakkabılar'],
      fabrics: 'Brokar kumaş, kadife, ağır ipek ve metalik iplik dokumalar.',
      styleAdvice: 'Odaya girdiğinizde gözlerin size çevrilmesinden korkmayın; altın aksanlar sizin imzanızdır.',
    },
    accessories: {
      stones: 'Pırlanta, Sitrin, Güneş Taşı ve Kehribar.',
      metal: '24 ayar sıcak sarı altın.',
      signatureItem: 'Gösterişli kalın zincir kolye veya altın işlemeli büyük tokalı kemer.',
    },
    beauty: {
      makeupStyle: 'Sun-Kissed Diva: Güneşten bronzlaşmış gibi parlayan altın aydınlatıcı ve bronzer.',
      lipEye: 'Sıcak karamel veya vişne çürüğü dudaklar; hacimli dramatik kirpikler ve altın far.',
      perfumeNotes: 'Amber, portakal çiçeği, vanilya, paçuli ve sıcak baharatlar.',
      skincareRitual: 'Altın tanecikli lüks serumlar, sıkılaştırıcı yüz masajı ve parlaklık veren peelingler.',
    },
  },
  virgo: {
    id: 'virgo',
    signName: 'Başak',
    tagline: 'Kusursuz Terzilik, Minimalist ve Arınmış Şıklık',
    palette: [
      { name: 'Keten Beji', hex: '#E2E8F0', desc: 'Sade, duru ve organik saflık.' },
      { name: 'Zeytin Yeşili', hex: '#65A30D', desc: 'Şifalı bitkilerin ve toprağın dinginliği.' },
      { name: 'Lacivert (Navy)', hex: '#1E293B', desc: 'Zeka, intizam ve profesyonellik.' },
      { name: 'Taupe Vizon', hex: '#78716C', desc: 'Zamansız ve dengeli nötr ton.' },
    ],
    wardrobe: {
      vibe: 'Kusursuz terzilik (tailoring), sade çizgiler ve dikiş kalitesiyle konuşan asalet.',
      keyItems: ['Kusursuz dikim poplin beyaz gömlek', 'Yünlü kumaş pantolon', 'Midi boy pileli etek', 'Klasik deri kemer'],
      fabrics: 'Yüksek iplik sayılı Mısır pamuğu, ince yün, organik keten ve saf kaşmir.',
      styleAdvice: 'Gösterişten uzak ama yakından bakıldığında dikiş işçiliğiyle büyüleyen parçaları seçin.',
    },
    accessories: {
      stones: 'Yeşim (Jade), Yosun Akik ve Karnelyan.',
      metal: 'Mat sarı altın veya fırçalanmış platin.',
      signatureItem: 'Klasik deri kordonlu zarif kol saati ve minimalist geometrik küpeler.',
    },
    beauty: {
      makeupStyle: 'Clean Girl Estetiği: Pürüzsüz mat-saten ten, taranmış temiz kaşlar ve yok gibi fondöten.',
      lipEye: 'Nemlendirici nude lip balm ve tek kat kahverengi maskara.',
      perfumeNotes: 'Lavanta, taze biçilmiş çimen, yeşil elma ve temiz çamaşır kokuları.',
      skincareRitual: 'AHA/BHA asit tonikleri, gözenek arındırıcı kil maskeleri ve niasinamid serumları.',
    },
  },
  libra: {
    id: 'libra',
    signName: 'Terazi',
    tagline: 'Kusursuz Orantı, Romantik Zarafet ve Pastel Ahenk',
    palette: [
      { name: 'Gül Kurusu', hex: '#FDA4AF', desc: 'Aşkın ve estetiğin Venüsyen yumuşaklığı.' },
      { name: 'Gök Mavisi', hex: '#7DD3FC', desc: 'Barışçıl diplomasi ve hafiflik.' },
      { name: 'Şampanya Nude', hex: '#FEF3C7', desc: 'Zarif uyum ve pürüzsüz estetik.' },
      { name: 'Lila Menekşe', hex: '#D8B4FE', desc: 'Sanatsal ruh ve incelik.' },
    ],
    wardrobe: {
      vibe: 'Akıcı elbiseler, simetrik kesimler, yumuşak renk geçişleri ve pastel feminenlik.',
      keyItems: ['Dökümlü kruvaze blazer ceket', 'Pileli şifon elbise', 'Geniş yaka ipek bluz', 'Zarif bantlı topuklu sandaletler'],
      fabrics: 'Şifon, ipek krep, hafif krep kumaşlar ve yumuşak tül detaylar.',
      styleAdvice: 'Kombininizde hiçbir parça bağırmamalı; tüm renkler ve aksesuarlar birbiriyle şarkı söyler gibi ahenk içinde olmalıdır.',
    },
    accessories: {
      stones: 'Opal, Pembe Turmalin ve Lapis Lazuli.',
      metal: 'Rose gold ve ince beyaz altın.',
      signatureItem: 'Katmanlı zarif zincir kolyeler ve simetrik sallantılı inci küpeler.',
    },
    beauty: {
      makeupStyle: 'Romantic Symmetry: Yüz hatlarını mükemmel dengeleyen yumuşak kontür ve buğulu pembe tonlar.',
      lipEye: 'Gül kurusu saten ruj, yumuşak pembe-şampanya buğulu göz makyajı.',
      perfumeNotes: 'Şakayık, pembe gül, vadi zambağı ve tatlı ahududu esansları.',
      skincareRitual: 'Hyaluronik asit nemlendiricileri, kolajen göz altı pedleri ve gül kuvars yüz silindiri.',
    },
  },
  scorpio: {
    id: 'scorpio',
    signName: 'Akrep',
    tagline: 'Manyetik Cazibe, Gizem ve Derin Dönüşüm',
    palette: [
      { name: 'Gece Yarısı Siyahı', hex: '#0F172A', desc: 'Görünmeyenin ve derin sırların zırhı.' },
      { name: 'Koyu Bordo / Vişne', hex: '#881337', desc: 'Manyetik tutkunun ve krizlerden doğan gücün rengi.' },
      { name: 'Koyu Mor', hex: '#581C87', desc: 'Ruhsal simya ve okült derinlik.' },
      { name: 'Zümrüt Yeşil / Petrol', hex: '#042F2E', desc: 'Küllerinden yeniden doğan Anka enerjisi.' },
    ],
    wardrobe: {
      vibe: 'Dark romance, baştan çıkarıcı kesimler, deri detaylar ve gizemli bir çekim.',
      keyItems: ['Deri trençkot', 'Korse detaylı şık üst', 'Boğazlı dar siyah triko', 'Diz üstü deri çizmeler'],
      fabrics: 'Gerçek deri, lüks kadife, dantel ve vücudu saran likralı kumaşlar.',
      styleAdvice: 'Tüm kartlarınızı bir anda açmayın; kıyafetinizde daima keşfedilmeyi bekleyen gizemli bir detay bırakın.',
    },
    accessories: {
      stones: 'Obsidyen, Granat (Lal Taşı) ve Kara Turmalin.',
      metal: 'Karartılmış gümüş, antrasit çelik ve platin.',
      signatureItem: 'Koyu renkli kedi gözü güneş gözlüğü veya gizli bölmeli zehir yüzüğü.',
    },
    beauty: {
      makeupStyle: 'Smoky Siren: Manyetik kedi bakışları, buğulu koyu gözler ve belirgin elmacık kemikleri.',
      lipEye: 'Koyu bordo / vişne çürüğü ruj veya nude dudak eşliğinde yoğun siyah dumanlı göz makyajı.',
      perfumeNotes: 'Mürrüsafi, siyah orkide, tütsü, tütün yaprakları ve paçuli.',
      skincareRitual: 'Retinol gece serumları, derinlemesine temizleyici gözenek bakımları ve detoks maskeleri.',
    },
  },
  sagittarius: {
    id: 'sagittarius',
    signName: 'Yay',
    tagline: 'Bohem Gezgin, Özgür Ruh ve Renkli Macera',
    palette: [
      { name: 'Sıcak Safran', hex: '#EA580C', desc: 'Uzak ufukları keşfeden sonsuz heves.' },
      { name: 'Çivit Mavisi (İndigo)', hex: '#4338CA', desc: 'Yüksek felsefe ve gökyüzü bilgeliği.' },
      { name: 'Turkuaz Yeşili', hex: '#0D9488', desc: 'Gezgin ruhun ve doğanın özgürlüğü.' },
      { name: 'Mistik Mor', hex: '#7E22CE', desc: 'Jüpiter\'in koruyucu şans aurası.' },
    ],
    wardrobe: {
      vibe: 'Boho-chic, etnik desenler, seyahat dostu rahatlık ve özgür kesimler.',
      keyItems: ['Etnik desenli panço veya kimono', 'Rahat kesim vintage jean', 'Gezgin botları / kovboy çizmeleri', 'Büyük sırt çantası'],
      fabrics: 'Yıkanmış keten, süet, organik kenevir dokuması ve renkli yünler.',
      styleAdvice: 'Sizi kısıtlayan, rahat nefes almanızı engelleyen kalıpları reddedin. Dünyanın farklı kültürlerinden parçaları cesurca karıştırın.',
    },
    accessories: {
      stones: 'Turkuaz (Firuze), Topaz ve Kalsit.',
      metal: 'Antik bronz, bakır ve dövme gümüş.',
      signatureItem: 'Seyahat anısı etnik bileklikler ve geniş kenarlı bohem fötr şapka.',
    },
    beauty: {
      makeupStyle: 'Golden Wanderer: Doğal güneş ışıltısı, bronz elmacık kemikleri ve zahmetsiz doğallık.',
      lipEye: 'Renkli dudak yağları (lip oil), hafif bronzlaştırıcı jel ve yukarı taranmış özgür kaşlar.',
      perfumeNotes: 'Sedir ağacı, kakule, narenciye kabukları ve vanilyalı tütün esintileri.',
      skincareRitual: 'Güneş koruyucu SPF krem (vazgeçilmez!), antioksidan nemlendirici ve pratik seyahat boy ürünler.',
    },
  },
  capricorn: {
    id: 'capricorn',
    signName: 'Oğlak',
    tagline: 'Zirve Stratejisti, Zamansız Prestij ve Keskin Disiplin',
    palette: [
      { name: 'Kömür Antrasit', hex: '#334155', desc: 'Otorite, güven ve sarsılmaz ciddiyet.' },
      { name: 'Orman Yeşili', hex: '#166534', desc: 'Yavaş büyüyen kalıcı başarının rengi.' },
      { name: 'Kumlu Deve Tüyü (Camel)', hex: '#D97706', desc: 'Sessiz lüks ve prestijin simgesi.' },
      { name: 'Buz Grisi', hex: '#CBD5E1', desc: 'Zirvedeki dağ rüzgarının kristal berraklığı.' },
    ],
    wardrobe: {
      vibe: 'Power-dressing, mimari kesimler, kurumsal zarafet ve zamansız miras parçalar.',
      keyItems: ['Çift sıra düğmeli yün palto', 'Kusursuz kalıpta pantolon-ceket takım', 'Kaşmir balıkçı yaka kazak', 'Deri oxford ayakkabılar'],
      fabrics: 'Saf krep yün, tüvit, alpaka ve ağır ipek krep.',
      styleAdvice: 'Ucuza kaçmayın; az ama en kaliteli olanı alıp on yıl boyunca gururla giymek sizin doğanızdır.',
    },
    accessories: {
      stones: 'Oniks, Granit ve Dumanlı Kuvars.',
      metal: 'Platin, mat beyaz altın ve titanyum.',
      signatureItem: 'Lüks İsviçre mekanik saat ve yapısal formu bozulmayan lüks deri evrak/el çantası.',
    },
    beauty: {
      makeupStyle: 'Architectural Chic: Keskin yüz hatlarını vurgulayan gölgelendirme, mat saten bitiş.',
      lipEye: 'Soğuk alt tonlu mat nude dudaklar; net hatlı kaşlar ve sade kahve gölgeli gözler.',
      perfumeNotes: 'Vetiver, meşe yosunu, deri, iris çiçeği ve bergamot.',
      skincareRitual: 'Peptit içerikli kolajen kremleri, gece onarıcı serumlar ve buz küreleriyle yüz sıkılaştırma.',
    },
  },
  aquarius: {
    id: 'aquarius',
    signName: 'Kova',
    tagline: 'Avangart Deha, Fütüristik Özgünlük ve İsyan',
    palette: [
      { name: 'Elektrik Kobaltı', hex: '#2563EB', desc: 'Yüksek frekanslı fikirlerin ve uzayın mavisi.' },
      { name: 'Siber Gümüş / Krom', hex: '#94A3B8', desc: 'Geleceğin teknolojisi ve deha yansıması.' },
      { name: 'Neon Menekşe', hex: '#9333EA', desc: 'Gelenekleri yıkan avangart vizyon.' },
      { name: 'Saf Arktik Beyaz', hex: '#F8FAFC', desc: 'Önyargısız, tarafsız ve berrak zihin.' },
    ],
    wardrobe: {
      vibe: 'Fütüristik sokak modası, asimetrik kalıplar ve kimsenin giymeye cesaret edemediği parçalar.',
      keyItems: ['Metalik yansımalı puffer mont', 'Asimetrik kesim tasarım elbise', 'Vintage kargo pantolon', 'Fütüristik kalın taban botlar'],
      fabrics: 'Teknolojik su geçirmez kumaşlar, metalik folyolar, holografik detaylar ve geri dönüştürülmüş inovatif materyaller.',
      styleAdvice: 'Asla "herkes bunu giyiyor" diye bir şey giymeyin. Kendi özgün modanızı kendiniz yaratın.',
    },
    accessories: {
      stones: 'Ametist, Florit ve Göktaşı (Moldavit).',
      metal: 'Parlak krom, titanyum ve şeffaf akrilik/reçine.',
      signatureItem: 'Asimetrik tek küpe veya akıllı giyilebilir teknolojik şık yüzük.',
    },
    beauty: {
      makeupStyle: 'Futuristic Glow: Metalik yansımalar, holografik aydınlatıcı ve cesur grafik çizgiler.',
      lipEye: 'Metalik parıltılı dudaklar veya çift kanatlı grafik eyeliner ve ışıltılı göz kapağı.',
      perfumeNotes: 'Ozon, aldehit, bambu, beyaz çay ve metalik-çiçeksi fütüristik notalar.',
      skincareRitual: 'LED ışık terapisi maskeleri, hyaluronik asit dolgunlaştırıcı serumlar ve anti-mavi ışık koruyucular.',
    },
  },
  pisces: {
    id: 'pisces',
    signName: 'Balık',
    tagline: 'Mistik Deniz Kızı, Rüya Estetiği ve Şiirsel Dökümler',
    palette: [
      { name: 'Akuamarin Yeşili', hex: '#06B6D4', desc: 'Derin okyanus mercanlarının şifalı rengi.' },
      { name: 'Rüya Leylağı', hex: '#A855F7', desc: 'Bilinçaltının ve mistik rüyaların rengi.' },
      { name: 'Deniz Köpüğü Nude', hex: '#E0F2FE', desc: 'Hassas sezgiler ve ruhsal hafiflik.' },
      { name: 'Gece Okyanusu', hex: '#1E1B4B', desc: 'Sonsuz evrenle bütünleşen dinginlik.' },
    ],
    wardrobe: {
      vibe: 'Mermaidcore, akışkan tüller, ışıkta renk değiştiren kumaşlar ve peri masalı zarafeti.',
      keyItems: ['Dökümlü maksi saten etek', 'Büyük boy örgü tiftik hırka', 'Deniz kabuğu detaylı üst', 'Yumuşak bantlı saten terlikler'],
      fabrics: 'Yarı saydam organze, ipek saten, tül, yumuşacık şönil ve şifon.',
      styleAdvice: 'Yürürken ardınızdan süzülen kumaşlar ve suluboya geçişli yumuşak renkler auranızı büyülü kılar.',
    },
    accessories: {
      stones: 'Akuamarin, Florit, Ametist ve Sedef.',
      metal: 'Deniz kabuğu rengi mat gümüş ve sedef kaplama.',
      signatureItem: 'Zarif halhal, deniz yıldızı motifli ince kolye veya şeffaf kristal yüzük.',
    },
    beauty: {
      makeupStyle: 'Ethereal Siren: Islak cam cilt görünümü (glass skin), ışıltılı pembe-mavi parlaklıklar.',
      lipEye: 'Cam gibi parlayan şeffaf lip gloss, göz kapaklarında ıslak parlaklık veren göz balmı.',
      perfumeNotes: 'Deniz tuzu, lotus çiçeği, su zambakları, vanilya ve ıslak odunsu notalar.',
      skincareRitual: 'Derinlemesine nem veren deniz yosunu maskeleri, yüz buhar banyosu ve uyku öncesi lavanta masajı.',
    },
  },
};

export const CosmicStyleBeautyGuide: React.FC = () => {
  const [selectedSignId, setSelectedSignId] = useState<string>('libra');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const profile = COSMIC_STYLE_PROFILES[selectedSignId] || COSMIC_STYLE_PROFILES.libra;
  const currentSign = ZODIAC_SIGNS.find((s) => s.id === selectedSignId) || ZODIAC_SIGNS[6];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section id="style-beauty" className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-4 border-b border-purple-400/20">
        <div>
          <span className="text-xs uppercase tracking-widest text-purple-300 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Yıldızların Tarzı & Güzellik Rehberi
          </span>
          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-slate-100 mt-1">
            Kozmik Stil & İmza Estetik Kartları
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Yükselen veya Güneş burcun nasıl giyinmeli? Sana en çok yakışan renk paletleri (HEX), takılar, kapsül gardırop ve güzellik tüyoları.
          </p>
        </div>

        <div className="text-xs text-purple-300/80 bg-purple-500/10 border border-purple-400/20 px-3 py-1.5 rounded-xl">
          * İpucu: Fiziksel giyim tarzı için <strong>Yükselen Burcunuza</strong> bakmanız önerilir.
        </div>
      </div>

      {/* 12 Sign Selector Strip */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
        {ZODIAC_SIGNS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSignId(s.id)}
            className={`p-2.5 rounded-xl border text-center transition-all ${
              selectedSignId === s.id
                ? 'bg-purple-500/25 border-purple-400 text-purple-100 shadow-lg scale-105'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <div className="text-lg font-bold" style={{ color: s.elementColor }}>
              {s.symbol}
            </div>
            <div className="text-[11px] font-medium mt-1 truncate">{s.name}</div>
          </button>
        ))}
      </div>

      {/* Main Style Showcase Card */}
      <div className="bg-[#12182c]/90 border border-purple-400/20 rounded-3xl p-6 lg:p-10 backdrop-blur-md shadow-2xl space-y-8">
        {/* Top Profile Intro & Editorial Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-6 border-b border-slate-800">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span
                className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-2xl font-bold shadow-inner"
                style={{ color: currentSign.elementColor }}
              >
                {currentSign.symbol}
              </span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-slate-100">
                  {profile.signName} Burcunun Estetik İmzası
                </h3>
                <p className="text-xs text-purple-300 font-medium">
                  {profile.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {profile.wardrobe.vibe}
            </p>

            {/* Signature Color Palette with HEX */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] uppercase tracking-wider text-purple-300 font-semibold flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" /> İmza Renk Paleti (Kopyalamak İçin Tıklayın)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {profile.palette.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCopyHex(color.hex)}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-purple-400/60 text-left transition-all group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="w-7 h-7 rounded-lg shadow-sm border border-white/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      {copiedHex === color.hex ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-500 group-hover:text-purple-300 opacity-60" />
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-200 truncate">
                      {color.name}
                    </div>
                    <div className="text-[10px] font-mono text-purple-300/80 mt-0.5">
                      {color.hex}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Luxury Editorial Image Banner */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-purple-400/30 aspect-[4/3] shadow-xl group">
            <img
              src="/assets/images/cosmic_style_beauty_1793491717788.jpg"
              alt="Astroloji ve Lüks Güzellik Editöryal İllüstrasyonu"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-cormorant italic text-purple-200">
                "Zarafet, ruhunun gökyüzündeki desenini yeryüzünde taşıma sanatıdır."
              </span>
            </div>
          </div>
        </div>

        {/* 3 Detail Columns: Wardrobe, Accessories, Beauty */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Wardrobe */}
          <div className="p-6 rounded-2xl bg-[#151c35] border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center">
              <Shirt className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-cinzel text-slate-100">
              Kapsül Gardırop & Kombin
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div>
                <strong className="text-purple-300 block mb-1">Anahtar Parçalar:</strong>
                <ul className="space-y-1">
                  {profile.wardrobe.keyItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-1 h-1 rounded-full bg-purple-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px]">
                <strong className="text-purple-300 block mb-0.5">Kumaş Dokuları:</strong>
                <span className="text-slate-400">{profile.wardrobe.fabrics}</span>
              </div>
            </div>
          </div>

          {/* Accessories & Stones */}
          <div className="p-6 rounded-2xl bg-[#151c35] border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-300 flex items-center justify-center">
              <Gem className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-cinzel text-slate-100">
              Takı, Doğal Taş & Aksesuar
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <strong className="text-amber-300 block mb-0.5">Uğurlu Doğal Taşlar:</strong>
                <span className="text-slate-200">{profile.accessories.stones}</span>
              </div>
              <div>
                <strong className="text-amber-300 block mb-0.5">Metal Uyumu:</strong>
                <span className="text-slate-200">{profile.accessories.metal}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px]">
                <strong className="text-amber-300 block mb-0.5">İmza Aksesuar:</strong>
                <span className="text-slate-400">{profile.accessories.signatureItem}</span>
              </div>
            </div>
          </div>

          {/* Beauty & Skincare */}
          <div className="p-6 rounded-2xl bg-[#151c35] border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-300 flex items-center justify-center">
              <Smile className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-cinzel text-slate-100">
              Kozmetik & Cilt Bakımı
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <strong className="text-rose-300 block mb-0.5">Makyaj Duruşu:</strong>
                <span className="text-slate-200">{profile.beauty.makeupStyle}</span>
              </div>
              <div>
                <strong className="text-rose-300 block mb-0.5">Dudak & Göz:</strong>
                <span className="text-slate-200">{profile.beauty.lipEye}</span>
              </div>
              <div>
                <strong className="text-rose-300 block mb-0.5">İmza Parfüm Notaları:</strong>
                <span className="text-slate-200">{profile.beauty.perfumeNotes}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px]">
                <strong className="text-rose-300 block mb-0.5">Cilt Bakım Ritüeli:</strong>
                <span className="text-slate-400">{profile.beauty.skincareRitual}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
