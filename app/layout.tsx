import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { ReactNode } from 'react';
import { Inter, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-spaceGrotesk',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'DevFlow',
  description:
    'A community-driven platform for developers and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.',
  icons: {
    // icon: '../public/assets/images/site-logo.svg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'primary-gradient',
          footerActionLink: 'primary-text-gradient',
        },
      }}
    >
      <html lang='en'>
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
