import React, { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


export default function Hero({ scrollToSection, addToRefs, handleDownload }) {
  // Your original gsap animation code was correct.
  // I've commented it out and replaced it with a framer-motion
  // animation below to make this preview work.
  useEffect(() => {
  gsap.to("#hero-bg", {
    backgroundPositionX: "120%",   // moves background horizontally
    ease: "none",
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
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
  id="hero-bg"
  className="absolute inset-0 z-0 bg-cover bg-center"
  style={{
    backgroundImage: `url(https://analytics.hbs.edu/wp-content/uploads/sites/15/2020/10/BizAnalytics_vs_Intelligence-Hero.jpg)`
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
  // REMOVED "transition-all duration-300" to stop CSS from fighting GSAP
  className="text-7xl md:text-8xl font-extrabold text-white relative z-20"
  
  // REMOVED initial, whileInView, and transition. 
  // Your GSAP 'fromTo' in Navbar.jsx handles this now.

  whileHover={{
    // REMOVED 'scale' and 'opacity'. GSAP is in charge of those.
    // We can keep the color and stroke animations as GSAP isn't touching them.
    color: "rgba(255,255,255,0)",
    WebkitTextStroke: "2px #ff7a00",
  }}
>
  SAHIL HIRVE
</motion.h1>
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
