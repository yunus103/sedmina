import { defineType, defineField } from "sanity";

export default defineType({
  name: "anaSayfa",
  title: "Ana Sayfa",
  type: "document",
  icon: () => "🏠",
  groups: [
    { name: "hero", title: "Hero Bölümü", default: true },
    { name: "surec", title: "Süreç Bölümü" },
    { name: "bolumBasliklari", title: "Bölüm Başlıkları" },
    { name: "iletisim", title: "İletişim Bölümü" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Hero ──
    defineField({
      name: "heroArkaPlanGorsel",
      title: "Hero Arka Plan Görseli (Eski)",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description:
        "Eski sistemden kalan tekli görsel. Eğer aşağıya slayt eklemezseniz bu gösterilir.",
    }),
    defineField({
      name: "heroSlaytlar",
      title: "Hero Slayt Görselleri",
      type: "array",
      group: "hero",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Otomatik kayan slider için birden fazla görsel ekleyin.",
    }),
    defineField({
      name: "heroSlogan",
      title: "Hero Slogan",
      type: "text",
      rows: 3,
      group: "hero",
      description: "Ana sayfanın hero bölümünde görünecek slogan metni.",
    }),
    defineField({
      name: "heroCtaYazi",
      title: "Hero Buton Yazısı",
      type: "string",
      group: "hero",
      description:
        "Hero bölümündeki aksiyon butonunun yazısı (ör: PROJE BAŞLAT).",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero Buton Linki",
      type: "string",
      group: "hero",
      description: "Hero butonuna tıklanınca gidilecek sayfa (ör: /iletisim).",
    }),

    // ── Süreç ──
    defineField({
      name: "surecBaslik",
      title: "Süreç Bölüm Başlığı",
      type: "string",
      group: "surec",
      description: "Süreç bölümünün ana başlığı (ör: Bizim Sürecimiz).",
    }),
    defineField({
      name: "surecAdimlari",
      title: "Süreç Adımları",
      type: "array",
      group: "surec",
      of: [{ type: "surecAdimi" }],
      description: "Sürecin her adımını buraya ekleyin. Önerilen: 3 adım.",
    }),
    defineField({
      name: "surecCtaYazi",
      title: "Süreç CTA Yazısı",
      type: "string",
      group: "surec",
      description: "Süreç bölümünün altındaki buton yazısı (ör: Bizi Tanıyın).",
    }),

    // ── Bölüm Başlıkları ──
    defineField({
      name: "hizmetlerBaslik",
      title: "Hizmetler Bölüm Başlığı",
      type: "string",
      group: "bolumBasliklari",
      description: "Ana sayfadaki Hizmetler bölümünün başlığı.",
    }),
    defineField({
      name: "hizmetlerAltBaslik",
      title: "Hizmetler Alt Başlık",
      type: "string",
      group: "bolumBasliklari",
      description: "Hizmetler bölümünün üst etiket yazısı (ör: YETENEKLER).",
    }),
    defineField({
      name: "referanslarBaslik",
      title: "Referanslar Bölüm Başlığı",
      type: "string",
      group: "bolumBasliklari",
      description: "Referanslar/partnerler slider bölümünün başlığı.",
    }),
    defineField({
      name: "projelerBaslik",
      title: "Projeler Bölüm Başlığı",
      type: "string",
      group: "bolumBasliklari",
      description: "Projeler bölümünün başlığı.",
    }),
    defineField({
      name: "projelerAltBaslik",
      title: "Projeler Alt Başlık",
      type: "string",
      group: "bolumBasliklari",
    }),
    defineField({
      name: "projelerTumunuGorYazi",
      title: "Projeler 'Tümünü Gör' Yazısı",
      type: "string",
      group: "bolumBasliklari",
      description: "Projeler bölümündeki tümünü gör butonu yazısı.",
    }),
    defineField({
      name: "blogBaslik",
      title: "Blog Bölüm Başlığı",
      type: "string",
      group: "bolumBasliklari",
    }),
    defineField({
      name: "blogAltBaslik",
      title: "Blog Alt Başlık",
      type: "string",
      group: "bolumBasliklari",
    }),
    defineField({
      name: "blogTumunuGorYazi",
      title: "Blog 'Tümünü Gör' Yazısı",
      type: "string",
      group: "bolumBasliklari",
    }),

    // ── İletişim ──
    defineField({
      name: "iletisimBaslik",
      title: "İletişim Bölüm Başlığı",
      type: "text",
      rows: 2,
      group: "iletisim",
      description:
        "Ana sayfadaki iletişim bölümünün başlığı (HTML desteklemez).",
    }),
    defineField({
      name: "iletisimAltYazi",
      title: "İletişim Alt Yazı",
      type: "text",
      rows: 3,
      group: "iletisim",
      description: "İletişim bölümünün açıklama metni.",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "Sayfa SEO",
      type: "seo",
      group: "seo",
      description: "Ana sayfa için SEO ayarları.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Ana Sayfa" };
    },
  },
});
