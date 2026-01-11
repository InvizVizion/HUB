'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';
import type { GlobalEvent } from '@/types';
import { SEVERITY_COLORS } from '@/types';

// You'll need to get a free Mapbox token from https://mapbox.com
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

interface WorldMapProps {
  events: GlobalEvent[];
  onEventSelect: (event: GlobalEvent | null) => void;
}

export default function WorldMap({ events, onEventSelect }: WorldMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [0, 20],
      zoom: 2,
      projection: 'globe' as any,
      attributionControl: false,
    });

    // Add atmosphere styling
    map.current.on('style.load', () => {
      if (!map.current) return;

      map.current.setFog({
        color: 'rgb(10, 10, 15)',
        'high-color': 'rgb(26, 10, 46)',
        'horizon-blend': 0.1,
        'space-color': 'rgb(10, 10, 15)',
        'star-intensity': 0.5,
      });

      setMapLoaded(true);
    });

    // Smooth rotation
    let userInteracting = false;
    const rotateCamera = (timestamp: number) => {
      if (!map.current || userInteracting) return;
      map.current.rotateTo((timestamp / 200) % 360, { duration: 0 });
      requestAnimationFrame(rotateCamera);
    };
    requestAnimationFrame(rotateCamera);

    map.current.on('mousedown', () => { userInteracting = true; });
    map.current.on('mouseup', () => { userInteracting = false; });
    map.current.on('dragend', () => { userInteracting = false; });
    map.current.on('touchstart', () => { userInteracting = true; });
    map.current.on('touchend', () => { userInteracting = false; });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update markers when events change
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    events.forEach(event => {
      const el = document.createElement('div');
      el.className = 'event-marker';

      const color = SEVERITY_COLORS[event.severity];
      const size = event.severity === 'critical' ? 24 : event.severity === 'high' ? 20 : 16;

      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.borderRadius = '50%';
      el.style.background = color;
      el.style.border = `2px solid ${color}`;
      el.style.cursor = 'pointer';
      el.style.boxShadow = `0 0 20px ${color}80, 0 0 40px ${color}60`;
      el.style.animation = 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';
      el.style.transition = 'all 0.3s ease';

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.3)';
        el.style.zIndex = '1000';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        el.style.zIndex = '1';
      });

      el.addEventListener('click', () => {
        onEventSelect(event);

        // Fly to location
        map.current?.flyTo({
          center: [event.location.lng, event.location.lat],
          zoom: 6,
          duration: 2000,
        });
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([event.location.lng, event.location.lat])
        .addTo(map.current!);

      markers.current.push(marker);
    });
  }, [events, mapLoaded, onEventSelect]);

  return (
    <>
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f] z-10">
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

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  );
}
