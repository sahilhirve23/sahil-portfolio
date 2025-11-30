import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Globe, 
  Eye, 
  Terminal, 
  ShieldCheck, 
  FileText, 
  Code, 
  Layers, 
  BarChart3,
  X,
  ChevronRight,
  Maximize2,
  Lock
} from 'lucide-react';

// --- Animation Variants ---

// Simple Smooth Scale Up Animation (1 second duration)
const simpleScaleVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8
  },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      delay: i * 0.15, // Slight stagger for visual flow
      ease: [0.25, 0.4, 0.25, 1] // Smooth cubic-bezier ease
    }
  })
};

// --- Typewriter Component ---

const TypewriterBlock = ({ text, delay = 0, speed = 5, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    // Reset if text changes
    setDisplayedText('');
    indexRef.current = 0;
    setIsComplete(false);

    const startTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayedText((prev) => prev + text.charAt(indexRef.current));
          indexRef.current++;
        } else {
          setIsComplete(true);
          clearInterval(intervalId);
          if (onComplete) onComplete();
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed, onComplete]);

  return (
    <span className="font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
      {displayedText}
      {!isComplete && <span className="animate-pulse text-orange-500 inline-block w-2 h-4 align-middle ml-0.5">█</span>}
    </span>
  );
};

// --- Data Constants ---

