import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const waveRef = useRef(null);

  useEffect(() => {
    gsap.to([".sahil-group", ".hirve-group"], {
      scale: 1.1,
      duration: 1,
      repeat: 3,
      yoyo: true,
      delay: 4.6,
      ease: "easeInOut",
    });

    const exitTimeline = gsap.timeline({ delay: 8, onComplete });
    exitTimeline.to([".sahil-group, .hirve-group"], {
      duration: 1.8,
      scale: 8,
      opacity: 0,
      ease: "power3.inOut",
    });
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
          <motion.span
            className="text-7xl md:text-8xl font-bold text-orange-500"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            S
          </motion.span>
          <motion.span
            className="text-7xl md:text-8xl font-bold text-orange-500 pl-1"
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
          <motion.span
            className="text-7xl md:text-8xl font-bold text-orange-500"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
          >
            H
          </motion.span>
          <motion.span
            className="text-7xl md:text-8xl font-bold text-orange-500 pl-1"
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
