import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { client } from "../lib/sanity"
import { CATALOG_PAGE_QUERY } from "../lib/queries"

// Fallback data kalau Sanity belum diisi
const fallbackCollections = [
  {
    id: 1,
    title: "Spring Collection",
    description: "Light & breezy styles for warm days",
    badge: "New Season",
    bg: "bg-rose-50",
    emoji: "🌸",
    link: "/shop?category=tops",
  },
  {
    id: 2,
    title: "Prime Collection",
    description: "Everyday essentials, always in style",
    badge: "Best Seller",
    bg: "bg-sky-50",
    emoji: "⭐",
    link: "/shop?category=sets",
  },
  {
    id: 3,
    title: "Wonder Collection",
    description: "Bold prints for little adventurers",
    badge: "Limited",
    bg: "bg-amber-50",
    emoji: "✨",
    link: "/shop?category=outerwear",
  },
]

const fallbackLookbook = [
  { id: 1, caption: "Morning Play", bg: "bg-teal-50", emoji: "🌤️" },
  { id: 2, caption: "Weekend Out", bg: "bg-purple-50", emoji: "🎠" },
  { id: 3, caption: "Little Dreamers", bg: "bg-pink-50", emoji: "🌙" },
  { id: 4, caption: "Back to School", bg: "bg-yellow-50", emoji: "🎒" },
]

export default function Catalog() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(CATALOG_PAGE_QUERY)
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-heading text-gray-400 animate-pulse tracking-widest text-sm">
        Loading...
      </p>
    </div>
  )

  // Pakai data Sanity kalau ada, fallback ke hardcoded
  const heroTitle = data?.heroTitle || "The Kanoo Collection"
  const heroSubtitle = data?.heroSubtitle || "Thoughtfully designed kidswear for every little adventure — made to grow with them."
  const collections = data?.collections?.length > 0 ? data.collections : fallbackCollections
  const promoBanner = data?.promoBanner || null
  const lookbook = data?.lookbook?.length > 0 ? data.lookbook : fallbackLookbook
  const footerQuote = data?.footerQuote || "Made for little dreams"

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gray-50 border-b border-gray-100 px-4 md:px-16 py-14 md:py-24 text-center">
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-gray-400 mb-4">
          made for little dreams
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-gray-900 leading-tight">
          {heroTitle.includes("Collection") ? (
            <>
              {heroTitle.replace("Collection", "")}<br />
              <em className="italic font-normal text-gray-400">Collection</em>
            </>
          ) : heroTitle}
        </h1>
        <p className="font-sans text-sm text-gray-400 mt-5 max-w-sm mx-auto font-light leading-relaxed">
          {heroSubtitle}
        </p>
        <Link
          to="/shop"
          className="font-heading inline-block mt-8 text-xs tracking-widest uppercase bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
        >
          Shop the Collection
        </Link>
      </section>

      {/* COLLECTION CARDS */}
      <section className="px-4 md:px-16 py-14 md:py-20">
        <div className="text-center mb-10 md:mb-14">
          <p className="font-sans text-xs tracking-widest uppercase text-gray-400 mb-2">Curated for you</p>
          <h2 className="font-display text-2xl md:text-4xl">Our Collections</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
          {collections.map((col, i) => (
            <div
              key={col.id || col._id || i}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              {/* Image atau fallback emoji */}
              <div className={`${col.bg || "bg-gray-50"} aspect-[3/4] flex items-center justify-center relative overflow-hidden`}>
                {col.image ? (
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-[120px] md:text-[160px] opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-500 select-none">
                    {col.emoji || "👗"}
                  </span>
                )}

                {/* Badge */}
                {col.badge && (
                  <span className="absolute top-4 left-4 font-badge text-[10px] tracking-widest uppercase bg-white/80 backdrop-blur-sm text-gray-600 px-3 py-1 rounded-full">
                    {col.badge}
                  </span>
                )}

                {/* Bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-display text-2xl md:text-3xl">{col.title || col.name}</h3>
                  <p className="font-sans text-sm text-white/70 mt-1 font-light">{col.description || col.desc}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-white px-5 py-4 flex items-center justify-between">
                <span className="font-sans text-xs text-gray-400 tracking-wide font-light">
                  View full collection
                </span>
                <Link
                  to={col.link || `/shop`}
                  className="font-heading flex items-center gap-2 bg-gray-900 text-white text-xs tracking-widest uppercase px-5 py-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  Shop Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="mx-4 md:mx-16 mb-14 md:mb-20 rounded-2xl overflow-hidden bg-gray-900 text-white flex flex-col md:flex-row min-h-64 md:min-h-80">
        {promoBanner?.image ? (
          <div className="md:w-1/2 overflow-hidden">
            <img
              src={promoBanner.image}
              alt={promoBanner.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="md:w-1/2 bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center py-14 md:py-0">
            <span className="text-8xl md:text-9xl">👶🧒</span>
          </div>
        )}
        <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-14 py-10 md:py-0">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Limited Offer</p>
          <h2 className="font-display text-3xl md:text-4xl leading-snug">
            {promoBanner?.title ? (
              promoBanner.title
            ) : (
              <>Best Minimal<br /><em className="italic font-normal text-white/60">Collection</em></>
            )}
          </h2>
          <p className="font-sans text-sm text-white/50 mt-4 mb-8 font-light leading-relaxed max-w-xs">
            {promoBanner?.subtitle || "Soft, breathable fabrics meet timeless design — perfect for every little moment."}
          </p>
          <Link
            to={promoBanner?.ctaLink || "/shop"}
            className="font-heading self-start bg-white text-gray-900 text-xs tracking-widest uppercase px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            {promoBanner?.ctaText || "Shop Now"}
          </Link>
        </div>
      </section>

      {/* LOOKBOOK GRID */}
      <section className="px-4 md:px-16 pb-16 md:pb-24">
        <div className="text-center mb-10">
          <p className="font-sans text-xs tracking-widest uppercase text-gray-400 mb-2">Editorial</p>
          <h2 className="font-display text-2xl md:text-4xl">Lookbook</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {lookbook.map((item, i) => (
            <Link
              key={item.id || item._id || i}
              to="/shop"
              className={`group ${item.bg || "bg-gray-50"} rounded-xl overflow-hidden aspect-[4/5] flex flex-col items-center justify-end relative hover:shadow-md transition-all duration-300`}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.caption}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-7xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 select-none">
                  {item.emoji || "👗"}
                </span>
              )}
              <div className="relative z-10 w-full bg-white/80 backdrop-blur-sm px-4 py-3 text-center">
                <p className="font-heading text-xs font-medium text-gray-800">{item.caption || item.title}</p>
                {item.subtitle && (
                  <p className="font-sans text-[10px] text-gray-400 font-light mt-0.5">{item.subtitle}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER CATALOG */}
      <section className="border-t border-gray-100 bg-gray-50 px-4 md:px-16 py-10 text-center">
        <p className="font-display text-xl md:text-2xl text-gray-700">
          "{footerQuote}"
        </p>
        <p className="font-sans text-xs text-gray-400 mt-3 tracking-wide">— Kanoo Kidswear</p>
        <Link
          to="/shop"
          className="font-heading inline-block mt-6 text-xs tracking-widest uppercase border border-gray-300 px-8 py-3 rounded-full text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
        >
          Browse All Products
        </Link>
      </section>

    </main>
  )
}