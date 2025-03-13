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
  // Generate unique IDs for messages
  const generateId = (): string => Math.random().toString(36).substring(2, 11);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      role: "assistant",
      content: "Hi there! I'm Gloire's AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions] = useState<Suggestion[]>([
    { id: "1", text: "Tell me about your experience" },
    { id: "2", text: "What technologies do you work with?" },
    { id: "3", text: "How can I contact you?" },
  ]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
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
      const response: Response = await fetch(`/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get response");
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
      setIsLoading(true);
      setMessages((prev) => [...prev, { ...newMessage, content: "" }]);

      // Simulate typing effect
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, content } : msg
        )
      );
      setIsLoading(false);
    } else {
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  // Enhanced send message handler
  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    await addMessage("user", messageText);
    setInput("");

    try {
      const responseContent = await generateResponse(messageText);
      await addMessage("assistant", responseContent);
    } catch (error) {
      console.error("Error:", error);
      await addMessage(
        "assistant",
        "I apologize, but I encountered an error. Please try again."
      );
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

  // Ensure that any dynamic values are handled within useEffect
  useEffect(() => {
    // Any client-side logic that needs to run after the component mounts
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="icon-button bg-[#8050e3] text-white"
          aria-label="Chat with Gloire's AI Assistant"
        >
          <MessageCircle size={24} className="filter drop-shadow-sm" />
        </motion.button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60]"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-[20px] right-[20px] w-[90vw] max-w-[400px] max-h-[85vh] z-[61]"
        >
          <Dialog.Content
            className="glassmorphic w-full h-full overflow-hidden"
          >
            <Dialog.Title className="sr-only">
              Chat with Gloire's Assistant
            </Dialog.Title>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#8050e3] text-white">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User size={20} className="text-white" />
                Chat with Gloire's Assistant
              </h3>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={clearConversation}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  title="Clear conversation"
                >
                  <RefreshCw size={16} />
                </motion.button>
                <Dialog.Close asChild>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    title="Close chat"
                  >
                    <X size={16} />
                  </motion.button>
                </Dialog.Close>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex flex-col h-[60vh] overflow-hidden bg-white/95">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.role === "user"
                          ? "bg-[#8050e3] text-white rounded-tr-none"
                          : "bg-gray-100 rounded-tl-none"
                      }`}
                    >
                      {message.role === "assistant" && isLoading && message === messages[messages.length - 1] ? (
                        <div className="flex items-center gap-1">
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 bg-[#8050e3] rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-[#8050e3] rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-[#8050e3] rounded-full"
                          />
                        </div>
                      ) : message.role === "assistant" && message === messages[messages.length - 1] ? (
                        <TypeWriter text={message.content} />
                      ) : (
                        <div className="prose prose-sm">
                          {renderFormattedText(message.content)}
                        </div>
                      )}
                      <div
                        className={`text-xs mt-1 ${
                          message.role === "user"
                            ? "text-white/70"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
            </div>

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <p className="text-sm text-gray-500 mb-2">
                    Suggested questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                                  <motion.button
                                    key={suggestion.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSuggestionClick(suggestion.text)}
                        className="text-xs bg-white border border-gray-200 hover:border-[#8050e3] rounded-full px-3 py-1.5 transition-colors"
                                  >
                                    {suggestion.text}
                                  </motion.button>
                                ))}
                        </div>
                    </div>
              )}

              {/* Input area */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && input.trim()) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#8050e3] transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !input.trim()}
                    className="icon-button bg-[#8050e3] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Send message"
                >
                    <Send size={18} className="filter drop-shadow-sm" />
                </motion.button>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </motion.div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ChatBot;
