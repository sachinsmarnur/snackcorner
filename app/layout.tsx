import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Snack Corner - Fresh Snacks & Hot Beverages for Your Office',
  description: 'Delicious snacks, fresh tea & coffee, samosas, puffs, and cold drinks delivered to your office. Perfect for meetings and keeping your team energized.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}