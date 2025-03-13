import { NextApiRequest, NextApiResponse } from 'next';

// Define the Gemini API key and model
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'models/gemini-1.5-flash';

// Knowledge base about Gloire
const gloireInfo = {
  skills: {
    frontend: ["React.js", "TypeScript", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Python", "Express.js", "GraphQL"],
    database: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
    devops: ["AWS", "Docker", "CI/CD", "Kubernetes"],
    programming: ["JavaScript", "Python", "Java", "Go"],
    tools: ["Git", "VS Code", "Linux", "Agile"]
  },
  experience: [
    {
      title: "Full Stack Developer",
      description: "Specialized in React, Node.js, and modern web technologies",
      years: "5+"
    }
  ],
  projects: [
    {
      title: "AI-Powered Analytics Dashboard",
      description: "Real-time data visualization platform with machine learning insights",
      technologies: ["React", "Python", "TensorFlow", "AWS"]
    },
    {
      title: "Blockchain Trading Platform",
      description: "Decentralized exchange with smart contract integration",
      technologies: ["Solidity", "Web3.js", "Node.js", "MongoDB"]
    },
    {
      title: "IoT Device Management System",
      description: "Cloud-based platform for managing IoT devices at scale",
      technologies: ["React", "Node.js", "MQTT", "Azure"]
    }
  ],
  contact: {
    email: "gloire@example.com",
    location: "San Francisco, CA",
    phone: "+1 234 567 890"
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // Call the Gemini API
    const response = await fetch(`https://your-actual-gemini-api-endpoint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        model: GEMINI_MODEL,
        prompt: message,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get response');
    }

    const data = await response.json();
    const reply = data.choices[0]?.text || "I apologize, I couldn't process that request.";
    res.status(200).json({ message: reply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while processing your request. Please try again later.' });
  }
} 