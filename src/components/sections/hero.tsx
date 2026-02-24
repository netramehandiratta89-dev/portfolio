import { Button } from '@/components/ui/button';
import { Download, Send, Stars } from 'lucide-react';
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
    <section id="home" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#020617] pt-20">
      {/* Universe Theme Background */}
      <div className="absolute inset-0 z-0">
        {/* Deep Space Background */}
        <div className="absolute inset-0 bg-[#020617]" />
        
        {/* Nebula Glows */}
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px] animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-[150px]" />

        {/* CSS Starfield layers */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="stars-small absolute inset-0 opacity-40 animate-pulse" />
          <div className="stars-medium absolute inset-0 opacity-30 animate-pulse-slow" />
          <div className="stars-large absolute inset-0 opacity-20" />
        </div>

        {/* Subtle grid for professional feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 text-center md:px-6">
        {profileImage && (
          <div className="relative mb-10 h-32 w-32 sm:h-40 sm:w-40 animate__animated animate__fadeIn">
            {/* Profile Aura */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl animate-spin-slow"></div>
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
          <h1 className="font-headline text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl animate__animated animate__fadeInUp drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            {name}
          </h1>
          
          <div className="space-y-2 animate__animated animate__fadeInUp animate__delay-1s">
            <p className="text-lg font-medium tracking-wide text-foreground/80 md:text-xl lg:text-2xl">
              {tagline}
            </p>
            <div className="h-8 text-lg font-semibold text-primary md:text-xl flex items-center justify-center gap-3">
              <Stars className="h-5 w-5 opacity-60" />
              <AnimatedTyping strings={skills} />
              <Stars className="h-5 w-5 opacity-60" />
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
            <Button asChild variant="outline" size="lg" className="h-12 border-white/10 px-8 hover:bg-white/5 backdrop-blur-sm">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                View Resume
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Subtle decorative bottom gradient */}
      <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-[#020617] to-transparent" />
    </section>
  );
}