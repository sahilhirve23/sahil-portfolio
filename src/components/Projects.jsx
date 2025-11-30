import React from 'react';
import { motion } from 'framer-motion';

const Projects = ({ addToRefs }) => {
  const projectList = [
    'Image Forgery Detection',
    'Autoencoder-Based Image Compression',
    'Codemind LMS'
  ];

  return (
    <section 
      id="projects" 
      ref={addToRefs} 
      className="min-h-screen px-6 py-12 md:px-10 md:py-16 bg-[url('/assets/images/test.jpg')] bg-cover md:bg-fixed bg-local"
    >
      <h2 className="text-4xl text-orange-500 mb-8">Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projectList.map((proj) => (
          <motion.div 
            key={proj} 
            className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-orange-400 transition transform hover:scale-105" 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl text-white mb-3">{proj}</h3>
            <p className="text-sm text-gray-400">Description of {proj} with tools and outcomes.</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
