"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Code,
  BookOpen,
  Briefcase,
  User,
  Send,
  RefreshCw,
  ThumbsUp,
  Download,
  ExternalLink,
  ArrowUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChatBot from "./ChatBot";
import ContactModal from "./ContactModal";
import {
  RainAnimation,
  AnimatedGradient,
  DigitalCircuit,
  Starfield,
  GalaxyAnimation,
  NebulaBackground,
} from "./AnimationComponents";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Component as LoginPage } from "@/components/ui/animated-characters-login-page";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null as string | null,
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState("");
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  
  // Refs for GSAP animations
  const journeySectionRef = useRef<HTMLDivElement>(null);
  const journeyContainerRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  // Handle navigation click
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Monitor scroll position to update active nav and show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      // Update active section
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });

      // Show/hide scroll to top button
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animations for Journey and Projects sections
  useEffect(() => {
    if (typeof window === "undefined") return;

    const setupAnimations = () => {
      // Journey Section - Horizontal Scroll Animation (Centered)
      if (journeyContainerRef.current && journeySectionRef.current) {
        const journeyItems = Array.from(journeyContainerRef.current.children) as HTMLElement[];
        const containerWidth = journeyContainerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = Math.max(0, containerWidth - viewportWidth);
        const centerOffset = (viewportWidth - containerWidth) / 2;
        
        if (scrollDistance > 0) {
          // Set up horizontal scroll with centering
          gsap.to(journeyContainerRef.current, {
            x: centerOffset > 0 ? centerOffset : -scrollDistance,
            ease: "none",
            scrollTrigger: {
              trigger: journeySectionRef.current,
              start: "top top",
              end: `+=${scrollDistance}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          
          // Timeline animation removed

          // Animate each journey item with enhanced effects
          journeyItems.forEach((itemElement) => {
            const card = itemElement.querySelector(".journey-card");
            const badge = itemElement.querySelector(".journey-badge");
            const period = itemElement.querySelector(".journey-period");
            const title = itemElement.querySelector(".journey-title");
            const description = itemElement.querySelector(".journey-description");
            
            // Initial state - make all items visible
            gsap.set(itemElement, { opacity: 1, x: 0, scale: 1 });
            if (card) gsap.set(card, { opacity: 1, y: 0, scale: 1 });
            if (badge) gsap.set(badge, { opacity: 1, x: 0, scale: 1 });
            if (period) gsap.set(period, { opacity: 1, y: 0 });
            if (title) gsap.set(title, { opacity: 1, y: 0 });
            if (description) gsap.set(description, { opacity: 1, y: 0 });

            // Animate on scroll
            ScrollTrigger.create({
              trigger: journeySectionRef.current,
              start: "top top",
              end: `+=${scrollDistance}`,
              scrub: 1.2,
              onUpdate: (self) => {
                const progress = self.progress;
                const itemPosition = itemElement.offsetLeft;
                const itemWidth = itemElement.offsetWidth;
                const itemCenter = itemPosition + itemWidth / 2;
                const scrollPosition = progress * scrollDistance;
                const viewportCenter = scrollPosition + viewportWidth / 2;
                
                // Calculate visibility - keep all items fully visible
                const distance = Math.abs(itemCenter - viewportCenter);
                const visibility = Math.max(0.8, Math.min(1, 1 - distance / (viewportWidth * 1.2))); // Minimum 80% visibility
                const normalizedVisibility = Math.pow(visibility, 0.8); // Less aggressive curve
                
                // Animate main item - keep fully visible
                gsap.to(itemElement, {
                  opacity: Math.max(0.9, normalizedVisibility), // Minimum 90% opacity
                  x: 0,
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });

                // Animate card - keep fully visible
                if (card) {
                  gsap.to(card, {
                    opacity: Math.max(0.9, normalizedVisibility),
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }

                // Animate badge - keep fully visible
                if (badge) {
                  const badgeVisibility = Math.max(0.9, normalizedVisibility);
                  gsap.to(badge, {
                    opacity: badgeVisibility,
                    x: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }

                // Animate period - keep fully visible
                if (period) {
                  const periodVisibility = Math.max(0.9, normalizedVisibility);
                  gsap.to(period, {
                    opacity: periodVisibility,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }

                // Animate title - keep fully visible
                if (title) {
                  const titleVisibility = Math.max(0.9, normalizedVisibility);
                  gsap.to(title, {
                    opacity: titleVisibility,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }

                // Animate description - keep fully visible
                if (description) {
                  const descVisibility = Math.max(0.9, normalizedVisibility);
                  gsap.to(description, {
                    opacity: descVisibility,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }
              },
            });
          });
        }
      }

      // Projects Section - Horizontal Slide Animation
      if (projectsContainerRef.current && projectsSectionRef.current) {
        const projectItems = Array.from(projectsContainerRef.current.children) as HTMLElement[];
        const containerWidth = projectsContainerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = Math.max(0, containerWidth - viewportWidth);
        
        if (scrollDistance > 0) {
          // Set up horizontal scroll for projects
          gsap.to(projectsContainerRef.current, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
              trigger: projectsSectionRef.current,
              start: "top top",
              end: `+=${scrollDistance}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Animate each project card
          projectItems.forEach((itemElement) => {
            const textElements = itemElement.querySelectorAll(".project-text");
            
            // Initial state
            gsap.set(itemElement, { opacity: 0, scale: 0.9, x: 100 });
            textElements.forEach((text) => {
              gsap.set(text, { opacity: 0, y: 30, filter: "blur(8px)" });
            });

            // Animate on scroll
            ScrollTrigger.create({
              trigger: projectsSectionRef.current,
              start: "top top",
              end: `+=${scrollDistance}`,
              scrub: 1,
              onUpdate: (self) => {
                const progress = self.progress;
                const itemPosition = itemElement.offsetLeft;
                const itemWidth = itemElement.offsetWidth;
                const itemCenter = itemPosition + itemWidth / 2;
                const scrollPosition = progress * scrollDistance;
                const viewportCenter = scrollPosition + viewportWidth / 2;
                
                // Calculate visibility based on distance from viewport center - improved
                const distance = Math.abs(itemCenter - viewportCenter);
                const visibility = Math.max(0.7, Math.min(1, 1 - distance / (viewportWidth * 1.0))); // Minimum 70% visibility
                
                gsap.set(itemElement, {
                  opacity: visibility,
                  scale: 0.98 + visibility * 0.02,
                  x: (1 - visibility) * 60,
                });

                // Animate text with blur effect - improved visibility
                textElements.forEach((text, textIndex) => {
                  const textVisibility = Math.max(0.8, visibility - textIndex * 0.05); // Minimum 80% visibility
                  gsap.set(text, {
                    opacity: textVisibility,
                    y: (1 - textVisibility) * 15,
                    filter: `blur(${Math.max(0, (1 - textVisibility) * 2)}px)`, // Minimal blur
                  });
                });
              },
            });
          });
        }
      }
    };

    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      setTimeout(setupAnimations, 100);
    });

    return () => {
      const journeySection = journeySectionRef.current;
      const projectsSection = projectsSectionRef.current;
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          (journeySection && trigger.vars.trigger === journeySection) ||
          (projectsSection && trigger.vars.trigger === projectsSection)
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Handle hire me button click
  const handleHireMeClick = () => {
    setContactSubject("Job Opportunity");
    setIsContactModalOpen(true);
  };

  // Handle let's talk button click
  const handleLetsTalkClick = () => {
    setContactSubject("General Inquiry");
    setIsContactModalOpen(true);
  };

  // Handle download CV
  const handleDownloadCV = () => {
    // Create a link to download the CV
    const link = document.createElement("a");
    link.href = "/files/gloire_cv.pdf"; // Update with your actual CV file path
    link.download = "Gloire_Mugisho_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#081b29] text-white min-h-screen overflow-x-hidden scroll-smooth">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-[#081b29]/90 backdrop-blur-md border-b border-[#00abf0]/20">
        <div className="container mx-auto flex justify-between items-center py-3 px-6">
          <div className="text-2xl font-bold flex items-center gap-2">
            <div className="flex items-center mr-1">
              <Image src="/logo-mg.svg" alt="MG Logo" width={28} height={28} />
            </div>
            <span className="text-[#00abf0]">Gloire</span>
            <span className="text-xs bg-[#00abf0]/10 px-2 py-0.5 rounded-full text-[#00abf0]">
              Developer
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {[
              "home",
              "about",
              "education",
              "skills",
              "projects",
              "contact",
            ].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`capitalize text-sm ${
                  activeSection === item
                    ? "text-[#00abf0] font-medium"
                    : "text-gray-300 hover:text-white"
                } transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#00abf0] after:transition-all ${
                  activeSection === item ? "after:w-full" : "after:w-0"
                } hover:after:w-full`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#081b29]/95 backdrop-blur-md border-b border-[#00abf0]/20"
            >
              <div className="container mx-auto py-2 px-6 flex flex-col">
                {[
                  "home",
                  "about",
                  "education",
                  "skills",
                  "projects",
                  "contact",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`capitalize py-2 text-sm ${
                      activeSection === item
                        ? "text-[#00abf0] font-medium"
                        : "text-gray-300 hover:text-white"
                    } transition-colors text-left`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-20 pb-8 relative overflow-hidden"
      >
        {/* Advanced Space Background Effects */}
        <AnimatedGradient
          colors={["#081b29", "#0a1f32", "#041320", "#072136"]}
          className="z-0 opacity-80"
        />
        <Starfield starCount={40} speed={0.5} />
        <GalaxyAnimation starCount={20} galaxyCount={3} />
        <NebulaBackground
          color1="rgba(0,171,240,0.1)"
          color2="rgba(128,0,255,0.08)"
          intensity={0.6}
        />
        <RainAnimation density={5} color="rgba(0,171,240,0.5)" scrollTrigger={true} />

        {/* Content */}
        <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="w-full md:w-1/2 space-y-3">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-[#00abf0]/10 px-3 py-1 rounded-full backdrop-blur-sm border border-[#00abf0]/20">
                <span className="text-[#00abf0] font-medium text-sm">
                  3+ Years of Experience
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              Hi, I&apos;m{" "}
              <span className="text-[#00abf0] inline-block">
                Gloire
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2"
            >
              <h2 className="text-lg md:text-xl font-medium text-gray-300">
                <span className="text-[#00abf0]">
                  Full Stack Developer
                </span>{" "}
                &{" "}
                <span className="text-[#00abf0]">
                  AI Engineer
                </span>
              </h2>
              <p className="text-gray-400 max-w-lg text-sm backdrop-blur-sm bg-[#081b29]/30 p-2.5 rounded-lg border border-[#00abf0]/10">
                I specialize in building modern web applications and AI
                integrations with a focus on performance, scalability, and
                exceptional user experiences.
              </p>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {[
                { name: "React", icon: "/icons/react.svg" },
                { name: "Next.js", icon: "/icons/nextjs.svg" },
                { name: "Node.js", icon: "/icons/node.svg" },
                { name: "TypeScript", icon: "/icons/typescript.svg" },
                { name: "AI", icon: "/icons/ai.svg" },
                { name: "MongoDB", icon: "" },
              ].map((tech, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-[#0a1f32] text-xs px-3 py-1 rounded-full border border-[#00abf0]/20 text-gray-300 flex items-center gap-1.5 hover:border-[#00abf0]/50 transition-colors backdrop-blur-sm"
                >
                  {tech.icon && (
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={12}
                      height={12}
                      className="opacity-80"
                    />
                  )}
                  {tech.name}
                </motion.span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                onClick={handleHireMeClick}
                className="bg-gradient-to-r from-[#00abf0] to-[#0077b6] text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-[#00abf0]/20 hover:scale-105"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(0,171,240,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me
              </motion.button>
              <motion.button
                onClick={handleLetsTalkClick}
                className="border border-[#00abf0] text-[#00abf0] px-5 py-2 rounded-full text-sm font-medium transition-all hover:bg-[#00abf0]/10 backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 10px rgba(0,171,240,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Let&apos;s Talk
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex space-x-3 pt-2"
            >
              {[
                { icon: Github, link: "https://github.com/gloirembonyi" },
                {
                  icon: Linkedin,
                  link: "https://www.linkedin.com/in/gloire-mbonyi-755788250/",
                },
                { icon: Mail, link: "mailto:gloirembonyi4@gmail.com" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0a1f32] p-2 rounded-full hover:bg-[#00abf0]/10 transition-all group backdrop-blur-sm border border-[#00abf0]/10"
                  whileHover={{
                    scale: 1.2,
                    boxShadow: "0 0 10px rgba(0,171,240,0.5)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon
                    size={18}
                    className="text-gray-400 group-hover:text-[#00abf0]"
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Profile Image with advanced effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-[#00abf0]/20"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-[#00abf0]/20"></div>

              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 overflow-hidden rounded-full border-4 border-[#00abf0] p-2 group">
                {/* Moving dots around the profile image */}
                <div className="absolute inset-0 rounded-full z-20 pointer-events-none">
                  {/* {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const radius = 50;
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-[#00abf0]"
                        style={{
                          left: `calc(50% + ${Math.cos(angle) * radius}%)`,
                          top: `calc(50% + ${Math.sin(angle) * radius}%)`,
                          boxShadow: "0 0 10px #00abf0",
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.25,
                          ease: "easeInOut",
                        }}
                      />
                    );
                  })} */}
                </div>

                {/* Blue stripes overlay effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#00abf0]/30 transform -translate-x-4"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#00abf0]/30 transform translate-x-2"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#00abf0]/30 transform translate-x-6"></div>
                </div>

                {/* Profile image with enhanced hover effect */}
                <div className="rounded-full overflow-hidden w-full h-full relative z-10">
                  <Image
                    src="/gmz.png"
                    alt="Gloire"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00abf0]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Scanner animation - runs once on page load */}
                  <motion.div
                    className="absolute inset-0 z-20 pointer-events-none"
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{
                      duration: 1.5,
                      delay: 0.8,
                      ease: "easeInOut",
                      repeat: 0,
                    }}
                  >
                    <div className="w-full h-1 bg-gradient-to-b from-transparent via-[#00abf0] to-transparent opacity-80 shadow-[0_0_20px_rgba(0,171,240,0.8)]"></div>
                  </motion.div>

                  {/* Digital circuit overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                    <DigitalCircuit
                      color="#ffffff"
                      lineWidth={0.5}
                      nodeSize={2}
                      speed={3}
                    />
                  </div>
                </div>
              </div>

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-2 -right-2 bg-[#081b29] border border-[#00abf0] rounded-lg py-1.5 px-3 shadow-lg backdrop-blur-sm"
                whileHover={{
                  scale: 1.02,
                }}
              >
                <p className="text-xs text-gray-400">Full Stack & AI</p>
                <p className="text-sm font-bold text-[#00abf0]">
                  Developer
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 relative overflow-hidden bg-[#081b29] scroll-smooth">
        {/* Clean background */}
        <AnimatedGradient
          colors={["#081b29", "#0a1f32", "#081b29"]}
          className="z-0 opacity-60"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="text-4xl font-bold">
              About <span className="text-[#00abf0]">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00abf0] to-[#0077b6] mx-auto mt-4"></div>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/3"
            >
              <div className="relative group">
                {/* Clean image with simple border */}
                <div className="relative overflow-hidden rounded-xl border-2 border-[#00abf0]/30 shadow-lg transition-all duration-300 group-hover:border-[#00abf0]/50">
                  <div className="aspect-w-4 aspect-h-5 relative h-[400px]">
                    <Image
                      src="/dev-gloire.jpeg"
                      alt="Gloire"
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                </div>

                {/* Experience badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-4 -right-4 bg-[#081b29] border border-[#00abf0] rounded-lg py-1.5 px-3 shadow-lg backdrop-blur-sm"
                >
                  <p className="text-xs text-gray-400">Experience</p>
                  <p className="text-sm font-bold text-[#00abf0]">
                    3+ Years
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-2/3"
            >
              <div className="bg-[#0a1f32]/50 p-6 rounded-xl border border-[#00abf0]/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Code size={20} className="text-[#00abf0]" />
                  <span className="text-[#00abf0]">Full Stack</span>{" "}
                  Developer & AI Engineer
                </h3>

                <div className="space-y-4 text-sm">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-gray-300 leading-relaxed"
                  >
                    I am a passionate Full Stack Developer and AI Engineer with
                    expertise in creating visually appealing and user-friendly
                    web applications. With a strong foundation in modern web
                    technologies and AI integration, I strive to build
                    responsive, intelligent, and accessible interfaces that
                    provide exceptional user experiences.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-gray-300 leading-relaxed"
                  >
                    My approach combines creative design thinking with technical
                    excellence to deliver solutions that not only meet but
                    exceed client expectations. I enjoy staying updated with the
                    latest industry trends and continuously expanding my skill
                    set to tackle new challenges.
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {[
                    { icon: User, label: "Name", value: "Gloire Mugisho" },
                    {
                      icon: Mail,
                      label: "Email",
                      value: "gloirembonyi4@gmail.com",
                    },
                    {
                      icon: Briefcase,
                      label: "Current Position",
                      value: "Developer at GKK",
                    },
                    { icon: Code, label: "Projects", value: "15+ Completed" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 5px 15px rgba(0,171,240,0.2)",
                        borderColor: "rgba(0,171,240,0.4)",
                      }}
                      className="flex items-center gap-3 bg-[#081b29]/70 p-3 rounded-lg border border-[#00abf0]/20 hover:border-[#00abf0]/40 transition-all group backdrop-blur-sm"
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                      >
                        <item.icon
                          size={16}
                          className="text-[#00abf0] group-hover:scale-110 transition-transform"
                        />
                      </motion.div>
                      <div>
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="text-sm font-medium">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <motion.button
                    onClick={handleDownloadCV}
                    className="mt-6 bg-gradient-to-r from-[#00abf0] to-[#0077b6] text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-[#00abf0]/20 hover:scale-105 flex items-center gap-2"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(0,171,240,0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Download CV</span>
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Download size={14} />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Add CSS for walking animation */}
        <style jsx>{`
          .walking-animation {
            position: relative;
            height: 60px;
            width: 60px;
            margin-bottom: 10px;
          }

          .walking-figure {
            position: relative;
            height: 100%;
            width: 100%;
            animation: walk 1s infinite linear;
          }

          .head {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 15px;
            height: 15px;
            background: #00abf0;
            border-radius: 50%;
            box-shadow: 0 0 10px #00abf0;
          }

          .body {
            position: absolute;
            top: 15px;
            left: 50%;
            transform: translateX(-50%);
            width: 3px;
            height: 20px;
            background: #00abf0;
            box-shadow: 0 0 5px #00abf0;
          }

          .arm {
            position: absolute;
            top: 18px;
            width: 2px;
            height: 15px;
            background: #00abf0;
            transform-origin: top;
            box-shadow: 0 0 5px #00abf0;
          }

          .arm.left {
            left: 46%;
            animation: swing-left 1s infinite linear;
          }

          .arm.right {
            right: 46%;
            animation: swing-right 1s infinite linear;
          }

          .leg {
            position: absolute;
            top: 35px;
            width: 2px;
            height: 20px;
            background: #00abf0;
            transform-origin: top;
            box-shadow: 0 0 5px #00abf0;
          }

          .leg.left {
            left: 46%;
            animation: swing-left 1s infinite linear;
          }

          .leg.right {
            right: 46%;
            animation: swing-right 1s infinite linear;
          }

          @keyframes walk {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-2px);
            }
          }

          @keyframes swing-left {
            0%,
            100% {
              transform: rotate(-30deg);
            }
            50% {
              transform: rotate(30deg);
            }
          }

          @keyframes swing-right {
            0%,
            100% {
              transform: rotate(30deg);
            }
            50% {
              transform: rotate(-30deg);
            }
          }
        `}</style>
      </section>

      {/* Education & Experience Section - Horizontal Scroll */}
      <section 
        id="education" 
        ref={journeySectionRef}
        className="py-12 bg-[#041320] relative overflow-hidden"
      >
        {/* Clean background */}
        <AnimatedGradient
          colors={["#041320", "#0a1f32", "#041320"]}
          className="z-0 opacity-60"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              My <span className="text-[#00abf0]">Journey</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#00abf0] mx-auto mt-2"></div>
          </motion.div>

          {/* Horizontal Scrolling Container - Centered */}
          <div className="relative overflow-visible">
            {/* Timeline line removed */}
            
            <div 
              ref={journeyContainerRef}
              className="flex gap-8 w-max mx-auto justify-center relative z-10"
              style={{ willChange: "transform" }}
            >
              {/* Combined Education and Experience Items */}
              {[
              {
                type: "education",
                icon: BookOpen,
                period: "2021 - Present",
                title: "Computer Science - University",
                description:
                  "Studying advanced programming concepts, algorithms, and artificial intelligence with a focus on practical applications.",
              },
              {
                type: "experience",
                icon: Briefcase,
                period: "2023 - Present",
                title: "Developer - GKK (Global Kwik Koders)",
                description:
                  "Working on full stack web applications and AI integrations, developing solutions for clients across various industries.",
              },
              {
                type: "education",
                icon: BookOpen,
                period: "2019 - 2021",
                title: "Web Development Bootcamp",
                description:
                  "Intensive training in modern web technologies including React, Node.js, and database management.",
              },
              {
                type: "experience",
                icon: Briefcase,
                period: "2021 - 2023",
                title: "Frontend Developer - Tech Solutions",
                description:
                  "Developed responsive user interfaces and implemented interactive features for web applications.",
              },
              {
                type: "education",
                icon: BookOpen,
                period: "2018 - 2019",
                title: "Self-taught Programming",
                description:
                  "Started learning programming fundamentals through online courses and personal projects.",
              },
              {
                type: "experience",
                icon: Briefcase,
                period: "2020 - 2021",
                title: "Freelance Web Developer",
                description:
                  "Created websites and web applications for small businesses and startups.",
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={`journey-${index}`}
                  className="w-[90vw] max-w-[400px] flex-shrink-0 journey-item relative"
                  style={{ willChange: "transform" }}
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#00abf0]/30 transition-all duration-500 group p-8 h-full flex flex-col journey-card relative z-10 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00abf0]/10">
                      {/* Type badge */}
                      <div className="flex items-center gap-2 mb-6 journey-badge">
                        <div className="p-2 rounded-lg bg-[#00abf0]/10 text-[#00abf0] group-hover:bg-[#00abf0] group-hover:text-white transition-colors duration-300">
                          <IconComponent size={20} />
                        </div>
                        <span className="text-xs font-bold text-[#00abf0] uppercase tracking-widest group-hover:text-white/80 transition-colors">
                          {item.type}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="journey-text text-gray-400 text-sm font-medium mb-2 journey-period flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00abf0]"></span>
                        {item.period}
                      </div>
                      <h4 className="journey-text text-2xl font-bold mb-4 text-white group-hover:text-[#00abf0] transition-colors journey-title">
                        {item.title}
                      </h4>
                      <p className="journey-text text-sm text-gray-400 leading-relaxed journey-description group-hover:text-gray-300 transition-colors">
                        {item.description}
                      </p>
                    </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 relative bg-[#081b29] scroll-smooth">
        {/* Clean background */}
        <AnimatedGradient
          colors={["#081b29", "#0a1f32", "#081b29"]}
          className="z-0 opacity-60"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              My <span className="text-[#00abf0]">Skills</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#00abf0] mx-auto mt-2"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Code size={18} className="text-[#00abf0]" />
                <span className="text-[#00abf0]">
                  Coding Skills
                </span>
              </h3>

              {/* Skill bars with enhanced animations */}
              {[
                { name: "HTML/CSS", percentage: 90, icon: "" },
                {
                  name: "JavaScript/TypeScript",
                  percentage: 85,
                  icon: "/icons/typescript.svg",
                },
                {
                  name: "React/Next.js",
                  percentage: 88,
                  icon: "/icons/react.svg",
                },
                {
                  name: "Node.js/Express",
                  percentage: 82,
                  icon: "/icons/node.svg",
                },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="mb-4"
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium flex items-center gap-2">
                      {skill.icon && (
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          width={14}
                          height={14}
                          className="opacity-80"
                        />
                      )}
                      {skill.name}
                    </span>
                    <span className="text-xs text-[#00abf0]">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-[#072136] rounded-full h-1.5 overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                      className="h-1.5 rounded-full bg-gradient-to-r from-[#00abf0] to-[#0077b6] relative"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Briefcase size={18} className="text-[#00abf0]" />
                <span className="text-[#00abf0]">
                  Professional Skills
                </span>
              </h3>

              {/* Skill bars */}
              {[
                {
                  name: "AI Integration",
                  percentage: 85,
                  icon: "/icons/ai.svg",
                },
                { name: "Full Stack Development", percentage: 90, icon: "" },
                { name: "UI/UX Design", percentage: 80, icon: "" },
                { name: "DevOps/Deployment", percentage: 75, icon: "" },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="mb-4"
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium flex items-center gap-2">
                      {skill.icon && (
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          width={14}
                          height={14}
                          className="opacity-80"
                        />
                      )}
                      {skill.name}
                    </span>
                    <span className="text-xs text-[#00abf0]">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-[#072136] rounded-full h-1.5 overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                      className="h-1.5 rounded-full bg-gradient-to-r from-[#00abf0] to-[#0077b6] relative"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Horizontal Scroll */}
      <section 
        id="projects" 
        ref={projectsSectionRef}
        className="py-12 relative overflow-hidden"
      >
        {/* Background with stars and rain */}
        <AnimatedGradient
          colors={["#081b29", "#0a2942", "#081b29", "#072136"]}
          className="z-0 opacity-80"
        />
        <Starfield starCount={50} speed={0.3} />
        <GalaxyAnimation starCount={25} galaxyCount={2} />
        <RainAnimation density={15} color="rgba(0,171,240,0.4)" scrollTrigger={true} />

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
              My <span className="text-[#00abf0]">Projects</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#00abf0] mx-auto mt-2"></div>
            <p className="text-gray-300 mt-2 max-w-2xl mx-auto text-sm drop-shadow-md">
              Explore some of my recent work showcasing my skills in web
              development, AI integration, and user experience design.
            </p>
          </motion.div>

          {/* Horizontal Scrolling Container */}
          <div 
            ref={projectsContainerRef}
            className="flex gap-4 w-max"
            style={{ willChange: "transform" }}
          >
            {[
              {
                title: "MeetAI Platform",
                description:
                  "AI-powered meeting transcription and analysis tool",
                image: "/projects/meet-ai.jpg",
                link: "/projects",
                tags: ["React", "AI", "WebRTC"],
                color: "from-blue-500/20 to-purple-600/20",
              },
              {
                title: "Plant Identifier",
                description: "Computer vision app to identify plant species",
                image: "/projects/plant-identify.png",
                link: "/projects",
                tags: ["TensorFlow", "React", "Computer Vision"],
                color: "from-green-500/20 to-emerald-600/20",
              },
              {
                title: "Modern Login UI",
                description: "Beautiful login interface with animations",
                image: "/projects/best-login-design.png",
                link: "/projects",
                tags: ["React", "Tailwind CSS", "Authentication"],
                color: "from-orange-500/20 to-red-600/20",
              },
              {
                title: "E-Commerce Platform",
                description: "Full-stack e-commerce solution with payment integration",
                image: "/projects/meet-ai.jpg",
                link: "/projects",
                tags: ["Next.js", "Stripe", "MongoDB"],
                color: "from-purple-500/20 to-pink-600/20",
              },
              {
                title: "Task Management App",
                description: "Collaborative task management with real-time updates",
                image: "/projects/plant-identify.png",
                link: "/projects",
                tags: ["React", "Socket.io", "PostgreSQL"],
                color: "from-cyan-500/20 to-blue-600/20",
              },
              {
                title: "Weather Dashboard",
                description: "Real-time weather data visualization and forecasts",
                image: "/projects/best-login-design.png",
                link: "/projects",
                tags: ["React", "API Integration", "Charts"],
                color: "from-yellow-500/20 to-orange-600/20",
              },
              {
                title: "Social Media Analytics",
                description: "Analytics dashboard for social media metrics",
                image: "/projects/meet-ai.jpg",
                link: "/projects",
                tags: ["React", "GraphQL", "D3.js"],
                color: "from-indigo-500/20 to-purple-600/20",
              },
              {
                title: "Fitness Tracker",
                description: "Mobile-first fitness tracking with progress visualization",
                image: "/projects/plant-identify.png",
                link: "/projects",
                tags: ["React Native", "Firebase", "Charts"],
                color: "from-red-500/20 to-pink-600/20",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="w-[75vw] max-w-[320px] flex-shrink-0"
                style={{ willChange: "transform" }}
              >
                <div className="rounded-2xl overflow-hidden border border-white/10 hover:border-[#00abf0]/50 transition-all duration-500 h-full backdrop-blur-xl relative group hover:shadow-2xl hover:shadow-[#00abf0]/20 bg-[#0a1f32] hover:-translate-y-2">
                  <div className="relative h-full min-h-[400px] flex flex-col">
                    {/* Background with image and overlay */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-[#081b29] via-[#081b29]/80 to-transparent opacity-90`}
                      ></div>
                      
                      {/* Animated particles */}
                      <div className="absolute inset-0 overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/40 rounded-full"
                            initial={{
                              x: Math.random() * 100 + "%",
                              y: Math.random() * 100 + "%",
                              opacity: Math.random() * 0.5 + 0.3,
                            }}
                            animate={{
                              y: [
                                Math.random() * 100 + "%",
                                Math.random() * 100 + "%",
                              ],
                              opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                              duration: Math.random() * 10 + 10,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Project details */}
                    <div className="p-8 relative z-10 h-full flex flex-col justify-end">
                      <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                        <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-bold px-2 py-1 rounded bg-[#00abf0] text-white tracking-wider uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#00abf0] transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-sm text-gray-300 mb-6 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                          {project.description}
                        </p>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setIsLoginDialogOpen(true);
                          }}
                          className="inline-flex items-center gap-2 text-sm font-bold text-[#00abf0] hover:text-white transition-colors group/btn"
                        >
                          View Project <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex justify-center"
          >
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("projects");
              }}
              className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-[#00abf0] to-[#0077b6] text-white px-8 py-3 rounded-full border-2 border-[#00abf0]/50 hover:border-[#00abf0] transition-all hover:shadow-lg hover:shadow-[#00abf0]/40 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(0,171,240,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects <ExternalLink size={16} />
            </motion.button>
          </motion.div>

          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-20 -left-20 w-40 h-40 rounded-full bg-[#00abf0]/5 blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          ></motion.div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-[#041320] relative scroll-smooth">
        {/* Clean background */}
        <AnimatedGradient
          colors={["#041320", "#0a1f32", "#041320"]}
          className="z-0 opacity-60"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              Contact <span className="text-[#00abf0]">Me!</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#00abf0] mx-auto mt-2"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setFormStatus({ ...formStatus, loading: true, error: null });

                try {
                  const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                  });

                  const data = await response.json();

                  if (!response.ok) {
                    throw new Error(data.error || "Failed to send message");
                  }

                  setFormStatus({ loading: false, success: true, error: null });
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                  });

                  // Reset success message after 5 seconds
                  setTimeout(() => {
                    setFormStatus((prev) => ({ ...prev, success: false }));
                  }, 5000);
                } catch (error) {
                  setFormStatus({
                    loading: false,
                    success: false,
                    error:
                      error instanceof Error
                        ? error.message
                        : "Failed to send message",
                  });
                }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full bg-[#072136] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors backdrop-blur-sm"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full bg-[#072136] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors backdrop-blur-sm"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="w-full bg-[#072136] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors backdrop-blur-sm"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <input
                    type="text"
                    placeholder="Email Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="w-full bg-[#072136] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors backdrop-blur-sm"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="w-full bg-[#072136] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors resize-none backdrop-blur-sm"
                ></textarea>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col items-center gap-3"
              >
                <motion.button
                  type="submit"
                  disabled={formStatus.loading}
                  className="bg-gradient-to-r from-[#00abf0] to-[#0077b6] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 hover:shadow-lg hover:shadow-[#00abf0]/20 hover:scale-105"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(0,171,240,0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {formStatus.loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <RefreshCw size={14} />
                      </motion.div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Send size={14} />
                      </motion.div>
                      <span>Submit</span>
                    </>
                  )}
                </motion.button>

                {/* Success/Error Messages */}
                <AnimatePresence>
                  {formStatus.success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-green-400 flex items-center gap-2 text-sm"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ThumbsUp size={14} />
                      </motion.div>
                      Message sent successfully!
                    </motion.div>
                  )}
                  {formStatus.error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 flex items-center gap-2 text-sm"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <X size={14} />
                      </motion.div>
                      {formStatus.error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </form>
          </div>

          {/* Animated decorative elements */}
          <motion.div
            className="absolute top-20 -left-20 w-40 h-40 rounded-full bg-[#00abf0]/5 blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          ></motion.div>

          <motion.div
            className="absolute bottom-20 -right-20 w-60 h-60 rounded-full bg-[#00abf0]/10 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          ></motion.div>
        </div>
      </section>

      {/* Footer with enhanced styling */}
      <footer className="bg-[#081b29] py-6 border-t border-[#00abf0]/20 relative overflow-hidden">
        {/* Digital circuit background */}
        <div className="absolute inset-0 opacity-10">
          <DigitalCircuit color="#00abf0" speed={15} lineWidth={0.5} />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.p
            className="text-gray-400 text-sm"
            animate={{
              textShadow: [
                "0 0 3px rgba(0,171,240,0)",
                "0 0 5px rgba(0,171,240,0.3)",
                "0 0 3px rgba(0,171,240,0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            © {new Date().getFullYear()} by Gloire | All Rights Reserved
          </motion.p>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-[#00abf0] hover:bg-[#0096c7] text-white p-2.5 rounded-full shadow-lg transition-all hover:shadow-[#00abf0]/20 hover:scale-110"
            >
              <ArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>
        <div className="z-50">
          <ChatBot />
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialSubject={contactSubject}
      />

      {/* Login Dialog */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 overflow-hidden border-0 rounded-none sm:rounded-none">
          <LoginPage onClose={() => setIsLoginDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* About Section - Keep your enhanced version */}
      {/* ... existing About section code ... */}
    </div>
  );
};

export default Portfolio;
