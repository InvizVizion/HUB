'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import type { GlobalEvent } from '@/types';

// Dynamic import for Map component (client-side only)
const WorldMap = dynamic(() => import('@/components/WorldMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-xl text-gray-300">Loading WorldNow...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<GlobalEvent | null>(null);
  const [events, setEvents] = useState<GlobalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    // Auto-refresh every 15 minutes
    const interval = setInterval(fetchEvents, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 z-20 p-6"
      >
        <div className="glass-dark rounded-2xl p-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              WorldNow
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Real-time Global Events & Conflicts
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-gray-400">Last Update</div>
              <div className="text-sm text-gray-300">
                {lastUpdate.toLocaleTimeString()}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Live</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Map */}
      <WorldMap
        events={events}
        onEventSelect={setSelectedEvent}
      />

      {/* Stats Panel */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-6 bottom-6 z-20"
      >
        <div className="glass-dark rounded-2xl p-6 min-w-[250px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">
            Global Overview
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Active Events</span>
              <span className="text-xl font-bold text-white">{events.length}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 glow-red"></div>
                <span className="text-sm text-gray-400">Critical</span>
              </div>
              <span className="text-lg font-semibold text-red-400">
                {events.filter(e => e.severity === 'critical').length}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500 glow-orange"></div>
                <span className="text-sm text-gray-400">High</span>
              </div>
              <span className="text-lg font-semibold text-orange-400">
                {events.filter(e => e.severity === 'high').length}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500 glow-yellow"></div>
                <span className="text-sm text-gray-400">Medium</span>
              </div>
              <span className="text-lg font-semibold text-yellow-400">
                {events.filter(e => e.severity === 'medium').length}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Event Detail Panel */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-6 top-24 bottom-6 z-20 w-[400px]"
          >
            <div className="glass-dark rounded-2xl p-6 h-full overflow-y-auto">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mt-2">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  selectedEvent.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                  selectedEvent.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                  selectedEvent.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {selectedEvent.severity.toUpperCase()}
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedEvent.title}
                </h2>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedEvent.location.country}
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {selectedEvent.description}
                </p>

                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">Sources</h3>
                  <div className="space-y-2">
                    {selectedEvent.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-400 hover:text-blue-300 transition-colors truncate"
                      >
                        {source}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  {new Date(selectedEvent.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
