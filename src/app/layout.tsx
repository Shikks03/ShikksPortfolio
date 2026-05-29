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

export const metadata: Metadata = {
  title: 'Wanderer · A Portfolio of the Lands Coded',
  description: 'A Portfolio of the Lands Coded',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${marcellus.variable} ${marcellusSC.variable}`}>
      <body>{children}</body>
    </html>
  );
}
