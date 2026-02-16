import { defineType, defineField } from "sanity";

export default defineType({
  name: "hakkimizdaSayfasi",
  title: "Hakkımızda Sayfası",
  type: "document",
  icon: () => "👥",
  groups: [
    { name: "hero", title: "Üst Bölüm", default: true },
    { name: "istatistikler", title: "İstatistikler" },
    { name: "degerler", title: "Değerlerimiz" },
    { name: "zamanCizelgesi", title: "Zaman Çizelgesi" },
    { name: "ctaBolum", title: "Alt CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Üst Bölüm (Hero) ──
    defineField({
      name: "ustBaslik",
      title: "Üst Etiket",
      type: "string",
      group: "hero",
      description: "Sayfa üstündeki küçük etiket (ör: HAKKIMIZDA).",
    }),
    defineField({
      name: "baslik",
      title: "Ana Başlık",
      type: "text",
      rows: 2,
      group: "hero",
      description: "Sayfanın ana başlığı.",
      validation: (Rule) => Rule.required().error("Başlık zorunludur."),
    }),
    defineField({
      name: "icerik",
      title: "Hakkımızda İçeriği",
      type: "array",
      group: "hero",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Başlık 2", value: "h2" },
            { title: "Başlık 3", value: "h3" },
            { title: "Alıntı", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Kalın", value: "strong" },
              { title: "İtalik", value: "em" },
            ],
          },
        },
      ],
      description:
        "Hakkımızda ana metni. SEO için uzun ve detaylı yazabilirsiniz. Zengin metin editörü kullanabilirsiniz.",
    }),
    defineField({
      name: "gorsel",
      title: "Ana Görsel",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description: "Hakkımızda bölümünde gösterilecek ana görsel.",
    }),
    defineField({
      name: "ctaYazi",
      title: "CTA Buton Yazısı",
      type: "string",
      group: "hero",
      description: "Buton yazısı (ör: Birlikte Çalışalım).",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Buton Linki",
      type: "string",
      group: "hero",
      description: "Butona tıklanınca gidilecek sayfa (ör: /iletisim).",
    }),

    // ── İstatistikler ──
    defineField({
      name: "istatistikler",
      title: "İstatistikler",
      type: "array",
      group: "istatistikler",
      of: [{ type: "istatistik" }],
      description:
        "Şirket istatistikleri (ör: 50+ Proje, 30+ Müşteri). 4 adet önerilir.",
    }),

    // ── Değerlerimiz ──
    defineField({
      name: "degerlerBaslik",
      title: "Değerler Bölüm Başlığı",
      type: "string",
      group: "degerler",
      description:
        "Değerler bölümünün alt başlığı (ör: Bizi biz yapan ilkeler.).",
    }),
    defineField({
      name: "degerlerAltBaslik",
      title: "Değerler Üst Etiket",
      type: "string",
      group: "degerler",
      description: "Değerler bölümünün üst etiketi (ör: DEĞERLERİMİZ).",
    }),
    defineField({
      name: "degerler",
      title: "Değerlerimiz",
      type: "array",
      group: "degerler",
      of: [{ type: "deger" }],
      description: "Şirketin temel değerleri. 6 adet önerilir.",
    }),

    // ── Zaman Çizelgesi ──
    defineField({
      name: "zamanCizelgesiBaslik",
      title: "Zaman Çizelgesi Başlık",
      type: "string",
      group: "zamanCizelgesi",
      description:
        "Zaman çizelgesi bölümünün alt başlığı (ör: Nasıl buraya geldik.).",
    }),
    defineField({
      name: "zamanCizelgesiAltBaslik",
      title: "Zaman Çizelgesi Üst Etiket",
      type: "string",
      group: "zamanCizelgesi",
      description: "Üst etiket (ör: YOLCULUĞUMUZ).",
    }),
    defineField({
      name: "zamanCizelgesi",
      title: "Zaman Çizelgesi",
      type: "array",
      group: "zamanCizelgesi",
      of: [{ type: "zamanCizelgesiOgesi" }],
      description: "Şirketin yıllara göre önemli dönüm noktaları.",
    }),

    // ── Alt CTA ──
    defineField({
      name: "ctaBolumBaslik",
      title: "Alt CTA Başlık",
      type: "string",
      group: "ctaBolum",
      description: "Sayfanın altındaki CTA bölümünün başlığı.",
    }),
    defineField({
      name: "ctaBolumAciklama",
      title: "Alt CTA Açıklama",
      type: "text",
      rows: 2,
      group: "ctaBolum",
      description: "CTA bölümünün açıklama metni.",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "Sayfa SEO",
      type: "seo",
      group: "seo",
      description: "Hakkımızda sayfası için SEO ayarları.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hakkımızda Sayfası" };
    },
  },
});
