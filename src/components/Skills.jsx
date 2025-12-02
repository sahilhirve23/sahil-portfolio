import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  BarChart3, 
  Mic, 
  Music, 
  Users, 
  Waves, 
  Flower2, 
  Globe,
  Sparkles,
  Zap,
  FileSpreadsheet,
  PieChart,
  Brain,
  Eye,
  Coffee,
  FileText,
  Database,
  Layout,
  Flame,
  Trophy,
  Star,
  ExternalLink
} from 'lucide-react';

// --- Configuration & Data ---

// Adjusted angles for Diamond shape quadrants
const SKILL_CATEGORIES = {
  AI_ML: { label: "AI & Data Science", color: "#3b82f6", angleStart: 270, angleEnd: 360 },     // Top Right
  TOOLS: { label: "Tools & Analytics", color: "#8b5cf6", angleStart: 0, angleEnd: 90 },        // Bottom Right
  WEB: { label: "Web Technologies", color: "#10b981", angleStart: 90, angleEnd: 180 },         // Bottom Left
  LANGUAGES: { label: "Core Languages", color: "#f97316", angleStart: 180, angleEnd: 270 },    // Top Left
};

const SKILLS_DATA = [
  { id: "s1", name: "Data Analytics", category: "AI_ML", level: 90, icon: <BarChart3 className="w-4 h-4" />, details: "Google Cert, Visualization" },
  { id: "s2", name: "Excel", category: "TOOLS", level: 95, icon: <FileSpreadsheet className="w-4 h-4" />, details: "Microsoft Specialist (AIR 5)" },
  { id: "s3", name: "Database", category: "TOOLS", level: 80, icon: <Database className="w-4 h-4" />, details: "SQL / NoSQL" },
  { id: "s4", name: "BA Tools", category: "TOOLS", level: 80, icon: <PieChart className="w-4 h-4" />, details: "Power BI, Tableau" },
  { id: "s5", name: "Machine Learning", category: "AI_ML", level: 80, icon: <Brain className="w-4 h-4" />, details: "Pandas, Scikit-learn" },
  { id: "s6", name: "Computer Vision", category: "AI_ML", level: 90, icon: <Eye className="w-4 h-4" />, details: "OpenCV, CNNs" },
  { id: "s7", name: "Java", category: "LANGUAGES", level: 75, icon: <Coffee className="w-4 h-4" />, details: "Spring Boot Basics" },
  { id: "s8", name: "C++", category: "LANGUAGES", level: 70, icon: <Terminal className="w-4 h-4" />, details: "DSA Foundations" },
  { id: "s9", name: "HTML/CSS/JS", category: "WEB", level: 45, icon: <Layout className="w-4 h-4" />, details: "Frontend Basics" },
  { id: "s10", name: "Documentation", category: "TOOLS", level: 95, icon: <FileText className="w-4 h-4" />, details: "Tech Writing, MS Office" },
];

const HOBBIES_DATA = [
  { id: "HOB-01", name: "Singing", icon: <Mic className="w-6 h-6 text-orange-500" />, desc: "Singing is my soul's language; I simply love to express myself through song." },
  { id: "HOB-02", name: "Instruments", icon: <Music className="w-6 h-6 text-blue-500" />, desc: "Playing instruments is how I calm my mind and find my rhythm in chaos." },
  { id: "HOB-03", name: "Event Mgmt", icon: <Users className="w-6 h-6 text-green-500" />, desc: "I absolutely love the thrill of managing the Behind-The-Scenes of any event." },
  { id: "HOB-04", name: "Swimming", icon: <Waves className="w-6 h-6 text-cyan-500" />, desc: "There is nothing quite like the feeling of diving straight into the water." },
  { id: "HOB-05", name: "Yoga", icon: <Flower2 className="w-6 h-6 text-rose-500" />, desc: "Yoga has become my daily escape to reset and find my inner balance." },
];

const LANGUAGES_DATA = [
  { name: "English", level: "Professional", code: "EN" },
  { name: "Hindi", level: "Native", code: "HI" },
  { name: "Marathi", level: "Native", code: "MR" },
  { name: "Spanish", level: "Beginner (A2)", code: "ES" },
];

// --- Helper Math Functions ---

const degToRad = (deg) => (deg * Math.PI) / 180;

