"use client"
import { Search, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSidebar } from "@/context/SidebarContext"
import NotificationDropdown from "../components/admin/header/NotificationDropdown"
import { ThemeToggleButton } from "@/components/admin/common/ThemeToggleButton"
import UserDropdown from "../components/admin/header/UserDropdown"
import SearchBar from "@/components/admin/header/SearchBar"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function AppHeader() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  const { 
    toggleMobileSidebar, 
    toggleSidebar, 
    isMobileOpen, 
    isMobile, 
    isTablet 
  } = useSidebar()

  // Handle sidebar toggle based on device type
  const handleSidebarToggle = () => {
    if (isMobile || isTablet) {
      toggleMobileSidebar()
    } else {
      toggleSidebar()
    }
  }

  // Toggle mobile search
  const handleMobileSearchToggle = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen)
    if (!isMobileSearchOpen) {
      // Focus on search input after animation
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  // Keyboard shortcut for mobile search toggle and escape to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle Cmd+K / Ctrl+K for mobile search toggle
      if ((event.metaKey || event.ctrlKey) && event.key === "k" && (isMobile || isTablet)) {
        event.preventDefault()
        setIsMobileSearchOpen(true)
        setTimeout(() => {
          inputRef.current?.focus()
        }, 100)
      }

      // Escape to close mobile search
      if (event.key === "Escape" && (isMobile || isTablet)) {
        setIsMobileSearchOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMobile, isTablet])

  // Close mobile search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileSearchOpen && inputRef.current && !inputRef.current.contains(event.target as Node)) {
        const searchContainer = inputRef.current.closest('.mobile-search-container')
        if (searchContainer && !searchContainer.contains(event.target as Node)) {
          setIsMobileSearchOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileSearchOpen])

  return (
    <>
      <header className="sticky top-0 flex w-full bg-white/95 backdrop-blur-sm border-b border-gray-200/60 z-[60] dark:border-gray-800/60 dark:bg-gray-900/95">
        <div className="flex items-center justify-between w-full px-4 py-4 lg:px-6 lg:py-3">
          {/* Mobile/Tablet Layout */}
          <div className="flex items-center justify-between w-full lg:hidden">
            {/* Left Section - Sidebar Toggle + Search Icon */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Sidebar Toggle Button - Mobile/Tablet */}
              <button
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 text-gray-500 border border-gray-200 rounded-lg dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                onClick={handleSidebarToggle}
                aria-label="Toggle Sidebar"
              >
                {isMobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              {/* Search Icon - Mobile/Tablet */}
              <button
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 text-gray-500 border border-gray-200 rounded-lg dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                onClick={handleMobileSearchToggle}
                aria-label="Toggle Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Center Section - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center flex-shrink-0">
              <Link href="/admin/dashboard">
                <Image width={100} height={20} className="dark:hidden" src="/logo.png" alt="Logo" />
                <Image
                  width={100}
                  height={20}
                  className="hidden dark:block"
                  src="/logo.png"
                  alt="Logo"
                />
              </Link>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-2 flex-1 justify-end min-w-0 relative z-[70]">
              {/* Theme Toggle */}
              <div className="flex-shrink-0">
                <ThemeToggleButton />
              </div>

              {/* Notifications */}
              <div className="flex-shrink-0 relative z-[70]">
                <NotificationDropdown />
              </div>

              {/* Profile Dropdown */}
              <div className="flex-shrink-0 relative z-[70]">
                <UserDropdown />
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Left Section - Sidebar Toggle & Search */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Sidebar Toggle Button - Desktop */}
              <button
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 text-gray-500 border border-gray-200/60 rounded-lg dark:border-gray-700/60 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                onClick={handleSidebarToggle}
                aria-label="Toggle Sidebar"
              >
                <Menu className="h-4 w-4" />
              </button>

              {/* Desktop Search Bar - DEBUG */}
              <div className="relative w-80 flex-shrink-0 bg-red-100 border-2 border-red-500">
                <p>DEBUG: This should show if the div is rendering</p>
                <SearchBar 
                  ref={inputRef}
                  variant="desktop" 
                  placeholder="Search or type command..."
                  isMobile={isMobile}
                  isTablet={isTablet}
                  className="block"
                />
              </div>
            </div>

            {/* Center Section - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex-shrink-0 flex justify-center">
              <Link href="/admin/dashboard">
                <Image width={130} height={26} className="dark:hidden" src="/logo.png" alt="Logo" />
                <Image
                  width={130}
                  height={26}
                  className="hidden dark:block"
                  src="/logo.png"
                  alt="Logo"
                />
              </Link>
            </div>

            {/* Right Section - Actions & Profile */}
            <div className="flex items-center gap-2 flex-shrink-0 justify-end relative z-[70]">
              {/* Theme Toggle */}
              <div className="flex-shrink-0">
                <ThemeToggleButton />
              </div>

              {/* Notifications */}
              <div className="flex-shrink-0 relative z-[70]">
                <NotificationDropdown />
              </div>

              {/* Profile Dropdown */}
              <div className="flex-shrink-0 relative z-[70]">
                <UserDropdown />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Dropdown */}
      {(isMobile || isTablet) && (
        <div 
          className={`mobile-search-container sticky top-[77px] w-full bg-white/95 backdrop-blur-sm border-b border-gray-200/60 z-[59] dark:border-gray-800/60 dark:bg-gray-900/95 transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileSearchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-3">
            <SearchBar 
              ref={inputRef}
              variant="mobile"
              placeholder="Search..."
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </div>
        </div>
      )}
    </>
  )
}