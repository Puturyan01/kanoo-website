import { Link } from "react-router-dom"

const collections = [
  {
    id: 1,
    name: "Spring Collection",
    desc: "Light & breezy styles for warm days",
    tag: "New Season",
    bg: "bg-rose-50",
    emoji: "🌸",
    category: "tops",
  },
  {
    id: 2,
    name: "Prime Collection",
    desc: "Everyday essentials, always in style",
    tag: "Best Seller",
    bg: "bg-sky-50",
    emoji: "⭐",
    category: "sets",
  },
  {
    id: 3,
    name: "Wonder Collection",
    desc: "Bold prints for little adventurers",
    tag: "Limited",
    bg: "bg-amber-50",
    emoji: "✨",
    category: "outerwear",
  },
]

const lookbook = [
  { id: 1, title: "Morning Play", subtitle: "Relaxed fits for active kids", bg: "bg-teal-50", emoji: "🌤️" },
  { id: 2, title: "Weekend Out", subtitle: "Stylish yet comfortable", bg: "bg-purple-50", emoji: "🎠" },
  { id: 3, title: "Little Dreamers", subtitle: "Soft fabrics for bedtime", bg: "bg-pink-50", emoji: "🌙" },
  { id: 4, title: "Back to School", subtitle: "Smart looks, easy wear", bg: "bg-yellow-50", emoji: "🎒" },
]

export default function Catalog() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="bg-gray-50 border-b border-gray-100 px-4 md:px-16 py-14 md:py-24 text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-4">
          made for little dreams
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-medium text-gray-900 leading-tight">
          The Kanoo<br />
          <em className="italic font-normal text-gray-400">Collection</em>
        </h1>
        <p className="text-sm text-gray-400 mt-5 max-w-sm mx-auto font-light leading-relaxed">
          Thoughtfully designed kidswear for every little adventure — made to grow with them.
        </p>
        <Link
          to="/shop"
          className="inline-block mt-8 text-xs tracking-widest uppercase bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
        >
          Shop the Collection
        </Link>
      </section>

      {/* ── COLLECTION CARDS ── */}
      <section className="px-4 md:px-16 py-14 md:py-20">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">Curated for you</p>
          <h2 className="font-serif text-2xl md:text-4xl font-medium">Our Collections</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
          {collections.map((col) => (
            <div key={col.id} className="group relative overflow-hidden rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
              {/* Tag */}
              <div className={`${col.bg} aspect-[3/4] flex items-center justify-center relative overflow-hidden`}>
                <span className="text-[120px] md:text-[160px] opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-500 select-none">
                  {col.emoji}
                </span>

                {/* Top tag */}
                <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase bg-white/80 backdrop-blur-sm text-gray-600 px-3 py-1 rounded-full">
                  {col.tag}
                </span>

                {/* Bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif text-2xl md:text-3xl font-medium">{col.name}</h3>
                  <p className="text-sm text-white/70 mt-1 font-light">{col.desc}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-white px-5 py-4 flex items-center justify-between">
                <span className="text-xs text-gray-400 tracking-wide font-light">
                  View full collection
                </span>
                <Link
                  to={`/shop?category=${col.category}`}
                  className="flex items-center gap-2 bg-gray-900 text-white text-xs tracking-widest uppercase px-5 py-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  Shop Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FULL-WIDTH BANNER ── */}
      <section className="mx-4 md:mx-16 mb-14 md:mb-20 rounded-2xl overflow-hidden bg-gray-900 text-white flex flex-col md:flex-row min-h-64 md:min-h-80">
        <div className="md:w-1/2 bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center py-14 md:py-0">
          <span className="text-8xl md:text-9xl">👶🧒</span>
        </div>
        <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-14 py-10 md:py-0">
          <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Limited Offer</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium leading-snug">
            Best Minimal<br />
            <em className="italic font-normal text-white/60">Collection</em>
          </h2>
          <p className="text-sm text-white/50 mt-4 mb-8 font-light leading-relaxed max-w-xs">
            Soft, breathable fabrics meet timeless design — perfect for every little moment.
          </p>
          <Link
            to="/shop"
            className="self-start bg-white text-gray-900 text-xs tracking-widest uppercase px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* ── LOOKBOOK GRID ── */}
      <section className="px-4 md:px-16 pb-16 md:pb-24">
        <div className="text-center mb-10">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">Editorial</p>
          <h2 className="font-serif text-2xl md:text-4xl font-medium">Lookbook</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {lookbook.map((item) => (
            <Link
              key={item.id}
              to="/shop"
              className={`group ${item.bg} rounded-xl overflow-hidden aspect-[4/5] flex flex-col items-center justify-end relative hover:shadow-md transition-all duration-300`}
            >
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-7xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 select-none">
                {item.emoji}
              </span>
              <div className="relative z-10 w-full bg-white/80 backdrop-blur-sm px-4 py-3 text-center">
                <p className="text-xs font-medium text-gray-800">{item.title}</p>
                <p className="text-[10px] text-gray-400 font-light mt-0.5">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FOOTER CATALOG ── */}
      <section className="border-t border-gray-100 bg-gray-50 px-4 md:px-16 py-10 text-center">
        <p className="font-serif text-xl md:text-2xl text-gray-700 italic font-light">
          "Made for little dreams"
        </p>
        <p className="text-xs text-gray-400 mt-3 tracking-wide">— Kanoo Kidswear</p>
        <Link
          to="/shop"
          className="inline-block mt-6 text-xs tracking-widest uppercase border border-gray-300 px-8 py-3 rounded-full text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
        >
          Browse All Products
        </Link>
      </section>

    </main>
  )
}