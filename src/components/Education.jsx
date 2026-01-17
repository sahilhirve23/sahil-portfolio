"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Activity, 
  Layers, 
  Cloud, 
  ChevronRight 
} from 'lucide-react';

const DEFAULT_BG = "https://media.assettype.com/analyticsinsight%2F2024-07%2Fd3038942-d777-4151-9c6a-74b54234028f%2FRecent_Government_Initiatives_in_Data_Science_Education_in_India.jpg?w=480&auto=format%2Ccompress&fit=max";

// --- ANIMATION VARIANTS ---

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

// Title Glow Variant
const titleGlowVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: { 
    scale: 1.05, 
    textShadow: "0 0 20px rgba(249, 115, 22, 0.5)", // Orange glow
    transition: { duration: 0.3 }
  }
};

// Subheading (SectionHeader) Glow Variant
const subheadingVariant = {
  rest: { scale: 1, textShadow: "0px 0px 0px rgba(0,0,0,0)" },
  hover: {
    scale: 1.05,
    textShadow: "0 0 20px rgba(249, 115, 22, 0.4)", // Orange glow
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

// Status Bar Glow Variant
const statusBarGlowVariant = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    borderColor: "rgba(31, 41, 55, 0.5)", // gray-800/50
    transition: { duration: 0.5, delay: 0.4, ease: "backOut" }
  },
  hover: { 
    scale: 1.05, 
    boxShadow: "0px 0px 20px rgba(34, 197, 94, 0.2)", // Subtle Green glow for "Live Data" feel
    borderColor: "rgba(34, 197, 94, 0.4)",
    color: "#e5e7eb", // lighter text on hover
    transition: { duration: 0.3 }
  }
};

// Combined variants to handle both Entry (hidden->visible) and Hover states
const cardVariantsOrange = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0px 0px 20px rgba(249, 115, 22, 0.3)", // Orange glow
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

const cardVariantsBlue = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.3)", // Blue glow
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

// For the smaller cards inside the Experience section (staggered items that also glow)
const subCardVariantsBlue = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.3)", // Blue glow
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

// --- DATA DEFINITIONS ---

const educationData = {
  btech: {
    id: "EDU_01",
    title: 'B.Tech in Computer Engineering',
    subtitle: 'PCCOE, Pune',
    date: '2022 - 2026',
    status: 'IN_PROGRESS',
    points: [
      'Specializing in Data Science & Analytics.',
      'Core: DSA, DBMS, OOPS, CN.',
      'Lead: ACM Student Chapter.',
    ],
    skills: ['C++', 'Python', 'SQL', 'Data Structures'],
    bg: "https://lh3.googleusercontent.com/proxy/5kNSx9Sqtnh3fTB2cT1moQH4KoQXA4sB_7kV3f2UeQ4wCB7ZgzRROoyB_C2tXDUwcoB5DGfVRxx8-qhKzlE7qBYnJALrMa8"
  },
  diploma: {
    id: "EDU_02",
    title: 'Diploma in Computer Engineering',
    subtitle: 'CWIT Pune',
    date: '2019 - 2022',
    status: 'COMPLETED',
    points: [
      'Achieved Final CGPA: 9.80/10.',
      'Project: Smart Traffic Management System.',
    ],
    skills: ['Java', 'C', 'Web Dev'],
    bg: "https://cwit.mespune.org/wp-content/uploads/2022/03/a39c29db-a2f0-48a2-a43a-5bba204c4999.jpg"
  }
};

