import { RegisterForm } from "../../../../components/admin/auth/register-form"
import { RedirectIfAuthenticated } from "../../../../components/admin/auth/redirect-if-authenticated"
import Image from "next/image"
import Link from "next/link"
export default function RegisterPage() {
  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F3E7DA]/40 via-white to-[#9181BC]/10 font-['Montserrat'] p-4">
        <div className="max-w-md w-full space-y-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Link href="/admin">
                <Image src="/logo.png" alt="Logo" width={180} height={180} className="object-contain" />
              </Link>
            </div>
            
            <h2 className="text-3xl font-semibold text-black mb-3">Create Account</h2>
            <p className="text-gray-600 font-normal">
              Join us and start your journey today
            </p>
            <p className="mt-3 text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/admin/auth/login" className="font-semibold text-[#9181BC] hover:text-[#7B68A8] transition-colors duration-200 hover:underline">
                Sign in here
              </a>
            </p>
          </div>

          {/* Register Form Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-[#F3E7DA]/50 p-8 hover:shadow-3xl transition-all duration-300">
            <RegisterForm />
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-gray-400 font-normal">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </RedirectIfAuthenticated>
  )
}