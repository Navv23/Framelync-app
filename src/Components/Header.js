import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ logoVariant = "light" }) => {
  // Layout adjustment variables
  const containerPadding = "px-4 sm:px-6 md:px-12 lg:px-24";
  const logoOffset = "ml-0 sm:ml-2 md:ml-4";
  const menuOffset = "mr-0 sm:mr-2 md:mr-4";

  // Logo size control
  const logoSizeDefault = "h-32 sm:h-40 md:h-48 lg:h-56";
  const logoSizeScrolled = "h-32 sm:h-40 md:h-48 lg:h-56";

  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

  // Navigation handler with loading animation
  const handleMenuNavigation = (path) => {
    setIsMenuOpen(false);
    if (path === "/contact-us") {
      navigate("/loading", {
        state: {
          message: "Preparing Contact Page...",
          redirectTo: "/contact-us"
        }
      });
    } else if (path === "/services") {
      // Scroll to the services section,  Home page has id="services"
      navigate("/"); // Navigate to home
      setTimeout(() => {
        const servicesSection = document.getElementById("our-services"); //changed from services to our-services
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 0); // Use a zero timeout to execute after the navigation
    }
    else {
      navigate(path);
    }
  };

  // Dynamic class for menu items
  const getMenuItemClass = (path) => {
    const isActive = location.pathname === path;
    const baseClasses = "relative block w-full text-sm font-medium px-4 py-2.5 transition-all duration-200 rounded-md";

    if (isActive) {
      return `${baseClasses} bg-gray-300/30 text-white`; // Active state: Light silver
    }

    return `${baseClasses} text-gray-200 hover:bg-gray-300/30 hover:text-white active:bg-gray-300/40`; // Hover and active states: Light silver
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      {/* Gradient overlay when scrolled */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, height: '0px' }}
            animate={{ opacity: 1, height: '64px' }}
            exit={{ opacity: 0, height: '0px' }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full pointer-events-none bg-gradient-to-b from-black/80 to-transparent"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Main container with max-width */}
      <div className={`mx-auto max-w-7xl ${containerPadding}`}>
        {/* Header content */}
        <div className="relative flex items-center justify-between h-20">
          {/* Logo with link to homepage */}
          <Link
            to="/"
            className={`flex items-center justify-center z-10 ${logoOffset}`}
            aria-label="FrameLync Home"
          >
            <div className="flex items-center justify-center">
              <img
                src={
                  location.pathname === "/loading"
                    ? "/logo-file-white.png"
                    : logoVariant === "dark"
                      ? "/logo-file-black.png"
                      : "/logo-file-black.png"
                }
                alt="FrameLync Ads"
                className={`w-auto transition-all duration-300 ${
                  isScrolled ? logoSizeScrolled : logoSizeDefault
                }`}
              />
            </div>
          </Link>

          {/* Menu button and dropdown */}
          <div className={`relative z-10 ${menuOffset}`} ref={menuRef}>
            <button
              className={`flex items-center justify-center text-base font-medium px-4 py-2 rounded-full transition-all duration-200 min-w-[90px]
                ${
                  isMenuOpen
                    ? "bg-[#123557] text-white shadow-md"
                    : location.pathname === "/loading"
                      ? "text-white hover:bg-[#123557]/80 hover:text-white active:bg-[#123557]/90"
                      : "text-gray-900 hover:bg-[#123557]/80 hover:text-white active:bg-[#123557]/90"
                } focus:outline-none focus:ring-2 focus:ring-[#123557] focus:ring-offset-2`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="navigation-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="mr-2 font-medium">Menu</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  id="navigation-menu"
                  className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl py-1.5 overflow-hidden backdrop-blur-sm border border-gray-200 bg-[#123557]"
                  role="menu"
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleMenuNavigation("/")}
                      className={getMenuItemClass("/")}
                      role="menuitem"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => handleMenuNavigation("/our-works")}
                      className={getMenuItemClass("/our-works")}
                      role="menuitem"
                    >
                      Our Works
                    </button>
                    {/* Removed Services */}
                    <button
                      onClick={() => handleMenuNavigation("/contact-us")}
                      className={getMenuItemClass("/contact-us")}
                      role="menuitem"
                    >
                      Contact Us
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
