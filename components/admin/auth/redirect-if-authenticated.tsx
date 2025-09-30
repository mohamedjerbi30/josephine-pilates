"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider"
import { NotFound } from "../../ui/not-fount"

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode
}

export function RedirectIfAuthenticated({ children }: RedirectIfAuthenticatedProps) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      // Show 404-like behavior by rendering NotFound component
      // This prevents authenticated users from accessing auth pages
    }
  }, [isAuthenticated, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // If user is authenticated, show 404 page
  if (isAuthenticated) {
    return <NotFound />
  }

  // If not authenticated, show the original content (login/register forms)
  return <>{children}</>
}