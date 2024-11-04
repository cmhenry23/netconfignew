import type { MarketArea } from '../types';

const marketNames: Record<string, string> = {
  'AB-CAL': 'Alberta - Calgary',
  'AB-EDM': 'Alberta - Edmonton',
  'AK-ALL': 'Alaska - All Areas',
  'AL-BIR': 'Alabama - Birmingham',
  'AL-DOT': 'Alabama - Dothan',
  'AL-HUN': 'Alabama - Huntsville',
  'AL-MOB': 'Alabama - Mobile',
  'AL-MON': 'Alabama - Montgomery',
  // ... rest of the market names
};

export function generateMarketData(): MarketArea[] {
  const data = Object.entries(marketNames).map(([code, name], index) => {
    const totalLoads = Math.floor(500 + Math.random() * 1000);
    const loadsInbound = Math.floor(totalLoads * (0.4 + Math.random() * 0.2));
    const loadsOutbound = totalLoads - loadsInbound;
    const marginInbound = Math.floor(65 + Math.random() * (677 - 65));
    const marginOutbound = Math.floor(65 + Math.random() * (677 - 65));

    return {
      id: `market-${index + 1}`,
      marketArea: code,
      marketName: name,
      country: code.startsWith('AB-') || code.startsWith('BC-') || 
               code.startsWith('MB-') || code.startsWith('NB-') || 
               code.startsWith('NL-') || code.startsWith('NS-') || 
               code.startsWith('ON-') || code.startsWith('PQ-') || 
               code.startsWith('SK-') || code.startsWith('YT-') ? 'Canada' : 
               code.startsWith('MX-') ? 'Mexico' : 'United States',
      loadsInbound,
      loadsOutbound,
      totalLoads,
      marginInbound,
      marginOutbound,
      fma: `FMA-${(index + 1).toString().padStart(3, '0')}`,
      isInMarket: Math.random() > 0.5,
    };
  });

  // Sort by total loads in descending order
  return data.sort((a, b) => b.totalLoads - a.totalLoads);
}