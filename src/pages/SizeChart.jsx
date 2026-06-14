import { useState } from "react"
import { Link } from "react-router-dom"

const sizeData = {
  tops: {
    label: "Tops & Sets",
    emoji: "👕",
    headers: ["Size", "Age", "Height (cm)", "Chest (cm)", "Weight (kg)"],
    rows: [
      ["3M", "0–3 bln", "56–62", "40–42", "3–6"],
      ["6M", "3–6 bln", "62–68", "42–44", "6–8"],
      ["12M", "6–12 bln", "68–74", "44–46", "8–10"],
      ["18M", "12–18 bln", "74–80", "46–48", "10–12"],
      ["2T", "1.5–2 thn", "80–86", "48–50", "12–14"],
      ["3T", "2–3 thn", "86–92", "50–52", "14–16"],
      ["4T", "3–4 thn", "92–98", "52–54", "16–18"],
      ["5", "4–5 thn", "98–104", "54–56", "18–20"],
      ["6", "5–6 thn", "104–110", "56–58", "20–22"],
      ["8", "7–8 thn", "116–122", "60–62", "24–28"],
      ["10", "9–10 thn", "128–134", "64–66", "30–34"],
      ["12", "11–12 thn", "140–146", "68–70", "36–42"],
    ],
  },
  bottoms: {
    label: "Bottoms",
    emoji: "👖",
    headers: ["Size", "Age", "Height (cm)", "Waist (cm)", "Hip (cm)"],
    rows: [
      ["3M", "0–3 bln", "56–62", "38–40", "40–42"],
      ["6M", "3–6 bln", "62–68", "40–42", "42–44"],
      ["12M", "6–12 bln", "68–74", "42–44", "44–46"],
      ["18M", "12–18 bln", "74–80", "44–46", "46–48"],
      ["2T", "1.5–2 thn", "80–86", "46–48", "48–50"],
      ["3T", "2–3 thn", "86–92", "48–50", "50–52"],
      ["4T", "3–4 thn", "92–98", "50–52", "52–54"],
      ["5", "4–5 thn", "98–104", "52–54", "54–56"],
      ["6", "5–6 thn", "104–110", "54–56", "56–58"],
      ["8", "7–8 thn", "116–122", "56–58", "60–62"],
      ["10", "9–10 thn", "128–134", "58–60", "64–66"],
      ["12", "11–12 thn", "140–146", "60–62", "68–70"],
    ],
  },
  shoes: {
    label: "Shoes",
    emoji: "👟",
    headers: ["Size EU", "Size US", "Age", "Foot Length (cm)"],
    rows: [
      ["16", "1", "0–6 bln", "9.5–10"],
      ["17", "2", "6–12 bln", "10–10.5"],
      ["18", "3", "9–12 bln", "10.5–11"],
      ["19", "4", "12–18 bln", "11–11.5"],
      ["20", "4.5", "18–24 bln", "11.5–12"],
      ["21", "5", "2 thn", "12–12.5"],
      ["22", "6", "2–3 thn", "12.5–13.5"],
      ["23", "7", "3–4 thn", "13.5–14.5"],
      ["24", "8", "4 thn", "14.5–15"],
      ["25", "8.5", "4–5 thn", "15–15.5"],
      ["26", "9", "5 thn", "15.5–16"],
      ["28", "10", "5–6 thn", "16.5–17"],
      ["30", "12", "6–7 thn", "17.5–18.5"],
      ["32", "1Y", "7–8 thn", "19–20"],
    ],
  },
  hats: {
    label: "Hats",
    emoji: "👒",
    headers: ["Size", "Age", "Head Circumference (cm)"],
    rows: [
      ["XS", "0–3 bln", "34–36"],
      ["S", "3–6 bln", "36–38"],
      ["M", "6–12 bln", "38–40"],
      ["L", "1–2 thn", "40–42"],
      ["XL", "2–4 thn", "42–44"],
      ["XXL", "4–8 thn", "44–46"],
      ["XXXL", "8–12 thn", "46–50"],
    ],
  },
}

const tips = [
  {
    icon: "📏",
    title: "Cara Ukur Tinggi",
    desc: "Ukur anak berdiri tegak tanpa alas kaki, dari ujung kepala sampai telapak kaki.",
  },
  {
    icon: "🔄",
    title: "Antara Dua Ukuran?",
    desc: "Pilih ukuran yang lebih besar. Anak tumbuh cepat dan pakaian longgar lebih nyaman untuk bergerak.",
  },
  {
    icon: "📦",
    title: "Setelah Cuci",
    desc: "Bahan cotton bisa menyusut sedikit setelah dicuci. Cuci dengan air dingin dan jangan diperas.",
  },
  {
    icon: "💬",
    title: "Masih Bingung?",
    desc: "Hubungi kami di WhatsApp atau email, kami siap bantu pilihkan ukuran yang tepat.",
  },
]

