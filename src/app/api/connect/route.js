import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Rate limiting object (simple implementation)
const rateLimit = {
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // limit each IP to 5 requests per windowMs
  current: new Map()
};

export async function POST(request) {
  try {
    // Get client IP (in production, you'd want to get this from headers)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Basic rate limiting
    const now = Date.now();
    const userRequests = rateLimit.current.get(ip) || [];
    const recentRequests = userRequests.filter(time => now - time < rateLimit.windowMs);
    
    if (recentRequests.length >= rateLimit.max) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }
    
    // Update rate limiting
    rateLimit.current.set(ip, [...recentRequests, now]);

    // Get the form data
    const data = await request.json();
    const { name, email, message } = data;

    // Validate the data
    if (!name || !email || !message) {
      return new NextResponse(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Set up email data for notification email to yourself
    const notificationMailOptions = {
      from: process.env.GMAIL_USER, // Your email address
      to: 'ryan.richards95@gmail.com', // Change to your recipient
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Set up email data for confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.GMAIL_USER, // Your email address
      to: email, // User's email address
      subject: 'Thank you for contacting me',
      text: `Hi ${name},\n\nThank you for reaching out. I have received your message and will get back to you soon.\n\nThanks,\nRyan Richards`,
    };

    // Send notification email
    await transporter.sendMail(notificationMailOptions);

    // Send confirmation email
    await transporter.sendMail(confirmationMailOptions);

    // Return success response
    return new NextResponse(
      JSON.stringify({ message: 'Message received! I\'ll get back to you soon.' }),
      { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}