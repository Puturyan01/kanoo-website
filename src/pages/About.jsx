import { Link } from "react-router-dom"

const team = [
  { name: "Ayu Puspita", role: "Founder & Creative Director", emoji: "👩‍🎨" },
  { name: "Budi Santoso", role: "Head of Production", emoji: "👨‍🏭" },
  { name: "Citra Dewi", role: "Lead Designer", emoji: "👩‍💼" },
]

const values = [
  {
    icon: "🌿",
    title: "Sustainable Materials",
    desc: "We use only eco-friendly, OEKO-TEX certified fabrics that are safe for your little ones and the planet.",
  },
  {
    icon: "💛",
    title: "Made with Love",
    desc: "Every piece is carefully crafted with attention to detail, ensuring the highest quality for your child.",
  },
  {
    icon: "🌱",
    title: "Grow with Them",
    desc: "Our designs are thoughtfully made to last through growth spurts and countless adventures.",
  },
  {
    icon: "🤝",
    title: "Local Production",
    desc: "Proudly made in Indonesia, supporting local artisans and keeping our carbon footprint minimal.",
  },
]

const milestones = [
  { year: "2020", event: "Kanoo was born from a small studio in Bali" },
  { year: "2021", event: "Launched first Summer Collection — sold out in 3 days" },
  { year: "2022", event: "Expanded to 5 cities across Indonesia" },
  { year: "2023", event: "Reached 10,000+ happy families" },
  { year: "2024", event: "Introduced sustainable fabric line" },
  { year: "2025", event: "Launched online catalog & global shipping" },
]

export default function About() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-gray-900 text-white px-4 md:px-16 py-20 md:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-[200px] leading-none select-none">KANOO.</div>
          <div className="absolute bottom-10 right-10 text-[150px] leading-none select-none">👶</div>
        </div>

        <div className="relative z-10 max-w-3xl">
          <p className="text-xs tracking-[0.25em] uppercase text-white/50 mb-4">Our Story</p>
          <h1 className="font-serif text-4xl md:text-6xl font-medium leading-tight mb-6">
            Made for <em className="italic font-normal text-white/60">little</em><br />
            dreams
          </h1>
          <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-lg font-light">
            Kanoo was born from a simple belief — that children deserve clothing as 
            joyful, comfortable, and full of life as they are.
          </p>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="px-4 md:px-16 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Who We Are</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-gray-900 leading-tight mb-6">
              A brand built on<br />
              <em className="italic font-normal text-gray-400">love & craft</em>
            </h2>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed font-light">
              <p>
                Kanoo started in 2020 in a small studio in Bali, Indonesia. 
                What began as a passion project between a group of young parents 
                quickly grew into a beloved children's wear brand.
              </p>
              <p>
                We noticed that most kids' clothing prioritized trends over comfort — 
                so we flipped the script. Every Kanoo piece starts with the question: 
                <em className="text-gray-600"> "Will a child love wearing this?"</em>
              </p>
              <p>
                Today, Kanoo dresses thousands of little ones across Indonesia and beyond, 
                and we're just getting started.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-block mt-8 text-xs tracking-widest uppercase bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              Shop the Collection
            </Link>
          </div>

          {/* Image placeholder */}
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[3/4] bg-teal-50 rounded-2xl flex items-center justify-center">
              <span className="text-6xl">👶</span>
            </div>
            <div className="aspect-[3/4] bg-rose-50 rounded-2xl flex items-center justify-center mt-6">
              <span className="text-6xl">🧒</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-gray-50 px-4 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">What We Stand For</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-gray-900">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {values.map((val) => (
              <div key={val.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-colors">
                <span className="text-3xl block mb-4">{val.icon}</span>
                <h3 className="font-medium text-gray-900 text-sm mb-2">{val.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MILESTONES ── */}
      <section className="px-4 md:px-16 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">How Far We've Come</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-gray-900">Our Journey</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className={`bg-white border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors inline-block w-full md:w-auto md:max-w-xs ${
                    i % 2 === 0 ? "md:ml-auto" : ""
                  }`}>
                    <p className="font-serif text-2xl font-medium text-teal-600 mb-1">{m.year}</p>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">{m.event}</p>
                  </div>
                </div>

                {/* Dot */}
                <div className="hidden md:flex w-4 h-4 bg-teal-500 rounded-full border-4 border-white shadow shrink-0 z-10" />

                {/* Empty space for alternating */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-gray-50 px-4 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">The People Behind Kanoo</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-gray-900">Meet the Team</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:border-gray-200 transition-colors">
                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{member.emoji}</span>
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-1">{member.name}</h3>
                <p className="text-xs text-gray-400 font-light">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="px-4 md:px-16 py-16 md:py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: "10K+", label: "Happy Families" },
            { number: "50+", label: "Products" },
            { number: "5", label: "Cities" },
            { number: "2020", label: "Est. Year" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-4xl md:text-5xl font-medium text-teal-600 mb-2">{stat.number}</p>
              <p className="text-xs tracking-widest uppercase text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-4 md:mx-16 mb-16 bg-gray-900 text-white rounded-2xl px-8 md:px-16 py-12 md:py-16 text-center">
        <p className="text-xs tracking-widest uppercase text-white/40 mb-3">Join the Kanoo Family</p>
        <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
          Dress your little one<br />
          <em className="italic font-normal text-white/60">with love</em>
        </h2>
        <p className="text-sm text-white/50 mb-8 font-light max-w-md mx-auto">
          Explore our latest collection and find the perfect outfit for every little moment.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-white text-gray-900 text-xs tracking-widest uppercase px-10 py-4 rounded-full hover:bg-gray-100 transition-colors"
        >
          Shop Now
        </Link>
      </section>

    </main>
  )
}