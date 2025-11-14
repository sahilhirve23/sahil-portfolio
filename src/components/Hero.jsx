import React, { useEffect } from "react";
import { motion } from "framer-motion";
// Restoring your local background image import
import heroBg from "../assets/images/hero-background.jpg";
// Restoring your gsap import
import gsap from "gsap";

export default function Hero({ scrollToSection, addToRefs, handleDownload }) {
  // Restoring your original gsap animation
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
      // The section is now just a relative container.
      // All flex/padding properties are moved to the content layer.
      className="relative h-screen"
    >
      {/* LAYER 1: BACKGROUND IMAGE (z-0) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed"
        style={{
          // Using your imported heroBg variable
          backgroundImage: `url(${heroBg})`,
        }}
      ></div>

      {/* LAYER 2: GRADIENT OVERLAY (z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="w-full h-full bg-gradient-to-r 
                        from-black/40 via-black/10 to-black/40"
        />
      </div>

      {/* LAYER 3: CONTENT (z-20) */}
      {/* This div now holds the layout (flex, padding) and content */}
      <div
        className="relative z-20 h-full w-full 
                   flex flex-col justify-center items-start pl-20"
      >
        <motion.h1
          id="hero-title"
          className="text-5xl md:text-6xl font-bold text-white"
          // We are using the gsap animation, so we don't need
          // the framer-motion `initial`, `animate`, `transition` props here.
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
          <button className="px-5 py-2 bg-orange-600 rounded-lg hover:bg-orange-500 transition">
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
