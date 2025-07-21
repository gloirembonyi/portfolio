"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  Zap,
  Code,
  Mail,
  RefreshCw,
  ThumbsUp,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "../data/profile";

/**
 * ChatBot Component for Portfolio
 *
 * This component creates an AI-powered chatbot that can answer questions about the portfolio owner.
 * It uses Google's Gemini API to generate responses based on predefined knowledge.
 *
 * HOW TO TRAIN THE CHATBOT WITH YOUR OWN DATA:
 *
 * 1. Update the profile data in src/data/profile.ts with your own information:
 *    - Modify skills, projects, experience, and contact details
 *    - This serves as the knowledge base for the chatbot
 *
 * 2. For more advanced training:
 *    - Modify the contextPrompt in the generateResponse function
 *    - Add more specific details about yourself and your work
 *
 * 3. For full model fine-tuning:
 *    - Create a comprehensive dataset (500+ examples recommended)
 *    - Use a service like OpenAI's fine-tuning API
 *    - Replace the Gemini API implementation with your custom model
 *
 * 4. To improve contact handling:
 *    - Update the contactKeywords array with relevant terms
 *    - Customize the contact response template
 */

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

interface SuggestionCategory {
  id: string;
  icon: any;
  title: string;
  suggestions: Array<{ id: string; text: string }>;
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
  const suggestionCategories: SuggestionCategory[] = [
    {
      id: "technical",
      icon: Code,
      title: "Technical Skills",
      suggestions: [
        { id: "skills", text: "What are your main technical skills?" },
        { id: "stack", text: "What's your preferred tech stack?" },
        { id: "ai", text: "Tell me about your AI experience" },
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
          id: "ai_projects",
          text: "What AI projects have you worked on?",
        },
      ],
    },
    {
      id: "contact",
      icon: Mail,
      title: "Contact",
      suggestions: [
        { id: "email", text: "How can I email you?" },
        { id: "phone", text: "What's your phone number?" },
        { id: "availability", text: "When are you available for work?" },
      ],
    },
  ];

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

  // API integration for chat responses using Gemini API
  const generateResponse = async (query: string): Promise<string> => {
    try {
      // Check if it's a contact request
      const contactKeywords = [
        "contact",
        "email",
        "phone",
        "reach",
        "message",
        "call",
        "connect",
      ];
      const isContactRequest = contactKeywords.some((keyword) =>
        query.toLowerCase().includes(keyword)
      );

      if (isContactRequest) {
        return `You can contact Gloire via:
        
📧 Email: ${profileData.contact.email}
📱 Phone: ${profileData.contact.phone}
🔗 LinkedIn: ${profileData.contact.linkedin}
🔗 GitHub: ${profileData.contact.github}

Gloire typically responds within 24 hours and is always happy to discuss potential projects or opportunities.`;
      }

      // Construct context about Gloire to help Gemini provide accurate responses
      const contextPrompt = `
        You are an AI assistant for Gloire, a Full Stack Developer and AI Engineer.
        
        About Gloire:
        - Full Stack Developer & AI Engineer with 3+ years of experience
        - Currently works at ${profileData.experience[0].company}
        - Currently studying ${profileData.education[0].degree} at ${
        profileData.education[0].institution
      }
        - Specializes in web development and AI integration
        - Skills include: ${profileData.skills.join(", ")}
        - Email: ${profileData.contact.email}
        - Phone: ${profileData.contact.phone}
        
        Answer the following question about Gloire in a helpful, professional manner.
        Keep responses concise but informative.
        If the user asks how to contact Gloire, provide the email and phone number.
        
        Question: ${query}
      `;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: contextPrompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        console.error("Gemini API error:", await response.text());
        throw new Error("Failed to get response from Gemini API");
      }

      const data = await response.json();

      // Extract the response text from the Gemini API response
      const responseText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't generate a response at this time.";

      return responseText;
    } catch (error) {
      console.error("Error with Gemini API:", error);

      // Fallback responses if the API fails
      const fallbackResponses = [
        "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
        `Gloire is a Full Stack Developer and AI Engineer with experience in React, Next.js, Node.js, and AI integration. Currently working at ${profileData.experience[0].company} and studying ${profileData.education[0].degree}. You can contact Gloire at ${profileData.contact.email} or ${profileData.contact.phone}.`,
        "Gloire specializes in building modern web applications with AI integration, focusing on performance and user experience.",
        `If you need to get in touch with Gloire, please email ${profileData.contact.email} or call ${profileData.contact.phone}.`,
      ];

      // Return a random fallback response
      return fallbackResponses[
        Math.floor(Math.random() * fallbackResponses.length)
      ];
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
          className="bg-gradient-to-r from-[#00abf0] to-[#0077b6] text-white px-6 py-3 z-50 rounded-full font-medium transition-all flex items-center gap-2 shadow-lg shadow-[#00abf0]/20"
          aria-label="Chat with Gloire's AI Assistant"
        >
          <MessageCircle size={20} />
          <span>Chat with AI</span>
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
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] max-h-[90vh] z-50"
        >
          <Dialog.Content className="w-full h-full bg-[#081b29] rounded-lg shadow-xl overflow-hidden border border-[#00abf0]/20">
            <Dialog.Title className="sr-only">
              Chat with Gloire's Assistant
            </Dialog.Title>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#00abf0]/20 bg-[#0a1f32]">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                <Bot size={20} className="text-[#00abf0]" />
                Chat with Gloire's Assistant
              </h3>
              <div className="flex items-center gap-2">
                <Dialog.Close asChild>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </div>
            </div>

            {/* Chat messages area */}
            <div
              ref={chatContainerRef}
              className="p-4 h-[400px] overflow-y-auto space-y-4 bg-[#041320]"
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
                          ? "bg-gradient-to-r from-[#00abf0] to-[#0077b6] text-white"
                          : "bg-[#0a1f32] text-white border border-[#00abf0]/20"
                      }`}
                    >
                      {msg.role === "assistant" && isTyping ? (
                        <TypeWriter text={msg.content} />
                      ) : (
                        renderFormattedText(msg.content)
                      )}
                      <div className="text-xs mt-1 text-gray-400">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading indicator */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="p-3 rounded-lg bg-[#0a1f32] text-white border border-[#00abf0]/20">
                      <div className="flex items-center gap-2">
                        <RefreshCw
                          size={16}
                          className="animate-spin text-[#00abf0]"
                        />
                        <span>Thinking</span>
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ...
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Suggestions area */}
            <AnimatePresence>
              {showSuggestions &&
                messages.length > 0 &&
                messages.length < 4 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 py-2 bg-[#0a1f32] border-t border-[#00abf0]/20 overflow-x-auto"
                  >
                    <div className="space-y-2">
                      {suggestionCategories.map(
                        (category: SuggestionCategory) => (
                          <div key={category.id} className="space-y-1">
                            <button
                              onClick={() =>
                                setSelectedCategory(
                                  selectedCategory === category.id
                                    ? null
                                    : category.id
                                )
                              }
                              className="flex items-center gap-2 text-sm font-medium w-full text-white hover:text-[#00abf0] transition-colors"
                            >
                              <category.icon
                                size={14}
                                className="text-[#00abf0]"
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
                                  {category.suggestions.map(
                                    (suggestion: {
                                      id: string;
                                      text: string;
                                    }) => (
                                      <motion.button
                                        key={suggestion.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() =>
                                          handleSuggestionClick(suggestion.text)
                                        }
                                        className="text-xs whitespace-nowrap px-3 py-1 rounded-full bg-[#081b29] hover:bg-[#00abf0]/10 text-white border border-[#00abf0]/20 hover:border-[#00abf0]/50 transition-all"
                                      >
                                        {suggestion.text}
                                      </motion.button>
                                    )
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>

            {/* Input area */}
            <div className="p-4 border-t border-[#00abf0]/20 bg-[#0a1f32]">
              <div className="flex gap-2">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about Gloire..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00abf0] bg-[#081b29] border-[#00abf0]/20 text-white placeholder-gray-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-[#00abf0] to-[#0077b6] text-white p-2 rounded-lg transition-all duration-300 disabled:opacity-50 shadow-lg shadow-[#00abf0]/20"
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
