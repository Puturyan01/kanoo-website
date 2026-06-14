import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">

      {/* ── TOP SECTION ── */}
      <div className="px-4 md:px-16 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

        {/* Brand */}
        <div className="md:col-span-1">
          <img
            src="/KANOO_3.png"
            alt="Kanoo"
            className="h-8 w-auto object-contain mb-4"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="text-sm text-white/50 font-light leading-relaxed max-w-xs">
            Made for little dreams. Quality kidswear crafted with love for ages 0–12 years.
          </p>
          {/* Social */}
          <div className="flex gap-3 mt-6">
            {[
              { icon: "📸", label: "Instagram" },
              { icon: "🎵", label: "TikTok" },
              { icon: "💬", label: "WhatsApp" },
            ].map((s) => (
              <button
                key={s.label}
                aria-label={s.label}
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
              >
                <span className="text-sm">{s.icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Shop</p>
          <ul className="space-y-3">
            {[
              { label: "All Products", to: "/shop" },
              { label: "Hat", to: "/shop?category=accessories" },
              { label: "Top Wear", to: "/shop?category=tops" },
              { label: "Bottom Wear", to: "/shop?category=bottoms" },
              { label: "Shoes", to: "/shop?category=shoes" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="text-sm text-white/50 hover:text-white transition-colors font-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Company</p>
          <ul className="space-y-3">
            {[
              { label: "Catalog", to: "/catalog" },
              { label: "About Us", to: "/about" },
              { label: "Contact", to: "/contact" },
              { label: "Size Chart", to: "/size-chart" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="text-sm text-white/50 hover:text-white transition-colors font-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Contact</p>
          <ul className="space-y-3">
            {[
              { icon: "📍", text: "Jl. Sunset Road No. 88, Seminyak, Bali" },
              { icon: "📧", text: "hello@kanookidswear.com" },
              { icon: "📱", text: "+62 812 3456 7890" },
              { icon: "⏰", text: "Mon–Sat, 09.00–17.00 WITA" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-sm mt-0.5 shrink-0">{item.icon}</span>
                <span className="text-sm text-white/50 font-light leading-relaxed">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── NEWSLETTER ── */}
      <div className="border-t border-white/10 px-4 md:px-16 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-white mb-1">Stay in the loop</p>
            <p className="text-xs text-white/40 font-light">
              Get the latest arrivals and exclusive offers delivered to your inbox.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-64 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-teal-400 transition-all"
            />
            <button className="bg-teal-500 hover:bg-teal-400 text-white text-xs tracking-widest uppercase px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/10 px-4 md:px-16 py-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30 font-light">
            © 2025 Kanoo Kidswear. All rights reserved. Made with 💛 in Indonesia.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Shipping Policy"].map((item) => (
              <a
                key={item}
                className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer font-light"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}