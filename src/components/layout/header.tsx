'use client';

import { socialLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import StaggeredMenu from '@/components/ui/StaggeredMenu';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({ settings }: { settings: { [key: string]: string } }) {
  const name = settings.name || 'Portfolio';
  const logoText = name.split(' ')[0] || 'C';

  const logoSvg = `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><style>.svg-text { font-family: "Space Grotesk", sans-serif; font-size: 24px; fill: white; font-weight: 700; } text { transform: translateY(2px); }</style><circle cx="24" cy="24" r="22" stroke="hsl(var(--primary))" stroke-width="2" fill="transparent"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="svg-text">${logoText.charAt(0)}</text></svg>`;
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

  const menuItems = navLinks.map(item => ({ label: item.label, link: item.href }));
  const socialItems = socialLinks.map(item => ({ label: item.name, link: item.url }));

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 bg-transparent'
      )}
    >
      <StaggeredMenu
          isFixed={true}
          logoUrl={logoDataUri}
          items={menuItems}
          socialItems={socialItems}
          menuButtonColor="hsl(var(--foreground))"
          openMenuButtonColor="hsl(var(--foreground))"
          accentColor="hsl(var(--primary))"
          colors={['hsl(var(--background))', 'hsl(var(--muted))']}
      />
    </header>
  );
}
