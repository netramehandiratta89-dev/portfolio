'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { getProjects } from '@/app/actions';

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <Card className="glass-card group flex flex-col overflow-hidden h-full transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 bg-[#121212]/50">
      {project.imageUrl && (
        <div className="relative aspect-video overflow-hidden bg-black/40 border-b border-white/5">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
            data-ai-hint={project.imageHint || ''}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}
      <CardHeader className="space-y-2 flex-grow-0">
        <div className="flex items-start justify-between">
          <CardTitle className="font-headline text-xl font-bold text-white transition-colors group-hover:text-primary">
            {project.title}
          </CardTitle>
        </div>
        <CardDescription className="text-foreground/70 line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow pt-0 pb-6">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech: string) => (
            <Badge 
              key={tech} 
              variant="secondary" 
              className="bg-primary/10 text-primary-foreground border-primary/20 hover:bg-primary/20 text-[10px] uppercase tracking-wider font-semibold py-0.5"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-3 border-t border-white/5 bg-black/20 p-4">
        {project.githubUrl && (
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="text-foreground/60 hover:text-white hover:bg-white/5 transition-all h-9"
          >
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> Code
            </a>
          </Button>
        )}
        {project.liveDemoUrl && (
          <Button 
            size="sm" 
            asChild 
            className="glow-btn h-9 px-5 font-semibold"
          >
            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    getProjects().then((data) => setProjects(data || []));
  }, []);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="w-full bg-[#0a0a0a] py-20 md:py-32 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-primary/40 text-primary px-4 py-1 uppercase tracking-[0.2em] text-[10px] font-bold">
            My Portfolio
          </Badge>
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mt-2 mb-4" />
          <p className="max-w-[700px] text-foreground/60 text-lg leading-relaxed">
            A curated collection of my professional work, demonstrating expertise in full-stack development and creative problem solving.
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
