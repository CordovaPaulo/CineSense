import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { MuiThemeProvider } from "../lib/mui-theme-provider"
import { Navbar } from "../components/layout/navbar"
import Footer from "../components/layout/footer"
import { QueryProvider } from "@/lib/query-client-provider";
import PrefetcherLazy from '@/components/PrefetcherLazy';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinesense",
  description: "Your AI-powered movie recommendation app",
  authors: [{ name: 'CineSense' }],
  openGraph: {
    title: 'Cinesense',
    description: 'AI-powered movie and TV recommendations',
    siteName: 'Cinesense',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cinesense',
    description: 'AI-powered movie and TV recommendations',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <MuiThemeProvider>
            <Navbar />
            <PrefetcherLazy />
            {children}
            <Footer />
          </MuiThemeProvider>
          <Analytics />
        </QueryProvider>
      </body>
    </html>
  );
}
