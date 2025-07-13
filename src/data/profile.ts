/**
 * Gloire's Profile Data
 * 
 * This file contains all the predefined knowledge about Gloire that can be used
 * across the application, particularly for the AI assistant/chatbot.
 */

export const profileData = {
  intro: "I'm Gloire's AI assistant. I can tell you about Gloire's skills, projects, experience, and more.",
  
  skills: [
    "Frontend: React, Next.js, TypeScript, CSS/SCSS, Tailwind CSS",
    "Backend: Node.js, Express, MongoDB, SQL databases",
    "AI: Machine Learning, API Integration, LLM Implementation",
    "Tools: Git, Docker, AWS, Vercel, Figma",
  ],
  
  projects: [
    {
      name: "Personal Portfolio",
      description: "The website you're currently visiting, built with Next.js and Tailwind CSS",
      link: "#",
    },
    {
      name: "AI Assistant",
      description: "This interactive chatbot that helps visitors learn about Gloire",
      link: "#",
    },
    {
      name: "AI Integration Platform",
      description: "A platform for seamlessly integrating various AI models into web applications",
      link: "#",
    },
  ],
  
  experience: [
    {
      title: "Developer",
      company: "GKK (Global Kwik Koders)",
      period: "2025-Present",
      description: "Developing full stack web applications and AI integrations",
    },
    {
      title: "Computer Science Student",
      institution: "University",
      period: "2021-Present",
      description: "Studying advanced programming concepts and AI",
    },
  ],
  
  contact: {
    email: "gloirembonyi4@gmail.com",
    phone: "+2507860786",
    linkedin: "https://www.linkedin.com/in/gloire-mbonyi-755788250/",
    github: "https://github.com/gloirembonyi",
  },

  bio: `
    Gloire is a passionate Full Stack Developer and AI Engineer with expertise in creating 
    visually appealing and user-friendly web applications. With a strong foundation in modern 
    web technologies and AI integration, Gloire strives to build responsive, intelligent, 
    and accessible interfaces that provide exceptional user experiences.
    
    His approach combines creative design thinking with technical excellence to deliver solutions 
    that not only meet but exceed client expectations. He enjoys staying updated with the latest 
    industry trends and continuously expanding his skill set to tackle new challenges in web 
    development and artificial intelligence.
  `,

  education: [
    {
      degree: "Computer Science",
      institution: "University",
      period: "2021-Present",
      description: "Studying advanced programming concepts, algorithms, and artificial intelligence with a focus on practical applications."
    }
  ],

  languages: ["English", "French", "Swahili"],

  interests: ["AI Research", "Web Development", "Open Source", "Teaching", "Music"]
};

export default profileData; 