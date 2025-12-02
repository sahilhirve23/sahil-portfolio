import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// UNCOMMENT THE LINE BELOW AFTER RUNNING: npm install @emailjs/browser
// import emailjs from '@emailjs/browser'; 
import { 
  Mail, 
  Send, 
  User, 
  Terminal, 
  Share2, 
  MessageSquare,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Youtube,
  Music,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Loader2,
  CheckCircle2
} from 'lucide-react';

// --- EmailJS Configuration ---
const SERVICE_ID = "service_6twu2is"; 
const TEMPLATE_ID = "template_6uhb8qa";
const PUBLIC_KEY = "Tt1NlTVunXvYAg4Ab";

// --- Configuration & Data ---

const SOCIAL_LINKS = [
  { 
    name: "LinkedIn", 
    handle: "@sahil-hirve", 
    icon: <Linkedin className="w-5 h-5" />, 
    link: "https://www.linkedin.com/in/sahil-hirve/", 
    color: "#0077b5",
    status: "Connected"
  },
  { 
    name: "GitHub", 
    handle: "@sahilhirve23", 
    icon: <Github className="w-5 h-5" />, 
    link: "https://github.com/sahilhirve23", 
    color: "#333",
    status: "Repo Active"
  },
  { 
    name: "X (Twitter)", 
    handle: "@SahilHirve2", 
    icon: <Twitter className="w-5 h-5" />, 
    link: "https://x.com/SahilHirve2", 
    color: "#1DA1F2",
    status: "Latest Feed"
  },
  { 
    name: "Instagram", 
    handle: "@hirveeeee", 
    icon: <Instagram className="w-5 h-5" />, 
    link: "https://www.instagram.com/hirveeeee/", 
    color: "#E1306C",
    status: "Gallery"
  },
  { 
    name: "YouTube", 
    handle: "Sahil Hirve", 
    icon: <Youtube className="w-5 h-5" />, 
    link: "https://www.youtube.com/channel/UCHkcT4AULNfdc9hb6GTKisw", 
    color: "#FF0000",
    status: "Media"
  },
  { 
    name: "Spotify", 
    handle: "Sahil's Mix", 
    icon: <Music className="w-5 h-5" />, 
    link: "https://open.spotify.com/user/316x7lpkywupqzeoovx46ecc6rem", 
    color: "#1DB954",
    status: "Vibe Check"
  }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop", // Coding placeholder
  "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop", // Tech placeholder
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", // Cyber placeholder
];

const BIO_FULL_TEXT = `Initializing User Bio Protocol...
Loading Identity Module: Sahil Hirve...

>> STATUS: Business Analyst Intern & Researcher
>> FOCUS: AI / ML / Computer Vision

Greetings! I am a passionate technologist based in Pune, India, dedicated to bridging the gap between raw data and creative solutions. My journey is fueled by a relentless curiosity for Artificial Intelligence and its application in solving real-world problems.

I thrive in the deep end of code, exploring the nuances of Machine Learning algorithms and developing robust Computer Vision systems. Whether it's managing complex events or diving into the backend of a new project, I love the thrill of the "Behind-The-Scenes."

Beyond the terminal, I find my rhythm in music, expression in singing, and clarity in yoga. I believe in continuous learning, whether that's mastering a new tech stack or keeping my Duolingo streak alive.

Let's build something impactful together.

[END OF STREAM]`;

// --- Components ---

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayedText("");
    indexRef.current = 0;
    
    const intervalId = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 20); // Typing speed

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <p className="font-mono text-sm md:text-base text-gray-300 leading-relaxed whitespace-pre-wrap">
      {displayedText}
      <span className="inline-block w-2 h-4 ml-1 bg-orange-500 animate-pulse align-middle" />
    </p>
  );
};

