'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, ChevronDown, GraduationCap, MapPin } from 'lucide-react';
import type { Experience } from '@/data/cv-data';
import { slideInRight } from '@/lib/animations/gsap-utils';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  item: Experience;
  index: number;
}

export function TimelineItem({ item, index }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isCurrent = item.endDate === 'present';
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (itemRef.current) {
      slideInRight(itemRef.current, { delay: 0.1 * index });
    }
  }, [index]);

  const isWork = item.type === 'work';
  const Icon = isWork ? Briefcase : GraduationCap;
  const accentClass = isWork ? 'text-primary' : 'text-secondary';
  const hasDetails = item.description.length > 0 || (item.technologies?.length ?? 0) > 0;

  return (
    <div
      ref={itemRef}
      className="relative flex items-center mb-8 md:mb-12 opacity-0"
    >
      {/* Timeline Dot (left side) with glow effect */}
      <div
        className={cn(
          'absolute left-8 -translate-x-1/2 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-surface border-4 z-10 transition-all duration-300',
          isWork
            ? 'border-primary shadow-[0_0_20px_rgba(99,102,241,0.4),0_0_40px_rgba(99,102,241,0.2)]'
            : 'border-secondary shadow-[0_0_20px_rgba(139,92,246,0.4),0_0_40px_rgba(139,92,246,0.2)]',
          isCurrent && 'animate-pulse'
        )}
      >
        <Icon className={cn('w-5 h-5 md:w-7 md:h-7', accentClass)} />
      </div>

      {/* Content Card - always on the right */}
      <div className="w-full ml-20">
        <div
          className={cn(
            'rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 border backdrop-blur-sm group',
            'hover:-translate-y-1',
            isWork
              ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)]'
              : 'bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent border-secondary/30 hover:border-secondary/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)]'
          )}
        >
          {/* Title row with current pulse */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight tracking-tight text-balance">
              {item.title}
            </h3>
            {isCurrent && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-accent/15 text-accent flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Now
              </span>
            )}
          </div>

          {/* Company + period */}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
            <h4 className={cn('text-base sm:text-lg font-semibold', accentClass)}>
              {item.company}
            </h4>
            <span className="text-xs sm:text-sm text-foreground/50">
              {item.period}
            </span>
          </div>

          {/* Location */}
          <p className="text-sm text-foreground/60 mb-4 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {item.location}
          </p>

          {/* Summary teaser — always visible */}
          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
            {item.summary}
          </p>

          {/* Expandable details */}
          {hasDetails && (
            <>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2.5 sm:space-y-3 mt-5">
                      {item.description.map((desc, i) => (
                        <li
                          key={i}
                          className="text-sm sm:text-base text-foreground/80 flex leading-relaxed"
                        >
                          <span
                            className={cn(
                              'mr-2.5 sm:mr-3 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full',
                              isWork ? 'bg-primary' : 'bg-secondary'
                            )}
                          />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border/30">
                        {item.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className={cn(
                              'px-3 py-1.5 text-sm font-medium rounded-lg cursor-default',
                              'transition-all duration-200 hover:scale-105',
                              isWork
                                ? 'bg-primary/15 text-primary/90 hover:bg-primary/25'
                                : 'bg-secondary/15 text-secondary/90 hover:bg-secondary/25'
                            )}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className={cn(
                  'mt-4 inline-flex items-center gap-1.5 text-sm font-medium',
                  'transition-colors duration-200',
                  accentClass,
                  'hover:opacity-80'
                )}
              >
                {expanded ? 'Show less' : 'Read more'}
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-300',
                    expanded && 'rotate-180'
                  )}
                />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
