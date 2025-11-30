import React from 'react';
import { motion } from 'framer-motion';

const Skills = ({ addToRefs }) => {
  const technicalSkills = ['C++', 'Python', 'Java', 'HTML/CSS/JS', 'SQL', 'Machine Learning'];
  const hobbies = ['🎤', '🎸', '🧘', '🏊‍♂️', '🎬', '📷'];

  return (
    <section 
      id="skills" 
      ref={addToRefs} 
      className="min-h-screen px-6 py-12 md:px-10 md:py-16 bg-[url('/assets/images/test.jpg')] bg-cover md:bg-fixed bg-local"
    >
      <h2 className="text-4xl text-orange-500 mb-6">Skills & Hobbies</h2>
      <div className="grid md:grid-cols-2 gap-10">
        {/* Tech Skills */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h3 className="text-2xl mb-4 text-white">Technical Skills</h3>
          {technicalSkills.map((skill, i) => (
            <div key={i} className="mb-3">
              <p>{skill}</p>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  whileInView={{ width: '80%' }} 
                  transition={{ duration: 1.5, delay: i * 0.2 }} 
                  className="bg-orange-500 h-full" 
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Hobbies */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <h3 className="text-2xl mb-4 text-white">Hobbies</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            {hobbies.map((icon, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.1 }} 
                className="bg-gray-900 p-6 rounded-lg text-4xl hover:text-orange-400 transition"
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
