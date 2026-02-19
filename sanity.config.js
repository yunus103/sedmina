"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes, singletonTypes } from "./src/sanity/schemas";

// Singleton desk structure items
const singletonItems = [
  { typeName: "siteAyarlari", title: "⚙️ Site Ayarları" },
  { typeName: "anaSayfa", title: "🏠 Ana Sayfa" },
  { typeName: "hakkimizdaSayfasi", title: "👥 Hakkımızda" },
  { typeName: "iletisimSayfasi", title: "📧 İletişim Sayfası" },
];

export default defineConfig({
  name: "sedmina-studio",
  title: "SedMina Yönetim Paneli",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("İçerik Yönetimi")
          .items([
            // ── Singleton sayfalar ──
            S.listItem()
              .title("📄 Sayfalar")
              .child(
                S.list()
                  .title("Sayfalar")
                  .items(
                    singletonItems.map((item) =>
                      S.listItem()
                        .title(item.title)
                        .id(item.typeName)
                        .child(
                          S.document()
                            .schemaType(item.typeName)
                            .documentId(item.typeName),
                        ),
                    ),
                  ),
              ),

            S.divider(),

            // ── Koleksiyonlar ──
            S.listItem()
              .title("🛠️ Hizmetler")
              .schemaType("hizmet")
              .child(S.documentTypeList("hizmet").title("Ana Hizmetler")),

            S.listItem()
              .title("🌿 Alt Hizmetler")
              .schemaType("altHizmet")
              .child(S.documentTypeList("altHizmet").title("Alt Hizmetler")),

            S.listItem()
              .title("📁 Projeler")
              .schemaType("proje")
              .child(S.documentTypeList("proje").title("Projeler")),

            S.listItem()
              .title("📝 Blog Yazıları")
              .schemaType("blogYazisi")
              .child(S.documentTypeList("blogYazisi").title("Blog Yazıları")),

            S.listItem()
              .title("🤝 Referanslar")
              .schemaType("referans")
              .child(S.documentTypeList("referans").title("Referanslar")),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Prevent singletons from appearing in "new document" menu
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !singletonTypes.includes(schemaType),
      ),
  },

  document: {
    // Prevent singletons from being duplicated or deleted
    actions: (input, context) => {
      if (singletonTypes.includes(context.schemaType)) {
        return input.filter(
          ({ action }) =>
            action && !["unpublish", "delete", "duplicate"].includes(action),
        );
      }
      return input;
    },
  },
});
