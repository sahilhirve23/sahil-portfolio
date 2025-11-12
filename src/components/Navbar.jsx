import React, { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ scrollToSection }) {
  useEffect(() => {
    // Animate Hero title (center) → Navbar position
    gsap.fromTo(
      "#hero-title",
      { scale: 1, y: 0, x: 0, opacity: 1 },
      {
        scale: 0.4,
        x: "-34vw",
        y: "-20vh",
        opacity: 0,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "35% top",
          scrub: 1.1,
          onUpdate: (self) => {
            const progress = self.progress;
            const adjustedProgress = Math.max(
              0,
              Math.min((progress - 0.2) * 1.25, 1)
            );
            gsap.to("#navbar-title", {
              opacity: adjustedProgress,
              y: adjustedProgress * 3 - 3,
              duration: 0.15,
              ease: "power2.out",
            });
          },
        },
      }
    );
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center py-3 px-4">
      <div className="w-full max-w-6xl flex items-center justify-between">
        <motion.div
          id="navbar-title"
          className="text-orange-500 font-semibold text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
        >
          SAHIL HIRVE
        </motion.div>

        {/* Desktop Navbar */}
        <div className="hidden md:block">
          <ul className="flex gap-6 text-gray-300">
            {[
              "Home",
              "Education",
              "Projects",
              "Achievements",
              "Skills",
              "About",
              "Contact",
            ].map((item) => (
              <li key={item}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.toLowerCase());
                  }}
                  className="hover:text-orange-400 transition px-2 py-1 text-sm text-gray-300"
                  aria-label={`Go to ${item}`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <select
            onChange={(e) => {
              const val = e.target.value;
              if (val) scrollToSection(val);
            }}
            className="bg-black text-gray-300 border border-gray-700 p-2 rounded"
            aria-label="Navigate sections"
            defaultValue=""
          >
            <option value="" disabled>
              Navigate
            </option>
            {[
              "home",
              "education",
              "projects",
              "achievements",
              "skills",
              "about",
              "contact",
            ].map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
}
