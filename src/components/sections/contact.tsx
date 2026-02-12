'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Smartphone } from 'lucide-react';
import { contactInfo, socialLinks } from '@/lib/data';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full bg-muted/20 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Get in Touch
          </h2>
          <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed">
            Have a question or want to work together? Feel free to reach out.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <div className="space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                  <span>{contactInfo.email}</span>
                </a>
                <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                  <Smartphone className="h-6 w-6 text-primary" />
                  <span>{contactInfo.phone}</span>
                </a>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Find me on</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap justify-center gap-4">
                {socialLinks.map((link) => (
                    <Button key={link.name} variant="outline" size="lg" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <link.icon className="mr-2 h-5 w-5" />
                        {link.name}
                      </a>
                    </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
