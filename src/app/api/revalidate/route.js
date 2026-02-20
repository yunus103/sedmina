import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");

    // Güvenlik kontrolü
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Geçersiz secret anahtarı" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const type = body._type; // Sanity'den gelen döküman tipi (proje, blogYazisi vs.)

    // İsterseniz sadece belirli bir path'i, isterseniz tüm siteyi güncelleyebilirsiniz.
    // Tüm siteyi en güncel veriyle tazelemek için:
    revalidatePath("/", "layout");

    console.log(`Revalidated successfully for type: ${type}`);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Hata oluştu", error: err.message },
      { status: 500 },
    );
  }
}
