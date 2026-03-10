import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteAyarlari",
  title: "Site Ayarları",
  type: "document",
  icon: () => "⚙️",
  groups: [
    { name: "genel", title: "Genel", default: true },
    { name: "iletisim", title: "İletişim" },
    { name: "sosyalMedya", title: "Sosyal Medya" },
    { name: "navigasyon", title: "Navigasyon" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Genel ──
    defineField({
      name: "sirketAdi",
      title: "Şirket Adı",
      type: "string",
      group: "genel",
      description: "Site genelinde kullanılacak şirket adı.",
      validation: (Rule) => Rule.required().error("Şirket adı zorunludur."),
    }),
    defineField({
      name: "slogan",
      title: "Slogan",
      type: "string",
      group: "genel",
      description: "Şirketin ana sloganı. Footer ve diğer yerlerde görünür.",
    }),
    defineField({
      name: "aciklama",
      title: "Genel Açıklama",
      type: "text",
      rows: 3,
      group: "genel",
      description: "Şirketin genel tanıtım metni.",
    }),

    // ── İletişim ──
    defineField({
      name: "email",
      title: "E-Posta",
      type: "string",
      group: "iletisim",
      description: "İletişim e-posta adresi.",
      validation: (Rule) => Rule.required().error("E-posta zorunludur."),
    }),
    defineField({
      name: "telefon",
      title: "Telefon",
      type: "string",
      group: "iletisim",
      description: "İletişim telefon numarası.",
    }),
    defineField({
      name: "adres",
      title: "Adres",
      type: "string",
      group: "iletisim",
      description: "Şirket adresi.",
    }),
    defineField({
      name: "haritaUrl",
      title: "Harita Embed URL",
      type: "url",
      group: "iletisim",
      description:
        "Google Maps embed URL'si. Google Maps'ten 'Paylaş > Haritayı yerleştir' ile alabilirsiniz.",
    }),

    // ── Sosyal Medya ──
    defineField({
      name: "sosyalMedyaLinkleri",
      title: "Sosyal Medya Linkleri (Yeni - Sıralanabilir)",
      type: "array",
      group: "sosyalMedya",
      description:
        "Sosyal medya ikonlarını buradan ekleyerek sürükleyip sıralayabilirsiniz.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Twitter/X", value: "twitter" },
                  { title: "Facebook", value: "facebook" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "YouTube", value: "youtube" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
            prepare({ title, subtitle }) {
              const platforms = {
                linkedin: "LinkedIn",
                instagram: "Instagram",
                twitter: "Twitter/X",
                facebook: "Facebook",
                tiktok: "TikTok",
                youtube: "YouTube",
              };
              return {
                title: platforms[title] || title,
                subtitle: subtitle,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn (Legacy)",
      type: "url",
      group: "sosyalMedya",
      description: "LinkedIn şirket sayfası linki.",
    }),
    defineField({
      name: "instagram",
      title: "Instagram (Legacy)",
      type: "url",
      group: "sosyalMedya",
      description: "Instagram profil linki.",
    }),
    defineField({
      name: "twitter",
      title: "Twitter (X) (Legacy)",
      type: "url",
      group: "sosyalMedya",
      description: "Twitter/X profil linki.",
    }),
    defineField({
      name: "facebook",
      title: "Facebook (Legacy)",
      type: "url",
      group: "sosyalMedya",
      description: "Facebook sayfa linki.",
    }),
    defineField({
      name: "tiktok",
      title: "TikTok (Legacy)",
      type: "url",
      group: "sosyalMedya",
      description: "TikTok profil linki.",
    }),

    // ── Navigasyon ──
    defineField({
      name: "navigasyon",
      title: "Ana Menü Linkleri",
      type: "array",
      group: "navigasyon",
      description:
        "Üst menüde görünecek sayfalar. Sıralama buradaki sıraya göre olur.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "etiket",
              title: "Menü Yazısı",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Menü yazısı zorunludur."),
            }),
            defineField({
              name: "href",
              title: "Sayfa Linki",
              type: "string",
              description: "Sayfa yolu (ör: /hakkimizda, /hizmetler).",
              validation: (Rule) =>
                Rule.required().error("Sayfa linki zorunludur."),
            }),
          ],
          preview: {
            select: { title: "etiket", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "ctaButon",
      title: "CTA Butonu",
      type: "object",
      group: "navigasyon",
      description: "Menüdeki ana aksiyon butonu (ör: İletişim).",
      fields: [
        defineField({
          name: "etiket",
          title: "Buton Yazısı",
          type: "string",
        }),
        defineField({
          name: "href",
          title: "Buton Linki",
          type: "string",
        }),
      ],
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "Varsayılan SEO",
      type: "seo",
      group: "seo",
      description:
        "Site geneli için varsayılan SEO ayarları. Sayfa bazlı SEO ayarları bunu ezer.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Ayarları" };
    },
  },
});
