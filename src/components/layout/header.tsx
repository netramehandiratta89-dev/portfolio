'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import PillNav from '@/components/ui/PillNav';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({ settings }: { settings: { [key: string]: string } }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const name = settings.name || 'Portfolio';
  const logoText = name.split(' ')[0] || 'C';

  const logoSvg = `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><style>.svg-text { font-family: "Space Grotesk", sans-serif; font-size: 24px; fill: hsl(var(--foreground)); font-weight: 700; } text { transform: translateY(2px); }</style><circle cx="24" cy="24" r="22" stroke="hsl(var(--primary))" stroke-width="2" fill="transparent"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="svg-text">${logoText.charAt(0)}</text></svg>`;
  const logoDataUri = `data:image/svg+xml;base64,${typeof window !== 'undefined' ? window.btoa(unescape(encodeURIComponent(logoSvg))) : Buffer.from(logoSvg).toString('base64')}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active link detection
      let currentSection = '';
      const sections = navLinks.map(link => document.querySelector(link.href));
      
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = navLinks[index].href;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        <PillNav
          logo={logoDataUri}
          logoAlt={`${name}'s Logo`}
          items={navLinks}
          activeHref={activeSection}
          baseColor="hsl(var(--primary))"
          pillColor="hsl(var(--background))"
          pillTextColor="hsl(var(--foreground))"
          hoveredPillTextColor="hsl(var(--primary-foreground))"
        />
      </div>
    </header>
  );
}
