'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Plus, X, Edit, Sparkles, Image as ImageIcon, Link as LinkIcon, CaseSensitive, Component, Calendar, Clock, MapPin, Users, Text, Check, Trash2, FileImage, Pencil } from 'lucide-react';

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

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    capacity: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Upload to local server
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      return data.secure_url || data.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      let imageUrl = formData.image;
      
      // Upload image if a file is selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const url = editingEvent 
        ? `/api/events/${editingEvent.id}` 
        : '/api/events';
      
      const method = editingEvent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, image: imageUrl }),
      });

      if (response.ok) {
        fetchEvents();
        resetForm();
        setShowForm(false);
        setEditingEvent(null);
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date.split('T')[0],
      time: event.time,
      location: event.location,
      category: event.category,
      capacity: event.capacity?.toString() || '',
      image: event.image || '',
    });
    setImagePreview(event.image || '');
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: '',
      capacity: '',
      image: '',
    });
    setImageFile(null);
    setImagePreview('');
    setEditingEvent(null);
  };

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
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Event Management</h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">Create, edit, and manage your events</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center space-x-2"
          >
            {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            <span>{showForm ? 'Cancel' : 'Add New Event'}</span>
          </button>
        </div>

        {/* Event Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-10 border border-gray-200">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8 flex items-center gap-2">
              {editingEvent ? <Pencil className="w-6 h-6 text-indigo-600" /> : <Sparkles className="w-6 h-6 text-indigo-600" />}
              {editingEvent ? 'Edit Event' : 'Create New Event'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload Section */}
              <div className="bg-gray-50 rounded-lg p-6 border border-dashed border-gray-300">
                <label className="block text-sm font-semibold leading-6 text-gray-900 mb-2 flex items-center gap-2">
                  <FileImage className="w-5 h-5 text-indigo-600" />
                  Event Image
                </label>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-1/2 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    />
                    <p className="text-sm text-gray-500">Upload an image or paste URL below.</p>
                  </div>
                  <div className="w-full md:w-1/2">
                    {imagePreview && (
                      <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg border-4 border-white">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview('');
                            setImageFile(null);
                            setFormData({ ...formData, image: '' });
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-lg"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-indigo-600" />
                    Or paste image URL
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <ImageIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        if (e.target.value) {
                          setImagePreview(e.target.value);
                        }
                      }}
                      className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                <div>
                  <label className="block text-sm font-semibold leading-6 text-gray-900">Event Title *</label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <CaseSensitive className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter event title"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold leading-6 text-gray-900">Category *</label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Component className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select category</option>
                      <option value="conference">Conference</option>
                      <option value="workshop">Workshop</option>
                      <option value="seminar">Seminar</option>
                      <option value="concert">Concert</option>
                      <option value="sports">Sports</option>
                      <option value="festival">Festival</option>
                      <option value="networking">Networking</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold leading-6 text-gray-900">Date *</label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold leading-6 text-gray-900">Time *</label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Clock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold leading-6 text-gray-900">Location *</label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter location"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold leading-6 text-gray-900">Capacity</label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Users className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Max attendees"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold leading-6 text-gray-900">Description *</label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-1.5">
                      <Text className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter event description"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      {editingEvent ? <Check className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                      <span>{editingEvent ? 'Update Event' : 'Create Event'}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
            <p className="mt-6 text-xl text-gray-600 font-semibold">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl border border-indigo-100">
            <div className="text-8xl mb-6"><Calendar className="w-24 h-24 mx-auto text-gray-300" /></div>
            <p className="text-2xl font-bold text-gray-800 mb-2">No events found</p>
            <p className="text-gray-500 text-lg">Create your first event to get started!</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">All Events ({events.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Event Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          {event.image ? (
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-16 h-16 rounded-lg object-cover border-2 border-indigo-200"
                            />
                          ) : (
                            <div className='w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-indigo-200'>
                              <ImageIcon className='w-8 h-8 text-gray-400' />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-bold text-gray-900">{event.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{event.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                          {event.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 mt-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center"
                          >
                            <Pencil className="w-4 h-4 mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
