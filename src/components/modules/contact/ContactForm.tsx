// components/contact/ContactForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const formSchema = z.object({
 name: z.string().min(2, {
  message: "Name must be at least 2 characters.",
 }),
 email: z.string().email({
  message: "Please enter a valid email address.",
 }),
 phone: z.string().min(10, {
  message: "Phone number must be at least 10 digits.",
 }),
 message: z.string().min(10, {
  message: "Message must be at least 10 characters.",
 }),
});

export function ContactForm() {
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   name: "",
   email: "",
   phone: "",
   message: "",
  },
 });

 function onSubmit(values: z.infer<typeof formSchema>) {
  console.log("Form submitted:", values);
  toast.success("Message Sent!", {
   description:
    "Thank you for your inquiry. Our team will contact you within 24 hours.",
  });
  form.reset();
 }

 return (
  <motion.div
   initial={{ opacity: 0, x: -30 }}
   whileInView={{ opacity: 1, x: 0 }}
   transition={{ duration: 0.8 }}
   viewport={{ once: true }}
  >
   <Card className="shadow-elegant border-none">
    <CardHeader>
     <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
    </CardHeader>
    <CardContent>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
       <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Full Name</FormLabel>
          <FormControl>
           <Input placeholder="John Smith" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
           <Input placeholder="john@example.com" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <FormControl>
           <Input placeholder="+971 50 123 4567" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Your Message</FormLabel>
          <FormControl>
           <Textarea
            placeholder="Tell us about your villa requirements..."
            rows={5}
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <Button type="submit" variant="luxury" size="lg" className="w-full">
        Send Message
       </Button>
      </form>
     </Form>
    </CardContent>
   </Card>
  </motion.div>
 );
}
