import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Scrapbook Workspace',
  description: 'A cozy, tactile digital workspace that feels like a handmade scrapbook.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased bg-brand-cream text-brand-charcoal font-sans text-base">
        {children}
      </body>
    </html>
  );
}
