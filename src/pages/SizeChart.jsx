import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { client } from "../lib/sanity"
import { SIZE_CHART_QUERY } from "../lib/queries"

const sizeData = {
  tops: {
    label: "Tops & Sets",
    icon: "/icons/tops.png",
    headers: ["Size", "Age", "Height (cm)", "Chest (cm)", "Weight (kg)"],
    rows: [
      ["3M", "0–3 months", "56–62", "40–42", "3–6"],
      ["6M", "3–6 months", "62–68", "42–44", "6–8"],
      ["12M", "6–12 months", "68–74", "44–46", "8–10"],
      ["18M", "12–18 months", "74–80", "46–48", "10–12"],
      ["2T", "1.5–2 years", "80–86", "48–50", "12–14"],
      ["3T", "2–3 years", "86–92", "50–52", "14–16"],
      ["4T", "3–4 years", "92–98", "52–54", "16–18"],
      ["5", "4–5 years", "98–104", "54–56", "18–20"],
      ["6", "5–6 years", "104–110", "56–58", "20–22"],
      ["8", "7–8 years", "116–122", "60–62", "24–28"],
      ["10", "9–10 years", "128–134", "64–66", "30–34"],
      ["12", "11–12 years", "140–146", "68–70", "36–42"],
    ],
    guideImage: "/sizeguide/tops-guide.jpg",
  },
  bottoms: {
    label: "Bottoms",
    icon: "/icons/bottoms.png",
    headers: ["Size", "Age", "Height (cm)", "Waist (cm)", "Hip (cm)"],
    rows: [
      ["3M", "0–3 months", "56–62", "38–40", "40–42"],
      ["6M", "3–6 months", "62–68", "40–42", "42–44"],
      ["12M", "6–12 months", "68–74", "42–44", "44–46"],
      ["18M", "12–18 months", "74–80", "44–46", "46–48"],
      ["2T", "1.5–2 years", "80–86", "46–48", "48–50"],
      ["3T", "2–3 years", "86–92", "48–50", "50–52"],
      ["4T", "3–4 years", "92–98", "50–52", "52–54"],
      ["5", "4–5 years", "98–104", "52–54", "54–56"],
      ["6", "5–6 years", "104–110", "54–56", "56–58"],
      ["8", "7–8 years", "116–122", "56–58", "60–62"],
      ["10", "9–10 years", "128–134", "58–60", "64–66"],
      ["12", "11–12 years", "140–146", "60–62", "68–70"],
    ],
    guideImage: null,
  },
  shoes: {
    label: "Shoes",
    icon: "/icons/shoes.png",
    headers: ["Size EU", "Size US", "Age", "Foot Length (cm)"],
    rows: [
      ["16", "1", "0–6 months", "9.5–10"],
      ["17", "2", "6–12 months", "10–10.5"],
      ["18", "3", "9–12 months", "10.5–11"],
      ["19", "4", "12–18 months", "11–11.5"],
      ["20", "4.5", "18–24 months", "11.5–12"],
      ["21", "5", "2 years", "12–12.5"],
      ["22", "6", "2–3 years", "12.5–13.5"],
      ["23", "7", "3–4 years", "13.5–14.5"],
      ["24", "8", "4 years", "14.5–15"],
      ["25", "8.5", "4–5 years", "15–15.5"],
      ["26", "9", "5 years", "15.5–16"],
      ["28", "10", "5–6 years", "16.5–17"],
      ["30", "12", "6–7 years", "17.5–18.5"],
      ["32", "1Y", "7–8 years", "19–20"],
    ],
    guideImage: null,
  },
  hats: {
    label: "Hats",
    icon: "/icons/hat.png",
    headers: ["Size", "Age", "Head Circumference (cm)"],
    rows: [
      ["XS", "0–3 months", "34–36"],
      ["S", "3–6 months", "36–38"],
      ["M", "6–12 months", "38–40"],
      ["L", "1–2 years", "40–42"],
      ["XL", "2–4 years", "42–44"],
      ["XXL", "4–8 years", "44–46"],
      ["XXXL", "8–12 years", "46–50"],
    ],
    guideImage: null,
  },
}

const tips = [
  {
    icon: "📏",
    title: "How to Measure Height",
    desc: "Have your child stand straight without shoes. Mark the top of the head and measure from the floor.",
  },
  {
    icon: "🔄",
    title: "Between Two Sizes?",
    desc: "Choose the larger size. Kids grow fast and looser clothing is more comfortable for movement.",
  },
  {
    icon: "📦",
    title: "After Washing",
    desc: "Cotton fabric may shrink slightly after washing. Use cold water and avoid wringing.",
  },
  {
    icon: "💬",
    title: "Still Confused?",
    desc: "Contact us via WhatsApp or email — we're happy to help you find the right size.",
  },
]

