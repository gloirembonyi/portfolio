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
  CheckCircle,
  Folder,
  FolderKanban,
  Code2,
  BarChart,
  LineChart,
  Sun,
  Moon,
  BarChart2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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

// Simplified section variants with minimal animation
const sectionVariants = {
  hidden: {
    opacity: 0.9,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// Simplified card variants
const cardVariants = {
  initial: { opacity: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
};

// Simplified scroll reveal animation
const revealVariants = {
  hidden: {
    opacity: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// Reduce particle count and slow down animations
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 bg-center opacity-10"
        style={{
          backgroundImage: 'url("/grid.svg")',
          backgroundSize: "20px 20px",
          backgroundRepeat: "repeat",
        }}
      />
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-400 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.3 + 0.2,
            opacity: 0.2,
          }}
          animate={{
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Update the project interface/type to include the missing properties
interface Project {
  title: string;
  description: string;
  tags: string[];
  technologies?: string[];
  image?: string;
  link: string;
  github?: string;
  demo?: string;
  category?: string;
  stats: {
    stars: number;
    forks: number;
  };
}

// Add SkillCategory interface
interface SkillCategory {
  name: string;
  items: string[];
  icon?: React.ComponentType<{ size: number }>;
}

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

  // Add rotating titles for the header
  const developerTitles = [
    "Developer",
    "Engineer",
    "Innovator",
    "Problem Solver",
    "Tech Enthusiast",
  ];

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
      const steps = 30;
      const interval = duration / steps;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 2); // Quadratic easing

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

  // Update the projects array to match the Project interface
  const projects: Project[] = [
    {
      title: "AI-Powered Analytics Dashboard",
      description:
        "Real-time data visualization platform with machine learning insights",
      tags: ["React", "Python", "TensorFlow", "AWS"],
      technologies: ["React", "Python", "TensorFlow", "AWS"],
      image: "/project-1.jpg",
      link: "#",
      github: "https://github.com/yourusername/project1",
      demo: "https://demo.example.com/project1",
      category: "Web App",
      stats: {
        stars: 45,
        forks: 12,
      },
    },
    {
      title: "Blockchain Trading Platform",
      description: "Decentralized exchange with smart contract integration",
      tags: ["Solidity", "Web3.js", "Node.js", "MongoDB"],
      technologies: ["Solidity", "Web3.js", "Node.js", "MongoDB"],
      image: "/project-2.jpg",
      link: "#",
      github: "https://github.com/yourusername/project2",
      demo: "https://demo.example.com/project2",
      category: "DeFi",
      stats: {
        stars: 32,
        forks: 8,
      },
    },
    {
      title: "IoT Device Management System",
      description: "Cloud-based platform for managing IoT devices at scale",
      tags: ["React", "Node.js", "MQTT", "Azure"],
      technologies: ["React", "Node.js", "MQTT", "Azure"],
      image: "/project-3.jpg",
      link: "#",
      github: "https://github.com/yourusername/project3",
      demo: "https://demo.example.com/project3",
      category: "IoT",
      stats: {
        stars: 28,
        forks: 5,
      },
    },
  ];

  // Update skills array to use the interface
  const skills: SkillCategory[] = [
    {
      name: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      icon: Code,
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
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
        style={{ backgroundColor: "#432c74" }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.a
            href="#"
            className="text-xl font-bold flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="bg-[#8050e3] text-white p-2 rounded-lg">
              <Code size={20} />
            </span>
            <span className="text-white">Gloire Develope</span>
          </motion.a>

          <div className="hidden md:flex items-center space-x-6">
            {["home", "about", "projects", "skills", "contact"].map(
              (section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className={`nav-item ${
                    activeSection === section
                      ? "nav-item-active"
                      : "text-white hover:text-indigo-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section}
                </motion.a>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-400 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Enhanced Parallax and Particles */}
      <motion.section
        id="home"
        initial="hidden"
        animate={visibleSection === "home" ? "visible" : "hidden"}
        variants={sectionVariants}
        className="relative pt-28 pb-16 px-4 bg-[#432c74] text-white min-h-screen flex items-center"
      >
        <ParticleBackground />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Developer<span className="text-indigo-400">|</span>
            </h1>
              <p className="text-xl text-gray-200 mb-8">
                I create elegant, high-performance web applications with modern
                technologies. Let's build something amazing together.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="primary-button"
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="secondary-button"
                >
                  Contact Me
                </motion.a>
              </div>
            </motion.div>

                <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glassmorphic p-8 rounded-3xl"
            >
              <div className="grid grid-cols-3 gap-6">
                {[
                  {
                    name: "Assets",
                    icon: Folder,
                    className: "icon-button-assets",
                  },
                  {
                    name: "Projects",
                    icon: LineChart,
                    className: "icon-button-projects",
                  },
                  {
                    name: "Skills",
                    icon: Code,
                    className: "icon-button-skills",
                  },
                  {
                    name: "Record",
                    icon: BarChart,
                    className: "icon-button-record",
                  },
                  {
                    name: "Results",
                    icon: BarChart2,
                    className: "icon-button-results",
                  },
                  {
                    name: "Contact",
                    icon: Mail,
                    className: "icon-button-contact",
                  },
                ].map((item, index) => (
                  <motion.a
                  key={index}
                    href={`#${item.name.toLowerCase()}`}
                    className="flex flex-col items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  >
                    <div className={`icon-button ${item.className}`}>
                      <item.icon size={24} className="text-white" />
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">My Docs</h3>
                  <span className="text-xs text-gray-300">40 GB free</span>
                </div>
                <div className="w-full h-2 bg-purple-600/30 rounded-full overflow-hidden">
                      <motion.div
                    className="h-full bg-[#8050e3]"
                    initial={{ width: "0%" }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                </div>
              </div>
                      </motion.div>
            </div>

          {/* Stats section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { key: "projects", value: 15, label: "Projects" },
              { key: "experience", value: "5+", label: "Experience" },
              { key: "coffee", value: 1482, label: "Cups Of Coffee" },
              { key: "commits", value: 3267, label: "Commits" },
            ].map((stat, index) => (
              <motion.div
                key={stat.key}
                whileHover={{ y: -5, scale: 1.05 }}
                className="stats-card"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-3xl font-bold text-gray-800 mb-1"
                >
                  {stat.value}
            </motion.div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-white/70" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-16 px-4 bg-white relative z-10"
      >
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
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium mb-3">
                PORTFOLIO
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Explore my latest work and see how I solve complex problems with
                clean, efficient code.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="glassmorphic-card h-full flex flex-col overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image || "/project-1.jpg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                      </h3>
                      <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                        {project.category || "Web App"}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies?.map((tech, i) => (
                      <span
                            key={i}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
                      >
                            {tech}
                      </span>
                    ))}
                  </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                        <a
                          href={project.link || "#"}
                          className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
                        >
                          View Project
                        </a>
                        <div className="flex gap-2">
                          <a
                            href={project.github || "#"}
                            className="icon-button bg-gradient-to-r from-gray-700 to-gray-900 text-white w-8 h-8"
                          >
                            <Github size={14} />
                          </a>
                          <a
                            href={project.demo || "#"}
                            className="icon-button bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-8 h-8"
                          >
                            <ExternalLink size={14} />
                          </a>
                  </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glassmorphic-button inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 font-medium"
            >
              <Github size={18} />
              See More on GitHub
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium mb-3">
                EXPERTISE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Skills & Technologies
          </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                I specialize in building modern web applications with these
                technologies.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 h-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center gap-3">
                      {category.icon && (
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                          <category.icon size={20} />
                        </div>
                      )}
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </CardTitle>
                    </div>
                </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {category.items.map((skill, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle size={16} className="text-green-500" />
                          <span className="text-gray-700 dark:text-gray-300">
                        {skill}
                          </span>
                        </motion.li>
                    ))}
                    </ul>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

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
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-purple-900 text-purple-300 rounded-full text-sm font-medium mb-3">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Work Together
          </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Have a project in mind or want to discuss opportunities? I'd
                love to hear from you.
              </p>
            </motion.div>
          </div>

          <Card className="bg-gray-800 border-none max-w-2xl mx-auto transition-shadow duration-200 hover:shadow-xl rounded-xl overflow-hidden border border-gray-700">
            <CardContent className="p-8">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                  <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="How can I help you?"
                  />
                  </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.a
              href="mailto:your@email.com" // Replace with your email
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-indigo-500 transition-all"
            >
              <div className="p-3 rounded-full bg-indigo-900/50 mb-4">
                <Mail size={24} className="text-indigo-400" />
        </div>
              <h3 className="text-lg font-medium mb-1">Email</h3>
              <p className="text-gray-400 text-sm text-center">
                your@email.com
              </p>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/yourusername" // Replace with your LinkedIn
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-indigo-500 transition-all"
            >
              <div className="p-3 rounded-full bg-indigo-900/50 mb-4">
                <Linkedin size={24} className="text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">LinkedIn</h3>
              <p className="text-gray-400 text-sm text-center">
                Connect with me
              </p>
            </motion.a>

            <motion.a
              href="https://github.com/yourusername" // Replace with your GitHub
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-indigo-500 transition-all"
            >
              <div className="p-3 rounded-full bg-indigo-900/50 mb-4">
                <Github size={24} className="text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">GitHub</h3>
              <p className="text-gray-400 text-sm text-center">
                Check out my code
              </p>
            </motion.a>
          </div>
        </div>
      </motion.section>

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

      {/* ChatBot - Updated positioning */}
      <div className="fixed bottom-4 right-4 z-50">
      <ChatBot />
      </div>

      {/* Enhanced Scroll to Top Button - Adjusted position */}
      <AnimatePresence>
        {scrollProgress > 20 && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-4 p-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full shadow-lg z-50"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
