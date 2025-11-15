"use client";

import React, { useState, useEffect } from "react";
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
    <div className="bg-[#081b29] text-white min-h-screen overflow-x-hidden">
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
        className="min-h-screen flex items-center pt-16 pb-10 relative overflow-hidden"
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
        <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="w-full md:w-1/2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-[#00abf0]/10 px-3 py-1 rounded-full mb-2 backdrop-blur-sm border border-[#00abf0]/20">
                <span className="text-[#00abf0] font-medium text-sm">
                  3+ Years of Experience
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
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
              className="space-y-3"
            >
              <h2 className="text-xl md:text-2xl font-medium text-gray-300">
                <span className="text-[#00abf0]">
                  Full Stack Developer
                </span>{" "}
                &{" "}
                <span className="text-[#00abf0]">
                  AI Engineer
                </span>
              </h2>
              <p className="text-gray-400 max-w-lg text-sm md:text-base backdrop-blur-sm bg-[#081b29]/30 p-3 rounded-lg border border-[#00abf0]/10">
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
              className="flex flex-wrap gap-2 pt-2"
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
              className="flex flex-wrap gap-3 pt-2"
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
              className="flex space-x-3 pt-4"
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
      <section id="about" className="py-16 relative overflow-hidden bg-[#081b29]">
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
            className="mb-16 text-center"
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

      {/* Education & Experience Section */}
      <section id="education" className="py-16 bg-[#041320] relative">
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
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold">
              My <span className="text-[#00abf0]">Journey</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#00abf0] mx-auto mt-3"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <BookOpen size={18} className="text-[#00abf0]" />
                <span className="text-[#00abf0]">
                  Education
                </span>
              </h3>

              <div className="space-y-6 relative">
                {/* Timeline line */}
                <div className="absolute left-2.5 top-1 bottom-0 w-0.5 bg-[#00abf0]/20"></div>

                {/* Timeline items */}
                {[
                  {
                    period: "2021 - Present",
                    title: "Computer Science - University",
                    description:
                      "Studying advanced programming concepts, algorithms, and artificial intelligence with a focus on practical applications.",
                  },
                  {
                    period: "2019 - 2021",
                    title: "Web Development Bootcamp",
                    description:
                      "Intensive training in modern web technologies including React, Node.js, and database management.",
                  },
                  {
                    period: "2018 - 2019",
                    title: "Self-taught Programming",
                    description:
                      "Started learning programming fundamentals through online courses and personal projects.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={`education-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative pl-8"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 border-[#00abf0] bg-[#081b29]"></div>

                    <motion.div
                      whileHover={{
                        y: -2,
                        borderColor: "rgba(0,171,240,0.4)",
                      }}
                      className="bg-[#0a1f32]/30 backdrop-blur-sm rounded-lg border border-[#00abf0]/20 hover:border-[#00abf0]/40 transition-all group"
                    >
                      <div className="p-4 relative">
                        <div className="text-[#00abf0] text-xs font-medium mb-1">
                          {item.period}
                        </div>
                        <h4 className="text-sm font-bold mb-1 group-hover:text-[#00abf0] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Briefcase size={18} className="text-[#00abf0]" />
                <span className="text-[#00abf0]">
                  Experience
                </span>
              </h3>

              <div className="space-y-6 relative">
                {/* Timeline line */}
                <div className="absolute left-2.5 top-1 bottom-0 w-0.5 bg-[#00abf0]/20"></div>

                {/* Timeline items */}
                {[
                  {
                    period: "2023 - Present",
                    title: "Developer - GKK (Global Kwik Koders)",
                    description:
                      "Working on full stack web applications and AI integrations, developing solutions for clients across various industries.",
                  },
                  {
                    period: "2021 - 2023",
                    title: "Frontend Developer - Tech Solutions",
                    description:
                      "Developed responsive user interfaces and implemented interactive features for web applications.",
                  },
                  {
                    period: "2020 - 2021",
                    title: "Freelance Web Developer",
                    description:
                      "Created websites and web applications for small businesses and startups.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={`experience-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative pl-8"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 border-[#00abf0] bg-[#081b29]"></div>

                    <motion.div
                      whileHover={{
                        y: -2,
                        borderColor: "rgba(0,171,240,0.4)",
                      }}
                      className="bg-[#0a1f32]/30 backdrop-blur-sm rounded-lg border border-[#00abf0]/20 hover:border-[#00abf0]/40 transition-all group"
                    >
                      <div className="p-4 relative">
                        <div className="text-[#00abf0] text-xs font-medium mb-1">
                          {item.period}
                        </div>
                        <h4 className="text-sm font-bold mb-1 group-hover:text-[#00abf0] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 relative bg-[#081b29]">
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
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold">
              My <span className="text-[#00abf0]">Skills</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#00abf0] mx-auto mt-3"></div>
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

      {/* Projects Section */}
      <section id="projects" className="py-16 relative">
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
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold">
              My <span className="text-[#00abf0]">Projects</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#00abf0] mx-auto mt-3"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Explore some of my recent work showcasing my skills in web
              development, AI integration, and user experience design.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 30px -15px rgba(0,171,240,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-xl overflow-hidden border border-[#00abf0]/20 hover:border-[#00abf0]/50 transition-all duration-300 h-full backdrop-blur-sm relative"
                >
                  <div className="relative group h-full">
                    {/* Background with image and overlay */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-40"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-multiply`}
                      ></div>
                      <div className="absolute inset-0 bg-[#081b29]/70"></div>

                      {/* Animated particles */}
                      <div className="absolute inset-0 overflow-hidden">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#00abf0]/40 rounded-full"
                            initial={{
                              x: Math.random() * 100 + "%",
                              y: Math.random() * 100 + "%",
                              opacity: Math.random() * 0.5 + 0.3,
                            }}
                            animate={{
                              x: [
                                Math.random() * 100 + "%",
                                Math.random() * 100 + "%",
                                Math.random() * 100 + "%",
                              ],
                              y: [
                                Math.random() * 100 + "%",
                                Math.random() * 100 + "%",
                                Math.random() * 100 + "%",
                              ],
                            }}
                            transition={{
                              duration: Math.random() * 20 + 10,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        ))}
                      </div>

                      {/* Animated lines */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00abf0]/50 to-transparent"></div>
                        <div className="absolute top-[80%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00abf0]/30 to-transparent"></div>
                        <div className="absolute bottom-0 top-0 left-[20%] w-px bg-gradient-to-b from-transparent via-[#00abf0]/50 to-transparent"></div>
                        <div className="absolute bottom-0 top-0 left-[80%] w-px bg-gradient-to-b from-transparent via-[#00abf0]/30 to-transparent"></div>
                      </div>
                    </div>

                    {/* Project details */}
                    <div className="p-6 relative z-10 h-full flex flex-col">
                      <motion.h3
                        className="text-xl font-bold mb-2 text-white group-hover:text-[#00abf0] transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-sm text-gray-300 mb-4">
                        {project.description}
                      </p>

                      {/* Tags with enhanced styling */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.map((tag, i) => (
                          <motion.span
                            key={i}
                            whileHover={{
                              y: -3,
                              x: 2,
                              backgroundColor: "rgba(0,171,240,0.3)",
                            }}
                            className="text-xs px-2 py-1 rounded-full bg-[#00abf0]/10 text-[#00abf0] border border-[#00abf0]/20 backdrop-blur-sm"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {/* Link button with enhanced styling */}
                      <div className="mt-auto">
                        <motion.button
                          onClick={(e) => {
                            e.preventDefault();
                            setIsLoginDialogOpen(true);
                          }}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 15px rgba(0,171,240,0.5)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-[#00abf0] to-[#0077b6] px-4 py-2 rounded-full hover:shadow-lg hover:shadow-[#00abf0]/20"
                        >
                          View Details <ExternalLink size={14} />
                        </motion.button>
                      </div>

                      {/* Decorative corner elements */}
                      <motion.div
                        className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-[#00abf0]/40 opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{
                          opacity: [0, 1, 0],
                          transition: { duration: 2, repeat: Infinity },
                        }}
                      ></motion.div>
                      <motion.div
                        className="absolute top-2 left-2 w-8 h-8 border-t border-l border-[#00abf0]/40 opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{
                          opacity: [0, 1, 0],
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            delay: 1,
                          },
                        }}
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex justify-center"
          >
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                setIsLoginDialogOpen(true);
              }}
              className="flex items-center gap-2 text-sm font-medium bg-[#072136] text-white px-6 py-3 rounded-full border border-[#00abf0]/30 hover:border-[#00abf0] transition-all hover:shadow-lg hover:shadow-[#00abf0]/20"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(0,171,240,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects <ExternalLink size={14} />
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
      <section id="contact" className="py-16 bg-[#041320] relative">
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
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold">
              Contact <span className="text-[#00abf0]">Me!</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#00abf0] mx-auto mt-3"></div>
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
