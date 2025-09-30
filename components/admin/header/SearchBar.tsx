"use client"
import { Search, Command } from "lucide-react"
import { useEffect, useRef, forwardRef } from "react"

interface SearchBarProps {
  variant?: 'desktop' | 'mobile'
  placeholder?: string
  isMobile?: boolean
  isTablet?: boolean
  className?: string
  onFocus?: () => void
  onBlur?: () => void
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({ 
  variant = 'desktop',
  placeholder = "Search...",
  isMobile = false,
  isTablet = false,
  className = "",
  onFocus,
  onBlur
}, ref) => {
  
  // Keyboard shortcut for search (Cmd+K / Ctrl+K) - only for desktop variant
  useEffect(() => {
    if (variant !== 'desktop') return

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        if (ref && typeof ref !== 'function' && ref.current) {
          ref.current.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [variant, ref])

  if (variant === 'desktop') {
    return (
      <div className={`relative w-80 flex-shrink-0 block ${className}`}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-gray-200/60 bg-gray-50/50 py-2.5 pl-10 pr-12 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100/50 focus:bg-white transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700/60 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:bg-gray-800"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 inline-flex items-center gap-0.5 rounded border border-gray-200/60 bg-gray-100/80 px-1.5 py-0.5 text-xs font-mono text-gray-500 dark:bg-gray-700/80 dark:border-gray-600/60 dark:text-gray-400">
          <Command className="w-3 h-3" />K
        </kbd>
      </div>
    )
  }

  // Mobile variant
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-gray-200/60 bg-gray-50/50 py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100/50 focus:bg-white transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700/60 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:bg-gray-800"
        style={{ paddingLeft: '2.5rem' }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
})

SearchBar.displayName = 'SearchBar'

export default SearchBar