"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { useAuth } from "./auth-provider"
import { useToast } from "../../../hooks/use-toast"
import { User, Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react"

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(password)
  const passwordMatch = password === confirmPassword && confirmPassword !== ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match",
        variant: "destructive",
      })
      return
    }

    if (passwordStrength < 3) {
      toast({
        title: "Weak password",
        description: "Please choose a stronger password",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await register(name, email, password)
      toast({
        title: "Welcome aboard!",
        description: "Your account has been created successfully",
      })
      router.push("/admin/dashboard")
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again with different details",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return "bg-red-500"
    if (strength < 4) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength < 2) return "Weak"
    if (strength < 4) return "Medium"
    return "Strong"
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-['Montserrat']">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9181BC]/60" />
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-11 h-12 border-2 border-[#F3E7DA] focus:border-[#9181BC] focus:ring-[#9181BC]/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200 font-normal text-gray-700 placeholder:text-gray-400"
              placeholder="Enter your full name"
            />
          </div>
        </div>

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
          <Label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-2 block">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9181BC]/60" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-11 pr-11 h-12 border-2 border-[#F3E7DA] focus:border-[#9181BC] focus:ring-[#9181BC]/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200 font-normal text-gray-700 placeholder:text-gray-400"
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9181BC]/60 hover:text-[#9181BC] transition-colors duration-200"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <span className={`text-xs font-semibold ${passwordStrength < 2 ? 'text-red-500' : passwordStrength < 4 ? 'text-yellow-500' : 'text-green-500'}`}>
                  {getStrengthText(passwordStrength)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 mb-2 block">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9181BC]/60" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`pl-11 pr-11 h-12 border-2 focus:ring-[#9181BC]/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200 font-normal text-gray-700 placeholder:text-gray-400 ${
                confirmPassword ? (passwordMatch ? 'border-green-300 focus:border-green-500' : 'border-red-300 focus:border-red-500') : 'border-[#F3E7DA] focus:border-[#9181BC]'
              }`}
              placeholder="Confirm your password"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              {confirmPassword && (
                <div className={passwordMatch ? 'text-green-500' : 'text-red-500'}>
                  <CheckCircle className="h-4 w-4" />
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-[#9181BC]/60 hover:text-[#9181BC] transition-colors duration-200"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 bg-gradient-to-r from-[#9181BC] to-[#7B68A8] hover:from-[#7B68A8] hover:to-[#6B5B95] text-white font-semibold text-base rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
        disabled={isLoading || !passwordMatch || passwordStrength < 3}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Creating account...</span>
          </div>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  )
}