const PROJECT_DATA = [
  {
    id: "PRJ-01",
    title: "Business Dashboard for a Godrej Construction Plant",
    type: "Enterprise BI Platform",
    tech: "Next.js 14 | Supabase (Postgres) | Shadcn UI | TailwindCSS | SWR",
    icon: <BarChart3 className="w-6 h-6 text-orange-500" />,
    stats: [
      { label: "MODULES", value: "12 ACTIVE" },
      { label: "SYNC", value: "REAL-TIME" },
      { label: "EFFORT", value: "~120 HOURS" }
    ],
    status: "OPERATIONAL",
    desc: "A comprehensive Business Intelligence (BI) platform engineered for Godrej Construction. It digitizes site monitoring by tracking hindrances, drawings, and resource utilization in real time.",
    logSections: [
      {
        header: "SYSTEM OVERVIEW",
        content: "A centralized Business Intelligence (BI) platform designed to digitize the entire project monitoring lifecycle for Godrej Construction. The system eliminates manual tracking (spreadsheets/emails) by acting as a Single Source of Truth (SSOT) for all site data, ensuring data integrity and immediacy."
      },
      {
        header: "CORE MODULES",
        content: "1. Hindrances & Inputs: Tracks site-level delays with resolution dates.\n2. Drawings & Approvals: Manages design drawing logs and procurement requests.\n3. Plan vs Actual: Visualizes progress deviations in RCC pouring and financial expenditure.\n4. Tower Finish Dates: Calculates variance between planned and projected finish dates.\n5. Steel Stock: Monitors inventory by diameter (mm) and consumption in Metric Tons."
      },
      {
        header: "TECHNICAL ARCHITECTURE",
        content: "Built on Next.js 14 for Server-Side Rendering (SSR) performance. Utilizes Supabase (Backend-as-a-Service) for robust Postgres database management and Row-Level Security (RLS). Real-time data synchronization is achieved via SWR hooks, ensuring instant updates across Admin, Engineer, and Contractor interfaces."
      },
      {
        header: "IMPACT ANALYSIS",
        content: "Transformed reactive management into proactive control. The 'Tower Finish Dates' module allows management to identify schedule slippages (e.g., 72-day variance) instantly, while the Cash Flow module visualizes budget variances in real time."
      }
    ]
  },
  {
    id: "PRJ-02",
    title: "A YOLOv8-Based System for Automated Military Target Recognition and Surveillance",
    type: "Computer Vision / Edge AI",
    tech: "Python | YOLOv8 | PyTorch | OpenCV | MoviePy | Google Colab T4",
    icon: <Eye className="w-6 h-6 text-red-500" />,
    stats: [
      { label: "mAP", value: "0.88" },
      { label: "PRECISION", value: "0.91" },
      { label: "SPEED", value: "45ms/frame" }
    ],
    status: "OFFLINE",
    desc: "A real-time surveillance system designed to automate the classification of 12 types of military assets utilizing YOLOv8 for high-speed detection.",
    logSections: [
      {
        header: "MISSION OBJECTIVE",
        content: "To automate the identification and classification of defense-related objects in complex environments (camouflage, low light, dynamic backgrounds) where traditional methods fail."
      },
      {
        header: "MODEL ARCHITECTURE",
        content: "Leverages the YOLOv8 architecture (Anchor-Free, Decoupled Head) for its superior speed-accuracy trade-off. The model was fine-tuned on a custom dataset of ~3,000 images across 12 classes (Soldier, Tank, Aircraft, Missile, Warship, etc.) using NVIDIA T4 GPUs."
      },
      {
        header: "PERFORMANCE METRICS",
        content: "Achieved Mean Average Precision (mAP) of 0.88, Precision of 0.91, and Recall of 0.89. Inference speed clocked at ~45ms/frame (22 FPS), making it viable for real-time video surveillance."
      },
      {
        header: "COMPARATIVE ANALYSIS",
        content: "Outperformed Faster R-CNN (high latency of 85ms) and standard CNNs (80% accuracy but no localization). YOLOv8 demonstrated superior robustness in detecting small, overlapping, and camouflaged targets."
      }
    ]
  },
  {
    id: "PRJ-03",
    title: "Autoencoder-Based Compression and Reconstruction of Hubble Telescope Images",
    type: "Deep Learning / Autoencoders",
    tech: "Python | TensorFlow | Keras | Autoencoders | VGG Perceptual Loss",
    icon: <Globe className="w-6 h-6 text-gray-400" />,
    stats: [
      { label: "FIDELITY", value: "HIGH" },
      { label: "LOSS FN", value: "COMPOSITE" }
    ],
    status: "ARCHIVED",
    desc: "A neural compression system developed to efficiently encode and reconstruct high-resolution astronomical data using autoencoders.",
    logSections: [
      {
        header: "PROJECT SUMMARY",
        content: "Addressed the challenge of storing massive astronomical datasets by developing an autoencoder-based compression system specifically for Hubble Telescope imagery."
      },
      {
        header: "METHODOLOGY",
        content: "Trained a deep autoencoder using a composite loss function combining Mean Squared Error (MSE), Structural Similarity (SSIM), and VGG-based Perceptual Loss. This approach ensures that both pixel-level accuracy and high-level structural details (stars, nebulae) are preserved during compression."
      },
      {
        header: "OUTCOME",
        content: "Achieved high-fidelity reconstruction with significant file size reduction, demonstrating the viability of neural compression for scalable astronomical data management."
      }
    ]
  },
  {
    id: "PRJ-04",
    title: "CodeMind LMS Platform",
    type: "Full Stack Web App",
    tech: "MongoDB | Express.js | React.js | Node.js | Redux",
    icon: <Cpu className="w-6 h-6 text-orange-400" />,
    stats: [
      { label: "UX", value: "RESPONSIVE" },
      { label: "SECURITY", value: "RBAC" }
    ],
    status: "DEPLOYED",
    desc: "A responsive e-learning platform inspired by Udemy, designed to facilitate course browsing and user interaction.",
    logSections: [
      {
        header: "PLATFORM OVERVIEW",
        content: "A robust, full-featured Learning Management System (LMS) facilitating a seamless online learning experience. Supports video-based courses, quizzes, and instructor-student interaction."
      },
      {
        header: "KEY FEATURES",
        content: "• Instructor Dashboard: Course creation, video uploads, and pricing models.\n• Student Portal: Course browsing, purchasing, and real-time progress tracking.\n• Security: Implemented secure authentication with Role-Based Access Control (RBAC)."
      },
      {
        header: "FRONTEND ARCHITECTURE",
        content: "Built on the MERN stack for high performance. Designed intuitive user flows and responsive layouts to ensure accessibility across devices."
      }
    ]
  },
  {
    id: "PRJ-05",
    title: "Img Forgery Detection",
    type: "Forensic Analysis / CNN",
    tech: "Python | OpenCV | CNN | NumPy | ELA | 2D-DCT",
    icon: <ShieldCheck className="w-6 h-6 text-red-400" />,
    stats: [
      { label: "METHOD", value: "PASSIVE" },
      { label: "TARGET", value: "SPLICING" }
    ],
    status: "OFFLINE",
    desc: "A forensic analysis tool designed to identify digital image tampering using passive forensic techniques and CNNs.",
    logSections: [
      {
        header: "SYSTEM SUMMARY",
        content: "Built a detection system focused on identifying malicious alterations in digital images, such as splicing, copy-move, and retouching."
      },
      {
        header: "ALGORITHMIC APPROACH",
        content: "Utilizes passive forensic techniques including Error Level Analysis (ELA) and 2D-DCT (Discrete Cosine Transform) analysis to highlight compression anomalies invisible to the naked eye."
      },
      {
        header: "DEEP LEARNING INTEGRATION",
        content: "Integrated a custom-trained Convolutional Neural Network (CNN) to automate the classification of forged vs. authentic images based on the artifacts revealed by ELA."
      }
    ]
  },
  {
    id: "PRJ-06",
    title: "Personal Portfolio",
    type: "Frontend Perf. Engineering",
    tech: "Next.js | React | Tailwind CSS | Framer Motion",
    icon: <Code className="w-6 h-6 text-orange-300" />,
    stats: [
      { label: "LOAD TIME", value: "OPTIMIZED" },
      { label: "SEO", value: "ENHANCED" }
    ],
    status: "ONLINE",
    desc: "A responsive, high-performance portfolio website built to professionally showcase projects, research, and technical skills.",
    logSections: [
      {
        header: "DESIGN PHILOSOPHY",
        content: "Built with a 'Mobile-First' approach using Tailwind CSS to ensure a consistent, accessible design language across all devices."
      },
      {
        header: "PERFORMANCE ENGINEERING",
        content: "Leveraged Next.js for Server-Side Rendering (SSR) to ensure rapid First Contentful Paint (FCP) and optimized asset loading for superior SEO performance."
      }
    ]
  }
];

