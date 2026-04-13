import type { Metadata } from 'next';
import { inter, spaceGrotesk } from '@/lib/fonts';
import { cn } from "@/lib/utils";
import './globals.css';

export const metadata: Metadata = {
  title: 'StudentExpense - Track Smart, Spend Smarter',
  description: 'The ultimate expense tracker designed specifically for students.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(inter.variable, spaceGrotesk.variable)}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
