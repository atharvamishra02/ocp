'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getMe, logout } from "@/lib/auth";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getMe().then(setUser).catch(() => {});
  }, []);


  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };



  const menuLinks = [
    { href: '/discover', label: 'Discover' },
    ...(user ? [{ href: '/dashboard', label: 'Dashboard' }] : [])
  ];

  const authLinks = user
    ? [{ label: 'Logout', onClick: handleLogout, className: 'text-red-600 hover:text-red-800 hover:bg-red-50' }]
    : [
        { href: '/login', label: 'Login' },
        { href: '/register', label: 'Register', className: 'text-white bg-green-600 hover:bg-green-700' }
      ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/globe.svg" alt="Amrutam" width={32} height={32} />
            <span className="ml-2 text-xl font-bold text-green-700">Amrutam</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuLinks.map((link, i) => (
              <Link key={i} href={link.href} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50">
                {link.label}
              </Link>
            ))}
            {authLinks.map((link, i) =>
              link.onClick ? (
                <button key={i} onClick={link.onClick} className={`px-3 py-2 rounded-md text-sm font-medium ${link.className || ''}`}>
                  {link.label}
                </button>
              ) : (
                <Link key={i} href={link.href} className={`px-3 py-2 rounded-md text-sm font-medium ${link.className || 'text-gray-700 hover:text-green-700 hover:bg-green-50'}`}>
                  {link.label}
                </Link>
              )
            )}
            {user && (
              <div className="ml-3 h-8 w-8 flex items-center justify-center rounded-full bg-green-100 text-green-800 font-medium">
                {user.name ? user.name[0].toUpperCase() : '?'}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          {menuLinks.map((link, i) => (
            <Link key={i} href={link.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50">
              {link.label}
            </Link>
          ))}
          {authLinks.map((link, i) =>
            link.onClick ? (
              <button key={i} onClick={link.onClick} className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${link.className || ''}`}>
                {link.label}
              </button>
            ) : (
              <Link key={i} href={link.href} className={`block px-3 py-2 rounded-md text-base font-medium ${link.className || 'text-gray-700 hover:text-green-700 hover:bg-green-50'}`}>
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
