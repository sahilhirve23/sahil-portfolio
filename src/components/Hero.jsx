// src/components/Hero.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero({ scrollToSection, addToRefs, handleDownload }) {
  // If you want any hero-only GSAP timelines (e.g. intro sparkles),
  // put them inside this useEffect. The hero->navbar morph ScrollTrigger
  // already lives in Navbar.jsx and uses #hero-title, so we don't duplicate it here.
  useEffect(() => {
    // Example: small entrance on mount (optional)
    gsap.fromTo(
      "#hero-title",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <section
      id="home"
      ref={addToRefs}
      className="h-screen flex flex-col justify-center items-center bg-[url('/assets/images/test1.jpg')] bg-cover bg-center relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>

      <motion.h1
        id="hero-title"
        className="text-5xl md:text-6xl font-bold text-orange-500 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        SAHIL HIRVE
      </motion.h1>

      <motion.p
        className="text-base md:text-lg mt-4 text-gray-300 z-10 max-w-xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Business Analyst | AI/ML Enthusiast | Researcher | Developer
      </motion.p>

      <div className="flex gap-4 mt-6 z-10">
        <button
          onClick={handleDownload}
          className="px-5 py-2 bg-orange-600 rounded-lg hover:bg-orange-500 transition"
        >
          View My Profile
        </button>

        <button
          onClick={() => scrollToSection("about")}
          className="px-5 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          Contact Me
        </button>
      </div>
    </section>
  );
}
