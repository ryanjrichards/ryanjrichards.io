'use client';

import { useState } from 'react';

// Define the backend URL - would typically come from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ isSubmitting: true, isSubmitted: false, error: null });

    try {
      // Send the request to the Flask backend instead of the Next.js API route
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Parse the JSON response
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);

    } catch (error) {
      console.error('Contact form error:', error);
      setStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: error.message || 'Failed to send message. Please try again.'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required

  autoComplete="name"  // Add this line
          className="w-full px-4 py-2 rounded-lg bg-background border border-foreground/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email" 
          className="w-full px-4 py-2 rounded-lg bg-background border border-foreground/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          autoComplete="off"
          className="w-full px-4 py-2 rounded-lg bg-background border border-foreground/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
          placeholder="Your message..."
        />
      </div>

      {status.error && (
        <div className="text-red-500 text-sm">{status.error}</div>
      )}

      {status.isSubmitted && (
        <div className="text-green-500 text-sm">Message sent successfully!</div>
      )}

      <button
        type="submit"
        disabled={status.isSubmitting}
        className="w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status.isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}