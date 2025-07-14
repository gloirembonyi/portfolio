import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Inline SVG logo for email templates
const inlineSvgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="80" height="80" style="border-radius: 50%; background-color: #081b29; border: 2px solid rgba(255,255,255,0.3); padding: 5px;">
  <circle cx="100" cy="100" r="90" fill="#00abf0" />
  <circle cx="100" cy="100" r="85" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.3" />
  <circle cx="100" cy="100" r="75" fill="#081b29" />
  <path d="M60 70 L60 130 L70 130 L70 90 L90 115 L110 90 L110 130 L120 130 L120 70 L110 70 L90 95 L70 70 Z" fill="#ffffff" />
  <path d="M150 100 A30 30 0 1 0 150 101 L150 115 L130 115 L130 105 L140 105 L140 100 A20 20 0 1 1 140 99 L140 85 L150 85 L150 95 L130 95 L130 85 A30 30 0 0 0 130 115 L150 115 Z" fill="#ffffff" />
</svg>`;

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gloirembonyi.com';

    // Create a test account using Ethereal Email for development
    // In production, you would use your actual email credentials
    let testAccount, transporter;
    
    // Update the production email service configuration
    if (process.env.NODE_ENV === 'production') {
      // Production - use real email service
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // Development - use Ethereal fake SMTP service
      testAccount = await nodemailer.createTestAccount();
      
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // Email content for site owner
    const ownerEmailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .email-container {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          }
          .email-header {
            background: linear-gradient(to right, #00abf0, #0077b6);
            color: white;
            padding: 20px;
            text-align: center;
          }
          .logo-container {
            margin-bottom: 10px;
            text-align: center;
          }
          .email-body {
            padding: 20px;
            background-color: #fff;
          }
          .message-content {
            background-color: #f9f9f9;
            border-left: 4px solid #00abf0;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            padding: 10px 20px;
            background-color: #f5f5f5;
          }
          .info-label {
            font-weight: bold;
            color: #00abf0;
          }
          @media only screen and (max-width: 480px) {
            body { padding: 10px; }
            .email-header { padding: 15px 10px; }
            .email-body { padding: 15px 10px; }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <div class="logo-container">
              ${inlineSvgLogo}
            </div>
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="email-body">
            <p>You have received a new message from your portfolio website:</p>
            
            <p><span class="info-label">Name:</span> ${name}</p>
            <p><span class="info-label">Email:</span> ${email}</p>
            <p><span class="info-label">Phone:</span> ${phone || 'Not provided'}</p>
            <p><span class="info-label">Subject:</span> ${subject}</p>
            
            <div class="message-content">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <p>You can reply directly to this email to respond to ${name}.</p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Gloire Mbonyi | Portfolio Contact System
          </div>
        </div>
      </body>
      </html>
    `;

    // Email content for sender
    const senderEmailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for your message</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .email-container {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          }
          .email-header {
            background: linear-gradient(to right, #00abf0, #0077b6);
            color: white;
            padding: 20px;
            text-align: center;
          }
          .logo-container {
            margin-bottom: 10px;
            text-align: center;
          }
          .email-body {
            padding: 20px;
            background-color: #fff;
          }
          .message-recap {
            background-color: #f9f9f9;
            border-left: 4px solid #00abf0;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
            font-style: italic;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            padding: 10px 20px;
            background-color: #f5f5f5;
          }
          .social-links {
            text-align: center;
            padding: 15px 0;
          }
          .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #00abf0;
            text-decoration: none;
            font-weight: bold;
          }
          .button {
            display: inline-block;
            background: linear-gradient(to right, #00abf0, #0077b6);
            color: white !important;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 15px;
            font-weight: bold;
          }
          @media only screen and (max-width: 480px) {
            body { padding: 10px; }
            .email-header { padding: 15px 10px; }
            .email-body { padding: 15px 10px; }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <div class="logo-container">
              ${inlineSvgLogo}
            </div>
            <h1>Thank you for reaching out!</h1>
          </div>
          <div class="email-body">
            <p>Dear ${name},</p>
            
            <p>I have received your message and will get back to you as soon as possible.</p>
            
            <h3>Here's a copy of your message:</h3>
            <div class="message-recap">
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong> ${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <p>If you have any additional questions or information, feel free to reply to this email.</p>
            
            <p>Best regards,<br>Gloire Mbonyi</p>
            
            <div class="social-links">
              <a href="https://github.com/gloirembonyi" target="_blank">GitHub</a> | 
              <a href="https://www.linkedin.com/in/gloire-mbonyi-755788250/" target="_blank">LinkedIn</a>
            </div>
            
            <div style="text-align: center;">
              <a href="${baseUrl}" class="button">Visit My Portfolio</a>
            </div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Gloire Mbonyi | All Rights Reserved
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      // Send email to site owner
      const ownerInfo = await transporter.sendMail({
        from: process.env.NODE_ENV === 'production' ? process.env.EMAIL_USER : 'portfolio@gloirembonyi.com',
        to: process.env.NODE_ENV === 'production' ? process.env.EMAIL_USER : email, // In dev, send to sender for testing
        subject: `Portfolio Contact: ${subject}`,
        html: ownerEmailContent,
      });
      
      // Send confirmation to sender
      const senderInfo = await transporter.sendMail({
        from: process.env.NODE_ENV === 'production' ? process.env.EMAIL_USER : 'portfolio@gloirembonyi.com',
        to: email,
        subject: 'Thank you for contacting me!',
        html: senderEmailContent,
      });

      // Log Ethereal URLs in development for testing
      if (process.env.NODE_ENV !== 'production') {
        console.log('Preview owner email URL: %s', nodemailer.getTestMessageUrl(ownerInfo));
        console.log('Preview sender email URL: %s', nodemailer.getTestMessageUrl(senderInfo));
      }
      
      return NextResponse.json({ 
        message: 'Message sent successfully!',
        previewUrls: process.env.NODE_ENV !== 'production' ? {
          owner: nodemailer.getTestMessageUrl(ownerInfo),
          sender: nodemailer.getTestMessageUrl(senderInfo)
        } : undefined
      });
    } catch (emailError: any) {
      console.error('Email sending error:', emailError);
      
      // For development purposes, simulate success even if email fails
      if (process.env.NODE_ENV !== 'production') {
        console.log('Development mode: Simulating successful email despite error');
        return NextResponse.json({ 
          message: 'Message recorded successfully (email delivery simulated in development)',
          error: emailError.message
        });
      } else {
        throw emailError; // Re-throw in production
      }
    }
  } catch (error) {
    console.error('Error in contact form processing:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
