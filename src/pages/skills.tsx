import React, { useState } from "react";
import {
  Code,
  Database,
  Cloud,
  Layout,
  Terminal,
  GitBranch,
  Server,
  Cpu,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBot from "../components/ChatBot";

const Skills: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Layout,
      description:
        "Building responsive and interactive user interfaces with modern frameworks and tools.",
      skills: [
        {
          name: "React.js",
          level: 90,
          description:
            "Component-based UI development, state management, hooks",
        },
        {
          name: "TypeScript",
          level: 85,
          description: "Type-safe JavaScript development",
        },
        {
          name: "Next.js",
          level: 85,
          description: "Server-side rendering, static site generation",
        },
        {
          name: "Tailwind CSS",
          level: 90,
          description: "Utility-first CSS framework for rapid UI development",
        },
      ],
    },
    {
      title: "Backend Development",
      icon: Server,
      description: "Creating scalable server-side applications and APIs.",
      skills: [
        {
          name: "Node.js",
          level: 88,
          description: "Event-driven, non-blocking I/O",
        },
        {
          name: "Python",
          level: 85,
          description: "Web frameworks, data processing, automation",
        },
        {
          name: "Express.js",
          level: 85,
          description: "RESTful API development",
        },
        {
          name: "GraphQL",
          level: 82,
          description: "Schema design, resolvers, Apollo Server",
        },
      ],
    },
    {
      title: "Database",
      icon: Database,
      description: "Managing and optimizing data storage solutions.",
      skills: [
        {
          name: "PostgreSQL",
          level: 85,
          description: "Relational database design, complex queries",
        },
        {
          name: "MongoDB",
          level: 88,
          description: "Document database, aggregation pipeline",
        },
        {
          name: "Redis",
          level: 80,
          description: "In-memory data structure store, caching",
        },
        { name: "Prisma", level: 82, description: "Type-safe database access" },
      ],
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      description:
        "Implementing and managing cloud infrastructure and deployment pipelines.",
      skills: [
        { name: "AWS", level: 85, description: "EC2, S3, Lambda, ECS" },
        {
          name: "Docker",
          level: 82,
          description: "Containerization, multi-stage builds",
        },
        { name: "CI/CD", level: 85, description: "GitHub Actions, Jenkins" },
        {
          name: "Kubernetes",
          level: 80,
          description: "Container orchestration",
        },
      ],
    },
    {
      title: "Programming",
      icon: Code,
      description: "Core programming languages and paradigms.",
      skills: [
        {
          name: "JavaScript",
          level: 92,
          description: "ES6+, async/await, functional programming",
        },
        {
          name: "Python",
          level: 85,
          description: "Django, FastAPI, data science",
        },
        {
          name: "Java",
          level: 80,
          description: "Spring Boot, enterprise applications",
        },
        {
          name: "Go",
          level: 75,
          description: "Concurrent programming, microservices",
        },
      ],
    },
    {
      title: "Tools & Others",
      icon: Terminal,
      description: "Development tools and methodologies.",
      skills: [
        {
          name: "Git",
          level: 90,
          description: "Version control, branching strategies",
        },
        {
          name: "VS Code",
          level: 92,
          description: "Extensions, customization",
        },
        {
          name: "Linux",
          level: 85,
          description: "Shell scripting, system administration",
        },
        { name: "Agile", level: 88, description: "Scrum, Kanban" },
      ],
    },
  ];

  const filteredCategories = skillCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.skills.some(
        (skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const toggleCategory = (title: string) => {
    setExpandedCategory((prev) => (prev === title ? null : title));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Skills & Expertise
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive overview of my technical skills and areas of
              expertise in software development.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="mb-8 relative max-w-md mx-auto">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div
                    className="flex items-center mb-6 cursor-pointer"
                    onClick={() => toggleCategory(category.title)}
                  >
                    <div className="bg-green-100 p-3 rounded-lg">
                      <category.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 ml-4 flex-1">
                      {category.title}
                    </h3>
                    {expandedCategory === category.title ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>

                  <p className="text-gray-600 mb-4">{category.description}</p>

                  <div className="space-y-4">
                    <AnimatePresence>
                      {(expandedCategory === category.title || searchQuery) &&
                        category.skills.map((skill) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="relative"
                            onMouseEnter={() => setActiveSkill(skill.name)}
                            onMouseLeave={() => setActiveSkill(null)}
                          >
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-700">
                                {skill.name}
                              </span>
                              <span className="text-gray-500">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                              <motion.div
                                className="bg-green-600 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </div>
                            <AnimatePresence>
                              {activeSkill === skill.name && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="absolute z-10 bg-gray-900 text-white p-2 rounded text-sm mt-1 w-full"
                                >
                                  {skill.description}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Additional Expertise
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Development Practices
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <motion.li
                    whileHover={{ x: 10 }}
                    className="flex items-center"
                  >
                    <GitBranch className="w-5 h-5 mr-2 text-green-600" />
                    Version Control & Git Flow
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 10 }}
                    className="flex items-center"
                  >
                    <Terminal className="w-5 h-5 mr-2 text-green-600" />
                    Command Line Proficiency
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 10 }}
                    className="flex items-center"
                  >
                    <Cpu className="w-5 h-5 mr-2 text-green-600" />
                    Performance Optimization
                  </motion.li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Soft Skills
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <motion.li whileHover={{ x: 10 }}>
                    Problem Solving & Analytical Thinking
                  </motion.li>
                  <motion.li whileHover={{ x: 10 }}>
                    Team Collaboration & Communication
                  </motion.li>
                  <motion.li whileHover={{ x: 10 }}>
                    Project Management & Leadership
                  </motion.li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ChatBot />
    </motion.div>
  );
};

export default Skills;
