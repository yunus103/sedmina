import { defineType, defineField } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO Ayarları",
  type: "object",
  fields: [
    defineField({
      name: "baslik",
      title: "SEO Başlık",
      type: "string",
      description:
        "Arama motorlarında ve tarayıcı sekmesinde görünecek sayfa başlığı. Boş bırakılırsa ana başlık kullanılır.",
    }),
    defineField({
      name: "aciklama",
      title: "Meta Açıklama",
      type: "text",
      rows: 3,
      description:
        "Arama sonuçlarında görünecek kısa açıklama. 150-160 karakter önerilir. Boş bırakılırsa kısa özet/açıklama kullanılır.",
    }),
    defineField({
      name: "anahtarKelimeler",
      title: "Anahtar Kelimeler",
      type: "array",
      of: [{ type: "string" }],
      description: "SEO için anahtar kelimeler. Her birini ayrı ayrı ekleyin.",
    }),
    defineField({
      name: "ogGorsel",
      title: "Paylaşım Görseli",
      type: "image",
      description:
        "Sosyal medyada paylaşıldığında görünecek görsel (1200x630px önerilir).",
    }),
  ],
});
