/**
 * Sanity Studio Custom Document Action: Auto-Translate from Turkish
 *
 * Appears only when the current document has language == "en".
 * Finds the Turkish source document, translates all text fields, and
 * patches the current EN document — without touching images, slugs,
 * references, numbers, or dates.
 */
import { useCallback, useState } from "react";
import { useClient, useDocumentOperation } from "sanity";
import {
  translateText,
  translateBatch,
  translatePortableText,
} from "./translateUtils";

const API_KEY =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_KEY
    : undefined;

// ─── Per-schema field maps ────────────────────────────────────────────────────
// Each entry: { strings: [], texts: [], portableTexts: [], arrayPaths: [] }
// arrayPaths: { path, stringFields, textFields } for array-of-object fields

const FIELD_MAP = {
  anaSayfa: {
    strings: [
      "heroCtaYazi",
      "surecBaslik",
      "surecCtaYazi",
      "hizmetlerBaslik",
      "hizmetlerAltBaslik",
      "referanslarBaslik",
      "projelerBaslik",
      "projelerAltBaslik",
      "projelerTumunuGorYazi",
      "blogBaslik",
      "blogAltBaslik",
      "blogTumunuGorYazi",
    ],
    texts: ["heroSlogan", "iletisimBaslik", "iletisimAltYazi"],
    portableTexts: [],
    arrayPaths: [
      {
        path: "surecAdimlari",
        stringFields: ["baslik", "altBaslik"],
        textFields: ["aciklama"],
      },
    ],
    seoFields: true,
  },
  hakkimizdaSayfasi: {
    strings: [
      "ustBaslik",
      "ctaYazi",
      "degerlerBaslik",
      "degerlerAltBaslik",
      "zamanCizelgesiBaslik",
      "zamanCizelgesiAltBaslik",
      "ctaBolumBaslik",
    ],
    texts: ["baslik", "ctaBolumAciklama"],
    portableTexts: ["icerik"],
    arrayPaths: [
      {
        path: "istatistikler",
        stringFields: ["etiket"],
        textFields: [],
      },
      {
        path: "degerler",
        stringFields: ["baslik"],
        textFields: ["aciklama"],
      },
      {
        path: "zamanCizelgesi",
        stringFields: ["yil", "baslik"],
        textFields: ["aciklama"],
      },
    ],
    seoFields: true,
  },
  iletisimSayfasi: {
    strings: [
      "ustBaslik",
      "formBaslik",
      "yanitSuresiBaslik",
    ],
    texts: ["baslik", "aciklama", "formAciklama", "yanitSuresiAciklama"],
    portableTexts: [],
    arrayPaths: [],
    seoFields: true,
  },
  siteAyarlari: {
    strings: ["slogan"],
    texts: [],
    portableTexts: [],
    arrayPaths: [
      {
        path: "navigasyon",
        stringFields: ["etiket"],
        textFields: [],
      },
    ],
    seoFields: false,
    // ctaButon handled separately
    ctaButton: true,
  },
  hizmetlerSayfasi: {
    strings: ["ustBaslik", "baslik"],
    texts: ["aciklama"],
    portableTexts: [],
    arrayPaths: [],
    seoFields: true,
  },
  projelerSayfasi: {
    strings: ["ustBaslik", "baslik"],
    texts: ["aciklama"],
    portableTexts: [],
    arrayPaths: [],
    seoFields: true,
  },
  blogSayfasi: {
    strings: ["ustBaslik", "baslik"],
    texts: ["aciklama"],
    portableTexts: [],
    arrayPaths: [],
    seoFields: true,
  },
  hizmet: {
    strings: ["baslik", "altBaslik"],
    texts: ["aciklama"],
    portableTexts: ["detayliAciklama"],
    arrayPaths: [],
    seoFields: true,
  },
  altHizmet: {
    strings: ["baslik", "altBaslik"],
    texts: ["aciklama"],
    portableTexts: ["detayliAciklama"],
    arrayPaths: [],
    seoFields: true,
  },
  proje: {
    strings: ["baslik", "musteri"],
    texts: ["aciklama"],
    portableTexts: ["detayliAciklama"],
    arrayPaths: [
      {
        path: "sonuclar",
        stringFields: ["metrik", "deger"],
        textFields: [],
      },
    ],
    seoFields: true,
  },
  blogYazisi: {
    strings: ["baslik", "yazar", "okumaSuresi"],
    texts: ["ozet"],
    portableTexts: ["icerik"],
    arrayPaths: [],
    seoFields: true,
  },
};

// ─── Main patch builder ───────────────────────────────────────────────────────

