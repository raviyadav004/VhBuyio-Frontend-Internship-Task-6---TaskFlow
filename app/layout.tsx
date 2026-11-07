import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "TaskFlow — Modern Task Management",
    template: "%s | TaskFlow",
  },
  description: "TaskFlow is a modern, responsive task management application built with Next.js, TypeScript, Prisma and Tailwind CSS.",
  applicationName: "TaskFlow",
  keywords: [
    "TaskFlow",
    "task management",
    "Next.js",
    "TypeScript",
    "Prisma",
    "Tailwind CSS",
  ],
  authors: [{ name: "TaskFlow" }],
  creator: "TaskFlow",
  metadataBase: new URL("http://localhost:3000"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f8fafc",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#020617",
    },
  ],
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" >
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar />

        <main id="main-content" className="relative flex-1"> {children} </main>
        <Footer />
      </body>
    </html>
  );
}