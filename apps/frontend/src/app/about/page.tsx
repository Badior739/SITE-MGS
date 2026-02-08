'use client';

import About from '@/components/About';
import PageTransition from '@/components/ui/PageTransition';

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        <About />
      </div>
    </PageTransition>
  );
}
