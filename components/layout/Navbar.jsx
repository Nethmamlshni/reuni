// Navbar component for the application
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                  {/* Logo */}
                  <Link href="/" className="flex items-center gap-2 shrink-0">
                      <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                      </div>
                      <span className="text-lg font-bold text-gray-900">UniShare</span>
                  </Link>

                  {/* Desktop Navigation Links */}
                  <div className="hidden md:flex items-center gap-6">
                      <Link href="/catalog" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                          Catalog
                      </Link>
                      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                      <a href="/#faq" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                          FAQ
                      </a>
                      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                      <a href="/#about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                          About Us
                      </a>
                  </div>

                  {/* Desktop Auth Buttons */}
                  <div className="hidden md:flex items-center gap-3">
                      <Link href="/auth/register" className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                          Register
                      </Link>
                      <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all">
                          Login
                      </Link>
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                      onClick={toggleMobileMenu}
                      className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                      aria-label="Toggle menu"
                      aria-expanded={isMobileMenuOpen}
                  >
                      {isMobileMenuOpen ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                      ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                      )}
                  </button>
              </div>

              {/* Mobile Menu */}
              <div
                  className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                  <div className="py-4 space-y-3 border-t border-gray-100">
                      <Link
                          href="/catalog"
                          className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                          onClick={() => setIsMobileMenuOpen(false)}
                      >
                          Catalog
                      </Link>
                      <a
                          href="/#faq"
                          className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                          onClick={() => setIsMobileMenuOpen(false)}
                      >
                          FAQ
                      </a>
                      <a
                          href="/#about"
                          className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                          onClick={() => setIsMobileMenuOpen(false)}
                      >
                          About Us
                      </a>
                      <div className="pt-3 space-y-2 border-t border-gray-100">
                          <Link
                              href="/auth/register"
                              className="block w-full px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-center"
                              onClick={() => setIsMobileMenuOpen(false)}
                          >
                              Register
                          </Link>
                          <Link
                              href="/auth/login"
                              className="block w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all text-center"
                              onClick={() => setIsMobileMenuOpen(false)}
                          >
                              Login
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
      </nav>
  );
};

export default Navbar;