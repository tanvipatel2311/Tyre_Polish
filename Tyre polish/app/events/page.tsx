'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Calendar, Clock, MapPin, Users, Search, Tag, Globe, Building, Hammer, Book, Music, Dices, Handshake, Star, PartyPopper } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  capacity?: number;
  image?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(events.map(event => event.category)))];
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4 flex items-center gap-2">
            <PartyPopper className="w-8 h-8 text-indigo-600" /> Upcoming Events
          </h1>
          <p className="text-lg leading-8 text-gray-600">Discover and join amazing events happening around you</p>
        </div>
          
        {/* Category Filter */}
        <div className="mb-10">
          <h3 className="text-base font-semibold leading-7 text-gray-900 mb-4 flex items-center gap-2"><Tag className="w-5 h-5 text-gray-500" />Filter by Category:</h3>
          <div className="flex gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm transition-all ${  
                  filter === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                }`}>
                <span className="mr-2">
                  {category === 'all' && <Globe className="w-5 h-5" />}
                  {category === 'conference' && <Building className="w-5 h-5" />}
                  {category === 'workshop' && <Hammer className="w-5 h-5" />}
                  {category === 'seminar' && <Book className="w-5 h-5" />}
                  {category === 'concert' && <Music className="w-5 h-5" />}
                  {category === 'sports' && <Dices className="w-5 h-5" />}
                  {category === 'festival' && <PartyPopper className="w-5 h-5" />}
                  {category === 'networking' && <Handshake className="w-5 h-5" />}
                  {category === 'other' && <Star className="w-5 h-5" />}
                </span>
                {' '}{category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
            <p className="mt-6 text-xl text-gray-600 font-semibold">Loading amazing events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl border border-indigo-100">
            <div className="text-8xl mb-6"><Search className="w-24 h-24 mx-auto text-gray-300" /></div>
            <p className="text-2xl font-bold text-gray-800 mb-2">No events found</p>
            <p className="text-gray-500 text-lg">Check back later for upcoming events!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl">
                <div className="relative h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  {event.image ? (
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-8xl"><PartyPopper className="w-24 h-24 text-white" /></div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                    <span className="text-2xl">
                      {event.category === 'conference' && <Building className="w-5 h-5" />}
                      {event.category === 'workshop' && <Hammer className="w-5 h-5" />}
                      {event.category === 'seminar' && <Book className="w-5 h-5" />}
                      {event.category === 'concert' && <Music className="w-5 h-5" />}
                      {event.category === 'sports' && <Dices className="w-5 h-5" />}
                      {event.category === 'festival' && <PartyPopper className="w-5 h-5" />}
                      {event.category === 'networking' && <Handshake className="w-5 h-5" />}
                      {!['conference', 'workshop', 'seminar', 'concert', 'sports', 'festival', 'networking'].includes(event.category) && <Star className="w-5 h-5" />}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{event.description}</p>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center bg-gray-100 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 mr-3 text-indigo-500" />
                      <span className="font-semibold">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center bg-gray-100 p-2 rounded-lg">
                      <Clock className="w-5 h-5 mr-3 text-purple-500" />
                      <span className="font-semibold">{event.time}</span>
                    </div>
                    <div className="flex items-center bg-gray-100 p-2 rounded-lg">
                      <MapPin className="w-5 h-5 mr-3 text-pink-500" />
                      <span className="font-semibold line-clamp-1">{event.location}</span>
                    </div>
                    {event.capacity && (
                      <div className="flex items-center bg-gray-100 p-2 rounded-lg">
                        <Users className="w-5 h-5 mr-3 text-blue-500" />
                        <span className="font-semibold">Capacity: {event.capacity}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
