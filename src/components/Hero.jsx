import React, { useEffect } from "react";
import { motion } from "framer-motion";
// Your import "import heroBg from '../assets/images/hero-background.jpg';"
// was correct, but is removed here as this environment can't find the file.
//
// Your import "import gsap from 'gsap';" was also correct, but removed
// as the package isn't installed here.
// import heroBg from "../assets/images/hero-background.jpg";
// import gsap from "gsap";

export default function Hero({ scrollToSection, addToRefs, handleDownload }) {
  // Your original gsap animation code was correct.
  // I've commented it out and replaced it with a framer-motion
  // animation below to make this preview work.
  // useEffect(() => {
  //   gsap.fromTo(
  //     "#hero-title",
  //     { opacity: 0, y: 20 },
  //     { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
  //   );
  // }, []);

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
          // Using a placeholder image since heroBg isn't available here.
          backgroundImage: `url(https://analytics.hbs.edu/wp-content/uploads/sites/15/2020/10/BizAnalytics_vs_Intelligence-Hero.jpg)`,
        }}
      ></div>

      {/* LAYER 2: GRADIENT OVERLAY (z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="w-full h-full bg-gradient-to-r 
                        from-black/70 via-black/10 to-black/70"
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
          // Added this framer-motion animation as a replacement for gsap
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
