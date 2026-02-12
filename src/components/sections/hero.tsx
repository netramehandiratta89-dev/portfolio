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
    <section id="home" className="relative flex h-[calc(100vh-80px)] min-h-[700px] w-full items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#222,transparent)]" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 text-center md:px-6">
        {profileImage && (
          <Image
            src={profileImage.imageUrl}
            alt={name}
            width={200}
            height={200}
            priority
            className="mb-6 rounded-lg object-cover shadow-lg"
            data-ai-hint={profileImage.imageHint}
          />
        )}
        <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
          {name}
        </h1>
        <p className="mt-4 max-w-[700px] text-lg text-foreground/80 md:text-xl">
          {tagline}
        </p>
        <div className="mt-2 h-8 text-lg text-primary md:text-xl">
          <AnimatedTyping strings={skills} />
        </div>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
            <a href="#contact">
              <Send className="mr-2 h-5 w-5" />
              Contact Me
            </a>
          </Button>
          {resumeUrl && (
            <Button asChild variant="secondary" size="lg">
              <a href={resumeUrl} download>
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
