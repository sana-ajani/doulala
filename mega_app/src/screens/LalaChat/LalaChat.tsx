import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../components/BottomNav';

export const LalaChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'user' | 'bot'; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', content: message }]);
    setIsLoading(true);

    try {
      const response = await fetch('/doulala/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: message }),
      });

      const data = await response.json();
      
      // Add Lala's response to chat
      setChatHistory(prev => [...prev, { type: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setChatHistory(prev => [...prev, { type: 'bot', content: "I'm sorry, I couldn't process your request at the moment." }]);
    }

    setIsLoading(false);
    setMessage('');
  };

  const suggestedQuestions = [
    "When should I start contacting nurseries?",
    "How do I choose a pediatrician?"
  ];

  return (
    <div className="flex flex-col h-screen max-w-[402px] mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Doulala" 
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-xl font-semibold">Lala Q&A</h1>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 && (
          <div className="space-y-2">
            <p className="text-gray-600">Try asking one of these questions:</p>
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setMessage(question)}
                className="block w-full text-left p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        )}
        
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.type === 'user'
                  ? 'bg-[#082154] text-white rounded-br-none'
                  : 'bg-gray-100 text-black rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message Lala"
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#082154]"
          />
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="p-3 rounded-full bg-[#082154] text-white disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </form>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}; 