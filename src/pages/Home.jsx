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
        <h2 className="font-display text-xl md:text-2xl mb-4 md:mb-6">Shop by Category</h2>
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
          <h2 className="font-display text-xl md:text-2xl">New Arrivals</h2>
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
          <h2 className="font-display text-2xl md:text-3xl font-medium">
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
    </main>
  )
}