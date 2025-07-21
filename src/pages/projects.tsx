import React, { useState, useMemo } from "react";
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Search,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBot from "../components/ChatBot";

const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"stars" | "recent">("stars");

  const allProjects = [
    {
      title: "MeetAI Platform",
      description:
        "An AI-powered meeting assistant that transcribes and analyzes meetings in real-time. Features user authentication, meeting scheduling, and smart summaries.",
      image: "/projects/meet-ai.jpg",
      images: [
        "/projects/meet-ai.jpg",
        "/projects/meet-ai-login.jpg",
        "/projects/meet-ai-transcription.png",
      ],
      tags: ["React", "Node.js", "AI", "WebRTC"],
      github: "https://github.com/gloire/meetai",
      demo: "https://meetai-demo.vercel.app",
      stats: {
        stars: 156,
        forks: 45,
      },
      date: "2024-01-20",
    },
    {
      title: "Plant Identifier",
      description:
        "Mobile-responsive application that uses computer vision to identify plant species from photos. Includes detailed information about care instructions and growing conditions.",
      image: "/projects/plant-identify.png",
      images: ["/projects/plant-identify.png"],
      tags: ["TensorFlow", "React", "Firebase", "Computer Vision"],
      github: "https://github.com/gloire/plant-identify",
      demo: "https://plant-identify.vercel.app",
      stats: {
        stars: 128,
        forks: 34,
      },
      date: "2024-03-01",
    },
    {
      title: "Modern Login UI",
      description:
        "A beautifully designed login interface with advanced animations, form validation, and social sign-in options. Optimized for accessibility and responsiveness.",
      image: "/projects/best-login-design.png",
      images: ["/projects/best-login-design.png"],
      tags: ["React", "Tailwind CSS", "Framer Motion", "Authentication"],
      github: "https://github.com/gloire/modern-login",
      demo: "https://modern-login-ui.vercel.app",
      stats: {
        stars: 89,
        forks: 23,
      },
      date: "2024-02-15",
    },
    {
      title: "Private Project 1",
      description:
        "A confidential project involving blockchain technology and financial data visualization. Features secure transactions and real-time market monitoring.",
      image: "/projects/private-project-1.jpg",
      images: ["/projects/private-project-1.jpg"],
      tags: ["Blockchain", "TypeScript", "GraphQL", "Security"],
      github: "https://github.com/gloire/private-repo-1",
      demo: "#",
      stats: {
        stars: 42,
        forks: 12,
      },
      date: "2023-12-10",
    },
    {
      title: "Private Project 2",
      description:
        "Enterprise-level data management system with advanced analytics and reporting capabilities. Includes role-based access control and audit logging.",
      image: "/projects/private-project-2.png",
      images: ["/projects/private-project-2.png"],
      tags: ["SQL", "Python", "React", "AWS"],
      github: "https://github.com/gloire/private-repo-2",
      demo: "#",
      stats: {
        stars: 76,
        forks: 18,
      },
      date: "2023-11-05",
    },
    {
      title: "Private Project 3",
      description:
        "IoT platform for smart home automation and energy optimization. Features machine learning algorithms for predictive maintenance and usage patterns.",
      image: "/projects/private-project-3.png",
      images: ["/projects/private-project-3.png"],
      tags: ["IoT", "Machine Learning", "React Native", "MongoDB"],
      github: "https://github.com/gloire/private-repo-3",
      demo: "#",
      stats: {
        stars: 62,
        forks: 15,
      },
      date: "2023-10-20",
    },
  ];

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allProjects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    return allProjects
      .filter((project) => {
        const matchesSearch =
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.every((tag) => project.tags.includes(tag));

        return matchesSearch && matchesTags;
      })
      .sort((a, b) => {
        if (sortBy === "stars") {
          return b.stats.stars - a.stats.stars;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [searchQuery, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
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
              Featured Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are some of my recent projects that showcase my skills and
              experience in full-stack development.
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Filter className="text-gray-400" size={20} />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "stars" | "recent")
                  }
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="stars">Most Stars</option>
                  <option value="recent">Most Recent</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <AnimatePresence>
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="text-center py-12 text-gray-500"
              >
                No projects found matching your criteria.
              </motion.div>
            ) : (
              <div className="grid gap-12">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
                    whileHover={{
                      y: -5,
                      boxShadow: "0 25px 50px -12px rgba(0, 171, 240, 0.25)",
                    }}
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative h-64 md:h-full min-h-[16rem] bg-gray-100 overflow-hidden group">
                        {/* Main Image */}
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

                        {/* Image Navigation */}
                        {project.images && project.images.length > 1 && (
                          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {project.images.map((img, i) => (
                              <motion.button
                                key={i}
                                className="w-2 h-2 rounded-full bg-white/70 hover:bg-white"
                                whileHover={{ scale: 1.5 }}
                              ></motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, tagIndex) => (
                            <motion.span
                              key={tagIndex}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgb(209 250 229)",
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <motion.div
                              className="flex items-center text-gray-600"
                              whileHover={{ scale: 1.1, color: "#00abf0" }}
                            >
                              <Star className="w-4 h-4 mr-1" />
                              <span>{project.stats.stars}</span>
                            </motion.div>
                            <motion.div
                              className="flex items-center text-gray-600"
                              whileHover={{ scale: 1.1, color: "#00abf0" }}
                            >
                              <GitFork className="w-4 h-4 mr-1" />
                              <span>{project.stats.forks}</span>
                            </motion.div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(project.date).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex space-x-4">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-xl"
                          >
                            <Github size={20} />
                            <span>View Code</span>
                          </motion.a>
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-xl hover:from-green-600 hover:to-green-700"
                          >
                            <ExternalLink size={20} />
                            <span>Live Demo</span>
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ChatBot />
    </motion.div>
  );
};

export default Projects;
