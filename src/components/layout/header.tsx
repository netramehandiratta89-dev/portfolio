'use client';

import { useState, useEffect } from 'react';
import { socialLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import PillNav from '@/components/ui/PillNav';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({ settings }: { settings: { [key: string]: string } }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');
  
  const name = settings.name || 'Portfolio';
  const logoText = name.split(' ')[0] || 'C';

  const logoSvg = `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><style>.svg-text { font-family: "Space Grotesk", sans-serif; font-size: 24px; fill: white; font-weight: 700; } text { transform: translateY(2px); }</style><circle cx="24" cy="24" r="22" stroke="hsl(var(--primary))" stroke-width="2" fill="transparent"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="svg-text">${logoText.charAt(0)}</text></svg>`;
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      const sections = navLinks.map(link => document.querySelector(link.href));
      const homeSection = document.querySelector('#home');

      let currentSection = '#home';

      if (homeSection && window.scrollY < homeSection.clientHeight / 2) {
        currentSection = '#home';
      } else {
        for (const section of sections) {
          if (section && window.scrollY >= section.offsetTop - 100) {
            currentSection = `#${section.id}`;
          }
        }
      }
      setActiveHref(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b border-white/10 bg-background/50 backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <PillNav
            logo={logoDataUri}
            logoAlt={`${name}'s Logo`}
            items={navLinks}
            activeHref={activeHref}
        />
        <div className="hidden md:flex items-center gap-1">
          {socialLinks.map((link) => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name} 
               className="h-10 w-10 inline-flex items-center justify-center rounded-full text-foreground/80 transition-colors hover:text-primary hover:bg-primary/10">
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
