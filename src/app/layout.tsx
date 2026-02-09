import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navigation } from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Manuel Buser | Full-Stack Developer",
    template: "%s | Manuel Buser",
  },
  description: "Portfolio of Manuel Buser - Full-Stack Developer specializing in modern web technologies, 3D visualizations, and innovative digital experiences.",
  keywords: ["Manuel Buser", "Full-Stack Developer", "Web Developer", "React", "Next.js", "Three.js", "TypeScript"],
  authors: [{ name: "Manuel Buser" }],
  creator: "Manuel Buser",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manuel-buser.com",
    title: "Manuel Buser | Full-Stack Developer",
    description: "Portfolio of Manuel Buser - Full-Stack Developer specializing in modern web technologies.",
    siteName: "Manuel Buser Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Buser | Full-Stack Developer",
    description: "Portfolio of Manuel Buser - Full-Stack Developer specializing in modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