// Updated Experience Data
const experienceData = {
  internships: {
    id: "EXP_LOG",
    // Generic range for the block, specific dates are in sub-items
    date: '2022 - Present', 
    bg: "https://media.licdn.com/dms/image/v2/D562DAQEwSqm8hAwHIQ/profile-treasury-image-shrink_800_800/B56Zh10wJLG4AY-/0/1754323422266?e=1765015200&v=beta&t=rRYZUYiM-tKYks3Rpw0HzfvWMy3m7dZhHjGBKk6m7nc",
    incentius: {
      company: 'Incentius',
      title: 'Business Analyst Intern',
      date: 'Nov 2024 – Present',
      points: [
        'Analyzed Sales Compensation (IC) data for 2,100+ sales employees, tracking KPIs and payout trends using SQL, Excel, and dashboard visualizations.',
        'Led requirement gathering, implementation, and UAT across end-to-end project lifecycles, supporting multiple retail business stakeholders.'
      ],
      skills: ['SQL', 'Excel', 'Data Analytics', 'Business Analytics']
    },
    aurochs: {
      company: 'Aurochs Software',
      title: 'Business Analyst Intern',
      date: 'Aug 2024 – Nov 2024',
      points: [
        'Worked on data analysis and IC compensation for U.S. pharmaceutical clients.',
        'Automated data workflows and dashboards supporting monthly analytics across 5+ Business Units.'
      ],
      skills: ['SQL', 'Excel', 'Data Analytics', 'Business Analytics']
    },
    aws: {
      company: 'Oytie Ltd',
      title: 'AWS Intern',
      date: '2022',
      points: ['Managed core AWS services (EC2, S3, IAM) and cloud infrastructure deployment.'],
      skills: ['AWS', 'Linux', 'Cloud Computing']
    }
  }
};

// --- REUSABLE COMPONENTS ---

const TechBadge = ({ label }) => (
  <span className="text-[10px] bg-black/40 text-orange-400/90 border border-orange-500/10 px-2 py-0.5 rounded font-mono">
    {label}
  </span>
);

const SectionHeader = ({ icon: Icon, title, id }) => (
  <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
    <motion.div 
      className="flex items-center gap-3 cursor-default"
      variants={subheadingVariant}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <div className="p-2 bg-gray-900/50 rounded-lg border border-gray-800 text-orange-500">
        <Icon size={20} />
      </div>
      <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
    </motion.div>
    <div className="text-[10px] font-mono text-gray-500 hidden sm:block">
      ID: {id}
    </div>
  </div>
);

