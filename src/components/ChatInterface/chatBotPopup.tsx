// components/ChatBot.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const messageSchema = z.object({
 message: z
  .string()
  .min(1, "Message cannot be empty")
  .max(500, "Message too long"),
});

type MessageForm = z.infer<typeof messageSchema>;

interface ChatMessage {
 id: string;
 from: "agent" | "user";
 text: string;
 timestamp: Date;
}

interface ChatBotProps {
 initialMessages?: ChatMessage[];
 onSendMessage: (message: string) => void;
 className?: string;
}

const defaultMessages: ChatMessage[] = [
 {
  id: "1",
  from: "agent",
  text:
   "Hello! 👋 I'm your luxury villa consultant. How can I assist you today?",
  timestamp: new Date(),
 },
];

const ChatBot = ({
 initialMessages = defaultMessages,
 onSendMessage,
 className = "",
}: ChatBotProps) => {
 const [isOpen, setIsOpen] = useState(false);
 const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
 const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
  setIsMounted(true);
  return () => setIsMounted(false);
 }, []);

 const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
 } = useForm<MessageForm>({
  resolver: zodResolver(messageSchema),
 });

 const onSubmit = async (data: MessageForm) => {
  if (!isMounted) return;

  // Add user message
  const userMessage: ChatMessage = {
   id: Date.now().toString(),
   from: "user",
   text: data.message,
   timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  reset();

  // Call parent handler
  onSendMessage(data.message);
 };

 // Auto-scroll to bottom when new messages arrive
 useEffect(() => {
  const chatContainer = document.getElementById("chat-messages");
  if (chatContainer) {
   chatContainer.scrollTop = chatContainer.scrollHeight;
  }
 }, [messages]);

 if (!isMounted) return null;

 return (
  <div className={`fixed bottom-6  right-6 z-50 ${className}`}>
   {/* Floating Chat Button */}
   <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 300 }}
    whileHover={{ scale: 1.05 }}
    className="relative"
   >
    <Button
     onClick={() => setIsOpen(!isOpen)}
     variant="luxury"
     size="lg"
     className="rounded-full w-16 h-16 shadow-xl"
     aria-label="Open chat"
    >
     <MessageCircle className="w-6 h-6" />
    </Button>

    {/* Online Status Indicator */}
    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
     <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-2 h-2 bg-green-500 rounded-full"
     />
    </div>
   </motion.div>

   {/* Chat Window */}
   <AnimatePresence>
    {isOpen && (
     <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute bottom-20 w-80 right-0 w-full max-w-md h-[500px]"
     >
      <Card className="w-full h-full flex flex-col border border-white/20 overflow-hidden shadow-2xl">
       {/* Chat Header */}
       <div className="p-4 bg-gradient-to-r from-primary to-primary/90 flex items-center justify-between">
        <div className="flex items-center space-x-3">
         <Avatar className="w-10 h-10 border-2 border-white/30">
          <AvatarImage src="/agent-jessica.jpg" />
          <AvatarFallback className="bg-white text-primary font-bold">
           JV
          </AvatarFallback>
         </Avatar>
         <div>
          <h3 className="font-semibold text-white">Jessica V.</h3>
          <p className="text-xs text-white/80">Luxury Villa Specialist</p>
         </div>
        </div>
        <div className="flex items-center space-x-2">
         <div className="flex items-center text-xs text-white/80">
          <span className="relative flex h-2 w-2 mr-1">
           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
           <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Online
         </div>
         <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 rounded-full"
          aria-label="Close chat"
         >
          <X className="w-4 h-4" />
         </Button>
        </div>
       </div>

       {/* Messages Container */}
       <div
        id="chat-messages"
        className="flex-1 p-4 overflow-y-auto space-y-4 bg-white/5 backdrop-blur-sm"
       >
        {messages.map((message) => (
         <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`flex ${
           message.from === "user" ? "justify-end" : "justify-start"
          }`}
         >
          <div
           className={`max-w-[85%] p-3 rounded-2xl ${
            message.from === "user"
             ? "bg-primary text-primary-foreground rounded-tr-none"
             : "bg-white text-gray-900 rounded-tl-none border border-gray-200"
           }`}
          >
           <p className="text-sm">{message.text}</p>
           <p
            className={`text-xs mt-1 ${
             message.from === "user"
              ? "text-primary-foreground/70"
              : "text-gray-500"
            }`}
           >
            {message.timestamp.toLocaleTimeString([], {
             hour: "2-digit",
             minute: "2-digit",
            })}
           </p>
          </div>
         </motion.div>
        ))}
       </div>

       {/* Message Input Form */}
       <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
         <div className="flex space-x-2">
          <Input
           {...register("message")}
           placeholder="Type your message..."
           className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 border border-black placeholer:text-black text-black focus-visible:ring-white/20"
           disabled={isSubmitting}
          />
          <Button
           type="submit"
           variant="luxury"
           size="default"
           className="px-4"
           disabled={isSubmitting}
          >
           <Send className="w-4 h-4" />
          </Button>
         </div>
         {errors.message && (
          <p className="text-xs text-red-300">{errors.message.message}</p>
         )}
        </form>
       </div>
      </Card>
     </motion.div>
    )}
   </AnimatePresence>
  </div>
 );
};

export default ChatBot;
