'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { Scene } from '@/lib/three/Scene';
import { AnimatedSphere } from '@/lib/three/AnimatedSphere';
import { ParticleField } from '@/lib/three/ParticleField';
import { supportsWebGL } from '@/lib/utils';
import { personalInfo, profile } from '@/data/cv-data';

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
      {/* 3D Background */}
      {hasWebGL && (
        <div className="absolute inset-0 z-0">
          <Scene camera={{ position: [0, 0, 6], fov: 75 }}>
            <AnimatedSphere position={[0, 0, 0]} scale={2} />
            <ParticleField />
          </Scene>
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tight"
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

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-base sm:text-lg md:text-xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed px-2"
          >
            {profile}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/25 hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-primary/50 text-foreground rounded-xl font-semibold hover:border-primary hover:bg-primary/10 transition-all duration-300 backdrop-blur-sm"
            >
              Get In Touch
            </Link>
          </motion.div>

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

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-foreground/40 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6 text-foreground/50 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
