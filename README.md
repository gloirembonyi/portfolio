# Gloire's Portfolio Website

A modern portfolio website built with Next.js, React, and Tailwind CSS, featuring an AI-powered chatbot assistant.

## Features

- Responsive design with modern UI
- Interactive sections: Home, About, Education, Skills, and Contact
- AI-powered chatbot assistant using Google's Gemini API
- Contact form with email functionality
- Animations using Framer Motion
- Accessible UI components with Radix UI

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env.local` file based on `.env.local.example`:

   ```bash
   cp .env.local.example .env.local
   ```

4. Update the environment variables in `.env.local` with your own values:
   - `EMAIL_USER`: Your Gmail address for the contact form
   - `EMAIL_PASS`: Your Gmail app password (not your regular password)
   - `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google Gemini API key

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
pnpm build
pnpm start
```

## Customizing Profile Data

The website uses a centralized profile data file located at `src/data/profile.ts`. This file contains all the information about the portfolio owner that is used throughout the website, including the AI chatbot.

To customize the website for your own portfolio:

1. Edit `src/data/profile.ts` with your own information:

   - Update skills, projects, experience, and contact details
   - Modify bio, education, languages, and interests

2. Replace images in the `public` directory with your own photos

3. Update the ChatBot component if needed to reflect your specific use case

## AI Chatbot Customization

The AI chatbot uses the profile data to answer questions about you. To customize its behavior:

1. Update the profile data in `src/data/profile.ts`
2. Modify the context prompt in the `generateResponse` function in `src/components/ChatBot.tsx` if needed
3. Get your own Gemini API key from Google AI Studio and add it to your `.env.local` file

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [Google Gemini API](https://ai.google.dev/)
- [Nodemailer](https://nodemailer.com/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from [Lucide React](https://lucide.dev/)
