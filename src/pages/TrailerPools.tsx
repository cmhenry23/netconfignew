import React, { useState, useCallback } from 'react';
import { History, DollarSign } from 'lucide-react';
import { Table } from '../components/TrailerPools/Table';
import { ChangeLog } from '../components/TrailerPools/ChangeLog';
import { TrailerCost } from '../components/TrailerPools/TrailerCost';
import { generateMockData } from '../utils/mockData';
import type { TrailerPool, ChangeLogEntry, TrailerCost as TrailerCostType } from '../types';

const initialData = generateMockData(25);
const initialChanges: ChangeLogEntry[] = [
  {
    ...initialData[0],
    timestamp: '2024-03-10 14:30:00',
    user: 'John Smith',
    action: 'update',
  },
];

const initialTrailerCost: TrailerCostType = {
  monthlyOwnershipCost: 1200,
  lastUpdated: '2024-03-01 09:00:00',
  lastUpdatedBy: 'Jane Doe',
};

export function TrailerPools() {
  const [data, setData] = useState<TrailerPool[]>(initialData);
  const [changes, setChanges] = useState<ChangeLogEntry[]>(initialChanges);
  const [trailerCost, setTrailerCost] = useState<TrailerCostType>(initialTrailerCost);
  const [showChangeLog, setShowChangeLog] = useState(false);
  const [showTrailerCost, setShowTrailerCost] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'totalLoads' as keyof TrailerPool,
    direction: 'desc' as 'asc' | 'desc',
  });

  const handleSort = useCallback((key: keyof TrailerPool) => {
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

  const handleTrailerChange = useCallback((id: string, value: number) => {
    setData((current) =>
      current.map((item) =>
        item.id === id ? { ...item, requiredTrailers: value } : item
      )
    );

    setChanges((current) => [
      {
        ...data.find((item) => item.id === id)!,
        timestamp: new Date().toISOString(),
        user: 'Current User',
        action: 'update',
      },
      ...current,
    ]);
  }, [data]);

  const handleTrailerCostSave = useCallback((cost: number) => {
    setTrailerCost((current) => ({
      monthlyOwnershipCost: cost,
      lastUpdated: new Date().toISOString(),
      lastUpdatedBy: 'Current User',
    }));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-retool-heading">Trailer Pools</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowChangeLog(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-retool-primary"
          >
            <History className="w-4 h-4 mr-2" />
            Change Log
          </button>
          <button
            onClick={() => setShowTrailerCost(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-retool-primary"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Trailer Cost
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <Table
          data={data}
          onSort={handleSort}
          onTrailerChange={handleTrailerChange}
        />
      </div>

      {showChangeLog && (
        <ChangeLog
          changes={changes}
          onClose={() => setShowChangeLog(false)}
        />
      )}

      {showTrailerCost && (
        <TrailerCost
          cost={trailerCost}
          onSave={handleTrailerCostSave}
          onClose={() => setShowTrailerCost(false)}
        />
      )}
    </div>
  );
}