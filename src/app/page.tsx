// app/page.tsx
import BrandingSection from "@/components/BrandingSection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
 return (
  <div className="min-h-screen flex flex-col">
   <HeroSection />
   <BrandingSection />
  </div>
 );
}
