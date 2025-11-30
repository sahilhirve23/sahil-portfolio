import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub, FaYoutube, FaSpotify, FaXTwitter } from 'react-icons/fa6';

const Contact = ({ addToRefs }) => {
  return (
    <section 
      id="about" 
      ref={addToRefs} 
      className="min-h-screen px-6 py-12 md:px-10 md:py-16 bg-[url('/assets/images/test.jpg')] bg-cover md:bg-fixed bg-local"
    >
      <h2 className="text-4xl text-orange-500 mb-8">About Me</h2>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* Profile Image & Bio */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <img 
            src="/assets/images/test6.jpg" 
            alt="Profile" 
            className="w-64 rounded-lg border border-white/40 float-animation" 
          />
          <p className="mt-6 text-gray-300">
            I’m Sahil Hirve — Business Analyst Intern, AI/ML Enthusiast, and Researcher passionate about combining data and creativity to build impactful digital solutions.
          </p>
        </motion.div>

        {/* Contact Form & Socials */}
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
  );
};

export default Contact;
