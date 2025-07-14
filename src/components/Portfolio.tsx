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
            {["home", "about", "education", "skills", "contact"].map((item) => (
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
                {["home", "about", "education", "skills", "contact"].map(
                  (item) => (
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
                  )
                )}
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
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00abf0]/5 via-transparent to-transparent z-0"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 z-0"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00abf0] rounded-full"
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

        {/* Floating tech icons */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[
            { icon: "/icons/react.svg", top: "15%", left: "10%", size: 30 },
            { icon: "/icons/node.svg", top: "25%", left: "85%", size: 24 },
            {
              icon: "/icons/typescript.svg",
              top: "65%",
              left: "15%",
              size: 28,
            },
            { icon: "/icons/ai.svg", top: "75%", left: "80%", size: 32 },
            { icon: "/icons/nextjs.svg", top: "35%", left: "75%", size: 26 },
          ].map((tech, index) => (
            <motion.div
              key={index}
              className="absolute opacity-20"
              style={{
                top: tech.top,
                left: tech.left,
                width: tech.size,
                height: tech.size,
              }}
              animate={{
                y: [0, -10, 0, 10, 0],
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              <Image
                src={tech.icon}
                alt="Tech Icon"
                width={tech.size}
                height={tech.size}
                className="opacity-70"
              />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="w-full md:w-1/2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-[#00abf0]/10 px-3 py-1 rounded-full mb-2">
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
              Hi, I'm <span className="text-[#00abf0]">Gloire</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3"
            >
              <h2 className="text-xl md:text-2xl font-medium text-gray-300">
                <span className="text-[#00abf0]">Full Stack Developer</span> &{" "}
                <span className="text-[#00abf0]">AI Engineer</span>
              </h2>
              <p className="text-gray-400 max-w-lg text-sm md:text-base">
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
                <span
                  key={index}
                  className="bg-[#0a1f32] text-xs px-3 py-1 rounded-full border border-[#00abf0]/20 text-gray-300 flex items-center gap-1.5 hover:border-[#00abf0]/50 transition-colors"
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
                </span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <button
                onClick={handleHireMeClick}
                className="bg-gradient-to-r from-[#00abf0] to-[#0077b6] text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-[#00abf0]/20 hover:scale-105"
              >
                Hire Me
              </button>
              <button
                onClick={handleLetsTalkClick}
                className="border border-[#00abf0] text-[#00abf0] px-5 py-2 rounded-full text-sm font-medium transition-all hover:bg-[#00abf0]/10"
              >
                Let's Talk
              </button>
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
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0a1f32] p-2 rounded-full hover:bg-[#00abf0]/10 transition-all group"
                >
                  <social.icon
                    size={18}
                    className="text-gray-400 group-hover:text-[#00abf0]"
                  />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative">
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-[#00abf0]/30"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-[#00abf0]/30"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />

              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 overflow-hidden rounded-full border-4 border-[#00abf0] p-2 group">
                {/* Blue stripes overlay effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#00abf0]/40 transform -translate-x-4"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#00abf0]/40 transform translate-x-2"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#00abf0]/40 transform translate-x-6"></div>
                </div>

                {/* Profile image with hover effect */}
                <div className="rounded-full overflow-hidden w-full h-full relative z-10">
                  <Image
                    src="/gmz.png"
                    alt="Gloire"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00abf0]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-2 -right-2 bg-[#081b29] border border-[#00abf0] rounded-lg py-1.5 px-3 shadow-lg"
              >
                <p className="text-xs text-gray-400">Full Stack & AI</p>
                <p className="text-sm font-bold text-[#00abf0]">Developer</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#00abf0]/10 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#00abf0]/10 to-transparent rounded-full filter blur-3xl"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-0 opacity-30">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00abf0] rounded-full"
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
              className="w-full md:w-1/5"
            >
              <div className="relative group">
                {/* Main image with enhanced border effect */}
                <div className="relative overflow-hidden rounded-xl border-2 border-[#00abf0]/70 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#00abf0]/20 group-hover:scale-[1.02]">
                  <div className="aspect-w-4 aspect-h-5 relative">
                    <Image
                      src="/gmz.png"
                      alt="Gloire"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Walking animation overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081b29]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="walking-animation">
                        <div className="walking-figure">
                          <div className="head"></div>
                          <div className="body"></div>
                          <div className="leg left"></div>
                          <div className="leg right"></div>
                          <div className="arm left"></div>
                          <div className="arm right"></div>
                        </div>
                      </div>
                      <p className="text-white text-sm font-medium">
                        My Journey
                      </p>
                    </div>
                  </div>

                  {/* Glowing border effect */}
                  <div className="absolute inset-0 border border-[#00abf0]/10 rounded-xl"></div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-[#00abf0] rounded-br-lg z-[-1]"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                ></motion.div>
                <motion.div
                  className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#00abf0] rounded-tl-lg z-[-1]"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                ></motion.div>

                {/* Experience badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute -bottom-4 -right-4 bg-[#081b29] border border-[#00abf0] rounded-lg py-1.5 px-3 shadow-lg"
                >
                  <p className="text-xs text-gray-400">Experience</p>
                  <p className="text-sm font-bold text-[#00abf0]">3+ Years</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-4/5"
            >
              <div className="bg-[#0a1f32]/50 p-6 rounded-xl border border-[#00abf0]/10 backdrop-blur-sm hover:shadow-lg hover:shadow-[#00abf0]/5 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Code size={20} className="text-[#00abf0]" />
                  <span className="text-[#00abf0]">Full Stack</span> Developer &
                  AI Engineer
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
                      className="flex items-center gap-3 bg-[#081b29]/70 p-3 rounded-lg border border-[#00abf0]/20 hover:border-[#00abf0]/40 transition-all group"
                    >
                      <item.icon
                        size={16}
                        className="text-[#00abf0] group-hover:scale-110 transition-transform"
                      />
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
                  <button
                    onClick={handleDownloadCV}
                    className="mt-6 bg-gradient-to-r from-[#00abf0] to-[#0077b6] text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-[#00abf0]/20 hover:scale-105 flex items-center gap-2"
                  >
                    <span>Download CV</span>
                    <Download size={14} />
                  </button>
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
          }

          .body {
            position: absolute;
            top: 15px;
            left: 50%;
            transform: translateX(-50%);
            width: 3px;
            height: 20px;
            background: #00abf0;
          }

          .arm {
            position: absolute;
            top: 18px;
            width: 2px;
            height: 15px;
            background: #00abf0;
            transform-origin: top;
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
        <div className="container mx-auto px-6">
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
                Education
              </h3>

              <div className="space-y-6 relative">
                {/* Timeline line */}
                <div className="absolute left-2.5 top-1 bottom-0 w-0.5 bg-[#00abf0]/20"></div>

                {/* Timeline items */}
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={`education-${item}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: item * 0.1 }}
                    className="relative pl-8"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 border-[#00abf0] bg-[#081b29]"></div>

                    <div className="bg-[#072136] p-4 rounded-lg border border-[#00abf0]/20 hover:border-[#00abf0]/50 transition-all group">
                      <div className="text-[#00abf0] text-xs font-medium mb-1">
                        2021 - Present
                      </div>
                      <h4 className="text-sm font-bold mb-1 group-hover:text-[#00abf0] transition-colors">
                        Computer Science - University
                      </h4>
                      <p className="text-xs text-gray-400">
                        Studying advanced programming concepts, algorithms, and
                        artificial intelligence with a focus on practical
                        applications.
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Briefcase size={18} className="text-[#00abf0]" />
                Experience
              </h3>

              <div className="space-y-6 relative">
                {/* Timeline line */}
                <div className="absolute left-2.5 top-1 bottom-0 w-0.5 bg-[#00abf0]/20"></div>

                {/* Timeline items */}
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={`experience-${item}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: item * 0.1 }}
                    className="relative pl-8"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 border-[#00abf0] bg-[#081b29]"></div>

                    <div className="bg-[#072136] p-4 rounded-lg border border-[#00abf0]/20 hover:border-[#00abf0]/50 transition-all group">
                      <div className="text-[#00abf0] text-xs font-medium mb-1">
                        2025 - Present
                      </div>
                      <h4 className="text-sm font-bold mb-1 group-hover:text-[#00abf0] transition-colors">
                        Developer - GKK (Global Kwik Koders)
                      </h4>
                      <p className="text-xs text-gray-400">
                        Working on full stack web applications and AI
                        integrations, developing solutions for clients across
                        various industries.
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 relative">
        <div className="container mx-auto px-6">
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
                Coding Skills
              </h3>

              {/* Skill bars */}
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <div className="w-full bg-[#072136] rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-1.5 rounded-full bg-gradient-to-r from-[#00abf0] to-[#0077b6]"
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Briefcase size={18} className="text-[#00abf0]" />
                Professional Skills
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <div className="w-full bg-[#072136] rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-1.5 rounded-full bg-gradient-to-r from-[#00abf0] to-[#0077b6]"
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-[#041320] relative">
        <div className="container mx-auto px-6">
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
                  transition={{ duration: 0.5 }}
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full bg-[#072136] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full bg-[#072136] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="w-full bg-[#072136] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <input
                    type="text"
                    placeholder="Email Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="w-full bg-[#072136] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="w-full bg-[#072136] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors resize-none"
                ></textarea>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col items-center gap-3"
              >
                <button
                  type="submit"
                  disabled={formStatus.loading}
                  className="bg-gradient-to-r from-[#00abf0] to-[#0077b6] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 hover:shadow-lg hover:shadow-[#00abf0]/20 hover:scale-105"
                >
                  {formStatus.loading ? (
                    <>
                      <RefreshCw className="animate-spin" size={14} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Submit
                    </>
                  )}
                </button>

                {/* Success/Error Messages */}
                <AnimatePresence>
                  {formStatus.success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-green-400 flex items-center gap-2 text-sm"
                    >
                      <ThumbsUp size={14} />
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
                      <X size={14} />
                      {formStatus.error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#081b29] py-6 border-t border-[#00abf0]/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} by Gloire | All Rights Reserved
          </p>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
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
        <ChatBot />
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialSubject={contactSubject}
      />

      {/* About Section - Keep your enhanced version */}
      {/* ... existing About section code ... */}
    </div>
  );
};

export default Portfolio;
