import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Component Imports
import Loader from "./components/Loader.jsx";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const sectionsRef = useRef([]);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    if (!isLoading) {
      lenisRef.current = new Lenis({ duration: 1.2, smooth: true });

      const raf = (time) => {
        lenisRef.current.raf(time);
        ScrollTrigger.update();
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      // Section Fade-in Logic
      setTimeout(() => {
        const sections = gsap.utils.toArray('section');
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                end: 'bottom 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        ScrollTrigger.refresh();
      }, 100);

      return () => {
        if (lenisRef.current) lenisRef.current.destroy();
        ScrollTrigger.getAll().forEach((st) => st.kill());
        document.body.style.overflow = "auto";
      };
    }
  }, [isLoading]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Sahil_Hirve_123B2B312_TY_A.pdf';
    link.download = 'Sahil_Hirve_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;
    if (lenisRef.current) lenisRef.current.scrollTo(section);
    else section.scrollIntoView({ behavior: 'smooth' });
  };

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  return (
    <div className="bg-black">
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        className="text-gray-200 overflow-x-hidden scroll-smooth"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <Navbar scrollToSection={scrollToSection} />

        <Hero scrollToSection={scrollToSection} addToRefs={addToRefs} handleDownload={handleDownload} />

        <Education addToRefs={addToRefs} />

        <Projects addToRefs={addToRefs} />

        <Achievements addToRefs={addToRefs} />

        <Skills addToRefs={addToRefs} />

        {/* Note: Contact component contains the 'About Me' and 'Form' section with id="about" */}
        <Contact addToRefs={addToRefs} />

        <footer className="text-center py-6 bg-black text-gray-500 border-t border-gray-800">
          © 2025 Sahil Hirve | All Rights Reserved
        </footer>
      </motion.div>
    </div>
  );
}
