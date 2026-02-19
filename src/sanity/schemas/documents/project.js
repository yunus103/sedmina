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
      name: "hizmetler",
      title: "Verilen Hizmetler",
      type: "array",
      of: [{ type: "reference", to: [{ type: "hizmet" }] }],
      description: "Bu projede sunulan hizmetleri seçin.",
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
