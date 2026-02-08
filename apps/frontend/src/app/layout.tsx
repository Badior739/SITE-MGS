import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '../styles/globals.css';
import { AdminProvider } from '@/context/AdminContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { PreferencesProvider } from '@/context/PreferencesContext';

export const metadata: Metadata = {
  title: 'Mind Graphix Premium',
  description: 'Professional CMS & Site Builder',
  openGraph: {
    title: 'Mind Graphix Premium',
    description: 'Professional CMS & Site Builder',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <ThemeProvider>
            <PreferencesProvider>
              <AdminProvider>
                {children}
              </AdminProvider>
            </PreferencesProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
