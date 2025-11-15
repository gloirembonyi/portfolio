"use client";

import React, { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, RefreshCw, ThumbsUp, Mail } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

const ContactModal = ({
  isOpen,
  onClose,
  initialSubject = "",
}: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: initialSubject,
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null as string | null,
  });

  const modalRef = useRef<HTMLDivElement>(null);

  // Update subject when initialSubject prop changes
  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({ ...prev, subject: initialSubject }));
    }
  }, [initialSubject]);

  // GSAP animation for modal
  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
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

      // Close modal after successful submission
      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, success: false }));
        onClose();
      }, 2000);
    } catch (error) {
      setFormStatus({
        loading: false,
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to send message",
      });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <AnimatePresence>
          {isOpen && (
            <>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <div
                  ref={modalRef}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg bg-[#081b29] border border-[#00abf0]/30 rounded-xl shadow-xl z-[60] p-4 sm:p-6 max-h-[90vh] flex flex-col overflow-hidden"
                  style={{ 
                    maxWidth: "min(550px, 90vw)",
                    maxHeight: "90vh",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="text-center mb-6 flex-shrink-0">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-[#00abf0]/10 rounded-full flex items-center justify-center">
                        <Mail size={24} className="text-[#00abf0]" />
                      </div>
                    </div>
                    <Dialog.Title className="text-2xl font-bold text-white flex items-center justify-center">
                      <span className="text-[#00abf0] mr-2">Get</span> In Touch
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-300 mt-2">
                      Fill out the form below and I&apos;ll get back to you as soon
                      as possible.
                    </Dialog.Description>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto min-h-0 pr-2 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-xs text-gray-400 mb-1 block"
                        >
                          Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="w-full bg-[#0a1f32] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="text-xs text-gray-400 mb-1 block"
                        >
                          Your Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          className="w-full bg-[#0a1f32] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-xs text-gray-400 mb-1 block"
                      >
                        Phone Number (Optional)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+1 (123) 456-7890"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full bg-[#0a1f32] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="text-xs text-gray-400 mb-1 block"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        required
                        className="w-full bg-[#0a1f32] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="text-xs text-gray-400 mb-1 block"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        placeholder="Enter your message here..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        rows={4}
                        className="w-full bg-[#0a1f32] border border-[#00abf0]/20 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00abf0] transition-colors resize-none"
                      />
                    </div>

                    <div className="flex flex-col items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={formStatus.loading}
                        className="w-full bg-gradient-to-r from-[#00abf0] to-[#0077b6] text-white px-6 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-lg hover:shadow-[#00abf0]/20 transform hover:scale-[1.02]"
                      >
                        {formStatus.loading ? (
                          <>
                            <RefreshCw className="animate-spin" size={16} />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
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
                            className="text-green-400 flex items-center gap-2 text-sm bg-green-400/10 px-4 py-2 rounded-lg w-full justify-center"
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
                            className="text-red-400 flex items-center gap-2 text-sm bg-red-400/10 px-4 py-2 rounded-lg w-full justify-center"
                          >
                            <X size={14} />
                            {formStatus.error}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </form>

                  <div className="absolute top-3 right-3">
                    <Dialog.Close asChild>
                      <button
                        className="bg-[#0a1f32] text-gray-400 hover:text-white transition-colors rounded-full p-1.5 hover:bg-[#00abf0]/20"
                        aria-label="Close"
                      >
                        <X size={18} />
                      </button>
                    </Dialog.Close>
                  </div>
                  <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                      width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                      background: rgba(10, 31, 50, 0.5);
                      border-radius: 3px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      background: rgba(0, 171, 240, 0.3);
                      border-radius: 3px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                      background: rgba(0, 171, 240, 0.5);
                    }
                  `}</style>
                </div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ContactModal;
