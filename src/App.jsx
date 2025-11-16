import Loader from "./components/Loader.jsx";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Education from "./components/Education";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { FaInstagram, FaLinkedin, FaGithub, FaYoutube, FaSpotify, FaXTwitter } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const sectionsRef = useRef([]);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
    lenisRef.current = new Lenis({ duration: 1.2, smooth: true });

    const raf = (time) => {
      lenisRef.current.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

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

    ScrollTrigger.refresh();

    return () => {
      if (lenisRef.current) lenisRef.current.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
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
   <div className="bg-black"> {/* A simple container for everything */}

      {/* 1. Add this AnimatePresence block for the Loader */}
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 2. Wrap your entire site in this motion.div */}
      <motion.div
        className="text-gray-200 overflow-x-hidden scroll-smooth"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }} // This fades the site in
      >     

      {/* Navbar */}
      <Navbar scrollToSection={scrollToSection} />


      {/* Hero Section */}
      {/* Hero */}
<Hero scrollToSection={scrollToSection} addToRefs={addToRefs} handleDownload={handleDownload} />


    {/* Education Section */}
      <Education addToRefs={addToRefs} />

      {/* Projects Section */}
      <section id="projects" ref={addToRefs} className="min-h-screen px-6 py-12 md:px-10 md:py-16 bg-[url('/assets/images/test.jpg')] bg-cover md:bg-fixed bg-local">
        <h2 className="text-4xl text-orange-500 mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Image Forgery Detection', 'Autoencoder-Based Image Compression', 'Codemind LMS'].map((proj) => (
            <motion.div key={proj} className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-orange-400 transition transform hover:scale-105" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h3 className="text-xl text-white mb-3">{proj}</h3>
              <p className="text-sm text-gray-400">Description of {proj} with tools and outcomes.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" ref={addToRefs} className="min-h-screen px-6 py-12 md:px-10 md:py-16 bg-[url('/assets/images/test.jpg')] bg-cover md:bg-fixed bg-local certificates-section">
        <h2 className="text-4xl text-orange-500 mb-6">Achievements & Certifications</h2>
        <motion.ul className="list-disc ml-6 space-y-2" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <li>🏆 Best Paper Award – ICCEUBEA 2025</li>
          <li>5★ in C++ – HackerRank</li>
          <li>Excel AIR 5 – Microsoft Office Specialist</li>
          <li>Outstanding ACM Chapter Leadership</li>
        </motion.ul>
        <div className="certificate-strip flex gap-4 mt-10 w-[200vw]">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.img key={i} src={`/assets/certificates/certificate${i}.jpg`} alt={`Certificate ${i}`} className="w-72 border border-white/40 rounded-lg hover:scale-105 hover:shadow-orange-500 transition" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }} />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={addToRefs} className="min-h-screen px-6 py-12 md:px-10 md:py-16 bg-[url('/assets/images/test.jpg')] bg-cover md:bg-fixed bg-local">
        <h2 className="text-4xl text-orange-500 mb-6">Skills & Hobbies</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-2xl mb-4 text-white">Technical Skills</h3>
            {['C++', 'Python', 'Java', 'HTML/CSS/JS', 'SQL', 'Machine Learning'].map((skill, i) => (
              <div key={i} className="mb-3">
                <p>{skill}</p>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} transition={{ duration: 1.5, delay: i * 0.2 }} className="bg-orange-500 h-full" />
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h3 className="text-2xl mb-4 text-white">Hobbies</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              {['🎤', '🎸', '🧘', '🏊‍♂️', '🎬', '📷'].map((icon, i) => (
                <motion.div key={i} whileHover={{ scale: 1.1 }} className="bg-gray-900 p-6 rounded-lg text-4xl hover:text-orange-400 transition">{icon}</motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={addToRefs} className="min-h-screen px-6 py-12 md:px-10 md:py-16 bg-[url('/assets/images/test.jpg')] bg-cover md:bg-fixed bg-local">
        <h2 className="text-4xl text-orange-500 mb-8">About Me</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <img src="/assets/images/test6.jpg" alt="Profile" className="w-64 rounded-lg border border-white/40 float-animation" />
            <p className="mt-6 text-gray-300">I’m Sahil Hirve — Business Analyst Intern, AI/ML Enthusiast, and Researcher passionate about combining data and creativity to build impactful digital solutions.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h3 className="text-2xl text-white mb-3">Connect with me</h3>
            <div className="flex gap-5 text-2xl">
              <a href="https://www.instagram.com/hirveeeee/" target="_blank" rel="noreferrer"><FaInstagram className="hover:text-pink-500" /></a>
              <a href="https://x.com/SahilHirve2" target="_blank" rel="noreferrer"><FaXTwitter className="hover:text-sky-400" /></a>
              <a href="https://www.linkedin.com/in/sahil-hirve/" target="_blank" rel="noreferrer"><FaLinkedin className="hover:text-blue-500" /></a>
              <a href="https://www.youtube.com/channel/UCHkcT4AULNfdc9hb6GTKisw" target="_blank" rel="noreferrer"><FaYoutube className="hover:text-red-500" /></a>
              <a href="https://open.spotify.com/user/316x7lpkywupqzeoovx46ecc6rem" target="_blank" rel="noreferrer"><FaSpotify className="hover:text-green-500" /></a>
              <a href="https://github.com/sahilhirve23" target="_blank" rel="noreferrer"><FaGithub className="hover:text-gray-300" /></a>
            </div>
            <form className="mt-6 space-y-4">
              <input type="text" placeholder="Name" className="w-full bg-gray-900 p-3 rounded border border-gray-700 focus:border-orange-400" />
              <input type="email" placeholder="Email" className="w-full bg-gray-900 p-3 rounded border border-gray-700 focus:border-orange-400" />
              <textarea placeholder="Message" className="w-full bg-gray-900 p-3 rounded border border-gray-700 focus:border-orange-400 h-32" />
              <button type="submit" className="px-6 py-2 bg-orange-600 rounded-lg hover:bg-orange-500 transition">Send</button>
            </form>
          </motion.div>
        </div>
      </section>

      <footer className="text-center py-6 bg-black text-gray-500 border-t border-gray-800">© 2025 Sahil Hirve | All Rights Reserved</footer>
    </motion.div> {/* 3. Close the motion.div here */}
      </div>
  );
}
