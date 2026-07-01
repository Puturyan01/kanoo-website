import { useState, useRef, useEffect, useCallback } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"

export default function Navbar() {
  const [shopOpen, setShopOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const closeTimer = useRef(null)
  const location = useLocation()

  // ── SCROLL BEHAVIOR ──
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)

  // Pages where hero is DARK (dark bg at top) → navbar text should be light initially
  const darkHeroPages = ["/about"]
  // Pages where hero is LIGHT/WHITE (light bg at top) → navbar text always dark
  const lightHeroPages = ["/contact", "/size-chart", "/catalog", "/shop"]

  const isOnDarkHero = darkHeroPages.includes(location.pathname)
  const isOnLightHero = lightHeroPages.includes(location.pathname)

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY

    setIsScrolled(currentY > 10)

    if (currentY < 10) {
      setIsVisible(true)
    } else if (currentY > lastScrollY.current) {
      setIsVisible(false)
      setShopOpen(false)
    } else {
      setIsVisible(true)
    }

    lastScrollY.current = currentY
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Reset scroll state when navigating to a new page
  useEffect(() => {
    setIsScrolled(window.scrollY > 10)
    setMobileOpen(false)
  }, [location.pathname])

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

  // Determine navbar background & text color based on page + scroll state
  const navBg = isScrolled
    ? "bg-white/90 backdrop-blur-md border-b border-white/20 shadow-sm"
    : isOnDarkHero
    ? "bg-transparent border-b border-white/10"
    : "bg-white border-b border-gray-100"

  // Text color for nav links
  const getLinkColor = (isActive) => {
    if (isScrolled || isOnLightHero) {
      // Scrolled or light-hero page → always dark text
      return isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-900"
    } else if (isOnDarkHero) {
      // Dark hero page, not scrolled → light text
      return isActive ? "text-white" : "text-white/60 hover:text-white"
    }
    // Default
    return isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-900"
  }

  // Active indicator color
  const indicatorColor = (isScrolled || isOnLightHero)
    ? "bg-gray-900"
    : isOnDarkHero
    ? "bg-white"
    : "bg-gray-900"

  // Check if shop routes are active
  const isShopActive = location.pathname.startsWith("/shop") || location.pathname.startsWith("/product")

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-8 h-14 flex items-center justify-between transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${navBg}`}
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
              <button className={`relative text-xs tracking-widest uppercase transition-colors flex items-center gap-1 pb-1 group ${getLinkColor(isShopActive)}`}>
                Shop
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {/* Active underline indicator */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-300 ${indicatorColor} ${
                    isShopActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                  style={{ transformOrigin: "center" }}
                />
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

            {/* Catalog */}
            <li>
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  `relative text-xs tracking-widest uppercase transition-colors pb-1 block group ${getLinkColor(isActive)}`
                }
              >
                {({ isActive }) => (
                  <>
                    Catalog
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-300 ${indicatorColor} ${
                        isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                      }`}
                      style={{ transformOrigin: "center" }}
                    />
                  </>
                )}
              </NavLink>
            </li>

            {/* Size Chart */}
            <li>
              <NavLink
                to="/size-chart"
                className={({ isActive }) =>
                  `relative text-xs tracking-widest uppercase transition-colors pb-1 block group ${getLinkColor(isActive)}`
                }
              >
                {({ isActive }) => (
                  <>
                    Size Chart
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-300 ${indicatorColor} ${
                        isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                      }`}
                      style={{ transformOrigin: "center" }}
                    />
                  </>
                )}
              </NavLink>
            </li>

            {/* About */}
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `relative text-xs tracking-widest uppercase transition-colors pb-1 block group ${getLinkColor(isActive)}`
                }
              >
                {({ isActive }) => (
                  <>
                    About
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-300 ${indicatorColor} ${
                        isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                      }`}
                      style={{ transformOrigin: "center" }}
                    />
                  </>
                )}
              </NavLink>
            </li>

            {/* Contact */}
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `relative text-xs tracking-widest uppercase transition-colors pb-1 block group ${getLinkColor(isActive)}`
                }
              >
                {({ isActive }) => (
                  <>
                    Contact
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-300 ${indicatorColor} ${
                        isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                      }`}
                      style={{ transformOrigin: "center" }}
                    />
                  </>
                )}
              </NavLink>
            </li>
          </ul>

          {/* Desktop Icons */}
          <div className={`flex gap-4 items-center border-l pl-6 transition-colors ${
            (isScrolled || isOnLightHero) ? "border-gray-200 text-gray-500" : 
            isOnDarkHero ? "border-white/20 text-white/60" :
            "border-gray-100 text-gray-400"
          }`}>
          </div>
        </div>

        {/* ── MOBILE: Hamburger ── */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className={`transition-colors ${
              (isScrolled || isOnLightHero) ? "text-gray-700 hover:text-gray-900" :
              isOnDarkHero ? "text-white/80 hover:text-white" :
              "text-gray-700 hover:text-gray-900"
            }`}
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
          {/* Menu */}
          <ul className="list-none p-0 m-0 divide-y divide-gray-50 flex-1">
            <li>
              <button
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className={`w-full flex items-center justify-between px-6 py-4 text-xs tracking-widest uppercase transition-colors ${
                  isShopActive ? "text-gray-900 font-semibold" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span>🛍️</span> Shop
                  {isShopActive && <span className="w-1.5 h-1.5 rounded-full bg-gray-900 ml-1" />}
                </span>
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

            {[
              { to: "/catalog", icon: "📖", label: "Catalog" },
              { to: "/size-chart", icon: "📏", label: "Size Chart" },
              { to: "/about", icon: "✨", label: "About" },
              { to: "/contact", icon: "💬", label: "Contact" },
            ].map(({ to, icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-6 py-4 text-xs tracking-widest uppercase transition-colors ${
                      isActive ? "text-gray-900 font-semibold" : "text-gray-600 hover:text-gray-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="flex items-center gap-3">
                        <span>{icon}</span> {label}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-gray-900 ml-1" />}
                      </span>
                      {isActive && (
                        <span className="w-1 h-4 rounded-full bg-gray-900 opacity-30" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
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