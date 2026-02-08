'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const ServicesSections = dynamic(() => import('./common/ServicesSections'), { ssr: false });
const PortfolioSections = dynamic(() => import('./common/PortfolioSections'), { ssr: false });
const TeamSections = dynamic(() => import('./common/TeamSections'), { ssr: false });
const ContactSections = dynamic(() => import('./common/ContactSections'), { ssr: false });

const CommonSections: React.FC = () => {
  const pathname = usePathname();

  if (pathname === '/services') return <ServicesSections />;
  if (pathname === '/portfolio') return <PortfolioSections />;
  if (pathname === '/team') return <TeamSections />;
  if (pathname === '/contact') return <ContactSections />;
  
  return null;
};

export default CommonSections;

