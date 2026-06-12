import { useState, useRef } from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [shopOpen, setShopOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const closeTimer = useRef(null)

  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current)
    setShopOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setShopOpen(false), 150)
  }

  const shopItems = [
    { label: "Hat", icon: "👒", category: "accessories" },
    { label: "Top Wear", icon: "👕", category: "tops" },
    { label: "Bottom Wear", icon: "👖", category: "bottoms" },
    { label: "Shoes", icon: "👟", category: "shoes" },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 md:px-8 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-serif text-xl tracking-wide font-semibold">
          Kanoo<span className="italic font-normal"></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <ul className="flex items-center gap-6 lg:gap-8 list-none m-0 p-0">

            {/* Shop Dropdown */}
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-xs tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1">
                Shop
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              <div
                className={`absolute top-full left-0 mt-3 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden transition-all duration-200 ${
                  shopOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
                style={{ minWidth: "180px" }}
              >
                {shopItems.map((item, i) => (
                  <Link
                    key={item.label}
                    to={`/catalog?category=${item.category}`}
                    onClick={() => setShopOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3 text-xs tracking-widest uppercase text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors ${
                      i !== shopItems.length - 1 ? "border-b border-gray-50" : ""
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </li>

            <li>
              <Link to="/catalog" className="text-xs tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors">
                Catalog
              </Link>
            </li>
            <li>
              <a className="text-xs tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors cursor-pointer">
                Size Chart
              </a>
            </li>
            <li>
              <a className="text-xs tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors cursor-pointer">
                About
              </a>
            </li>
            <li>
              <a className="text-xs tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors cursor-pointer">
                Contact
              </a>
            </li>
          </ul>
          <div className="flex gap-4 items-center text-gray-400">
          </div>
        </div>

        {/* Mobile: Cart + Hamburger */}
        <div className="flex md:hidden items-center gap-4 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-14 right-0 w-72 h-[calc(100vh-56px)] bg-white shadow-xl transition-transform duration-300 overflow-y-auto ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="list-none p-0 m-0 divide-y divide-gray-50">

            {/* Shop accordion */}
            <li>
              <button
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className="w-full flex items-center justify-between px-6 py-4 text-xs tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors"
              >
                Shop
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${mobileShopOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Sub items */}
              <div className={`overflow-hidden transition-all duration-300 ${mobileShopOpen ? "max-h-60" : "max-h-0"}`}>
                {shopItems.map((item) => (
                  <Link
                    key={item.label}
                    to={`/catalog?category=${item.category}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 pl-10 pr-6 py-3 text-xs tracking-widest uppercase text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </li>

            <li>
              <Link
                to="/catalog"
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-4 text-xs tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors"
              >
                Catalog
              </Link>
            </li>
            <li>
              <a className="block px-6 py-4 text-xs tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                Size Chart
              </a>
            </li>
            <li>
              <a className="block px-6 py-4 text-xs tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                About
              </a>
            </li>
            <li>
              <a className="block px-6 py-4 text-xs tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                Contact
              </a>
            </li>

            {/* Mobile icons */}
            <li className="px-6 py-5 flex gap-5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z" />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}