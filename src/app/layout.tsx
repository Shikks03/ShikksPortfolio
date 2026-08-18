import type { Metadata } from 'next';
import { Cormorant_Garamond, Marcellus, Marcellus_SC } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-marcellus',
  display: 'swap',
});

const marcellusSC = Marcellus_SC({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-marcellus-sc',
  display: 'swap',
});

const SITE_URL = 'https://shikkari.dev';
const SITE_TITLE = 'Shikkari — Full-Stack Web Developer';
const SITE_DESCRIPTION =
  "Shikkari is a full-stack web developer who builds websites and interfaces with React and Next.js, and runs RIKU, a freelance web development studio.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: '%s | Shikkari' },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: "Shikkari's Portfolio",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_PH',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

// Anchors this site's identity to the RIKU studio site (riku.works) so
// engines resolve both domains to the same person. @id values are load-bearing
// — keep them in sync with the matching JSON-LD on riku.works.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#shikks`,
  name: 'Shikks',
  url: SITE_URL,
  jobTitle: 'Full-Stack Web Developer',
  sameAs: [
    'https://riku.works',
    'https://www.facebook.com/rikuworks',
    'https://github.com/Shikks03',
    'https://www.linkedin.com/in/shikkari-ipil-94b5b4368/',
  ],
  worksFor: {
    '@type': 'ProfessionalService',
    '@id': 'https://riku.works/#riku',
    name: 'RIKU',
    url: 'https://riku.works',
  },
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'UI/UX Design',
    'Brand & Identity',
    'Progressive Web Apps',
    'Web Audio API',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${marcellus.variable} ${marcellusSC.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
