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
      {/* Timeline Dot - Desktop (centered) */}
      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 shadow-lg z-10',
          isWork ? 'border-primary' : 'border-secondary'
        )}
      >
        <Icon
          className={cn('w-7 h-7', isWork ? 'text-primary' : 'text-secondary')}
        />
      </div>

      {/* Timeline Dot - Mobile (left side) */}
      <div
        className={cn(
          'absolute left-8 -translate-x-1/2 md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-background border-4 shadow-lg z-10',
          isWork ? 'border-primary' : 'border-secondary'
        )}
      >
        <Icon
          className={cn('w-5 h-5', isWork ? 'text-primary' : 'text-secondary')}
        />
      </div>

      {/* Content Card */}
      <div
        className={cn(
          'w-full md:w-[calc(50%-4rem)] ml-32 md:ml-0',
          isLeft ? 'md:mr-20' : 'md:ml-20'
        )}
      >
        <div
          className={cn(
            'rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2',
            isWork
              ? 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:border-primary/40'
              : 'bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20 hover:border-secondary/40'
          )}
        >
          {/* Type Badge */}
          <div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-semibold rounded-full',
              isWork
                ? 'bg-primary/15 text-primary'
                : 'bg-secondary/15 text-secondary'
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
              'inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full',
              isWork
                ? 'bg-primary/20 text-primary'
                : 'bg-secondary/20 text-secondary'
            )}
          >
            {item.period}
          </div>

          {/* Title & Company */}
          <h3 className="text-2xl font-bold text-foreground mb-2 leading-tight">
            {item.title}
          </h3>
          <h4
            className={cn(
              'text-xl font-semibold mb-2',
              isWork ? 'text-primary' : 'text-secondary'
            )}
          >
            {item.company}
          </h4>
          <p className="text-sm text-foreground/60 mb-6">{item.location}</p>

          {/* Description */}
          <ul className="space-y-4 mb-6">
            {item.description.map((desc, i) => (
              <li key={i} className="text-base text-foreground/85 flex leading-relaxed">
                <span
                  className={cn(
                    'mr-3 mt-1 flex-shrink-0',
                    isWork ? 'text-primary' : 'text-secondary'
                  )}
                >
                  •
                </span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>

          {/* Technologies */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
              {item.technologies.map((tech, i) => (
                <span
                  key={i}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-md',
                    isWork
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : 'bg-secondary/10 text-secondary hover:bg-secondary/20',
                    'transition-colors'
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
