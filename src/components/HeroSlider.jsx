import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { heroSlides } from "../data/products"

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef(null)

  const goTo = (index) => {
    if (isTransitioning || index === current) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 700)
  }

  const next = () => goTo((current + 1) % heroSlides.length)

  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [current])

  const slide = heroSlides[current]

  const textAlign = {
    left: "items-start text-left pl-16",
    center: "items-center text-center",
    right: "items-end text-right pr-16",
  }

  return (
    <section className="relative w-full h-[92vh] overflow-hidden bg-gray-100">
      {/* Slides */}
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay gelap tipis */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      {/* Text overlay */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-end pb-20 px-8 ${textAlign[slide.position]}`}
      >
        <div
          className={`transition-all duration-700 ${
            isTransitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <span className="text-xs tracking-[0.2em] uppercase text-white/70 mb-3 block">
            {slide.label}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-white leading-tight whitespace-pre-line mb-6">
            {slide.title}
          </h1>
          <Link
            to={slide.link}
            className="inline-block text-xs tracking-widest uppercase bg-white text-gray-900 px-8 py-3 hover:bg-gray-100 transition-colors"
          >
            {slide.cta}
          </Link>
        </div>
      </div>

      {/* Dot indicators (seperti Hanaka) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "bg-white w-6 h-1.5"
                : "bg-white/40 w-1.5 h-1.5"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow navigasi kiri/kanan */}
      <button
        onClick={() => goTo((current - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % heroSlides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 z-30 text-white/50 text-xs tracking-widest">
        {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
      </div>
    </section>
  )
}