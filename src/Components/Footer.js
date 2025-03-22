import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#123557] text-gray-300 py-8 mt-auto border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with logo and navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-0">
            {/* Logo */}
            <Link to="/" aria-label="FrameLync Home">
              <img
                src="/logo-file-white.png"
                alt="FrameLync"
                className="h-24 sm:h-28 md:h-32 w-auto mb-4 sm:mb-0 sm:mr-8 transition-transform hover:scale-105"
                loading="lazy"
              />
            </Link>

            <div className="flex flex-col space-y-4 text-center sm:text-left">
              <nav aria-label="Footer Navigation">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
                  <Link
                    to="/our-works"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Our Works
                  </Link>
                  <Link
                    to="/contact-us" // Corrected path
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </nav>

              {/* Social Media Links */}
              <div className="flex justify-center sm:justify-start gap-4 sm:gap-5">
                <motion.a
                  href="https://instagram.com/framelyncmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://youtube.com/@framelyncmedia"  // Changed to a non-functional, but valid URL
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Youtube className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="mailto:letscreate@framelync.com"
                  aria-label="Email"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </div>

          <a
            href="https://prod.framelync.com/"
            className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-gray-200 transition-all duration-300 border border-gray-600 hover:border-gray-400 whitespace-nowrap"
          >
            FrameLync Productions
          </a>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center pt-4 border-t border-gray-600 text-xs text-gray-400">
          <p className="mb-2 sm:mb-0">© {currentYear} FrameLync. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors duration-300">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