const AboutModal = ({ isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-4xl h-[85vh] bg-[#0a0a0a] border border-orange-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.15)] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="h-[50%] relative bg-gray-900 overflow-hidden group">
          <img 
            src={GALLERY_IMAGES[currentImageIndex]} 
            alt={`Gallery ${currentImageIndex + 1}`} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
          
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={prevImage}
              className="p-2 bg-black/60 hover:bg-orange-500 text-white rounded-full backdrop-blur-sm border border-white/10 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="p-2 bg-black/60 hover:bg-orange-500 text-white rounded-full backdrop-blur-sm border border-white/10 transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="h-[50%] bg-[#0a0a0a] p-6 md:p-8 flex flex-col border-t border-orange-500/20">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-2">
            <Terminal className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-mono text-gray-500 uppercase">More about me!</span>
          </div>
          
          <div className="flex-grow overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-orange-500/50 transition-colors">
             <TypewriterText text={BIO_FULL_TEXT} />
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const SectionHeading = ({ icon, title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.02, x: 10 }}
    viewport={{ once: true }}
    className="mb-8 group cursor-default"
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

const SocialNode = ({ social, index }) => (
  <motion.a
    href={social.link}
    target="_blank"
    rel="noreferrer"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ scale: 1.02, x: 5 }}
    className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-orange-500/30 hover:bg-gray-900/80 transition-all duration-300 group cursor-pointer"
  >
    <div className="flex items-center gap-3">
      <div 
        className="w-10 h-10 rounded bg-black border border-gray-700 flex items-center justify-center text-lg group-hover:border-orange-500/50 transition-colors"
        style={{ color: social.color }}  
      >
        {social.icon}
      </div>
      <div>
        <div className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{social.name}</div>
        <div className="text-[10px] text-gray-600 font-mono group-hover:text-orange-500/80 transition-colors">{social.handle}</div>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider hidden md:block">{social.status}</span>
      <div className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-orange-500 group-hover:shadow-[0_0_8px_#f97316] transition-all" />
    </div>
  </motion.a>
);

// --- Main Component ---

const Contact = ({ addToRefs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const formRef = useRef(); 
  
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // --- 1. EMAILJS INTEGRATION (Uncomment this block for production) ---
    /*
    try {
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
        console.log("Email sent successfully");
        setIsLoading(false);
        setIsSent(true);
        setTimeout(() => setIsSent(false), 5000);
        setFormData({ name: '', email: '', message: '' });
        e.target.reset();
    } catch (error) {
        console.error("Email failed:", error);
        setIsLoading(false);
        alert("Failed to send message via EmailJS.");
    }
    */

    // --- 2. PREVIEW SIMULATION (Remove this block in production) ---
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
    setIsLoading(false);
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section 
      id="about" 
      ref={handleRef}
      className="relative min-h-screen py-24 overflow-hidden selection:bg-orange-500/30"
    >
      <AnimatePresence>
        {isModalOpen && <AboutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>

      {/* 1. Base Black Background */}
      <div className="absolute inset-0 bg-[#050505] -z-50" />

      {/* 2. Parallax Image Layer */}
      <motion.div 
        className="absolute inset-y-0 left-0 w-[150%] h-full -z-40 pointer-events-none opacity-40"
        style={{ x: backgroundX }}
      >
        <div className="absolute inset-0 bg-[url('https://i.pinimg.com/736x/75/11/9c/75119c530c58a19abc02f71ce264c503.jpg')] bg-cover bg-center" />
      </motion.div>

      {/* 3. Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-[#050505]/80 to-[#050505] opacity-80 pointer-events-none -z-30" />

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
                    hidden: { color: "#f97316" }, 
                    visible: { color: "#f97316" },
                    hover: { color: "#ffffff" }   
                }}
              >
                About me
              </motion.span>
            </h2>
            <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full mb-4" />
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-gray-500 bg-gray-900/50 px-4 py-1 rounded-full border border-gray-800/50">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                <span>SYSTEM STATUS: ONLINE</span>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Column: Profile Card */}
            <div className="lg:col-span-5">
                <SectionHeading 
                    icon={<User className="w-5 h-5" />}
                    title="About me" 
                    subtitle="Click to know more" 
                />

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ borderColor: "rgba(249,115,22,0.3)", boxShadow: "0 0 30px rgba(249,115,22,0.1)" }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#0a0a0a]/80 backdrop-blur-md border border-gray-800 p-6 md:p-8 rounded-2xl relative overflow-hidden group"
                    onClick={() => setIsModalOpen(true)}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-5 h-5 text-orange-500" />
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-orange-500/20 rounded-tl-xl -ml-1 -mt-1" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-orange-500/20 rounded-br-xl -mr-1 -mb-1" />

                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-6 group-hover:scale-105 transition-transform duration-500">
                            <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-gray-800 group-hover:border-orange-500/50 transition-colors shadow-2xl relative z-10">
                                <img 
                                    src="https://media.licdn.com/dms/image/v2/D4D03AQHfJesWxE6-nA/profile-displayphoto-crop_800_800/B4DZh5TmkXH8AI-/0/1754381840040?e=1766016000&v=beta&t=dBtoNBbSnufQWoDGDcCxA_GC8CYsG7ep6Pt9p_WL184" 
                                    alt="Sahil Hirve" 
                                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            {/* Glow Effect behind image */}
                            <div className="absolute inset-0 bg-orange-500/20 blur-3xl -z-10 group-hover:bg-orange-500/30 transition-colors" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">Sahil Hirve</h3>
                        <p className="text-orange-500 font-mono text-xs mb-6 tracking-widest uppercase">Business Analyst Intern</p>

                        <motion.div 
                            whileHover={{ scale: 1.02, borderColor: "rgba(249,115,22,0.4)", boxShadow: "0 0 15px rgba(249,115,22,0.1)" }}
                            transition={{ duration: 0.3 }}
                            className="text-left w-full bg-gray-900/50 border border-gray-800 p-4 rounded-lg relative cursor-default"
                        >
                            <div className="absolute top-3 right-3 flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed font-mono pt-4">
                                <span className="text-orange-500 mr-2">$</span>
                                Passionate about combining data and creativity to build impactful digital solutions. Enthusiast in Machine Learning and Computer Vision research.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Right Column: Connect & Socials */}
            <div className="lg:col-span-7 flex flex-col gap-10">
                
                {/* Social Network Section */}
                <div>
                    <SectionHeading 
                        icon={<Share2 className="w-5 h-5" />}
                        title="Network" 
                        subtitle="Click to open" 
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {SOCIAL_LINKS.map((social, idx) => (
                            <SocialNode key={idx} social={social} index={idx} />
                        ))}
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="flex-grow flex flex-col">
                    <SectionHeading 
                        icon={<MessageSquare className="w-5 h-5" />}
                        title="Contact me" 
                        subtitle="Send me a message" 
                    />
                    
                    <motion.form 
                        ref={formRef}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleSend}
                        className="bg-[#0a0a0a]/80 backdrop-blur-md border border-gray-800 p-6 md:p-8 rounded-2xl flex flex-col gap-4 flex-grow relative overflow-hidden group hover:border-orange-500/30 transition-colors"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                            <Send className="w-24 h-24 text-gray-800 -rotate-12" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-500 uppercase ml-1">Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-600" />
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter Name" 
                                        required
                                        className="w-full bg-[#151515] border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all text-sm font-mono placeholder:text-gray-700" 
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-500 uppercase ml-1">Email ID</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-600" />
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter Email" 
                                        required
                                        className="w-full bg-[#151515] border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all text-sm font-mono placeholder:text-gray-700" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1 flex-grow flex flex-col">
                            <label className="text-[10px] font-mono text-gray-500 uppercase ml-1">Message</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Initialize communication..." 
                                required
                                className="w-full bg-[#151515] border border-gray-800 rounded-lg py-3 px-4 text-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all text-sm font-mono placeholder:text-gray-700 resize-none h-32 md:h-auto flex-grow" 
                            />
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            disabled={isLoading}
                            className={`w-full text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] ${isSent ? 'bg-green-600 hover:bg-green-500' : 'bg-orange-600 hover:bg-orange-500'}`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>TRANSMITTING...</span>
                                </>
                            ) : isSent ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>SENT SUCCESSFULLY</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    <span>SEND</span>
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
