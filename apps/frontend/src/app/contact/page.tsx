'use client';

import Contact from '@/components/Contact';
import PageTransition from '@/components/ui/PageTransition';

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        <Contact />
      </div>
    </PageTransition>
  );
}
