import { defineType, defineField } from "sanity";

export default defineType({
  name: "referans",
  title: "Referans",
  type: "document",
  icon: () => "🤝",
  fields: [
    defineField({
      name: "isim",
      title: "Firma Adı",
      type: "string",
      description: "Referans firma/müşteri adı.",
      validation: (Rule) => Rule.required().error("Firma adı zorunludur."),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description:
        "Firmanın logosu. Tercihen şeffaf arka planlı (PNG) olmalıdır.",
      validation: (Rule) => Rule.required().error("Logo zorunludur."),
    }),
    defineField({
      name: "sira",
      title: "Sıralama",
      type: "number",
      description: "Slider'daki görünüm sırası. Küçük sayı önce görünür.",
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
    select: { title: "isim", media: "logo" },
  },
});
