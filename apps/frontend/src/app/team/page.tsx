'use client';

import Team from '@/components/Team';
import PageTransition from '@/components/ui/PageTransition';

export default function TeamPage() {
  return (
    <PageTransition>
      <div className="pt-32 min-h-screen">
        <Team />
      </div>
    </PageTransition>
  );
}
