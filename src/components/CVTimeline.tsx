'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Download } from 'lucide-react';
import { experiences, education } from '@/data/cv-data';
import { TimelineItem } from './TimelineItem';
import { Button } from './ui/Button';
import { animateProgressLine } from '@/lib/animations/gsap-utils';
import { supportsWebGL } from '@/lib/utils';

const TimelineScene = dynamic(() => import('./TimelineScene'), {
  ssr: false,
  loading: () => null,
});

export function CVTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(false);
  const [sceneVisible, setSceneVisible] = useState(false);

  useEffect(() => {
    if (!supportsWebGL() || !sectionRef.current) return;
    setHasWebGL(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSceneVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lineRef.current) {
      animateProgressLine(lineRef.current);
    }
  }, []);

  // Sort each section by date (most recent first)
  const sortByDate = (items: typeof experiences) =>
    [...items].sort((a, b) => {
      const dateA = a.endDate === 'present' ? new Date() : new Date(a.endDate);
      const dateB = b.endDate === 'present' ? new Date() : new Date(b.endDate);
      return dateB.getTime() - dateA.getTime();
    });

  const sortedExperiences = sortByDate(experiences);
  const sortedEducation = sortByDate(education);

  return (
    <section
      id="career"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 sm:px-8 lg:px-10 overflow-hidden scroll-mt-20"
    >
      {/* 3D Background (lazy-loaded, mounted when section nears viewport) */}
      {hasWebGL && sceneVisible && (
        <div className="absolute inset-0 z-0">
          <TimelineScene />
        </div>
      )}

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-background/60 z-[1]" />

      {/* Content */}
      <div className="relative z-[2] max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-3 sm:mb-4">
            Career Journey
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight px-2 text-balance">
            Experience & Education
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed px-2">
            From banking to AI engineering. Building intelligent systems that bridge technical innovation with real-world business impact.
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-10 flex items-center gap-3">
            <span className="w-10 h-0.5 bg-gradient-to-r from-primary to-transparent" />
            Work Experience
          </h3>
          <div className="relative">
            <div
              ref={lineRef}
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            />
            <div className="space-y-12">
              {sortedExperiences.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-secondary mb-10 flex items-center gap-3">
            <span className="w-10 h-0.5 bg-gradient-to-r from-secondary to-transparent" />
            Education
          </h3>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-accent to-transparent shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
            <div className="space-y-12">
              {sortedEducation.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Download CV Button */}
        <div className="text-center mt-20">
          <Button href="/resume.pdf" download size="lg" className="group">
            <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
            Download Full CV
          </Button>
        </div>
      </div>
    </section>
  );
}
