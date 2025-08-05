// components/ChatInterface.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Phone } from "lucide-react";
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

export interface ChatMessage {
 id: string;
 from: "agent" | "user";
 text: string;
 timestamp: Date;
}

interface ChatInterfaceProps {
 messages: ChatMessage[];
 onSendMessage: (message: string) => Promise<void>;
 isLoading: boolean;
}

const formatTime = (date: Date) => {
 return date.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
 });
};

const ChatInterface = ({
 messages,
 onSendMessage,
 isLoading,
}: ChatInterfaceProps) => {
 const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
 } = useForm<MessageForm>({
  resolver: zodResolver(messageSchema),
 });

 const onSubmit = async (data: MessageForm) => {
  try {
   await onSendMessage(data.message);
   reset();
  } catch (error) {
   console.error("Failed to send message:", error);
  }
 };

 return (
  <Card className="shadow-glass backdrop-blur-lg bg-gradient-glass border border-white/20 overflow-hidden">
   {/* Chat Header */}
   <div className="relative p-6 bg-gradient-luxury">
    <div className="flex items-center space-x-4">
     <div className="relative">
      <Avatar className="w-12 h-12 border-2 border-white/30">
       <AvatarImage src="/placeholder.svg" />
       <AvatarFallback className="bg-white text-primary font-semibold">
        J
       </AvatarFallback>
      </Avatar>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
       <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-full h-full bg-green-400 rounded-full"
       />
      </div>
     </div>

     <div className="flex-1 text-left">
      <h3 className="font-semibold text-white text-lg">Jessica Al-Mansouri</h3>
      <p className="text-white/80 text-sm">Senior Luxury Villa Consultant</p>
      <div className="flex items-center mt-1 space-x-2">
       <div className="w-2 h-2 bg-green-400 rounded-full" />
       <span className="text-xs text-white/70">
        Online • Responds in minutes
       </span>
      </div>
     </div>

     <Button variant="glass" size="sm" className="rounded-full">
      <Phone className="w-4 h-4" />
     </Button>
    </div>
   </div>

   {/* Chat Messages */}
   <div className="h-72 p-6 overflow-y-auto space-y-4 bg-white/5 backdrop-blur-sm">
    {messages.map((message, index) => (
     <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`flex ${
       message.from === "user" ? "justify-end" : "justify-start"
      }`}
     >
      <div
       className={`max-w-[80%] p-4 rounded-2xl shadow-card ${
        message.from === "user"
         ? "bg-primary text-primary-foreground"
         : "bg-white text-foreground border border-white/20"
       }`}
      >
       <p className="text-sm leading-relaxed">{message.text}</p>
       <p className="text-xs opacity-70 mt-2">
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
      <div className="max-w-[80%] p-4 rounded-2xl bg-white text-foreground border border-white/20">
       <div className="flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
       </div>
      </div>
     </motion.div>
    )}
   </div>

   {/* Chat Input */}
   <div className="p-6 bg-white/10 backdrop-blur-sm border-t border-white/10">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
     <div className="flex space-x-3">
      <Input
       {...register("message")}
       placeholder="Ask me about luxury villas..."
       className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
       disabled={isLoading}
      />
      <Button
       type="submit"
       variant="premium"
       size="sm"
       className="px-6"
       disabled={isLoading}
      >
       <Send className="w-4 h-4" />
      </Button>
     </div>
     {errors.message && (
      <p className="text-sm text-red-300">{errors.message.message}</p>
     )}
    </form>
   </div>
  </Card>
 );
};

export default ChatInterface;
