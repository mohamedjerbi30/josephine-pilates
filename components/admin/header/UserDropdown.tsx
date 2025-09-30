"use client"
import { User } from "lucide-react"
import { Button } from "../../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { useAuth } from "../auth/auth-provider"
import { useRouter } from "next/navigation"

export default function UserDropdown() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/admin")
  }

  const handleProfile = () => {
    router.push("/admin/profile")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-blue-100 focus:outline-none dark:hover:bg-gray-800 dark:focus:ring-blue-900/20 lg:h-11 lg:w-11"
        >
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm lg:h-9 lg:w-9">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4 lg:h-5 lg:w-5" />}
          </div>
          {/* Online indicator */}
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full dark:border-gray-900 lg:h-3 lg:w-3"></span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg mt-2 dark:bg-gray-900 dark:border-gray-800"
        align="end"
        sideOffset={8}
      >
        {/* User Info */}
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center gap-3 px-3 py-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || "user@example.com"}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />

        {/* Profile Link */}
        <DropdownMenuItem
          onClick={handleProfile}
          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span>View Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"
            />
          </svg>
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}