export default function SizeChart() {
  const [activeTab, setActiveTab] = useState("tops")
  const [highlightRow, setHighlightRow] = useState(null)

  const current = sizeData[activeTab]

  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="bg-gray-50 border-b border-gray-100 px-4 md:px-16 py-14 md:py-20 text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-3">Panduan Ukuran</p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-gray-900 leading-tight">
          Size <em className="italic font-normal text-gray-400">Guide</em>
        </h1>
        <p className="text-sm text-gray-400 mt-4 max-w-sm mx-auto font-light leading-relaxed">
          Temukan ukuran yang tepat untuk si kecil. Semua ukuran dalam sentimeter (cm).
        </p>
      </section>

      {/* ── TIPS ── */}
      <section className="px-4 md:px-16 py-10 md:py-12 bg-teal-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {tips.map((tip) => (
            <div key={tip.title} className="bg-white rounded-xl p-4 border border-teal-100">
              <span className="text-2xl block mb-2">{tip.icon}</span>
              <p className="text-xs font-medium text-gray-800 mb-1">{tip.title}</p>
              <p className="text-[11px] text-gray-400 font-light leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SIZE TABLE ── */}
      <section className="px-4 md:px-16 py-12 md:py-16 max-w-5xl mx-auto">

        {/* Category tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
          {Object.entries(sizeData).map(([key, val]) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setHighlightRow(null) }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase shrink-0 border transition-all ${
                activeTab === key
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-200 text-gray-500 hover:border-gray-400"
              }`}
            >
              <span>{val.emoji}</span>
              {val.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900 text-white">
                {current.headers.map((h) => (
                  <th key={h} className="px-4 md:px-6 py-4 text-left text-[10px] tracking-widest uppercase font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {current.rows.map((row, i) => (
                <tr
                  key={i}
                  onClick={() => setHighlightRow(highlightRow === i ? null : i)}
                  className={`border-t border-gray-50 cursor-pointer transition-colors ${
                    highlightRow === i
                      ? "bg-teal-50 border-teal-100"
                      : i % 2 === 0
                      ? "bg-white hover:bg-gray-50"
                      : "bg-gray-50/50 hover:bg-gray-100"
                  }`}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-4 md:px-6 py-3.5 whitespace-nowrap ${
                        j === 0
                          ? "font-semibold text-gray-900 text-sm"
                          : "text-gray-500 text-sm font-light"
                      } ${highlightRow === i && j === 0 ? "text-teal-700" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-300 mt-4 text-center font-light">
          Klik baris untuk highlight ukuran yang kamu cari
        </p>
      </section>

      {/* ── HOW TO MEASURE ── */}
      <section className="bg-gray-50 px-4 md:px-16 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">Panduan</p>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-gray-900">
              Cara Mengukur
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: "01",
                title: "Tinggi Badan",
                desc: "Berdirikan anak tegak tanpa alas kaki di dekat tembok. Tandai titik tertinggi kepala dan ukur dari lantai.",
                emoji: "📐",
              },
              {
                step: "02",
                title: "Lingkar Dada",
                desc: "Ukur melingkar di bagian terlebar dada, tepat di bawah ketiak. Pastikan meteran tidak terlalu ketat.",
                emoji: "📏",
              },
              {
                step: "03",
                title: "Lingkar Pinggang",
                desc: "Ukur di bagian terkecil pinggang, biasanya sekitar 2–3 cm di atas pusar.",
                emoji: "🔄",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-serif text-3xl text-teal-200 font-medium">{item.step}</span>
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 md:px-16 py-12 md:py-16 text-center">
        <p className="font-serif text-xl md:text-2xl text-gray-700 italic font-light mb-2">
          "Masih bingung pilih ukuran?"
        </p>
        <p className="text-sm text-gray-400 mb-6 font-light">
          Tim kami siap membantu — hubungi kami kapan saja
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            to="/contact"
            className="text-xs tracking-widest uppercase bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
          >
            Hubungi Kami
          </Link>
          <Link
            to="/shop"
            className="text-xs tracking-widest uppercase border border-gray-200 text-gray-600 px-8 py-3 rounded-full hover:border-gray-400 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

    </main>
  )
}