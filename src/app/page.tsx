import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import SkillsSection from '@/components/sections/skills';
import CertificationsSection from '@/components/sections/certifications';
import ContactSection from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
    </div>
  );
}
