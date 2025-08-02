"use client";
import React from "react";
import { ContactInfoCard } from "./ContactInfoCard";
import { motion } from "framer-motion";

const Information = () => {
 return (
  <motion.div
   initial={{ opacity: 0, x: 30 }}
   whileInView={{ opacity: 1, x: 0 }}
   transition={{ duration: 0.8 }}
   viewport={{ once: true }}
   className="space-y-6"
  >
   <ContactInfoCard
    icon="📍"
    title="Visit Our Office"
    description="Emaar Square, Downtown Dubai, UAE"
   />

   <ContactInfoCard icon="📞" title="Call Us" description="+971 4 367 2222" />

   <ContactInfoCard icon="📧" title="Email Us" description="villas@emaar.ae" />

   <ContactInfoCard
    icon="🕒"
    title="Business Hours"
    description={
     <>
      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
      <p>Saturday: 10:00 AM - 4:00 PM</p>
     </>
    }
   />
  </motion.div>
 );
};

export default Information;
