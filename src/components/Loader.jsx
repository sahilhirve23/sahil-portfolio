import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";

// --- Custom useWindowSize Hook ---
// This is included to avoid import errors.
function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return () => {}; // Return an empty function for cleanup
    }
    
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount
    
    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  return size;
}
// --- End of Custom Hook ---

// --- Configuration ---
const statusMessages = [
  "Booting services...",
  "Initializing data streams...",
  "Parsing datasets...",
  "Analyzing dependencies...",
  "Compiling insights...",
  "Finalizing visualization...",
];

// Durations for each stage (in seconds)
const INITIAL_ORANGE_DURATION = 0.5; // How long everything is just orange
const BLACK_CIRCLE_REVEAL_DURATION = 0.8; // How long the black circle takes to expand
const ANALYTICAL_LOAD_DURATION = 3.5; // Your original analytical load time
const ANALYTICAL_FADE_OUT_DURATION = 1.0; // Your "fade out slower" request
const SAHIL_HIRVE_EXIT_DURATION = 1.2; // How long "SAHIL HIRVE" zooms out

// -------------------------

export default function Loader({ onComplete }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  // Stages: "initialOrange", "analytical", "exitSahilHirve"
  const [stage, setStage] = useState("initialOrange"); 
  const count = useMotionValue(0);
  const roundedCounter = useTransform(count, (latest) => Math.round(latest));
  const windowSize = useWindowSize();
  
  // Calculate the diagonal of the screen to ensure the circle covers everything
  const circleRadius = Math.sqrt(Math.pow(windowSize.width, 2) + Math.pow(windowSize.height, 2));

  // --- Stage Management Timers ---
  useEffect(() => {
    // 1. Timer to move from orange to analytical
    const analyticalTimer = setTimeout(() => {
      setStage("analytical");
    }, INITIAL_ORANGE_DURATION * 1000);
    
    // 2. Timer to move from analytical to exit
    const exitTimer = setTimeout(() => {
      setStage("exitSahilHirve");
    }, (INITIAL_ORANGE_DURATION + BLACK_CIRCLE_REVEAL_DURATION + ANALYTICAL_LOAD_DURATION) * 1000);

    // 3. Timer to call onComplete and finish the loader
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, (INITIAL_ORANGE_DURATION + BLACK_CIRCLE_REVEAL_DURATION + ANALYTICAL_LOAD_DURATION + SAHIL_HIRVE_EXIT_DURATION) * 1000);

    return () => {
      clearTimeout(analyticalTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // --- Stage 2: Analytical Loader Animation (Counter & Text) ---
  useEffect(() => {
    if (stage !== "analytical") return;

    // Cycle status messages
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => {
        if (prevIndex === statusMessages.length - 1) {
          clearInterval(messageInterval); // Stop cycling on last message
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, (ANALYTICAL_LOAD_DURATION * 1000) / (statusMessages.length - 1));

    // Counter animation
    const counterControls = animate(count, 100, {
      duration: ANALYTICAL_LOAD_DURATION,
      ease: "easeInOut",
    });

    return () => {
      clearInterval(messageInterval);
      counterControls.stop();
    };
  }, [stage]); // This effect runs *only* when stage becomes "analytical"


  return (
    <motion.div
      className="loader-container fixed inset-0 z-[100] flex flex-col items-center justify-center 
                 text-white overflow-hidden" // Main container
      style={{ backgroundColor: "rgb(251 146 60)" }} // Starts orange
      // This exit prop is for the final zoom-out fade
      exit={{ opacity: 0 }}
      transition={{ duration: SAHIL_HIRVE_EXIT_DURATION * 0.7, ease: "easeOut" }}
    >
      
      {/* 1. Black Circle Reveal */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-black"
        initial={{
          clipPath: "circle(0% at 50% 50%)",
        }}
        animate={{
          clipPath: stage === "initialOrange" 
            ? "circle(0% at 50% 50%)" 
            : `circle(${circleRadius}px at 50% 50%)` // Animate to cover screen
        }}
        transition={{ 
          duration: BLACK_CIRCLE_REVEAL_DURATION, 
          ease: "easeOut", 
          delay: INITIAL_ORANGE_DURATION 
        }}
      >
        {/* 2. Analytical Content (100% Counter) */}
        <AnimatePresence>
          {stage === "analytical" && (
            <motion.div
              className="flex flex-col items-center gap-4 p-8 rounded-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: BLACK_CIRCLE_REVEAL_DURATION } }}
              // 3. Fade out slower
              exit={{ opacity: 0, y: 20, transition: { duration: ANALYTICAL_FADE_OUT_DURATION } }}
            >
              {/* Percentage Counter */}
              <div className="flex items-end">
                <motion.h1 className="text-7xl md:text-8xl font-bold text-orange-500 font-mono">
                  {roundedCounter}
                </motion.h1>
                <span className="text-3xl md:text-4xl font-mono text-gray-400 mb-2">%</span>
              </div>

              {/* Animated SVG Graph */}
              <motion.svg
                width="200"
                height="40"
                viewBox="0 0 200 40"
                className="overflow-visible"
              >
                <motion.path
                  d="M 0 30 L 40 20 L 80 35 L 120 10 L 160 25 L 200 5"
                  fill="transparent"
                  stroke="rgb(234 88 12)" // Your orange color
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: ANALYTICAL_LOAD_DURATION * 0.7, ease: "easeInOut" },
                    opacity: { duration: 0.5 }
                  }}
                />
              </motion.svg>

              {/* Cycling Status Text */}
              <div className="w-64 h-6 text-center text-gray-400 font-mono">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentMessageIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {statusMessages[currentMessageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>


      {/* 4. Sahil Hirve Exit Animation */}
      <AnimatePresence>
        {stage === "exitSahilHirve" && (
          <motion.h1
            // 4, 5, 6: Size, Font, and Color
            className="text-7xl md:text-8xl font-mato font-extrabold text-transparent 
                       absolute inset-0 flex items-center justify-center"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ opacity: 1 }}
            // 7. Exit Animation (Zoom into "S")
            exit={{ 
              scale: 50, // Zoom in massively
              opacity: 0, 
            }}
            transition={{ duration: SAHIL_HIRVE_EXIT_DURATION, ease: "easeIn" }}
            style={{ 
              WebkitTextStroke: "2px rgb(251 146 60)", // Orange border
              transformOrigin: "30% 50%" // Set origin to the "S"
            }}
          >
            SAHIL HIRVE
          </motion.h1>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
