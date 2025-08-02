// app/contact/page.tsx
import { ContactHero } from "@/components/modules/contact/ContactHero";
import { ContactForm } from "@/components/modules/contact/ContactForm";
import { ContactInfoCard } from "@/components/modules/contact/ContactInfoCard";
import Information from "@/components/modules/contact/Information";

export default function ContactPage() {
 return (
  <div className="min-h-screen flex flex-col">
   <ContactHero />

   {/* Contact Section */}
   <section className="py-16 flex-1">
    <div className="max-w-7xl mx-auto px-6">
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Contact Form */}

      <ContactForm />

      {/* Contact Information */}
      <Information />
     </div>
    </div>
   </section>
  </div>
 );
}
