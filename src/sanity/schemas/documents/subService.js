import { defineType, defineField } from "sanity";

export default defineType({
  name: "altHizmet",
  title: "Alt Hizmet",
  type: "document",
  icon: () => "🌿",
  fields: [
    defineField({
      name: "baslik",
      title: "Hizmet Adı",
      type: "string",
      description: "Alt hizmetin adı (ör: Kurumsal Web Yazılım).",
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
      name: "ustHizmet",
      title: "Bağlı Olduğu Ana Hizmet",
      type: "reference",
      to: [{ type: "hizmet" }],
      description: "Bu alt hizmetin bağlı olduğu ana hizmeti seçin.",
      validation: (Rule) =>
        Rule.required().error("Ana hizmet seçimi zorunludur."),
    }),
    defineField({
      name: "altBaslik",
      title: "Alt Başlık",
      type: "string",
      description: "Hizmetin kısa alt başlığı.",
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
      description: "Hizmet detay sayfasında gösterilecek uzun açıklama.",
    }),
    defineField({
      name: "gorsel",
      title: "Hizmet Görseli",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Görsel Alt Metni",
          type: "string",
          description: "SEO için görselin alternatif metni.",
        }),
      ],
      description: "Hizmet kartında ve detay sayfasında gösterilecek görsel.",
    }),
    defineField({
      name: "ikon",
      title: "İkon Adı",
      type: "string",
      description: "Lucide ikon adı (ör: Globe, Layout).",
    }),
    defineField({
      name: "teknolojiler",
      title: "Teknolojiler",
      type: "array",
      of: [{ type: "string" }],
      description: "Kullanılan teknolojiler (ör: React, Next.js).",
    }),
    defineField({
      name: "sira",
      title: "Sıralama",
      type: "number",
      description: "Görünüm sırası.",
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
    select: {
      title: "baslik",
      subtitle: "ustHizmet.baslik",
      media: "gorsel",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle ? `Üst: ${subtitle}` : "Ana Hizmet Seçilmedi",
        media: media,
      };
    },
  },
});
