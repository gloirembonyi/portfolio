"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  Code,
  BookOpen,
  Briefcase,
  Award,
  Terminal,
  Clock,
  User,
  Coffee,
  Heart,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChatBot from "./ChatBot";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced TypeWriter with rotating words
const TypeWriter = ({
  text,
  words = [],
}: {
  text: string;
  words?: string[];
}) => {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const tick = () => {
      const word = words.length > 0 ? words[wordIndex] : text;
      const updateText = isDeleting
        ? word.substring(0, displayText.length - 1)
        : word.substring(0, displayText.length + 1);

      setDisplayText(updateText);

      if (!isDeleting && updateText === word) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updateText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    timer = setTimeout(tick, isDeleting ? 100 : 150);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, text]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </motion.span>
  );
};

// Add particle effect component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-400 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.25,
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
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stats, setStats] = useState({
    projects: 0,
    experience: 0,
    coffee: 0,
    commits: 0,
  });
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [visibleSection, setVisibleSection] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Section visibility animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Card hover animation
  const cardVariants = {
    hover: { scale: 1.03, transition: { duration: 0.1 } },
    tap: { scale: 0.95 },
  };

  // Add rotating titles for the header
  const developerTitles = [
    "Developer",
    "Engineer",
    "Innovator",
    "Problem Solver",
    "Tech Enthusiast",
  ];

  // Add scroll reveal animation
  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Add hover effect for cards
  const cardHoverVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  // Animate stats on load with improved animation
  useEffect(() => {
    const animateStats = () => {
      const targetStats = {
        projects: 15,
        experience: 5,
        coffee: 1482,
        commits: 3267,
      };

      const duration = 2000;
      const steps = 50;
      const interval = duration / steps;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic easing

        setStats({
          projects: Math.floor(targetStats.projects * easeProgress),
          experience: Math.floor(targetStats.experience * easeProgress),
          coffee: Math.floor(targetStats.coffee * easeProgress),
          commits: Math.floor(targetStats.commits * easeProgress),
        });

        if (currentStep >= steps) clearInterval(timer);
      }, interval);
    };

    animateStats();
  }, []);

  // Enhanced scroll handling with intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id);
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Enhanced scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme toggle with animation
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark");
      return newTheme;
    });
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        // Open search or chat
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const projects = [
    {
      title: "AI-Powered Analytics Dashboard",
      description:
        "Real-time data visualization platform with machine learning insights",
      tags: ["React", "Python", "TensorFlow", "AWS"],
      image: "/projects/analytics.jpg",
      link: "#",
      github: "#",
      stats: {
        stars: 128,
        forks: 34,
      },
    },
    {
      title: "Blockchain Trading Platform",
      description: "Decentralized exchange with smart contract integration",
      tags: ["Solidity", "Web3.js", "Node.js", "MongoDB"],
      link: "#",
      stats: {
        stars: 89,
        forks: 23,
      },
    },
    {
      title: "IoT Device Management System",
      description: "Cloud-based platform for managing IoT devices at scale",
      tags: ["React", "Node.js", "MQTT", "Azure"],
      link: "#",
      stats: {
        stars: 156,
        forks: 45,
      },
    },
  ];

  const skills = [
    {
      name: "Frontend Development",
      items: ["React", "Vue.js", "TypeScript", "Tailwind CSS"],
    },
    {
      name: "Backend Development",
      items: ["Node.js", "Python", "Java", "PostgreSQL"],
    },
    { name: "DevOps & Cloud", items: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
    {
      name: "Other Skills",
      items: ["Machine Learning", "Blockchain", "IoT", "System Design"],
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Tech Lead at TechCorp",
      content:
        "One of the most talented developers I've worked with. Delivers exceptional results.",
    },
    {
      name: "Mike Chen",
      role: "CTO at StartupX",
      content:
        "Exceptional problem-solving skills and attention to detail. A great team player.",
    },
  ];

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      {/* Animated Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 z-50"
        initial={{ width: "0%" }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.2 }}
      />

      {/* Enhanced Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-gray-900/90 backdrop-blur-md dark:bg-gray-800/90 text-white p-4 fixed w-full z-40 shadow-lg"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.a
            href="#"
            className="text-xl font-bold flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Terminal className="mr-2 text-green-400" />
            <span className="bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
              Gloire <TypeWriter words={developerTitles} text="Developer" />
            </span>
          </motion.a>

          <button
            className="lg:hidden hover:text-green-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden lg:flex space-x-8">
            {["home", "about", "projects", "skills", "contact"].map(
              (section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`hover:text-green-400 transition-colors capitalize ${
                    activeSection === section
                      ? "text-green-400 border-b-2 border-green-400"
                      : ""
                  }`}
                >
                  {section}
                </a>
              )
            )}
          </div>

          {/* Add theme toggle and keyboard shortcuts */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <span className="text-sm text-gray-400">
              Press Ctrl + K to search
            </span>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-4 text-center animate-fadeIn">
            {["home", "about", "projects", "skills", "contact"].map(
              (section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`block py-2 hover:text-green-400 transition-colors capitalize ${
                    activeSection === section ? "text-green-400" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section}
                </a>
              )
            )}
          </div>
        )}
      </motion.nav>

      {/* Hero Section with Enhanced Parallax and Particles */}
      <motion.section
        id="home"
        initial="hidden"
        animate={visibleSection === "home" ? "visible" : "hidden"}
        variants={sectionVariants}
        className="relative pt-24 pb-12 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex items-center overflow-hidden"
      >
        <ParticleBackground />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Full Stack Developer
              <motion.span
                className="block mt-2 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 text-transparent bg-clip-text"
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Crafting Digital Excellence
              </motion.span>
            </h1>

            {/* Enhanced Stats Cards with 3D effect */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Briefcase, label: "Projects", value: stats.projects },
                { icon: Clock, label: "Years", value: stats.experience },
                { icon: Coffee, label: "Coffees", value: stats.coffee },
                { icon: Code, label: "Commits", value: stats.commits },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    rotateX: 10,
                    z: 50,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="transform perspective-1000"
                >
                  <Card className="bg-gray-800/50 backdrop-blur-md border-none hover:bg-gray-700/50 transition-all duration-300 transform-gpu">
                    <CardContent className="p-4 text-center">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <stat.icon className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      </motion.div>
                      <motion.h3
                        className="text-2xl font-bold text-white"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        {stat.value}+
                      </motion.h3>
                      <p className="text-gray-400">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Social Links with tooltips */}
            <motion.div
              className="flex justify-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                { icon: Github, link: "#", label: "GitHub" },
                { icon: Linkedin, link: "#", label: "LinkedIn" },
                { icon: Mail, link: "#", label: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                    color: "#4ade80",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-green-400 transition-all relative group"
                >
                  <social.icon size={24} />
                  <motion.span
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100"
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                  >
                    {social.label}
                  </motion.span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            About Me
          </h2>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Who am I?
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    A passionate full-stack developer with expertise in building
                    scalable web applications and solving complex problems. I
                    specialize in modern JavaScript frameworks, cloud
                    technologies, and creating exceptional user experiences.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    When I'm not coding, you'll find me contributing to
                    open-source projects, writing technical articles, and
                    mentoring aspiring developers.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Code, label: "Clean Code" },
                    { icon: BookOpen, label: "Continuous Learning" },
                    { icon: Award, label: "Best Practices" },
                    { icon: Heart, label: "Passionate" },
                  ].map((item, index) => (
                    <Card
                      key={index}
                      className="bg-gray-50 hover:bg-green-50 transition-colors"
                    >
                      <CardContent className="p-4 text-center">
                        <item.icon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="font-medium text-gray-800">
                          {item.label}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial="hidden"
        animate={visibleSection === "projects" ? "visible" : "hidden"}
        variants={sectionVariants}
        className="py-16 px-4 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center justify-between">
                    {project.title}
                    <a
                      href={project.link}
                      className="text-green-600 hover:text-green-800"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>⭐ {project.stats.stars} stars</span>
                    <span>🔄 {project.stats.forks} forks</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((category, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.items.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="bg-gray-50 p-2 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Testimonials
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="text-gray-700 italic mb-4">
                    "{testimonial.content}"
                  </div>
                  <div className="flex items-center">
                    <User className="w-10 h-10 text-green-500 mr-3" />
                    <div>
                      <div className="font-bold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Let's Work Together
          </h2>
          <Card className="bg-gray-800 border-none max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="grid gap-6">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-green-400" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <a
                      href="mailto:contact@example.com"
                      className="text-gray-300 hover:text-green-400 transition-colors"
                    >
                      contact@example.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Linkedin className="w-6 h-6 text-green-400" />
                  <div>
                    <h3 className="font-bold">LinkedIn</h3>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-green-400 transition-colors"
                    >
                      /in/johndeveloper
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Github className="w-6 h-6 text-green-400" />
                  <div>
                    <h3 className="font-bold">GitHub</h3>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-green-400 transition-colors"
                    >
                      @johndeveloper
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <a
                  href="mailto:contact@example.com"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Get In Touch <Mail size={20} className="ml-2" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="#about"
                  className="block hover:text-green-400 transition-colors"
                >
                  About
                </a>
                <a
                  href="#projects"
                  className="block hover:text-green-400 transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#skills"
                  className="block hover:text-green-400 transition-colors"
                >
                  Skills
                </a>
                <a
                  href="#contact"
                  className="block hover:text-green-400 transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Connect</h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block hover:text-green-400 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="block hover:text-green-400 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="block hover:text-green-400 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="block hover:text-green-400 transition-colors"
                >
                  Blog
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Latest Articles</h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block hover:text-green-400 transition-colors"
                >
                  Modern Web Development
                </a>
                <a
                  href="#"
                  className="block hover:text-green-400 transition-colors"
                >
                  Cloud Architecture
                </a>
                <a
                  href="#"
                  className="block hover:text-green-400 transition-colors"
                >
                  DevOps Best Practices
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>
              © {new Date().getFullYear()} John Developer. Built with React &
              Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>

      {/* ChatBot */}
      <ChatBot />

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {scrollProgress > 20 && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-20 right-4 p-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full shadow-lg"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
