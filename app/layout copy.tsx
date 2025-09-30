import type React from "react"
import type { Metadata } from "next"
//import { GeistSans } from "geist/font/sans"
//import { GeistMono } from "geist/font/mono"
import { Montserrat } from "next/font/google"

import { Suspense } from "react"
import { Navigation } from "../../components/(public)/Navbar"
import { Footer } from "../../components/(public)/footer"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Pilates Studio - Bien-être et Harmonie",
  description:
    "Découvrez notre studio de Pilates à Paris. Cours pour tous niveaux, instructeurs certifiés, équipement premium. Transformez votre corps et votre esprit.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} font-sans bg-white text-gray-900`}>
        <Navigation />
        <main className="pt-16">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
        <Footer />
        
      </body>
    </html>
  )
}

