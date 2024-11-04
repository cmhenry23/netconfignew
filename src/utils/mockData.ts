import type { TrailerPool } from '../types';

export function generateMockData(count: number): TrailerPool[] {
  const locations = [
    'Atlanta', 'Chicago', 'Dallas', 'Denver', 'Houston', 'Los Angeles',
    'Miami', 'New York', 'Phoenix', 'Seattle', 'Boston', 'Detroit',
    'Minneapolis', 'Nashville', 'Orlando', 'Philadelphia', 'Portland',
    'San Diego', 'San Francisco', 'St. Louis', 'Tampa', 'Austin',
    'Charlotte', 'Indianapolis', 'Las Vegas'
  ];

  return Array.from({ length: count }, (_, i) => {
    const totalLoads = Math.floor(800 - (i * (700 / count)));
    const loadsInbound = Math.floor(totalLoads * (0.4 + Math.random() * 0.2));
    const loadsOutbound = totalLoads - loadsInbound;
    
    return {
      id: `loc-${i + 1}`,
      locationId: `DC${(i + 1).toString().padStart(3, '0')}`,
      locationName: locations[i],
      loadsInbound,
      loadsOutbound,
      totalLoads,
      averageTurnsPerWeek: 2 + Math.random() * 3,
      averageChargePerLoad: 150 + Math.random() * 100,
      requiredTrailers: Math.ceil(totalLoads / (52 * 2.5)),
    };
  });
}