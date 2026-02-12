import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { about, aboutSkills } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Me
            </h2>
            <p className="text-foreground/80 md:text-lg">{about.intro}</p>
            <div className="flex flex-wrap gap-2">
              {aboutSkills.map((skill) => (
                <Badge key={skill.name} variant="secondary" className="gap-2 px-3 py-1 text-sm">
                  <skill.icon className="h-4 w-4 text-primary" />
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-primary/20">
                  {about.education.map((edu) => (
                    <div key={edu.institution} className="relative mb-6 last:mb-0">
                      <div className="absolute -left-[35px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-background">
                         <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                            <edu.icon className="h-4 w-4 text-primary" />
                          </div>
                      </div>
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-sm text-foreground/80">{edu.institution}</p>
                      <p className="text-xs text-foreground/60">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
