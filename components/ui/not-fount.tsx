"use client"

import Link from "next/link"
import { Button } from "./button"
import { FileX, Home, ArrowLeft } from "lucide-react"

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center space-y-8 p-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <FileX className="w-12 h-12 text-gray-400" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or you don't have permission to access it.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/admin" className="block">
            <Button className="w-full" size="lg">
              <Home className="w-4 h-4 mr-2" />
              Go to The Welcome Page
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            If you think this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  )
}