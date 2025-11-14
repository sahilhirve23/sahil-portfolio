// src/components/Hero.jsx
import heroBg from "../assets/images/hero-background.jpg";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero({ scrollToSection, addToRefs, handleDownload }) {
  useEffect(() => {
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
      className="relative h-screen bg-cover bg-center md:bg-fixed flex flex-col justify-center items-start pl-20"
      style={{ backgroundImage: `url(${heroBg})` }}
    >

      {/* LEFT + RIGHT GRADIENT OVERLAY (proper transparency) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-r 
                        from-black/80 via-black/0 to-black/80" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        <motion.h1
          id="hero-title"
          className="text-5xl md:text-6xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          SAHIL HIRVE
        </motion.h1>

        <motion.p
          className="text-base md:text-lg mt-4 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Business Analyst | AI/ML Enthusiast | Researcher | Developer
        </motion.p>

        <div className="flex gap-4 mt-6">
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
      </div>

    </section>
  );
}
