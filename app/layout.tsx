import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: {
    default: "Paulo Reducino | Desenvolvedor Frontend | React.js, Next.js, TypeScript",
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
    url: "https://paulo-reducino.vercel.app",
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
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
