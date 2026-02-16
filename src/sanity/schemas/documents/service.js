import { defineType, defineField } from "sanity";

export default defineType({
  name: "hizmet",
  title: "Hizmet",
  type: "document",
  icon: () => "🛠️",
  fields: [
    defineField({
      name: "baslik",
      title: "Hizmet Adı",
      type: "string",
      description: "Hizmetin adı (ör: Web Yazılım, Web Tasarım).",
      validation: (Rule) => Rule.required().error("Hizmet adı zorunludur."),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "baslik", maxLength: 96 },
      description: "Hizmet sayfasının URL'si. Başlıktan otomatik oluşturulur.",
      validation: (Rule) => Rule.required().error("Slug zorunludur."),
    }),
    defineField({
      name: "altBaslik",
      title: "Alt Başlık",
      type: "string",
      description:
        "Hizmetin kısa alt başlığı (ör: Geleceğin Dijital Altyapısını İnşa Edin).",
    }),
    defineField({
      name: "aciklama",
      title: "Kısa Açıklama",
      type: "text",
      rows: 3,
      description: "Hizmetin kısa tanımı. Kart ve listelerde görünür.",
      validation: (Rule) => Rule.required().error("Açıklama zorunludur."),
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
        "Hizmet detay sayfasında gösterilecek uzun açıklama. Zengin metin editörü kullanabilirsiniz.",
    }),
    defineField({
      name: "gorsel",
      title: "Hizmet Görseli",
      type: "image",
      options: { hotspot: true },
      description: "Hizmet kartında ve detay sayfasında gösterilecek görsel.",
    }),
    defineField({
      name: "ikon",
      title: "İkon Adı",
      type: "string",
      description:
        "Lucide ikon adı (ör: Globe, Layout, Search, Share2). lucide.dev adresinden ikon adlarını bulabilirsiniz.",
    }),
    defineField({
      name: "ozellikler",
      title: "Özellikler",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Hizmetin sunduğu özellikler listesi (ör: Kurumsal Web Siteleri, E-Ticaret Platformları).",
    }),
    defineField({
      name: "teknolojiler",
      title: "Teknolojiler",
      type: "array",
      of: [{ type: "string" }],
      description: "Kullanılan teknolojiler (ör: React, Next.js, Node.js).",
    }),
    defineField({
      name: "sira",
      title: "Sıralama",
      type: "number",
      description:
        "Hizmetler listesindeki görünüm sırası. Küçük sayı önce görünür.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "Bu hizmet sayfası için SEO ayarları.",
    }),
  ],
  orderings: [
    {
      title: "Sıralama",
      name: "siraAsc",
      by: [{ field: "sira", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "baslik", subtitle: "altBaslik", media: "gorsel" },
  },
});
