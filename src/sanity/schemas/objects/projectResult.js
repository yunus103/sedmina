import { defineType, defineField } from "sanity";

export default defineType({
  name: "projeSonucu",
  title: "Proje Sonucu",
  type: "object",
  fields: [
    defineField({
      name: "metrik",
      title: "Metrik Adı",
      type: "string",
      description: "Sonuç metriği (ör: Organik Trafik Artışı, Dönüşüm Oranı).",
      validation: (Rule) => Rule.required().error("Metrik adı zorunludur."),
    }),
    defineField({
      name: "deger",
      title: "Değer",
      type: "string",
      description: "Metrik değeri (ör: %180, 1.2s, 500+).",
      validation: (Rule) => Rule.required().error("Değer zorunludur."),
    }),
  ],
  preview: {
    select: { title: "metrik", subtitle: "deger" },
  },
});
