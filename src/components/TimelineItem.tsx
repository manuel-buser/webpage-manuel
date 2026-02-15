'use client';

import { useEffect, useRef } from 'react';
import type { Experience } from '@/data/cv-data';
import { slideInLeft, slideInRight } from '@/lib/animations/gsap-utils';
import { Briefcase, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Timeline3DAnimation } from './Timeline3DAnimation';

interface TimelineItemProps {
  item: Experience;
  index: number;
  isLeft: boolean;
}

export function TimelineItem({ item, index, isLeft }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      // Animate from left or right based on desktop position
      // On mobile, always animate from right
      if (window.innerWidth >= 768) {
        if (isLeft) {
          slideInLeft(itemRef.current, { delay: 0.1 * index });
        } else {
          slideInRight(itemRef.current, { delay: 0.1 * index });
        }
      } else {
        slideInRight(itemRef.current, { delay: 0.1 * index });
      }
    }
  }, [isLeft, index]);

  const isWork = item.type === 'work';
  const Icon = isWork ? Briefcase : GraduationCap;

  return (
    <div
      ref={itemRef}
      className={cn(
        'relative flex items-center mb-8 md:mb-12 opacity-0',
        isLeft ? 'md:justify-end' : 'md:justify-start'
      )}
    >
      {/* Timeline Dot - Desktop (centered) with glow effect */}
      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-surface border-4 z-10 transition-all duration-300',
          isWork
            ? 'border-primary shadow-[0_0_20px_rgba(99,102,241,0.4),0_0_40px_rgba(99,102,241,0.2)]'
            : 'border-secondary shadow-[0_0_20px_rgba(139,92,246,0.4),0_0_40px_rgba(139,92,246,0.2)]',
          item.endDate === 'present' && 'animate-pulse'
        )}
      >
        <Icon
          className={cn('w-7 h-7', isWork ? 'text-primary' : 'text-secondary')}
        />
      </div>

      {/* Timeline Dot - Mobile (left side) with glow effect */}
      <div
        className={cn(
          'absolute left-8 -translate-x-1/2 md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-surface border-4 z-10 transition-all duration-300',
          isWork
            ? 'border-primary shadow-[0_0_15px_rgba(99,102,241,0.4),0_0_30px_rgba(99,102,241,0.2)]'
            : 'border-secondary shadow-[0_0_15px_rgba(139,92,246,0.4),0_0_30px_rgba(139,92,246,0.2)]',
          item.endDate === 'present' && 'animate-pulse'
        )}
      >
        <Icon
          className={cn('w-5 h-5', isWork ? 'text-primary' : 'text-secondary')}
        />
      </div>

      {/* Content Card */}
      <div
        className={cn(
          'w-full md:w-[calc(50%-4rem)] ml-16 md:ml-0',
          isLeft ? 'md:mr-20' : 'md:ml-20'
        )}
      >
        <div
          className={cn(
            'rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 border backdrop-blur-sm group',
            'hover:-translate-y-1',
            isWork
              ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)]'
              : 'bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent border-secondary/30 hover:border-secondary/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)]'
          )}
        >
          {/* Badge Row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {/* Type Badge */}
            <div
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl',
                isWork
                  ? 'bg-primary/20 text-primary'
                  : 'bg-secondary/20 text-secondary'
              )}
            >
              {isWork ? (
                <>
                  <Briefcase className="w-4 h-4" />
                  <span>Work Experience</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </>
              )}
            </div>

            {/* Period Badge */}
            <div
              className={cn(
                'inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg',
                'bg-muted/80 text-foreground/70'
              )}
            >
              {item.period}
            </div>

            {/* Current indicator */}
            {item.endDate === 'present' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-accent/20 text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Current
              </div>
            )}
          </div>

          {/* Title & Company */}
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 leading-tight tracking-tight">
            {item.title}
          </h3>
          <h4
            className={cn(
              'text-base sm:text-lg font-semibold mb-1',
              isWork ? 'text-primary' : 'text-secondary'
            )}
          >
            {item.company}
          </h4>
          <p className="text-sm text-foreground/60 mb-6 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {item.location}
          </p>

          {/* Description */}
          <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
            {item.description.map((desc, i) => (
              <li key={i} className="text-sm sm:text-base text-foreground/80 flex leading-relaxed">
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

          {/* Technologies */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-5 border-t border-border/30">
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
        </div>
      </div>

      {/* 3D Animation - Desktop only, opposite side, work only */}
      {isWork && (
        <div
          className={cn(
            'hidden md:block absolute w-72 h-64',
            isLeft ? 'right-[calc(50%+3rem)]' : 'left-[calc(50%+3rem)]'
          )}
        >
          <Timeline3DAnimation item={item} className="w-full h-full" />
        </div>
      )}
    </div>
  );
}
