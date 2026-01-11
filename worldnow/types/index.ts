export interface GlobalEvent {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    country: string;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'conflict' | 'protest' | 'disaster' | 'political' | 'economic';
  timestamp: Date;
  sources: string[];
  imageUrl?: string;
}

export interface HotspotMarker {
  id: string;
  lat: number;
  lng: number;
  intensity: number;
  events: GlobalEvent[];
  color: string;
}

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export const SEVERITY_COLORS = {
  low: '#fbbf24',     // yellow
  medium: '#fb923c',  // orange
  high: '#ef4444',    // red
  critical: '#dc2626' // dark red
} as const;

export const EVENT_TYPE_LABELS = {
  conflict: 'Armed Conflict',
  protest: 'Civil Unrest',
  disaster: 'Natural Disaster',
  political: 'Political Event',
  economic: 'Economic Crisis'
} as const;
