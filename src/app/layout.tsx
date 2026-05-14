import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linkable | Partner Portal for Construction Recruitment",
  description: "Streamlined digital portal for subcontractors, companies, and individuals to apply for construction projects across Sweden. Submit credentials, specify availability, and get matched with the right projects.",
  keywords: ["Linkable", "construction recruitment", "subcontractor", "Sweden", "byggentreprenad", "maskinförare", "anläggare", "partner portal"],
  authors: [{ name: "Linkable" }],
  openGraph: {
    title: "Linkable Partner Portal",
    description: "Connect with construction projects across Sweden. Apply as a subcontractor, company, or individual with F-tax.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkable Partner Portal",
    description: "Connect with construction projects across Sweden.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
