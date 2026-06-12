import { Link } from "react-router-dom"
import { products } from "../data/products"
import ProductCard from "../components/ProductCard"
import HeroSlider from "../components/HeroSlider"

export default function Home() {
  const newArrivals = products.filter((p) => p.badge === "new").slice(0, 4)

  return (
    <main>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Category Grid */}
      <section className="px-4 md:px-8 py-8 md:py-12 bg-gray-50">
        <h2 className="font-serif text-xl md:text-2xl mb-4 md:mb-6">Shop by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
          {[
            { label: "Tops", emoji: "👕", cat: "tops" },
            { label: "Bottoms", emoji: "👖", cat: "bottoms" },
            { label: "Sets", emoji: "👗", cat: "sets" },
            { label: "Outerwear", emoji: "🧥", cat: "outerwear" },
            { label: "Accessories", emoji: "👒", cat: "accessories" },
          ].map((cat) => (
            <Link
              key={cat.label}
              to={`/catalog?category=${cat.cat}`}
              className="bg-white border border-gray-100 rounded-xl p-4 md:p-6 flex flex-col items-center gap-2 md:gap-3 hover:border-gray-300 transition-colors"
            >
              <span className="text-2xl md:text-3xl">{cat.emoji}</span>
              <span className="text-[10px] md:text-xs tracking-widest uppercase text-gray-500 text-center">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="px-4 md:px-8 py-8 md:py-12 bg-white">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="font-serif text-xl md:text-2xl">New Arrivals</h2>
          <Link
            to="/catalog"
            className="text-xs tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="mx-4 md:mx-8 mb-8 md:mb-12 bg-gray-900 text-white rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-medium">
            New <em className="italic font-normal">arrivals</em> just landed
          </h2>
          <p className="text-sm text-gray-400 mt-2 font-light">
            Fresh styles for the new season — soft fabrics, playful prints
          </p>
        </div>
        <Link
          to="/catalog"
          className="bg-white text-gray-900 text-xs tracking-widest uppercase px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
        >
          Explore Collection
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white px-4 md:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="/KANOO_3.png"
            alt="Kanoo"
            className="h-6 w-auto object-contain mix-blend-multiply"
          />
          <p className="text-xs text-gray-300 text-center">
            © 2025 Kanoo Kidswear. Made with love in Indonesia.
          </p>
          <div className="flex gap-4 text-gray-300">
            {/* Instagram */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5}/>
              <circle cx="12" cy="12" r="4" strokeWidth={1.5}/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
            {/* TikTok */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer hover:text-gray-700 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
            </svg>
          </div>
        </div>
      </footer>
    </main>
  )
}