// Calculate distance from center to diamond edge at a given angle
// Diamond formula (Manhattan distance/L1 norm logic rotated): r = R / (|cos theta| + |sin theta|)
const getDiamondRadiusAtAngle = (angleDeg, maxRadius) => {
    const angleRad = degToRad(angleDeg);
    return maxRadius / (Math.abs(Math.cos(angleRad)) + Math.abs(Math.sin(angleRad)));
};

const getCoordinates = (angleDeg, value, maxRadius, center) => {
  const angleRad = degToRad(angleDeg);
  // Calculate the max radius possible at this angle for a diamond shape
  const limitRadius = getDiamondRadiusAtAngle(angleDeg, maxRadius);
  
  // The actual distance is percentage of that limit
  const currentRadius = (value / 100) * limitRadius;
  
  return {
    x: center + currentRadius * Math.cos(angleRad),
    y: center + currentRadius * Math.sin(angleRad)
  };
};

// --- Interactive Matrix Component ---

const CompetencyMatrix = ({ data, activeCategory, setActiveCategory, activeSkill, setActiveSkill }) => {
  const size = 340;
  const center = size / 2;
  const radius = 130; // Max radius (distance from center to a corner of the diamond)

  // Prepare Quadrants (Diamond Slices)
  // Instead of arcs, we draw triangles for the diamond shape
  const quadrants = useMemo(() => {
    return Object.entries(SKILL_CATEGORIES).map(([key, config]) => {
      // Logic for diamond quadrants:
      // AI_ML (Top-Right): Center -> Top (270deg) -> Right (0deg)
      // TOOLS (Bottom-Right): Center -> Right (0deg) -> Bottom (90deg)
      // WEB (Bottom-Left): Center -> Bottom (90deg) -> Left (180deg)
      // LANGUAGES (Top-Left): Center -> Left (180deg) -> Top (270deg)
      
      let p1, p2;

      // Map standard angles to diamond corners
      if (config.angleStart === 270) { // AI_ML: Top to Right
         p1 = { x: center, y: center - radius }; // Top
         p2 = { x: center + radius, y: center }; // Right
      } else if (config.angleStart === 0) { // TOOLS: Right to Bottom
         p1 = { x: center + radius, y: center }; // Right
         p2 = { x: center, y: center + radius }; // Bottom
      } else if (config.angleStart === 90) { // WEB: Bottom to Left
         p1 = { x: center, y: center + radius }; // Bottom
         p2 = { x: center - radius, y: center }; // Left
      } else { // LANGUAGES: Left to Top
         p1 = { x: center - radius, y: center }; // Left
         p2 = { x: center, y: center - radius }; // Top
      }

      const pathData = `M ${center} ${center} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} Z`;

      return { key, pathData, ...config };
    });
  }, [center, radius]);

  // Calculate skill points
  const skillPoints = useMemo(() => {
    const grouped = {};
    data.forEach(skill => {
        if(!grouped[skill.category]) grouped[skill.category] = [];
        grouped[skill.category].push(skill);
    });

    return data.map(skill => {
        const catConfig = SKILL_CATEGORIES[skill.category];
        const siblings = grouped[skill.category];
        const index = siblings.findIndex(s => s.id === skill.id);
        
        // Distribute within the sector
        const sectorSize = catConfig.angleEnd - catConfig.angleStart;
        // Add padding so points don't lie exactly on the axis
        const step = sectorSize / (siblings.length + 1); 
        const angle = catConfig.angleStart + step * (index + 1);
        
        const coords = getCoordinates(angle, skill.level, radius, center);
        return { ...skill, x: coords.x, y: coords.y };
    });
  }, [data, center, radius]);

  // Grid lines for Diamond (concentric diamonds)
  const gridPaths = [33, 66, 100].map(percent => {
      const r = (percent / 100) * radius;
      return `M ${center} ${center - r} L ${center + r} ${center} L ${center} ${center + r} L ${center - r} ${center} Z`;
  });

  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-8 w-full justify-center">
      
      {/* Vertical Legend (Left Side) */}
      <div className="flex flex-col gap-4 w-full md:w-auto min-w-[140px]">
        {Object.entries(SKILL_CATEGORIES).map(([key, cat]) => {
            const isActive = activeCategory === key;
            const isDimmed = activeCategory && !isActive;
            
            return (
                <motion.div
                    key={key}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-all duration-300 ${isActive ? 'bg-gray-900 border-opacity-100 shadow-lg' : 'border-transparent hover:bg-gray-900/40'}`}
                    style={{ 
                        borderColor: isActive ? cat.color : 'transparent',
                        opacity: isDimmed ? 0.3 : 1,
                        scale: isActive ? 1.05 : 1,
                        x: isActive ? 5 : 0
                    }}
                    onMouseEnter={() => setActiveCategory(key)}
                    onMouseLeave={() => setActiveCategory(null)}
                >
                    <div className="w-3 h-3 rotate-45 border" style={{ backgroundColor: cat.color, borderColor: cat.color }} />
                    <span className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wide">{cat.label}</span>
                </motion.div>
            );
        })}
      </div>

      {/* The Diamond Matrix */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg 
            width={size} 
            height={size} 
            viewBox={`0 0 ${size} ${size}`} 
            className="overflow-visible"
        >
          {/* Glow Filter */}
          <defs>
            <filter id="diamond-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render Quadrants */}
          {quadrants.map((quad) => {
             const isActive = activeCategory === quad.key;
             const isDimmed = activeCategory && !isActive;

             return (
               <motion.path
                 key={quad.key}
                 d={quad.pathData}
                 fill={quad.color}
                 stroke={quad.color}
                 strokeWidth="1"
                 fillOpacity={isActive ? 0.25 : 0.05}
                 initial={false}
                 animate={{
                    scale: isActive ? 1.05 : 1,
                    fillOpacity: isActive ? 0.3 : 0.05,
                    strokeOpacity: isActive ? 1 : 0.4
                 }}
                 transition={{ duration: 0.3 }}
                 style={{ 
                    transformOrigin: `${center}px ${center}px`,
                    cursor: 'pointer',
                    filter: isActive ? `url(#diamond-glow)` : 'none',
                    opacity: isDimmed ? 0.3 : 1
                 }}
                 onMouseEnter={() => setActiveCategory(quad.key)}
                 onMouseLeave={() => setActiveCategory(null)}
               />
             );
          })}

          {/* Grid Lines (Diamonds) */}
          {gridPaths.map((path, i) => (
             <path 
                key={i} 
                d={path}
                fill="none" 
                stroke="#333" 
                strokeDasharray="3 3"
                strokeWidth="1" 
                className="pointer-events-none"
             />
          ))}

          {/* Render Skill Points */}
          {skillPoints.map((point) => {
             const isHovered = activeSkill === point.name;
             const inActiveCat = activeCategory === point.category;
             const isRelevant = isHovered || inActiveCat;
             const isDimmed = (activeSkill && !isHovered) || (activeCategory && !inActiveCat);
             
             return (
               <g key={point.id}>
                 {/* Connecting Line to Center */}
                 <motion.line 
                    x1={center} y1={center} x2={point.x} y2={point.y}
                    stroke={SKILL_CATEGORIES[point.category].color}
                    strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isRelevant ? 0.4 : 0 }}
                 />
                 
                 {/* The Point */}
                 <motion.circle
                   cx={point.x}
                   cy={point.y}
                   r={isHovered ? 6 : 4}
                   fill={SKILL_CATEGORIES[point.category].color}
                   stroke="white"
                   strokeWidth={isHovered ? 2 : 0}
                   initial={false}
                   animate={{
                     scale: isHovered ? 1.5 : (inActiveCat ? 1.2 : 1),
                     opacity: isDimmed ? 0.3 : 1
                   }}
                   style={{ 
                     cursor: 'pointer',
                     filter: isHovered ? 'drop-shadow(0 0 6px white)' : 'none'
                   }}
                   onMouseEnter={() => { setActiveSkill(point.name); setActiveCategory(point.category); }}
                   onMouseLeave={() => { setActiveSkill(null); setActiveCategory(null); }}
                 />
                 
                 {/* Label on Hover */}
                 <AnimatePresence>
                   {(isHovered) && (
                     <motion.g
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{ pointerEvents: 'none' }}
                     >
                        <rect 
                            x={point.x - 50} y={point.y - 40} 
                            width="100" height="28" 
                            rx="4" fill="#0a0a0a" stroke={SKILL_CATEGORIES[point.category].color} strokeWidth="1"
                        />
                        <text
                            x={point.x} y={point.y - 22}
                            textAnchor="middle"
                            fill="white"
                            fontSize="11"
                            fontWeight="bold"
                            fontFamily="monospace"
                        >
                            {point.name}
                        </text>
                     </motion.g>
                   )}
                 </AnimatePresence>
               </g>
             );
          })}
        </svg>

        {/* Central Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 border border-gray-600 rotate-45 z-10 pointer-events-none" />
      </div>

    </div>
  );
};

// --- Sub-Components ---

const SectionHeading = ({ icon, title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.02, x: 10 }}
    viewport={{ once: true }}
    className="mb-10 group cursor-default"
  >
    <div className="flex items-center gap-3 mb-2">
      <span className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20 text-orange-500 group-hover:scale-110 transition-transform">
        {icon}
      </span>
      <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight group-hover:text-orange-500 transition-colors duration-300">
        {title}
      </h3>
    </div>
    <p className="text-gray-500 font-mono text-xs md:text-sm pl-12 border-l-2 border-gray-800 ml-3 group-hover:border-orange-500/50 transition-colors">
      {subtitle}
    </p>
  </motion.div>
);

const StatsBar = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
    useEffect(() => {
      const interval = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[10px] md:text-xs font-mono text-gray-500 bg-gray-900/50 px-6 py-2 rounded-full border border-gray-800/50 mt-4">
        <span>SKILLS_LOGGED: {SKILLS_DATA.length}</span>
        <span>SYS_TIME: {currentTime}</span>
        <span className="text-orange-500/80">STATUS: OPTIMIZED</span>
      </div>
    );
};

const SkillBar = ({ skill, index, activeCategory, activeSkill, setActiveSkill, setActiveCategory }) => {
  const isHovered = activeSkill === skill.name;
  // Strong highlight if category is active (hovering quadrant/legend) OR specifically hovering this item
  const isCategoryActive = activeCategory === skill.category;
  
  // Dim if something else is active AND this is not it
  const isDimmed = (activeCategory && !isCategoryActive) || (activeSkill && !isHovered);
  
  const highlightColor = SKILL_CATEGORIES[skill.category].color;
  
  // Dynamic styles for active state
  const containerStyle = isCategoryActive || isHovered 
    ? { borderColor: highlightColor, backgroundColor: 'rgba(255,255,255,0.02)' } 
    : { borderColor: 'transparent', backgroundColor: 'transparent' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      animate={{ 
          opacity: isDimmed ? 0.3 : 1,
          scale: isHovered ? 1.02 : 1,
          x: isHovered ? 10 : 0
      }}
      className="group relative cursor-pointer p-2 rounded-lg border border-transparent transition-all duration-300"
      style={containerStyle}
      onMouseEnter={() => { setActiveSkill(skill.name); setActiveCategory(skill.category); }}
      onMouseLeave={() => { setActiveSkill(null); setActiveCategory(null); }}
    >
      <div className="flex justify-between items-end mb-2">
        <div className="flex items-center gap-2">
          <span 
            className="p-1 rounded bg-gray-900 border border-gray-800 transition-colors duration-300"
            style={{ 
                color: isHovered || isCategoryActive ? highlightColor : '#9ca3af',
                borderColor: isHovered || isCategoryActive ? highlightColor : '#1f2937'
            }}
          >
            {skill.icon}
          </span>
          <span 
            className="font-bold transition-colors duration-300"
            style={{ color: isHovered || isCategoryActive ? 'white' : '#d1d5db' }}
          >
            {skill.name}
          </span>
        </div>
        <span 
            className="font-mono text-xs transition-colors"
            style={{ color: isHovered || isCategoryActive ? highlightColor : 'rgba(249,115,22,0.8)' }}
        >
            {skill.level}%
        </span>
      </div>
      
      <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
          className="h-full relative"
          style={{ 
            backgroundColor: highlightColor,
            filter: isHovered || isCategoryActive ? `drop-shadow(0 0 4px ${highlightColor})` : 'none'
          }}
        >
            <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>
      
      <div 
        className="flex justify-between mt-1 transition-opacity duration-300"
        style={{ opacity: isHovered || isCategoryActive ? 1 : 0 }}
      >
        <span className="text-[10px] text-gray-500 font-mono">{skill.details}</span>
        <span className="text-[10px] font-mono" style={{ color: highlightColor }}>
            {SKILL_CATEGORIES[skill.category].label}
        </span>
      </div>
    </motion.div>
  );
};

const HobbyCard = ({ hobby, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, borderColor: "rgba(249,115,22,0.5)" }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg flex flex-col items-center text-center gap-4 relative overflow-hidden group cursor-default"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="p-4 rounded-full bg-gray-900 border border-gray-800 group-hover:border-orange-500/30 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all duration-300 z-10">
        {hobby.icon}
      </div>
      
      <div className="z-10 w-full">
        <h4 className="text-white font-bold text-lg mb-3">{hobby.name}</h4>
        
        {/* Boxed Description with matching font style */}
        <div className="bg-gray-900/50 border border-gray-800 p-3 rounded-md text-[10px] text-gray-500 font-mono leading-relaxed group-hover:border-orange-500/20 group-hover:text-gray-400 transition-colors">
            {hobby.desc}
        </div>
      </div>
    </motion.div>
  );
};

