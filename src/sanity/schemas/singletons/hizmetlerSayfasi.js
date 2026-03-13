import { defineType, defineField } from "sanity";

export default defineType({
  name: "hizmetlerSayfasi",
  title: "Hizmetler Sayfası",
  type: "document",
  icon: () => "💼",
  groups: [
    { name: "hero", title: "Üst Bölüm", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "ustBaslik",
      title: "Üst Etiket",
      type: "string",
      group: "hero",
      description: "Sayfa en üstündeki küçük etiket (ör: Hizmetlerimiz).",
    }),
    defineField({
      name: "baslik",
      title: "Sayfa Başlığı",
      type: "string",
      group: "hero",
      description: "Sayfanın en üstünde görünen ana başlık (ör: Hizmetlerimiz).",
    }),
    defineField({
      name: "aciklama",
      title: "Sayfa Açıklaması",
      type: "text",
      rows: 3,
      group: "hero",
      description: "Ana başlığın altındaki açıklama yazısı.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      description: "Bu sayfa için SEO ayarları.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hizmetler Sayfası" };
    },
  },
});
