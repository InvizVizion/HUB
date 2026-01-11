'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import type { GlobalEvent } from '@/types';
import { SEVERITY_COLORS } from '@/types';

interface WorldMapProps {
  events: GlobalEvent[];
  onEventSelect: (event: GlobalEvent | null) => void;
}

// Component to handle map instance
function MapController({ events, onEventSelect }: WorldMapProps) {
  const map = useMap();
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    events.forEach(event => {
      const color = SEVERITY_COLORS[event.severity];
      const size = event.severity === 'critical' ? 24 : event.severity === 'high' ? 20 : 16;

      // Create custom icon
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="event-marker" style="
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: ${color};
            border: 2px solid ${color};
            cursor: pointer;
            box-shadow: 0 0 20px ${color}80, 0 0 40px ${color}60;
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            transition: all 0.3s ease;
          "></div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker([event.location.lat, event.location.lng], {
        icon,
      })
        .addTo(map)
        .on('click', () => {
          onEventSelect(event);
          map.flyTo([event.location.lat, event.location.lng], 6, {
            duration: 2,
          });
        });

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
    };
  }, [events, map, onEventSelect]);

  return null;
}

export default function WorldMap({ events, onEventSelect }: WorldMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Set map as loaded after mount
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="absolute inset-0 w-full h-full leaflet-container-wrapper">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          minZoom={2}
          maxZoom={18}
          style={{ height: '100%', width: '100%', background: '#0a0a0f' }}
          zoomControl={false}
          attributionControl={false}
        >
          {/* Dark theme tile layer from CartoDB */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains="abcd"
            maxZoom={19}
          />

          <MapController events={events} onEventSelect={onEventSelect} />
        </MapContainer>
      </div>

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f] z-[1000]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="inline-block animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-500 mb-6"></div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Loading WorldNow
            </h2>
            <p className="text-gray-400 mt-2">Connecting to global events...</p>
          </motion.div>
        </div>
      )}

      <style jsx global>{`
        .leaflet-container {
          background: #0a0a0f !important;
        }

        .leaflet-tile-pane {
          opacity: 0.9;
        }

        .custom-marker {
          background: transparent !important;
          border: none !important;
        }

        .event-marker:hover {
          transform: scale(1.3);
          z-index: 1000 !important;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        .leaflet-container a.leaflet-popup-close-button {
          color: #fff;
        }
      `}</style>
    </>
  );
}
