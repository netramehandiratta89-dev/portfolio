import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import AnimatedTyping from '@/components/ui/animated-typing';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getSkills, getSettings } from '@/app/actions';
import FuzzyText from '@/components/ui/fuzzy-text';

export default async function HeroSection() {
  const skillsData = await getSkills();
  const settings = await getSettings();
  const skills = skillsData.length > 0 ? skillsData.map(s => s.name) : ["Developer", "Problem Solver"];
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile');

  const name = settings.name || 'Your Name';
  const tagline = settings.tagline || 'Your Tagline';
  const resumeUrl = settings.resume_url || '';

  return (
    <section id="home" className="relative flex h-[calc(100vh-80px)] min-h-[600px] w-full items-center justify-center pt-20 sm:min-h-[700px]">
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
            className="mb-6 h-36 w-36 rounded-lg object-cover shadow-lg sm:h-48 sm:w-48"
            data-ai-hint={profileImage.imageHint}
          />
        )}
        <div className="h-24 sm:h-32 md:h-40 lg:h-48 flex items-center justify-center">
            <FuzzyText
              fontSize="clamp(2.5rem, 10vw, 8rem)"
              fontWeight={700}
              fontFamily="Space Grotesk"
              color="#FFFFFF"
              baseIntensity={0.1}
              hoverIntensity={0.25}
              glitchMode={true}
              glitchInterval={3000}
              glitchDuration={300}
              clickEffect={true}
              letterSpacing={-5}
            >
              {name}
            </FuzzyText>
        </div>

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
            <Button asChild size="lg" className="glow-btn">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
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
