import type {Metadata} from 'next';
import { Inter, Kalam } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const kalam = Kalam({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-hand',
});

export const metadata: Metadata = {
  title: 'Scrapbook Workspace',
  description: 'A cozy, tactile digital workspace that feels like a handmade scrapbook.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${kalam.variable}`}>
      <body suppressHydrationWarning className="antialiased bg-brand-cream text-brand-charcoal font-sans text-base">
        {children}
      </body>
    </html>
  );
}
