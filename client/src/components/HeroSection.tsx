import heroBg from "@assets/hero-bg.png";

export default function HeroSection() {
  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Gradient bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20">
        <h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1] mb-6"
          data-testid="hero-headline"
        >
          Hawaii&apos;s First Reusable
          <br />
          <span className="text-[#C62828]">Moving Tote Rental</span>
        </h1>
        <p
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light"
          data-testid="hero-subheadline"
        >
          Premium heavy-duty totes delivered to your door.
          <br className="hidden sm:block" />
          No cardboard. No waste. Just move.
        </p>
        <button
          onClick={scrollToPricing}
          className="inline-flex items-center gap-2 bg-[#C62828] hover:bg-[#A51C1C] text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          data-testid="hero-cta"
        >
          Get Your Totes
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17l9.2-9.2M17 17V8H8" />
          </svg>
        </button>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#DAA520]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>First in Hawaii</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#4CAF50]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Sanitized Between Rentals</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#DAA520]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M16 12l-4-4-4 4M12 16V8"/></svg>
            <span>Zero-Waste Moving</span>
          </div>
        </div>
      </div>
    </section>
  );
}
