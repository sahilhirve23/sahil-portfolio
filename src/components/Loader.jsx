// src/components/Loader.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const waveRef = useRef(null);

  useEffect(() => {
    // Your original pulse animation
    gsap.to([".sahil-group", ".hirve-group"], {
      scale: 1.1,
      duration: 1,
      repeat: 3,
      yoyo: true,
      delay: 4.6,
      ease: "easeInOut",
    });

    // --- NEW EXIT ANIMATION ---
    // This timeline starts after 8 seconds and calls onComplete when done
    const exitTimeline = gsap.timeline({ delay: 8, onComplete });

    // 1. Fade out "ahil" and the entire "Hirve" group
    exitTimeline.to(
      [".sahil-group > span:last-child", ".hirve-group"],
      {
        duration: 0.5,
        opacity: 0,
        ease: "power3.in",
      },
      "start_exit" // Use a label to sync animations
    );

    // 2. Simultaneously, fade out the main loader background
    exitTimeline.to(
      ".loader-container",
      {
        duration: 1.5,
        opacity: 0,
        ease: "power3.inOut",
      },
      "start_exit"
    );

    // 3. Zoom into the "S" and fade it out
    exitTimeline.to(
      ".sahil-group > span:first-child", // Target only the "S"
      {
        duration: 1.5,
        scale: 50, // Zoom in massively
        opacity: 0, // Fade out while zooming
        ease: "power3.in",
      },
      "start_exit" // Start zoom at the same time
    );

  }, [onComplete]);

  return (
    <div className="loader-container fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden z-50 text-white px-10">
      <div className="relative flex flex-row items-center justify-center h-32 w-full text-center gap-1 p-8">
        <motion.div
          className="sahil-group flex items-center justify-center"
          initial={{ x: 0 }}
          animate={{ x: -30 }}
          transition={{ delay: 1.8, duration: 1, ease: "easeInOut" }}
        >
          {/* --- "S" --- */}
          <motion.span
            className="text-7xl md:text-8xl font-bold text-transparent font-mato" // Added font-mato and text-transparent
            style={{ WebkitTextStroke: "2px #F97316" }} // Added orange border
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            S
          </motion.span>
          
          {/* --- "ahil" --- */}
          <motion.span
            className="text-7xl md:text-8xl font-bold text-transparent font-mato pl-1" // Added font-mato and text-transparent
            style={{ WebkitTextStroke: "2px #F97316" }} // Added orange border
            initial={{ opacity: 0, x: -60, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
            transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
          >
            ahil
          </motion.span>
        </motion.div>

        <motion.div
          className="hirve-group flex items-center justify-center pl-2"
          initial={{ x: 0 }}
          animate={{ x: 30 }}
          transition={{ delay: 3.6, duration: 1, ease: "easeInOut" }}
        >
          {/* --- "H" --- */}
          <motion.span
            className="text-7xl md:text-8xl font-bold text-transparent font-mato" // Added font-mato and text-transparent
            style={{ WebkitTextStroke: "2px #F97316" }} // Added orange border
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
          >
            H
          </motion.span>
          
          {/* --- "irve" --- */}
          <motion.span
            className="text-7xl md:text-8xl font-bold text-transparent font-mato pl-1" // Added font-mato and text-transparent
            style={{ WebkitTextStroke: "2px #F97316" }} // Added orange border
            initial={{ opacity: 0, x: -60, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
            transition={{ delay: 2.6, duration: 1.2, ease: "easeOut" }}
          >
            irve
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
