"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/aboutus" },
    { label: "Our Product", path: "/ourproduct" },
    { label: "Our Mission", path: "/ourmission" },
    { label: "Contact", path: "/contact" },
  ];

  const serviceLinks = [
    { name: "Web Development", path: "/services/web" },
    { name: "Mobile Apps", path: "/services/mobile" },
    { name: "Cloud Solutions", path: "/services/cloud" },
    { name: "Ai Products", path: "/services/ai" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/login");
    setIsOpen(false);
  };

  return (
    <nav
      className={`w-full z-50 transition-all duration-300 ${
        scrolled
          ? "fixed top-0 bg-white shadow-md"
          : "relative bg-gradient-to-r from-blue-900/95 to-indigo-900/95"
      }`}
    >
      <div className="h-16 flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
      <Link href="/" className="flex items-center space-x-2 shrink-0">
  <Image
    src="/log.png"
    alt="PencilAi Logo"
    width={140}
    height={40}
    priority
    style={{
      maxWidth: "100%",
      height: "auto",
      objectFit: "contain",
    }}
  />
</Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ label, path }) => (
              <Link
                key={label}
                href={path}
                className={`font-medium transition-colors hover:text-blue-500 ${
                  scrolled ? "text-gray-800" : "text-white"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center font-medium transition-colors hover:text-blue-500 ${
                  scrolled ? "text-gray-800" : "text-white"
                }`}
              >
                Services
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-52 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-50">
                {serviceLinks.map(({ name, path }) => (
                  <Link
                    key={name}
                    href={path}
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              Client Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg mx-4 overflow-hidden transition-all duration-300">
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              href={path}
              className="block px-6 py-3 text-gray-800 hover:bg-blue-50 font-medium border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}

          {/* Mobile Services */}
          <div className="border-b border-gray-100">
            <div className="px-6 py-3 font-medium text-gray-800">Services</div>
            <div className="bg-blue-50">
              {serviceLinks.map(({ name, path }) => (
                <Link
                  key={name}
                  href={path}
                  className="block px-6 py-2 text-gray-700 hover:bg-blue-100 font-medium border-b border-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Login */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogin}
              className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              Client Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
