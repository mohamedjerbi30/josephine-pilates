"use client";

import { useSidebar } from "@/context/SidebarContext";
import {AppHeader} from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen, isMobile, isTablet } = useSidebar();

  // Dynamic class for main content margin based on sidebar state and device type
  const getMainContentMargin = () => {
    // On mobile and tablet, always use ml-0 when mobile sidebar is closed
    if ((isMobile || isTablet) && !isMobileOpen) {
      return "ml-0";
    }
    
    // On mobile/tablet with sidebar open, still use ml-0 since it's overlay
    if ((isMobile || isTablet) && isMobileOpen) {
      return "ml-0";
    }
    
    // Desktop behavior
    if (isExpanded || isHovered) {
      return "lg:ml-[240px]";
    }
    
    return "lg:ml-[90px]";
  };

  const mainContentMargin = getMainContentMargin();

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      
      {/* Header - Full Width with proper margin */}
      <div className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <AppHeader />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin} pt-16`}
      >
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-7xl md:p-6">{children}</div>
      </div>
    </div>
  );
}