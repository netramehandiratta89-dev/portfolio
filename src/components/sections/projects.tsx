'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { getProjects } from '@/app/actions';
import '@/components/ui/ProfileCard.css';
import ElectricBorder from '@/components/ui/ElectricBorder';

// ---- Tilt Logic from ProfileCard ----
const ANIMATION_CONFIG = {
  ENTER_TRANSITION_MS: 180
};
const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

function useTilt(enableTilt = true) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<NodeJS.Timeout | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo(() => {
      if (!enableTilt) return null;

      let rafId: number | null = null;
      let running = false;
      let lastTs = 0;
      let currentX = 0;
      let currentY = 0;
      let targetX = 0;
      let targetY = 0;

      const DEFAULT_TAU = 0.14;

      const setVarsFromXY = (x: number, y: number) => {
        const shell = shellRef.current;
        const wrap = wrapRef.current;
        if (!shell || !wrap) return;

        const width = shell.clientWidth || 1;
        const height = shell.clientHeight || 1;

        const percentX = clamp((100 / width) * x);
        const percentY = clamp((100 / height) * y);

        const centerX = percentX - 50;
        const centerY = percentY - 50;

        const properties: Record<string, string> = {
          '--pointer-x': `${percentX}%`,
          '--pointer-y': `${percentY}%`,
          '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
          '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
          '--pointer-from-center': `${clamp(Math.hypot(centerY, centerX) / 50, 0, 1)}`,
          '--rotate-x': `${round(-(centerY / 5))}deg`,
          '--rotate-y': `${round(centerX / 4)}deg`,
        };
        
        for (const [k, v] of Object.entries(properties)) {
          wrap.style.setProperty(k, v);
        }
      };

      const step = (ts: number) => {
        if (!running) return;
        if (lastTs === 0) lastTs = ts;
        const dt = (ts - lastTs) / 1000;
        lastTs = ts;

        const tau = DEFAULT_TAU;
        const k = 1 - Math.exp(-dt / tau);

        currentX += (targetX - currentX) * k;
        currentY += (targetY - currentY) * k;

        setVarsFromXY(currentX, currentY);

        const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

        if (stillFar || document.hasFocus()) {
          rafId = requestAnimationFrame(step);
        } else {
          running = false;
          lastTs = 0;
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      };

      const start = () => {
        if (running) return;
        running = true;
        lastTs = 0;
        rafId = requestAnimationFrame(step);
      };

      return {
        setTarget(x: number, y: number) {
          targetX = x;
          targetY = y;
          start();
        },
        toCenter() {
          const shell = shellRef.current;
          if (!shell) return;
          this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
        },
        getCurrent() {
          return { x: currentX, y: currentY, tx: targetX, ty: targetY };
        },
        cancel() {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = null;
          running = false;
          lastTs = 0;
        },
      };
  }, [enableTilt]);

  const getOffsets = (evt: MouseEvent, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback((event: MouseEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    }, [tiltEngine]);

  const handlePointerEnter = useCallback((event: MouseEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      shell.classList.add('active');
      shell.classList.add('entering');
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      enterTimerRef.current = setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    }, [tiltEngine]);

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;

    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        if(leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
        leaveRafRef.current = null;
        shell.classList.remove('active');
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;
    const shell = shellRef.current;
    if (!shell) return;
    
    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
    };

  }, [enableTilt, tiltEngine, handlePointerMove, handlePointerEnter, handlePointerLeave]);
  
  return { wrapRef, shellRef };
}


const ProjectCard = ({ project }: { project: any }) => {
  const { wrapRef, shellRef } = useTilt();
  const cardStyle = {
    '--inner-gradient': 'linear-gradient(145deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--accent) / 0.1) 100%)',
    '--behind-glow-color': 'hsl(var(--primary) / 0.6)',
  };

  return (
     <div ref={wrapRef} className="pc-card-wrapper h-full" style={cardStyle}>
      <div className="pc-behind" />
        <div ref={shellRef} className="pc-card-shell h-full">
            <div className="pc-card h-full">
               <div className="pc-inside">
                  <div className="pc-shine" />
                  <div className="pc-glare" />
                  <Card className="glass-card group flex flex-col overflow-hidden h-full bg-transparent border-0 shadow-none">
                    {project.imageUrl && (
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={project.imageHint || ''}
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="font-headline text-xl text-white text-left">{project.title}</CardTitle>
                      <CardDescription className="text-white/70 pt-2 break-words text-left">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech: string) => (
                          <Badge key={tech} variant="secondary" className='text-white/80 bg-white/10 border-white/20'>{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 bg-black/10 p-4">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> GitHub
                          </a>
                        </Button>
                      )}
                      {project.liveDemoUrl && (
                        <Button size="sm" asChild>
                          <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>
            </div>
        </div>
    </div>
  );
};


export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    getProjects().then((data) => setProjects(data || []));
  }, []);

  return (
    <section id="projects" className="w-full bg-muted/20 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            My Projects
          </h2>
          <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Here are some of the projects I've worked on, showcasing my passion for development and problem-solving.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
              <ElectricBorder key={project.id} color="hsl(var(--primary))" borderRadius={24}>
                 <ProjectCard project={project} />
              </ElectricBorder>
            ))}
        </div>
      </div>
    </section>
  );
}
