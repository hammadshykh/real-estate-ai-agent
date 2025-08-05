// components/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChatInterface, { ChatMessage } from "@/components/ChatInterface";
import ChatBot from "./ChatInterface/chatBotPopup";

const generateSessionId = () => {
 return `session-${Math.random().toString(36).substring(2, 9)}-${Date.now()}`;
};

const DEFAULT_WELCOME_MESSAGE =
 "Hello, I'm Jessica, your luxury villa consultant in Dubai. What's your name?";

// Helper function to parse messages from localStorage
const parseMessages = (storedMessages: string | null): ChatMessage[] => {
 if (!storedMessages) return [];

 try {
  const parsed = JSON.parse(storedMessages);
  return parsed.map((msg: ChatMessage) => ({
   ...msg,
   timestamp: new Date(msg.timestamp),
  }));
 } catch (error) {
  console.error("Error parsing messages:", error);
  return [];
 }
};

const HeroSection = () => {
 const [messages, setMessages] = useState<ChatMessage[]>([]);
 const [showChatBot, setShowChatBot] = useState(false);
 const [sessionId, setSessionId] = useState<string>("");
 const [isLoading, setIsLoading] = useState(false);

 // Initialize chat session and load messages
 useEffect(() => {
  const initializeChat = async () => {
   // Check for existing session and messages
   const storedSessionId = localStorage.getItem("chatSessionId");
   const storedMessages = localStorage.getItem("chatMessages");

   if (storedSessionId && storedMessages) {
    // Existing user - load previous messages
    setSessionId(storedSessionId);
    setMessages(parseMessages(storedMessages));
   } else {
    // New user - create session and send welcome message
    const newSessionId = generateSessionId();
    localStorage.setItem("chatSessionId", newSessionId);
    setSessionId(newSessionId);

    // Send welcome message
    await sendWelcomeMessage(newSessionId);
   }
  };

  initializeChat();
 }, []);

 const sendWelcomeMessage = async (sessionId: string) => {
  try {
   setIsLoading(true);
   const response = await fetch(
    "https://n8n-self-host-lvfp.onrender.com/webhook/ee30d5a2-b250-4e42-a4ff-d0cb6f2e3fa2",
    {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({
      sessionId: sessionId,
      botMessage: DEFAULT_WELCOME_MESSAGE,
     }),
    }
   );

   const data = await response.json();
   console.log("Welcome API response:", data);

   const welcomeMessage: ChatMessage = {
    id: Date.now().toString(),
    from: "agent",
    text: data.output || DEFAULT_WELCOME_MESSAGE,
    timestamp: new Date(),
   };

   setMessages([welcomeMessage]);
   localStorage.setItem("chatMessages", JSON.stringify([welcomeMessage]));
  } catch (error) {
   console.error("Error sending welcome message:", error);

   // Fallback welcome message
   const welcomeMessage: ChatMessage = {
    id: Date.now().toString(),
    from: "agent",
    text: DEFAULT_WELCOME_MESSAGE,
    timestamp: new Date(),
   };

   setMessages([welcomeMessage]);
   localStorage.setItem("chatMessages", JSON.stringify([welcomeMessage]));
  } finally {
   setIsLoading(false);
  }
 };

 const handleSendMessage = async (message: string) => {
  if (!sessionId) return;

  // Add user message immediately
  const newMessage: ChatMessage = {
   id: Date.now().toString(),
   from: "user",
   text: message,
   timestamp: new Date(),
  };

  const updatedMessages = [...messages, newMessage];
  setMessages(updatedMessages);
  localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));

  try {
   setIsLoading(true);
   // Send to conversation API
   const response = await fetch(
    "https://n8n-self-host-lvfp.onrender.com/webhook/bdcda220-3c32-4ec2-8a6b-fdc09fde6a03",
    {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({
      sessionId: sessionId,
      userReply: message,
     }),
    }
   );

   const data = await response.json();
   console.log("Conversation API response:", data);

   const botResponse: ChatMessage = {
    id: (Date.now() + 1).toString(),
    from: "agent",
    text:
     data.output ||
     "Thank you for your message. I'll help you find the perfect luxury villa in Dubai.",
    timestamp: new Date(),
   };

   const finalMessages = [...updatedMessages, botResponse];
   setMessages(finalMessages);
   localStorage.setItem("chatMessages", JSON.stringify(finalMessages));
  } catch (error) {
   console.error("Error sending message:", error);

   // Fallback response
   const botResponse: ChatMessage = {
    id: (Date.now() + 1).toString(),
    from: "agent",
    text:
     "Thank you for your message. I'll help you find the perfect luxury villa in Dubai.",
    timestamp: new Date(),
   };

   const finalMessages = [...updatedMessages, botResponse];
   setMessages(finalMessages);
   localStorage.setItem("chatMessages", JSON.stringify(finalMessages));
  } finally {
   setIsLoading(false);
  }
 };

 useEffect(() => {
  const handleScroll = () => {
   const heroSection = document.getElementById("hero-section");
   if (heroSection) {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    setShowChatBot(heroBottom < 0);
   }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 return (
  <section
   id="hero-section"
   className="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
   {/* Background Image */}
   <div
    className="absolute inset-0 z-0"
    style={{
     backgroundImage: `url("/villa-image.jpg")`,
     backgroundSize: "cover",
     backgroundPosition: "center",
    }}
   />

   {/* Overlay */}
   <div className="absolute inset-0 bg-gradient-hero z-10" />

   {/* Content max-w-7xl */}
   <div className="relative z-20 w-full max-w-6xl mx-auto px-6 text-center pt-16 pb-10">
    {/* Header & Description */}
    <div className="mb-8">
     <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-5xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white"
     >
      Luxury Villas in Dubai
     </motion.h1>

     <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-sm text-white/90 max-w-2xl mx-auto"
     >
      {
       "Discover Your Dream Home with Emaar Properties - Where Luxury Meets Innovation in Dubai's Most Prestigious Neighborhoods"
      }
     </motion.p>
    </div>

    {/* Chat Interface */}
    <motion.div
     initial={{ opacity: 0, y: 50 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8, delay: 0.6 }}
     className="max-w-lg mx-auto mb-12"
    >
     <ChatInterface
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
     />
    </motion.div>

    {/* Action Buttons */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8, delay: 0.8 }}
     className="flex flex-col sm:flex-row gap-4 justify-center items-center"
    >
     <Button variant="premium" size="lg" className="text-lg px-8 py-6 min-w-48">
      Explore Villa Collection
     </Button>
     <Button variant="glass" size="lg" className="text-lg px-8 py-6 min-w-48">
      Schedule Private Tour
     </Button>
    </motion.div>
   </div>

   {/* Scroll Indicator */}
   <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 0.6 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
   >
    <motion.div
     animate={{ y: [0, 10, 0] }}
     transition={{ duration: 2, repeat: Infinity }}
     className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm"
    >
     <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
    </motion.div>
   </motion.div>

   {/* Floating ChatBot */}
   {showChatBot && (
    <ChatBot
     initialMessages={messages}
     onSendMessage={handleSendMessage}
     className="hidden lg:block"
     isLoading={isLoading}
    />
   )}
  </section>
 );
};

export default HeroSection;
