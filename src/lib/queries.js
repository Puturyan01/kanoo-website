// Semua produk
export const ALL_PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  category,
  season,
  gender,
  age,
  price,
  oldPrice,
  badge,
  sizes,
  "colors": colors[].hex.hex,
  "image": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  inStock,
  featured,
  _createdAt
}`;

// Produk featured saja (New Arrivals)
export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && featured == true] | order(_createdAt desc) {
  _id,
  name,
  slug,
  category,
  gender,
  age,
  price,
  oldPrice,
  badge,
  "colors": colors[].hex.hex,
  "image": mainImage.asset->url,
}`;

// Produk by slug (detail produk)
export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  category,
  season,
  gender,
  age,
  price,
  oldPrice,
  badge,
  sizes,
  "colors": colors[].hex.hex,
  "image": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  inStock,
  featured
}`;

// Hero slides
export const HERO_SLIDES_QUERY = `*[_type == "heroSlide" && active == true] | order(order asc) {
  _id,
  title,
  label,
  cta,
  link,
  textPosition,
  "image": image.asset->url,
}`;

// About page
export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0] {
  heroTitle,
  heroSubtitle,
  storyTitle,
  storyText,
  values,
  milestones,
  "team": team[] {
    name,
    role,
    emoji,
    "photo": photo.asset->url
  },
  stats
}`;

// Size chart
export const SIZE_CHART_QUERY = `*[_type == "sizeChart"] | order(category asc) {
  _id,
  category,
  headers,
  rows
}`;

// Contact info
export const CONTACT_INFO_QUERY = `*[_type == "contactInfo"][0] {
  address,
  email,
  phone,
  businessHours,
  instagram,
  tiktok,
  whatsappLink,
  faqs
}`;

// Produk by ID
export const PRODUCT_BY_ID_QUERY = `*[_type == "product" && _id == $id][0] {
  _id,
  name,
  slug,
  category,
  season,
  gender,
  age,
  price,
  oldPrice,
  badge,
  sizes,
  sizeChartHeaders,
  sizeChartRows,
  "SizeGuideImage": sizeGuideImage.asset->url,
  "colors": colors[].hex.hex,
  "image": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  inStock,
  featured,
  _createdAt
}`

// Related products
export const RELATED_PRODUCTS_QUERY = `*[_type == "product" && category == $category && _id != $id][0...4] {
  _id,
  name,
  category,
  age,
  price,
  badge,
  "colors": colors[].hex.hex,
  "image": mainImage.asset->url,
}`;

export const CATALOG_PAGE_QUERY = `*[_type == "catalogPage"][0] {
heroTitle,
heroSubtitle,
collections[] {
title,
    subtitle,
    description,
    badge,
    link,
    "image": image.asset->url,
  },
  promoBanner {
    title,
    subtitle,
    ctaText,
    ctaLink,
    "image": image.asset->url,
  },
  lookbook[] {
    caption,
    "image": image.asset->url,
  },
  footerQuote
  }`;

  