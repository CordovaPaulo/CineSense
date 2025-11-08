import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { MuiThemeProvider } from "../lib/mui-theme-provider"
import { Navbar } from "../components/layout/navbar"
import { QueryProvider } from "@/lib/query-client-provider";

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
            {children}
          </MuiThemeProvider>
          <Analytics />
        </QueryProvider>
      </body>
    </html>
  );
}
