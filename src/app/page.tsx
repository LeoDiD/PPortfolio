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
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */



const PHOTO_FILTERS = [
  { id: "pixel", name: "PIXEL" },
  { id: "normal", name: "CLEAR" },
  { id: "bw", name: "B&W" },
  { id: "retro", name: "RETRO" },
  { id: "invert", name: "INVERT" },
] as const;

type FilterId = (typeof PHOTO_FILTERS)[number]["id"];

const getFilterCSS = (id: FilterId): string => {
  switch (id) {
    case "pixel":
      return "none";
    case "normal":
      return "none";
    case "bw":
      return "grayscale(100%) contrast(1.2)";
    case "retro":
      return "sepia(80%) contrast(1.1) brightness(0.9)";
    case "invert":
      return "invert(100%)";
  }
};

const TYPING_QUOTE =
  "I am a fourth year information technology student developer designing minimal and clean user interfaces with typescript and tailwind css.";

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
  const [activeView, setActiveView] = useState<"overview" | "stack">("overview");
  const [activeNav, setActiveNav] = useState<
    "projects" | "experience" | "stack" | "certifications"
  >("projects");


  /* ---- Photobooth ---- */
  const [isPhotoboothOpen, setIsPhotoboothOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterId>("pixel");
  const [isFlashing, setIsFlashing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number>(0);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);

  /* ---- Typing Test ---- */
  const [isTypingOpen, setIsTypingOpen] = useState(false);
  const [typingInput, setTypingInput] = useState("");
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);
  const typingInputRef = useRef<HTMLInputElement>(null);



  /* ---- Scroll Refs ---- */
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);

  /* ================================================================ */
  /*  Effects                                                          */
  /* ================================================================ */

  /* Theme loader */
  useEffect(() => {
    if (activeView !== "overview") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === projectsRef.current) setActiveNav("projects");
            if (entry.target === experienceRef.current) setActiveNav("experience");
            if (entry.target === certificationsRef.current) setActiveNav("certifications");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (projectsRef.current) observer.observe(projectsRef.current);
    if (experienceRef.current) observer.observe(experienceRef.current);
    if (certificationsRef.current) observer.observe(certificationsRef.current);

    return () => observer.disconnect();
  }, [activeView]);

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

  /* Focus typing input */
  useEffect(() => {
    if (isTypingOpen) {
      const t = setTimeout(() => typingInputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isTypingOpen]);

  /* Create offscreen canvas once */
  useEffect(() => {
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 48;
    offscreenRef.current = c;
  }, []);

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
    cancelAnimationFrame(animFrameRef.current);
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
      setActiveFilter("pixel");
      setIsFlashing(false);
      setCameraError(null);
    }
    return () => stopCamera();
  }, [isPhotoboothOpen, startCamera, stopCamera]);

  /* ---- Pixel preview animation ---- */
  useEffect(() => {
    if (!isPhotoboothOpen || activeFilter !== "pixel" || capturedPhoto) {
      cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const video = videoRef.current;
    const preview = previewCanvasRef.current;
    const offscreen = offscreenRef.current;
    if (!video || !preview || !offscreen) return;

    const offCtx = offscreen.getContext("2d");
    const prevCtx = preview.getContext("2d");
    if (!offCtx || !prevCtx) return;

    preview.width = 640;
    preview.height = 480;

    const draw = () => {
      if (video.readyState >= 2) {
        offCtx.drawImage(video, 0, 0, 64, 48);
        prevCtx.imageSmoothingEnabled = false;
        prevCtx.drawImage(offscreen, 0, 0, 64, 48, 0, 0, 640, 480);
      }
      animFrameRef.current = requestAnimationFrame(draw);
    };

    if (video.readyState >= 2) {
      draw();
    } else {
      video.addEventListener("loadeddata", () => draw(), { once: true });
    }

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPhotoboothOpen, activeFilter, capturedPhoto]);

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
    setActiveView("overview");
    setActiveNav("projects");
    setMobileMenuOpen(false);
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const navigateToSection = (
    section: "projects" | "experience" | "certifications",
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    setActiveView("overview");
    setActiveNav(section);
    setMobileMenuOpen(false);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  /* ---- Typing ---- */
  const resetTyping = () => {
    setTypingInput("");
    setTypingStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsTypingCompleted(false);
  };

  const closeTypingGame = () => {
    setIsTypingOpen(false);
    resetTyping();
  };

  const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!typingStartTime && val.length > 0) setTypingStartTime(Date.now());
    setTypingInput(val);

    let correct = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === TYPING_QUOTE[i]) correct++;
    }
    setAccuracy(val.length > 0 ? Math.round((correct / val.length) * 100) : 100);

    if (typingStartTime && val.length > 0) {
      const mins = (Date.now() - typingStartTime) / 60000;
      if (mins > 0) setWpm(Math.round(val.length / 5 / mins));
    }

    if (val === TYPING_QUOTE) setIsTypingCompleted(true);
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

    if (activeFilter === "pixel") {
      const small = document.createElement("canvas");
      small.width = 64;
      small.height = 48;
      const sCtx = small.getContext("2d");
      sCtx?.drawImage(video, 0, 0, 64, 48);

      canvas.width = 640;
      canvas.height = 480;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(small, 0, 0, 640, 480);
    } else {
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const css = getFilterCSS(activeFilter);
      if (css !== "none") ctx.filter = css;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    setCapturedPhoto(canvas.toDataURL("image/png"));
  };

  const downloadPhoto = () => {
    if (!capturedPhoto) return;
    const a = document.createElement("a");
    a.download = `pixel-booth-${Date.now()}.png`;
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
    <div className="relative md:h-screen flex flex-col md:flex-row bg-background text-foreground bg-dotted-grid font-mono md:overflow-hidden selection:bg-neutral-200 dark:selection:bg-neutral-800">
      {/* ==================== Mobile Header ==================== */}
      <header className="md:hidden flex items-center justify-between border-b border-border-custom bg-background/90 backdrop-blur px-5 py-3 z-40 sticky top-0">
        <button
          onClick={scrollToHero}
          className="font-pixel text-[10px] font-bold tracking-tight text-left hover:text-neutral-500 transition-colors cursor-pointer"
        >
          Leovi Garcia
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 border border-border-custom hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded transition"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5" />
            ) : (
              <Moon className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-border-custom hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded transition"
          >
            {mobileMenuOpen ? (
              <X className="w-3.5 h-3.5" />
            ) : (
              <Menu className="w-3.5 h-3.5" />
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
            className="md:hidden fixed top-[57px] left-0 right-0 bg-background border-b border-border-custom px-5 py-4 flex flex-col gap-3 z-30 shadow-md"
          >
            <button
              onClick={() => navigateToSection("projects", projectsRef)}
              className={`text-left text-xs py-1.5 hover:pl-2 transition-all ${
                activeNav === "projects" ? "font-bold text-foreground" : ""
              }`}
            >
              {activeNav === "projects" ? "→ 01. Projects" : "01. Projects"}
            </button>
            <button
              onClick={() => navigateToSection("experience", experienceRef)}
              className={`text-left text-xs py-1.5 hover:pl-2 transition-all ${
                activeNav === "experience" ? "font-bold text-foreground" : ""
              }`}
            >
              {activeNav === "experience" ? "→ 02. Experience" : "02. Experience"}
            </button>
            <button
              onClick={() => {
                setActiveView("stack");
                setActiveNav("stack");
                setMobileMenuOpen(false);
              }}
              className={`text-left text-xs py-1.5 hover:pl-2 transition-all ${
                activeNav === "stack" ? "font-bold text-foreground" : ""
              }`}
            >
              {activeNav === "stack" ? "→ 03. Stack" : "03. Stack"}
            </button>
            <button
              onClick={() => navigateToSection("certifications", certificationsRef)}
              className={`text-left text-xs py-1.5 hover:pl-2 transition-all ${
                activeNav === "certifications" ? "font-bold text-foreground" : ""
              }`}
            >
              {activeNav === "certifications" ? "→ 04. Certifications" : "04. Certifications"}
            </button>
            <div className="border-t border-border-custom pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsPhotoboothOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xs py-1.5 hover:pl-2 transition-all"
              >
                <Camera className="w-3.5 h-3.5" /> Photobooth
              </button>
              <button
                onClick={() => {
                  setIsTypingOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xs py-1.5 hover:pl-2 transition-all"
              >
                <Keyboard className="w-3.5 h-3.5" /> Typing Test
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== Desktop Sidebar ==================== */}
      <aside className="hidden md:flex flex-col w-[220px] min-h-screen border-r border-border-custom bg-background/50 backdrop-blur sticky top-0 px-5 py-6 justify-between shrink-0 select-none z-20">
        {/* Top Section */}
        <div className="flex flex-col gap-6">
          {/* Identity */}
          <button
            onClick={scrollToHero}
            className="flex flex-col text-left group cursor-pointer focus:outline-none"
          >
            <h1 className="font-pixel text-[13px] md:text-[15px] font-bold leading-relaxed tracking-tight group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              Leovi Garcia
            </h1>
            <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">
              student developer
            </p>
          </button>

          {/* Navigation */}
          <nav className="flex flex-col gap-2.5 text-[11px]">
            <button
              onClick={() => navigateToSection("projects", projectsRef)}
              className={`group flex items-center justify-between transition-all text-left ${
                activeNav === "projects"
                  ? "text-foreground font-bold"
                  : "text-neutral-500 hover:text-foreground"
              }`}
            >
              <span>{activeNav === "projects" ? "→ Projects" : "Projects"}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px]">
                01
              </span>
            </button>
            <button
              onClick={() => navigateToSection("experience", experienceRef)}
              className={`group flex items-center justify-between transition-all text-left ${
                activeNav === "experience"
                  ? "text-foreground font-bold"
                  : "text-neutral-500 hover:text-foreground"
              }`}
            >
              <span>{activeNav === "experience" ? "→ Experience" : "Experience"}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px]">
                02
              </span>
            </button>
            <button
              onClick={() => {
                setActiveView("stack");
                setActiveNav("stack");
              }}
              className={`group flex items-center justify-between transition-all text-left ${
                activeNav === "stack"
                  ? "text-foreground font-bold"
                  : "text-neutral-500 hover:text-foreground"
              }`}
            >
              <span>{activeNav === "stack" ? "→ Stack" : "Stack"}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px]">
                03
              </span>
            </button>
            <button
              onClick={() => navigateToSection("certifications", certificationsRef)}
              className={`group flex items-center justify-between transition-all text-left ${
                activeNav === "certifications"
                  ? "text-foreground font-bold"
                  : "text-neutral-500 hover:text-foreground"
              }`}
            >
              <span>{activeNav === "certifications" ? "→ Certifications" : "Certifications"}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px]">
                04
              </span>
            </button>
          </nav>

          {/* Interactive Widgets */}
          <div className="flex flex-col gap-2 pt-4 border-t border-border-custom text-[10px]">
            <button
              onClick={() => setIsPhotoboothOpen(true)}
              className="flex items-center justify-between px-2.5 py-1.5 border border-border-custom rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all text-neutral-600 dark:text-neutral-300"
            >
              <span className="flex items-center gap-1.5">
                <Camera className="w-3 h-3" /> Photobooth
              </span>
              <kbd className="text-[8px] text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-1 rounded bg-neutral-100 dark:bg-neutral-950">
                Alt+K
              </kbd>
            </button>

            <button
              onClick={() => setIsTypingOpen(true)}
              className="flex items-center justify-between px-2.5 py-1.5 border border-border-custom rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all text-neutral-600 dark:text-neutral-300"
            >
              <span className="flex items-center gap-1.5">
                <Keyboard className="w-3 h-3" /> Typing test
              </span>
              <kbd className="text-[8px] text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-1 rounded bg-neutral-100 dark:bg-neutral-950">
                Alt+J
              </kbd>
            </button>

          </div>


        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 pt-4 border-t border-border-custom">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-2.5 py-1.5 text-[10px] text-neutral-500 hover:text-foreground border border-border-custom rounded transition-all"
          >
            {isDark ? (
              <Sun className="w-3 h-3" />
            ) : (
              <Moon className="w-3 h-3" />
            )}
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          </button>

          {/* Contact */}
          <a
            href="mailto:leovigarcia07@gmail.com"
            className="flex items-center gap-1.5 text-[10px] text-neutral-500 hover:text-foreground transition break-all"
          >
            <Mail className="w-3 h-3 shrink-0" />
            <span>leovigarcia07@gmail.com</span>
          </a>
        </div>
      </aside>

      {/* ==================== Main Content ==================== */}
      <main className="flex-1 flex flex-col items-center py-8 md:py-16 px-5 md:px-14 overflow-y-auto">
        <div className="w-full max-w-4xl flex flex-col gap-16">
          {activeView === "stack" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-10 py-2"
            >
              {/* Back Button */}
              <div>
                <button
                  onClick={() => setActiveView("overview")}
                  className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-foreground transition group cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Overview</span>
                </button>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-3">
                <h1 className="font-pixel text-xl md:text-3xl text-neutral-900 dark:text-neutral-50 tracking-tight">
                  tech stack
                </h1>
                <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                  The tools, frameworks, and platforms I reach for — across the front end, back end, infrastructure, and AI.
                </p>
              </div>

              {/* Categorized Tech Badges */}
              <div className="flex flex-col gap-10">
                {TECH_STACK_CATEGORIES.map((cat) => (
                  <div key={cat.category} className="flex flex-col gap-3.5">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                      {cat.category}
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {cat.items.map((item) => (
                        <div
                          key={item}
                          className="px-3.5 py-1.5 border border-border-custom bg-background hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded text-xs font-mono text-neutral-700 dark:text-neutral-300 border-border-custom hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-150 cursor-default select-none shadow-2xs"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {/* ---- Profile Header ---- */}
              <section ref={heroRef} className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start pt-2 md:pt-8">
                {/* Pixel Logo Sign */}
                <div className="relative w-[240px] h-[300px] md:w-[280px] md:h-[340px] border border-border-custom p-2.5 bg-background shrink-0 shadow-sm transition hover:shadow-md duration-300 group">
                  <div className="relative w-full h-full bg-neutral-100 dark:bg-neutral-900 border border-border-custom overflow-hidden flex flex-col items-center justify-center gap-5">
                    {/* Pixel Art Logo SVG */}
                    <div className="group-hover:scale-105 transition-transform duration-300 select-none">
                      <svg width="80" height="80" viewBox="0 0 16 16" className="render-pixel" shapeRendering="crispEdges">
                        {/* L shape */}
                        <rect x="1" y="1" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="1" y="3" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="1" y="5" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="1" y="7" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="1" y="9" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="3" y="9" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="5" y="9" width="2" height="2" className="fill-neutral-700 dark:fill-neutral-200" />
                        {/* G shape */}
                        <rect x="9" y="1" width="2" height="2" className="fill-neutral-700 dark:fill-neutral-200" />
                        <rect x="11" y="1" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="13" y="1" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="7" y="3" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="7" y="5" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="7" y="7" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="7" y="9" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="9" y="9" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="11" y="9" width="2" height="2" className="fill-neutral-700 dark:fill-neutral-200" />
                        <rect x="13" y="9" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="13" y="7" width="2" height="2" className="fill-neutral-800 dark:fill-neutral-100" />
                        <rect x="11" y="7" width="2" height="2" className="fill-neutral-700 dark:fill-neutral-200" />
                        {/* Decorative pixel corners */}
                        <rect x="0" y="0" width="1" height="1" className="fill-neutral-300 dark:fill-neutral-700" />
                        <rect x="15" y="0" width="1" height="1" className="fill-neutral-300 dark:fill-neutral-700" />
                        <rect x="0" y="11" width="1" height="1" className="fill-neutral-300 dark:fill-neutral-700" />
                        <rect x="15" y="11" width="1" height="1" className="fill-neutral-300 dark:fill-neutral-700" />
                      </svg>
                    </div>
                    {/* Decorative line */}
                    <div className="w-12 h-[2px] bg-neutral-300 dark:bg-neutral-700" style={{ imageRendering: 'pixelated' }} />
                    {/* Subtitle */}
                    <span className="text-[7px] uppercase tracking-[0.35em] text-neutral-400 dark:text-neutral-500">
                      est. 2023
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex flex-col gap-5 md:pt-2 text-center md:text-left">
                  <div>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-neutral-400 block mb-1.5">
                      Portfolio
                    </span>
                    <h2 className="font-pixel text-[14px] md:text-[18px] leading-relaxed tracking-tight text-neutral-900 dark:text-neutral-50">
                      Leovi Garcia
                    </h2>
                  </div>

                  <div className="flex flex-col gap-3 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed md:max-w-xl">
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
                  <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1.5 text-[10px] mt-1 text-neutral-500">
                    <a
                      href="https://github.com/LeoDiD"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-foreground transition"
                    >
                      <Github className="w-3 h-3" /> github{" "}
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/leovi-casipit-garcia-963b90329/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-foreground transition"
                    >
                      <Linkedin className="w-3 h-3" /> linkedin{" "}
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </a>
                    <a
                      href="mailto:leovigarcia07@gmail.com"
                      className="flex items-center gap-1 hover:text-foreground transition"
                    >
                      <Mail className="w-3 h-3" /> email{" "}
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </section>

              {/* ---- Stats ---- */}
              <section className="grid grid-cols-2 border-y border-border-custom divide-x divide-border-custom py-0 bg-background/30">
                <div className="p-5 text-center flex flex-col gap-1">
                  <span className="font-pixel text-[10px] md:text-[12px] text-neutral-800 dark:text-neutral-100">
                    4th Year
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.15em] text-neutral-400">
                    STUDENT STATUS
                  </span>
                </div>
                <div className="p-5 text-center flex flex-col gap-1">
                  <span className="font-pixel text-[10px] md:text-[12px] text-neutral-800 dark:text-neutral-100">
                    15+
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.15em] text-neutral-400">
                    PROJECTS BUILT
                  </span>
                </div>
              </section>

              {/* ---- Stack ---- */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-border-custom pb-2.5">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase">
                    STACK
                  </span>
                  <button
                    onClick={() => {
                      setActiveView("stack");
                      setActiveNav("stack");
                    }}
                    className="text-[9px] text-neutral-400 hover:text-foreground transition flex items-center gap-1 cursor-pointer"
                  >
                    VIEW ALL <ArrowUpRight className="w-2.5 h-2.5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 text-[10px]">
                  {[
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "Python",
                    "Laravel",
                    "PostgreSQL",
                    "AWS",
                    "Docker",
                    "Kubernetes",
                    "PyTorch",
                    "Claude Code",
                  ].map((tech) => (
                    <div
                      key={tech}
                      className="px-2.5 py-1 border border-border-custom bg-background rounded text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 hover:text-foreground transition duration-200"
                    >
                      {tech}
                    </div>
                  ))}
                  <div
                    onClick={() => {
                      setActiveView("stack");
                      setActiveNav("stack");
                    }}
                    className="px-2.5 py-1 border border-dashed border-border-custom bg-background/50 rounded text-neutral-400 hover:border-neutral-400 hover:text-foreground transition duration-200 cursor-pointer"
                  >
                    + more
                  </div>
                </div>
              </section>

              {/* ---- 01 — Projects ---- */}
              <section ref={projectsRef} className="scroll-mt-20 flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-border-custom pb-2.5">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase">
                    01 — Projects
                  </span>
                </div>

                {/* Coming Soon */}
                <div className="w-full border border-dashed border-border-custom rounded-xl flex flex-col items-center justify-center py-16 px-6 gap-4 bg-background/30">
                  <div className="w-12 h-12 rounded-lg border border-border-custom flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
                    <Terminal className="w-5 h-5 text-neutral-400" />
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <span className="font-pixel text-[11px] text-neutral-700 dark:text-neutral-200">
                      Coming Soon
                    </span>
                    <span className="text-[10px] text-neutral-400 max-w-xs leading-relaxed">
                      Projects are currently being built. Check back soon for updates.
                    </span>
                  </div>
                </div>
              </section>

              {/* ---- 02 — Experience & Education ---- */}
              <section
                ref={experienceRef}
                className="scroll-mt-20 flex flex-col gap-6"
              >
                <div className="flex items-center justify-between border-b border-border-custom pb-2.5">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase">
                    02 — Experience & Education
                  </span>
                  <span className="text-[9px] text-neutral-400">MY PATHWAY</span>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Timeline 1 */}
                  <div className="flex flex-col md:flex-row md:gap-6 border-l border-border-custom pl-5 relative">
                    <span className="absolute left-[-4px] top-1 w-[7px] h-[7px] rounded-full bg-neutral-300 dark:bg-neutral-700 border-2 border-background" />
                    <span className="text-[10px] text-neutral-400 md:w-28 shrink-0 pt-0.5">
                      2023 — Present
                    </span>
                    <div className="flex flex-col gap-1 mt-1 md:mt-0">
                      <h4 className="font-bold text-xs text-neutral-800 dark:text-neutral-100">
                        BS Information Technology
                      </h4>
                      <p className="text-[10px] text-neutral-500">
                        State University / 4th Year College Student
                      </p>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
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
                className="scroll-mt-20 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between border-b border-border-custom pb-2.5">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase">
                    04 — Certifications
                  </span>
                  <span className="text-[9px] text-neutral-400">MICROSOFT LEARN · {MS_LEARN_BADGES.length} BADGES</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {MS_LEARN_BADGES.map((badge) => (
                    <div
                      key={badge.name}
                      className={`group/badge flex items-center gap-2 px-3 py-1.5 border rounded-full bg-background transition-all duration-200 cursor-default ${
                        badge.assessed
                          ? "border-border-custom hover:border-neutral-400 dark:hover:border-neutral-500 text-neutral-800 dark:text-neutral-200"
                          : "border-border-custom/60 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-500 dark:text-neutral-400"
                      }`}
                    >
                      <div className="flex items-center justify-center shrink-0">
                        {badge.assessed ? (
                          <ShieldCheck className="w-3 h-3 text-neutral-700 dark:text-neutral-300" style={{ imageRendering: 'pixelated' }} />
                        ) : (
                          <Award className="w-3 h-3 text-neutral-400 dark:text-neutral-500" style={{ imageRendering: 'pixelated' }} />
                        )}
                      </div>
                      <span className="text-[10px] font-mono leading-none">
                        {badge.name}
                      </span>
                      <span className="text-[8px] text-neutral-400 dark:text-neutral-500 font-mono ml-0.5">
                        {badge.date}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
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
              className="bg-background border border-border-custom w-full max-w-lg shadow-2xl rounded overflow-hidden animate-scale-up"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-custom">
                <div className="flex items-center gap-2 text-neutral-500">
                  <Camera className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold tracking-wide">
                    Pixel Photobooth
                  </span>
                </div>
                <button
                  onClick={() => setIsPhotoboothOpen(false)}
                  className="p-1 border border-border-custom hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* Viewfinder */}
              <div className="p-4 flex flex-col gap-3">
                <div className="relative aspect-[4/3] bg-black rounded overflow-hidden border border-border-custom scanlines">
                  {cameraError ? (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-neutral-400 p-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Camera className="w-6 h-6 text-neutral-600" />
                        <span>{cameraError}</span>
                      </div>
                    </div>
                  ) : capturedPhoto ? (
                    /* Captured Photo */
                    <img
                      src={capturedPhoto}
                      alt="Captured photo"
                      className={`w-full h-full object-cover ${
                        activeFilter === "pixel" ? "render-pixel" : ""
                      }`}
                    />
                  ) : (
                    <>
                      {/* Live Video (visible when NOT pixel filter) */}
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`absolute inset-0 w-full h-full object-cover ${
                          activeFilter === "pixel" ? "invisible" : ""
                        }`}
                        style={{
                          filter:
                            activeFilter !== "pixel" &&
                            activeFilter !== "normal"
                              ? getFilterCSS(activeFilter)
                              : undefined,
                        }}
                      />
                      {/* Pixel Preview Canvas (visible when pixel filter) */}
                      <canvas
                        ref={previewCanvasRef}
                        className={`absolute inset-0 w-full h-full render-pixel ${
                          activeFilter !== "pixel" ? "invisible" : ""
                        }`}
                      />
                    </>
                  )}

                  {/* Flash Effect */}
                  {isFlashing && (
                    <div className="absolute inset-0 bg-white animate-flash pointer-events-none z-10" />
                  )}
                </div>

                {/* Filter Selector */}
                {!capturedPhoto && !cameraError && (
                  <div className="flex gap-1.5 justify-center">
                    {PHOTO_FILTERS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id)}
                        className={`px-2.5 py-1 text-[8px] font-bold tracking-wider rounded border transition ${
                          activeFilter === f.id
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
                <div className="flex justify-center gap-2">
                  {capturedPhoto ? (
                    <>
                      <button
                        onClick={retakePhoto}
                        className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold border border-border-custom rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 transition text-neutral-600 dark:text-neutral-300"
                      >
                        <RotateCcw className="w-3 h-3" /> RETAKE
                      </button>
                      <button
                        onClick={downloadPhoto}
                        className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold bg-foreground text-background rounded hover:opacity-90 transition"
                      >
                        <Download className="w-3 h-3" /> DOWNLOAD
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={capturePhoto}
                      disabled={!!cameraError}
                      className="flex items-center gap-1.5 px-6 py-2 text-[10px] font-bold bg-foreground text-background rounded hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Camera className="w-3.5 h-3.5" /> CAPTURE
                    </button>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-border-custom bg-neutral-50 dark:bg-neutral-950/50 flex items-center justify-between text-[8px] text-neutral-400">
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
              className="bg-background border border-border-custom w-full max-w-2xl shadow-2xl rounded overflow-hidden animate-scale-up"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-custom bg-neutral-50 dark:bg-neutral-950/50">
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                  <Keyboard className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold tracking-wide">
                    Keystroke Typing Engine
                  </span>
                </div>
                <button
                  onClick={closeTypingGame}
                  className="p-1 border border-border-custom hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-4">
                {/* Stats */}
                <div className="grid grid-cols-3 border border-border-custom divide-x divide-border-custom rounded bg-background/50 text-[10px] text-center">
                  <div className="py-2 flex flex-col gap-0.5">
                    <span className="font-pixel text-[12px] text-neutral-900 dark:text-neutral-100">
                      {wpm}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-neutral-400">
                      WPM
                    </span>
                  </div>
                  <div className="py-2 flex flex-col gap-0.5">
                    <span className="font-pixel text-[12px] text-neutral-900 dark:text-neutral-100">
                      {accuracy}%
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-neutral-400">
                      ACCURACY
                    </span>
                  </div>
                  <div className="py-2 flex flex-col gap-0.5">
                    <span className="font-pixel text-[12px] text-neutral-900 dark:text-neutral-100">
                      {isTypingCompleted
                        ? "DONE"
                        : typingStartTime
                          ? "TYPING"
                          : "IDLE"}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-neutral-400">
                      STATUS
                    </span>
                  </div>
                </div>

                {/* Quote Display */}
                <div className="p-3 border border-border-custom bg-neutral-50 dark:bg-neutral-950/20 rounded text-[11px] leading-relaxed select-none">
                  {TYPING_QUOTE.split("").map((char, index) => {
                    let color = "text-neutral-400";
                    if (index < typingInput.length) {
                      color =
                        typingInput[index] === char
                          ? "text-neutral-900 dark:text-neutral-50 font-bold"
                          : "text-red-500 bg-red-100 dark:bg-red-950/30";
                    }
                    return (
                      <span key={index} className={color}>
                        {char}
                      </span>
                    );
                  })}
                </div>

                {/* Input */}
                <div className="flex flex-col gap-1.5 text-[10px]">
                  <label
                    htmlFor="typingEngineInput"
                    className="text-neutral-400 uppercase tracking-wider text-[8px]"
                  >
                    Start typing to play
                  </label>
                  <input
                    id="typingEngineInput"
                    ref={typingInputRef}
                    type="text"
                    value={typingInput}
                    onChange={handleTypingChange}
                    disabled={isTypingCompleted}
                    placeholder="Type the sentence above exactly..."
                    className="w-full px-3 py-2 border border-border-custom bg-background rounded text-[11px] focus:outline-none focus:border-neutral-400 transition"
                  />
                </div>

                {/* Completion */}
                {isTypingCompleted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 border border-green-200 dark:border-green-950 bg-green-50/50 dark:bg-green-950/10 rounded flex items-center justify-between text-[10px]"
                  >
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>
                        Congratulations! {wpm} WPM with {accuracy}% accuracy.
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        resetTyping();
                        setTimeout(
                          () => typingInputRef.current?.focus(),
                          50
                        );
                      }}
                      className="px-2 py-1 border border-green-300 dark:border-green-800 text-green-800 dark:text-green-300 rounded hover:bg-green-100 dark:hover:bg-green-950/50 transition cursor-pointer"
                    >
                      Retry
                    </button>
                  </motion.div>
                )}
              </div>

      {/* Footer */}
              <div className="px-4 py-2 border-t border-border-custom bg-neutral-50 dark:bg-neutral-950/50 flex items-center justify-between text-[8px] text-neutral-400">
                <span>Tab to input, type sentence to complete</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
