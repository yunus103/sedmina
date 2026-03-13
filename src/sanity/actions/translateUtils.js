/**
 * Google Translate API utility functions for Sanity Studio
 */

const GOOGLE_TRANSLATE_ENDPOINT =
  "https://translation.googleapis.com/language/translate/v2";

/**
 * Translate a single string from Turkish to English via Google Translate API.
 * Returns the original string if translation fails.
 */
export async function translateText(text, apiKey) {
  if (!text || typeof text !== "string" || !text.trim()) return text;

  try {
    const res = await fetch(
      `${GOOGLE_TRANSLATE_ENDPOINT}?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "tr",
          target: "en",
          format: "text",
        }),
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json?.data?.translations?.[0]?.translatedText ?? text;
  } catch (err) {
    console.error("[AutoTranslate] translateText error:", err);
    return text;
  }
}

/**
 * Translate an array of strings in a single batch API call (more efficient).
 */
export async function translateBatch(texts, apiKey) {
  const validTexts = texts.map((t) => (t && typeof t === "string" ? t : ""));

  // Only send non-empty strings — Google API rejects empty strings (HTTP 400)
  const nonEmptyIndices = [];
  const nonEmptyTexts = [];
  validTexts.forEach((t, i) => {
    if (t.trim()) {
      nonEmptyIndices.push(i);
      nonEmptyTexts.push(t);
    }
  });

  if (!nonEmptyTexts.length) return texts;

  try {
    const res = await fetch(
      `${GOOGLE_TRANSLATE_ENDPOINT}?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: nonEmptyTexts,
          source: "tr",
          target: "en",
          format: "text",
        }),
      }
    );
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(`HTTP ${res.status}: ${JSON.stringify(errBody?.error?.message ?? "")}`);
    }
    const json = await res.json();
    const translations = json?.data?.translations ?? [];

    // Re-map back to original indices
    const result = [...validTexts];
    nonEmptyIndices.forEach((origIdx, i) => {
      result[origIdx] = translations[i]?.translatedText ?? validTexts[origIdx];
    });
    return result;
  } catch (err) {
    console.error("[AutoTranslate] translateBatch error:", err);
    return texts;
  }
}

/**
 * Translate Portable Text (Sanity block content) block-by-block.
 * Only translates the text spans within each block, preserving:
 * - Block style (h2, h3, blockquote, normal)
 * - Mark decorators (strong, em, underline, code)
 * - Inline images and other non-text blocks
 * - _key and _type values
 */
export async function translatePortableText(blocks, apiKey) {
  if (!Array.isArray(blocks) || !blocks.length) return blocks;

  // Collect all text spans across all blocks for a single batch call
  const spans = []; // { blockIdx, childIdx, text }
  blocks.forEach((block, bi) => {
    if (block._type !== "block" || !Array.isArray(block.children)) return;
    block.children.forEach((child, ci) => {
      if (child._type === "span" && child.text && child.text.trim()) {
        spans.push({ blockIdx: bi, childIdx: ci, text: child.text });
      }
    });
  });

  if (!spans.length) return blocks;

  // Translate all spans in one batch
  const translated = await translateBatch(
    spans.map((s) => s.text),
    apiKey
  );

  // Deep-clone blocks so we don't mutate the original
  const result = JSON.parse(JSON.stringify(blocks));
  spans.forEach(({ blockIdx, childIdx }, i) => {
    result[blockIdx].children[childIdx].text = translated[i];
  });

  return result;
}
