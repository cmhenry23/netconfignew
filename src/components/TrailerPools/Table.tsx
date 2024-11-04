import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import type { TrailerPool } from '../../types';

interface Props {
  data: TrailerPool[];
  onSort: (key: keyof TrailerPool) => void;
  onTrailerChange: (id: string, value: number) => void;
}

export function Table({ data, onSort, onTrailerChange }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {[
              { key: 'locationId', label: 'Location ID' },
              { key: 'locationName', label: 'Location Name' },
              { key: 'loadsInbound', label: 'Loads IB' },
              { key: 'loadsOutbound', label: 'Loads OB' },
              { key: 'totalLoads', label: 'Total Loads' },
              { key: 'averageTurnsPerWeek', label: 'Average Turns per Week' },
              { key: 'averageChargePerLoad', label: 'Avg. Charge per Load' },
              { key: 'requiredTrailers', label: 'Required Trailers' },
            ].map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => onSort(column.key as keyof TrailerPool)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">{row.locationId}</td>
              <td className="px-4 py-3 text-gray-900">{row.locationName}</td>
              <td className="px-4 py-3 text-gray-600">{row.loadsInbound}</td>
              <td className="px-4 py-3 text-gray-600">{row.loadsOutbound}</td>
              <td className="px-4 py-3 font-medium text-gray-900">{row.totalLoads}</td>
              <td className="px-4 py-3 text-gray-600">{row.averageTurnsPerWeek.toFixed(1)}</td>
              <td className="px-4 py-3 text-gray-600">
                ${row.averageChargePerLoad.toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <input
                  type="number"
                  value={row.requiredTrailers}
                  onChange={(e) =>
                    onTrailerChange(row.id, parseInt(e.target.value, 10))
                  }
                  className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-retool-primary focus:border-retool-primary"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}