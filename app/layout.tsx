'use client'
import './globals.scss';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/app/components/theme-provider';
import { Navigation } from '@/app/components/navigation';
import { Footer } from '@/app/components/footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <head>
        <title>SK | Shubham Kumar Sahoo</title>
        <meta name="description" content="Professional portfolio showcasing my work and experience" />
      </head>
      <body className={inter.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
      </body>
      </html>
  );
}