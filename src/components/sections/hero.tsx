
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import AnimatedTyping from '@/components/ui/animated-typing';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getSkills, getSettings } from '@/app/actions';

export default async function HeroSection() {
  const skillsData = await getSkills();
  const settings = await getSettings();
  const skills = skillsData.length > 0 ? skillsData.map(s => s.name) : ["Developer", "Problem Solver"];
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile');

  const name = settings.name || 'Your Name';
  const tagline = settings.tagline || 'Your Tagline';
  const resumeUrl = settings.resume_url || '';

  return (
    <section id="home" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a] pt-20">
      {/* Professional Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 text-center md:px-6">
        {profileImage && (
          <div className="relative mb-10 h-32 w-32 sm:h-40 sm:w-40 animate__animated animate__fadeIn">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-accent opacity-30 blur-lg"></div>
            <Image
              src={profileImage.imageUrl}
              alt={name}
              width={160}
              height={160}
              priority
              className="relative h-full w-full rounded-full border border-white/10 object-cover shadow-2xl"
              data-ai-hint={profileImage.imageHint}
            />
          </div>
        )}
        
        <div className="max-w-4xl space-y-6">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl animate__animated animate__fadeInUp">
            {name}
          </h1>
          
          <div className="space-y-2 animate__animated animate__fadeInUp animate__delay-1s">
            <p className="text-lg font-medium tracking-wide text-foreground/80 md:text-xl lg:text-2xl">
              {tagline}
            </p>
            <div className="h-8 text-lg font-semibold text-primary md:text-xl">
              <AnimatedTyping strings={skills} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row animate__animated animate__fadeInUp animate__delay-2s">
          <Button asChild size="lg" className="glow-btn h-12 px-8">
            <a href="#contact">
              <Send className="mr-2 h-4 w-4" />
              Get in Touch
            </a>
          </Button>
          {resumeUrl && (
            <Button asChild variant="outline" size="lg" className="h-12 border-white/10 px-8 hover:bg-white/5">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                View Resume
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Subtle decorative bottom gradient */}
      <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
