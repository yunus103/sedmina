import { defineType, defineField } from "sanity";

export default defineType({
  name: "proje",
  title: "Proje",
  type: "document",
  icon: () => "📁",
  fields: [
    defineField({
      name: "baslik",
      title: "Proje Adı",
      type: "string",
      description: "Projenin adı.",
      validation: (Rule) => Rule.required().error("Proje adı zorunludur."),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "baslik", maxLength: 96 },
      description: "Proje sayfasının URL'si.",
      validation: (Rule) => Rule.required().error("Slug zorunludur."),
    }),
    defineField({
      name: "kategoriler",
      title: "Kategoriler",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Proje kategorileri (ör: Web Geliştirme, Kurumsal, E-Ticaret).",
    }),
    defineField({
      name: "yil",
      title: "Yıl",
      type: "string",
      description: "Projenin tamamlandığı yıl.",
    }),
    defineField({
      name: "gorsel",
      title: "Ana Görsel",
      type: "image",
      options: { hotspot: true },
      description:
        "Proje kartında ve detay sayfasında gösterilecek ana görsel.",
    }),
    defineField({
      name: "aciklama",
      title: "Kısa Açıklama",
      type: "text",
      rows: 3,
      description: "Projenin kısa tanımı. Kart ve listelerde görünür.",
    }),
    defineField({
      name: "detayliAciklama",
      title: "Detaylı Açıklama",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Başlık 2", value: "h2" },
            { title: "Başlık 3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Kalın", value: "strong" },
              { title: "İtalik", value: "em" },
            ],
          },
        },
      ],
      description: "Proje detay sayfasındaki uzun açıklama.",
    }),
    defineField({
      name: "oneChikarilsin",
      title: "Öne Çıkar",
      type: "boolean",
      description:
        "Aktifse, bu proje ana sayfada öne çıkan projeler arasında gösterilir.",
      initialValue: false,
    }),
    defineField({
      name: "musteri",
      title: "Müşteri",
      type: "string",
      description: "Projenin yapıldığı müşteri/firma adı.",
    }),
    defineField({
      name: "sure",
      title: "Proje Süresi",
      type: "string",
      description: "Projenin toplam süresi (ör: 3 Ay, 6 Hafta).",
    }),
    defineField({
      name: "hizmetler",
      title: "Kullanılan Hizmetler",
      type: "array",
      of: [{ type: "string" }],
      description: "Bu projede sunulan hizmetler (ör: Web Tasarım, SEO).",
    }),
    defineField({
      name: "sonuclar",
      title: "Sonuçlar",
      type: "array",
      of: [{ type: "projeSonucu" }],
      description: "Projenin ölçülebilir sonuçları.",
    }),
    defineField({
      name: "galeri",
      title: "Galeri",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      description: "Proje görselleri galerisi.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "Bu proje sayfası için SEO ayarları.",
    }),
  ],
  preview: {
    select: { title: "baslik", subtitle: "musteri", media: "gorsel" },
  },
});
