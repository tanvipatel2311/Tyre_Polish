import Navbar from './components/Navbar';
import Link from 'next/link';
import { Calendar, Search, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-24 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8085ff] to-[#8085ff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">EventHub</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover amazing events happening around you. From concerts to workshops, find and join events that match your interests.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/events" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Browse Events</Link>
              <Link href="/admin" className="text-sm font-semibold leading-6 text-gray-900">Admin Panel <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-base font-semibold leading-7 text-indigo-600">Everything you need</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Discover, Join, and Manage Events Seamlessly</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform provides a comprehensive set of features to make event management a breeze. From finding interesting events to managing your own, we've got you covered.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <Calendar className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Easy Event Discovery
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Browse through a wide variety of events happening in your area.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <Search className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Multiple Categories
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Find events across different categories that interest you.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Real-time Updates
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Stay updated with the latest events and changes.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
