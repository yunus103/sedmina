import { defineType, defineField } from "sanity";

export default defineType({
  name: "surecAdimi",
  title: "Süreç Adımı",
  type: "object",
  fields: [
    defineField({
      name: "baslik",
      title: "Başlık",
      type: "string",
      description: "Süreç adımının ana başlığı (ör: FİKİR, DENEYİM, ETKİ).",
      validation: (Rule) => Rule.required().error("Başlık zorunludur."),
    }),
    defineField({
      name: "altBaslik",
      title: "Alt Başlık",
      type: "string",
      description: "Süreç adımının alt başlığı (ör: KIVILCIM, YARATIM).",
    }),
    defineField({
      name: "aciklama",
      title: "Açıklama",
      type: "text",
      rows: 3,
      description: "Süreç adımının detaylı açıklaması.",
      validation: (Rule) => Rule.required().error("Açıklama zorunludur."),
    }),
    defineField({
      name: "gorsel",
      title: "Görsel",
      type: "image",
      options: { hotspot: true },
      description: "Süreç adımını temsil eden görsel.",
    }),
    defineField({
      name: "ikon",
      title: "İkon Adı",
      type: "string",
      description:
        "Lucide ikon adı (ör: Lightbulb, Palette, TrendingUp). lucide.dev adresinden ikon adlarını bulabilirsiniz.",
    }),
  ],
  preview: {
    select: { title: "baslik", subtitle: "altBaslik" },
  },
});
