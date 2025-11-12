import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ scrollToSection }) {
const [active, setActive] = useState("Home");
const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
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
          const progress = Math.max(0, Math.min((self.progress - 0.2) * 1.25, 1));
          gsap.to("#navbar-title", {
            opacity: progress > 0 ? 1 : 0, // stays visible after leaving home
            y: progress * 3 - 3,
            duration: 0.15,
            ease: "power2.out",
          });
        },
      },
    }
  );
}, []);
useEffect(() => {
  const sections = document.querySelectorAll("section");
  const handleScroll = () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    if (current) {
      setActive(current.charAt(0).toUpperCase() + current.slice(1));
    }
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <nav
  className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/10 hover:bg-white/20
             shadow-[inset_0_0_0.5px_rgba(255,255,255,0.4)] overflow-hidden
             transition-colors duration-700 ease-in-out"
  onMouseMove={(e) => setHoverPos({ x: e.clientX, y: e.clientY })}
>

  className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/10 
             shadow-[inset_0_0_0.5px_rgba(255,255,255,0.4)] overflow-hidden"
  onMouseMove={(e) => setHoverPos({ x: e.clientX, y: e.clientY })}
>
  {/* Glow effect following cursor */}
  <motion.div
    className="pointer-events-none fixed inset-0 z-0"
    style={{
      background: `radial-gradient(600px at ${hoverPos.x}px ${hoverPos.y}px, rgba(255,255,255,0.12), transparent 80%)`,
    }}
  />

  <div className="relative w-full max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
    {/* Logo title */}
    <motion.div
      id="navbar-title"
      className="text-orange-500 font-semibold text-lg md:text-xl z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0 }}
    >
      SAHIL HIRVE
    </motion.div>

    {/* Desktop Navbar */}
    <div className="hidden md:block relative z-10">
      <ul className="flex gap-6 text-gray-300 relative">
        {/* Background behind active tab */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active}
              className="absolute top-0 left-0 h-full bg-white/15 rounded-md -z-10"
              layoutId="activeHighlight"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}
        </AnimatePresence>

        {[
          "Home",
          "Education",
          "Projects",
          "Achievements",
          "Skills",
          "About",
          "Contact",
        ].map((item) => (
          <motion.li
            key={item}
            onClick={(e) => {
              e.preventDefault();
              setActive(item);
              scrollToSection(item.toLowerCase());
            }}
            className={`relative cursor-pointer transition-all duration-300 ${
  active === item ? "font-bold text-orange-400" : "text-gray-300 hover:text-orange-300"
}`}

            animate={{
              letterSpacing: active === item ? "0.2em" : "0em",
              scale: active === item ? 1.1 : 1,
            }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </div>

    {/* Mobile Dropdown */}
    <div className="md:hidden z-10">
      <select
        onChange={(e) => {
          const val = e.target.value;
          if (val) {
            setActive(val.charAt(0).toUpperCase() + val.slice(1));
            scrollToSection(val);
          }
        }}
        className="bg-black/60 text-gray-300 border border-gray-700 p-2 rounded backdrop-blur-md"
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
