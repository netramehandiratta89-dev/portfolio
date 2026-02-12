'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { skillCategories } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function SkillsSection() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bars on component mount
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" className="w-full bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Technical Skills
            </h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A glimpse into my technical toolkit, from programming languages to development tools.
            </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={cn({
                'md:col-span-2 flex justify-center':
                  skillCategories.length % 2 !== 0 && index === skillCategories.length - 1,
              })}
            >
              <Card
                className={cn('glass-card w-full', {
                  'md:w-1/2':
                    skillCategories.length % 2 !== 0 &&
                    index === skillCategories.length - 1,
                })}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <category.icon className="h-8 w-8 text-primary" />
                  <CardTitle className="font-headline text-2xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between">
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-foreground/80">{skill.level}%</p>
                      </div>
                      <Progress value={(skill.level * progress) / 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
