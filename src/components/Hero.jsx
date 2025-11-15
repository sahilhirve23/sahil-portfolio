import React, { useEffect, useState, Fragment } from "react";
// Import useState for tracking hover and AnimatePresence for the pop-up
import { motion, AnimatePresence } from "framer-motion";
// We will import GSAP dynamically inside useEffect
// Add this line with your other imports
import { FaChevronDown } from 'https://esm.sh/react-icons/fa6';

// --- 1. Data for your 5 roles ---
const rolesData = [
  {
    id: 0,
    title: "Business Analyst",
    description:
      "I bridge the gap between business needs and technical solutions, using data to analyze problems and drive strategic decisions.",
  },
  {
    id: 1,
    title: "Aspiring Project Manager",
    description:
      "With a keen eye for organization and team dynamics, I am eager to lead projects, manage timelines, and ensure goals are met efficiently.",
  },
  {
    id: 2,
    title: "AI/ML & Data Science Enthusiast",
    description:
      "Passionate about the power of data, I am constantly exploring machine learning models and AI to uncover insights and build smart systems.",
  },
  {
    id: 3,
    title: "Computer Engineer",
    description:
      "My foundation in computer engineering provides me with strong problem-solving skills and a deep understanding of software and hardware systems.",
  },
  {
    id: 4,
    title: "Developer & Researcher",
    description:
      "I love to both build practical applications and dive deep into research, exploring novel ideas and pushing the boundaries of technology.",
  },
];

