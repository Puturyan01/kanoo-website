import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { products, formatPrice } from "../data/products"

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === parseInt(id))

  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [sizeError, setSizeError] = useState(null)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-sm">Product not found.</p>
        <Link to="/shop" className="text-xs tracking-widest uppercase underline text-gray-500">
          Back to Shop
        </Link>
      </div>
    )
  }

  const galleryImages = product.gallery || [product.image]

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="px-4 md:px-12 py-4 flex items-center gap-2 text-xs text-gray-300 border-b border-gray-50">
        <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-gray-600 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-gray-500">{product.name}</span>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-12 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto">

        {/* LEFT: Image */}
        <div className="flex flex-col gap-3">
        {/* Main image */}
        <div className="aspect-[4/5] bg-gray-50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-100">
          {(mainImage || galleryImages[0]) ? (
            <img
              src={mainImage || galleryImages[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[120px]">👗</span>
          )}

            {product.badge && (
              <span className={`absolute top-4 left-4 text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-medium ${
                product.badge === "new"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-orange-50 text-orange-700"
              }`}>
                {product.badge === "new" ? "New Arrival" : "On Sale"}
              </span>
            )}
          </div>

        {/* Thumbnail row */}
        <div className={`grid gap-2 ${galleryImages.length === 3 ? "grid-cols-3" : galleryImages.length === 4 ? "grid-cols-4" : "grid-cols-2"}`}>
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setMainImage(img)}
              className={`aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 transition-colors ${
                (mainImage || galleryImages[0]) === img ? "border-gray-900" : "border-transparent hover:border-gray-200"
              }`}
            >
              <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* RIGHT: Info */}
        <div className="flex flex-col">
          {/* Category + Age */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] tracking-widest uppercase text-gray-300 bg-gray-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <span className="text-[10px] tracking-widest uppercase text-gray-300">
              {product.age}
            </span>
          </div>

          {/* Name */}
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-gray-900 leading-tight mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-medium text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-base text-gray-300 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            {product.oldPrice && (
              <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full">
                Save {Math.round((1 - product.price / product.oldPrice) * 100)}%
              </span>
            )}
          </div>

          <div className="w-12 h-px bg-gray-100 mb-6" />

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed mb-6 font-light">
            Crafted with premium soft fabric, perfect for active little ones. Breathable, easy to wash, and designed to grow with your child. Made with love for ages {product.age}.
          </p>

          {/* Color selector */}
          <div className="mb-6">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">
              Color — <span className="text-gray-600 font-medium capitalize">Option {selectedColor + 1}</span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === i
                      ? "border-gray-900 scale-110"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className={`text-xs tracking-widest uppercase ${sizeError ? "text-red-400" : "text-gray-400"}`}>
                Size {sizeError && "— Please select a size"}
              </p>
              <button className="text-xs text-gray-400 underline hover:text-gray-700 transition-colors">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setSizeError(false) }}
                  className={`min-w-[48px] px-3 py-2 text-xs border rounded-lg transition-all ${
                    selectedSize === size
                      ? "bg-gray-900 text-white border-gray-900"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">Quantity</p>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl w-fit px-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors text-lg"
              >
                −
              </button>
              <span className="text-sm font-medium w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart + Wishlist */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 rounded-xl text-sm tracking-widest uppercase font-medium transition-all ${
                addedToCart
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-900 text-white hover:bg-gray-700"
              }`}
            >
              {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
          </div>

          {/* Info badges */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              { icon: "🚚", label: "Free Shipping", sub: "Above Rp 300rb" },
              { icon: "↩️", label: "Easy Return", sub: "Within 7 days" },
              { icon: "✓", label: "Authentic", sub: "100% Original" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <span className="text-lg block mb-1">{item.icon}</span>
                <p className="text-[10px] font-medium text-gray-700">{item.label}</p>
                <p className="text-[9px] text-gray-400">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Details accordion */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between py-3 cursor-pointer">
              <p className="text-xs tracking-widest uppercase text-gray-500">Product Details</p>
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="text-xs text-gray-400 leading-relaxed pb-3 font-light">
              <p>• Material: 100% Premium Cotton</p>
              <p>• Machine washable at 30°C</p>
              <p>• Available in {product.colors.length} color{product.colors.length > 1 ? "s" : ""}</p>
              <p>• Sizes: {product.sizes.join(", ")}</p>
              <p>• Gender: {product.gender}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="px-4 md:px-12 py-10 md:py-14 border-t border-gray-50 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl md:text-2xl font-medium">You Might Also Like</h2>
            <Link to="/shop" className="text-xs tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 transition-colors group"
              >
                <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center border-b border-gray-100">
                  <span className="text-4xl">👗</span>
                </div>
                <div className="p-3">
                  <p className="text-[10px] text-gray-300 uppercase tracking-widest mb-1">{p.age}</p>
                  <p className="text-sm font-medium text-gray-900 mb-1">{p.name}</p>
                  <p className="text-sm font-medium">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  )
}