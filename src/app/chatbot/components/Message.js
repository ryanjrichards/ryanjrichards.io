'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      }, 1); // Fastest possible typing
      
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
        className={`
          max-w-[80%] 
          rounded-lg 
          px-4 
          py-2 
          border 
          ${role === 'user' 
            ? 'bg-accent text-white border-accent/20' 
            : 'bg-foreground/5 text-foreground border-foreground/10 hover:border-foreground/20'}
        `}
      >
        {role === 'assistant' ? (
          <>
            <ReactMarkdown
              components={{
                a: ({node, ...props}) => (
                  <a 
                    {...props} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`
                      ${role === 'user' 
                        ? 'text-white hover:underline' 
                        : 'text-accent hover:underline'}
                    `}
                  />
                ),
                code: ({node, inline, className, children, ...props}) => (
                  <code 
                    className={`
                      ${inline 
                        ? `
                          ${role === 'user' 
                            ? 'bg-white/20 text-white rounded px-1 py-0.5 text-sm font-mono' 
                            : 'bg-foreground/10 text-foreground rounded px-1 py-0.5 text-sm font-mono'}
                        ` 
                        : `
                          ${role === 'user' 
                            ? 'block bg-white/20 text-white rounded px-2 py-1 text-sm font-mono my-2' 
                            : 'block bg-foreground/10 text-foreground rounded px-2 py-1 text-sm font-mono my-2'}
                        `}
                    `}
                    {...props}
                  >
                    {children}
                  </code>
                ),
                ul: ({children}) => (
                  <ul className="list-disc pl-5 mb-2">{children}</ul>
                ),
                ol: ({children}) => (
                  <ol className="list-decimal pl-5 mb-2">{children}</ol>
                ),
                blockquote: ({children}) => (
                  <blockquote 
                    className={`
                      border-l-4 italic my-2 pl-4
                      ${role === 'user' 
                        ? 'border-white/30' 
                        : 'border-foreground/30'}
                    `}
                  >
                    {children}
                  </blockquote>
                ),
                h1: ({children}) => (
                  <h1 
                    className={`
                      text-2xl font-bold mb-2
                      ${role === 'user' ? 'text-white' : 'text-foreground'}
                    `}
                  >
                    {children}
                  </h1>
                ),
                h2: ({children}) => (
                  <h2 
                    className={`
                      text-xl font-semibold mb-2
                      ${role === 'user' ? 'text-white' : 'text-foreground'}
                    `}
                  >
                    {children}
                  </h2>
                ),
                h3: ({children}) => (
                  <h3 
                    className={`
                      text-lg font-medium mb-2
                      ${role === 'user' ? 'text-white' : 'text-foreground'}
                    `}
                  >
                    {children}
                  </h3>
                )
              }}
              remarkPlugins={[remarkGfm]}
            >
              {displayedContent}
            </ReactMarkdown>
            {isTyping && <span className="ml-1 animate-pulse">|</span>}
          </>
        ) : (
          <ReactMarkdown
            components={{
              a: ({node, ...props}) => (
                <a 
                  {...props} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-accent hover:underline"
                />
              ),
              code: ({node, inline, className, children, ...props}) => (
                <code 
                  className={`
                    ${inline 
                      ? 'bg-foreground/10 text-foreground rounded px-1 py-0.5 text-sm font-mono' 
                      : 'block bg-foreground/10 text-foreground rounded px-2 py-1 text-sm font-mono my-2'}
                  `}
                  {...props}
                >
                  {children}
                </code>
              ),
              ul: ({children}) => (
                <ul className="list-disc pl-5 mb-2">{children}</ul>
              ),
              ol: ({children}) => (
                <ol className="list-decimal pl-5 mb-2">{children}</ol>
              ),
              blockquote: ({children}) => (
                <blockquote className="border-l-4 border-foreground/30 pl-4 italic my-2">
                  {children}
                </blockquote>
              )
            }}
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}