const RESEARCH_DATA = [
  {
    id: "RES-001",
    status: "ACCEPTED",
    conference: "IEEE CONFERENCE",
    title: "Enhancing Text-Specific Inpainting Using Diffusion Models and OCR",
    abstract: "Combines Tesseract OCR for localization with Stable Diffusion for semantic inpainting to automate document redaction.",
    contribution: "Demonstrated superior accuracy in text removal and background texture preservation compared to GANs.",
    logSections: [
      {
        header: "ABSTRACT",
        content: "Addressed the challenge of automated privacy protection by combining Optical Character Recognition (OCR) with Generative AI. The proposed pipeline uses Pytesseract for precise text localization and Stable Diffusion for semantic inpainting."
      },
      {
        header: "METHODOLOGY",
        content: "1. Text Region Detection: Tesseract extracts bounding box coordinates.\n2. Mask Generation: Binary masks are created for identified text regions.\n3. Diffusion Inpainting: Stable Diffusion fills masked areas based on context prompts."
      },
      {
        header: "KEY FINDINGS",
        content: "The approach effectively removes and replaces text in images with simple backgrounds. However, challenges persist with complex textures and distorted fonts, suggesting future work in better pre-processing and fine-tuned diffusion models."
      }
    ]
  },
  {
    id: "RES-002",
    status: "ACCEPTED",
    conference: "IEEE CONFERENCE",
    title: "Real-Time Person Re-Identification in CCTV Using YOLOv8 & ByteTrack",
    abstract: "Unified 'two-pass' pipeline for tracking individuals across non-overlapping views using YOLOv8, ByteTrack, and OSNet.",
    contribution: "Achieved 89.1% mAP and 95.2% Rank-1 accuracy with real-time throughput.",
    logSections: [
      {
        header: "PROPOSED FRAMEWORK",
        content: "Developed a unified pipeline integrating three state-of-the-art components:\n1. Detection: YOLOv8n for high-speed person detection.\n2. Tracking: ByteTrack for robust association under occlusion.\n3. Re-ID: OSNet-x1.0 for omni-scale feature embedding extraction."
      },
      {
        header: "TWO-PASS ANALYSIS",
        content: "Pass 1 performs detection and tracking to generate tracklets. Pass 2 extracts embeddings and performs cosine similarity matching against a target query. This decoupled approach allows for efficient post-hoc forensic analysis."
      },
      {
        header: "RESULTS",
        content: "The system achieved a Rank-1 accuracy of 95.2% and mAP of 89.1% on benchmark datasets. System throughput reached ~38 FPS on T4 GPUs, validating its suitability for real-time CCTV deployment."
      }
    ]
  },
  {
    id: "RES-003",
    status: "UNDER REVIEW",
    conference: "IN PROCESS",
    title: "Region-Aware Image Restoration via Segmentation-Based Diffusion",
    abstract: "Novel pipeline using U-Net segmentation to create degradation masks, guiding Latent Diffusion only to specific areas.",
    contribution: "Reduced inference time by >85% compared to full-image diffusion; eliminated hallucination artifacts.",
    logSections: [
      {
        header: "ABSTRACT",
        content: "Proposed a novel 'Region-Aware' pipeline to solve the computational inefficiency of using Diffusion models for image restoration. Instead of processing the entire image, this method uses a U-Net segmentation model to detect degraded regions (masks) and guides a Latent Diffusion model to repair only those specific areas."
      },
      {
        header: "METHODOLOGY",
        content: "1. Degradation Detection: A U-Net model predicts binary masks for corrupted regions (e.g., noise, blur).\n2. Guided Diffusion: The Stable Diffusion model is applied exclusively to the masked latent representations."
      },
      {
        header: "PERFORMANCE",
        content: "The approach reduces inference time by over 85% compared to full-image diffusion methods. Crucially, it prevents the 'hallucination' of artifacts in already pristine regions, ensuring higher fidelity (lower LPIPS scores) and practical usability."
      }
    ]
  }
];

