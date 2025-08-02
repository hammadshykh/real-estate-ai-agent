// components/Header.tsx
"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Header = () => {
 const [isScrolled, setIsScrolled] = useState(false);
 const pathname = usePathname();
 const { scrollY } = useScroll();

 const navLinks = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
 ];

 // Handle scroll effect only on home page
 useMotionValueEvent(scrollY, "change", (latest) => {
  if (pathname === "/") {
   setIsScrolled(latest > 100); // Change this value based on your hero section height
  }
 });

 // Set initial state based on current route
 useEffect(() => {
  setIsScrolled(pathname !== "/");
 }, [pathname]);

 // Determine text color based on scroll state and route
 const textColor = isScrolled ? "text-foreground" : "text-white";
 const hoverColor = isScrolled ? "hover:text-primary" : "hover:text-white/70";
 const logoColor = isScrolled ? "text-foreground" : "text-white";

 return (
  <motion.header
   initial={{ opacity: 0, y: -20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.6 }}
   className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
    isScrolled
     ? "bg-white/90 backdrop-blur-sm shadow-sm"
     : "bg-transparent backdrop-blur-sm"
   }`}
  >
   <div className="max-w-7xl mx-auto px-6 py-4">
    <nav className="flex items-center justify-between">
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={`text-2xl font-bold ${logoColor} transition-colors duration-300`}
     >
      <Link href="/">EMAAR VILLAS</Link>
     </motion.div>

     <div className="hidden items-center space-x-8">
      {navLinks.map((link, index) => (
       <motion.div
        key={link.href}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1 }}
       >
        <Link
         href={link.href}
         className={`${textColor} ${hoverColor} transition-colors duration-300 font-medium`}
        >
         {link.label}
        </Link>
       </motion.div>
      ))}
     </div>

     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
     >
      <Button
       variant={isScrolled ? "default" : "glass"}
       size="sm"
       className="transition-colors duration-300"
      >
       Get Started
      </Button>
     </motion.div>
    </nav>
   </div>
  </motion.header>
 );
};

export default Header;