export default function Education({ addToRefs }) {
  const sectionRef = useRef(null);
  const [currentBg, setCurrentBg] = useState(DEFAULT_BG);

  useEffect(() => {
    // Only call addToRefs if it exists and sectionRef is valid
    if (sectionRef.current && addToRefs) {
      addToRefs(sectionRef.current);
    }
  }, [addToRefs]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
   
  // Parallax Logic:
  // Adjusted for mobile to be less aggressive to prevent overflow issues
  const bgX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 md:px-10 bg-gray-900 overflow-hidden"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full md:w-[120%] h-full md:-ml-[10%]" 
          style={{
            backgroundImage: `url('${currentBg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            x: bgX, 
            filter: "brightness(0.7) blur(3px) grayscale(0.5)", // Darkened slightly more for mobile readability
            transition: "background-image 0.7s ease-in-out"
          }}
        />

        {/* Increased overlay opacity to make text readable on phone */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-black/50 to-gray-900/90" />
        
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,30,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- MAIN HEADER --- */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            variants={titleGlowVariant}
            className="group text-4xl md:text-5xl font-bold text-white hover:text-orange-500 transition-colors duration-300 cursor-default"
          >
            Education <span className="text-orange-500 group-hover:text-white transition-colors duration-300">&</span> Experience
          </motion.h2>
          
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="h-1 w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent mt-4 mb-6" 
          />
          
          {/* Status Bar */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            variants={statusBarGlowVariant}
            className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-[10px] font-mono text-gray-500 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800/50 backdrop-blur-sm cursor-crosshair"
          >
             <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> LIVE_DATA_FEED</span>
             <span className="hidden sm:inline">|</span>
             <span>TOTAL_NODES: 4</span>
             <span className="hidden sm:inline">|</span>
             <span>SYNCED: JUST_NOW</span>
           </motion.div>
        </div>

        {/* --- TWO COLUMN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* === CARD 1: EDUCATION === */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="bg-gray-900/20 backdrop-blur-md border border-gray-800 rounded-xl p-4 md:p-8 transition-all duration-300 group"
          >
            <SectionHeader icon={GraduationCap} title="Education" id="NODE_EDU" />

            {/* 1. B.Tech (Primary) */}
            <motion.div 
              className="relative pl-6 border-l border-orange-500/30 pb-10 rounded-r-lg group/item"
              onMouseEnter={() => setCurrentBg(educationData.btech.bg)}
              onMouseLeave={() => setCurrentBg(DEFAULT_BG)}
              variants={cardVariantsOrange}
              whileHover="hover"
            >
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" />
              
              <div className="flex flex-col gap-1 mb-2">
                <h4 className="text-xl md:text-2xl font-bold text-white group-hover/item:text-orange-100 transition-colors">
                  {educationData.btech.title}
                </h4>
                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm">
                  <span className="text-orange-400 font-mono">@ {educationData.btech.subtitle}</span>
                  <span className="text-gray-500 font-mono text-xs border border-gray-800 px-2 py-0.5 rounded bg-black/30">
                    {educationData.btech.date}
                  </span>
                </div>
              </div>

              <motion.ul className="space-y-2 mb-4 mt-4" variants={staggerContainer}>
                {educationData.btech.points.map((p, i) => (
                  <motion.li key={i} className="text-sm text-gray-300 flex gap-3" variants={itemVariant}>
                    <ChevronRight className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{p}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div className="flex flex-wrap gap-2" variants={staggerContainer}>
                {educationData.btech.skills.map((s, i) => (
                    <motion.div key={i} variants={itemVariant}>
                        <TechBadge label={s} />
                    </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* 2. Diploma (Secondary) */}
            <motion.div 
              className="relative pl-6 border-l border-gray-800 rounded-r-lg group/item"
              onMouseEnter={() => setCurrentBg(educationData.diploma.bg)}
              onMouseLeave={() => setCurrentBg(DEFAULT_BG)}
              variants={cardVariantsOrange}
              whileHover="hover"
            >
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-800 border border-gray-600" />
              
              <div className="mb-2">
                <h4 className="text-lg font-bold text-gray-200">
                  {educationData.diploma.title}
                </h4>
                <div className="text-xs text-gray-500 font-mono mt-1">
                  {educationData.diploma.subtitle} | {educationData.diploma.date}
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mb-3">
                  Final CGPA: <span className="text-white font-mono">9.80/10</span>. Project: Smart Traffic Management System.
              </p>
              
              <motion.div className="flex flex-wrap gap-2" variants={staggerContainer}>
                {educationData.diploma.skills.map((s, i) => (
                    <motion.div key={i} variants={itemVariant}>
                        <TechBadge label={s} />
                    </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>


          {/* === CARD 2: EXPERIENCE === */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="bg-gray-900/20 backdrop-blur-md border border-gray-800 rounded-xl p-4 md:p-8 transition-all duration-300 group"
          >
            <SectionHeader icon={Briefcase} title="Experience" id="NODE_EXP" />

            {/* Combined Internships Block */}
            <motion.div 
              className="relative pl-6 border-l border-blue-500/30 pb-4 rounded-r-lg group/item"
              onMouseEnter={() => setCurrentBg(experienceData.internships.bg)}
              onMouseLeave={() => setCurrentBg(DEFAULT_BG)}
              variants={cardVariantsBlue}
              whileHover="hover"
            >
               <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
               
               <div className="flex justify-between items-start mb-4">
                 <div>
                    <h4 className="text-xl font-bold text-white">Internships</h4>
                 </div>
                 <span className="text-xs text-gray-500 font-mono bg-black/30 px-2 py-1 rounded border border-gray-800 hidden sm:inline-block">
                   {experienceData.internships.date}
                 </span>
               </div>

               {/* Container for All Internships */}
               <motion.div className="flex flex-col gap-4 bg-black/20 rounded-lg p-1 border border-gray-800/50" variants={staggerContainer}>
                  
                  {/* Top Row: Aurochs & Incentius (Stack on mobile, Side-by-side on desktop) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Job A: Incentius */}
                      <motion.div 
                        className="p-3 bg-gray-900/40 rounded border border-gray-800/50 transition-colors flex flex-col h-full"
                        variants={subCardVariantsBlue}
                        whileHover="hover"
                      >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <Layers size={14} className="text-purple-400 shrink-0" />
                                <span className="text-sm font-bold text-gray-200">{experienceData.internships.incentius.company}</span>
                            </div>
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono mb-1">{experienceData.internships.incentius.date}</div>
                        <div className="text-[10px] text-gray-500 uppercase font-mono mb-2">{experienceData.internships.incentius.title}</div>
                        
                        <motion.ul className="space-y-2 mb-3 flex-grow" variants={staggerContainer}>
                            {experienceData.internships.incentius.points.map((p, i) => (
                              <motion.li key={i} className="text-[11px] text-gray-400 leading-tight" variants={itemVariant}>- {p}</motion.li>
                            ))}
                        </motion.ul>
                        <motion.div className="flex flex-wrap gap-1 mt-auto" variants={staggerContainer}>
                            {experienceData.internships.incentius.skills.map((s,i) => (
                              <motion.div key={i} variants={itemVariant}>
                                <span className="text-[9px] text-purple-300 bg-purple-900/20 px-1.5 py-0.5 rounded">{s}</span>
                              </motion.div>
                            ))}
                        </motion.div>
                      </motion.div>
                      
                      {/* Job B: Aurochs */}
                      <motion.div 
                        className="p-3 bg-gray-900/40 rounded border border-gray-800/50 transition-colors flex flex-col h-full"
                        variants={subCardVariantsBlue}
                        whileHover="hover"
                      >
                        <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center gap-2">
                                <Activity size={14} className="text-blue-400 shrink-0" />
                                <span className="text-sm font-bold text-gray-200">{experienceData.internships.aurochs.company}</span>
                            </div>
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono mb-1">{experienceData.internships.aurochs.date}</div>
                        <div className="text-[10px] text-gray-500 uppercase font-mono mb-2">{experienceData.internships.aurochs.title}</div>
                        
                        <motion.ul className="space-y-2 mb-3 flex-grow" variants={staggerContainer}>
                            {experienceData.internships.aurochs.points.map((p, i) => (
                              <motion.li key={i} className="text-[11px] text-gray-400 leading-tight" variants={itemVariant}>- {p}</motion.li>
                            ))}
                        </motion.ul>
                        <motion.div className="flex flex-wrap gap-1 mt-auto" variants={staggerContainer}>
                            {experienceData.internships.aurochs.skills.map((s,i) => (
                              <motion.div key={i} variants={itemVariant}>
                                <span className="text-[9px] text-blue-300 bg-blue-900/20 px-1.5 py-0.5 rounded">{s}</span>
                              </motion.div>
                            ))}
                        </motion.div>
                      </motion.div>
                  </div>

                  {/* Bottom Row: AWS */}
                  <motion.div 
                    className="p-3 bg-gray-900/40 rounded border border-gray-800/50 transition-colors"
                    variants={subCardVariantsBlue}
                    whileHover="hover"
                  >
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2">
                            <Cloud size={14} className="text-yellow-500 shrink-0" />
                            <span className="text-sm font-bold text-gray-200">{experienceData.internships.aws.company}</span>
                         </div>
                         <span className="text-[9px] font-mono text-gray-500">{experienceData.internships.aws.date}</span>
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase font-mono mb-2">{experienceData.internships.aws.title}</div>
                      <p className="text-[11px] text-gray-400 leading-tight mb-3">
                          - {experienceData.internships.aws.points[0]}
                      </p>
                      <motion.div className="flex flex-wrap gap-1" variants={staggerContainer}>
                         {experienceData.internships.aws.skills.map((s,i) => (
                            <motion.div key={i} variants={itemVariant}>
                             <span className="text-[9px] text-yellow-300 bg-yellow-900/20 px-1.5 py-0.5 rounded">{s}</span>
                            </motion.div>
                         ))}
                      </motion.div>
                  </motion.div>

               </motion.div>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
