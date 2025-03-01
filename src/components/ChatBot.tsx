import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  X,
  User,
  ExternalLink,
  Sparkles,
  RefreshCw,
  ThumbsUp,
  Bot,
  Zap,
  Brain,
  Code,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

// Define message types
type MessageRole = "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

interface Suggestion {
  id: string;
  text: string;
}

const TypeWriter = ({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <span>{displayText}</span>;
};

const ChatBot = () => {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Generate unique IDs for messages
  const generateId = (): string => Math.random().toString(36).substring(2, 11);

  // Suggestions about Gloire
  const suggestions: Suggestion[] = [
    { id: "skills", text: "What are your main technical skills?" },
    { id: "projects", text: "Tell me about your most impressive project" },
    { id: "experience", text: "What's your development experience?" },
    { id: "contact", text: "How can I get in touch with you?" },
    { id: "stack", text: "What's your preferred tech stack?" },
  ];

  // Enhanced suggestions with categories
  const suggestionCategories = [
    {
      id: "technical",
      icon: Code,
      title: "Technical Skills",
      suggestions: [
        { id: "skills", text: "What are your main technical skills?" },
        { id: "stack", text: "What's your preferred tech stack?" },
        { id: "backend", text: "Tell me about your backend experience" },
      ],
    },
    {
      id: "projects",
      icon: Zap,
      title: "Projects",
      suggestions: [
        { id: "recent", text: "What's your most recent project?" },
        {
          id: "impressive",
          text: "Tell me about your most impressive project",
        },
        {
          id: "challenges",
          text: "What technical challenges have you solved?",
        },
      ],
    },
    {
      id: "experience",
      icon: Brain,
      title: "Experience",
      suggestions: [
        { id: "experience", text: "What's your development experience?" },
        { id: "role", text: "What's your current role?" },
        { id: "achievements", text: "What are your key achievements?" },
      ],
    },
  ];

  // Predefined knowledge about Gloire
  const aboutGloire = {
    intro:
      "I'm Gloire's AI assistant. I can tell you about Gloire's skills, projects, experience, and more.",
    skills: [
      "Frontend: React, Next.js, TypeScript, CSS/SCSS, Tailwind CSS",
      "Backend: Node.js, Express, MongoDB, SQL databases",
      "Tools: Git, Docker, AWS, Vercel, Figma",
      // Add your actual skills here
    ],
    projects: [
      {
        name: "Personal Portfolio",
        description:
          "The website you're currently visiting, built with Next.js and Tailwind CSS",
        link: "#", // Replace with actual link
      },
      {
        name: "AI Assistant",
        description:
          "This interactive chatbot that helps visitors learn about Gloire",
        link: "#",
      },
      // Add your actual projects here
    ],
    experience: [
      {
        title: "Software Developer",
        company: "Example Company",
        period: "2022-Present",
        description: "Developing web applications using React and Node.js",
      },
      {
        title: "Frontend Developer",
        company: "Another Company",
        period: "2020-2022",
        description:
          "Built responsive UIs with React and implemented new features",
      },
      // Add your actual experience here
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Example University",
        year: "2020",
      },
      // Add your actual education here
    ],
    contact: {
      email: "gloire@example.com", // Replace with your actual email
      linkedin: "linkedin.com/in/gloire", // Replace with your actual LinkedIn
      github: "github.com/gloire", // Replace with your actual GitHub
    },
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: generateId(),
          role: "assistant",
          content:
            "👋 Hello! I'm Gloire's AI assistant. How can I help you learn more about Gloire today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // API integration for chat responses
  const generateResponse = async (query: string): Promise<string> => {
    try {
      const response: Response = await fetch(
        `https://actual-gemini-api-endpoint`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: query }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("Error:", error);
      return "I apologize, but I'm having trouble connecting to my knowledge base. Please try again in a moment.";
    }
  };

  // Enhanced message display with typing animation
  const addMessage = async (role: MessageRole, content: string) => {
    const newMessage = {
      id: generateId(),
      role,
      content,
      timestamp: new Date(),
    };

    if (role === "assistant") {
      setIsTyping(true);
      setMessages((prev) => [...prev, { ...newMessage, content: "" }]);

      // Simulate typing effect
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, content } : msg
        )
      );
      setIsTyping(false);
    } else {
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  // Enhanced send message handler
  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    await addMessage("user", messageText);
    setInput("");
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const responseContent = await generateResponse(messageText);
      await addMessage("assistant", responseContent);
    } catch (error) {
      console.error("Error:", error);
      await addMessage(
        "assistant",
        "I apologize, but I encountered an error. Please try again."
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowSuggestions(true), 1000);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // Clear conversation
  const clearConversation = () => {
    setMessages([]);
  };

  // Render markdown-like formatting (simple version)
  const renderFormattedText = (text: string) => {
    // Bold text
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert line breaks to <br>
    formattedText = formattedText.replace(/\n/g, "<br>");

    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Chat with Gloire's AI Assistant"
        >
          <MessageCircle size={24} />
        </motion.button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-[20px] right-[20px] w-[90vw] max-w-[400px] max-h-[85vh]"
        >
          <Dialog.Content
            className={`w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <Dialog.Title className="sr-only">
              Chat with Gloire's Assistant
            </Dialog.Title>
            {/* Header */}
            <div
              className={`flex items-center justify-between p-4 ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } border-b`}
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User size={20} className="text-indigo-500" />
                Chat with Gloire's Assistant
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-full ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                  title={
                    darkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  {darkMode ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={clearConversation}
                  className={`p-2 rounded-full ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                  title="Clear conversation"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
                <Dialog.Close asChild>
                  <button
                    className={`text-${
                      darkMode ? "gray-300" : "gray-500"
                    } hover:text-${darkMode ? "white" : "gray-700"}`}
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </div>
            </div>

            {/* Enhanced chat messages with animations */}
            <div
              ref={chatContainerRef}
              className={`p-4 h-[400px] overflow-y-auto space-y-4 ${
                darkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      {msg.role === "assistant" && isTyping ? (
                        <TypeWriter text={msg.content} />
                      ) : (
                        renderFormattedText(msg.content)
                      )}
                      <div
                        className={`text-xs mt-1 ${
                          msg.role === "user"
                            ? "text-indigo-200"
                            : darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Enhanced loading indicator */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Thinking</span>
                        <motion.span
                          animate={{
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        >
                          ...
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Enhanced suggestions with categories */}
            <AnimatePresence>
              {showSuggestions &&
                messages.length > 0 &&
                messages.length < 4 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`px-4 py-2 ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    } border-t overflow-x-auto`}
                  >
                    <div className="space-y-2">
                      {suggestionCategories.map((category) => (
                        <div key={category.id} className="space-y-1">
                          <button
                            onClick={() =>
                              setSelectedCategory(
                                selectedCategory === category.id
                                  ? null
                                  : category.id
                              )
                            }
                            className="flex items-center gap-2 text-sm font-medium w-full"
                          >
                            <category.icon
                              size={14}
                              className="text-indigo-500"
                            />
                            {category.title}
                          </button>
                          <AnimatePresence>
                            {selectedCategory === category.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex gap-2 overflow-x-auto no-scrollbar pl-6"
                              >
                                {category.suggestions.map((suggestion) => (
                                  <motion.button
                                    key={suggestion.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      handleSuggestionClick(suggestion.text)
                                    }
                                    className={`text-xs whitespace-nowrap px-3 py-1 rounded-full ${
                                      darkMode
                                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                    }`}
                                  >
                                    {suggestion.text}
                                  </motion.button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>

            {/* Enhanced input area */}
            <div
              className={`p-4 ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } border-t`}
            >
              <div className="flex gap-2">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about Gloire..."
                  className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300"
                  }`}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
                  title="Send message"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </Dialog.Content>
        </motion.div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ChatBot;
