"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { Calendar , BookOpen } from "lucide-react";
import {
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
} from "../icons";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <Calendar />,
    name: "Evenements",
    path: "/admin/dashboard/evenements",
  },
  {
    icon: <BookOpen />,
    name: "Cours",
    path: "/admin/dashboard/cours",
  },
];



const AppSidebar: React.FC = () => {
  const { 
    isExpanded, 
    isMobileOpen, 
    isHovered, 
    setIsHovered, 
    isMobile, 
    isTablet 
  } = useSidebar();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" ;
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  // Determine if sidebar should show expanded content
  const shouldShowExpandedContent = () => {
    if (isMobile || isTablet) {
      return isMobileOpen;
    }
    return isExpanded || isHovered;
  };

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" 
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !shouldShowExpandedContent()
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {shouldShowExpandedContent() && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {shouldShowExpandedContent() && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {shouldShowExpandedContent() && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && shouldShowExpandedContent() && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  // Determine sidebar width and positioning
  const getSidebarClasses = () => {
    const baseClasses = "fixed flex flex-col top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 h-full";
    
    let widthClasses = "";
    let translateClasses = "";
    let topMargin = "";
    
    // On mobile/tablet: always full width when open, completely hidden when closed
    if (isMobile || isTablet) {
      widthClasses = "w-[290px]";
      translateClasses = isMobileOpen ? "translate-x-0" : "-translate-x-full";
      topMargin = "mt-[75px]"; // Mobile: 75px margin as requested
    } else {
      // Desktop: width based on expansion state
      widthClasses = shouldShowExpandedContent() ? "w-[290px]" : "w-[90px]";
      translateClasses = "lg:translate-x-0";
      topMargin = "lg:mt-[20px]"; // Desktop: 20px margin as requested
    }
    
    return `${baseClasses} ${widthClasses} ${translateClasses} ${topMargin}`;
  };

  // Handle hover for desktop only
  const handleMouseEnter = () => {
    if (!isMobile && !isTablet && !isExpanded) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !isTablet) {
      setIsHovered(false);
    }
  };

  return (
    <>
      {/* Only render sidebar on desktop OR when mobile sidebar is open */}
      {(!isMobile && !isTablet) || isMobileOpen ? (
        <aside
          className={getSidebarClasses()}
          style={{
            marginTop: isMobile || isTablet ? '75px' : '20px'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          
          <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
            <nav className="mb-6">
              <div className="flex flex-col gap-4">
                <div>
                  <h2
                    className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                      !shouldShowExpandedContent()
                        ? "lg:justify-center"
                        : "justify-start"
                    }`}
                  >
                    {shouldShowExpandedContent() ? (
                      "Menu"
                    ) : (
                      <HorizontaLDots />
                    )}
                  </h2>
                  {renderMenuItems(navItems, "main")}
                </div>

                
              </div>
            </nav>
          </div>
        </aside>
      ) : null}
    </>
  );
};

export default AppSidebar;