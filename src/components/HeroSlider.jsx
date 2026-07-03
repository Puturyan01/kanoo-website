import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { client } from "../lib/sanity"
import { HERO_SLIDES_QUERY } from "../lib/queries"

export default function HeroSlider() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef(null)

  // Fetch slides dari Sanity
  useEffect(() => {
    client.fetch(HERO_SLIDES_QUERY)
      .then((data) => {
        setSlides(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Hero slides fetch error:", err)
        setLoading(false)
      })
  }, [])

  const goTo = (index) => {
    if (isTransitioning || index === current) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 700)
  }

  const next = () => {
    if (slides.length === 0) return
    goTo((current + 1) % slides.length)
  }

  // Auto-play
  useEffect(() => {
    if (slides.length === 0) return
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [current, slides.length])

  const textAlign = {
    left: "items-start text-left pl-16",
    center: "items-center text-center",
    right: "items-end text-right pr-16",
  }

  // Loading state
  if (loading) return (
    <section className="relative w-full h-[92vh] bg-gray-100 flex items-center justify-center">
      <p className="font-heading text-gray-400 animate-pulse tracking-widest text-sm">
        Loading...
      </p>
    </section>
  )

  // Fallback kalau Sanity belum ada slide
  if (slides.length === 0) return (
    <section className="relative w-full h-[92vh] bg-gray-100 flex items-center justify-center">
      <p className="font-heading text-gray-400 tracking-widest text-sm">
        No slides available
      </p>
    </section>
  )

  const slide = slides[current]

  return (
    <section className="relative w-full h-[92vh] overflow-hidden bg-gray-100">

      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s._id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      {/* Text overlay */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-end pb-20 px-8 ${
          textAlign[slide.textPosition] || textAlign.left
        }`}
      >
        <div
          className={`transition-all duration-700 ${
            isTransitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          {slide.label && (
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-white/70 mb-3 block">
              {slide.label}
            </span>
          )}
          <h1 className="font-display text-5xl md:text-6xl text-white leading-tight whitespace-pre-line mb-6">
            {slide.title}
          </h1>
          {slide.cta && slide.link && (
            <Link
              to={slide.link}
              className="font-heading inline-block text-xs tracking-widest uppercase bg-white text-gray-900 px-8 py-3 hover:bg-gray-100 transition-colors"
            >
              {slide.cta}
            </Link>
          )}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "bg-white w-6 h-1.5" : "bg-white/40 w-1.5 h-1.5"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow kiri */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Arrow kanan */}
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 z-30 text-white/50 font-sans text-xs tracking-widest">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

    </section>
  )
}