import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin, Twitter, Mail } from "lucide-react";

const founders = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-Founder",
    image: "https://source.unsplash.com/random/400x400/?portrait&1",
    linkedin: "https://linkedin.com/in/sarah-johnson",
    twitter: "https://twitter.com/sarahjohnson",
    email: "sarah@skillseeker.com"
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-Founder",
    image: "https://source.unsplash.com/random/400x400/?portrait&2",
    linkedin: "https://linkedin.com/in/michael-chen",
    twitter: "https://twitter.com/michaelchen",
    email: "michael@skillseeker.com"
  },
  {
    name: "Emily Rodriguez",
    role: "Product Lead",
    image: "https://source.unsplash.com/random/400x400/?portrait&3",
    linkedin: "https://linkedin.com/in/emily-rodriguez",
    twitter: "https://twitter.com/emilyrodriguez",
    email: "emily@skillseeker.com"
  },
  {
    name: "David Kim",
    role: "Marketing Director",
    image: "https://source.unsplash.com/random/400x400/?portrait&4",
    linkedin: "https://linkedin.com/in/david-kim",
    twitter: "https://twitter.com/davidkim",
    email: "david@skillseeker.com"
  }
];

const FoundersSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-accent to-background">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Meet Our Founders
          </h2>
          <p className="text-muted-foreground text-lg">
            Bringing together decades of experience in tech and recruitment to revolutionize how people find their dream jobs.
          </p>
        </div>
        
        <div className="relative">
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-none">
            {founders.map((founder) => (
              <Card 
                key={founder.name} 
                className="group overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 w-[300px] snap-center hover:scale-[1.02]"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="w-20 h-20 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                        <AvatarImage 
                          src={founder.image} 
                          alt={founder.name} 
                          className="object-cover"
                          loading="lazy"
                        />
                        <AvatarFallback>{founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold">{founder.name}</h3>
                        <p className="text-muted-foreground">{founder.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      {[
                        { icon: Linkedin, href: founder.linkedin, label: "LinkedIn" },
                        { icon: Twitter, href: founder.twitter, label: "Twitter" },
                        { icon: Mail, href: `mailto:${founder.email}`, label: "Email" }
                      ].map(({ icon: Icon, href, label }) => (
                        <a 
                          key={label}
                          href={href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110"
                          aria-label={`Contact ${founder.name} via ${label}`}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
