'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getCertifications } from '@/app/actions';
import { Award } from 'lucide-react';

type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
};

export default function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    getCertifications().then(data => setCertifications(data || []));
  }, []);

  if (certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="w-full bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Certifications & Achievements
          </h2>
          <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed">
            My commitment to continuous learning and professional growth.
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="relative pl-8 after:absolute after:inset-y-0 after:left-3.5 after:w-px after:bg-primary/20">
                {certifications.map((cert) => (
                  <div key={cert.id} className="relative grid grid-cols-[auto_1fr] items-start gap-x-4 pb-8 last:pb-0">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-background">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-bold leading-none">{cert.title}</h3>
                      <p className="text-sm text-foreground/80">{cert.issuer} &middot; {cert.date}</p>
                      <p className="text-sm text-foreground/70">{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
