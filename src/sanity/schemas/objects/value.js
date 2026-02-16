import { defineType, defineField } from "sanity";

export default defineType({
  name: "deger",
  title: "Değer",
  type: "object",
  fields: [
    defineField({
      name: "ikon",
      title: "İkon Adı",
      type: "string",
      description:
        "Lucide ikon adı (ör: Target, Zap, Heart, Award). lucide.dev adresinden bulabilirsiniz.",
      validation: (Rule) => Rule.required().error("İkon adı zorunludur."),
    }),
    defineField({
      name: "baslik",
      title: "Başlık",
      type: "string",
      description: "Değer başlığı (ör: Stratejik Düşünce).",
      validation: (Rule) => Rule.required().error("Başlık zorunludur."),
    }),
    defineField({
      name: "aciklama",
      title: "Açıklama",
      type: "text",
      rows: 2,
      description: "Değerin kısa açıklaması.",
      validation: (Rule) => Rule.required().error("Açıklama zorunludur."),
    }),
  ],
  preview: {
    select: { title: "baslik", subtitle: "ikon" },
  },
});
