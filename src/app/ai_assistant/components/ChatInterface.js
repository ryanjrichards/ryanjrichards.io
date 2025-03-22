'use client';

import { useState, useRef } from 'react';
import Message from './Message';
import UserInput from './UserInput';

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
  const messagesContainerRef = useRef(null);

  // Function to handle sending a new message
  const handleSendMessage = async (content) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Create a list of messages to send to the API
      const messagesToSend = [
        ...messages,
        userMessage
      ];
      
      // Call the chat API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messagesToSend }),
      });
      
      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add assistant response to chat immediately
      setMessages((prevMessages) => [
        ...prevMessages, 
        { role: data.role || 'assistant', content: data.message }
      ]);
      
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error calling chat API:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          role: 'assistant', 
          content: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later."
        }
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages container */}
      <div 
        ref={messagesContainerRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <Message 
            key={index} 
            role={message.role} 
            content={message.content} 
          />
        ))}
        
        {isLoading && (
          <div className="flex justify-start items-center space-x-2 text-foreground/70 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <div className="w-2 h-2 rounded-full bg-accent animation-delay-200"></div>
            <div className="w-2 h-2 rounded-full bg-accent animation-delay-400"></div>
          </div>
        )}
      </div>
      
      {/* Input area */}
      <div className="border-t border-foreground/10 p-4 bg-background">
        <UserInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}