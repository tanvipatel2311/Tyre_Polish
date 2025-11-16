'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Target } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();

  const isAdminPage = pathname === '/admin';

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
            {!isAdminPage && (
              <Link href="/admin" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm">
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
