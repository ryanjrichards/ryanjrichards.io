'use client';

import { useEffect, useState } from 'react';

export default function Message({ role, content }) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Add typing animation effect for assistant messages
  useEffect(() => {
    if (role === 'assistant') {
      setIsTyping(true);
      let index = 0;
      const timer = setInterval(() => {
        setDisplayedContent(content.substring(0, index));
        index++;
        if (index > content.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 15); // Adjust speed as needed
      
      return () => clearInterval(timer);
    } else {
      setDisplayedContent(content);
    }
  }, [content, role]);

  return (
    <div 
      className={`mb-4 ${
        role === 'user' ? 'flex justify-end' : 'flex justify-start'
      }`}
    >
      <div 
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          role === 'user' 
            ? 'bg-accent text-white' 
            : 'bg-foreground/10 text-foreground'
        }`}
      >
        {role === 'assistant' ? displayedContent : content}
        {isTyping && <span className="ml-1 animate-pulse">|</span>}
      </div>
    </div>
  );
}