import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ScrollProgressBar } from '@/components/layout/scroll-progress-bar';
import { BackToTopButton } from '@/components/layout/back-to-top';
import CustomCursor from '@/components/layout/custom-cursor';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'CodeVertex Portfolio | Netra Mehandiratta',
  description: 'A personal portfolio for Netra Mehandiratta, a Cybersecurity Enthusiast, Developer, and Problem Solver.',
  keywords: ['Cybersecurity', 'Developer', 'Portfolio', 'Computer Science', 'Netra Mehandiratta'],
  authors: [{ name: 'Netra Mehandiratta' }],
  creator: 'Netra Mehandiratta',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <CustomCursor />
        <ScrollProgressBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTopButton />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
