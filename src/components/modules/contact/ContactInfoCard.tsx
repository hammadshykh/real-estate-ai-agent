// components/contact/ContactInfoCard.tsx
import { Card, CardContent } from "@/components/ui/card";

interface ContactInfoCardProps {
 icon: string;
 title: string;
 description: string | React.ReactNode;
}

export function ContactInfoCard({
 icon,
 title,
 description,
}: ContactInfoCardProps) {
 return (
  <Card className="shadow-elegant border-none">
   <CardContent className="p-6">
    <div className="flex items-start space-x-4">
     <div className="text-2xl mt-1">{icon}</div>
     <div>
      <h3 className="font-semibold text-black">{title}</h3>
      <div className="text-muted-foreground">{description}</div>
     </div>
    </div>
   </CardContent>
  </Card>
 );
}
