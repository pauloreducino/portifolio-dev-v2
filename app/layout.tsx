// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default:
      "Paulo Reducino | Desenvolvedor Frontend | React.js, Next.js, TypeScript",
    template: "%s | Paulo Reducino",
  },
  description:
    "Desenvolvedor Frontend com mais de 5 anos de experiência em JavaScript, TypeScript e Next.js. Especialista em performance, SEO e acessibilidade.",
  keywords: [
    "Frontend Developer",
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "SEO",
    "Performance",
    "Acessibilidade",
    "Web Development",
  ],
  authors: [{ name: "Paulo Reducino" }],
  creator: "Paulo Reducino",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://dev-paulo-reducino.vercel.app/",
    title: "Paulo Reducino | Desenvolvedor Frontend",
    description:
      "Desenvolvedor Frontend especializado em React.js, Next.js, TypeScript com foco em performance e acessibilidade.",
    siteName: "Paulo Reducino Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paulo Reducino | Desenvolvedor Frontend",
    description:
      "Desenvolvedor Frontend especializado em React.js, Next.js, TypeScript com foco em performance e acessibilidade.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",

  // --- FAVICONS / ICONES ---
  icons: {
    // favicon padrão
    icon: [
      { url: "/favicon.jpeg", sizes: "any" }, // fallback
      { url: "/favicon.jpeg", type: "image/png", sizes: "32x32" },
      { url: "/favicon.jpeg", type: "image/png", sizes: "16x16" },
      // variações por tema
      { url: "/favicon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    // ícone grande (PWA / iOS)
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    // Safari pinned tab (monocromático)
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0ea5e9" },
    ],
    // atalho clássico
    shortcut: ["/favicon.jpeg"],
  },

  // Manifest PWA (opcional, mas recomendado para devices)
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
