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
      className="relative h-screen flex flex-col justify-center items-start pl-20 overflow-hidden"
    >

      {/* BACKGROUND IMAGE (Layer 1) */}
      <img
        src={heroBg}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-center -z-20"
      />

      {/* LEFT + RIGHT GRADIENT OVERLAY (Layer 2) */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.85),rgba(0,0,0,0)_25%,rgba(0,0,0,0)_75%,rgba(0,0,0,0.85))]"></div>

      {/* TITLE (Layer 3) */}
      <motion.h1
        id="hero-title"
        className="text-5xl md:text-6xl font-bold text-white relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        SAHIL HIRVE
      </motion.h1>

      {/* TAGLINE */}
      <motion.p
        className="text-base md:text-lg mt-4 text-gray-300 z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Business Analyst | AI/ML Enthusiast | Researcher | Developer
      </motion.p>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-6 z-10">
        <button
          onClick={handleDownload}
          className="px-5 py-2 bg-orange-600 rounded-lg hover:bg-orange-500 transition"
        >
          View My Profile
        </button>

        <button
          onClick={() => scrollToSection('about')}
          className="px-5 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          Contact Me
        </button>
      </div>

    </section>
  );
}
