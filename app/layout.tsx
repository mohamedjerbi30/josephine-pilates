// app/layout.tsx (SINGLE ROOT LAYOUT)
import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { AuthProvider } from "../components/admin/auth/auth-provider"
import { Toaster } from "../components/ui/toaster"
import { SidebarProvider } from '@/context/SidebarContext'
import { ThemeProvider } from '@/context/ThemeContext'
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Pilates Studio - Dashboard & Website",
  description: "Studio de Pilates avec dashboard administrateur",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider>
          <SidebarProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}