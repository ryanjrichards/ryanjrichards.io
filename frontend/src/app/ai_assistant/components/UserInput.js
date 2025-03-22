'use client';

import { useState } from 'react';

export default function UserInput({ onSendMessage, isLoading }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isLoading}
          className="w-full rounded-lg p-3 bg-background border border-foreground/10 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none min-h-[60px]"
          style={{ maxHeight: '200px' }}
        />
        <div className="text-xs text-foreground/60 mt-1 pl-1">
          Press Enter to send, Shift+Enter for a new line
        </div>
      </div>
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className={`rounded-full p-3 ${
          message.trim() && !isLoading
            ? 'bg-accent text-white hover:bg-accent/90'
            : 'bg-foreground/20 text-foreground/40 cursor-not-allowed'
        } transition-colors`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </form>
  );
}