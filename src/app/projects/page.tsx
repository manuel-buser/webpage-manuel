'use client';

import { PageTransition } from '@/components/PageTransition';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

type Project = {
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

const projects: Project[] = [
  {
    eyebrow: 'Knowledge, Reasoning and Planning Seminar HS25 · University of Basel',
    title: 'Spider with Axioms',
    description:
      'Rewriting an IPC-2018 Spider Solitaire PDDL domain using derived ' +
      'predicates instead of zero-cost propagation actions. The interactive ' +
      'presentation includes a live Fast Downward race in your browser — same ' +
      'instance, both encodings, side by side.',
    tags: ['PDDL', 'Fast Downward', 'Classical Planning', 'Derived Predicates'],
    primary: {
      label: 'Open the presentation',
      href: 'https://manuel-buser.com/projects/spider-axioms/',
    },
    secondary: {
      label: 'View source',
      href: 'https://github.com/manuel-buser/Seminar_Knowledge_Reasoning_Planning_Project',
    },
  },
];

export default function ProjectsPage() {
  return (
    <PageTransition>
      <section className="min-h-screen py-24 sm:py-32 relative overflow-hidden">
        {/* Soft glowing orb backdrop */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, var(--primary), var(--secondary), transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.14, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <Container size="page" className="relative z-10">
          {/* Page header */}
          <div className="mb-16 sm:mb-20 text-center">
            <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-3 sm:mb-4">
              Selected work
            </p>
            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6 bg-[length:200%_200%] text-balance"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              Projects
            </motion.h1>
            <motion.div
              className="mx-auto h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Project cards */}
          <div className="grid gap-8 max-w-4xl mx-auto">
            {projects.map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/60 backdrop-blur-sm p-8 sm:p-10 card-hover hover:border-primary/40 transition-colors"
              >
                {/* hover glow */}
                <div
                  aria-hidden
                  className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="relative">
                  <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                    {project.eyebrow}
                  </p>

                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                    {project.title}
                  </h2>

                  <p className="text-foreground/70 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-muted/60 text-foreground/70 border border-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      href={project.primary.href}
                      variant="primary"
                      size="lg"
                    >
                      {project.primary.label}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    {project.secondary && (
                      <Button
                        href={project.secondary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="lg"
                      >
                        <GithubIcon className="w-4 h-4" />
                        {project.secondary.label}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}