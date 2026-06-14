import { Link } from "react-router-dom"
import { formatPrice } from "../data/products"

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 transition-colors group block"
    >
      {/* Image */}
      <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center relative border-b border-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl md:text-5xl">👗</span>
        )}

        {product.badge && (
          <span className={`absolute top-2 left-2 text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-medium ${
            product.badge === "new"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-orange-50 text-orange-700"
          }`}>
            {product.badge === "new" ? "New" : "Sale"}
          </span>
        )}

        <div className="absolute top-2 right-2 w-7 h-7 bg-white border border-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z" />
          </svg>
        </div>
      </div>

      {/* Info */}
      <div className="p-2.5 md:p-3">
        <p className="text-[9px] md:text-[10px] text-gray-300 uppercase tracking-widest mb-1">{product.age}</p>
        <p className="text-xs md:text-sm font-medium text-gray-900 leading-snug mb-1.5">{product.name}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs md:text-sm font-medium">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-[10px] text-gray-300 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
        <div className="flex gap-1 mt-1.5">
          {product.colors.map((color, i) => (
            <div
              key={i}
              className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border border-gray-200"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}