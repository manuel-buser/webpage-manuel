'use client';

import { useState } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Monitor, X } from 'lucide-react';

function FloatingParticle({
  delay,
  x,
  y,
  size,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
}) {
  return (
    <motion.div
      aria-hidden
      className="absolute rounded-full bg-primary/20 pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 4 + delay,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

const comingSoonParticles = [
  { delay: 0, x: '12%', y: '25%', size: 6 },
  { delay: 0.6, x: '85%', y: '20%', size: 7 },
  { delay: 1.1, x: '70%', y: '70%', size: 5 },
  { delay: 1.7, x: '22%', y: '75%', size: 6 },
  { delay: 0.9, x: '50%', y: '15%', size: 4 },
  { delay: 1.4, x: '92%', y: '55%', size: 5 },
];

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
  primary: { label: string; href: string; requiresLargeScreen?: boolean };
  secondary?: { label: string; href: string };
};

const SMALL_SCREEN_BREAKPOINT = 768;

const projects: Project[] = [
  {
    eyebrow: 'Knowledge, Reasoning and Planning Seminar MSc Spring Semester 2026 · University of Basel',
    title: 'Spider with Axioms',
    description:
      'Rewriting an IPC-2018 Spider Solitaire PDDL domain using derived ' +
      'predicates instead of zero-cost propagation actions. The interactive ' +
      'presentation includes a live Fast Downward race in your browser, same ' +
      'instance, both encodings, side by side.',
    tags: ['PDDL', 'Fast Downward', 'Classical Planning', 'Derived Predicates'],
    primary: {
      label: 'Open the presentation',
      href: 'https://manuel-buser.com/projects/spider-axioms/',
      requiresLargeScreen: true,
    },
    secondary: {
      label: 'View initial project',
      href: 'https://github.com/manuel-buser/Seminar_Knowledge_Reasoning_Planning_Project',
    },
  },
];

export default function ProjectsPage() {
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const handlePrimaryClick = (
    project: Project,
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (!project.primary.requiresLargeScreen) return;
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= SMALL_SCREEN_BREAKPOINT) return;
    e.preventDefault();
    setPendingHref(project.primary.href);
  };

  const closeModal = () => setPendingHref(null);

  const proceed = () => {
    if (pendingHref) window.location.href = pendingHref;
    setPendingHref(null);
  };

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
                      onClick={(e) => handlePrimaryClick(project, e)}
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

          {/* More to come */}
          <motion.div
            className="relative mt-12 sm:mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-dashed border-border/60 bg-surface/40 backdrop-blur-sm px-6 py-12 sm:px-10 sm:py-16 text-center">
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, var(--primary), var(--secondary), transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.06, 0.12, 0.06],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {comingSoonParticles.map((p, i) => (
                <FloatingParticle key={i} {...p} />
              ))}

              <div className="relative z-10">
                <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                  Stay tuned
                </p>
                <motion.h3
                  className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_200%] text-balance"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  More projects coming soon
                </motion.h3>
                <p className="mt-3 text-foreground/60 text-sm sm:text-base max-w-md mx-auto">
                  New work is being curated. Check back soon for what&apos;s next.
                </p>
                <motion.div
                  className="mt-6 mx-auto h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: '160px' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <AnimatePresence>
        {pendingHref && (
          <motion.div
            key="screen-size-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="screen-size-modal-title"
            aria-describedby="screen-size-modal-description"
          >
            <button
              type="button"
              aria-label="Close dialog"
              onClick={closeModal}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-default"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative w-full max-w-md rounded-2xl border border-border/60 bg-surface/95 backdrop-blur-md shadow-2xl p-6 sm:p-8"
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="absolute top-3 right-3 p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-4 mb-5">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h2
                    id="screen-size-modal-title"
                    className="text-lg sm:text-xl font-semibold text-foreground mb-1"
                  >
                    Best viewed on a larger screen
                  </h2>
                  <p
                    id="screen-size-modal-description"
                    className="text-sm sm:text-base text-foreground/70 leading-relaxed"
                  >
                    This presentation is optimised for desktop and tablet
                    displays. On smaller devices, some interactive elements may
                    not render as intended. For the best experience, please
                    revisit the page on a larger screen.
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
                <Button variant="outline" size="md" onClick={closeModal}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" onClick={proceed}>
                  Continue anyway
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}