const LanguageNode = ({ lang, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        // Added scaling, shadow, border glow, and background shift on hover
        className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800 rounded hover:border-orange-500/50 hover:bg-gray-900 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:scale-105 transition-all duration-300 group cursor-default"
    >
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-black border border-gray-700 group-hover:border-orange-500/30 flex items-center justify-center text-[10px] font-mono font-bold text-gray-400 group-hover:text-orange-500 transition-colors">
                {lang.code}
            </div>
            <div>
                <div className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{lang.name}</div>
                <div className="text-[10px] text-gray-600 font-mono group-hover:text-gray-500 transition-colors">Proficiency Level</div>
            </div>
        </div>
        <span className="text-xs font-mono text-orange-500 group-hover:drop-shadow-[0_0_5px_rgba(249,115,22,0.5)] transition-all">{lang.level}</span>
    </motion.div>
);

// --- Duolingo Live Data Simulator ---
const DuolingoCard = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Simulate an API fetch
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5s simulated delay
            
            // Real Data Scraped from Profile
            setUserData({
                username: "SahilHirve",
                streak: 744,
                totalXp: 23596,
                league: "Emerald",
                top3Finishes: 7,
                course: "Spanish",
                progress: 68 // Maintained visual progress as specific unit not visible
            });
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            // Added hover effects: scale, border glow (green), and shadow
            className="mt-4 p-4 rounded-xl bg-[#0a0a0a] border border-[#58cc02]/30 relative overflow-hidden group cursor-default transition-all duration-300 hover:scale-[1.02] hover:border-[#58cc02] hover:shadow-[0_0_20px_rgba(88,204,2,0.2)]"
        >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#58cc02]/10 blur-2xl rounded-full -mr-10 -mt-10 pointer-events-none" />
            
            <div className="relative z-10">
                {/* Header */}
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-between mb-4 p-2 rounded-lg transition-colors hover:bg-[#58cc02]/10"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#58cc02]/20 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(88,204,2,0.2)]">
                           🦉
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm tracking-wide group-hover:text-[#58cc02] transition-colors">Duolingo</h4>
                            {loading ? (
                                <div className="h-2 w-20 bg-gray-800 rounded animate-pulse mt-1" />
                            ) : (
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#58cc02] animate-pulse shadow-[0_0_5px_#58cc02]" />
                                    <a 
                                        href={`https://www.duolingo.com/profile/${userData.username}`} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="text-sm font-bold text-white hover:text-[#58cc02] hover:underline flex items-center gap-1 transition-colors"
                                    >
                                        @{userData.username}
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                        {loading ? (
                            <div className="h-6 w-12 bg-gray-800 rounded animate-pulse" />
                        ) : (
                            <div className="flex items-center gap-1.5 bg-[#0a0a0a]/50 p-1.5 rounded-lg border border-orange-500/20 group-hover:border-orange-500/50 transition-colors">
                                <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-[pulse_1.5s_infinite]" />
                                <span className="text-xl font-bold text-white font-mono">{userData.streak}</span>
                            </div>
                        )}
                        <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider mt-1">Day Streak</span>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-[#151515] p-2 rounded-lg border border-gray-800 flex flex-col items-center justify-center text-center group-hover:border-gray-700 transition-colors hover:bg-gray-800">
                        <Star className="w-4 h-4 text-yellow-400 mb-1" />
                        <span className="text-[10px] text-gray-400 font-mono">Total XP</span>
                        {loading ? <div className="h-3 w-8 bg-gray-800 mt-1 rounded" /> : <span className="text-xs font-bold text-white">{userData.totalXp.toLocaleString()}</span>}
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-[#151515] p-2 rounded-lg border border-gray-800 flex flex-col items-center justify-center text-center group-hover:border-gray-700 transition-colors hover:bg-gray-800">
                        <Trophy className="w-4 h-4 text-blue-400 mb-1" />
                        <span className="text-[10px] text-gray-400 font-mono">League</span>
                        {loading ? <div className="h-3 w-8 bg-gray-800 mt-1 rounded" /> : <span className="text-xs font-bold text-white">{userData.league}</span>}
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-[#151515] p-2 rounded-lg border border-gray-800 flex flex-col items-center justify-center text-center group-hover:border-gray-700 transition-colors hover:bg-gray-800">
                        <div className="w-4 h-4 text-purple-400 font-bold flex items-center justify-center text-[10px] border border-purple-400 rounded-full mb-1">#</div>
                        <span className="text-[10px] text-gray-400 font-mono">Top 3</span>
                        {loading ? <div className="h-3 w-8 bg-gray-800 mt-1 rounded" /> : <span className="text-xs font-bold text-white">{userData.top3Finishes}</span>}
                    </motion.div>
                </div>

                {/* Progress Bar */}
                <motion.div whileHover={{ scale: 1.02 }} className="space-y-1.5 p-2 rounded-lg hover:bg-gray-900/50 transition-colors">
                    <div className="flex justify-between items-end text-[10px] font-mono">
                        <span className="text-gray-400">Current: <span className="text-white">{loading ? "..." : userData.course}</span></span>
                        <span className="text-[#58cc02]">{loading ? "..." : "Level A2"}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        {loading ? (
                            <div className="h-full w-full bg-gray-800" />
                        ) : (
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${userData.progress}%` }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="h-full bg-[#58cc02] shadow-[0_0_8px_#58cc02]"
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

// --- Main Page Component ---

const Skills = ({ addToRefs }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const handleRef = (el) => {
    if (el) {
        containerRef.current = el;
        if (typeof addToRefs === 'function') {
            addToRefs(el);
        }
    }
  };

  return (
    <section 
      id="skills" 
      ref={handleRef}
      className="relative min-h-screen py-24 overflow-hidden selection:bg-orange-500/30"
    >
      {/* 1. Base Black Background */}
      <div className="absolute inset-0 bg-[#050505] -z-50" />

      {/* 2. Parallax Image Layer - Updated Z-Index and Opacity */}
      <motion.div 
        className="absolute inset-y-0 left-0 w-[150%] h-full -z-40 pointer-events-none opacity-40"
        style={{ x: backgroundX }}
      >
        <div className="absolute inset-0 bg-[url('https://i.pinimg.com/736x/75/11/9c/75119c530c58a19abc02f71ce264c503.jpg')] bg-cover bg-center" />
      </motion.div>

      {/* 3. Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-[#050505]/50 to-[#050505] opacity-50 pointer-events-none -z-30" />

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                hover: { scale: 1.05, transition: { duration: 0.3 } }
            }}
            className="text-center group cursor-default"
          >
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              <motion.span 
                className="inline-block"
                variants={{
                    hidden: { color: "#f97316" }, // Orange by default
                    visible: { color: "#f97316" },
                    hover: { color: "#ffffff" }   // White on hover
                }}
              >
                Skills
              </motion.span>
              {" "}
              <span className="text-white">&</span>
              {" "}
              <motion.span 
                className="inline-block"
                variants={{
                    hidden: { color: "#f97316" }, // Orange by default
                    visible: { color: "#f97316" },
                    hover: { color: "#ffffff" }   // White on hover
                }}
              >
                Interests
              </motion.span>
            </h2>
            <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full mb-4" />
            <StatsBar />
          </motion.div>
        </div>

        {/* Analytical Dashboard Section */}
        <div className="grid lg:grid-cols-12 gap-10 mb-24">
            
            {/* Left: Heading + Interactive Matrix */}
            <div className="lg:col-span-6 flex flex-col">
                <SectionHeading 
                    icon={<Zap className="w-5 h-5" />} 
                    title="Technical Skills" 
                    subtitle="HOVER OVER ITEMS TO CROSS-REFERENCE WITH MATRIX"
                />
                
                <div className="relative flex flex-col items-center justify-center flex-grow">
                    <div className="absolute inset-0 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl relative z-10 w-full flex flex-col items-center min-h-[500px] justify-center group transition-all duration-300 hover:scale-[1.02] hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                        <div className="absolute top-6 left-6 flex gap-2 transition-transform duration-300 group-hover:scale-110">
                            <div className="w-2 h-2 rounded-full bg-red-500/50 group-hover:bg-red-500 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-all" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50 group-hover:bg-yellow-500 group-hover:shadow-[0_0_8px_rgba(234,179,8,0.6)] transition-all" />
                            <div className="w-2 h-2 rounded-full bg-green-500/50 group-hover:bg-green-500 group-hover:shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all" />
                        </div>
                        <div className="flex justify-between w-full mb-6 absolute top-12 px-8 transition-all duration-300 group-hover:scale-105 origin-center">
                            <h4 className="text-gray-400 font-mono text-xs tracking-widest uppercase transition-colors group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">Skill Map</h4>
                            <div className="text-[10px] text-gray-600 font-mono transition-colors group-hover:text-orange-400 group-hover:drop-shadow-[0_0_5px_rgba(249,115,22,0.3)]">v2.4.0</div>
                        </div>
                        
                        {/* The New Matrix Component */}
                        <CompetencyMatrix 
                            data={SKILLS_DATA} 
                            activeCategory={activeCategory} 
                            setActiveCategory={setActiveCategory}
                            activeSkill={activeSkill}
                            setActiveSkill={setActiveSkill}
                        />
                        
                    </div>
                </div>
            </div>

            {/* Right: Technical Skill Bars */}
            <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                    {SKILLS_DATA.map((skill, i) => (
                        <SkillBar 
                            key={i} 
                            skill={skill} 
                            index={i} 
                            activeCategory={activeCategory}
                            activeSkill={activeSkill}
                            setActiveCategory={setActiveCategory}
                            setActiveSkill={setActiveSkill}
                        />
                    ))}
                </div>

                {/* Additional Mini-Stats */}
                <div className="mt-10 grid grid-cols-3 gap-4 border-t border-gray-800 pt-6">
                    <div className="text-center group cursor-default">
                        <div className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors">50+</div>
                        <div className="text-[10px] text-gray-500 font-mono uppercase">Events Managed</div>
                    </div>
                    <div className="text-center border-l border-gray-800 group cursor-default">
                        <div className="text-2xl font-bold text-white group-hover:text-blue-500 transition-colors">4+</div>
                        <div className="text-[10px] text-gray-500 font-mono uppercase">Major Projects</div>
                    </div>
                    <div className="text-center border-l border-gray-800 group cursor-default">
                        <div className="text-2xl font-bold text-white group-hover:text-emerald-500 transition-colors">9+</div>
                        <div className="text-[10px] text-gray-500 font-mono uppercase">Certifications</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Hobbies & Languages Grid */}
        <div className="grid lg:grid-cols-3 gap-10">
            {/* Hobbies Column */}
            <div className="lg:col-span-2">
                <SectionHeading 
                    icon={<Sparkles className="w-5 h-5" />} 
                    title="Extracurriculars" 
                    subtitle="Passion and Hobbies"
                />
                <div className="grid md:grid-cols-3 gap-4">
                    {HOBBIES_DATA.map((hobby, i) => (
                        <HobbyCard key={hobby.id} hobby={hobby} index={i} />
                    ))}
                </div>
            </div>

            {/* Languages Column */}
            <div className="lg:col-span-1 flex flex-col">
                 <SectionHeading 
                    icon={<Globe className="w-5 h-5" />} 
                    title="Languages" 
                    subtitle="Comfortable with"
                />
                
                {/* Languages Container Card */}
                <motion.div 
                    whileHover={{ scale: 1.02, borderColor: "rgba(249,115,22,0.5)", boxShadow: "0 0 20px rgba(249,115,22,0.1)" }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-3 bg-[#0a0a0a] p-4 rounded-xl border border-gray-800 mb-4 cursor-default"
                >
                    {LANGUAGES_DATA.map((lang, i) => (
                        <LanguageNode key={i} lang={lang} index={i} />
                    ))}
                </motion.div>
                
                {/* Duolingo Card Integration */}
                <DuolingoCard />
            </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
