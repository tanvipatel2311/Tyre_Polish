'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Link from 'next/link';
import { LogIn, UserPlus } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      // If logged in, redirect to events page
      router.push('/events');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-24 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8085ff] to-[#8085ff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          ></div>
        </div>

        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EventHub
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover amazing events happening around you. From concerts to
              workshops, find and join events that match your interests.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
              >
                <LogIn className="h-5 w-5" />
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
              >
                <UserPlus className="h-5 w-5" />
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-base font-semibold leading-7 text-indigo-600">
              Everything you need
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Discover, Join, and Manage Events Seamlessly
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform provides a comprehensive set of features to make
              event management a breeze. From finding interesting events to
              managing your own, we&apos;ve got you covered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
