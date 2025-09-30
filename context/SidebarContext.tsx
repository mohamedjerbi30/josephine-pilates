"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type SidebarContextType = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  isMobile: boolean;
  isTablet: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setIsHovered: (isHovered: boolean) => void;
  setActiveItem: (item: string | null) => void;
  toggleSubmenu: (item: string) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768; // Mobile breakpoint
      const tablet = width >= 768 && width < 1024; // Tablet breakpoint
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      
      // Close mobile sidebar when switching to desktop
      if (width >= 1024) {
        setIsMobileOpen(false);
      }
      
      // Auto-collapse sidebar on tablet/mobile
      if (mobile || tablet) {
        setIsExpanded(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    // Only allow desktop sidebar toggle on desktop
    if (!isMobile && !isTablet) {
      setIsExpanded((prev) => !prev);
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const toggleSubmenu = (item: string) => {
    setOpenSubmenu((prev) => (prev === item ? null : item));
  };

  // Determine if sidebar should be expanded based on screen size
  const effectiveIsExpanded = isMobile || isTablet ? false : isExpanded;

  return (
    <SidebarContext.Provider
      value={{
        isExpanded: effectiveIsExpanded,
        isMobileOpen,
        isHovered,
        activeItem,
        openSubmenu,
        isMobile,
        isTablet,
        toggleSidebar,
        toggleMobileSidebar,
        setIsHovered,
        setActiveItem,
        toggleSubmenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};