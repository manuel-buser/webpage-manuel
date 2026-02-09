import { Hero3D } from '@/components/Hero3D';
import { CVTimeline } from '@/components/CVTimeline';
import { PageTransition } from '@/components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section with 3D Background */}
        <Hero3D />

        {/* CV Timeline with GSAP ScrollTrigger */}
        <CVTimeline />
      </div>
    </PageTransition>
  );
}
