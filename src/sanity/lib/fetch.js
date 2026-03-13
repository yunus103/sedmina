import { sanityClient } from "../client";

/**
 * Sanity veri çekme yardımcısı.
 * Hata durumunda { data: null, error } döner, başarılı durumda { data, error: null }.
 */
export async function sanityFetch(query, params = {}, revalidate = 0) {
  try {
    const data = await sanityClient.fetch(query, params, {
      next: { revalidate },
    });
    return { data, error: null };
  } catch (error) {
    console.error("Sanity fetch hatası:", error);
    return {
      data: null,
      error: error.message || "Veri yüklenirken bir hata oluştu.",
    };
  }
}
