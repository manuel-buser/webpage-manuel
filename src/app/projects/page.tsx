'use client';

import { PageTransition } from '@/components/PageTransition';
import { motion } from 'framer-motion';

function FloatingParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/20"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

const particles = [
  { delay: 0, x: '10%', y: '20%', size: 6 },
  { delay: 0.5, x: '85%', y: '15%', size: 8 },
  { delay: 1, x: '70%', y: '60%', size: 5 },
  { delay: 1.5, x: '20%', y: '70%', size: 7 },
  { delay: 2, x: '50%', y: '30%', size: 4 },
  { delay: 0.8, x: '35%', y: '85%', size: 6 },
  { delay: 1.2, x: '90%', y: '45%', size: 5 },
  { delay: 0.3, x: '5%', y: '50%', size: 8 },
  { delay: 1.8, x: '60%', y: '80%', size: 4 },
  { delay: 2.2, x: '45%', y: '10%', size: 6 },
];

export default function ProjectsPage() {
  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Floating particles */}
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}

        {/* Glowing orb background */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, var(--primary), var(--secondary), transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Coming Soon
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-foreground/50 text-lg md:text-xl max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Projects are currently being curated. Check back soon!
          </motion.p>

          {/* Animated line */}
          <motion.div
            className="mt-10 mx-auto h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          />
        </div>
      </section>
    </PageTransition>
  );
}
