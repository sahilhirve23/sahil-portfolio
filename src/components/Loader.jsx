import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const waveRef = useRef(null);

  useEffect(() => {
    // Progress % counter
    gsap.to({}, {
      duration: 4,
      ease: "none",
      onUpdate: function () {
        const p = Math.min(Math.round(this.progress() * 100), 100);
        setProgress(p);
      },
      onComplete: () => {
        gsap.to(".loader-container", {
          opacity: 0,
          duration: 1,
          delay: 0.5,
          onComplete,
        });
      },
    });

    // Sine wave movement
    gsap.to(waveRef.current, {
      x: "-50%",
      duration: 2,
      repeat: -1,
      ease: "linear",
    });
  }, [onComplete]);

  return (
    <div className="loader-container fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden z-50 text-white">
      {/* Animated Name Sequence */}
      <div className="relative text-6xl md:text-7xl font-bold tracking-wide text-orange-500 flex items-center justify-center h-32 overflow-hidden">
        {/* S */}
        <motion.span
          className="absolute"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          S
        </motion.span>

        {/* ahil */}
        <motion.span
          className="absolute left-1/2 transform -translate-x-[200%]"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          ahil
        </motion.span>

        {/* Sahil moves left */}
        <motion.div
          className="absolute"
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: "-150%", opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Sahil
        </motion.div>

        {/* H */}
        <motion.span
          className="absolute"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.1, duration: 0.6 }}
        >
          H
        </motion.span>

        {/* irve */}
        <motion.span
          className="absolute right-1/2 transform translate-x-[200%]"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          irve
        </motion.span>

        {/* Final alignment & fade out */}
        <motion.div
          className="absolute flex gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 0.8 }}
        >
          <motion.span
            animate={{ letterSpacing: "0.25em", opacity: 0 }}
            transition={{ delay: 4, duration: 1.5 }}
          >
            SAHIL
          </motion.span>
          <motion.span
            animate={{ letterSpacing: "0.25em", opacity: 0 }}
            transition={{ delay: 4, duration: 1.5 }}
          >
            HIRVE
          </motion.span>
        </motion.div>
      </div>

      {/* Wave Progress Bar */}
      <div className="absolute bottom-12 w-2/3 h-6 bg-gray-800 rounded-full overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 120 20"
          preserveAspectRatio="none"
        >
          <path
            ref={waveRef}
            d="M0,10 Q10,0 20,10 T40,10 T60,10 T80,10 T100,10 T120,10 V20 H0 Z"
            fill="url(#waveGradient)"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6600" />
              <stop offset="100%" stopColor="#ff3300" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Percentage Counter */}
      <div className="absolute bottom-12 right-[17%] text-xl font-mono text-orange-400">
        {progress}%
      </div>
    </div>
  );
}
