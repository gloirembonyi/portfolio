import React from "react";
import { Code, Coffee, Heart, Star } from "lucide-react";
import ChatBot from "../components/ChatBot";

const About: React.FC = () => {
  const achievements = [
    {
      icon: Code,
      title: "Full Stack Developer",
      description: "Specialized in React, Node.js, and modern web technologies",
    },
    {
      icon: Star,
      title: "5+ Years Experience",
      description:
        "Building scalable applications and solving complex problems",
    },
    {
      icon: Coffee,
      title: "Problem Solver",
      description:
        "Passionate about finding elegant solutions to technical challenges",
    },
    {
      icon: Heart,
      title: "Open Source Contributor",
      description: "Active member of the developer community",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Gloire
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A passionate full-stack developer with a love for creating
              innovative solutions and building exceptional digital experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <item.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              My Journey
            </h2>
            <div className="space-y-6 text-gray-600">
              <p>
                With over 5 years of experience in web development, I've had the
                privilege of working on diverse projects that have shaped my
                expertise in building robust and scalable applications.
              </p>
              <p>
                My technical journey began with a deep curiosity for creating
                things that make a difference. Today, I specialize in full-stack
                development, focusing on React, Node.js, and cloud technologies.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open-source
                projects, writing technical articles, and mentoring aspiring
                developers.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default About;
