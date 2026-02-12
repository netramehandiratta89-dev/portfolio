import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ScrollProgressBar } from '@/components/layout/scroll-progress-bar';
import { BackToTopButton } from '@/components/layout/back-to-top';
import { Analytics } from '@vercel/analytics/react';
import { getSettings } from '@/app/actions';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const name = settings.name || 'Portfolio';
  const description = settings.about_intro || `A personal portfolio for ${name}.`;

  return {
    title: `${name} | ${settings.tagline || 'Developer'}`,
    description: description,
    keywords: ['Developer', 'Portfolio', 'Computer Science', name],
    authors: [{ name: name }],
    creator: name,
  };
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ScrollProgressBar />
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
        <BackToTopButton />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
