import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import EducationSection from '@/components/sections/education';
import SkillsSection from '@/components/sections/skills';
import ProjectsSection from '@/components/sections/projects';
import CertificationsSection from '@/components/sections/certifications';
import ContactSection from '@/components/sections/contact';
import { getSettings, getEducation } from './actions';

export default async function Home() {
  const settings = await getSettings();
  const education = await getEducation();
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <EducationSection education={education} />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection settings={settings} />
    </div>
  );
}
