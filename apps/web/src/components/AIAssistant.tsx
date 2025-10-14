
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your Nobleloop assistant. How can I help you with our AI marketing automation solutions today?',
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call in production)
    setTimeout(() => {
      const responses = [
        "Our AI marketing automation platform helps legacy businesses modernize their marketing operations without disruption.",
        "Nobleloop offers end-to-end campaign orchestration, lead funnel optimization, and intelligent follow-ups.",
        "We provide white-glove implementation and support to ensure a smooth transition.",
        "You can schedule a demo by clicking the 'Schedule a Demo' button at the top of our page.",
        "Our pricing is customized based on your business needs. You can check our pricing section for more details.",
        "Our platform integrates with most CRM systems used by legacy businesses.",
        "The implementation process typically takes 2-4 weeks depending on your existing systems."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full p-3 shadow-lg z-50 bg-primary hover:bg-primary/90"
        aria-label="Chat with AI Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-20 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50 transition-all duration-300 flex flex-col",
          isOpen 
            ? "opacity-100 transform translate-y-0 h-[500px]" 
            : "opacity-0 transform translate-y-4 h-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-primary p-4 text-white flex items-center">
          <Bot className="mr-2" size={20} />
          <h3 className="font-medium">Nobleloop Assistant</h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "mb-4 max-w-[85%] rounded-lg p-3",
                message.role === 'user'
                  ? "bg-primary/10 ml-auto"
                  : "bg-white border border-gray-200"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))}
          {isTyping && (
            <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 max-w-[85%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-end">
            <Textarea
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[80px] resize-none mr-2 text-sm"
            />
            <Button 
              onClick={sendMessage}
              size="icon"
              className="h-10 w-10 bg-primary hover:bg-primary/90"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
