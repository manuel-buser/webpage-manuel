# Manuel Buser — Portfolio

Personal portfolio website built with Next.js, featuring 3D visuals, scroll-driven animations, and an interactive CV timeline.

**Live:** [manuel-buser.com](https://manuel-buser.com)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js via React Three Fiber
- **Animations:** Framer Motion, GSAP with ScrollTrigger
- **Contact Form:** Web3Forms

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
  app/          # Pages (home, contact, projects)
  components/   # UI components (Hero3D, CVTimeline, ContactForm, etc.)
  data/         # CV data and content
  lib/          # Utilities and Three.js scene setup
public/         # Static assets
```

## Build

```bash
npm run build
npm start
```