async function buildPatch(schemaType, sourceDoc, apiKey) {
  const map = FIELD_MAP[schemaType];
  if (!map) throw new Error(`No field map for schema type: ${schemaType}`);

  const patch = {};

  // 1. Simple strings — batch translate for speed
  const stringVals = map.strings.map((f) => sourceDoc[f] ?? "");
  const translatedStrings = await translateBatch(stringVals, apiKey);
  map.strings.forEach((f, i) => {
    if (translatedStrings[i]) patch[f] = translatedStrings[i];
  });

  // 2. Text fields — batch translate
  const textVals = map.texts.map((f) => sourceDoc[f] ?? "");
  const translatedTexts = await translateBatch(textVals, apiKey);
  map.texts.forEach((f, i) => {
    if (translatedTexts[i]) patch[f] = translatedTexts[i];
  });

  // 3. Portable Text fields
  for (const field of map.portableTexts) {
    if (Array.isArray(sourceDoc[field])) {
      patch[field] = await translatePortableText(sourceDoc[field], apiKey);
    }
  }

  // 4. Array-of-object fields
  for (const { path, stringFields, textFields } of map.arrayPaths) {
    const arr = sourceDoc[path];
    if (!Array.isArray(arr) || !arr.length) continue;

    // Collect all values to translate in one batch
    const allTexts = [];
    const positions = []; // { itemIdx, field }
    arr.forEach((item, itemIdx) => {
      [...stringFields, ...textFields].forEach((f) => {
        allTexts.push(item[f] ?? "");
        positions.push({ itemIdx, field: f });
      });
    });

    const allTranslated = await translateBatch(allTexts, apiKey);

    // Clone array and apply translations
    const cloned = JSON.parse(JSON.stringify(arr));
    positions.forEach(({ itemIdx, field }, i) => {
      if (allTranslated[i]) cloned[itemIdx][field] = allTranslated[i];
    });
    patch[path] = cloned;
  }

  // 5. SEO object
  if (map.seoFields && sourceDoc.seo) {
    const seoTexts = [
      sourceDoc.seo.baslik ?? "",
      sourceDoc.seo.aciklama ?? "",
    ];
    const [seoBaslik, seoAciklama] = await translateBatch(seoTexts, apiKey);
    patch.seo = {
      ...sourceDoc.seo,
      ...(seoBaslik && { baslik: seoBaslik }),
      ...(seoAciklama && { aciklama: seoAciklama }),
      // ogGorsel — not translated (image reference stays as-is)
    };
  }

  // 6. ctaButon (siteAyarlari only)
  if (map.ctaButton && sourceDoc.ctaButon?.etiket) {
    const translatedLabel = await translateText(
      sourceDoc.ctaButon.etiket,
      apiKey
    );
    patch.ctaButon = {
      ...sourceDoc.ctaButon,
      etiket: translatedLabel,
    };
  }

  return patch;
}

// ─── Find the Turkish source document ────────────────────────────────────────

async function findTurkishSource(client, schemaType, currentDoc) {
  // Strip `drafts.` prefix — the metadata stores the published IDs
  const docId = (currentDoc._id || "").replace(/^drafts\./, "");

  // Strategy 1: Use translation.metadata — query with previewDrafts to find even
  // unpublished metadata documents. Use explicit path check instead of references().
  try {
    const metadata = await client.fetch(
      `*[_type == "translation.metadata" && $docId in translations[].value._ref][0]{
        translations[]{
          _key,
          "ref": value._ref
        }
      }`,
      { docId },
      { perspective: "previewDrafts" }
    );

    if (metadata?.translations?.length) {
      const trEntry = metadata.translations.find((t) => t._key === "tr" && t.ref);
      if (trEntry?.ref) {
        // Try to get published version first, then draft
        const trDoc =
          (await client.getDocument(trEntry.ref)) ||
          (await client.getDocument(`drafts.${trEntry.ref}`));
        if (trDoc) return trDoc;
      }
    }
  } catch (e) {
    console.warn("[AutoTranslate] Metadata lookup failed:", e.message);
  }

  // Strategy 2: Fallback — for ALL types, find the TR document of the same type
  // This works correctly for singletons and as best-effort for collections
  try {
    const trDoc = await client.fetch(
      `*[_type == $type && (language == "tr" || !defined(language))][0]`,
      { type: schemaType },
      { perspective: "previewDrafts" }
    );
    if (trDoc) return trDoc;
  } catch (e) {
    console.warn("[AutoTranslate] Type fallback failed:", e.message);
  }

  return null;
}

// ─── The Document Action hook ─────────────────────────────────────────────────

export function AutoTranslateAction(props) {
  const { published, draft, id, type } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const { patch } = useDocumentOperation(id, type);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const currentDoc = draft || published;

  // Only show the button for English documents of supported types
  const isSupported = FIELD_MAP[type] !== undefined;
  const isEnglish = currentDoc?.language === "en";

  const onHandle = useCallback(async () => {
    if (!API_KEY) {
      // eslint-disable-next-line no-alert
      window.alert(
        "API anahtarı bulunamadı!\n" +
        ".env.local dosyasına SANITY_STUDIO_GOOGLE_TRANSLATE_KEY ekleyin ve sunucuyu yeniden başlatın."
      );
      return;
    }

    setStatus("loading");

    try {
      const sourceDoc = await findTurkishSource(client, type, currentDoc);
      if (!sourceDoc) {
        window.alert("Türkçe kaynak bulunamadı. Bu dökümanın Türkçe versiyonu henüz yok.");
        setStatus("idle");
        return;
      }

      const patchData = await buildPatch(type, sourceDoc, API_KEY);

      // Apply the patch to the current (EN) document
      patch.execute([{ set: patchData }]);

      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("[AutoTranslate] Error:", err);
      window.alert("Çeviri hatası: " + err.message);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }, [client, currentDoc, id, type, patch]);

  if (!isSupported || !isEnglish) return null;

  const labels = {
    idle: "🌐 Türkçeden Çevir",
    loading: "⏳ Çevriliyor...",
    success: "✅ Çeviri Tamam!",
    error: "❌ Hata Oluştu",
  };

  return {
    label: labels[status],
    title: "Google Translate ile Türkçe içeriği İngilizceye çevir",
    disabled: status === "loading",
    onHandle,
  };
}
