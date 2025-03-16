import { NextResponse } from 'next/server';

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
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Update rate limiting
    rateLimit.current.set(ip, [...recentRequests, now]);

    // Get the form data
    const data = await request.json();
    const { name, email, message } = data;

    // Validate the data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Send an email using a service like SendGrid or AWS SES
    // 2. Store the message in a database
    // 3. Set up notifications
    
    // For now, we'll just log the data
    console.log('Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json({
      message: 'Message received! I\'ll get back to you soon.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
} 