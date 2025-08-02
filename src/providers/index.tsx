// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner, Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
 return (
  <QueryClientProvider client={queryClient}>
   <TooltipProvider>
    <Toaster />
    <Sonner />
    {children}
   </TooltipProvider>
  </QueryClientProvider>
 );
}
