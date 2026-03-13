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
  { typeName: "hizmetlerSayfasi", title: "💼 Hizmetler Sayfası" },
  { typeName: "projelerSayfasi", title: "🎨 Projeler Sayfası" },
  { typeName: "blogSayfasi", title: "📖 Blog Sayfası" },
];

import { documentInternationalization } from "@sanity/document-internationalization";
import { AutoTranslateAction } from "./src/sanity/actions/autoTranslate";

export default defineConfig({
  name: "sedmina-studio",
  title: "SedMina Yönetim Paneli",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [
    documentInternationalization({
      base: "tr",
      languages: [
        { title: "Türkçe", id: "tr" },
        { title: "English", id: "en" },
      ],
      supportedLanguages: [
        { id: "tr", title: "Türkçe" },
        { id: "en", title: "English" },
      ],
      schemaTypes: [
        "siteAyarlari",
        "anaSayfa",
        "hakkimizdaSayfasi",
        "iletisimSayfasi",
        "hizmetlerSayfasi",
        "projelerSayfasi",
        "blogSayfasi",
        "hizmet",
        "altHizmet",
        "proje",
        "blogYazisi",
      ],
    }),
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
              .title("🏷️ Blog Kategorileri")
              .schemaType("blogKategorisi")
              .child(
                S.documentTypeList("blogKategorisi").title("Blog Kategorileri"),
              ),

            S.listItem()
              .title("🤝 Referanslar")
              .schemaType("referans")
              .child(S.documentTypeList("referans").title("Referanslar")),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      const translatableTypes = [
        "anaSayfa", "hakkimizdaSayfasi", "iletisimSayfasi",
        "siteAyarlari", "hizmetlerSayfasi", "projelerSayfasi", 
        "blogSayfasi", "hizmet", "altHizmet", "proje", "blogYazisi",
      ];
      if (translatableTypes.includes(context.schemaType)) {
        return [...prev, AutoTranslateAction];
      }
      return prev;
    },
  },
});
