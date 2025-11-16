'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Target, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const isAdminPage = pathname === '/admin';
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                {isAdminPage ? 'EventHub Admin' : 'EventHub'}
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/" className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${pathname === '/' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}>
              Home
            </Link>
            <Link href="/events" className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${pathname === '/events' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}>
              Events
            </Link>
            {!isAuthPage && (
              <>
                {user ? (
                  <div className="flex items-center space-x-3 ml-2">
                    <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 ml-2">
                    <Link
                      href="/login"
                      className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${pathname === '/login' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
