"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { useAuth } from "./auth-provider"
import { useToast } from "../../../hooks/use-toast"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)
      toast({
        title: "Welcome back!",
        description: "You've been signed in successfully",
      })
      router.push("/admin/dashboard")
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-['Montserrat']">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9181BC]/60" />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11 h-12 border-2 border-[#F3E7DA] focus:border-[#9181BC] focus:ring-[#9181BC]/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200 font-normal text-gray-700 placeholder:text-gray-400"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </Label>
            <a 
              href="/admin/auth/forgot-password" 
              className="text-sm text-[#9181BC] hover:text-[#7B68A8] font-semibold transition-colors duration-200 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9181BC]/60" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-11 pr-11 h-12 border-2 border-[#F3E7DA] focus:border-[#9181BC] focus:ring-[#9181BC]/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200 font-normal text-gray-700 placeholder:text-gray-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9181BC]/60 hover:text-[#9181BC] transition-colors duration-200"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 bg-gradient-to-r from-[#9181BC] to-[#7B68A8] hover:from-[#7B68A8] hover:to-[#6B5B95] text-white font-semibold text-base rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign In"
        )}
      </Button>

      
    </form>
  )
}