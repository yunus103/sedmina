// ─── Site Ayarları ───
// Global alanlar (telefon, adres vb.) her zaman base TR belgesinden gelir.
// Sadece navigasyon ve CTA butonu locale'e göre seçilir.
export const siteSettingsQuery = `{
  ...*[_type == "siteAyarlari" && (language == "tr" || !defined(language))][0]{
    sirketAdi,
    "logoKoyuUrl": logoKoyu.asset->url,
    slogan,
    aciklama,
    email,
    telefon,
    adres,
    haritaUrl,
    linkedin,
    instagram,
    twitter,
    facebook,
    tiktok,
    sosyalMedyaLinkleri[]{
      _key,
      platform,
      url
    },
    seo{
      baslik,
      aciklama,
      anahtarKelimeler,
      "ogGorselUrl": ogGorsel.asset->url
    }
  },
  "navigasyon": coalesce(
    *[_type == "siteAyarlari" && language == $locale][0].navigasyon[]{_key, etiket, href},
    *[_type == "siteAyarlari" && (language == "tr" || !defined(language))][0].navigasyon[]{_key, etiket, href}
  ),
  "ctaButon": coalesce(
    *[_type == "siteAyarlari" && language == $locale][0].ctaButon{etiket, href},
    *[_type == "siteAyarlari" && (language == "tr" || !defined(language))][0].ctaButon{etiket, href}
  )
}`;



// ─── Ana Sayfa ───
export const homePageQuery = `*[_type == "anaSayfa" && (language == $locale || (!defined(language) && $locale == "tr"))][0]{
  "heroArkaPlanGorsel": heroArkaPlanGorsel.asset->url,
  "heroSlaytlarUrls": heroSlaytlar[].asset->url,
  heroSlogan,
  heroCtaYazi,
  heroCtaLink,
  surecBaslik,
  surecAdimlari[]{
    _key,
    baslik,
    altBaslik,
    aciklama,
    "gorselUrl": gorsel.asset->url,
    ikon
  },
  surecCtaYazi,
  hizmetlerBaslik,
  hizmetlerAltBaslik,
  referanslarBaslik,
  projelerBaslik,
  projelerAltBaslik,
  projelerTumunuGorYazi,
  blogBaslik,
  blogAltBaslik,
  blogTumunuGorYazi,
  iletisimBaslik,
  iletisimAltYazi,
  seo{
    baslik,
    aciklama,
    anahtarKelimeler,
    "ogGorselUrl": ogGorsel.asset->url
  }
}`;

// ─── Hakkımızda Sayfası ───
export const aboutPageQuery = `*[_type == "hakkimizdaSayfasi" && (language == $locale || (!defined(language) && $locale == "tr"))][0]{
  ustBaslik,
  baslik,
  icerik,
  "gorselUrl": gorsel.asset->url,
  ctaYazi,
  ctaLink,
  istatistikler[]{
    _key,
    deger,
    etiket
  },
  degerlerBaslik,
  degerlerAltBaslik,
  degerler[]{
    _key,
    ikon,
    baslik,
    aciklama
  },
  zamanCizelgesiBaslik,
  zamanCizelgesiAltBaslik,
  zamanCizelgesi[]{
    _key,
    yil,
    baslik,
    aciklama
  },
  ctaBolumBaslik,
  ctaBolumAciklama,
  seo{
    baslik,
    aciklama,
    anahtarKelimeler,
    "ogGorselUrl": ogGorsel.asset->url
  }
}`;

// ─── İletişim Sayfası ───
export const contactPageQuery = `*[_type == "iletisimSayfasi" && (language == $locale || (!defined(language) && $locale == "tr"))][0]{
  ustBaslik,
  baslik,
  aciklama,
  formBaslik,
  formAciklama,
  yanitSuresiBaslik,
  yanitSuresiAciklama,
  seo{
    baslik,
    aciklama,
    anahtarKelimeler,
    "ogGorselUrl": ogGorsel.asset->url
  }
}`;

// ─── Hizmetler ───
export const allServicesQuery = `*[_type == "hizmet" && (language == $locale || (!defined(language) && $locale == "tr"))] | order(sira asc){
  _id,
  baslik,
  "slug": slug.current,
  altBaslik,
  aciklama,
  "gorselUrl": gorsel.asset->url,
  "gorselAlt": gorsel.alt,
  ikon,
  teknolojiler,
  sira,
  "altHizmetler": *[_type == "altHizmet" && references(^._id)] | order(sira asc){
    _id,
    baslik,
    "slug": slug.current,
    aciklama,
    "gorselUrl": gorsel.asset->url,
    "gorselAlt": gorsel.alt
  }
}`;

export const serviceBySlugQuery = `*[_type == "hizmet" && slug.current == $slug && (language == $locale || (!defined(language) && $locale == "tr"))][0]{
  _id,
  baslik,
  "slug": slug.current,
  altBaslik,
  aciklama,
  detayliAciklama,
  "gorselUrl": gorsel.asset->url,
  "gorselAlt": gorsel.alt,
  ikon,
  teknolojiler,
  "altHizmetler": *[_type == "altHizmet" && references(^._id)] | order(sira asc){
    _id,
    baslik,
    "slug": slug.current,
    aciklama,
    "gorselUrl": gorsel.asset->url,
    "gorselAlt": gorsel.alt,
    altBaslik
  },
  seo{
    baslik,
    aciklama,
    anahtarKelimeler,
    "ogGorselUrl": ogGorsel.asset->url
  }
}`;

