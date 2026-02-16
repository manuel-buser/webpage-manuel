'use client';

import { useEffect, useRef, useState } from 'react';
import { experiences, education } from '@/data/cv-data';
import { TimelineItem } from './TimelineItem';
import { animateProgressLine } from '@/lib/animations/gsap-utils';
import { Scene } from '@/lib/three/Scene';
import { NetworkNodes } from '@/lib/three/TimelineBackground';
import { supportsWebGL } from '@/lib/utils';

export function CVTimeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setHasWebGL(supportsWebGL());
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
    <section className="relative min-h-screen py-24 px-6 sm:px-8 lg:px-10 overflow-hidden">
      {/* 3D Background */}
      {hasWebGL && (
        <div className="absolute inset-0 z-0">
          <Scene camera={{ position: [0, 0, 8], fov: 60 }}>
            <NetworkNodes />
          </Scene>
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight px-2">
            Experience & Education
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed px-2">
            From banking to AI engineering — building intelligent systems that bridge technical innovation with real-world business impact.
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
          <a
            href="/resume.pdf"
            download
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/25 hover:-translate-y-0.5 overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg
                className="w-5 h-5 transition-transform group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Full CV
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
