import { defineType, defineField } from "sanity";

export default defineType({
  name: "iletisimSayfasi",
  title: "İletişim Sayfası",
  type: "document",
  icon: () => "📧",
  groups: [
    { name: "sayfa", title: "Sayfa İçeriği", default: true },
    { name: "form", title: "Form Ayarları" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Sayfa İçeriği ──
    defineField({
      name: "ustBaslik",
      title: "Üst Etiket",
      type: "string",
      group: "sayfa",
      description: "Sayfa üstündeki küçük etiket (ör: İLETİŞİM).",
    }),
    defineField({
      name: "baslik",
      title: "Ana Başlık",
      type: "text",
      rows: 2,
      group: "sayfa",
      description: "Sayfanın ana başlığı.",
    }),
    defineField({
      name: "aciklama",
      title: "Açıklama",
      type: "text",
      rows: 3,
      group: "sayfa",
      description: "Başlık altındaki açıklama metni.",
    }),

    // ── Form ──
    defineField({
      name: "formBaslik",
      title: "Form Başlığı",
      type: "string",
      group: "form",
      description: "Formun üstündeki başlık (ör: Proje Detayları).",
    }),
    defineField({
      name: "formAciklama",
      title: "Form Açıklaması",
      type: "string",
      group: "form",
      description: "Formun altındaki açıklama metni.",
    }),
    defineField({
      name: "yanitSuresiBaslik",
      title: "Yanıt Süresi Başlığı",
      type: "string",
      group: "form",
      description: "Yanıt süresi kartının başlığı (ör: Yanıt Süresi).",
    }),
    defineField({
      name: "yanitSuresiAciklama",
      title: "Yanıt Süresi Açıklaması",
      type: "text",
      rows: 2,
      group: "form",
      description: "Yanıt süresi hakkında bilgi metni.",
    }),

    // ── SEO ──
    defineField({
      name: "seo",
      title: "Sayfa SEO",
      type: "seo",
      group: "seo",
      description: "İletişim sayfası için SEO ayarları.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "İletişim Sayfası" };
    },
  },
});
