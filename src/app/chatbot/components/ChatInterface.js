'use client';

import { useState, useRef, useEffect } from 'react';
import Message from './Message';
import UserInput from './UserInput';
import { profileInfo } from '../data/profileInfo';

export default function ChatInterface() {
  // Initial messages to display in the chat
  const initialMessages = [
    {
      role: 'assistant',
      content: "Hi there! I'm Ryan's AI assistant. I can tell you about his experience at Datadog, his skills in cloud technologies and AI/ML, or his background. What would you like to know?"
    }
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to handle sending a new message
  const handleSendMessage = async (content) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call your AI API
      // Using setTimeout to simulate API latency
      setTimeout(() => {
        // Generate a response based on the user's message
        const response = generateResponse(content);
        
        // Add assistant response to chat
        setMessages((prevMessages) => [
          ...prevMessages, 
          { role: 'assistant', content: response }
        ]);
        
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          role: 'assistant', 
          content: "I'm sorry, I'm having trouble responding right now. Please try again later."
        }
      ]);
      setIsLoading(false);
    }
  };

  // Response generation based on keywords and profile data
  const generateResponse = (message) => {
    const messageLC = message.toLowerCase();
    
    // Check for exact questions from FAQs
    const faqMatch = profileInfo.faqs.find(faq => 
      messageLC.includes(faq.question.toLowerCase()) || 
      (messageLC.length > 10 && faq.question.toLowerCase().includes(messageLC))
    );
    
    if (faqMatch) {
      return faqMatch.answer;
    }
    
    // Check for Datadog or work related questions
    if (messageLC.includes('datadog') || 
        messageLC.includes('work') || 
        messageLC.includes('job') || 
        messageLC.includes('role') ||
        messageLC.includes('company')) {
      
      const currentRole = profileInfo.experience[0];
      return `As an ${currentRole.title} at ${currentRole.company}, Ryan specializes in helping businesses leverage cloud observability, performance monitoring, and AI-driven insights. ${currentRole.description}`;
    }
    
    // Check for skills or expertise
    if (messageLC.includes('skill') || 
        messageLC.includes('expertise') || 
        messageLC.includes('technologies') ||
        messageLC.includes('cloud') ||
        messageLC.includes('observability') ||
        messageLC.includes('ai') ||
        messageLC.includes('ml')) {
      
      const { cloudTechnologies, observability, aiMl } = profileInfo.expertise;
      return `Ryan has expertise in cloud technologies (${cloudTechnologies.slice(0, 3).join(', ')}), observability solutions (${observability.slice(0, 3).join(', ')}), and AI/ML (${aiMl.slice(0, 2).join(', ')}). He bridges the gap between technical and business stakeholders, bringing valuable experience from his background in the LLM space.`;
    }
    
    // Check for background or experience
    if (messageLC.includes('background') || 
        messageLC.includes('experience') || 
        messageLC.includes('history') ||
        messageLC.includes('international') ||
        messageLC.includes('global')) {
      
      return `Ryan has a diverse background that includes experience in AI and machine learning from his time in the LLM space. He's lived in multiple locations globally, including ${profileInfo.internationalExperience.join(', ')}, giving him a global perspective. This international experience helps him connect with diverse teams and understand varied business contexts.`;
    }
    
    // Check for education
    if (messageLC.includes('education') || 
        messageLC.includes('university') || 
        messageLC.includes('college') ||
        messageLC.includes('degree') ||
        messageLC.includes('study')) {
      
      const { university, degree, activities } = profileInfo.education;
      return `Ryan studied at ${university} where he earned his ${degree}. During his time there, he became a supporter of the ${activities}. His educational background has prepared him well for his role in technology and sales engineering.`;
    }
    
    // Check for contact information
    if (messageLC.includes('contact') || 
        messageLC.includes('reach') || 
        messageLC.includes('email') ||
        messageLC.includes('get in touch')) {
      
      return `You can reach out to Ryan through the contact page on this website or directly at ${profileInfo.basics.email}. He's based in ${profileInfo.basics.location} and is always open to connecting with professionals in the cloud and AI space.`;
    }
    
    // Check for hobbies and interests
    if (messageLC.includes('hobby') || 
        messageLC.includes('interest') || 
        messageLC.includes('free time') ||
        messageLC.includes('motorcycle') ||
        messageLC.includes('sports') ||
        messageLC.includes('personal')) {
      
      const interests = profileInfo.personalInterests;
      return `Outside of work, Ryan is ${interests[0].toLowerCase()}. He also enjoys ${interests[1].toLowerCase()} and ${interests[2].toLowerCase()}. Sports are another big part of his life - he follows ${interests[3].split('(')[0].toLowerCase().trim()}. Check out the Teams page to see which specific teams he supports!`;
    }
    
    // Check for location
    if (messageLC.includes('where') || 
        messageLC.includes('location') || 
        messageLC.includes('based') ||
        messageLC.includes('city') ||
        messageLC.includes('live')) {
      
      return `Ryan is based in ${profileInfo.basics.location}. From there, he works with enterprise clients across the Ohio River Valley region, though he has experience living in various locations including ${profileInfo.internationalExperience.slice(0, 2).join(' and ')}.`;
    }
    
    // Default response for anything else
    return "That's an interesting question! " + profileInfo.basics.summary + " Is there something specific about his work, skills, or background you'd like to know?";
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <Message 
            key={index} 
            role={message.role} 
            content={message.content} 
          />
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-foreground/70 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <div className="w-2 h-2 rounded-full bg-accent animation-delay-200"></div>
            <div className="w-2 h-2 rounded-full bg-accent animation-delay-400"></div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t border-foreground/10 p-4 bg-background">
        <UserInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}