import { NextResponse } from 'next/server';
import type { GlobalEvent } from '@/types';

// Mock data for demonstration
// In production, this would fetch from GDELT API or other news sources
const generateMockEvents = (): GlobalEvent[] => {
  const events: GlobalEvent[] = [
    {
      id: '1',
      title: 'Armed Conflict in Eastern Europe',
      description: 'Ongoing military operations continue in the region with reported casualties and infrastructure damage. International observers are monitoring the situation closely.',
      location: {
        lat: 48.3794,
        lng: 31.1656,
        country: 'Ukraine'
      },
      severity: 'critical',
      type: 'conflict',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      sources: [
        'https://example.com/news1',
        'https://example.com/news2'
      ]
    },
    {
      id: '2',
      title: 'Mass Protests in Middle East',
      description: 'Large-scale demonstrations demanding political reforms have entered their third week. Authorities have deployed additional security forces.',
      location: {
        lat: 33.8547,
        lng: 35.8623,
        country: 'Lebanon'
      },
      severity: 'high',
      type: 'protest',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      sources: [
        'https://example.com/news3'
      ]
    },
    {
      id: '3',
      title: 'Border Tensions Escalate',
      description: 'Military exercises near disputed territories have raised concerns among neighboring countries. Diplomatic channels remain open for dialogue.',
      location: {
        lat: 34.0522,
        lng: 74.8965,
        country: 'Kashmir'
      },
      severity: 'high',
      type: 'conflict',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      sources: [
        'https://example.com/news4',
        'https://example.com/news5'
      ]
    },
    {
      id: '4',
      title: 'Economic Crisis Deepens',
      description: 'Currency devaluation and inflation have led to widespread economic hardship. International financial institutions are discussing emergency aid packages.',
      location: {
        lat: -34.6037,
        lng: -58.3816,
        country: 'Argentina'
      },
      severity: 'medium',
      type: 'economic',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      sources: [
        'https://example.com/news6'
      ]
    },
    {
      id: '5',
      title: 'Civil Unrest Following Election',
      description: 'Disputed election results have triggered demonstrations across major cities. Opposition leaders are calling for independent verification of votes.',
      location: {
        lat: 9.0820,
        lng: 8.6753,
        country: 'Nigeria'
      },
      severity: 'medium',
      type: 'political',
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
      sources: [
        'https://example.com/news7',
        'https://example.com/news8'
      ]
    },
    {
      id: '6',
      title: 'Earthquake Aftermath',
      description: 'Rescue operations continue following a magnitude 7.2 earthquake. International aid teams have arrived to assist with relief efforts.',
      location: {
        lat: 39.9334,
        lng: 32.8597,
        country: 'Turkey'
      },
      severity: 'high',
      type: 'disaster',
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
      sources: [
        'https://example.com/news9'
      ]
    },
    {
      id: '7',
      title: 'Political Tensions Rise',
      description: 'Government crackdown on opposition groups has intensified. Human rights organizations have expressed concern over recent developments.',
      location: {
        lat: 23.8103,
        lng: 90.4125,
        country: 'Bangladesh'
      },
      severity: 'medium',
      type: 'political',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      sources: [
        'https://example.com/news10',
        'https://example.com/news11'
      ]
    },
    {
      id: '8',
      title: 'Trade Dispute Escalates',
      description: 'New tariffs announced in response to ongoing trade disagreements. Economists warn of potential impact on global supply chains.',
      location: {
        lat: 39.9042,
        lng: 116.4074,
        country: 'China'
      },
      severity: 'low',
      type: 'economic',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      sources: [
        'https://example.com/news12'
      ]
    },
    {
      id: '9',
      title: 'Humanitarian Crisis Worsens',
      description: 'Ongoing conflict has displaced thousands of civilians. Aid organizations report severe shortages of food and medical supplies.',
      location: {
        lat: 15.5527,
        lng: 48.5164,
        country: 'Yemen'
      },
      severity: 'critical',
      type: 'conflict',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      sources: [
        'https://example.com/news13',
        'https://example.com/news14'
      ]
    },
    {
      id: '10',
      title: 'Environmental Protests',
      description: 'Climate activists block major infrastructure demanding stronger environmental policies. Negotiations with authorities are ongoing.',
      location: {
        lat: 52.5200,
        lng: 13.4050,
        country: 'Germany'
      },
      severity: 'low',
      type: 'protest',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      sources: [
        'https://example.com/news15'
      ]
    },
    {
      id: '11',
      title: 'Cyber Attack on Critical Infrastructure',
      description: 'Major cyber security incident reported affecting government systems. Investigation into the source is underway.',
      location: {
        lat: 55.7558,
        lng: 37.6173,
        country: 'Russia'
      },
      severity: 'high',
      type: 'political',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      sources: [
        'https://example.com/news16'
      ]
    },
    {
      id: '12',
      title: 'Territorial Dispute in South China Sea',
      description: 'Naval vessels from multiple countries converge in disputed waters. Regional tensions remain elevated.',
      location: {
        lat: 12.0000,
        lng: 113.0000,
        country: 'South China Sea'
      },
      severity: 'high',
      type: 'conflict',
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
      sources: [
        'https://example.com/news17',
        'https://example.com/news18'
      ]
    }
  ];

  return events;
};

export async function GET() {
  try {
    // In production, fetch from GDELT API or other sources
    const events = generateMockEvents();

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
