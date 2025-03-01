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
      title: "AI-Powered Analytics Dashboard",
      description:
        "Real-time data visualization platform with machine learning insights. Built with React, Python, and TensorFlow.",
      image: "/projects/analytics.jpg",
      tags: ["React", "Python", "TensorFlow", "AWS"],
      github: "https://github.com/gloire/analytics-dashboard",
      demo: "https://analytics-demo.com",
      stats: {
        stars: 128,
        forks: 34,
      },
      date: "2024-03-01",
    },
    {
      title: "Blockchain Trading Platform",
      description:
        "Decentralized exchange with smart contract integration. Supports multiple cryptocurrencies and real-time trading.",
      image: "/projects/blockchain.jpg",
      tags: ["Solidity", "Web3.js", "Node.js", "MongoDB"],
      github: "https://github.com/gloire/crypto-trade",
      demo: "https://crypto-trade-demo.com",
      stats: {
        stars: 89,
        forks: 23,
      },
      date: "2024-02-15",
    },
    {
      title: "IoT Device Management System",
      description:
        "Cloud-based platform for managing IoT devices at scale. Features real-time monitoring and automated deployments.",
      image: "/projects/iot.jpg",
      tags: ["React", "Node.js", "MQTT", "Azure"],
      github: "https://github.com/gloire/iot-manager",
      demo: "https://iot-demo.com",
      stats: {
        stars: 156,
        forks: 45,
      },
      date: "2024-01-20",
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
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative h-64 md:h-full min-h-[16rem] bg-gray-200">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
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
                            <span
                              key={tagIndex}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-gray-600">
                              <Star className="w-4 h-4 mr-1" />
                              <span>{project.stats.stars}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <GitFork className="w-4 h-4 mr-1" />
                              <span>{project.stats.forks}</span>
                            </div>
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
                            className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
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
                            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
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
