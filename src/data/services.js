import WebYazilimImage from "../assets/images/web-yazilim-Sedminadijital-com.webp";
import WebTasarimImage from "../assets/images/web-tasarim-Sedminadijital-com.webp";
import SeoImage from "../assets/images/seo-Sedminadijital-com.webp";
import SocialMediaManagementImage from "../assets/images/social-media-management-Sedminedijital-com.webp";
import DijitalPazarlamaImage from "../assets/images/dijital-pazarlama-Sedminadijital-com.webp";
import GrafikTasarimiImage from "../assets/images/grafik-tasarim-Sedminadijital-com.webp";

const servicesData = {
  sectionTitle: "Uzmanlıklarımız",
  sectionSubtitle: "YETENEKLER",
  services: [
    {
      id: "web-yazilim",
      title: "Web Yazılım",
      subtitle: "Geleceğin Dijital Altyapısını İnşa Edin",
      description:
        "Kurumsal web siteleri, e-ticaret platformları ve özel web uygulamaları geliştiriyoruz. Modern teknolojiler ve en iyi pratiklerle ölçeklenebilir dijital çözümler sunuyoruz.",
      image: WebYazilimImage,
      icon: "Globe",
      features: [
        "Kurumsal Web Siteleri",
        "E-Ticaret Platformları",
        "Headless CMS Çözümleri",
        "Performans Optimizasyonu",
      ],
      technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS"],
      detailDescription:
        "Web yazılımı, internet üzerinde çalışan uygulamaların geliştirilmesi ve yönetilmesiyle ilgilenen bir alandır. Bu tür yazılımlar, web siteleri, çevrimiçi mağazalar, sosyal medya platformları ve daha fazlasını içerebilir. Web yazılımı, internet üzerinde çalışan uygulamaların geliştirilmesi ve yönetilmesiyle ilgilenen bir alandır. Bu tür yazılımlar, web siteleri, çevrimiçi mağazalar, sosyal medya platformları ve daha fazlasını içerebilir.",
    },
    {
      id: "web-tasarim",
      title: "Web Tasarım",
      subtitle: "Estetik ve Fonksiyonelliği Birleştiriyoruz",
      description:
        "Kullanıcı deneyimini merkeze alan, modern ve mobil uyumlu arayüzler tasarlıyoruz. Markanızın ruhunu yansıtan özgün görsel dünyalar oluşturuyoruz.",
      image: WebTasarimImage,
      icon: "Layout",
      features: [
        "UI/UX Tasarımı",
        "Responsive (Mobil Uyumlu) Tasarım",
        "Etkileşimli Prototipleme",
        "Marka Kimliği Entegrasyonu",
        "Kullanılabilirlik Testleri",
        "Modern Tipografi ve Renk Teorisi",
      ],
      technologies: ["Google Analytics", "Hotjar", "SEMrush", "HubSpot"],
      detailDescription:
        "Web tasarım, internet üzerindeki görsel ve işlevsel bir web sitesinin oluşturulması sürecini ifade eder. Bu süreç, kullanıcıların bir web sitesini ziyaret ettiğinde karşılaştığı arayüzün tasarımını içerir. Web tasarımı, estetik açıdan çekici bir görünüm sunmanın yanı sıra kullanılabilirlik, erişilebilirlik ve performans gibi önemli faktörleri de içerir.",
    },
    {
      id: "seo",
      title: "SEO Arama Motoru Optimizasyonu",
      subtitle: "Arama Motorlarında Zirveye Yolculuk",
      description:
        "Arama motoru optimizasyonu (SEO), web sitelerinin arama motorlarında daha iyi görünürlüğünü artırmayı amaçlayan bir stratejik süreçtir. Bu süreç, web sitelerinin arama motorlarının indekslerinde daha iyi görünürlüğünü artırmayı amaçlar. SEO, web sitelerinin arama motorlarının indekslerinde daha iyi görünürlüğünü artırmayı amaçlar.",
      image: SeoImage,
      icon: "Search",
      features: [
        "Teknik SEO Analizi",
        "Anahtar Kelime Araştırması",
        "Rakip Analizi",
        "Site İçi (On-Page) Optimizasyon",
        "Backlink Stratejileri",
        "Düzenli Raporlama",
      ],
      technologies: [
        "Google Search Console",
        "Google Page Speed",
        "SEMrush",
        "Yoast SEO",
      ],
      detailDescription:
        "SEO (Search Engine Optimization), internet üzerindeki web sitelerinin organik (doğal) arama sonuçlarında daha üst sıralarda görünmesini sağlamak için kullanılan bir dizi teknik ve stratejiyi ifade eder. SEO, web sitenizin arama motorları tarafından daha iyi anlaşılmasını ve değerlendirilmesini amaçlar.",
    },
    {
      id: "sosyal-medya-yonetimi",
      title: "Sosyal Medya Yönetimi",
      subtitle: "Sosyal Medya Varlığınızı Güçlendirin",
      description:
        "Sosyal medya yönetimi, markanızın sosyal medya platformlarında daha iyi görünürlüğünü artırmayı amaçlayan bir stratejik süreçtir. Bu süreç, markanızın sosyal medya platformlarında daha iyi görünürlüğünü artırmayı amaçlar.",
      image: SocialMediaManagementImage,
      icon: "Share2",
      features: [
        "İçerik Planlama ve Üretimi",
        "Topluluk ve Yorum Yönetimi",
        "Influencer Pazarlama",
        "Kriz Yönetimi",
        "Trend Takibi",
        "Sosyal Medya Analitiği",
      ],
      technologies: [
        "Google Ads",
        "Meta Business Suite",
        "Ahrefs",
        "Mailchimp",
      ],
      detailDescription:
        "Sosyal Medya Yönetimi, işletmelerin veya bireylerin sosyal medya platformlarında etkili bir şekilde varlık göstermeleri ve çevrimiçi itibarlarını yönetmeleri için kullanılan bir stratejik süreçtir. Bu süreç, sosyal medya hesaplarının oluşturulmasını, içerik oluşturmayı, yayınlamayı, paylaşmayı ve etkileşimde bulunmayı içerir..",
    },
    {
      id: "dijital-pazarlama",
      title: "Dijital Pazarlama",
      subtitle: "Dijital Dünya’da Gücünüzü Kullanın",
      description:
        "Dijital pazarlama, ürün veya hizmetlerin çevrimiçi platformlarda tanıtılması, pazarlanması ve satılması sürecini ifade eder.",
      image: DijitalPazarlamaImage,
      icon: "TrendingUp",
      features: [
        "Logo ve Marka Kimliği",
        "Kurumsal Kimlik Tasarımı",
        "Sosyal Medya Görselleri",
        "Afiş ve Katalog Tasarımı",
        "İnfografik Tasarımı",
        "Vektörel Çizimler",
      ],
      technologies: [
        "Google Ads",
        "Meta Business Suite",
        "Ahrefs",
        "Mailchimp",
        "After Effects",
      ],
      detailDescription:
        "Grafik tasarım, görsel iletişim aracılığıyla bilgiyi iletmeyi amaçlayan bir sanat ve iletişim disiplinidir. Bu alanda çalışan profesyoneller, metin, görseller, renkler ve şekiller gibi çeşitli tasarım unsurlarını kullanarak afişler, logolar, broşürler, web siteleri, reklamlar ve daha fazlasını oluştururlar. Grafik tasarım, mesajların etkili bir şekilde iletilmesini, marka kimliğinin oluşturulmasını ve görsel estetiğin artırılmasını sağlar.",
    },
    {
      id: "grafik-tasarimi",
      title: "Grafik Tasarımı",
      subtitle: "Görsel Hikayeler Yaratıyoruz",
      description:
        "Grafik tasarım, markanızın görsel hikayesini yansıtan, etkileyici ve profesyonel bir şekilde sunan bir alandır. Bu alanda, markanızın kimliğini ve değerlerini yansıtan görsel hikayeler oluşturuyoruz.",
      image: GrafikTasarimiImage,
      icon: "PenTool",
      features: [
        "Logo ve Marka Kimliği",
        "Kurumsal Kimlik Tasarımı",
        "Sosyal Medya Görselleri",
        "Afiş ve Katalog Tasarımı",
        "İnfografik Tasarımı",
        "Vektörel Çizimler",
      ],
      technologies: [
        "Google Analytics 4",
        "BigQuery",
        "Tableau",
        "Python",
        "TensorFlow",
      ],
      detailDescription:
        "Verinin gücünü iş stratejinize entegre ediyoruz. Özel dashboard'lar ve raporlama sistemleri ile verilerinizi anlamlı içgörülere dönüştürüyor, AI destekli tahmine dayalı modelleme ile geleceğe yönelik kararlarınızı güçlendiriyoruz. Her veri noktasını değerlendirerek büyüme fırsatlarını belirliyor ve aksiyona dönüştürüyoruz.",
    },
  ],
};

export default servicesData;
