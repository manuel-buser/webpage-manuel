import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fade in elements on scroll
 */
export function fadeInOnScroll(
  element: HTMLElement | string,
  options?: gsap.TweenVars
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    }
  );
}

/**
 * Slide in from left
 */
export function slideInLeft(
  element: HTMLElement | string,
  options?: gsap.TweenVars
) {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -100 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    }
  );
}

/**
 * Slide in from right
 */
export function slideInRight(
  element: HTMLElement | string,
  options?: gsap.TweenVars
) {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 100 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    }
  );
}

/**
 * Scale in animation
 */
export function scaleIn(element: HTMLElement | string, options?: gsap.TweenVars) {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    }
  );
}

/**
 * Stagger animation for multiple elements
 */
export function staggerIn(
  elements: HTMLElement[] | string,
  options?: gsap.TweenVars
) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: elements,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    }
  );
}

/**
 * Progress line animation
 */
export function animateProgressLine(
  element: HTMLElement | string,
  options?: gsap.TweenVars
) {
  return gsap.fromTo(
    element,
    { scaleY: 0, transformOrigin: 'top' },
    {
      scaleY: 1,
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    }
  );
}