export const subServiceBySlugQuery = `*[_type == "altHizmet" && slug.current == $subSlug && (language == $locale || (!defined(language) && $locale == "tr"))][0]{
  _id,
  baslik,
  "slug": slug.current,
  altBaslik,
  aciklama,
  detayliAciklama,
  "gorselUrl": gorsel.asset->url,
  "gorselAlt": gorsel.alt,
  ikon,
  teknolojiler,
  "ustHizmet": ustHizmet->{
    baslik,
    "slug": slug.current,
    "altHizmetler": *[_type == "altHizmet" && references(^._id) && (language == $locale || (!defined(language) && $locale == "tr"))] | order(sira asc){
      _id,
      baslik,
      "slug": slug.current,
      aciklama,
      "gorselUrl": gorsel.asset->url,
      "gorselAlt": gorsel.alt,
      altBaslik
    }
  },
  seo{
    baslik,
    aciklama,
    anahtarKelimeler,
    "ogGorselUrl": ogGorsel.asset->url
  }
}`;

// ─── Projeler (Çalışmalar) ───
export const allProjectsQuery = `*[_type == "proje" && (language == $locale || (!defined(language) && $locale == "tr"))] | order(_createdAt desc){
  _id,
  baslik,
  "slug": slug.current,
  "gorselUrl": gorsel.asset->url,
  aciklama,
  oneChikarilsin,
  musteri,
  "hizmetler": hizmetler[]->baslik,
  sonuclar[]{
    _key,
    metrik,
    deger
  }
}`;

export const projectBySlugQuery = `*[_type == "proje" && slug.current == $slug && (language == $locale || (!defined(language) && $locale == "tr"))][0]{
  _id,
  baslik,
  "slug": slug.current,
  "gorselUrl": gorsel.asset->url,
  aciklama,
  detayliAciklama,
  oneChikarilsin,
  musteri,
  "hizmetler": hizmetler[]->baslik,
  sonuclar[]{
    _key,
    metrik,
    deger
  },
  "galeriUrls": galeri[].asset->url,
  seo{
    baslik,
    aciklama,
    anahtarKelimeler,
    "ogGorselUrl": ogGorsel.asset->url
  }
}`;

// ─── Blog Yazıları ───
export const allBlogPostsQuery = `*[_type == "blogYazisi" && (language == $locale || (!defined(language) && $locale == "tr"))] | order(tarih desc){
  _id,
  baslik,
  "slug": slug.current,
  ozet,
  tarih,
  "kategoriler": kategoriler[]->baslik,
  kategoriRenk,
  tur,
  "gorselUrl": gorsel.asset->url,
  "gorselAlt": gorsel.alt,
  yazar,
  okumaSuresi
}`;

export const blogPostBySlugQuery = `*[_type == "blogYazisi" && slug.current == $slug && (language == $locale || (!defined(language) && $locale == "tr"))][0]{
  _id,
  baslik,
  "slug": slug.current,
  ozet,
  icerik,
  tarih,
  "kategoriler": kategoriler[]->baslik,
  kategoriRenk,
  tur,
  "gorselUrl": gorsel.asset->url,
  "gorselAlt": gorsel.alt,
  yazar,
  okumaSuresi,
  seo{
    baslik,
    aciklama,
    anahtarKelimeler,
    "ogGorselUrl": ogGorsel.asset->url
  }
}`;

export const allBlogCategoriesQuery = `*[_type == "blogKategorisi"] | order(sira asc){
  _id,
  baslik,
  "slug": slug.current
}`;

// ─── Referanslar ───
export const allReferencesQuery = `*[_type == "referans"] | order(sira asc){
  _id,
  isim,
  "logoUrl": logo.asset->url,
  sira
}`;

// ─── Sitemap ───
export const sitemapQuery = `{
  "services": *[_type == "hizmet"]{ "slug": slug.current, language },
  "subServices": *[_type == "altHizmet"]{ "slug": slug.current, "parentSlug": ustHizmet->slug.current, language },
  "posts": *[_type == "blogYazisi"]{ "slug": slug.current, tarih, language },
  "projects": *[_type == "proje"]{ "slug": slug.current, language }
}`;

// ─── Yeni Singleton Sayfalar ───
export const hizmetlerSayfasiQuery = `*[_type == "hizmetlerSayfasi" && (language == $locale || (!defined(language) && $locale == "tr"))][0]{
  ustBaslik,
  baslik,
  aciklama,
  seo{
    baslik,
    aciklama,
    anahtarKelimeler,
    "ogGorselUrl": ogGorsel.asset->url
  }
}`;

export const projelerSayfasiQuery = `*[_type == "projelerSayfasi" && (language == $locale || (!defined(language) && $locale == "tr"))][0]{
  ustBaslik,
  baslik,
  aciklama,
  seo{
    baslik,
    aciklama,
    anahtarKelimeler,
    "ogGorselUrl": ogGorsel.asset->url
  }
}`;

export const blogSayfasiQuery = `*[_type == "blogSayfasi" && (language == $locale || (!defined(language) && $locale == "tr"))][0]{
  ustBaslik,
  baslik,
  aciklama,
  seo{
    baslik,
    aciklama,
    anahtarKelimeler,
    "ogGorselUrl": ogGorsel.asset->url
  }
}`;
