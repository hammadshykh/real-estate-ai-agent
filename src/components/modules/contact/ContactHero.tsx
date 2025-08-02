// components/contact/ContactHero.tsx
"use client";

import { motion } from "framer-motion";

export function ContactHero() {
 return (
  <section className="py-32 pb-20 bg-primary bg-gradient-to-b from-primary/5 to-background">
   <div className="max-7xl mx-auto px-6">
    <motion.div
     initial={{ opacity: 0, y: 30 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8 }}
     className="text-center max-w-4xl mx-auto"
    >
     <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
      Contact Our Luxury Villa Specialists
     </h1>
     <p className="text-lg md:text-xl text-muted-foreground">
      Ready to find your dream villa? Get in touch with our dedicated team of
      luxury property consultants.
     </p>
    </motion.div>
   </div>
  </section>
 );
}