// --- Components ---

const StatusBadge = ({ status }) => {
  const getColors = (s) => {
    if (s === "OPERATIONAL" || s === "ONLINE" || s === "DEPLOYED") 
      return "text-orange-400 border-orange-400/30 bg-orange-400/10";
    if (s === "ACCEPTED") 
      return "text-orange-300 border-orange-300/30 bg-orange-300/10";
    if (s === "LIVE_FEED") 
      return "text-red-500 border-red-500/30 bg-red-500/10 animate-pulse";
    if (s === "UNDER REVIEW" || s === "OFFLINE") 
      return "text-gray-400 border-gray-400/30 bg-gray-400/10";
    if (s === "ARCHIVED")
      return "text-gray-500 border-gray-500/30 bg-gray-500/5";
    return "text-orange-400 border-orange-400/30 bg-orange-400/10";
  };

  return (
    <span className={`px-2 py-0.5 text-[10px] font-mono border ${getColors(status)} rounded uppercase tracking-wider`}>
      [{status}]
    </span>
  );
};

const DetailPanel = ({ item, onClose }) => {
  
  // Disable body scroll when panel is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div 
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-[#050505] border-l border-orange-900/50 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-50 flex flex-col"
    >
      {/* Panel Header - Fixed */}
      <div className="p-6 md:p-8 border-b border-gray-800 bg-[#050505] relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] text-orange-500 font-mono tracking-widest mb-2 flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              SYSTEM_LOG // DETAILED_VIEW
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">{item.title}</h2>
            {item.tech && (
              <div className="font-mono text-[10px] text-gray-500 break-words max-w-md">
                {`> TECH_STACK: [${item.tech}]`}
              </div>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white border border-transparent hover:border-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Panel Content - Scrollable */}
      <div className="flex-grow overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        <div className="space-y-8 pb-12">
          
          {/* Status Block */}
          <div className="bg-gray-900/30 p-4 rounded border border-gray-800/50 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-xs text-gray-500 font-mono">CURRENT STATUS:</div>
              <StatusBadge status={item.status} />
            </div>
            <div className="text-xs text-gray-500 font-mono">ID: {item.id}</div>
          </div>

          {/* Typewriter Logs */}
          <div className="space-y-8">
            {item.logSections && item.logSections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-mono text-orange-500 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  {`// ${section.header}`}
                </h3>
                <div className="pl-4 border-l border-gray-800">
                  <TypewriterBlock 
                    text={section.content} 
                    speed={5} // Fast typing for better UX
                    delay={idx * 300} // Staggered start
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Metrics for Projects */}
          {item.stats && (
            <div className="pt-6 border-t border-gray-800/50">
              <h3 className="text-xs font-mono text-orange-500 mb-4">
                {`// SYSTEM_METRICS`}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.stats.map((stat, idx) => (
                  <div key={idx} className="bg-black/40 p-3 rounded border border-gray-800 flex justify-between items-center">
                    <span className="text-[10px] text-gray-500 font-mono">{stat.label}</span>
                    <span className="text-xs text-orange-200 font-mono">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer - Fixed */}
      <div className="p-4 border-t border-gray-800 bg-[#050505] text-[10px] text-gray-600 font-mono text-center flex justify-between px-8">
         <span>LOG_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
         <span>SESSION: ACTIVE</span>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index, onSelect }) => {
  return (
    <motion.div 
      layoutId={`card-${project.id}`}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={simpleScaleVariants}
      onClick={() => onSelect(project)}
      className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-orange-400 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group flex flex-col h-full relative overflow-hidden"
    >
      {/* Click Hint Overlay */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center gap-1 text-[10px] text-orange-400 font-mono bg-black/80 px-2 py-1 rounded border border-orange-500/30">
        <span className="animate-pulse">View Log</span>
        <Maximize2 className="w-3 h-3" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-800 rounded-md border border-gray-700 group-hover:bg-gray-800/80 transition-colors">
            {project.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-orange-100">{project.title}</h3>
            <div className="text-[10px] text-gray-500 font-mono tracking-widest mt-1">ID: {project.id}</div>
          </div>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Body */}
      <div className="flex-grow flex flex-col gap-4">
        {/* Type & Stack */}
        <div className="space-y-2">
          <div className="text-xs text-orange-500 font-mono flex items-center gap-1">
            <Terminal className="w-3 h-3" />
            <span className="truncate opacity-80">{project.type}</span>
          </div>
          <div className="p-2 bg-black/40 border border-gray-800 rounded font-mono text-[10px] text-gray-400 leading-relaxed break-words">
            {`> ${project.tech}`}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
          {project.desc}
        </p>

        {/* Metrics Grid */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-2 border-t border-gray-800/50">
          {project.stats.map((stat, idx) => (
            <div key={idx} className="bg-[#0a0a0a]/50 p-2 border border-gray-800 rounded group-hover:border-orange-500/20 transition-colors">
              <div className="text-[9px] text-gray-500 font-mono uppercase mb-0.5">{stat.label}</div>
              <div className="text-xs text-orange-500/90 font-mono font-medium">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Click To Know More Footer */}
      <div className="mt-4 pt-3 border-t border-gray-800 flex justify-end items-center gap-1 text-xs text-orange-500/70 group-hover:text-orange-400 font-mono opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
        <span>Initialize Log</span>
        <ChevronRight className="w-3 h-3" />
      </div>
    </motion.div>
  );
};

const ResearchLog = ({ item, index, onSelect }) => {
  return (
    <motion.div 
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={simpleScaleVariants}
      onClick={() => onSelect(item)}
      className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-orange-400 transition transform hover:scale-[1.01] group relative cursor-pointer"
    >
       {/* Click Hint Overlay */}
       <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center gap-1 text-[10px] text-orange-400 font-mono bg-black/80 px-2 py-1 rounded border border-orange-500/30">
        <span className="animate-pulse">View Abstract</span>
        <Maximize2 className="w-3 h-3" />
      </div>

      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
        <StatusBadge status={item.status} />
        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">{item.conference}</span>
      </div>
      
      <h4 className="text-lg md:text-xl text-white font-bold mb-3 group-hover:text-orange-400 transition-colors">
        {item.title}
      </h4>

      <div className="grid md:grid-cols-[1fr_auto] gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-400 leading-relaxed">
            <span className="text-gray-600 font-mono text-xs mr-2 block mb-1">{'> ABSTRACT:'}</span>
            {item.abstract}
          </p>
          <p className="text-sm text-gray-300 leading-relaxed pt-2 border-t border-gray-800/50 mt-2">
            <span className="text-orange-500 font-mono text-xs mr-2 block mb-1">{'> KEY CONTRIBUTION:'}</span>
            {item.contribution}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const StatsBar = ({ count }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[10px] md:text-xs font-mono text-gray-500 bg-gray-900/50 px-6 py-2 rounded-full border border-gray-800/50 mt-4">
      <span>[TOTAL_MODULES: {count}]</span>
      <span>[SYS_TIME: {currentTime}]</span>
      <span className="text-orange-500/80">[STATUS: ONLINE]</span>
    </div>
  );
};

const Projects = ({ addToRefs }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Parallax Logic - Zoom Effect
  const { scrollY } = useScroll();
  const backgroundScale = useTransform(scrollY, [0, 1000], [1, 1.2]); // Zoom in from 1 to 1.2
  const backgroundOpacity = useTransform(scrollY, [0, 1000], [1, 0.5]); // Optional: Fade out slightly

  return (
    <section 
      id="projects" 
      ref={addToRefs} 
      // Added bg-[#050505] here to ensure background is always dark, preventing white flashes/bleed.
      className="min-h-screen relative bg-[#050505] overflow-x-hidden"
    >
      {/* Parallax Background - Fixed to viewport with scale transform */}
      <motion.div 
        className="fixed inset-0 z-0 w-full h-full" 
        style={{ scale: backgroundScale, opacity: backgroundOpacity }}
      >
         <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')",
              filter: "brightness(0.25)"
            }}
         />
      </motion.div>

      {/* Dark Overlay - Fixed to viewport */}
      <div className="fixed inset-0 z-0 bg-[#050505]/70 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:px-10 md:py-16">
        
        {/* Main Header Block */}
        <div className="flex flex-col items-center justify-center mb-16 space-y-6">
           {/* Main Title */}
           <div className="text-center">
              <motion.h1 
                className="text-5xl md:text-6xl font-bold tracking-tight inline-block cursor-default"
                initial="initial"
                whileHover="hover"
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.05 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.span 
                  variants={{ 
                    initial: { color: "#f97316" }, // orange-500
                    hover: { color: "#ffffff" }    // white
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Projects
                </motion.span>
                {" "}
                <motion.span 
                  variants={{ 
                    initial: { color: "#ffffff" }, // white
                    hover: { color: "#f97316" }    // orange-500
                  }}
                  transition={{ duration: 0.3 }}
                >
                  &
                </motion.span>
                {" "}
                <motion.span 
                  variants={{ 
                    initial: { color: "#f97316" }, // orange-500
                    hover: { color: "#ffffff" }    // white
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Research
                </motion.span>
              </motion.h1>
           </div>
        </div>

        {/* Section 1: Projects */}
        <div className="mb-24">
          <div className="flex flex-col items-center gap-3 mb-12">
            <Layers className="w-8 h-8 text-white" />
            <h2 className="text-3xl text-white font-semibold tracking-wide">Projects</h2>
            <div className="h-1 w-16 bg-orange-500 rounded-full mt-2"></div>
            {/* Stats Bar with correct count for Projects */}
            <StatsBar count="06" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECT_DATA.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onSelect={setSelectedItem}
              />
            ))}
          </div>
        </div>

        {/* Section 2: Research Log */}
        <div className="pb-12">
          <div className="flex flex-col items-center gap-3 mb-12">
            <FileText className="w-8 h-8 text-white" />
            <h2 className="text-3xl text-white font-semibold tracking-wide">Research Work</h2>
            <div className="h-1 w-16 bg-orange-500 rounded-full mt-2"></div>
            {/* Stats Bar with correct count for Research */}
            <StatsBar count="03" />
          </div>

          <div className="grid gap-6">
            {RESEARCH_DATA.map((item, index) => (
              <ResearchLog 
                key={item.id} 
                item={item} 
                index={index} 
                onSelect={setSelectedItem}
              />
            ))}
          </div>
        </div>

      </div>
      
      {/* Footer */}
      <footer className="relative z-10 mt-12 text-center border-t border-gray-800 pt-8 pb-4">
        {/* Footer content removed as requested */}
      </footer>

      {/* Detail Panel Overlay (Modal) */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            {/* Panel */}
            <DetailPanel 
              item={selectedItem} 
              onClose={() => setSelectedItem(null)} 
            />
          </>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Projects;
