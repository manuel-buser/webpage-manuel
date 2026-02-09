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
    <section className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            Experience & Education
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            My journey from banking to AI engineering
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Desktop */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block"
          />

          {/* Vertical Line - Mobile */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent md:hidden" />

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
        <div className="text-center mt-16">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5"
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
          </a>
        </div>
      </div>
    </section>
  );
}
