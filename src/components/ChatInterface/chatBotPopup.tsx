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
 initialMessages: ChatMessage[];
 onSendMessage: (message: string) => Promise<void>;
 className?: string;
 isLoading: boolean;
}

const formatTime = (date: Date) => {
 return date.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
 });
};

const ChatBot = ({
 initialMessages = [],
 onSendMessage,
 className = "",
 isLoading,
}: ChatBotProps) => {
 const [isOpen, setIsOpen] = useState(false);
 const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
 const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
  setIsMounted(true);
  setMessages(initialMessages);
  return () => setIsMounted(false);
 }, [initialMessages]);

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
  try {
   await onSendMessage(data.message);
  } catch (error) {
   console.error("Failed to send message:", error);
  }
 };

 // Auto-scroll to bottom when new messages arrive
 useEffect(() => {
  const chatContainer = document.getElementById("chatbot-messages");
  if (chatContainer) {
   chatContainer.scrollTop = chatContainer.scrollHeight;
  }
 }, [messages]);

 if (!isMounted) return null;

 return (
  <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
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
     variant="premium"
     size="lg"
     className="rounded-full w-16 h-16 shadow-xl"
     aria-label="Open chat"
    >
     <MessageCircle className="w-6 h-6" />
    </Button>

    {/* Online Status Indicator */}
    <div className="absolute -top-1  -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
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
      className="absolute bottom-20  md:w-96 right-0 w-60 max-w-xs sm:max-w-sm h-[500px]"
     >
      <Card className="w-full h-full flex flex-col border border-white/20 overflow-hidden shadow-2xl bg-gradient-glass backdrop-blur-lg">
       {/* Chat Header */}
       <div className="p-4 bg-gradient-luxury flex items-center justify-between">
        <div className="flex items-center space-x-3">
         <Avatar className="w-10 h-10 border-2 border-white/30">
          <AvatarImage src="/agent-jessica.jpg" />
          <AvatarFallback className="bg-white text-primary font-bold">
           JV
          </AvatarFallback>
         </Avatar>
         <div>
          <h3 className="font-semibold text-white">Jessica Al-Mansouri</h3>
          <p className="text-xs text-white/80">
           Senior Luxury Villa Consultant
          </p>
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
        id="chatbot-messages"
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
             : "bg-white text-foreground rounded-tl-none border border-white/20"
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
            {formatTime(new Date(message.timestamp))}
           </p>
          </div>
         </motion.div>
        ))}

        {/* Loading indicator for agent response */}
        {isLoading && (
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
         >
          <div className="max-w-[85%] p-3 rounded-2xl bg-white text-foreground border border-white/20 rounded-tl-none">
           <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
           </div>
          </div>
         </motion.div>
        )}
       </div>

       {/* Message Input Form */}
       <div className="p-4 border-t border-white/10 bg-white/10 backdrop-blur-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
         <div className="flex space-x-2">
          <Input
           {...register("message")}
           placeholder="Ask about luxury villas..."
           className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
           disabled={isSubmitting || isLoading}
          />
          <Button
           type="submit"
           variant="premium"
           size="default"
           className="px-4"
           disabled={isSubmitting || isLoading}
          >
           {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
           ) : (
            <Send className="w-4 h-4" />
           )}
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
