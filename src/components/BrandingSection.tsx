"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const highlights = [
 {
  title: "Premium Locations",
  description:
   "Exclusive neighborhoods including Emirates Hills, Palm Jumeirah, and Dubai Hills Estate",
  icon: "🏖️",
 },
 {
  title: "Luxury Amenities",
  description:
   "Private pools, smart home systems, premium finishes, and world-class facilities",
  icon: "🏊‍♂️",
 },
 {
  title: "Emaar Quality",
  description:
   "Award-winning developer with 25+ years of excellence in luxury real estate",
  icon: "🏆",
 },
 {
  title: "Investment Value",
  description:
   "High ROI potential with Dubai's growing luxury real estate market",
  icon: "📈",
 },
];

const BrandingSection = () => {
 return (
  <section className="py-20 bg-muted/30">
   <div className="max-w-7xl mx-auto px-6">
    <motion.div
     initial={{ opacity: 0, y: 30 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8 }}
     viewport={{ once: true }}
     className="text-center mb-16"
    >
     <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
      <span className="text-primary font-medium">EMAAR PROPERTIES</span>
     </div>
     <h2 className="text-section font-bold text-primary mb-6">
      {"Dubai's Premier Villa Collection"}
     </h2>
     <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
      {
       "Since 1997, Emaar Properties has been synonymous with luxury living in Dubai. Our villas represent the pinnacle of contemporary design, offering an unparalleled lifestyle in the world's most dynamic city."
      }
     </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
     {highlights.map((highlight, index) => (
      <motion.div
       key={highlight.title}
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, delay: index * 0.1 }}
       viewport={{ once: true }}
      >
       <Card className="h-full hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-card group">
        <CardContent className="p-8 text-center">
         <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
          {highlight.icon}
         </div>
         <h3 className="text-xl font-semibold text-primary mb-4">
          {highlight.title}
         </h3>
         <p className="text-muted-foreground leading-relaxed">
          {highlight.description}
         </p>
        </CardContent>
       </Card>
      </motion.div>
     ))}
    </div>

    <motion.div
     initial={{ opacity: 0, y: 30 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8, delay: 0.4 }}
     viewport={{ once: true }}
     className="mt-20"
    >
     <Card className="bg-gradient-luxury border-0 shadow-luxury">
      <CardContent className="p-12 text-center text-white">
       <h3 className="text-3xl font-bold mb-6">
        Ready to Find Your Dream Villa?
       </h3>
       <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
        Connect with our luxury property specialists for personalized
        recommendations tailored to your lifestyle and investment goals
       </p>
       <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
         <span className="text-lg">📧</span>
         <span className="font-medium">villas@emaar.ae</span>
        </div>
        <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
         <span className="text-lg">📞</span>
         <span className="font-medium">+971 4 367 2222</span>
        </div>
       </div>
      </CardContent>
     </Card>
    </motion.div>
   </div>
  </section>
 );
};
export default BrandingSection;
