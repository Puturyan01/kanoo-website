import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { products, categories, formatPrice } from "../data/products"
import ProductCard from "../components/ProductCard"

export default function Shop() {
  const [searchParams] = useSearchParams()
  const initialCat = searchParams.get("category") || "all"

  const [activeCategory, setActiveCategory] = useState(initialCat)
  const [activeGender, setActiveGender] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = products
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .filter((p) => activeGender === "all" || p.gender === activeGender)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      return b.id - a.id
    })

  const SidebarContent = () => (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-4">Filter</p>
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-3">Gender</p>
        {["all", "girl", "boy", "unisex"].map((g) => (
          <label key={g} className="flex items-center gap-2 py-1 cursor-pointer">
            <input
              type="radio"
              name="gender"
              checked={activeGender === g}
              onChange={() => { setActiveGender(g); setFilterOpen(false) }}
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
      <div className="mt-6">
        <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-3">Price</p>
        {[
          { label: "All prices", value: "all" },
          { label: "Under Rp 150rb", value: "under150" },
          { label: "Rp 150 – 300rb", value: "150to300" },
          { label: "Above Rp 300rb", value: "above300" },
        ].map((p) => (
          <label key={p.value} className="flex items-center gap-2 py-1 cursor-pointer">
            <input type="radio" name="price" defaultChecked={p.value === "all"} className="accent-gray-900" />
            <span className="text-sm text-gray-500">{p.label}</span>
          </label>
        ))}
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── HEADER ── */}
      <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-8 md:py-10">
        <div className="max-w-5x1 mx-auto flex items-center gap-5">
            {/* Logo ikon */}
            <img
            src="/KANOO_4.png"
            alt="KANOO icon"
            className="h-16 md:h-20 w-auto object-countain mix-blend-multiply shrink-0"
            />
            {/* Text header */}
            <div>
                <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-1">Kano made for little dreams</p>
                <h1 className="font-serif text-3x1 md:text-4x1 font-medium"> Shop All</h1>
            </div>
        </div>
      </div>

      {/* ── CATEGORY TABS ── */}
      <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-3 flex gap-2 items-center overflow-x-auto scrollbar-hide">
        <span className="text-[10px] uppercase tracking-widest text-gray-300 mr-1 shrink-0 hidden md:block">
          Category
        </span>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`text-xs px-4 py-1.5 rounded-full border transition-colors shrink-0 ${
              activeCategory === cat.id
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-200 text-gray-500 hover:border-gray-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="px-4 md:px-8 py-6 md:py-8">
        {/* Mobile filter + sort */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 text-xs tracking-widest uppercase border border-gray-200 px-4 py-2 rounded-lg text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h18M7 8h10M11 12h2" />
            </svg>
            Filter
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>

        <div className="flex gap-6 md:gap-8 items-start">
          {/* Sidebar desktop */}
          <aside className="hidden md:block w-48 shrink-0 bg-white border border-gray-100 rounded-xl p-5 sticky top-20">
            <SidebarContent/>
          </aside>

          <div className="flex-1">
            {/* Desktop count + sort */}
            <div className="hidden md:flex items-center justify-between mb-5">
              <p className="text-sm text-gray-400">Showing {filtered.length} products</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700"
              >
                <option value="newest">Newest first</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>

            <p className="text-xs text-gray-400 mb-3 md:hidden">{filtered.length} products</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          filterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/30" onClick={() => setFilterOpen(false)} />
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 transition-transform duration-300 ${
            filterOpen ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-lg">Filter</h3>
            <button onClick={() => setFilterOpen(false)} className="text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <SidebarContent />
          <button
            onClick={() => setFilterOpen(false)}
            className="w-full mt-6 bg-gray-900 text-white text-xs tracking-widest uppercase py-3 rounded-xl"
          >
            Show {filtered.length} Products
          </button>
        </div>
      </div>

    </main>
  )
}