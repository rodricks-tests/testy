"use client";
import React, { useEffect, useState } from "react";
import LiveCountBar from "./LiveCountBar";

const slides = ["/landing1.png", "/landingpic2.svg", "/landingpic3.svg"];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-play slides every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full min-h-[70vh] bg-black text-white overflow-hidden"
        aria-label="BIDZY promotional hero"
      >
        {/* Background image slideshow */}
        <div className="absolute inset-0">
          {slides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Auction showcase ${i + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                i === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex flex-col items-center justify-center px-6 pb-16 pt-24 text-center md:px-12 lg:px-20 max-w-5xl">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl text-white drop-shadow-md">
            Welcome to <span className="text-yellow-400">BIDZY</span>
          </h1>

          <h2 className="mt-3 text-lg font-semibold tracking-wide text-white/90">
            Where Every Bid Counts
          </h2>

          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/85">
            Join thousands of users placing live bids on a wide range of
            products. From gadgets to fashion, antiques to vehicles — score
            unbeatable deals with just a click.
          </p>

          <p className="mt-6 text-xl font-semibold text-white">
            Watch <span className="mx-1 text-yellow-300">•</span> Bid{" "}
            <span className="mx-1 text-yellow-300">•</span> Win
          </p>
          <div className="mt-8">
            <LiveCountBar />
          </div>
        </div>

        {/* Carousel dots */}
        <nav
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3"
          aria-label="Slide indicators"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveSlide(i)}
              className={`h-3 w-3 rounded-full border border-white shadow-md transition-all ${
                i === activeSlide
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === activeSlide ? "true" : undefined}
            />
          ))}
        </nav>
      </section>
    </>
  );
}

export default Hero;
