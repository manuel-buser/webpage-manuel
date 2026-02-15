'use client';

import { useEffect, useRef } from 'react';
import { experiences, education } from '@/data/cv-data';
import { TimelineItem } from './TimelineItem';
import { animateProgressLine } from '@/lib/animations/gsap-utils';

export function CVTimeline() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineRef.current) {
      animateProgressLine(lineRef.current);
    }
  }, []);

  // Combine and sort by date (most recent first)
  const allItems = [...experiences, ...education].sort((a, b) => {
    const dateA = a.endDate === 'present' ? new Date() : new Date(a.endDate);
    const dateB = b.endDate === 'present' ? new Date() : new Date(b.endDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section className="min-h-screen bg-background py-24 px-6 sm:px-8 lg:px-10">
      <div className="max-w-6xl mx-auto">
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Desktop with glow */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          />

          {/* Vertical Line - Mobile with glow */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent md:hidden shadow-[0_0_8px_rgba(99,102,241,0.4)]" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {allItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
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
