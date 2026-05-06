'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { supportsWebGL } from '@/lib/utils';
import { personalInfo, tagline } from '@/data/cv-data';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => null,
});

export function Hero3D() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = `${personalInfo.title} | ${personalInfo.subtitle}`;

  // Check WebGL support
  useEffect(() => {
    setHasWebGL(supportsWebGL());
  }, []);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D Background (lazy-loaded) */}
      {hasWebGL && (
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tight text-balance"
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">
              Manuel Buser
            </span>
          </motion.h1>

          {/* Title with Typewriter */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground/90 mb-8 font-mono min-h-[3rem] tracking-tight"
          >
            {displayedText}
            <span className="animate-pulse text-primary">|</span>
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-base sm:text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed px-2 text-balance"
          >
            {tagline}
          </motion.p>

          {/* CTA Buttons */}
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="flex gap-4 justify-center mt-12"
          >
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-muted/50 text-foreground/70 hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-muted/50 text-foreground/70 hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-3 rounded-xl bg-muted/50 text-foreground/70 hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
