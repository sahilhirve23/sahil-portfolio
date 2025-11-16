import React from 'react';
import { motion } from 'framer-motion';

export default function Education({ addToRefs }) {
  return (
    <section id="education" ref={addToRefs} className="min-h-screen flex flex-col justify-center px-6 md:px-10 bg-[url('/assets/images/test.jpg')] bg-cover md:bg-fixed bg-local">
      <h2 className="text-4xl text-orange-500 mb-8">Education & Experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="space-y-4" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h3 className="text-2xl text-white">Education</h3>
          <div className="bg-gray-900 p-4 rounded border border-gray-700 hover:border-orange-400 transition">B.Tech in Computer Engineering – PCCOE (2022–2026)</div>
          <div className="bg-gray-900 p-4 rounded border border-gray-700 hover:border-orange-400 transition">Diploma in Computer Engineering – CWIT Pune (2022)</div>
        </motion.div>
        <motion.div className="space-y-4" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <h3 className="text-2xl text-white">Work Experience</h3>
          <div className="bg-gray-900 p-4 rounded border border-gray-700 hover:border-orange-400 transition">Business Analyst Intern – Aurochs Software</div>
          <div className="bg-gray-900 p-4 rounded border border-gray-700 hover:border-orange-400 transition">Business Analyst Intern – Incentius</div>
          <div className="bg-gray-900 p-4 rounded border border-gray-700 hover:border-orange-400 transition">AWS Intern – Red Hat Linux, Oytie Ltd (2022)</div>
        </motion.div>
      </div>
    </section>
  );
}
