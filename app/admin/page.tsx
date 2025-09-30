import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-white to-purple/10 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          {/* Logo placeholder */}
          <div className="flex justify-center mb-8">
            
              <Image src="/logo.png" alt="Logo" width={180} height={180} className="object-contain" />
            
          </div>
          
          <h1 className="text-5xl font-montserrat-semibold bg-gradient-to-r from-purple via-purple-600 to-black bg-clip-text text-transparent mb-4">
            Welcome
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg font-montserrat-regular">
            Choose an option to continue your journey
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/admin/auth/login" className="block">
            <Button 
              className="w-full bg-purple hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-montserrat-semibold" 
              size="lg"
            >
              Sign In
            </Button>
          </Link>

          <Link href="/admin/auth/register" className="block">
            <Button 
              variant="outline" 
              className="w-full bg-white hover:bg-cream border-2 border-purple hover:border-purple-600 text-purple hover:text-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-montserrat-semibold" 
              size="lg"
            >
              Create Account
            </Button>
          </Link>

          <Link href="/admin" className="block">
            <Button 
              variant="secondary" 
              className="w-full bg-cream hover:bg-cream/80 text-black border border-cream hover:border-purple/30 transition-all duration-300 shadow-md hover:shadow-lg font-montserrat-semibold" 
              size="lg"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-2 mt-8 opacity-30">
          <div className="w-2 h-2 bg-purple rounded-full"></div>
          <div className="w-2 h-2 bg-cream rounded-full"></div>
          <div className="w-2 h-2 bg-purple rounded-full"></div>
        </div>
      </div>
    </div>
  )
}