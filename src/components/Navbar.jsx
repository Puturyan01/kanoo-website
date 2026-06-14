import { useState, useRef, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [shopOpen, setShopOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const closeTimer = useRef(null)

  // ── SCROLL BEHAVIOR ──
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY

    // Sudah scroll ke bawah dari posisi awal
    setIsScrolled(currentY > 10)

    if (currentY < 10) {
      // Di paling atas — selalu tampil
      setIsVisible(true)
    } else if (currentY > lastScrollY.current) {
      // Scroll ke bawah — sembunyikan
      setIsVisible(false)
      setShopOpen(false)
    } else {
      // Scroll ke atas — tampilkan
      setIsVisible(true)
    }

    lastScrollY.current = currentY
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-8 h-14 flex items-center justify-between transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm"
            : "bg-white border-b border-gray-100"
        }`}
      >

        {/* ── LOGO ── */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/KANOO_4.png"
            alt="Kanoo icon"
            className="h-8 md:h-10 w-auto object-contain"
          />
          <img
            src="/KANOO_3.png"
            alt="Kanoo"
            className="h-6 md:h-8 w-auto object-contain"
          />
        </Link>

        {/* ── DESKTOP MENU ── */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <ul className="flex items-center gap-6 lg:gap-8 list-none m-0 p-0">

            {/* Shop + Dropdown */}
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`text-xs tracking-widest uppercase transition-colors flex items-center gap-1 ${isScrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-gray-900"}`}>
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
                <Link
                  to="/shop"
                  onClick={() => setShopOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-xs tracking-widest uppercase text-gray-700 font-medium hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  <span className="text-base">🛍️</span>
                  All Products
                </Link>
                {shopItems.map((item, i) => (
                  <Link
                    key={item.label}
                    to={`/shop?category=${item.category}`}
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
              <Link to="/catalog" className={`text-xs tracking-widest uppercase transition-colors ${isScrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-gray-900"}`}>
                Catalog
              </Link>
            </li>
            <li>
              <a className={`text-xs tracking-widest uppercase transition-colors cursor-pointer ${isScrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-gray-900"}`}>
                Size Chart
              </a>
            </li>
            <li>
             <Link to="/about" className="text-xs tracking-widest uppercase transition-colors cursor-pointer">
                About
              </Link>
            </li>
            <Link to="/contact" className={'text-xs tracking-widest uppercase transition-colors ${isScrolled ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-gray-900"}'}>
              Contact
            </Link>
          </ul>

          {/* Desktop Icons */}
          <div className={`flex gap-4 items-center border-l pl-6 transition-colors ${isScrolled ? "border-gray-200 text-gray-500" : "border-gray-100 text-gray-400"}`}>
            <button aria-label="Cart" className="hover:text-gray-900 transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-teal-500 text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                0
              </span>
            </button>
          </div>
        </div>

        {/* ── MOBILE: Cart + Hamburger ── */}
        <div className="flex md:hidden items-center gap-3 text-gray-400">
          <button aria-label="Cart" className="hover:text-gray-900 transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-teal-500 text-white text-[9px] rounded-full flex items-center justify-center font-medium">
              0
            </span>
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="text-gray-700 hover:text-gray-900 transition-colors"
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

      {/* Spacer supaya konten tidak tertutup navbar fixed */}
      <div className="h-14" />

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-14 right-0 w-72 h-[calc(100vh-56px)] bg-white shadow-2xl transition-transform duration-300 overflow-y-auto flex flex-col ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Search */}
          <div className="px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent text-xs text-gray-500 placeholder-gray-300 outline-none w-full"
              />
            </div>
          </div>

          {/* Menu */}
          <ul className="list-none p-0 m-0 divide-y divide-gray-50 flex-1">
            <li>
              <button
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className="w-full flex items-center justify-between px-6 py-4 text-xs tracking-widest uppercase text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span className="flex items-center gap-3"><span>🛍️</span> Shop</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${mobileShopOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 bg-gray-50 ${mobileShopOpen ? "max-h-72" : "max-h-0"}`}>
                <Link to="/shop" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 pl-8 pr-6 py-3 text-xs tracking-widest uppercase text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors border-b border-gray-100">
                  <span>🛍️</span> All Products
                </Link>
                {shopItems.map((item) => (
                  <Link
                    key={item.label}
                    to={`/shop?category=${item.category}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 pl-8 pr-6 py-3 text-xs tracking-widest uppercase text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <span>{item.icon}</span> {item.label}
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <Link to="/catalog" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-6 py-4 text-xs tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors">
                <span>📖</span> Catalog
              </Link>
            </li>
            <li>
              <a className="flex items-center gap-3 px-6 py-4 text-xs tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                <span>📏</span> Size Chart
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-6 py-4 text-xs tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                <span>💛</span> About
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-6 py-4 text-xs tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                <span>✉️</span> Contact
              </a>
            </li>
          </ul>

          {/* Bottom drawer */}
          <div className="border-t border-gray-50 px-6 py-5">
            <div className="flex gap-4 text-gray-300 mb-4">
              <button className="hover:text-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-gray-300 tracking-wide">© 2025 Kanoo Kidswear</p>
          </div>
        </div>
      </div>
    </>
  )
}