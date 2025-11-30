import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Achievements = ({ addToRefs }) => {
  
  useEffect(() => {
    // Specific animation for the certificate strip
    // We use a timeout to ensure the DOM is rendered before GSAP attaches
    const ctx = gsap.context(() => {
      gsap.to('.certificate-strip', {
        xPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.certificates-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert(); // Cleanup GSAP context on unmount
  }, []);

  return (
    <section 
      id="achievements" 
      ref={addToRefs} 
      className="min-h-screen px-6 py-12 md:px-10 md:py-16 bg-[url('/assets/images/test.jpg')] bg-cover md:bg-fixed bg-local certificates-section"
    >
      <h2 className="text-4xl text-orange-500 mb-6">Achievements & Certifications</h2>
      
      <motion.ul 
        className="list-disc ml-6 space-y-2" 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
      >
        <li>🏆 Best Paper Award – ICCEUBEA 2025</li>
        <li>5★ in C++ – HackerRank</li>
        <li>Excel AIR 5 – Microsoft Office Specialist</li>
        <li>Outstanding ACM Chapter Leadership</li>
      </motion.ul>

      <div className="certificate-strip flex gap-4 mt-10 w-[200vw]">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.img 
            key={i} 
            src={`/assets/certificates/certificate${i}.jpg`} 
            alt={`Certificate ${i}`} 
            className="w-72 border border-white/40 rounded-lg hover:scale-105 hover:shadow-orange-500 transition" 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: i * 0.1 }} 
          />
        ))}
      </div>
    </section>
  );
};

export default Achievements;
