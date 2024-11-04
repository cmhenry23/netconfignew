import React, { useState, useCallback } from 'react';
import { History, ExternalLink } from 'lucide-react';
import { MarketTable } from '../components/NetworkDesign/MarketTable';
import { MarketChangeLog } from '../components/NetworkDesign/MarketChangeLog';
import { generateMarketData } from '../utils/marketData';
import type { MarketArea, MarketChangeLogEntry } from '../types';

const initialData = generateMarketData();
const initialChanges: MarketChangeLogEntry[] = [
  {
    ...initialData[0],
    timestamp: '2024-03-10 14:30:00',
    user: 'John Smith',
    action: 'update',
    field: 'isInMarket',
    oldValue: 'false',
    newValue: 'true',
  },
];

export function NetworkDesign() {
  const [data, setData] = useState<MarketArea[]>(initialData);
  const [changes, setChanges] = useState<MarketChangeLogEntry[]>(initialChanges);
  const [showChangeLog, setShowChangeLog] = useState(false);
  const [countryFilter, setCountryFilter] = useState<string>('United States');
  const [sortConfig, setSortConfig] = useState({
    key: 'totalLoads' as keyof MarketArea,
    direction: 'desc' as 'asc' | 'desc',
  });

  const handleSort = useCallback((key: keyof MarketArea) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'desc' ? 'asc' : 'desc',
    }));

    setData((current) =>
      [...current].sort((a, b) => {
        if (sortConfig.direction === 'asc') {
          return a[key] > b[key] ? 1 : -1;
        }
        return a[key] < b[key] ? 1 : -1;
      })
    );
  }, [sortConfig]);

  const handleToggleMarket = useCallback((id: string) => {
    setData((current) =>
      current.map((item) =>
        item.id === id ? { ...item, isInMarket: !item.isInMarket } : item
      )
    );

    const market = data.find((item) => item.id === id)!;
    setChanges((current) => [
      {
        ...market,
        timestamp: new Date().toISOString(),
        user: 'Current User',
        action: 'update',
        field: 'isInMarket',
        oldValue: market.isInMarket.toString(),
        newValue: (!market.isInMarket).toString(),
      },
      ...current,
    ]);
  }, [data]);

  const filteredData = data.filter(
    (item) => countryFilter === 'ALL' || item.country === countryFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-retool-heading">Network Design</h1>
        <div className="flex space-x-3">
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-retool-primary focus:border-retool-primary"
          >
            <option value="ALL">All Countries</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
          </select>
          <a
            href="https://chenryksmta.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-retool-primary"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Market Map
          </a>
          <button
            onClick={() => setShowChangeLog(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-retool-primary"
          >
            <History className="w-4 h-4 mr-2" />
            Change Log
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <MarketTable
          data={filteredData}
          onSort={handleSort}
          onToggleMarket={handleToggleMarket}
        />
      </div>

      {showChangeLog && (
        <MarketChangeLog
          changes={changes}
          onClose={() => setShowChangeLog(false)}
        />
      )}
    </div>
  );
}