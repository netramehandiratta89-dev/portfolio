'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { socialLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({ settings }: { settings: { [key: string]: string } }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const name = settings.name || 'Portfolio';
  const logoText = name.split(' ')[0] || 'C';

  const logoSvg = `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><style>.svg-text { font-family: "Space Grotesk", sans-serif; font-size: 24px; fill: hsl(var(--foreground)); font-weight: 700; } text { transform: translateY(2px); }</style><circle cx="24" cy="24" r="22" stroke="hsl(var(--primary))" stroke-width="2" fill="transparent"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="svg-text">${logoText.charAt(0)}</text></svg>`;
  const logoDataUri = `data:image/svg+xml;base64,${typeof window !== 'undefined' ? window.btoa(unescape(encodeURIComponent(logoSvg))) : Buffer.from(logoSvg).toString('base64')}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors duration-300',
        isScrolled ? 'bg-background/80 border-b border-border/50 backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Homepage">
          <img src={logoDataUri} alt="logo" className="h-12 w-12" />
          <span className="font-headline text-lg font-bold hidden sm:inline-block">{name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
                <Link
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary px-3 py-2"
                >
                {link.label}
                </Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background/90 backdrop-blur-lg">
              <div className="flex flex-col h-full p-6">
                <Link href="/" className="mb-8 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                   <img src={logoDataUri} alt="logo" className="h-12 w-12" />
                   <span className="font-headline text-lg font-bold">{name}</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xl font-medium text-foreground/80 transition-colors hover:text-primary py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex justify-center gap-4 border-t border-border pt-6">
                    {socialLinks.map((link) => (
                        <Button key={link.name} variant="ghost" size="icon" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                            <link.icon className="h-6 w-6 text-foreground/80 transition-colors hover:text-primary" />
                        </a>
                        </Button>
                    ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
