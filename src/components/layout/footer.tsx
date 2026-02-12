import Link from 'next/link';
import { socialLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <p className="font-headline text-lg font-bold">CodeVertex</p>
        </div>
        <div className="text-center text-sm text-foreground/60">
          &copy; {currentYear} netra Mehandiratta. All rights reserved.
        </div>
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <Button key={link.name} variant="ghost" size="icon" asChild>
              <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                <link.icon className="h-5 w-5 text-foreground/80 transition-colors hover:text-primary" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
