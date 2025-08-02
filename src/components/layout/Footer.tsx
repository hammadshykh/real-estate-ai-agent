"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
 const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "#", label: "Villa Collection" },
 ];

 const contactDetails = [
  { icon: "📍", text: "Emaar Square, Downtown Dubai, UAE" },
  { icon: "📧", text: "villas@emaar.ae" },
  { icon: "📞", text: "+971 4 367 2222" },
 ];

 return (
  <motion.footer
   initial={{ opacity: 0 }}
   whileInView={{ opacity: 1 }}
   transition={{ duration: 0.6 }}
   viewport={{ once: true }}
   className="bg-primary text-white py-16"
  >
   <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
     {/* Brand */}
     <div>
      <h3 className="text-2xl font-bold mb-4">EMAAR VILLAS</h3>
      <p className="text-gray-300 mb-4">
       {
        "Dubai's premier luxury villa collection by Emaar Properties. Discover exceptional living in the world s most vibrant city."
       }
      </p>
     </div>

     {/* Quick Links */}
     <div>
      <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2 text-gray-300">
       {quickLinks.map((link) => (
        <li key={link.href}>
         <Link
          href={link.href}
          className="hover:text-primary transition-colors"
         >
          {link.label}
         </Link>
        </li>
       ))}
      </ul>
     </div>

     {/* Contact */}
     <div>
      <h4 className="text-lg font-semibold mb-4">Contact Details</h4>
      <div className="space-y-3 text-gray-300">
       {contactDetails.map((contact, index) => (
        <div key={index} className="flex items-center space-x-2">
         <span>{contact.icon}</span>
         <span>{contact.text}</span>
        </div>
       ))}
      </div>
     </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
     <p>&copy; 2025 Emaar Villas | All rights reserved.</p>
    </div>
   </div>
  </motion.footer>
 );
};

export default Footer;
