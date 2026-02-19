import { defineType, defineField } from "sanity";

export default defineType({
  name: "blogKategorisi",
  title: "Blog Kategorisi",
  type: "document",
  icon: () => "🏷️",
  fields: [
    defineField({
      name: "baslik",
      title: "Başlık",
      type: "string",
      description: "Kategori adı (ör: Dijital Pazarlama).",
      validation: (Rule) => Rule.required().error("Kategori adı zorunludur."),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "baslik", maxLength: 96 },
      description: "URL'de görünecek kısım. Başlıktan otomatik oluşturulur.",
      validation: (Rule) => Rule.required().error("Slug zorunludur."),
    }),
    defineField({
      name: "sira",
      title: "Sıralama",
      type: "number",
      description:
        "Filtre listesindeki görünüm sırası. Küçük sayı önce görünür.",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "baslik", subtitle: "slug.current" },
  },
});