const howToMeasure = [
  {
    step: "01",
    title: "Height",
    desc: "Stand your child straight against a wall without shoes. Mark the top of the head and measure from the floor.",
    icon: "📐",
  },
  {
    step: "02",
    title: "Chest",
    desc: "Measure around the widest part of the chest, just under the arms. Make sure the tape is not too tight.",
    icon: "📏",
  },
  {
    step: "03",
    title: "Waist",
    desc: "Measure around the narrowest part of the waist, usually about 2–3 cm above the navel.",
    icon: "🔄",
  },
]

export default function SizeChart() {
  const [activeTab, setActiveTab] = useState("tops")
  const [highlightRow, setHighlightRow] = useState(null)
  const [remoteCharts, setRemoteCharts] = useState([])

  useEffect(() => {
    client.fetch(SIZE_CHART_QUERY)
    .then((data) => setRemoteCharts(Array.isArray(data) ? data : []))
    .catch((err) => console.error("Failed to fetch size charts:", err))
  }, [])

  const mergedSizeData = Object.fromEntries(
    Object.entries(sizeData).map(([key, fallback]) => {
      const remote = remoteCharts.find((chart) => chart.category === key)
      const rows = remote?.rows
      ?.map((row) => [row.size, ...(row.values || [])])
      .filter((row) => row[0])

      return [
        key,
        {
          ...fallback,
          headers: remote?.headers?.length ? remote.headers : fallback.headers,
          rows: rows?.length ? rows : fallback.rows,
          guideImage: remote?.guideImage || fallback.guideImage,
        },
      ]
    })
  )

  const current = mergedSizeData[activeTab]

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gray-50 border-b border-gray-100 px-4 md:px-16 py-14 md:py-20 text-center">
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-gray-400 mb-3">
          Sizing Guide
        </p>
        <h1 className="font-YellowCandy text-4xl md:text-5xl text-gray-900 leading-tight">
          Size <em className="italic font-normal text-gray-400">Guide</em>
        </h1>
        <p className="font-sans text-sm text-gray-400 mt-4 max-w-sm mx-auto font-light leading-relaxed">
          Find the perfect fit for your little one. All measurements are in centimeters (cm).
        </p>
      </section>

      {/* TIPS */}
      <section className="px-4 md:px-16 py-10 md:py-12 bg-teal-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {tips.map((tip) => (
            <div key={tip.title} className="bg-white rounded-xl p-4 border border-teal-100">
              <span className="text-2xl block mb-2">{tip.icon}</span>
              <p className="font-heading text-xs font-medium text-gray-800 mb-1">{tip.title}</p>
              <p className="font-sans text-[11px] text-gray-400 font-light leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SIZE TABLE */}
      <section className="px-4 md:px-16 py-12 md:py-16 max-w-5xl mx-auto">

        {/* Category tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
          {Object.entries(mergedSizeData).map(([key, val]) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setHighlightRow(null) }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase shrink-0 border transition-all ${
                activeTab === key
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-200 text-gray-500 hover:border-gray-400"
              }`}
            >
              <img src={val.icon} alt={val.label} className="w-4 h-4 object-contain" style={{ filter: activeTab === key ? "invert(1)" : "none" }} />
              <span className="font-heading">{val.label}</span>
            </button>
          ))}
        </div>

        {/* Size Guide Image */}
        {current.guideImage && (
          <div className="mb-6 rounded-2xl overflow-hidden border border-gray-100">
            <img
              src={current.guideImage}
              alt={`${current.label} Size Guide`}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-teal-600 text-white">
                {current.headers.map((h) => (
                  <th key={h} className="font-heading px-4 md:px-6 py-4 text-left text-[10px] tracking-widest uppercase font-medium whitespace-nowrap">
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
                      className={`px-4 md:px-6 py-3.5 whitespace-nowrap font-sans ${
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

        <p className="font-sans text-xs text-gray-300 mt-4 text-center font-light">
          Click a row to highlight the size you're looking for
        </p>
      </section>

      {/* HOW TO MEASURE */}
      <section className="bg-gray-50 px-4 md:px-16 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-sans text-xs tracking-widest uppercase text-gray-400 mb-2">Guide</p>
            <h2 className="font-display text-2xl md:text-3xl text-gray-900">
              How to Measure
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {howToMeasure.map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-3xl text-teal-200">{item.step}</span>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-heading font-medium text-gray-900 text-sm mb-2">{item.title}</h3>
                <p className="font-sans text-xs text-gray-400 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-16 py-12 md:py-16 text-center">
        <p className="font-display text-xl md:text-2xl text-gray-700 mb-2">
          "Still not sure about the size?"
        </p>
        <p className="font-sans text-sm text-gray-400 mb-6 font-light">
          Our team is ready to help — reach out anytime
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            to="/contact"
            className="font-heading text-xs tracking-widest uppercase bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            to="/shop"
            className="font-heading text-xs tracking-widest uppercase border border-gray-200 text-gray-600 px-8 py-3 rounded-full hover:border-gray-400 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

    </main>
  )
}