export default function Hero({ scrollToSection, addToRefs, handleDownload }) {
  // --- 2. State to track hovered item ---
  // We'll store the `id` of the hovered item (0-4), or `null` if nothing is hovered.
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    // --- 3. DYNAMICALLY IMPORT GSAP ---
    async function loadGsap() {
      try {
        // Use a CDN that serves ES modules
        const { gsap } = await import("https://esm.sh/gsap@3.12.5");
        const { ScrollTrigger } = await import("https://esm.sh/gsap@3.12.5/ScrollTrigger");

        // Register the plugin *after* both are loaded
        gsap.registerPlugin(ScrollTrigger);

        // --- 4. RUN GSAP ANIMATION ---
        gsap.to("#hero-bg", {
          backgroundPositionX: "120%", // moves background horizontally
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    }

    loadGsap();
    
  }, []); // Empty dependency array, so it runs once on mount

  // --- 5. Download URL for Resume ---
  const resumeDownloadUrl = "https://drive.google.com/uc?export=download&id=1lFH6wPMJVXBsApFUOz_0hnqNvC7tySCA";

  return (
    <section
      id="home"
      ref={addToRefs}
      className="relative h-screen"
      // We add onMouseLeave to the whole section to reset hover
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* LAYER 1: BACKGROUND IMAGE (z-0) */}
      <div
        id="hero-bg"
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
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
      <div className="relative z-20 h-full w-full 
                      flex flex-col justify-center items-start pl-20">
        <motion.h1
          id="hero-title"
          className="text-7xl md:text-8xl font-extrabold text-white relative z-20"
          
          whileHover={{
            color: "transparent", // Makes fill transparent
            WebkitTextStroke: "2px #ff7a00", // Keeps orange stroke
            scale: 1.05 // Scales up
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          SAHIL HIRVE
        </motion.h1>

        {/* --- FIX 1 & 3: Faded Edges, Responsive Width --- */}
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 mt-4 
                        max-w-[50%] shadow-lg shadow-black/80">
          <div className="flex flex-row flex-wrap items-center 
                          text-lg md:text-xl text-gray-300 gap-x-2">
            {rolesData.map((role, index) => (
              <Fragment key={role.id}>
                
                {/* --- FIX 2: Removed forced line break --- */}

                <motion.span
                  className="cursor-pointer font-semibold" // Made text bold
                  onMouseEnter={() => setHoveredIndex(role.id)}
                  animate={{
                    scale: hoveredIndex === role.id ? 1.15 : 1,
                    color:
                      hoveredIndex === role.id
                        ? "rgb(251 146 60)" // orange-400
                        : "rgb(209 213 219)", // gray-300
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {role.title}
                </motion.span>

                {/* --- FIX 2: Simplified separator logic --- */}
                {index < rolesData.length - 1 && (
                  <span className="text-gray-500 select-none mx-1">•</span>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* --- FIX 4: Animated Buttons --- */}
       
      </div>

      {/* --- New: Centered Button Container & Scroll Down Component --- */}
      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center z-30">
        
        {/* 1. New Centered, Styled Buttons */}
        <div className="flex gap-6 mb-8">
          <motion.button 
            className="px-8 py-3 bg-gradient-to-br from-orange-600 to-orange-700 
                       rounded-full border border-orange-500 text-lg font-semibold shadow-lg
                       backdrop-blur-sm"
            onClick={() => window.open(resumeDownloadUrl, '_blank')}
            whileHover={{ 
              scale: 1.07,
              boxShadow: "0 0 20px rgba(251, 146, 60, 0.7)", // Orange glowing shadow
              backgroundPosition: "right center" // For subtle gradient shift
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{ backgroundSize: "200% auto" }} // For gradient shift on hover
          >
            View My Profile
          </motion.button>
          
          <motion.button
            onClick={() => scrollToSection("about")}
            className="px-8 py-3 bg-gray-800/70 rounded-full border border-gray-700 text-lg font-semibold
                       backdrop-blur-sm"
            whileHover={{ 
              scale: 1.07,
              backgroundColor: "rgba(75, 85, 99, 0.8)", // slightly lighter gray
              borderColor: "rgb(251 146 60)", // Orange border on hover
              color: "rgb(251 146 60)" // Orange text on hover
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Contact Me
          </motion.button>
        </div>

        {/* 2. New Scroll Down Component */}
        <motion.div
          className="flex flex-col items-center text-gray-400 cursor-pointer"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          onClick={() => scrollToSection("education")} // Scroll to the next section
        >
          {/* Shining Text */}
          <motion.p 
            className="text-lg font-semibold text-gray-400"
            style={{
              backgroundImage: 'linear-gradient(90deg, #555 0%, #AAA 50%, #555 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              backgroundPosition: 'left center',
            }}
            animate={{
              backgroundPosition: ['left center', 'right center'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            SCROLL DOWN
          </motion.p>
          {/* Bouncing Icon */}
          <motion.div
            animate={{
              y: [0, -10, 0], // Bounce animation
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5,
            }}
          >
            <FaChevronDown className="text-3xl text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
      {/* --- Dots and Description Boxes --- */}
      <div className="absolute z-30 right-10 md:right-20 top-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-6">
          {rolesData.map((role) => (
            // This 'relative' container holds one dot and its description box
            <div
              key={role.id}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setHoveredIndex(role.id)}
            >
              {/* The Dot */}
              <motion.div
                className="w-3 h-3 bg-gray-400 rounded-full cursor-pointer"
                animate={{
                  scale: hoveredIndex === role.id ? 2 : 1,
                  backgroundColor:
                    hoveredIndex === role.id
                      ? "rgb(251 146 60)" // orange-400
                      : "rgb(156 163 175)", // gray-400
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />

              {/* --- Animated Description Box --- */}
              <AnimatePresence>
                {hoveredIndex === role.id && (
                  <motion.div
                    className="absolute right-full top-1/2 -translate-y-1/2 mr-6 
                               w-64 p-4 bg-black/80 backdrop-blur-lg 
                               border border-gray-700 rounded-lg shadow-xl"
                    style={{ transformOrigin: "right center" }}
                    initial={{ opacity: 0, scale: 0.5, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.5, x: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <p className="text-white text-base font-semibold mb-1">
                      {role.title}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {role.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
