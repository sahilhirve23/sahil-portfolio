import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- BACKGROUND IMAGES ---
const DEFAULT_BG = "https://media.assettype.com/analyticsinsight%2F2024-07%2Fd3038942-d777-4151-9c6a-74b54234028f%2FRecent_Government_Initiatives_in_Data_Science_Education_in_India.jpg?w=480&auto=format%2Ccompress&fit=max";

// --- HISTORY DATA ---
const timelineData = [
  {
    id: 5,
    type: 'Education',
    date: '2019 - 2022',
    title: 'Diploma in Computer Engineering',
    subtitle: 'CWIT Pune',
    points: [
      'Achieved a final CGPA of 9.80/10.',
      'Developed a "Smart Traffic Management System" as a final year project.',
    ],
    skills: ['Java', 'C', 'Web Development Basics'],
    bgImage: "https://cwit.mespune.org/wp-content/uploads/2022/03/a39c29db-a2f0-48a2-a43a-5bba204c4999.jpg"
  },
  {
    id: 4,
    type: 'Experience',
    date: '2022',
    title: 'AWS Intern',
    subtitle: 'Red Hat Linux, Oytie Ltd',
    points: [
      'Gained hands-on experience with core AWS services (EC2, S3, IAM).',
      'Assisted in basic cloud infrastructure deployment and monitoring.',
    ],
    skills: ['AWS', 'Linux', 'Cloud Computing'],
    bgImage: "https://cdn.wallpapersafari.com/88/42/FwszMg.png"
  },
  {
    id: 3,
    type: 'Education',
    date: '2022 - 2026',
    title: 'B.Tech in Computer Engineering',
    subtitle: 'PCCOE, Pune',
    points: [
      'Relevant Coursework: Data Structures, Algorithms, Database Management, OOPS.',
      'Active Member and leader in the ACM Student Chapter.',
    ],
    skills: ['C++', 'Python', 'SQL', 'Data Structures', 'Algorithms'],
    bgImage: "https://lh3.googleusercontent.com/proxy/5kNSx9Sqtnh3fTB2cT1moQH4KoQXA4sB_7kV3f2UeQ4wCB7ZgzRROoyB_C2tXDUwcoB5DGfVRxx8-qhKzlE7qBYnJALrMa8"
  },
  {
    id: 1, 
    type: 'Experience',
    date: '2024 - Present',
    isDual: true,
    bgImage: "https://media.licdn.com/dms/image/v2/D562DAQEwSqm8hAwHIQ/profile-treasury-image-shrink_800_800/B56Zh10wJLG4AY-/0/1754323422266?e=1765015200&v=beta&t=rRYZUYiM-tKYks3Rpw0HzfvWMy3m7dZhHjGBKk6m7nc",
    leftCard: {
      title: 'Business Analyst Intern',
      subtitle: 'Aurochs Software',
      points: [
        'Analyzed and documented client requirements for 3+ pharma-sector projects.',
        'Modeled "As-Is" and "To-Be" process flows using BPMN and Visio.',
        'Assisted in creating User Acceptance Testing (UAT) scripts and defect tracking.',
      ],
      skills: ['Requirement Gathering', 'BPMN', 'Jira', 'Agile', 'UAT']
    },
    rightCard: {
      title: 'Business Analyst Intern',
      subtitle: 'Incentius',
      points: [
        'Supported data analysis for sales compensation (ICM) plans.',
        'Created and maintained dashboards to visualize key performance indicators (KPIs).',
      ],
      skills: ['Data Analysis', 'Excel', 'Tableau', 'SQL']
    }
  },
];

