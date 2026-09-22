"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Keyboard,
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Menu,
  X,
  Terminal,
  Download,
  RotateCcw,
  Award,
  ShieldCheck,
  Layers,
  ArrowLeft,
  Shuffle,
  ArrowUp,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */



const PHOTO_FILTERS = [
  { id: "normal", name: "NATURAL" },
  { id: "bw", name: "B&W" },
  { id: "retro", name: "WARM" },
  { id: "cool", name: "COOL" },
  { id: "invert", name: "INVERT" },
] as const;

type FilterId = (typeof PHOTO_FILTERS)[number]["id"];

const getFilterCSS = (id: FilterId): string => {
  switch (id) {
    case "normal":
      return "none";
    case "bw":
      return "grayscale(100%) contrast(1.15)";
    case "retro":
      return "sepia(45%) contrast(1.05) brightness(1.02)";
    case "cool":
      return "hue-rotate(180deg) saturate(1.1)";
    case "invert":
      return "invert(100%)";
  }
};

const TYPING_QUOTES = [
  {
    text: "Simplicity is prerequisite for reliability. Clean code is not written by following rules, but through craftsmanship and care for the reader.",
    author: "Edsger W. Dijkstra",
    category: "Architecture",
  },
  {
    text: "First, solve the problem. Then, write the code. Premature optimization is the root of all evil in software engineering.",
    author: "Donald Knuth",
    category: "Philosophy",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand and maintain.",
    author: "Martin Fowler",
    category: "Clean Code",
  },
  {
    text: "Make it work, make it right, make it fast. Beautiful software emerges when simplicity meets disciplined craftsmanship and attention to detail.",
    author: "Kent Beck",
    category: "Craftsmanship",
  },
  {
    text: "Talk is cheap. Show me the code. Software engineering is turning abstract thoughts into reliable systems that solve real human challenges.",
    author: "Linus Torvalds",
    category: "Engineering",
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute. Structure and clarity always triumph over cleverness.",
    author: "Harold Abelson",
    category: "Foundations",
  },
  {
    text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write it as cleverly as possible, you cannot debug it.",
    author: "Brian Kernighan",
    category: "Wisdom",
  },
  {
    text: "Building responsive web interfaces requires balancing typography, color contrast, and micro-interactions to create an effortless user journey.",
    author: "Frontend Design",
    category: "UI/UX",
  },
  {
    text: "Distributed systems scale applications across global cloud networks, ensuring resilient failovers and low latency for millions of users.",
    author: "Cloud Systems",
    category: "Systems",
  },
  {
    text: "Artificial intelligence models augment human engineering by automating repetitive tasks while opening new horizons for creative problem solving.",
    author: "Machine Learning",
    category: "AI & ML",
  },
  {
    text: "The function of good software is to make the complex appear simple, providing seamless speed and clarity in every interaction.",
    author: "Grady Booch",
    category: "Design",
  },
  {
    text: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away from the interface.",
    author: "Antoine de Saint-Exupéry",
    category: "Minimalism",
  },
];

const MS_LEARN_BADGES = [
  { name: "Describe cloud service types", date: "7/21/2026", assessed: true },
  { name: "Describe the benefits of using cloud services", date: "7/21/2026" },
  { name: "Describe cloud computing", date: "7/21/2026", assessed: true },
  { name: "Get started with Copilot in Power BI", date: "7/21/2026", assessed: true },
  { name: "Introduction to end-to-end analytics using Microsoft Fabric", date: "7/21/2026", assessed: true },
  { name: "Get started building with Power BI", date: "5/25/2026" },
  { name: "Discover data analysis", date: "5/25/2026" },
];

const TECH_STACK_CATEGORIES = [
  {
    category: "FRONTEND",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "Tailwind CSS",
      "SCSS",
      "Styled Components",
      "Vite",
      "Webpack",
      "ESLint",
      "Prettier",
    ],
  },
  {
    category: "BACKEND",
    items: [
      "Node.js",
      "Python",
      "Java",
      "PHP",
      "Express.js",
      "NestJS",
      "FastAPI",
      "Spring Boot",
      "Laravel",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "DynamoDB",
      "OAuth",
      "JWT",
      "LDAP",
      "REST",
      "GraphQL",
      "gRPC",
      "AWS Lambda",
    ],
  },
  {
    category: "DEVOPS & CLOUD",
    items: [
      "AWS",
      "GCP",
      "Azure",
      "GitHub Actions",
      "Jenkins",
      "GitLab CI",
      "Terraform",
      "AWS CloudFormation",
      "Docker",
      "Kubernetes",
      "Prometheus",
      "Grafana",
      "Datadog",
    ],
  },
  {
    category: "TOOLS & AI",
    items: [
      "PyTorch",
      "Claude Code",
      "Git",
      "VS Code",
      "Postman",
      "Figma",
      "Linux",
      "Vercel",
    ],
  },
];



