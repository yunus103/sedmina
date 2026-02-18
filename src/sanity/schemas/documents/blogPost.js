import { defineType, defineField } from "sanity";

export default defineType({
  name: "blogYazisi",
  title: "Blog Yazısı",
  type: "document",
  icon: () => "📝",
  fields: [
    defineField({
      name: "baslik",
      title: "Başlık",
      type: "string",
      description: "Blog yazısının başlığı.",
      validation: (Rule) => Rule.required().error("Başlık zorunludur."),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "baslik", maxLength: 96 },
      description: "Yazının URL'si. Başlıktan otomatik oluşturulur.",
      validation: (Rule) => Rule.required().error("Slug zorunludur."),
    }),
    defineField({
      name: "ozet",
      title: "Kısa Özet",
      type: "text",
      rows: 3,
      description: "Yazının kısa özeti. Blog listesinde ve SEO'da kullanılır.",
      validation: (Rule) => Rule.required().error("Özet zorunludur."),
    }),
    defineField({
      name: "icerik",
      title: "İçerik",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Başlık 2", value: "h2" },
            { title: "Başlık 3", value: "h3" },
            { title: "Başlık 4", value: "h4" },
            { title: "Alıntı", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Kalın", value: "strong" },
              { title: "İtalik", value: "em" },
              { title: "Altı çizili", value: "underline" },
              { title: "Kod", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
          lists: [
            { title: "Madde İşareti", value: "bullet" },
            { title: "Numaralı", value: "number" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Metni",
              description:
                "Görsel açıklaması (erişilebilirlik ve SEO için önemli).",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "hizalama",
              title: "Hizalama",
              type: "string",
              options: {
                list: [
                  { title: "Sol", value: "left" },
                  { title: "Orta", value: "center" },
                  { title: "Sağ", value: "right" },
                ],
                layout: "radio",
              },
              initialValue: "center",
            },
            {
              name: "genislik",
              title: "Genişlik",
              type: "string",
              options: {
                list: [
                  { title: "Küçük (%25)", value: "small" },
                  { title: "Orta (%50)", value: "medium" },
                  { title: "Büyük (%75)", value: "large" },
                  { title: "Tam Genişlik (%100)", value: "full" },
                ],
                layout: "dropdown",
              },
              initialValue: "full",
            },
            {
              name: "caption",
              type: "string",
              title: "Açıklama",
              description: "Görselin altında gösterilecek açıklama.",
            },
          ],
        },
      ],
      description:
        "Blog yazısının tam içeriği. Zengin metin editörü: başlık, paragraf, liste, görsel, link ekleyebilirsiniz.",
    }),
    defineField({
      name: "tarih",
      title: "Yayın Tarihi",
      type: "date",
      description: "Yazının yayınlanma tarihi.",
      validation: (Rule) => Rule.required().error("Tarih zorunludur."),
    }),
    defineField({
      name: "kategori",
      title: "Kategori",
      type: "string",
      description:
        "Yazının kategorisi (ör: Dijital Pazarlama, Web Geliştirme).",
    }),
    defineField({
      name: "kategoriRenk",
      title: "Kategori Rengi",
      type: "string",
      description:
        "Kategori etiketinin rengi (CSS renk kodu ör: #3B82F6, blue, rgba(...)). Boş bırakılırsa varsayılan renk kullanılır.",
    }),
    defineField({
      name: "tur",
      title: "Tür",
      type: "string",
      options: {
        list: [
          { title: "Makale", value: "Makale" },
          { title: "Rehber", value: "Rehber" },
          { title: "Haber", value: "Haber" },
          { title: "Vaka Çalışması", value: "Vaka Çalışması" },
        ],
      },
      description: "Yazının türü.",
    }),
    defineField({
      name: "gorsel",
      title: "Kapak Görseli",
      type: "image",
      options: { hotspot: true },
      description:
        "Blog listesinde ve yazının üstünde gösterilecek kapak görseli.",
    }),
    defineField({
      name: "yazar",
      title: "Yazar",
      type: "string",
      description: "Yazarın adı.",
    }),
    defineField({
      name: "okumaSuresi",
      title: "Okuma Süresi",
      type: "string",
      description: "Tahmini okuma süresi (ör: 5 dk okuma).",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "Bu blog yazısı için SEO ayarları.",
    }),
  ],
  orderings: [
    {
      title: "Yayın Tarihi (En Yeni)",
      name: "tarihDesc",
      by: [{ field: "tarih", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "baslik", subtitle: "kategori", media: "gorsel" },
  },
});
