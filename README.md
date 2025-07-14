# Gloire Mbonyi Portfolio

Personal portfolio website showcasing my skills, projects, and contact information.

## Features

- Responsive design for all device sizes
- Interactive animations and UI elements
- Contact form with email notifications
- Downloadable CV
- Projects showcase
- Skills and experience sections

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory with the following variables:

```
# Email Configuration for Contact Form
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Gemini API Key for ChatBot (if applicable)
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
```

#### For Gmail:

1. Enable 2-Step Verification on your Google account
2. Create an App Password:
   - Go to your Google Account > Security
   - Under "Signing in to Google," select "App passwords"
   - Select "Mail" and "Other" (name it "Portfolio Site")
   - Copy the generated password and use it as `EMAIL_PASS`

#### For other email providers:

1. Update `EMAIL_HOST` with your provider's SMTP server
2. Set correct `EMAIL_PORT` and `EMAIL_SECURE` values
3. Use your email credentials for `EMAIL_USER` and `EMAIL_PASS`

### 4. Development Mode

```bash
npm run dev
```

The application will be available at http://localhost:3000

### 5. Build for Production

```bash
npm run build
npm start
```

## Contact Form Implementation

The contact form uses Nodemailer to send emails. In development mode, it uses Ethereal Email to simulate email sending without actually delivering messages.

To view test emails in development:

1. Fill out and submit the contact form
2. Check the console logs for preview URLs
3. Open the preview URLs to see how the emails would look

In production mode, real emails will be sent using the configured email provider.

## Logo and Branding

The MG logo is provided in SVG and PNG formats in the `/public` directory. The logo is used in the header, favicon, and email templates.

## License

Copyright © 2024 Gloire Mbonyi