/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  /* ---- UI & Theme ---- */
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<
    "projects" | "stack" | "experience" | "certifications"
  >("projects");


  /* ---- Photobooth ---- */
  const [isPhotoboothOpen, setIsPhotoboothOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterId>("normal");
  const [isFlashing, setIsFlashing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  /* ---- Typing Test ---- */
  const [isTypingOpen, setIsTypingOpen] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [typingInput, setTypingInput] = useState("");
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [typingElapsedTime, setTypingElapsedTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);
  const typingInputRef = useRef<HTMLTextAreaElement>(null);



  /* ---- Scroll & Navigation Refs ---- */
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* ================================================================ */
  /*  Effects                                                          */
  /* ================================================================ */

  /* Scrollspy: track active section */
  useEffect(() => {
    let ticking = false;

    const determineActiveSection = (): "projects" | "stack" | "experience" | "certifications" => {
      const mainEl = mainRef.current;
      const atBottom = mainEl
        ? mainEl.scrollHeight - mainEl.scrollTop - mainEl.clientHeight <= 120
        : typeof window !== "undefined" &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;

      if (atBottom) {
        return "certifications";
      }

      const sections: {
        id: "projects" | "stack" | "experience" | "certifications";
        ref: React.RefObject<HTMLDivElement | null>;
      }[] = [
          { id: "projects", ref: projectsRef },
          { id: "stack", ref: stackRef },
          { id: "experience", ref: experienceRef },
          { id: "certifications", ref: certificationsRef },
        ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            return sections[i].id;
          }
        }
      }

      return "projects";
    };

    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!isNavigatingRef.current) {
            const nextActive = determineActiveSection();
            setActiveNav(nextActive);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleUserInteraction = () => {
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false;
        if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
      }
    };

    const mainEl = mainRef.current;
    mainEl?.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });

    // Initial sync
    handleScroll();

    return () => {
      mainEl?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark =
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const t = setTimeout(() => setIsDark(prefersDark), 0);
    return () => clearTimeout(t);
  }, []);



  /* Hotkeys */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Alt+K → Photobooth
      if (e.altKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPhotoboothOpen((p) => !p);
      }
      // Alt+J → Typing Test
      if (e.altKey && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setIsTypingOpen((p) => {
          if (p) resetTyping();
          return !p;
        });
      }
      // Escape
      if (e.key === "Escape") {
        setIsPhotoboothOpen(false);
        setIsTypingOpen((p) => {
          if (p) resetTyping();
          return false;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Focus typing input & pick random quote */
  useEffect(() => {
    if (isTypingOpen) {
      setCurrentQuoteIndex(Math.floor(Math.random() * TYPING_QUOTES.length));
      resetTyping();
      const t = setTimeout(() => typingInputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isTypingOpen]);



  /* ---- Webcam start/stop ---- */
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setCameraError("Camera access denied or unavailable");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPhotoboothOpen) {
      startCamera();
    } else {
      stopCamera();
      setCapturedPhoto(null);
      setActiveFilter("normal");
      setIsFlashing(false);
      setCameraError(null);
    }
    return () => stopCamera();
  }, [isPhotoboothOpen, startCamera, stopCamera]);



  /* ================================================================ */
  /*  Handlers                                                         */
  /* ================================================================ */

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToHero = () => {
    setActiveNav("projects");
    setMobileMenuOpen(false);

    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    isNavigatingRef.current = true;
    navTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);

    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const navigateToSection = (
    section: "projects" | "stack" | "experience" | "certifications",
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    setActiveNav(section);
    setMobileMenuOpen(false);

    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    isNavigatingRef.current = true;
    navTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);

    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  /* ---- Typing ---- */
  const resetTyping = () => {
    setTypingInput("");
    setTypingStartTime(null);
    setTypingElapsedTime(0);
    setWpm(0);
    setAccuracy(100);
    setIsTypingCompleted(false);
  };

  const nextRandomQuote = () => {
    setCurrentQuoteIndex((prev) => {
      if (TYPING_QUOTES.length <= 1) return 0;
      let next = Math.floor(Math.random() * TYPING_QUOTES.length);
      while (next === prev) {
        next = Math.floor(Math.random() * TYPING_QUOTES.length);
      }
      return next;
    });
    resetTyping();
    setTimeout(() => typingInputRef.current?.focus(), 50);
  };

  const closeTypingGame = () => {
    setIsTypingOpen(false);
    resetTyping();
  };

  const handleTypingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const currentQuote = TYPING_QUOTES[currentQuoteIndex]?.text || "";

    if (val.length > currentQuote.length) return;

    const now = Date.now();
    let startTime = typingStartTime;
    if (!startTime && val.length > 0) {
      startTime = now;
      setTypingStartTime(now);
    }
    setTypingInput(val);

    let correct = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === currentQuote[i]) correct++;
    }
    setAccuracy(val.length > 0 ? Math.round((correct / val.length) * 100) : 100);

    if (startTime && val.length > 0) {
      const elapsedSec = (now - startTime) / 1000;
      setTypingElapsedTime(Math.round(elapsedSec * 10) / 10);
      if (elapsedSec >= 1) {
        setWpm(Math.round((val.length / 5) / (elapsedSec / 60)));
      }
    }

    if (val === currentQuote) {
      if (startTime) {
        const finalSec = (now - startTime) / 1000;
        setTypingElapsedTime(Math.round(finalSec * 10) / 10);
        if (finalSec > 0) {
          setWpm(Math.round((val.length / 5) / (finalSec / 60)));
        }
      }
      setIsTypingCompleted(true);
    }
  };

  /* ---- Photobooth ---- */
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 300);

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const css = getFilterCSS(activeFilter);
    if (css !== "none") ctx.filter = css;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    setCapturedPhoto(canvas.toDataURL("image/png"));
  };

  const downloadPhoto = () => {
    if (!capturedPhoto) return;
    const a = document.createElement("a");
    a.download = `photo-booth-${Date.now()}.png`;
    a.href = capturedPhoto;
    a.click();
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
  };

  /* ================================================================ */
  /*  JSX                                                              */
  /* ================================================================ */

  return (
    <div className="relative md:h-screen flex flex-col md:flex-row bg-background text-foreground bg-dotted-grid font-sans md:overflow-hidden selection:bg-neutral-200 dark:selection:bg-neutral-800 antialiased">
      {/* ==================== Mobile Header ==================== */}
      <header className="md:hidden flex items-center justify-between border-b border-border-custom bg-background/90 backdrop-blur px-5 py-3.5 z-40 sticky top-0">
        <button
          onClick={scrollToHero}
          className="text-base font-bold tracking-tight text-left hover:text-neutral-500 transition-colors cursor-pointer"
        >
          Leovi Garcia
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 border border-border-custom hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-border-custom hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* ==================== Mobile Menu ==================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.12 }}
            className="md:hidden fixed top-[59px] left-0 right-0 bg-background border-b border-border-custom px-5 py-4 flex flex-col gap-3 z-30 shadow-md"
          >
            <button
              onClick={() => navigateToSection("projects", projectsRef)}
              className={`text-left text-sm py-2 hover:pl-2 transition-all cursor-pointer ${activeNav === "projects" ? "font-bold text-foreground" : ""
                }`}
            >
              01. Projects
            </button>
            <button
              onClick={() => navigateToSection("stack", stackRef)}
              className={`text-left text-sm py-2 hover:pl-2 transition-all cursor-pointer ${activeNav === "stack" ? "font-bold text-foreground" : ""
                }`}
            >
              02. Stack
            </button>
            <button
              onClick={() => navigateToSection("experience", experienceRef)}
              className={`text-left text-sm py-2 hover:pl-2 transition-all cursor-pointer ${activeNav === "experience" ? "font-bold text-foreground" : ""
                }`}
            >
              03. Experience
            </button>
            <button
              onClick={() => navigateToSection("certifications", certificationsRef)}
              className={`text-left text-sm py-2 hover:pl-2 transition-all cursor-pointer ${activeNav === "certifications" ? "font-bold text-foreground" : ""
                }`}
            >
              04. Certifications
            </button>
            <div className="border-t border-border-custom pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsPhotoboothOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 text-sm py-2 hover:pl-2 transition-all cursor-pointer"
              >
                <Camera className="w-4 h-4" /> Photobooth
              </button>
              <button
                onClick={() => {
                  setIsTypingOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 text-sm py-2 hover:pl-2 transition-all cursor-pointer"
              >
                <Keyboard className="w-4 h-4" /> Typing Test
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== Desktop Sidebar ==================== */}
      <aside className="hidden md:flex flex-col w-[250px] min-h-screen border-r border-border-custom bg-background/50 backdrop-blur sticky top-0 px-6 py-7 justify-between shrink-0 select-none z-20">
        {/* Top Section */}
        <div className="flex flex-col gap-7">
          {/* Identity */}
          <button
            onClick={scrollToHero}
            className="flex flex-col text-left group cursor-pointer focus:outline-none"
          >
            <h1 className="text-lg font-bold tracking-tight group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              Leovi Garcia
            </h1>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
              student developer
            </p>
          </button>

          {/* Navigation */}
          <nav className="flex flex-col gap-3 text-sm">
            <button
              onClick={() => navigateToSection("projects", projectsRef)}
              className={`group flex items-center justify-between transition-all text-left py-0.5 cursor-pointer ${activeNav === "projects"
                  ? "text-foreground font-bold"
                  : "text-neutral-500 hover:text-foreground"
                }`}
            >
              <span>Projects</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-neutral-400">
                01
              </span>
            </button>
            <button
              onClick={() => navigateToSection("stack", stackRef)}
              className={`group flex items-center justify-between transition-all text-left py-0.5 cursor-pointer ${activeNav === "stack"
                  ? "text-foreground font-bold"
                  : "text-neutral-500 hover:text-foreground"
                }`}
            >
              <span>Stack</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-neutral-400">
                02
              </span>
            </button>
            <button
              onClick={() => navigateToSection("experience", experienceRef)}
              className={`group flex items-center justify-between transition-all text-left py-0.5 cursor-pointer ${activeNav === "experience"
                  ? "text-foreground font-bold"
                  : "text-neutral-500 hover:text-foreground"
                }`}
            >
              <span>Experience</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-neutral-400">
                03
              </span>
            </button>
            <button
              onClick={() => navigateToSection("certifications", certificationsRef)}
              className={`group flex items-center justify-between transition-all text-left py-0.5 cursor-pointer ${activeNav === "certifications"
                  ? "text-foreground font-bold"
                  : "text-neutral-500 hover:text-foreground"
                }`}
            >
              <span>Certifications</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-neutral-400">
                04
              </span>
            </button>
          </nav>

          {/* Interactive Widgets */}
          <div className="flex flex-col gap-2.5 pt-5 border-t border-border-custom text-xs">
            <button
              onClick={() => setIsPhotoboothOpen(true)}
              className="flex items-center justify-between px-3 py-2 border border-border-custom rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all text-neutral-600 dark:text-neutral-300 cursor-pointer"
            >
              <span className="flex items-center gap-2 font-medium">
                <Camera className="w-3.5 h-3.5" /> Photobooth
              </span>
              <kbd className="text-[10px] text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-950 font-mono">
                Alt+K
              </kbd>
            </button>

            <button
              onClick={() => setIsTypingOpen(true)}
              className="flex items-center justify-between px-3 py-2 border border-border-custom rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all text-neutral-600 dark:text-neutral-300 cursor-pointer"
            >
              <span className="flex items-center gap-2 font-medium">
                <Keyboard className="w-3.5 h-3.5" /> Typing test
              </span>
              <kbd className="text-[10px] text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-950 font-mono">
                Alt+J
              </kbd>
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 pt-5 border-t border-border-custom">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-neutral-500 hover:text-foreground border border-border-custom rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all cursor-pointer"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5" />
            ) : (
              <Moon className="w-3.5 h-3.5" />
            )}
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          </button>
        </div>
      </aside>

      {/* ==================== Main Content ==================== */}
      <main ref={mainRef} className="flex-1 flex flex-col items-center pt-10 md:pt-16 pb-0 px-6 md:px-16 overflow-y-auto overscroll-contain">
        <div className="w-full max-w-4xl flex flex-col gap-16 pb-0">
          {/* ---- Profile Header ---- */}
          <section ref={heroRef} className="flex flex-col gap-6 pt-2 md:pt-8 text-center md:text-left">
            {/* Name & Role */}
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-mono font-semibold">
                Portfolio
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.1]">
                Leovi Garcia
              </h1>
              <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 font-medium">
                Student Developer
              </p>
            </div>

            {/* Divider */}
            <div className="w-12 h-px bg-neutral-300 dark:bg-neutral-700 mx-auto md:mx-0" />

            {/* Bio */}
            <div className="flex flex-col gap-3.5 text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed md:max-w-2xl">
              <p>
                I am a{" "}
                <strong className="text-foreground font-bold">
                  4th-year Information Technology student
                </strong>{" "}
                building responsive, minimalist web environments and
                offline-first mobile sync platforms.
              </p>
              <p>
                Right now, I am focusing on building lightweight, reliable
                architectures that connect complex background
                synchronizations to clean UI structures. I like turning layout
                designs into functional code.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-xs md:text-sm mt-1 text-neutral-500 font-medium">
              <a
                href="https://github.com/LeoDiD"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition"
              >
                <Github className="w-4 h-4" /> github{" "}
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://www.linkedin.com/in/leovi-casipit-garcia-963b90329/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition"
              >
                <Linkedin className="w-4 h-4" /> linkedin{" "}
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="mailto:leovigarcia07@gmail.com"
                className="flex items-center gap-1.5 hover:text-foreground transition"
              >
                <Mail className="w-4 h-4" /> email{" "}
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </section>

          {/* ---- Stats ---- */}
          <section className="grid grid-cols-2 border-y border-border-custom divide-x divide-border-custom py-2 bg-background/30 rounded-lg">
            <div className="p-6 text-center flex flex-col gap-1.5">
              <span className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
                4th Year
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-neutral-400 font-mono">
                STUDENT STATUS
              </span>
            </div>
            <div className="p-6 text-center flex flex-col gap-1.5">
              <span className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
                15+
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-neutral-400 font-mono">
                PROJECTS BUILT
              </span>
            </div>
          </section>

          {/* ---- 01 — Projects ---- */}
          <section ref={projectsRef} className="scroll-mt-20 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border-custom pb-3">
              <span className="text-xs md:text-sm font-bold tracking-[0.15em] text-neutral-400 uppercase font-mono">
                01 — Projects
              </span>
              <span className="text-xs text-neutral-400 font-mono">FEATURED WORK</span>
            </div>

            <div className="flex flex-col gap-8">
              {/* Project 1: Kapit-Bisig */}
              <div className="flex flex-col md:flex-row md:gap-6 border-l-2 border-border-custom pl-5 relative group">
                <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600 border-2 border-background group-hover:bg-foreground transition-colors" />
                <span className="text-xs text-neutral-400 md:w-32 shrink-0 pt-0.5 font-mono">
                  01/2026 – 10/2026
                </span>
                <div className="flex flex-col gap-2.5 mt-1 md:mt-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base md:text-lg text-neutral-900 dark:text-neutral-100">
                      Kapit-Bisig
                    </h4>
                  </div>
                  <p className="text-sm md:text-[15px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    a full-stack community relief distribution system built with Next.js, Express.js, React Native (Expo), and FastAPI. The platform manages the complete relief workflow — from resident registration and beneficiary targeting to QR-code-based claim scanning and volunteer coordination. Integrated AI-powered face recognition (DeepFace/OpenCV) for identity verification and Ethereum blockchain for tamper-proof claim records, backed by MongoDB Atlas.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "Next.js",
                      "Express.js",
                      "React Native (Expo)",
                      "FastAPI",
                      "DeepFace/OpenCV",
                      "Ethereum",
                      "MongoDB Atlas",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 border border-border-custom bg-background rounded-md text-xs text-neutral-600 dark:text-neutral-400 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---- 02 — Stack ---- */}
          <section
            ref={stackRef}
            className="scroll-mt-20 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between border-b border-border-custom pb-3">
              <span className="text-xs md:text-sm font-bold tracking-[0.15em] text-neutral-400 uppercase font-mono">
                02 — Stack
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                TECH & PLATFORMS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {TECH_STACK_CATEGORIES.map((cat) => (
                <div
                  key={cat.category}
                  className="flex flex-col gap-3 p-5 border border-border-custom rounded-xl bg-background/50 hover:border-neutral-400/60 dark:hover:border-neutral-600/60 transition-colors"
                >
                  <span className="text-xs font-bold tracking-[0.15em] text-neutral-400 uppercase font-mono">
                    {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-3.5 py-1.5 border border-border-custom bg-background rounded-md text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-foreground transition duration-150 cursor-default select-none shadow-2xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---- 03 — Experience & Education ---- */}
          <section
            ref={experienceRef}
            className="scroll-mt-20 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between border-b border-border-custom pb-3">
              <span className="text-xs md:text-sm font-bold tracking-[0.15em] text-neutral-400 uppercase font-mono">
                03 — Experience & Education
              </span>
              <span className="text-xs text-neutral-400 font-mono">MY PATHWAY</span>
            </div>

            <div className="flex flex-col gap-8">
              {/* Timeline 1 */}
              <div className="flex flex-col md:flex-row md:gap-6 border-l-2 border-border-custom pl-5 relative">
                <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700 border-2 border-background" />
                <span className="text-xs text-neutral-400 md:w-32 shrink-0 pt-0.5 font-mono">
                  2023 — Present
                </span>
                <div className="flex flex-col gap-1.5 mt-1 md:mt-0">
                  <h4 className="font-bold text-base md:text-lg text-neutral-900 dark:text-neutral-100">
                    BS Information Technology
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-500 font-medium">
                    State University / 4th Year College Student
                  </p>
                  <p className="text-sm md:text-[15px] text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                    Focusing on Software Engineering principles, database
                    structures, and dynamic web application routing. Project lead
                    on various academic system designs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---- 04 — Certifications ---- */}
          <section
            ref={certificationsRef}
            className="scroll-mt-20 flex flex-col gap-5"
          >
            <div className="flex items-center justify-between border-b border-border-custom pb-3">
              <span className="text-xs md:text-sm font-bold tracking-[0.15em] text-neutral-400 uppercase font-mono">
                04 — Certifications
              </span>
              <span className="text-xs text-neutral-400 font-mono">MICROSOFT LEARN · {MS_LEARN_BADGES.length} BADGES</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {MS_LEARN_BADGES.map((badge) => (
                <div
                  key={badge.name}
                  className={`group/badge flex items-center gap-2.5 px-3.5 py-2 border rounded-full bg-background transition-all duration-200 cursor-default ${badge.assessed
                      ? "border-border-custom hover:border-neutral-400 dark:hover:border-neutral-500 text-neutral-800 dark:text-neutral-200 shadow-2xs"
                      : "border-border-custom/60 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-500 dark:text-neutral-400"
                    }`}
                >
                  <div className="flex items-center justify-center shrink-0">
                    {badge.assessed ? (
                      <ShieldCheck className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                    ) : (
                      <Award className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                    )}
                  </div>
                  <span className="text-xs md:text-sm font-mono leading-none">
                    {badge.name}
                  </span>
                  <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono ml-0.5">
                    {badge.date}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ==================== Footer ==================== */}
          <footer className="w-full border-t border-border-custom pt-10 pb-4 flex flex-col gap-8">
            {/* Contact Info Bar */}
            <div className="flex flex-col gap-3 text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
              {/* Row 1: Email, Phone, Address */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href="mailto:leovigarcia07@gmail.com"
                  className="flex items-center gap-2 hover:text-foreground transition group"
                >
                  <Mail className="w-4 h-4 text-neutral-400 group-hover:text-foreground shrink-0 transition-colors" />
                  <span>leovigarcia07@gmail.com</span>
                </a>
                <a
                  href="tel:+639099728765"
                  className="flex items-center gap-2 hover:text-foreground transition group"
                >
                  <Phone className="w-4 h-4 text-neutral-400 group-hover:text-foreground shrink-0 transition-colors" />
                  <span>+63 909 972 8765</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>#183 Purok 3 Maasin, Mangaldan, Pangasinan</span>
                </div>
              </div>
              {/* Row 2: Social Links */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href="https://github.com/LeoDiD"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition group"
                >
                  <Github className="w-4 h-4 text-neutral-400 group-hover:text-foreground shrink-0 transition-colors" />
                  <span>github.com/LeoDiD</span>
                </a>
                <a
                  href="https://leovi.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition group"
                >
                  <Globe className="w-4 h-4 text-neutral-400 group-hover:text-foreground shrink-0 transition-colors" />
                  <span>leovi.vercel.app</span>
                </a>
              </div>
            </div>

            {/* Bottom Centered Copyright */}
            <div className="pt-6 border-t border-border-custom flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-500 font-mono">
              <span className="w-full text-center sm:text-left">
                © {new Date().getFullYear()} Leovi Garcia. All rights reserved.
              </span>
              <button
                onClick={scrollToHero}
                className="flex items-center gap-1 hover:text-foreground transition cursor-pointer shrink-0"
                title="Back to top"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </footer>
        </div>
      </main>

      {/* ==================== PHOTOBOOTH MODAL ==================== */}
      <AnimatePresence>
        {isPhotoboothOpen && (
          <div className="fixed inset-0 bg-neutral-900/30 dark:bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background border border-border-custom w-full max-w-lg shadow-2xl rounded-xl overflow-hidden animate-scale-up"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border-custom">
                <div className="flex items-center gap-2.5 text-neutral-600 dark:text-neutral-300 font-medium">
                  <Camera className="w-4 h-4" />
                  <span className="text-sm font-bold tracking-wide">
                    Photobooth
                  </span>
                </div>
                <button
                  onClick={() => setIsPhotoboothOpen(false)}
                  className="p-1.5 border border-border-custom hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md transition cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Viewfinder */}
              <div className="p-5 flex flex-col gap-4">
                <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden border border-border-custom">
                  {cameraError ? (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-400 p-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Camera className="w-7 h-7 text-neutral-600" />
                        <span>{cameraError}</span>
                      </div>
                    </div>
                  ) : capturedPhoto ? (
                    /* Captured Photo */
                    <img
                      src={capturedPhoto}
                      alt="Captured photo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        filter:
                          activeFilter !== "normal"
                            ? getFilterCSS(activeFilter)
                            : undefined,
                      }}
                    />
                  )}

                  {/* Flash Effect */}
                  {isFlashing && (
                    <div className="absolute inset-0 bg-white animate-flash pointer-events-none z-10" />
                  )}
                </div>

                {/* Filter Selector */}
                {!capturedPhoto && !cameraError && (
                  <div className="flex gap-2 justify-center">
                    {PHOTO_FILTERS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id)}
                        className={`px-3 py-1.5 text-xs font-bold tracking-wider rounded-md border transition cursor-pointer ${activeFilter === f.id
                            ? "border-foreground text-foreground bg-neutral-100 dark:bg-neutral-800"
                            : "border-border-custom text-neutral-400 hover:text-foreground hover:border-neutral-400"
                          }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-center gap-3">
                  {capturedPhoto ? (
                    <>
                      <button
                        onClick={retakePhoto}
                        className="flex items-center gap-2 px-5 py-2.5 text-xs md:text-sm font-bold border border-border-custom rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition text-neutral-700 dark:text-neutral-200 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> RETAKE
                      </button>
                      <button
                        onClick={downloadPhoto}
                        className="flex items-center gap-2 px-5 py-2.5 text-xs md:text-sm font-bold bg-foreground text-background rounded-lg hover:opacity-90 transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> DOWNLOAD
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={capturePhoto}
                      disabled={!!cameraError}
                      className="flex items-center gap-2 px-7 py-2.5 text-xs md:text-sm font-bold bg-foreground text-background rounded-lg hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Camera className="w-4 h-4" /> CAPTURE
                    </button>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-2.5 border-t border-border-custom bg-neutral-50 dark:bg-neutral-950/50 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>
                  {capturedPhoto
                    ? "nice shot! retake or save it."
                    : "point your face at the camera"}
                </span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hidden capture canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* ==================== TYPING TEST MODAL ==================== */}
      <AnimatePresence>
        {isTypingOpen && (
          <div className="fixed inset-0 bg-neutral-900/30 dark:bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background border border-border-custom w-full max-w-2xl shadow-2xl rounded-xl overflow-hidden animate-scale-up"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border-custom bg-neutral-50 dark:bg-neutral-950/50">
                <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
                  <Keyboard className="w-4 h-4" />
                  <span className="text-xs md:text-sm font-bold tracking-wide">
                    Keystroke Typing Engine
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={nextRandomQuote}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-border-custom hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md transition text-neutral-600 dark:text-neutral-300 cursor-pointer"
                    title="Load a different random paragraph"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Shuffle</span>
                  </button>
                  <button
                    onClick={closeTypingGame}
                    className="p-1.5 border border-border-custom hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-4">
                {/* Stats */}
                <div className="grid grid-cols-3 border border-border-custom divide-x divide-border-custom rounded-lg bg-background/50 text-center">
                  <div className="py-2.5 flex flex-col gap-0.5">
                    <span className="text-lg md:text-xl font-mono font-bold text-neutral-900 dark:text-neutral-100">
                      {wpm}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">
                      WPM
                    </span>
                  </div>
                  <div className="py-2.5 flex flex-col gap-0.5">
                    <span className="text-lg md:text-xl font-mono font-bold text-neutral-900 dark:text-neutral-100">
                      {accuracy}%
                    </span>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">
                      ACCURACY
                    </span>
                  </div>
                  <div className="py-2.5 flex flex-col gap-0.5">
                    <span className="text-lg md:text-xl font-mono font-bold text-neutral-900 dark:text-neutral-100">
                      {isTypingCompleted
                        ? "DONE"
                        : typingStartTime
                          ? `${typingElapsedTime}s`
                          : "IDLE"}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">
                      {isTypingCompleted ? "STATUS" : typingStartTime ? "TIME" : "STATUS"}
                    </span>
                  </div>
                </div>

                {/* Quote Display */}
                <div
                  onClick={() => typingInputRef.current?.focus()}
                  className="p-4 border border-border-custom bg-neutral-50 dark:bg-neutral-950/20 rounded-lg flex flex-col gap-3 cursor-text select-none"
                >
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono pb-2 border-b border-border-custom/50">
                    <span className="px-2 py-0.5 border border-border-custom rounded bg-neutral-100 dark:bg-neutral-900 uppercase tracking-wider text-[10px] font-semibold">
                      {TYPING_QUOTES[currentQuoteIndex]?.category || "Prompt"}
                    </span>
                    <span>— {TYPING_QUOTES[currentQuoteIndex]?.author || "Quote"}</span>
                  </div>

                  <div className="text-sm md:text-base leading-relaxed font-mono tracking-wide">
                    {(TYPING_QUOTES[currentQuoteIndex]?.text || "").split("").map((char, index) => {
                      let color = "text-neutral-400 dark:text-neutral-500";
                      const isCurrent = index === typingInput.length && !isTypingCompleted;

                      if (index < typingInput.length) {
                        color =
                          typingInput[index] === char
                            ? "text-neutral-900 dark:text-neutral-100 font-semibold"
                            : "text-red-500 bg-red-100 dark:bg-red-950/40 rounded-xs";
                      }

                      return (
                        <span
                          key={index}
                          className={`${color} ${isCurrent
                              ? "underline decoration-2 decoration-foreground font-bold text-foreground bg-neutral-200 dark:bg-neutral-800 rounded-xs"
                              : ""
                            }`}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>

                  {/* Progress & Counter */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 pt-1.5 font-mono">
                    <div className="w-1/2 bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-neutral-800 dark:bg-neutral-200 h-full transition-all duration-150 rounded-full"
                        style={{
                          width: `${((typingInput.length) /
                              (TYPING_QUOTES[currentQuoteIndex]?.text.length || 1)) *
                            100
                            }%`,
                        }}
                      />
                    </div>
                    <span>
                      {typingInput.length} /{" "}
                      {TYPING_QUOTES[currentQuoteIndex]?.text.length || 0} chars
                    </span>
                  </div>
                </div>

                {/* Input Area */}
                <div className="flex flex-col gap-2 text-xs">
                  <label
                    htmlFor="typingEngineInput"
                    className="text-neutral-400 uppercase tracking-wider text-xs font-mono flex justify-between"
                  >
                    <span>Type the paragraph above</span>
                    <span className="lowercase text-neutral-400">click quote box or press tab to focus</span>
                  </label>
                  <textarea
                    id="typingEngineInput"
                    ref={typingInputRef}
                    rows={3}
                    value={typingInput}
                    onChange={handleTypingChange}
                    disabled={isTypingCompleted}
                    placeholder="Start typing the paragraph here..."
                    className="w-full px-4 py-3 border border-border-custom bg-background rounded-lg text-sm md:text-base font-mono focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition resize-none leading-relaxed"
                  />
                </div>

                {/* Completion Result */}
                {isTypingCompleted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-green-200 dark:border-green-950 bg-green-50/50 dark:bg-green-950/10 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm"
                  >
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <Terminal className="w-4 h-4 shrink-0" />
                      <span>
                        Complete! <strong>{wpm} WPM</strong> with{" "}
                        <strong>{accuracy}% accuracy</strong> in {typingElapsedTime}s.
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={resetTyping}
                        className="flex items-center gap-1.5 px-3 py-2 border border-green-300 dark:border-green-800 text-green-800 dark:text-green-300 rounded-md hover:bg-green-100 dark:hover:bg-green-950/50 transition cursor-pointer font-medium"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retry</span>
                      </button>
                      <button
                        onClick={nextRandomQuote}
                        className="flex items-center gap-1.5 px-3 py-2 bg-green-700 dark:bg-green-600 text-white rounded-md hover:opacity-90 transition cursor-pointer font-medium"
                      >
                        <Shuffle className="w-3.5 h-3.5" />
                        <span>Next Paragraph</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-2.5 border-t border-border-custom bg-neutral-50 dark:bg-neutral-950/50 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>Tab to input · Alt+J or ESC to close</span>
                <span>Random paragraph on every round</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
