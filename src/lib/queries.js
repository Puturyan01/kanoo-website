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
  colors,
  "image": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  inStock,
  featured
}`

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
  colors,
  "image": mainImage.asset->url,
}`

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
  colors,
  "image": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  inStock,
  featured
}`

// Hero slides
export const HERO_SLIDES_QUERY = `*[_type == "heroSlide" && active == true] | order(order asc) {
  _id,
  title,
  label,
  cta,
  link,
  textPosition,
  "image": image.asset->url,
}`

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
}`

// Size chart
export const SIZE_CHART_QUERY = `*[_type == "sizeChart"] | order(category asc) {
  _id,
  category,
  headers,
  rows
}`

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
}`