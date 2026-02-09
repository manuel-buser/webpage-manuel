import { clsx, type ClassValue } from "clsx";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Detect if device supports WebGL
 */
export function supportsWebGL(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

/**
 * Detect if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get responsive particle count based on screen width
 */
export function getParticleCount(): number {
  if (typeof window === 'undefined') return 1000;

  const width = window.innerWidth;
  if (width < 640) return 500;  // Mobile
  if (width < 1024) return 1000; // Tablet
  return 1500; // Desktop
}
