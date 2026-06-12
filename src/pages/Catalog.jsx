import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { products, categories, formatPrice } from "../data/products"
import ProductCard from "../components/ProductCard"

export default function Catalog() {
  const [searchParams] = useSearchParams()
  const initialCat = searchParams.get("category") || "all"

  const [activeCategory, setActiveCategory] = useState(initialCat)
  const [activeGender, setActiveGender] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filtered = products
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .filter((p) => activeGender === "all" || p.gender === activeGender)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      return b.id - a.id
    })

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex gap-3 items-center">
        <span className="text-[10px] uppercase tracking-widest text-gray-300 mr-2">Category</span>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`text-xs px-4 py-1.5 rounded-full border transition-colors ${
              activeCategory === cat.id
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-200 text-gray-500 hover:border-gray-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="px-8 py-8 flex gap-8 items-start">
        {/* Sidebar */}
        <aside className="w-48 shrink-0 bg-white border border-gray-100 rounded-xl p-5">
          <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-4">Filter</p>

          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-3">Gender</p>
            {["all", "girl", "boy", "unisex"].map((g) => (
              <label key={g} className="flex items-center gap-2 py-1 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={activeGender === g}
                  onChange={() => setActiveGender(g)}
                  className="accent-gray-900"
                />
                <span className="text-sm text-gray-500 capitalize">{g === "all" ? "All" : g}</span>
              </label>
            ))}
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-3">Age</p>
            {["0–2 tahun", "3–5 tahun", "6–8 tahun", "9–12 tahun"].map((age) => (
              <label key={age} className="flex items-center gap-2 py-1 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-gray-900" />
                <span className="text-sm text-gray-500">{age}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-400">Showing {filtered.length} products</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 cursor-pointer"
            >
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}