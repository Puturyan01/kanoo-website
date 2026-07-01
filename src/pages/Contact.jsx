import { useState } from "react"
import { Link } from "react-router-dom"

const faqs = [
  {
    q: "Berapa lama pengiriman?",
    a: "Pengiriman reguler 3-5 hari kerja. Express 1-2 hari kerja untuk Jabodetabek dan Bali.",
  },
  {
    q: "Apakah bisa return atau tukar ukuran?",
    a: "Bisa! Kami menerima return dan tukar ukuran dalam 7 hari setelah produk diterima, selama produk belum dipakai dan tag masih terpasang.",
  },
  {
    q: "Apakah ada free ongkir?",
    a: "Free ongkir untuk pembelian di atas Rp 300.000 ke seluruh Indonesia.",
  },
  {
    q: "Bahan apa yang digunakan Kanoo?",
    a: "Kami menggunakan 100% premium cotton yang sudah tersertifikasi OEKO-TEX, aman untuk kulit bayi dan anak.",
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gray-50 border-b border-gray-100 px-4 md:px-16 pt-16 pb-14 md:pt-24 md:pb-20 text-center -mt-14">
        <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-3">Get in Touch</p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-gray-900 leading-tight">
          We'd love to <em className="italic font-normal text-gray-400">hear</em>
          <br />
          from you
        </h1>
        <p className="text-sm text-gray-400 mt-4 max-w-sm mx-auto font-light leading-relaxed">
          Have a question about sizing, orders, or just want to say hello? We're here for you.
        </p>
      </section>

      {/* CONTACT INFO + FORM */}
      <section className="px-4 md:px-16 py-14 md:py-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

        {/* LEFT: Contact Info */}
        <div>
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">Contact Info</p>
          <div className="space-y-6">
            {[
              {
                icon: "📍",
                title: "Visit Us",
                lines: ["Jl. Sunset Road No. 88", "Seminyak, Bali 80361", "Indonesia"],
              },
              {
                icon: "📧",
                title: "Email Us",
                lines: ["hello@kanookidswear.com", "support@kanookidswear.com"],
              },
              {
                icon: "📱",
                title: "Call or WhatsApp",
                lines: ["+62 812 3456 7890", "Mon–Sat, 09.00–17.00 WITA"],
              },
              {
                icon: "⏰",
                title: "Business Hours",
                lines: ["Monday – Friday: 09.00 – 17.00", "Saturday: 09.00 – 14.00", "Sunday: Closed"],
              },
            ].map((info) => (
              <div key={info.title} className="flex gap-4">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-lg">{info.icon}</span>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">{info.title}</p>
                  {info.lines.map((line, i) => (
                    <p key={i} className="text-sm text-gray-600 font-light">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Social Media */}
          <div className="mt-10">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Follow Us</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: "Instagram", icon: "📸", handle: "@kanookidswear" },
                { label: "TikTok", icon: "🎵", handle: "@kanookids" },
                { label: "WhatsApp", icon: "💬", handle: "Chat us" },
              ].map((social) => (
                <div
                  key={social.label}
                  className="flex items-center gap-2 border border-gray-100 rounded-xl px-4 py-2.5 hover:border-teal-200 hover:bg-teal-50 transition-colors cursor-pointer"
                >
                  <span className="text-base">{social.icon}</span>
                  <div>
                    <p className="text-[10px] text-gray-400">{social.label}</p>
                    <p className="text-xs text-gray-700 font-medium">{social.handle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div>
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">Send a Message</p>

          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-teal-50 rounded-2xl border border-teal-100">
              <span className="text-5xl mb-4">🎉</span>
              <h3 className="font-serif text-2xl font-medium text-gray-900 mb-2">
                Message Sent!
              </h3>
              <p className="text-sm text-gray-400 font-light max-w-xs leading-relaxed mb-6">
                Thanks for reaching out,{" "}
                <strong className="text-gray-700">{form.name}</strong>! We'll get
                back to you within 1-2 business days.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setForm({ name: "", email: "", subject: "", message: "" })
                }}
                className="text-xs tracking-widest uppercase border border-teal-300 text-teal-600 px-6 py-2.5 rounded-full hover:bg-teal-100 transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-gray-400 block mb-1.5">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-gray-400 block mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-gray-400 block mb-1.5">
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all bg-white"
                >
                  <option value="">Select a topic...</option>
                  <option value="order">Order &amp; Shipping</option>
                  <option value="return">Return &amp; Exchange</option>
                  <option value="product">Product Question</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-gray-400 block mb-1.5">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl text-sm tracking-widest uppercase font-medium transition-all ${
                  loading
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              <p className="text-xs text-gray-300 text-center font-light">
                We usually reply within 1-2 business days
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 px-4 md:px-16 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">Quick Answers</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-medium text-gray-800">{faq.q}</span>
                  <svg
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-4 text-sm text-gray-400 font-light leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="px-4 md:px-16 py-14 md:py-16 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-4 text-center">
          Find Us
        </p>
        <div className="bg-teal-50 rounded-2xl h-64 md:h-80 flex flex-col items-center justify-center border border-teal-100 gap-3">
          <span className="text-5xl">🗺️</span>
          <p className="text-sm text-gray-500 font-medium">
            Jl. Sunset Road No. 88, Seminyak, Bali
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase bg-white border border-teal-200 text-teal-600 px-6 py-2.5 rounded-full hover:bg-teal-50 transition-colors"
          >
            Open in Google Maps
          </a>
        </div>
      </section>

    </main>
  )
}