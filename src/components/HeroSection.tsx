// components/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChatInterface, { ChatMessage } from "@/components/ChatInterface";
import ChatBot from "./ChatInterface/chatBotPopup";

const dummyMessages: ChatMessage[] = [
 {
  id: "1",
  from: "agent",
  text:
   "Hello Alessandro! 👋 What's your ideal budget for a luxury villa in Dubai? This will help me in finding the perfect options for you.",
  timestamp: new Date(),
 },
 {
  id: "2",
  from: "user",
  text: "2.5 million AED",
  timestamp: new Date(),
 },
];

const HeroSection = () => {
 const [messages, setMessages] = useState<ChatMessage[]>(dummyMessages);
 const [showChatBot, setShowChatBot] = useState(false);

 useEffect(() => {
  const handleScroll = () => {
   const heroSection = document.getElementById("hero-section");
   if (heroSection) {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    setShowChatBot(heroBottom < 0); // Show chat when scrolled past hero
   }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 const handleSendMessage = (message: string) => {
  const newMessage: ChatMessage = {
   id: Date.now().toString(),
   from: "user",
   text: message,
   timestamp: new Date(),
  };

  setMessages((prev) => [...prev, newMessage]);

  // Simulate agent response
  setTimeout(() => {
   const agentResponse: ChatMessage = {
    id: (Date.now() + 1).toString(),
    from: "agent",
    text:
     "Perfect! I have some stunning villa options in that range. Let me show you our premium collections in Emirates Hills and Palm Jumeirah.",
    timestamp: new Date(),
   };
   setMessages((prev) => [...prev, agentResponse]);
  }, 1500);
 };

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

    {/* Chat Interface - Now shown inline on desktop, floating on mobile */}
    <motion.div
     initial={{ opacity: 0, y: 50 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8, delay: 0.6 }}
     className="max-w-lg mx-auto mb-12" // Hide on large screens
    >
     <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
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

   {/* Floating ChatBot - Shown after scrolling past hero section */}
   {showChatBot && (
    <ChatBot
     initialMessages={messages}
     onSendMessage={handleSendMessage}
     className="hidden lg:block" // Only show floating version on large screens
    />
   )}
  </section>
 );
};

export default HeroSection;
