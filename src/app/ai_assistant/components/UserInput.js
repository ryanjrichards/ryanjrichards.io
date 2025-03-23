'use client';

import { useState } from 'react';

export default function UserInput({ onSendMessage, isLoading }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        id="user-input" // Add id attribute
        name="user-input" // Add name attribute
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md"
        placeholder="Type your message..."
        autoComplete="off"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-md"
        disabled={isLoading}
      >
        Send
      </button>
    </form>
  );
}