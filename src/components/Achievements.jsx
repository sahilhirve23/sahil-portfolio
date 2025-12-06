import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  FileText, 
  Cpu, 
  Terminal, 
  ExternalLink, 
  Trophy, 
  Users,
  ShieldCheck,
  ScrollText,
  Download,
  X,
  Maximize2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// --- Animation Variants ---

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "backOut" }
  }
};

// --- Helper Functions ---

const getDriveId = (url) => {
  if (!url) return null;
  const match = url.match(/\/d\/(.+?)\//) || url.match(/\/d\/(.+?)$/);
  return match ? match[1] : null;
};

const getDriveThumbnail = (url) => {
  const id = getDriveId(url);
  return id ? `https://googleusercontent.com/profile/picture/0{id}` : url;
};

// --- Data Constants ---

const FEATURED_AWARDS = [
  {
    id: "AWRD-01",
    title: "Best Paper Award",
    category: "Research",
    organization: "ICCEUBEA 2025",
    icon: <FileText className="w-5 h-5 text-orange-500" />,
    desc: "Awarded for outstanding research in Computer Vision. Recognized for innovation in image forgery detection and passive forensics.",
    stats: [
      { label: "DOMAIN", value: "CV / AI" },
      { label: "YEAR", value: "2025" }
    ],
    images: [
      "https://media.licdn.com/dms/image/v2/D4D22AQHgo8JQ5ApPtg/feedshare-shrink_1280/B4DZjbv0a1H4Aw-/0/1756033403788?e=1766016000&v=beta&t=iDlYC8tQl5BlrjFr8ian1uVeK8wQNyZxRxLGTzf-Q94",
      "https://media.licdn.com/dms/image/v2/D4D22AQFPlhrpqAuGUw/feedshare-shrink_1280/B4DZjbv0bEHwAs-/0/1756033403311?e=1766016000&v=beta&t=1RKAKt-c0jZXslWq9KDDOVvlUX8VadmVMsMP31Gm6PM"
    ],
    link: "https://www.linkedin.com/posts/sahil-hirve_research-icubeca2025-computervision-activity-7365337940140474368-GpQS",
    isDrive: false
  },
  {
    id: "AWRD-02",
    title: "Outstanding ACM Chapter Award",
    category: "Leadership",
    organization: "ACM India",
    icon: <Users className="w-5 h-5 text-orange-400" />,
    desc: "Received under my leadership as Vice President of the PCCOE ACM Student Chapter for exceptional community impact.",
    stats: [
      { label: "ROLE", value: "VICE PRESIDENT" },
      { label: "SCOPE", value: "NATIONAL" }
    ],
    images: [
      "https://scontent.cdninstagram.com/v/t51.75761-15/484643515_18349595587197408_4904476524561512577_n.webp?stp=dst-webp_s1080x1080&_nc_cat=109&ig_cache_key=MzU4ODg2OTQxODkxNDA3MDE3Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4OTU4LnNkci5DMyJ9&_nc_ohc=8wIPEL5oji0Q7kNvwHptwsd&_nc_oc=Adk8lL8ScD9N5zWbnXU051xajQO_rzmYTslrb6U3e3bVNMCC88DE_6zmOaA_rSclElY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=AsefHXCq22uryANmQBH86A&oh=00_AfgEz9BqqeqDeI1dc80UDo03YyDchePAH-pyXZKquP222g&oe=69334F7C"
    ],
    link: "https://www.instagram.com/p/DHOObtnISzW/",
    isDrive: false
  },
  {
    id: "AWRD-03",
    title: "ACM Winter School - Explainable AI",
    category: "Education / AI",
    organization: "ACM India",
    icon: <Cpu className="w-5 h-5 text-blue-400" />,
    desc: "Selected for the prestigious ACM India Winter School focusing on Explainable AI (XAI), engaging with cutting-edge interpretability frameworks.",
    stats: [
      { label: "TOPIC", value: "XAI" },
      { label: "STATUS", value: "ATTENDED" }
    ],
    images: [
      "https://drive.google.com/file/d/17FCz3A2sDbNWxHxuHshA6Z8vu5nW-m27/view?usp=drive_link",
      "https://drive.google.com/file/d/1IWfROMus7C91xfB2bhi4LAH9ZDgT9y2Z/view?usp=drive_link",
      "https://drive.google.com/file/d/1rt6L8hzvdppMUhNEiX12PgzjAHzWYPpF/view?usp=drive_link"
    ], 
    link: "https://drive.google.com/file/d/17FCz3A2sDbNWxHxuHshA6Z8vu5nW-m27/view?usp=drive_link",
    isDrive: true
  },
  {
    id: "AWRD-04",
    title: "Microsoft Office Specialist - Excel",
    category: "Competition",
    organization: "Microsoft / Sankalp",
    icon: <Trophy className="w-5 h-5 text-yellow-500" />,
    desc: "Secured All India Rank 5 (AIR 5) in the Microsoft Office Specialist Championship. Demonstrated elite data management proficiency.",
    stats: [
      { label: "RANK", value: "AIR 05" },
      { label: "LEVEL", value: "NATIONAL" }
    ],
    images: [
      "https://drive.google.com/file/d/1IAbsaC1BNA9x95c3lKRLBvFUL9b0Ul4x/view?usp=drive_link"
    ], 
    link: "https://drive.google.com/file/d/1IAbsaC1BNA9x95c3lKRLBvFUL9b0Ul4x/view?usp=drive_link",
    isDrive: true
  }
];

const METRICS_DATA = [
  { label: "HackerRank C++", value: "5 STAR", sub: "Problem Solving", icon: <Terminal className="w-4 h-4" /> },
  { label: "National Winner", value: "My India Campaign", sub: "Pilot Pen Campaign", icon: <Award className="w-4 h-4" /> },
  { label: "ACM Student Chapter", value: "VICE PRESIDENT", sub: "Leadership Role", icon: <Users className="w-4 h-4" /> },
  { label: "NPTEL Certification", value: "SILVER", sub: "Petroleum Data Analytics", icon: <ShieldCheck className="w-4 h-4" /> },
];

const CERTIFICATIONS_DATA = [
  {
    id: "CERT-01",
    title: "Google Data Analytics",
    issuer: "Google",
    link: "https://drive.google.com/file/d/1oRnZ5FVQsZVejwAKcIc96vizIlH1upV7/view?usp=drive_link",
    isDrive: true
  },
  {
    id: "CERT-02",
    title: "AI Bootcamp",
    issuer: "CDAC Pune",
    link: "https://drive.google.com/file/d/1u5ygd_5jMqcV87wRjOnMu4HGPUHDf_L1/view?usp=drive_link",
    isDrive: true
  },
  {
    id: "CERT-03",
    title: "AWS Internship",
    issuer: "Oytie Ltd / Red Hat",
    link: "https://drive.google.com/file/d/1I-9AEEQwFSpxcoOxTF7GyLIRd_lh3bCj/view?usp=drive_link",
    isDrive: true
  },
  {
    id: "CERT-04",
    title: "Python for Data Science",
    issuer: "Udemy / Pierian Data",
    link: "https://drive.google.com/file/d/143NKYZEgfO7NjtL-QBjipRC-nBhoIDs_/view?usp=drive_link",
    isDrive: true
  },
  {
    id: "CERT-05",
    title: "Spring Boot & Hibernate",
    issuer: "Udemy / Chad Darby",
    link: "https://drive.google.com/file/d/1a-V6qIY2EuNUlhCXlMyTQ0Jytw_Gdt-d/view?usp=drive_link",
    isDrive: true
  },
  {
    id: "CERT-06",
    title: "ACM Winter School",
    issuer: "ACM India",
    link: "https://drive.google.com/file/d/1j51cwHlvxZ3fFCSqIxaW9w4V5rGYI05e/view?usp=drive_link",
    isDrive: true
  },
  {
    id: "CERT-07",
    title: "MS-CIT Certification",
    issuer: "MSBTE",
    link: "https://drive.google.com/file/d/1w-LAlBJsf3F__n8cshUEQnjbwS-aNCAx/view?usp=drive_link",
    isDrive: true
  },
  {
    id: "CERT-08",
    title: "AWS Fundamentals",
    issuer: "Udemy",
    link: "https://drive.google.com/file/d/18tsGw2lq2NAhNOKGvcuYuMCaZp64H0_s/view?usp=drive_link",
    isDrive: true
  },
  {
    id: "CERT-09",
    title: "Petroleum Data Analytics",
    issuer: "NPTEL",
    link: "https://drive.google.com/file/d/19ghWhU2Vv5s0E91kVDpahEbdPMRv9133/view?usp=drive_link",
    isDrive: true
  }
];

// --- Components ---

const SectionHeading = ({ icon, title }) => (
  <motion.h3 
    variants={fadeInUp}
    whileHover={{ scale: 1.05, originX: 0 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center gap-3 border-l-4 border-orange-500 pl-4 w-fit cursor-default"
  >
    <span className="p-1.5 bg-orange-500/10 rounded-md border border-orange-500/20">
      {React.cloneElement(icon, { className: "w-5 h-5 md:w-6 md:h-6 text-orange-500" })}
    </span>
    {title}
  </motion.h3>
);

const StatusBadge = ({ status }) => {
  const getColors = (s) => {
    if (s === "VERIFIED" || s === "WINNER" || s === "SELECTED" || s === "SILVER") 
      return "text-orange-400 border-orange-400/30 bg-orange-400/10";
    if (s === "RANKED") 
      return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
    return "text-gray-400 border-gray-400/30 bg-gray-400/10";
  };

  return (
    <span className={`px-2 py-0.5 text-[10px] font-mono border ${getColors(status)} rounded uppercase tracking-wider`}>
      [{status}]
    </span>
  );
};

// --- Preview Modal Component ---
const PreviewModal = ({ item, initialIndex = 0, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!item) return null;

  const images = item.images && item.images.length > 0 ? item.images : (item.link ? [item.link] : []);
  const hasMultiple = images.length > 1;
  const currentUrl = images[currentIndex];
  const isDriveUrl = (url) => url.includes('drive.google.com') || url.includes('googleusercontent.com');
  const isCurrentDrive = isDriveUrl(currentUrl);
  const driveId = isCurrentDrive ? getDriveId(currentUrl) : null;
  const previewUrl = driveId ? `https://drive.google.com/file/d/${driveId}/preview` : currentUrl;
  const downloadUrl = driveId ? `https://drive.google.com/u/0/uc?id=${driveId}&export=download` : currentUrl;

  const handlePrev = (e) => {
    e.stopPropagation();
    setLoading(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLoading(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-md p-4 md:p-8"
      onClick={onClose}
    >
      {/* Header - Made flex-wrap and adjusted sizing for mobile */}
      <div className="flex flex-row justify-between items-start md:items-center mb-4 text-white w-full max-w-6xl mx-auto gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col flex-1 min-w-0">
          <h2 className="text-base md:text-xl font-bold flex items-center gap-2 truncate">
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-orange-500 shrink-0" />
            <span className="truncate">{item.title}</span>
          </h2>
          <span className="text-[10px] md:text-xs text-gray-400 font-mono mt-1 truncate">
            {item.issuer || item.organization || "CERTIFICATE_PREVIEW"} 
            {hasMultiple && ` [${currentIndex + 1}/${images.length}]`}
          </span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <a 
            href={downloadUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 md:py-2 md:px-4 bg-orange-500 hover:bg-orange-600 text-black text-xs md:text-sm font-bold rounded transition-colors"
          >
            <Download className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden md:inline">DOWNLOAD</span>
          </a>
          <button 
            onClick={onClose}
            className="p-1.5 md:p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      <div 
        className="flex-grow relative w-full max-w-6xl mx-auto flex items-center justify-center min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {hasMultiple && (
          <>
            {/* Buttons positioned relatively for mobile, absolute for desktop */}
            <button 
              onClick={handlePrev}
              className="absolute left-2 md:-left-12 z-20 p-2 bg-black/50 hover:bg-orange-500 hover:text-black text-white rounded-full transition-all border border-gray-700 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-2 md:-right-12 z-20 p-2 bg-black/50 hover:bg-orange-500 hover:text-black text-white rounded-full transition-all border border-gray-700 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <div className="relative w-full h-full bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 shadow-2xl flex items-center justify-center">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-orange-500 font-mono bg-black/20 z-0">
              <div className="animate-spin mr-2 h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full"></div>
              LOADING_DATA...
            </div>
          )}
          
          {(isCurrentDrive || item.isPdf) ? (
            <iframe 
              src={previewUrl} 
              className="w-full h-full z-10 relative" 
              allow="autoplay" 
              onLoad={() => setLoading(false)}
              title="Document Preview"
            />
          ) : (
            <img 
              src={currentUrl} 
              alt={`Preview ${currentIndex + 1}`} 
              className="max-w-full max-h-full object-contain z-10 relative"
              onLoad={() => setLoading(false)}
            />
          )}
        </div>
      </div>
    </motion.div>,
    document.body
  );
};

// --- Cards ---

const AwardCard = ({ item, index, onPreview }) => {
  const gridClass = item.images && item.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2';

  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-[#0a0a0a] border border-gray-800 hover:border-orange-500/50 transition-all duration-300 rounded-lg overflow-hidden flex flex-col h-full z-10 cursor-default"
    >
      <div className="flex justify-between items-center p-3 md:p-4 border-b border-gray-800 bg-gray-900/30 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-wider">
          {item.icon}
          <span className="truncate max-w-[120px] md:max-w-none">{item.category}</span>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <div className="p-4 md:p-8 grid md:grid-cols-2 gap-6 h-full items-stretch flex flex-col-reverse md:grid">
        <div className="flex flex-col justify-between order-2 md:order-1">
          <div>
            <motion.h3 
              className="text-lg md:text-2xl font-bold text-white mb-2 transition-colors group-hover:text-orange-400 group-hover:drop-shadow-[0_0_5px_rgba(249,115,22,0.3)]"
              variants={{ hover: { scale: 1.02 } }}
            >
              {item.title}
            </motion.h3>
            <p className="text-xs md:text-sm font-mono text-gray-500 mb-2 md:mb-4">{item.organization}</p>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 border-l-2 border-gray-800 pl-4 group-hover:border-orange-500/50 transition-colors group-hover:text-gray-300">
              {item.desc}
            </p>
          </div>
          
          {item.link && item.link !== '#' && (
            <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] font-mono text-orange-500/70 hover:text-orange-400 transition-colors mt-auto pt-2"
            >
                <span>View Verification Source</span>
                <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <div className="order-1 md:order-2 flex flex-col">
            {/* Added specific height for mobile to prevent collapse, auto for desktop */}
            <div className="h-48 md:h-auto md:min-h-[14rem] md:flex-grow flex flex-col">
              {item.images && item.images.length > 0 ? (
                  <div className={`grid gap-2 flex-grow w-full h-full ${gridClass}`}>
                     {item.images.map((img, i) => {
                        const isThree = item.images.length === 3;
                        const spanClass = isThree && i === 0 ? 'col-span-2' : 'col-span-1';

                        return (
                          <div 
                            key={i} 
                            onClick={() => onPreview({ item, initialIndex: i })} 
                            className={`relative w-full h-full bg-gray-900 rounded border border-gray-800 overflow-hidden shadow-inner cursor-zoom-in group/img ${spanClass}`}
                          >
                              <img 
                                  src={getDriveThumbnail(img)} 
                                  alt={`${item.title} ${i+1}`} 
                                  className="w-full h-full object-cover opacity-70 group-hover/img:opacity-100 transition-all duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 pointer-events-none"></div>
                              <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded opacity-0 group-hover/img:opacity-100 transition-opacity">
                                <Maximize2 className="w-4 h-4 text-white" />
                              </div>
                          </div>
                        );
                     })}
                  </div>
              ) : (
                  <div className="relative w-full h-full bg-gray-900/50 rounded border border-dashed border-gray-800 flex flex-col items-center justify-center text-center p-4 group-hover:border-orange-500/30 transition-colors">
                      <Trophy className="w-8 h-8 text-gray-700 mb-2 group-hover:text-orange-500/50 transition-colors" />
                      <span className="text-[10px] font-mono text-gray-600">No Visual Data</span>
                  </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-3">
                 {item.stats.map((stat, i) => (
                    <div key={i} className="bg-gray-900 border border-gray-800 p-1.5 rounded text-center group-hover:border-orange-500/20 transition-colors">
                        <div className="text-[9px] text-gray-500 font-mono uppercase">{stat.label}</div>
                        <div className="text-xs text-white font-mono group-hover:text-orange-200 transition-colors">{stat.value}</div>
                    </div>
                 ))}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatsBar = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
   
    useEffect(() => {
      const interval = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
      return () => clearInterval(interval);
    }, []);
   
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-8 text-[10px] md:text-xs font-mono text-gray-500 bg-gray-900/50 px-4 md:px-6 py-2 rounded-full border border-gray-800/50 mt-4 max-w-full">
        <span>AWARDS: {FEATURED_AWARDS.length}</span>
        <span>TIME: {currentTime}</span>
        <span className="text-orange-500/80">STATUS: VERIFIED</span>
      </div>
    );
};

const Achievements = ({ addToRefs }) => {
  const [previewState, setPreviewState] = useState(null); 
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
   
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundX = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
   
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (scrollContainerRef.current) {
        const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
        scrollContainerRef.current.scrollLeft = latest * maxScroll;
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleRef = (el) => {
    if (el) {
        containerRef.current = el;
        if (typeof addToRefs === 'function') {
            addToRefs(el);
        }
    }
  };

  const scrollableList = [...CERTIFICATIONS_DATA, ...CERTIFICATIONS_DATA, ...CERTIFICATIONS_DATA];

  return (
    <section 
      id="achievements" 
      ref={handleRef}
      className="relative min-h-screen py-16 md:py-20 text-gray-200 overflow-hidden font-sans selection:bg-orange-500/30"
    >
      <div className="absolute inset-0 w-full h-full bg-[#050505] -z-50" />

      <motion.div 
        className="absolute inset-y-0 left-0 w-[160%] h-full -z-40 pointer-events-none" 
        style={{ x: backgroundX }}
      >
         <img 
           src="https://www.shutterstock.com/image-vector/empty-dark-orange-red-studio-600nw-2439098863.jpg"
           alt="Background"
           className="w-full h-full object-cover opacity-50"
           style={{ filter: "saturate(0.8)" }}
           referrerPolicy="no-referrer"
         />
      </motion.div>

      <div className="absolute inset-0 z-[-30] bg-black/40 backdrop-blur-[1px] pointer-events-none" />

      {/* Optimized Padding for Mobile */}
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        
        {/* Section Header with Hover Effects */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col items-center justify-center mb-10 md:mb-16 space-y-6"
        >
           <motion.div variants={fadeInUp} className="text-center w-full">
              <motion.h2 
                initial="initial"
                whileHover="hover"
                variants={{ hover: { scale: 1.05, transition: { duration: 0.3 } } }}
                // Responsive text size: text-3xl on mobile, text-5xl on desktop
                className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-2 cursor-default flex flex-col md:block"
              >
                <motion.span 
                  className="inline-block"
                  variants={{ initial: { color: "#ffffff" }, hover: { color: "#f97316" } }}
                  transition={{ duration: 0.3 }}
                >
                  Achievements
                </motion.span>
                <span className="hidden md:inline">{" & "}</span>
                <span className="md:hidden text-orange-500 py-1 text-xl">&</span>
                <motion.span 
                  className="inline-block"
                  variants={{ initial: { color: "#ffffff" }, hover: { color: "#f97316" } }}
                  transition={{ duration: 0.3 }}
                >
                  Certifications
                </motion.span>
              </motion.h2>
              <div className="flex justify-center mt-2 md:mt-4">
                  <div className="h-1 w-12 md:w-16 bg-orange-500 rounded-full"></div>
              </div>
           </motion.div>
           <motion.div variants={fadeInUp}>
             <StatsBar />
           </motion.div>
        </motion.div>

        {/* Featured Achievements Grid */}
        <div className="mb-16 md:mb-24">
            <SectionHeading icon={<Award />} title="Achievements" />
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
            >
            {FEATURED_AWARDS.map((award, idx) => (
                <AwardCard 
                    key={award.id}
                    item={award}
                    index={idx}
                    onPreview={setPreviewState}
                />
            ))}
            </motion.div>
        </div>

        {/* Metrics Bar with Hover Effects */}
        <div className="mb-16 md:mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {METRICS_DATA.map((metric, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }} // Added tap feedback for mobile
                className="bg-gray-900/50 border border-gray-800 p-3 md:p-4 rounded hover:bg-gray-800 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 group-hover:text-orange-500 transition-all">
                    {metric.icon}
                </div>
                <div className="text-[9px] md:text-[10px] text-gray-500 font-mono uppercase mb-1">Stat_0{idx+1}</div>
                <div className="text-lg md:text-xl font-bold text-white mb-1 leading-tight group-hover:text-orange-400 group-hover:drop-shadow-[0_0_5px_rgba(249,115,22,0.5)] transition-all truncate">
                  {metric.value}
                </div>
                <div className="text-[10px] md:text-xs text-orange-400 font-mono uppercase tracking-wide truncate group-hover:text-white transition-colors">{metric.label}</div>
                <div className="text-[9px] md:text-[10px] text-gray-600 mt-1 font-mono group-hover:text-gray-400 transition-colors truncate">{metric.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Parallax + Manual Scroll Certificate Stream */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="relative w-full"
      >
         <div className="container mx-auto px-4 md:px-10 mb-4">
            <SectionHeading icon={<ScrollText />} title="Certifications" />
         </div>
         
         <div 
           ref={scrollContainerRef}
           className="w-full border-y border-gray-800 bg-gray-900/80 py-6 md:py-8 overflow-x-auto backdrop-blur-md [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-gray-900/20 [&::-webkit-scrollbar-thumb]:bg-orange-500/20 hover:[&::-webkit-scrollbar-thumb]:bg-orange-500/80 transition-colors"
         >
            <div className="flex items-center gap-4 md:gap-6 w-max pl-4 md:pl-10 pr-4 md:pr-10 cursor-grab active:cursor-grabbing">
            {scrollableList.map((cert, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }} // Added tap feedback for mobile
                  className="bg-[#0a0a0a] border border-gray-800 p-3 rounded-lg hover:border-orange-500/50 transition-colors duration-300 group flex flex-col gap-3 min-w-[200px] max-w-[200px] md:min-w-[220px] md:max-w-[240px]"
                >
                    <div 
                      className="aspect-video w-full bg-gray-800 rounded overflow-hidden relative border border-gray-800 group-hover:border-orange-500/30 transition-colors cursor-pointer"
                      onClick={() => setPreviewState({ item: cert, initialIndex: 0 })}
                    >
                        {cert.isPdf ? (
                           <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-500">
                             <FileText className="w-10 h-10 md:w-12 md:h-12 mb-2 group-hover:text-orange-500 transition-colors" />
                             <span className="text-[10px] font-mono">PREVIEW PDF</span>
                           </div>
                        ) : (
                           <img 
                              src={getDriveThumbnail(cert.link)} 
                              onError={(e) => {
                                  e.target.onerror = null; 
                                  e.target.style.display = 'none';
                                  e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-900 text-gray-600 font-mono text-[10px]">CERTIFICATE</div>`;
                              }}
                              alt={cert.title}
                              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
                           />
                        )}
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                          <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                             <Maximize2 className="w-4 h-4 text-white" />
                          </div>
                    </div>
                    
                    <div>
                        <h4 className="text-gray-200 font-mono text-xs md:text-sm truncate font-bold group-hover:text-orange-400 group-hover:drop-shadow-[0_0_3px_rgba(249,115,22,0.3)] transition-all" title={cert.title}>
                          {cert.title}
                        </h4>
                        <div className="flex justify-between items-center mt-2 border-t border-gray-800 pt-2">
                            <span className="text-[9px] md:text-[10px] text-orange-500 font-mono flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> VERIFIED
                            </span>
                            <span className="text-[9px] md:text-[10px] text-gray-500 font-mono truncate max-w-[80px]">{cert.issuer}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
            </div>
         </div>
      </motion.div>

      <AnimatePresence>
        {previewState && (
          <PreviewModal 
            item={previewState.item} 
            initialIndex={previewState.initialIndex}
            onClose={() => setPreviewState(null)} 
          />
        )}
      </AnimatePresence>

    </section>
  );
};

export default Achievements;
