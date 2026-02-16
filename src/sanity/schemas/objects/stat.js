import { defineType, defineField } from "sanity";

export default defineType({
  name: "istatistik",
  title: "İstatistik",
  type: "object",
  fields: [
    defineField({
      name: "deger",
      title: "Değer",
      type: "string",
      description: "İstatistik değeri (ör: 50+, %180, 1.2s).",
      validation: (Rule) => Rule.required().error("Değer zorunludur."),
    }),
    defineField({
      name: "etiket",
      title: "Etiket",
      type: "string",
      description:
        "İstatistik açıklaması (ör: Tamamlanan Proje, Mutlu Müşteri).",
      validation: (Rule) => Rule.required().error("Etiket zorunludur."),
    }),
  ],
  preview: {
    select: { title: "deger", subtitle: "etiket" },
  },
});
