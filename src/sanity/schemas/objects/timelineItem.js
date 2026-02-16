import { defineType, defineField } from "sanity";

export default defineType({
  name: "zamanCizelgesiOgesi",
  title: "Zaman Çizelgesi Ögesi",
  type: "object",
  fields: [
    defineField({
      name: "yil",
      title: "Yıl",
      type: "string",
      description: "Yıl bilgisi (ör: 2021, 2022).",
      validation: (Rule) => Rule.required().error("Yıl zorunludur."),
    }),
    defineField({
      name: "baslik",
      title: "Başlık",
      type: "string",
      description: "Bu yılki önemli gelişme (ör: Kuruluş, Ekip Büyümesi).",
      validation: (Rule) => Rule.required().error("Başlık zorunludur."),
    }),
    defineField({
      name: "aciklama",
      title: "Açıklama",
      type: "text",
      rows: 2,
      description: "Bu dönemin kısa açıklaması.",
    }),
  ],
  preview: {
    select: { title: "yil", subtitle: "baslik" },
  },
});
