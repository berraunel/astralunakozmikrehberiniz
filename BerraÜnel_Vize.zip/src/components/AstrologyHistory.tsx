import React, { useState } from 'react';
import {
  Scroll,
  BookOpen,
  Sparkles,
  Feather,
  Clock,
  Lightbulb,
  Compass,
  Star,
  Shield,
  Layers,
  ChevronRight,
  Flame,
  Droplets,
  Wind,
  Mountain,
} from 'lucide-react';

export const AstrologyHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'origins' | 'myths' | 'evolution' | 'purpose'>('origins');

  const chronologicalEpochs = [
    {
      period: 'M.Ö. 3000 - 500',
      civilization: 'Mezopotamya, Sümer & Babil',
      title: 'Zodyakın ve Gök Günlüklerinin Doğuşu',
      summary:
        'Fırat ve Dicle kıyısındaki zigguratlardan gök kubbeyi izleyen Babil rahipleri, Güneşin yıllık rotasını 12 eşit 30 derecelik dilime bölerek Zodyakı (Gök Çarkını) kurdu. İlk gök tabletleri (Enuma Anu Enlil) ile tutulmalar ve mevsimler kaydedildi.',
      badge: 'İlk Gözlemler',
      icon: '🏛️',
    },
    {
      period: 'M.Ö. 2000 - 300',
      civilization: 'Antik Mısır & Dendera Tapınağı',
      title: 'Sirius Yıldızı, Nil Taşkınları ve Dekanlar',
      summary:
        'Sirius (Sothis) yıldızının doğuşuyla Nil Nehrinin bereketi arasındaki bağlantıyı çözen Mısırlılar, gökyüzünü 10\'ar derecelik 36 dekana ayırdı. Dendera Tapınağı tavanındaki dairesel kabartma, tarihin ilk tam zodyak tavan haritası kabul edilir.',
      badge: 'Mistik Geometri',
      icon: '📐',
    },
    {
      period: 'M.Ö. 300 - M.S. 200',
      civilization: 'Helenistik İskenderiye & Yunan',
      title: 'Horoskopos: Bireysel Doğum Haritasının İcadı',
      summary:
        'Yunan felsefesiyle Babil astronomisi İskenderiye\'de sentezlendi. Doğum anında doğu ufkunda yükselen dereceye "Horoskopos" (saati gözetleyen) adı verildi ve 12 Ev sistemi icat edildi. Claudius Ptolemy (Batlamyus) Tetrabiblos eseriyle bu sistemi kurumsallaştırdı.',
      badge: 'Matematiksel Dönüm',
      icon: '📜',
    },
    {
      period: 'M.S. 800 - 1300',
      civilization: 'İslam Dünyasının Altın Çağı',
      title: 'Usturlaplar, Trigonometri ve Efemeris Devrimi',
      summary:
        'Bağdat Beyt\'ül Hikme\'de El-Kindi, Ebu Ma\'şer el-Belhi, El-Biruni ve El-Battani; küresel trigonometriyle gezegen koordinatlarını dakikası dakikasına hesapladı. Arap Noktaları (Pars Fortuna) ve karmaşık transit döngüleri bu çağda doruğa ulaştı.',
      badge: 'İlim & Hassasiyet',
      icon: '🧭',
    },
    {
      period: '15. - 17. Yüzyıl',
      civilization: 'Rönesans & Bilimsel Aydınlanma',
      title: 'Kepler, Galileo ve Astronominin Ayrılışı',
      summary:
        'Johannes Kepler ve Galileo Galilei saray astrologları olarak gök mekaniği yasalarını keşfetti. Teleskobun icadıyla astronomi gök cisimlerinin fiziksel yapısını, astroloji ise gökyüzünün insan bilincine sembolik yansımasını inceleyen iki ayrı yola evrildi.',
      badge: 'Gök Yasaları',
      icon: '🔭',
    },
    {
      period: '20. Yüzyıl - Günümüz',
      civilization: 'Modern Psikolojik Astroloji',
      title: 'Carl Gustav Jung ve Arketipsel Bilinç',
      summary:
        'Psikiyatr Carl Gustav Jung, astrolojiyi antik çağın en zengin derinlik psikolojisi sistemi olarak niteledi. Kehanet aracı olmaktan çıkarıp "içsel gölge yönler", "eşzamanlılık (synchronicity)" ve insan potansiyelini anlama pusulasına dönüştürdü.',
      badge: 'İçsel Dönüşüm',
      icon: '✨',
    },
  ];

  const mythicOrigins = [
    {
      sign: 'Koç (Aries)',
      dates: '21 Mart - 19 Nisan',
      element: 'Ateş',
      mythName: 'Chrysomallos ve Altın Post Efsanesi',
      story:
        'Yunan mitolojisinde bulut tanrıçası Nephele\'nin çocukları Frixos ve Helle\'yi zalim üvey annelerinden kurtarmak için gönderilen kanatlı, altın yünlü koç. Güneşin ilkbahar ekinoksunda doğayı uyandırması, Koç burcunu yeni başlangıçların, cesaretin ve öncülüğün ebedi sembolü yapmıştır.',
      symbolOrigin: 'Koçun boynuzlarını ve topraktan fışkıran ilk filizleri simgeler.',
    },
    {
      sign: 'Boğa (Taurus)',
      dates: '20 Nisan - 20 Mayıs',
      element: 'Toprak',
      mythName: 'Zeus ve Prenses Europa Kaçırılışı',
      story:
        'Zeus, Fenikeli güzel prenses Europa\'yı büyülemek için kar beyazı, uysal ve görkemli bir boğaya dönüşür. Europa boğanın sırtına bindiğinde denizleri aşarak Girit adasına ulaşırlar. Toprağın sarsılmaz bereketini, bedensel zevkleri ve sadakati temsil eder.',
      symbolOrigin: 'Boğa başı ve hilal şeklindeki boynuzlarını gösterir.',
    },
    {
      sign: 'İkizler (Gemini)',
      dates: '21 Mayıs - 20 Haziran',
      element: 'Hava',
      mythName: 'Kastor ve Polluks (Dioskur Kardeşler)',
      story:
        'Sparta kraliçesi Leda\'nın ikiz oğulları: Kastor ölümlü bir savaşçı, Polluks ise Zeus\'un ölümsüz oğludur. Kastor savaşta ölünce Polluks ölümsüzlüğünü kardeşiyle paylaşmak ister. Zeus onları gökyüzünde ayrılmaz iki parlak yıldız olarak zodyaka yerleştirir. Zihinsel merakı, dualiteyi ve iletişimi simgeler.',
      symbolOrigin: 'Roma rakamı II (2) ve zihnin ikili doğasını simgeler.',
    },
    {
      sign: 'Yengeç (Cancer)',
      dates: '21 Haziran - 22 Temmuz',
      element: 'Su',
      mythName: 'Karkinos ve Herakles\'in Savaşı',
      story:
        'Herakles çok başlı Lerna canavarı Hydra ile savaşırken, tanrıça Hera kahramanın dikkatini dağıtmak için bataklıktan dev bir yengeç (Karkinos) yollar. Yengeç Herakles\'in ayağını kıskaçlar. Hera onun cesaretini ödüllendirmek için gökyüzüne taşır. Koruyucu kabuk, anne şefkati ve anılara bağlılığı temsil eder.',
      symbolOrigin: 'Yengeç kıskaçlarını ve anne memesini/besleyiciliği betimler.',
    },
    {
      sign: 'Aslan (Leo)',
      dates: '23 Temmuz - 22 Ağustos',
      element: 'Ateş',
      mythName: 'Nemea Aslanı Efsanesi',
      story:
        'Herakles\'in 12 zorlu görevinin ilki: Hiçbir kılıcın ve okun delemediği altın zırh gibi postu olan canavar Nemea Aslanı\'nı alt etmek. Herakles aslanı çıplak elleriyle boğar ve postunu zırh yapar. Güneşin en yakıcı olduğu yaz zirvesini, kalbin cesaretini ve asil liderliği yansıtır.',
      symbolOrigin: 'Aslanın yelesini, kuyruğunu ve kalpten taşan taç çizgisini simgeler.',
    },
    {
      sign: 'Başak (Virgo)',
      dates: '23 Ağustos - 22 Eylül',
      element: 'Toprak',
      mythName: 'Astraea (Adalet ve Saflık Tanrıçası) & Demeter',
      story:
        'İnsanlığın Altın Çağı sona erip kötülük yeryüzünü sarınca dünyayı en son terk eden masumiyet tanrıçası Astraea\'dır. Elinde bir başak tutarak göğe yükselmiştir. Aynı zamanda tarım tanrıçası Demeter\'in kızı Persephone için yeryüzünü bereketlendirdiği hasat döngüsünü temsil eder. Detaycılık, arınma ve hizmeti simgeler.',
      symbolOrigin: 'Bakirenin saç örgüsünü veya elinde tuttuğu buğday başağını simgeler.',
    },
    {
      sign: 'Terazi (Libra)',
      dates: '23 Eylül - 22 Ekim',
      element: 'Hava',
      mythName: 'Themis ve Adaletin Altın Dengesi',
      story:
        'Zodyaktaki 12 burç arasında canlı bir canlı veya insan figürü olmayan tek semboldür. İlahi adalet tanrıçası Themis\'in terazisidir. Gece ile gündüzün eşitlendiği sonbahar ekinoksuna denk gelir. Hakkaniyet, diplomasi, estetik harmoni ve ilişkilerde adil denge kurmayı anlatır.',
      symbolOrigin: 'Güneşin ufukta batışını ve kefeli denge terazisini betimler.',
    },
    {
      sign: 'Akrep (Scorpio)',
      dates: '23 Ekim - 21 Kasım',
      element: 'Su',
      mythName: 'Orion ve Ölümsüz Akrebin Düellosu',
      story:
        'Dünyadaki tüm canlıları avlayabileceğini söyleyerek kibirlenen dev avcı Orion\'a ceza olarak Toprak Ana Gaia yerin altından zehirli bir akrep çıkartır. Akrep Orion\'u tek bir iğneyle devirir. Bu nedenle gökyüzünde Akrep doğduğunda, Orion takım yıldızı kaçarak ufukta batar. Dönüşüm, krizlerden doğan güç ve gizli sırlar.',
      symbolOrigin: 'Akrebin zehirli kuyruk iğnesini ve gizli kundalini enerjisini gösterir.',
    },
    {
      sign: 'Yay (Sagittarius)',
      dates: '22 Kasım - 21 Aralık',
      element: 'Ateş',
      mythName: 'Bilge Kentaur Hiron (Chiron) ve Krotos',
      story:
        'Vahşi kentaurların aksine felsefe, müzik, tıp ve astronomide usta olan yarı insan yarı at bilge Hiron. Göğe çevrilmiş yayı ve oku, hayvani dürtülerden ilahi bilgeliğe, felsefeye ve yüksek maneviyata uzanan insanın tekamül yolculuğunu simgeler.',
      symbolOrigin: 'Göğe doğrultulmuş ve ufukları aşan hedef okunu simgeler.',
    },
    {
      sign: 'Oğlak (Capricorn)',
      dates: '22 Aralık - 19 Ocak',
      element: 'Toprak',
      mythName: 'Pan\'ın Dönüşümü ve Deniz-Keçisi (Pricus)',
      story:
        'Korkunç yüz başlı canavar Typhon tanrılara saldırdığında kır tanrısı Pan kurtulmak için Nil Nehrine atlar. Suyun üstünde kalan kısmı keçi, suyun altında kalan kısmı ise balık kuyruğuna dönüşür. Dağların en sarp zirvelerine tırmanan keçi ile okyanusun en derin sularına inen balığın birleşimidir; sabır, zaman ve kalıcı başarı.',
      symbolOrigin: 'Keçi boynuzları ile kıvrılan deniz-balığı kuyruğunun birleşimidir.',
    },
    {
      sign: 'Kova (Aquarius)',
      dates: '20 Ocak - 18 Şubat',
      element: 'Hava',
      mythName: 'Ganymedes ve Göksel Bilgi Testisi',
      story:
        'Truva\'nın altın saçlı prensi Ganymedes, Zeus tarafından bir kartalla Olimpos Dağı\'na taşınır ve tanrılara ölümsüzlük nektarı (ambrosia) döken saki yapılır. Kova burcunun döktüğü şey su değil; insanlığın zihnini aydınlatan evrensel bilinç, özgürlük ve kolektif ilham dalgalarıdır.',
      symbolOrigin: 'Elektrik, frekans dalgaları ve gökten dökülen bilgi akışını betimler.',
    },
    {
      sign: 'Balık (Pisces)',
      dates: '19 Şubat - 20 Mart',
      element: 'Su',
      mythName: 'Afrodit ve Eros\'un Balığa Dönüşümü',
      story:
        'Canavar Typhon saldırdığında aşk tanrıçası Afrodit ve oğlu Eros kaçmak için Fırat Nehri\'ne atlar ve iki balığa dönüşürler. Akıntıda birbirlerini kaybetmemek için kuyruklarını altın bir iple bağlarlar. Zodyakın son burcu olarak evrensel sevgi, koşulsuz fedakarlık, mistik birlik ve rüyaların okyanusunu simgeler.',
      symbolOrigin: 'Ortadan kutsal bir kordonla bağlı zıt yönlere yüzen iki balığı simgeler.',
    },
  ];

  return (
    <section id="history" className="w-full space-y-12">
      {/* Main Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-6 border-b border-purple-500/20">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
            <Scroll className="w-3.5 h-3.5" /> Antik Babil'den Modern Psikolojiye
          </span>
          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-amber-100 mt-1">
            Mitoloji, Burçlar ve Astroloji Nasıl Doğdu ve Gelişti?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
            İnsanlığın gökyüzüne çevirdiği ilk bakıştan, takımyıldızlara verilen mitolojik kahraman isimlerine ve kuantum psikolojisinin arketiplerine uzanan 5000 yıllık kozmik serüven.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-purple-500/20 rounded-xl">
          <button
            onClick={() => setActiveTab('origins')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'origins'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Nasıl Doğdu?
          </button>
          <button
            onClick={() => setActiveTab('myths')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'myths'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            12 Burcun Mitolojisi
          </button>
          <button
            onClick={() => setActiveTab('evolution')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'evolution'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Tarihsel Çağlar
          </button>
          <button
            onClick={() => setActiveTab('purpose')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'purpose'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Ne İşe Yarar?
          </button>
        </div>
      </div>

      {/* Feature Narrative Banner with Babylon Image */}
      <div className="bg-[#0b1022] border border-amber-500/25 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
            <Feather className="w-3.5 h-3.5" /> Kadim Kökenler & Hakikat
          </div>
          <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-slate-100 leading-snug">
            Gökyüzü: İnsanlığın İlk Saati, Pusulası ve Masal Kitabı
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Astroloji bir inanç veya fal değildir. İlk insanların gece gökyüzüne bakıp mevsimlerin değişimini, Nil nehrinin taşkınlarını, tohum ekme ve hasat zamanlarını yıldızların döngüsüyle ilişkilendirmesiyle başlayan, <strong>astronominin anası</strong> sayılan gözlemsel bir dildir.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Eski Babil zigguratlarında başlayan bu gözlem, Mısır tapınaklarında geometrik kutsallığa büründü; Antik Yunan’da mitolojik arketiplerle, İslam dünyasında ise yüksek matematikle birleşerek bugün bildiğimiz 12 Burç ve 12 Ev mimarisini oluşturdu.
          </p>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 block">Zamanın Kalitesi (Kairos):</strong>
                <span className="text-slate-400 text-[11px]">
                  Saatler niceliği (kaç saat geçtiğini), astroloji ise niteliği (o anın ruhunu ve potansiyelini) ölçer.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 block">Eşzamanlılık (Synchronicity):</strong>
                <span className="text-slate-400 text-[11px]">
                  Gezegenler neden değil; gökteki dev bir saatin akrep ve yelkovanı gibi yeryüzündeki ritmi yansıtır.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 h-full min-h-[320px] relative">
          <img
            src="/assets/images/history_babylon_astrology_1793490861881.jpg"
            alt="Babil Gözlemcileri ve Antik Gök Atlası"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0b1022] via-transparent to-transparent" />
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm border border-amber-500/30 px-3 py-1.5 rounded-lg text-[10px] text-amber-200">
            Babil Zigguratlarında İlk Zodyak Gözlemleri
          </div>
        </div>
      </div>

      {/* TAB 1: HOW ASTROLOGY WAS BORN DEEP DIVE */}
      {activeTab === 'origins' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0d1326]/90 border border-purple-500/20 hover:border-amber-400/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-cinzel text-amber-200">
                1. Zodyak Nedir ve Neden 12 Parçadır?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Zodyak" sözcüğü Antik Yunanca <em>zōdiakos kyklos</em> ("küçük hayvanlar dairesi" veya "canlı yaratıklar kuşağı") kökünden gelir. Güneş'in yıl boyunca gökyüzünde çizdiği 360 derecelik görünür yörüngeye <strong>Ekliptik</strong> denir.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ay, bir Güneş yılı içinde yaklaşık 12 kez dolunay evresine ulaştığı için Babilliler bu 360 derecelik kuşağı 30'ar derecelik 12 eşit parçaya böldüler. Her 30 derece, mevsimlerin bir aşamasına ve o yöndeki yıldız kümesine denk geldi.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d1326]/90 border border-purple-500/20 hover:border-amber-400/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-cinzel text-purple-200">
                2. Mitolojik Hikayeler Göğe Nasıl Kazındı?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Yazının olmadığı çağlarda insan hafızası bilgiyi masallar ve mitlerle saklardı. Çobanlar, denizciler ve çiftçiler gece gökyüzünü karanlıkta kaybolmamak için bir hafıza sarayına çevirdiler.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rastgele dizilmiş gibi görünen yıldız noktaları çizgilerle birleştirildi ve toplumun en saygı duyduğu tanrılar, kahramanlık destanları (Herakles, Zeus, Afrodit) ve kutsal hayvanlar gökyüzünün 12 burcuna nakşedildi.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d1326]/90 border border-purple-500/20 hover:border-amber-400/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-cinzel text-sky-200">
                3. Bireysel Doğum Haritasının İcadı
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                M.Ö. 5. yüzyıla kadar astroloji yalnızca krallar, imparatorluklar ve büyük hasat döngüleri için kullanılıyordu. İskenderiye kütüphanesinde gerçekleşen felsefi devrimle astroloji halka indi.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bir bebeğin ilk nefesi aldığı dakikada doğu ufkunda yükselen burç (Ascendant / Yükselen) hesaplanarak "Kişiye Özel Doğum Haritası" (Natal Chart) doğdu. Her insanın gökyüzünün benzersiz bir parmak izi olduğu keşfedildi.
              </p>
            </div>
          </div>

          {/* Quick interactive call to see myths */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-200">
            <span>
              ✦ 12 burcun her birinin hangi antik efsaneden ve tanrısal olaydan adını aldığını okumak ister misiniz?
            </span>
            <button
              onClick={() => setActiveTab('myths')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            >
              12 Burcun Efsanelerini Oku <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: 12 BURCUN MİTOLOJİSİ VE İSİMLENDİRİLME HİKAYESİ */}
      {activeTab === 'myths' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Yıldızlardan Efsanelere
            </span>
            <h3 className="text-2xl font-cinzel font-bold text-slate-100">
              12 Burç İsimlerini ve Sembollerini Nereden Aldı?
            </h3>
            <p className="text-xs text-slate-400">
              Her burcun sembolü tesadüfi bir çizim değil; Antik Yunan ve Mezopotamya mitolojisinde kahramanların, tanrıların ve doğa olaylarının göğe nakşedilmiş hikayesidir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mythicOrigins.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0c1122]/90 border border-slate-800 hover:border-amber-400/30 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {m.sign}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        m.element === 'Ateş'
                          ? 'bg-orange-500/15 text-orange-300 border border-orange-500/30'
                          : m.element === 'Toprak'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : m.element === 'Hava'
                          ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                          : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                      }`}
                    >
                      {m.element === 'Ateş' && <Flame className="w-2.5 h-2.5" />}
                      {m.element === 'Toprak' && <Mountain className="w-2.5 h-2.5" />}
                      {m.element === 'Hava' && <Wind className="w-2.5 h-2.5" />}
                      {m.element === 'Su' && <Droplets className="w-2.5 h-2.5" />}
                      {m.element} · {m.dates}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold font-cinzel text-slate-100 group-hover:text-amber-200 transition-colors">
                    {m.mythName}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {m.story}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-amber-300/80">
                  <strong className="text-amber-400 block font-semibold">Sembolünün Sırrı:</strong>
                  <span>{m.symbolOrigin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 6 CHRONOLOGICAL EPOCHS */}
      {activeTab === 'evolution' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Tarih Şeridi
            </span>
            <h3 className="text-2xl font-cinzel font-bold text-slate-100">
              Astrolojinin 5000 Yıllık Gelişim Basamakları
            </h3>
            <p className="text-xs text-slate-400">
              Babil zigguratlarından İskenderiye kütüphanesine, Bağdat Beyt'ül Hikme'sinden modern psikiyatriye evrilen bilimsel ve felsefi yolculuk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chronologicalEpochs.map((ep, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0d1326]/80 border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-400/10">
                      {ep.period}
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <span>{ep.icon}</span> {ep.badge}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {ep.civilization}
                  </div>

                  <h4 className="text-base font-bold font-cinzel text-slate-100 group-hover:text-amber-200 transition-colors">
                    {ep.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ep.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PURPOSE & PSYCHOLOGY */}
      {activeTab === 'purpose' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a0f20] to-[#04060d] border border-amber-500/25 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-cinzel text-amber-200 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              Günümüzde Astroloji Ne Amaçla Kullanılır?
            </h3>
            <p className="text-xs text-slate-400">
              Modern dünyada astroloji, kaderci bir kehanet oyunu değil; kişinin kendi bilinçaltını, güçlü yeteneklerini ve ilişkilerdeki dinamiklerini anlaması için bir <strong>farkındalık aynası</strong>dır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs text-slate-300">
            <div className="space-y-3 p-5 rounded-xl bg-slate-950/60 border border-red-500/20">
              <h4 className="text-sm font-bold text-red-400 flex items-center gap-1.5">
                ✕ Astroloji Ne Değildir?
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong>Geleceği bildiren fal değildir:</strong> İnsan iradesi, seçimleri ve bilinç düzeyi haritanın nasıl yaşanacağını belirler.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong>Mazeret aracı değildir:</strong> "Ben Akrebim o yüzden intikamcıyım" gibi olumsuz alışkanlıkları meşrulaştırmaz.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong>Kaderci bir pranga değildir:</strong> Harita rüzgarların yönünü gösterir; yelkeni nereye çevireceğiniz sizin iradenizdedir.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 p-5 rounded-xl bg-slate-950/60 border border-emerald-500/20">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                ✓ Astroloji Gerçekte Ne İşe Yarar?
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  <span><strong>Kendini Tanıma & Kabul:</strong> Doğuştan gelen güçlü yeteneklerini, duygusal ihtiyaçlarını ve gölge yanlarını nesnel olarak görmeni sağlar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  <span><strong>Zamanın Ritmine Uyum:</strong> Hangi dönemde atağa geçip risk alacağını, hangi dönemde içe dönüp güç toplayacağını fısıldar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  <span><strong>İlişkilerde Derin Empati:</strong> Partnerinin veya sevdiklerinin dünyayı senin gözünle görmek zorunda olmadığını, onların enerjisini anlamayı kolaylaştırır.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
