import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const tl = useRef(null);

  // Progress counter
  useEffect(() => {
    let num = 0;
    const interval = setInterval(() => {
      num += 1;
      setProgress(num);
      if (num === 100) {
        clearInterval(interval);
        setTimeout(() => onComplete && onComplete(), 600);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  // GSAP animation for text
  useEffect(() => {
    tl.current = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 0.6 } });

    tl.current
      .from(".loader-s", { opacity: 0, scale: 0, y: 50 })
      .to(".loader-ahil", { x: 0, opacity: 1 })
      .to(".loader-sahil", { x: -60 })
      .from(".loader-h", { opacity: 0, scale: 0, y: 50 })
      .to(".loader-irve", { x: 0, opacity: 1 })
      .to(".loader-sahil", { x: 0, delay: 0.3 })
      .to(".loader-wrapper", { opacity: 0, duration: 1, delay: 0.6 });
  }, []);

  return (
    <motion.div
      className="loader-wrapper fixed inset-0 bg-black flex flex-col justify-center items-center z-[1000]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Text Animation */}
      <div className="relative text-6xl md:text-8xl font-bold text-orange-500 flex flex-col items-center justify-center overflow-hidden h-32">
        <div className="relative flex items-center justify-center">
          <motion.span className="loader-s inline-block mr-2">S</motion.span>
          <motion.span
            className="loader-ahil inline-block opacity-0 translate-x-[-50px]"
            style={{ transform: "translateX(-80px)" }}
          >
            ahil
          </motion.span>
        </div>

        <div className="relative flex items-center justify-center mt-2">
          <motion.span className="loader-h inline-block mr-2 opacity-0">H</motion.span>
          <motion.span
            className="loader-irve inline-block opacity-0 translate-x-[-50px]"
            style={{ transform: "translateX(-80px)" }}
          >
            irve
          </motion.span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-12 flex items-center gap-4 w-64 md:w-96">
        <div className="relative w-full h-4 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-red-500"
            style={{ width: `${progress}%` }}
          ></div>
          <div className="wave absolute top-0 left-0 w-full h-full opacity-40"></div>
        </div>
        <span className="text-orange-400 text-lg font-semibold">{progress}%</span>
      </div>

      {/* Wavy effect */}
      <style>{`
        .wave {
          background: repeating-linear-gradient(
            -45deg,
            rgba(255,255,255,0.2) 0px,
            rgba(255,255,255,0.2) 10px,
            transparent 10px,
            transparent 20px
          );
          animation: waveMove 2s linear infinite;
        }
        @keyframes waveMove {
          0% { background-position-x: 0; }
          100% { background-position-x: 40px; }
        }
      `}</style>
    </motion.div>
  );
}
