'use client';

import { Code } from 'lucide-react';
import { socialLinks } from '@/lib/data';
import { LogoLoop } from '@/components/ui/LogoLoop';


export default function Footer({ settings }: { settings: { [key: string]: string } }) {
  const currentYear = new Date().getFullYear();
  const name = settings.name || 'User';

  const socialLogos = socialLinks.map(link => ({
    ...link,
    href: link.url,
    ariaLabel: link.name,
  }));

  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <p className="font-headline text-lg font-bold">CodeVertex</p>
        </div>
        <div className="text-center text-sm text-foreground/60">
          &copy; {currentYear} {name}. All rights reserved.
        </div>
        <div className="w-48">
          <LogoLoop
            logos={socialLogos}
            speed={40}
            logoHeight={24}
            gap={64}
            pauseOnHover={true}
            renderItem={(item, key) => (
               <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.name} key={key}>
                <item.icon className="h-6 w-6 text-foreground/80 transition-colors hover:text-primary" />
              </a>
            )}
          />
        </div>
      </div>
    </footer>
  );
}
