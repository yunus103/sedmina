// ─── Site Ayarları ───
export const siteSettingsQuery = `*[_type == "siteAyarlari"][0]{
  sirketAdi,
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
  navigasyon[]{
    _key,
    etiket,
    href
  },
  ctaButon{
    etiket,
    href
  },
  seo{
    baslik,
    aciklama,
    anahtarKelimeler,
    "ogGorselUrl": ogGorsel.asset->url
  }
}`;

// ─── Ana Sayfa ───
export const homePageQuery = `*[_type == "anaSayfa"][0]{
  "heroArkaPlanGorsel": heroArkaPlanGorsel.asset->url,
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
export const aboutPageQuery = `*[_type == "hakkimizdaSayfasi"][0]{
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
export const contactPageQuery = `*[_type == "iletisimSayfasi"][0]{
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
export const allServicesQuery = `*[_type == "hizmet"] | order(sira asc){
  _id,
  baslik,
  "slug": slug.current,
  altBaslik,
  aciklama,
  "gorselUrl": gorsel.asset->url,
  ikon,
  teknolojiler,
  sira,
  "altHizmetler": *[_type == "altHizmet" && references(^._id)] | order(sira asc){
    _id,
    baslik,
    "slug": slug.current,
    aciklama,
    "gorselUrl": gorsel.asset->url
  }
}`;

export const serviceBySlugQuery = `*[_type == "hizmet" && slug.current == $slug][0]{
  _id,
  baslik,
  "slug": slug.current,
  altBaslik,
  aciklama,
  detayliAciklama,
  "gorselUrl": gorsel.asset->url,
  ikon,
  teknolojiler,
  "altHizmetler": *[_type == "altHizmet" && references(^._id)] | order(sira asc){
    _id,
    baslik,
    "slug": slug.current,
    aciklama,
    "gorselUrl": gorsel.asset->url,
    altBaslik
  },
  seo{
    baslik,
    aciklama,
    anahtarKelimeler,
    "ogGorselUrl": ogGorsel.asset->url
  }
}`;

export const subServiceBySlugQuery = `*[_type == "altHizmet" && slug.current == $subSlug][0]{
  _id,
  baslik,
  "slug": slug.current,
  altBaslik,
  aciklama,
  detayliAciklama,
  "gorselUrl": gorsel.asset->url,
  ikon,
  teknolojiler,
  "ustHizmet": ustHizmet->{
    baslik,
    "slug": slug.current,
    "altHizmetler": *[_type == "altHizmet" && references(^._id)] | order(sira asc){
      _id,
      baslik,
      "slug": slug.current,
      aciklama,
      "gorselUrl": gorsel.asset->url,
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
export const allProjectsQuery = `*[_type == "proje"] | order(_createdAt desc){
  _id,
  baslik,
  "slug": slug.current,
  kategoriler,
  yil,
  "gorselUrl": gorsel.asset->url,
  aciklama,
  oneChikarilsin,
  musteri,
  sure,
  hizmetler,
  sonuclar[]{
    _key,
    metrik,
    deger
  }
}`;

export const projectBySlugQuery = `*[_type == "proje" && slug.current == $slug][0]{
  _id,
  baslik,
  "slug": slug.current,
  kategoriler,
  yil,
  "gorselUrl": gorsel.asset->url,
  aciklama,
  detayliAciklama,
  oneChikarilsin,
  musteri,
  sure,
  hizmetler,
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
export const allBlogPostsQuery = `*[_type == "blogYazisi"] | order(tarih desc){
  _id,
  baslik,
  "slug": slug.current,
  ozet,
  tarih,
  kategori,
  kategoriRenk,
  tur,
  "gorselUrl": gorsel.asset->url,
  yazar,
  okumaSuresi
}`;

export const blogPostBySlugQuery = `*[_type == "blogYazisi" && slug.current == $slug][0]{
  _id,
  baslik,
  "slug": slug.current,
  ozet,
  icerik,
  tarih,
  kategori,
  kategoriRenk,
  tur,
  "gorselUrl": gorsel.asset->url,
  yazar,
  okumaSuresi,
  seo{
    baslik,
    aciklama,
    anahtarKelimeler,
    "ogGorselUrl": ogGorsel.asset->url
  }
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
  "services": *[_type == "hizmet"]{ "slug": slug.current },
  "subServices": *[_type == "altHizmet"]{ "slug": slug.current, "parentSlug": ustHizmet->slug.current },
  "projects": *[_type == "proje"]{ "slug": slug.current },
  "posts": *[_type == "blogYazisi"]{ "slug": slug.current, tarih }
}`;
