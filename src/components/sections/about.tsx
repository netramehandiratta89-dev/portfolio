import { getSettings } from '@/app/actions';

export default async function AboutSection() {
  const settings = await getSettings();
  const aboutIntro = settings.about_intro || 'A little bit about me...';
  
  return (
    <section id="about" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-1">
          <div className="space-y-6 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Me
            </h2>
            <p className="max-w-3xl mx-auto text-foreground/80 md:text-lg">{aboutIntro}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
