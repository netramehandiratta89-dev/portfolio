'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Code } from 'lucide-react';
import { socialLinks, personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const NavMenu = ({ isMobile }: { isMobile?: boolean }) => (
    <nav
      className={cn(
        'flex items-center gap-4',
        isMobile ? 'flex-col items-start' : 'hidden md:flex'
      )}
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={handleLinkClick}
          className="font-medium text-foreground/80 transition-colors hover:text-primary"
        >
          {link.label}
        </Link>
      ))}
      <div className={cn("flex items-center gap-2", isMobile ? 'pt-4 flex-wrap' : 'pl-4')}>
        {socialLinks.map((link) => (
          <Button key={link.name} variant="ghost" size="icon" asChild>
            <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
              <link.icon className="h-5 w-5 text-foreground/80 hover:text-primary" />
            </a>
          </Button>
        ))}
      </div>
    </nav>
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b border-white/10 bg-background/50 backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold">
          <Code className="h-7 w-7 text-primary" />
          <span>{personalInfo.name.split(' ')[0]}</span>
        </Link>

        <NavMenu />

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background/90 backdrop-blur-xl">
              <div className="flex h-full flex-col p-6 pt-16">
                <NavMenu isMobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
