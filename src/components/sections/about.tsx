import { getSettings } from '@/app/actions';
import ProfileCard from '@/components/ui/ProfileCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ElectricBorder from '@/components/ui/ElectricBorder';

export default async function AboutSection() {
  const settings = await getSettings();
  const aboutIntro = settings.about_intro || 'A little bit about me...';
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile');

  const name = settings.name || 'Your Name';
  const tagline = settings.tagline || 'Your Tagline';
  
  return (
    <section id="about" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Me
            </h2>
            <p className="max-w-xl mx-auto lg:mx-0 text-foreground/80 md:text-lg">{aboutIntro}</p>
          </div>
          <div className="flex justify-center">
            <ElectricBorder color="hsl(var(--primary))" borderRadius={24}>
              <ProfileCard
                avatarUrl={profileImage?.imageUrl}
                name={name}
                title={tagline}
                showUserInfo={false}
              />
            </ElectricBorder>
          </div>
        </div>
      </div>
    </section>
  );
}
