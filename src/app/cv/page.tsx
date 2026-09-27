"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  Linkedin,
  Globe,
  Github,
  MapPin,
  Printer,
  ArrowLeft,
  Download,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
} from "lucide-react";

export default function CVPage() {
  return (
    <div className="min-h-screen bg-[#525659] py-8 flex flex-col items-center gap-8 font-sans antialiased text-[#334155] selection:bg-[#1fbba6]/20">
      {/* ======================================================== */}
      {/* Interactive Top Toolbar (hidden in print)                */}
      {/* ======================================================== */}
      <nav
        aria-label="CV actions"
        className="no-print sticky top-4 z-50 bg-slate-900/95 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center gap-4 sm:gap-6 shadow-2xl border border-slate-700/60"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Portfolio</span>
        </Link>

        <div className="h-4 w-px bg-slate-700" />

        <div className="text-xs sm:text-sm font-bold tracking-wide text-white">
          Curriculum Vitae <span className="text-[#1fbba6] font-mono text-xs font-normal">2 Pages</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-[#1fbba6] hover:bg-[#18a390] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>

          <a
            href="/cv.html"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-full text-xs font-medium border border-slate-700 transition"
            title="Open pure HTML version"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Pure HTML</span>
          </a>
        </div>
      </nav>

      {/* ======================================================== */}
      {/* PAGE 1: RESUME & DETAILED CREDENTIALS                    */}
      {/* ======================================================== */}
      <div
        id="cv-page-1"
        className="page-sheet w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm] bg-white shadow-2xl flex overflow-hidden relative"
        style={{
          boxSizing: "border-box",
        }}
      >
        {/* LEFT COLUMN: Dark Slate Background */}
        <aside
          className="w-[34%] bg-[#323e43] text-white p-7 pl-8 pr-6 flex flex-col justify-between shrink-0 select-text"
          style={{ letterSpacing: "normal" }}
        >
          {/* Identity */}
          <div className="flex flex-col gap-1.5 pt-2">
            <h1 className="text-[25px] font-bold tracking-[2.5px] uppercase leading-[1.15] text-white">
              LEOVI
              <br />
              GARCIA
            </h1>
            <p className="text-[10px] font-semibold tracking-[2px] uppercase text-[#d1dcde] leading-snug">
              INFORMATION TECHNOLOGY PROFESSIONAL
            </p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[10.5px] font-bold tracking-[1.8px] text-[#1fbba6] uppercase">
              CONTACT INFORMATION
            </h2>
            <div className="flex flex-col gap-2 text-[9.2px] text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-[17px] h-[17px] rounded-full bg-[#1fbba6] flex items-center justify-center shrink-0 text-white">
                  <Phone className="w-[9px] h-[9px] stroke-[2.5]" />
                </div>
                <span>+63 909 972 8765</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-[17px] h-[17px] rounded-full bg-[#1fbba6] flex items-center justify-center shrink-0 text-white">
                  <Mail className="w-[9px] h-[9px] stroke-[2.5]" />
                </div>
                <span className="truncate">leovigarcia07@gmail.com</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-[17px] h-[17px] rounded-full bg-[#1fbba6] flex items-center justify-center shrink-0 text-white">
                  <Linkedin className="w-[9px] h-[9px] stroke-[2.5]" />
                </div>
                <span className="break-all leading-tight">
                  linkedin.com/in/leovi-casipit-garcia-963b90329
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-[17px] h-[17px] rounded-full bg-[#1fbba6] flex items-center justify-center shrink-0 text-white">
                  <MapPin className="w-[9px] h-[9px] stroke-[2.5]" />
                </div>
                <span>Mangaldan, Pangasinan, PH</span>
              </div>
            </div>
          </div>

          {/* Portfolio */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[10.5px] font-bold tracking-[1.8px] text-[#1fbba6] uppercase">
              PORTFOLIO
            </h2>
            <div className="flex flex-col gap-2 text-[9.2px] text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-[17px] h-[17px] rounded-full bg-[#1fbba6] flex items-center justify-center shrink-0 text-white">
                  <Globe className="w-[9px] h-[9px] stroke-[2.5]" />
                </div>
                <span>leovi.vercel.app</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-[17px] h-[17px] rounded-full bg-[#1fbba6] flex items-center justify-center shrink-0 text-white">
                  <Github className="w-[9px] h-[9px] stroke-[2.5]" />
                </div>
                <span>github.com/LeoDiD</span>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[10.5px] font-bold tracking-[1.8px] text-[#1fbba6] uppercase">
              TECHNICAL SKILLS
            </h2>
            <ul className="flex flex-col gap-1 text-[9.5px] text-slate-100">
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>Full-Stack Web Development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>Mobile App Sync & Offline-First</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>Cloud & DevOps Architecture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>Database Engineering & Modeling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>AI Biometrics & Face Recognition</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>Blockchain Smart Contract Claims</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>REST & Microservices Design</span>
              </li>
            </ul>
          </div>

          {/* Programming Languages, Tools & Frameworks */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[10px] font-bold tracking-[1.5px] text-[#1fbba6] uppercase leading-tight">
              PROGRAMMING
              <br />
              LANGUAGES, TOOLS &<br />
              FRAMEWORKS
            </h2>
            <ul className="flex flex-col gap-1 text-[9px] text-slate-100">
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>TypeScript | JavaScript | Python</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>React | Next.js | Vue.js</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>React Native (Expo) | Tailwind CSS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>FastAPI | Node.js | Express.js</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>PHP | Laravel | Java | Spring Boot</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>PostgreSQL | MySQL | MongoDB Atlas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>AWS | Azure | Docker | Git</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>DeepFace | OpenCV | PyTorch</span>
              </li>
            </ul>
          </div>

          {/* Core Work Skills */}
          <div className="flex flex-col gap-1.5 pb-2">
            <h2 className="text-[10.5px] font-bold tracking-[1.8px] text-[#1fbba6] uppercase">
              CORE WORK SKILLS
            </h2>
            <ul className="flex flex-col gap-1 text-[9.5px] text-slate-100">
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>Problem Solving & Algorithmic Logic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>Software Architecture & Clean Code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>Accountability & Work Ethics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>Teamwork & Cross-Collaboration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>Agility & Rapid Adaptability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white text-xs leading-none">•</span>
                <span>Continuous Self-Learning</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* RIGHT COLUMN: White Background */}
        <main className="w-[66%] p-8 pt-9 pb-6 flex flex-col justify-between select-text text-[#334155]">
          {/* PROFILE SUMMARY */}
          <section className="flex flex-col">
            <h2 className="text-[11.5px] font-bold tracking-[2.2px] text-[#263238] uppercase">
              PROFILE SUMMARY
            </h2>
            <div className="w-full h-[3px] bg-[#1fbba6] rounded-xs mt-1.5 mb-2.5" />
            <p className="text-[9.3px] leading-[1.55] text-[#3f4e55] text-justify">
              A 4th-year Information Technology student and software developer with demonstrated proficiency in developing modern business solutions and scalable full-stack applications. Experienced in architecting lightweight, reliable web environments and offline-first mobile synchronization platforms. Skilled in Next.js, React, React Native, TypeScript, Python, FastAPI, and RESTful APIs, with hands-on expertise integrating AI-powered face verification and Ethereum blockchain for transparent data ledgers. Diligent, resolute, and thrives in collaborative team environments where engineering ideas are tested and refined.
            </p>
          </section>

          {/* EDUCATION AND CERTIFICATIONS */}
          <section className="flex flex-col">
            <h2 className="text-[11.5px] font-bold tracking-[2.2px] text-[#263238] uppercase">
              EDUCATION AND CERTIFICATIONS
            </h2>
            <div className="w-full h-[3px] bg-[#1fbba6] rounded-xs mt-1.5 mb-2.5" />
            <div className="flex flex-col">
              <h3 className="text-[10.5px] font-bold uppercase text-[#263238] tracking-[0.5px]">
                BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY
              </h3>
              <div className="text-[9px] font-semibold text-[#52636a] mt-0.5 mb-1">
                State University | 2023 – Present (4th Year College Student)
              </div>
              <ul className="flex flex-col gap-1 text-[8.8px] text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="text-[#64748b] leading-none">•</span>
                  <span>Specializing in Software Engineering, relational database structures, and dynamic web application routing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#64748b] leading-none">•</span>
                  <span>Assessed & Certified: Power BI for Beginners | Simplilearn · Microsoft (2026)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#64748b] leading-none">•</span>
                  <span>Assessed & Certified: Introduction to MS Excel | Simplilearn · Microsoft (2026)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#64748b] leading-none">•</span>
                  <span>Assessed & Certified: Describe cloud service types & cloud computing | Microsoft Learn (2026)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#64748b] leading-none">•</span>
                  <span>Assessed & Certified: Introduction to end-to-end analytics using Microsoft Fabric | Microsoft Learn (2026)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#64748b] leading-none">•</span>
                  <span>Assessed & Certified: Get started with Copilot in Power BI & data analysis | Microsoft Learn (2026)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* RELEVANT EXPERIENCE */}
          <section className="flex flex-col">
            <h2 className="text-[11.5px] font-bold tracking-[2.2px] text-[#263238] uppercase">
              RELEVANT EXPERIENCE
            </h2>
            <div className="w-full h-[3px] bg-[#1fbba6] rounded-xs mt-1.5 mb-2.5" />
            <div className="flex flex-col">
              <h3 className="text-[10.5px] font-bold uppercase text-[#263238] tracking-[0.5px]">
                FULL-STACK DEVELOPER & LEAD SYSTEM ARCHITECT
              </h3>
              <div className="text-[9px] font-semibold text-[#52636a] mt-0.5 mb-1">
                Academic & Community Initiatives | Jan 2024 – Present
              </div>
              <p className="text-[9px] leading-[1.48] text-[#435259] text-justify mb-1">
                Spearheaded technical architecture and development for academic and community web/mobile platforms, leading engineering sprints and establishing clean software design patterns.
              </p>
              <ul className="flex flex-col gap-1 text-[8.8px] text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="text-[#64748b] leading-none">•</span>
                  <span>Standardized modular project structure, shared service layers, and data validation utilities across teams.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#64748b] leading-none">•</span>
                  <span>Engineered high-performance RESTful APIs connecting relational and document databases with reactive client interfaces.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* PROJECTS */}
          <section className="flex flex-col">
            <h2 className="text-[11.5px] font-bold tracking-[2.2px] text-[#263238] uppercase">
              PROJECTS
            </h2>
            <div className="w-full h-[3px] bg-[#1fbba6] rounded-xs mt-1.5 mb-2.5" />

            <div className="flex flex-col gap-2.5">
              {/* Project 1: Kapit-Bisig */}
              <div className="flex flex-col">
                <h3 className="text-[10.5px] font-bold uppercase text-[#263238] tracking-[0.5px]">
                  KAPIT-BISIG: COMMUNITY RELIEF DISTRIBUTION SYSTEM
                </h3>
                <div className="text-[8.8px] font-semibold text-[#52636a] mt-0.5">
                  Capstone / Featured Project | Jan 2026 – Oct 2026
                </div>
                <div className="text-[8.2px] text-[#64748b] font-medium leading-tight mb-1">
                  Next.js | Express.js | React Native (Expo) | FastAPI | DeepFace/OpenCV | Ethereum | MongoDB Atlas
                </div>
                <p className="text-[8.9px] leading-[1.45] text-[#435259] text-justify mb-1">
                  Architected and engineered a comprehensive disaster relief distribution ecosystem automating resident registration, allocation targeting, QR-code claim scanning, and volunteer coordination.
                </p>
                <ul className="flex flex-col gap-0.5 text-[8.6px] text-[#475569]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#64748b] leading-none">•</span>
                    <span>Ensures rapid, fraud-free distribution using AI face verification (DeepFace/OpenCV) and biometric identity matching.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#64748b] leading-none">•</span>
                    <span>Deployed Ethereum blockchain smart contracts for immutable claim records, ensuring absolute transparency.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#64748b] leading-none">•</span>
                    <span>Delivered responsive web administrator portal and offline-resilient mobile app for field distribution volunteers.</span>
                  </li>
                </ul>
              </div>

              {/* Project 2: Developer Portfolio & Typing Engine */}
              <div className="flex flex-col">
                <h3 className="text-[10.5px] font-bold uppercase text-[#263238] tracking-[0.5px]">
                  DEVELOPER PORTFOLIO & INTERACTIVE TYPING ENGINE
                </h3>
                <div className="text-[8.8px] font-semibold text-[#52636a] mt-0.5">
                  Personal Project | Jul 2026 – Present
                </div>
                <div className="text-[8.2px] text-[#64748b] font-medium leading-tight mb-1">
                  Next.js 16 | React 19 | TypeScript | Tailwind CSS | Framer Motion | Canvas API | Vercel
                </div>
                <p className="text-[8.9px] leading-[1.45] text-[#435259] text-justify mb-1">
                  Designed and built a modern developer web experience featuring responsive navigation, dark/light theme switching, and built-in interactive tools.
                </p>
                <ul className="flex flex-col gap-0.5 text-[8.6px] text-[#475569]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#64748b] leading-none">•</span>
                    <span>Built an interactive keystroke typing engine providing real-time WPM calculation, character accuracy, and quote shuffling.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#64748b] leading-none">•</span>
                    <span>Created an HTML5 Canvas photobooth module with customizable real-time color filters and instant photo export.</span>
                  </li>
                </ul>
              </div>

              {/* Project 3: Academic System */}
              <div className="flex flex-col">
                <h3 className="text-[10.5px] font-bold uppercase text-[#263238] tracking-[0.5px]">
                  ACADEMIC RECORD & STUDENT CLEARANCE SYSTEM
                </h3>
                <div className="text-[8.8px] font-semibold text-[#52636a] mt-0.5">
                  Academic Project | 2024 – 2025
                </div>
                <div className="text-[8.2px] text-[#64748b] font-medium leading-tight mb-1">
                  Python | FastAPI | PostgreSQL | React | Docker | Microsoft Fabric
                </div>
                <ul className="flex flex-col gap-0.5 text-[8.6px] text-[#475569]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#64748b] leading-none">•</span>
                    <span>Developed centralized record management platform with normalized database schemas and role-based access control.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#64748b] leading-none">•</span>
                    <span>Integrated data analysis pipelines tracking student clearance statuses and generating audit reports.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ACTIVITIES */}
          <section className="flex flex-col">
            <h2 className="text-[11.5px] font-bold tracking-[2.2px] text-[#263238] uppercase">
              ACTIVITIES & COLLABORATIONS
            </h2>
            <div className="w-full h-[3px] bg-[#1fbba6] rounded-xs mt-1.5 mb-2.5" />
            <div className="flex flex-col">
              <h3 className="text-[10.5px] font-bold uppercase text-[#263238] tracking-[0.5px]">
                STUDENT DEVELOPER INITIATIVE & PEER COLLABORATION
              </h3>
              <div className="text-[8.8px] font-semibold text-[#52636a] mt-0.5 mb-1">
                Information Technology Department | 2023 – Present
              </div>
              <ul className="flex flex-col gap-0.5 text-[8.6px] text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="text-[#64748b] leading-none">•</span>
                  <span>Served as technical lead on collegiate software capstone groups, conducting code reviews and architectural planning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#64748b] leading-none">•</span>
                  <span>Actively participated in cloud computing, data analytics, and modern web application development seminars.</span>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>

      {/* ======================================================== */}
      {/* PAGE 2: VISUAL PROJECT SHOWCASE                           */}
      {/* ======================================================== */}
      <div
        id="cv-page-2"
        className="page-sheet w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm] bg-white shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* TOP BANNER */}
        <header className="bg-[#323e43] text-white px-10 py-7 flex flex-col gap-1.5 shrink-0">
          <h1 className="text-[24px] font-bold tracking-[2.5px] uppercase leading-none">
            LEOVI GARCIA
          </h1>
          <p className="text-[10px] font-semibold tracking-[2px] uppercase text-[#d1dcde]">
            INFORMATION TECHNOLOGY PROFESSIONAL
          </p>
        </header>

        {/* SHOWCASE CONTENT: 3 Rows */}
        <div className="p-10 flex flex-col justify-between flex-1 gap-6">
          {/* Showcase 1: Kapit-Bisig */}
          <div className="flex items-center gap-8 min-h-[190px]">
            <div className="w-[32%] flex flex-col gap-1.5 shrink-0">
              <h3 className="text-[11.5px] font-bold tracking-[0.8px] text-[#263238] uppercase leading-tight">
                KAPIT-BISIG COMMUNITY RELIEF DISTRIBUTION SYSTEM
              </h3>
              <div className="text-[9.5px] font-semibold text-[#64748b]">
                Capstone Project | Jan 2026 – Oct 2026
              </div>
              <p className="text-[8.5px] text-[#788896] leading-relaxed font-sans font-medium mt-1">
                Next.js | Express.js | React Native | FastAPI | DeepFace/OpenCV | Ethereum Blockchain | MongoDB Atlas
              </p>
            </div>

            <div className="w-[68%] flex gap-3.5 items-stretch justify-end">
              {/* Mockup 1: Resident App */}
              <div className="flex-1 max-w-[145px] h-[190px] border border-slate-300 rounded-lg bg-slate-50 overflow-hidden shadow-sm flex flex-col">
                <div className="px-2 py-1 bg-white border-b border-slate-200 flex items-center justify-between">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  </div>
                  <span className="text-[7px] font-bold text-[#1fbba6] tracking-wider uppercase">
                    Resident App
                  </span>
                </div>
                <div className="p-2.5 flex-1 flex flex-col gap-2 bg-white text-[8px]">
                  <div className="py-1 px-1.5 rounded bg-teal-50 text-[#0f766e] border border-teal-200 text-[7px] font-bold text-center">
                    KAPIT-BISIG PORTAL
                  </div>
                  <div className="w-16 h-16 border-2 border-dashed border-[#1fbba6] rounded-lg mx-auto flex flex-col items-center justify-center gap-1 bg-teal-50/40 my-auto">
                    <Layers className="w-5 h-5 text-[#1fbba6]" />
                    <span className="text-[5.5px] text-[#0f766e] font-bold">
                      QR CLAIM CODE
                    </span>
                  </div>
                  <div className="border border-slate-200 rounded p-1.5 text-center bg-slate-50 mt-auto">
                    <div className="text-[9px] font-bold text-[#0f766e]">
                      ELIGIBLE
                    </div>
                    <div className="text-[6px] text-slate-500 uppercase tracking-tight">
                      Relief Package A
                    </div>
                  </div>
                </div>
              </div>

              {/* Mockup 2: AI Face Verification */}
              <div className="flex-1 max-w-[145px] h-[190px] border border-slate-300 rounded-lg bg-slate-50 overflow-hidden shadow-sm flex flex-col">
                <div className="px-2 py-1 bg-white border-b border-slate-200 flex items-center justify-between">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  </div>
                  <span className="text-[7px] font-bold text-[#1fbba6] tracking-wider uppercase">
                    AI Verify
                  </span>
                </div>
                <div className="p-2.5 flex-1 flex flex-col gap-2 bg-white text-[8px]">
                  <div className="py-1 px-1.5 rounded bg-teal-50 text-[#0f766e] border border-teal-200 text-[7px] font-bold text-center">
                    DEEPFACE AI
                  </div>
                  <div className="w-14 h-14 rounded-full border-2 border-[#1fbba6] mx-auto flex items-center justify-center bg-teal-50/50 my-auto">
                    <ShieldCheck className="w-7 h-7 text-[#1fbba6]" />
                  </div>
                  <div className="border border-slate-200 rounded p-1.5 text-center bg-slate-50 mt-auto">
                    <div className="text-[9px] font-bold text-emerald-600">
                      99.4% MATCH
                    </div>
                    <div className="text-[6px] text-slate-500 uppercase tracking-tight">
                      Biometrics Passed
                    </div>
                  </div>
                </div>
              </div>

              {/* Mockup 3: Ethereum Ledger */}
              <div className="flex-1 max-w-[145px] h-[190px] border border-slate-700 rounded-lg bg-slate-900 overflow-hidden shadow-sm flex flex-col text-slate-100">
                <div className="px-2 py-1 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  </div>
                  <span className="text-[7px] font-bold text-sky-400 tracking-wider uppercase">
                    Ethereum
                  </span>
                </div>
                <div className="p-2.5 flex-1 flex flex-col gap-2 bg-slate-900 text-[8px]">
                  <div className="py-0.5 px-1.5 rounded bg-slate-800 text-sky-300 border border-slate-700 text-[6.5px] font-bold text-center">
                    IMMUTABLE LEDGER
                  </div>
                  <div className="bg-slate-950 rounded p-1.5 font-mono text-[6.5px] text-sky-400 leading-snug my-auto">
                    TX: 0x8f3b...9a12
                    <br />
                    STATUS: MINED
                    <br />
                    CLAIM_ID: #4092
                    <br />
                    TAMPER_PROOF: TRUE
                  </div>
                  <div className="border border-slate-800 rounded p-1.5 text-center bg-slate-950 mt-auto">
                    <div className="text-[9px] font-bold text-sky-400 font-mono">
                      BLOCK #1982
                    </div>
                    <div className="text-[6px] text-slate-400 uppercase tracking-tight">
                      Claim Registered
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Showcase 2: Interactive Portfolio */}
          <div className="flex items-center gap-8 min-h-[190px]">
            <div className="w-[32%] flex flex-col gap-1.5 shrink-0">
              <h3 className="text-[11.5px] font-bold tracking-[0.8px] text-[#263238] uppercase leading-tight">
                DEVELOPER PORTFOLIO & INTERACTIVE TYPING ENGINE
              </h3>
              <div className="text-[9.5px] font-semibold text-[#64748b]">
                Personal Project | Jul 2026 – Present
              </div>
              <p className="text-[8.5px] text-[#788896] leading-relaxed font-sans font-medium mt-1">
                Next.js 16 | React 19 | TypeScript | Tailwind CSS | Framer Motion | Canvas API | Vercel
              </p>
            </div>

            <div className="w-[68%] flex gap-3.5 items-stretch justify-end">
              {/* Mockup 1: Typing Engine */}
              <div className="flex-1 max-w-[145px] h-[190px] border border-slate-300 rounded-lg bg-slate-50 overflow-hidden shadow-sm flex flex-col">
                <div className="px-2 py-1 bg-white border-b border-slate-200 flex items-center justify-between">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  </div>
                  <span className="text-[7px] font-bold text-[#1fbba6] tracking-wider uppercase">
                    Typing Engine
                  </span>
                </div>
                <div className="p-2.5 flex-1 flex flex-col gap-2 bg-white text-[8px]">
                  <div className="py-1 px-1.5 rounded bg-teal-50 text-[#0f766e] border border-teal-200 text-[7px] font-bold text-center">
                    KEYSTROKE METRICS
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 my-auto">
                    <div className="border border-slate-200 rounded p-1 text-center bg-slate-50">
                      <div className="text-[10px] font-bold text-slate-800 font-mono">
                        84
                      </div>
                      <div className="text-[6px] text-slate-500 uppercase">
                        WPM
                      </div>
                    </div>
                    <div className="border border-slate-200 rounded p-1 text-center bg-slate-50">
                      <div className="text-[10px] font-bold text-slate-800 font-mono">
                        99%
                      </div>
                      <div className="text-[6px] text-slate-500 uppercase">
                        ACCURACY
                      </div>
                    </div>
                  </div>
                  <div className="font-mono text-[6.5px] bg-slate-100 p-1.5 rounded text-slate-600 mt-auto leading-tight">
                    Clean code is craftsmanship and care...
                  </div>
                </div>
              </div>

              {/* Mockup 2: Photobooth Module */}
              <div className="flex-1 max-w-[145px] h-[190px] border border-slate-300 rounded-lg bg-slate-50 overflow-hidden shadow-sm flex flex-col">
                <div className="px-2 py-1 bg-white border-b border-slate-200 flex items-center justify-between">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  </div>
                  <span className="text-[7px] font-bold text-[#1fbba6] tracking-wider uppercase">
                    Photobooth
                  </span>
                </div>
                <div className="p-2.5 flex-1 flex flex-col gap-2 bg-white text-[8px]">
                  <div className="py-1 px-1.5 rounded bg-teal-50 text-[#0f766e] border border-teal-200 text-[7px] font-bold text-center">
                    HTML5 CANVAS
                  </div>
                  <div className="w-full h-14 bg-slate-900 rounded flex flex-col items-center justify-center text-sky-400 gap-1 my-auto">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[6.5px] font-mono text-slate-300">
                      LIVE CAMERA
                    </span>
                  </div>
                  <div className="flex gap-1 justify-center mt-auto">
                    <span className="text-[6px] px-1.5 py-0.5 bg-slate-200 rounded text-slate-700">
                      B&W
                    </span>
                    <span className="text-[6px] px-1.5 py-0.5 bg-slate-200 rounded text-slate-700">
                      WARM
                    </span>
                    <span className="text-[6px] px-1.5 py-0.5 bg-slate-200 rounded text-slate-700">
                      COOL
                    </span>
                  </div>
                </div>
              </div>

              {/* Mockup 3: Minimalist Portfolio Dashboard */}
              <div className="flex-1 max-w-[145px] h-[190px] border border-slate-700 rounded-lg bg-slate-900 overflow-hidden shadow-sm flex flex-col text-slate-100">
                <div className="px-2 py-1 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  </div>
                  <span className="text-[7px] font-bold text-sky-400 tracking-wider uppercase">
                    Portfolio
                  </span>
                </div>
                <div className="p-2.5 flex-1 flex flex-col gap-2 bg-slate-900 text-[8px]">
                  <div className="py-0.5 px-1.5 rounded bg-slate-800 text-sky-300 border border-slate-700 text-[6.5px] font-bold text-center">
                    LEOVI GARCIA
                  </div>
                  <div className="flex flex-col gap-1 text-[6.8px] text-slate-400 my-auto">
                    <div>01. Projects (15+)</div>
                    <div>02. Tech Stack</div>
                    <div>03. Experience</div>
                    <div>04. Certifications</div>
                  </div>
                  <div className="border border-slate-800 rounded p-1.5 text-center bg-slate-950 mt-auto">
                    <div className="text-[9px] font-bold text-sky-400 font-mono">
                      4TH YEAR
                    </div>
                    <div className="text-[6px] text-slate-400 uppercase tracking-tight">
                      Student Developer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Showcase 3: Academic Record & Analytics */}
          <div className="flex items-center gap-8 min-h-[190px]">
            <div className="w-[32%] flex flex-col gap-1.5 shrink-0">
              <h3 className="text-[11.5px] font-bold tracking-[0.8px] text-[#263238] uppercase leading-tight">
                ACADEMIC RECORD & STUDENT CLEARANCE SYSTEM
              </h3>
              <div className="text-[9.5px] font-semibold text-[#64748b]">
                Academic Project | 2024 – 2025
              </div>
              <p className="text-[8.5px] text-[#788896] leading-relaxed font-sans font-medium mt-1">
                Python | FastAPI | MySQL / PostgreSQL | React | Docker | Microsoft Fabric | Power BI
              </p>
            </div>

            <div className="w-[68%] flex gap-3.5 items-stretch justify-end">
              {/* Mockup 1: Student Record Hub */}
              <div className="flex-1 max-w-[145px] h-[190px] border border-slate-300 rounded-lg bg-slate-50 overflow-hidden shadow-sm flex flex-col">
                <div className="px-2 py-1 bg-white border-b border-slate-200 flex items-center justify-between">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  </div>
                  <span className="text-[7px] font-bold text-[#1fbba6] tracking-wider uppercase">
                    Portal
                  </span>
                </div>
                <div className="p-2.5 flex-1 flex flex-col gap-2 bg-white text-[8px]">
                  <div className="py-1 px-1.5 rounded bg-teal-50 text-[#0f766e] border border-teal-200 text-[7px] font-bold text-center">
                    ACADEMIC HUB
                  </div>
                  <div className="flex flex-col gap-1 text-[6.8px] text-slate-600 my-auto">
                    <div className="bg-slate-100 p-1 rounded">
                      Clearance: 100%
                    </div>
                    <div className="bg-slate-100 p-1 rounded">
                      Enrollment: Approved
                    </div>
                  </div>
                  <div className="border border-slate-200 rounded p-1.5 text-center bg-slate-50 mt-auto">
                    <div className="text-[9px] font-bold text-[#0f766e]">
                      CLEARED
                    </div>
                    <div className="text-[6px] text-slate-500 uppercase tracking-tight">
                      Department Status
                    </div>
                  </div>
                </div>
              </div>

              {/* Mockup 2: Power BI Analytics */}
              <div className="flex-1 max-w-[145px] h-[190px] border border-slate-300 rounded-lg bg-slate-50 overflow-hidden shadow-sm flex flex-col">
                <div className="px-2 py-1 bg-white border-b border-slate-200 flex items-center justify-between">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  </div>
                  <span className="text-[7px] font-bold text-[#1fbba6] tracking-wider uppercase">
                    Analytics
                  </span>
                </div>
                <div className="p-2.5 flex-1 flex flex-col gap-2 bg-white text-[8px]">
                  <div className="py-1 px-1.5 rounded bg-teal-50 text-[#0f766e] border border-teal-200 text-[7px] font-bold text-center">
                    POWER BI FABRIC
                  </div>
                  <div className="grid grid-cols-2 gap-1 my-auto">
                    <div className="border border-slate-200 rounded p-1 text-center bg-slate-50">
                      <div className="text-[9px] font-bold text-slate-800">
                        1,240
                      </div>
                      <div className="text-[5.5px] text-slate-500">STUDENTS</div>
                    </div>
                    <div className="border border-slate-200 rounded p-1 text-center bg-slate-50">
                      <div className="text-[9px] font-bold text-slate-800">
                        98.2%
                      </div>
                      <div className="text-[5.5px] text-slate-500">PASS RATE</div>
                    </div>
                  </div>
                  <div className="h-6 bg-slate-100 rounded flex items-end gap-1 p-1 mt-auto">
                    <div className="w-1/5 h-[40%] bg-[#1fbba6] rounded-xs" />
                    <div className="w-1/5 h-[70%] bg-[#1fbba6] rounded-xs" />
                    <div className="w-1/5 h-[55%] bg-[#1fbba6] rounded-xs" />
                    <div className="w-1/5 h-[95%] bg-[#1fbba6] rounded-xs" />
                    <div className="w-1/5 h-[80%] bg-[#1fbba6] rounded-xs" />
                  </div>
                </div>
              </div>

              {/* Mockup 3: Database & Cloud */}
              <div className="flex-1 max-w-[145px] h-[190px] border border-slate-700 rounded-lg bg-slate-900 overflow-hidden shadow-sm flex flex-col text-slate-100">
                <div className="px-2 py-1 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  </div>
                  <span className="text-[7px] font-bold text-sky-400 tracking-wider uppercase">
                    Cloud DB
                  </span>
                </div>
                <div className="p-2.5 flex-1 flex flex-col gap-2 bg-slate-900 text-[8px]">
                  <div className="py-0.5 px-1.5 rounded bg-slate-800 text-sky-300 border border-slate-700 text-[6.5px] font-bold text-center">
                    POSTGRESQL & REST
                  </div>
                  <div className="bg-slate-950 rounded p-1.5 font-mono text-[6.5px] text-sky-400 leading-snug my-auto">
                    QUERY: EXPLAIN
                    <br />
                    EXEC_TIME: 1.2ms
                    <br />
                    CACHE_HIT: 99.8%
                    <br />
                    REPLICAS: HEALTHY
                  </div>
                  <div className="border border-slate-800 rounded p-1.5 text-center bg-slate-950 mt-auto">
                    <div className="text-[9px] font-bold text-sky-400 font-mono">
                      FASTAPI
                    </div>
                    <div className="text-[6px] text-slate-400 uppercase tracking-tight">
                      Containerized
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded print styles */}
      <style jsx global>{`
        @media print {
          body {
            background-color: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            gap: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .page-sheet {
            box-shadow: none !important;
            margin: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            page-break-after: always !important;
            break-after: page !important;
            overflow: hidden !important;
          }
          @page {
            size: A4 portrait;
            margin: 0mm;
          }
        }
      `}</style>
    </div>
  );
}