// --- CARD COMPONENT ---
function TimelineItem({ item, side, onHover, onLeave }) {
  const { type, date, title, subtitle, points, skills } = item;
  const isLeft = side === 'left';
  const alignment = 'text-left';
  const cardLayout = isLeft ? 'md:mr-auto' : 'md:ml-auto';

  return (
    <motion.div
      className={`relative w-full md:w-[calc(50%-2.5rem)] ${cardLayout} mb-8 md:mb-0`}
      // Slide-in animation for cards
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave} // Reset bg when mouse leaves
    >
      <motion.div
        className={`bg-gray-900/80 p-6 rounded-lg border border-gray-700 ${alignment}
                    backdrop-blur-md shadow-lg h-full flex flex-col justify-center`}
        whileHover={{ 
          scale: 1.03, 
          borderColor: "rgb(251 146 60)", 
          boxShadow: "0px 0px 15px rgba(251, 146, 60, 0.3)" 
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <div className="w-full">
          <span className={`text-sm font-semibold ${type === 'Education' ? 'text-cyan-400' : 'text-purple-400'}`}>
            {type.toUpperCase()}
          </span>
          <p className="text-sm text-gray-400 mb-1">{date}</p>
          <h3 className="text-xl text-white font-semibold mb-1">{title}</h3>
          <h4 className="text-md text-gray-300 mb-4">{subtitle}</h4>
          
          <ul className={`space-y-2 list-disc list-inside text-gray-400 text-sm text-left`}>
            {points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          
          <div className={`flex flex-wrap gap-2 mt-4 ${isLeft ? 'justify-start' : 'justify-end'}`}>
            {skills.map((skill, i) => (
              <span key={i} className="text-xs bg-gray-800 text-orange-400 px-2 py-0.5 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- MAIN COMPONENT ---
export default function Education({ addToRefs }) {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const scrollTriggerRef = useRef(null); // Ref for the spacer
  const [currentBg, setCurrentBg] = useState(DEFAULT_BG);

  // Safely register ref for parent navigation
  useEffect(() => {
    if (sectionRef.current && addToRefs) {
      addToRefs(sectionRef.current);
    }
  }, [addToRefs]);

  // 1. Line Drawing Animation
  const { scrollYProgress: lineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineScaleY = useTransform(lineProgress, [0, 1], [0, 1]);

  // 2. Background Parallax
  const { scrollYProgress: bgProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgPosX = useTransform(bgProgress, [0, 1], ["0%", "100%"]);

  // 3. Title Animation (Tracks the spacer)
  const { scrollYProgress: spacerProgress } = useScroll({
    target: scrollTriggerRef, 
    offset: ["start start", "end start"], 
  });

  // Title Animation Logic (VISIBLE BY DEFAULT):
  // 0.0 - 0.5: Move from Center (40vh) to Top (0vh) & Shrink (1.5x -> 1x)
  // 0.5 - 0.8: HOLD at Top (0vh)
  // 0.8 - 1.0: EXIT UP (-10vh) & Fade Out
  // FIX: Reduced exit distance further to -10vh.
  const titleY = useTransform(spacerProgress, [0, 0.5, 0.8, 1.0], ["40vh", "0vh", "0vh", "-10vh"]);
  const titleScale = useTransform(spacerProgress, [0, 0.5], [1.5, 1]);
  
  // FIX: Opacity is 1 from the very start (0), then fades out at the very end
  const titleOpacity = useTransform(spacerProgress, [0, 0.8, 1.0], [1, 1, 0]);

  return (
    <section 
      id="education" 
      ref={sectionRef} 
      className="relative min-h-screen flex flex-col justify-start px-4 md:px-10 py-0"
    >
      {/* Background Wrapper */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('${currentBg}')`,
            backgroundSize: 'cover',
            backgroundPositionX: bgPosX, 
            backgroundPositionY: 'center',
            transition: "background-image 0.7s ease-in-out",
          }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        </motion.div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full">
        
        {/* Animated Title */}
        {/* sticky top-10 ensures it pins higher up on the screen */}
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold text-orange-500 mb-0 text-center sticky top-10 z-30"
          style={{
            y: titleY,
            scale: titleScale,
            opacity: titleOpacity
          }}
        >
          Education & Experience
        </motion.h2>
        
        {/* SPACER: Reduced from 150vh to 110vh to reduce scrolling distance */}
        <div ref={scrollTriggerRef} className="h-[60vh] w-full pointer-events-none" />

        {/* Timeline Container */}
        {/* Reduced margin-top from mt-64 to mt-24 to bring cards closer to title */}
        <div ref={timelineRef} className="relative w-full max-w-5xl mx-auto mt-10 pb-24">
          
          {/* Central Line */}
          <motion.div
            className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-1 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)] hidden md:block"
            style={{ 
              scaleY: lineScaleY, 
              transformOrigin: "top" 
            }}
          />
          
          {/* Timeline Items */}
          <div className="relative flex flex-col gap-y-8 md:gap-y-12">
            {timelineData.map((item, index) => (
              <div key={item.id} className="relative z-10">
                
                {/* Dot */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 
                              rounded-full bg-gray-900 border-4 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,1)] hidden md:block" 
                />
                
                {item.isDual ? (
                  <div className="flex flex-col md:flex-row w-full justify-between">
                    <TimelineItem 
                      item={{ type: item.type, date: item.date, ...item.leftCard }} 
                      side={'left'}
                      onHover={() => setCurrentBg(item.bgImage)}
                      onLeave={() => setCurrentBg(DEFAULT_BG)}
                    />
                    <div className="h-4 md:h-0" />
                    <TimelineItem 
                      item={{ type: item.type, date: item.date, ...item.rightCard }} 
                      side={'right'} 
                      onHover={() => setCurrentBg(item.bgImage)}
                      onLeave={() => setCurrentBg(DEFAULT_BG)}
                    />
                  </div>
                ) : (
                  <TimelineItem 
                    item={item} 
                    side={index % 2 === 0 ? 'left' : 'right'} 
                    onHover={() => setCurrentBg(item.bgImage)}
                    onLeave={() => setCurrentBg(DEFAULT_BG)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
