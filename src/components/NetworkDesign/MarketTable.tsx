import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import type { MarketArea } from '../../types';

interface Props {
  data: MarketArea[];
  onSort: (key: keyof MarketArea) => void;
  onToggleMarket: (id: string) => void;
}

export function MarketTable({ data, onSort, onToggleMarket }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {[
              { key: 'marketArea', label: 'Market Area' },
              { key: 'marketName', label: 'Market Name' },
              { key: 'loadsInbound', label: 'Loads IB' },
              { key: 'loadsOutbound', label: 'Loads OB' },
              { key: 'totalLoads', label: 'Total Loads' },
              { key: 'marginInbound', label: 'Margin IB' },
              { key: 'marginOutbound', label: 'Margin OB' },
              { key: 'fma', label: 'FMA' },
              { key: 'isInMarket', label: 'IN/OUT' },
            ].map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => onSort(column.key as keyof MarketArea)}
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
              <td className="px-4 py-3 font-medium text-gray-900">{row.marketArea}</td>
              <td className="px-4 py-3 text-gray-900">{row.marketName}</td>
              <td className="px-4 py-3 text-gray-600">{row.loadsInbound}</td>
              <td className="px-4 py-3 text-gray-600">{row.loadsOutbound}</td>
              <td className="px-4 py-3 font-medium text-gray-900">{row.totalLoads}</td>
              <td className="px-4 py-3 text-gray-600">{row.marginInbound}</td>
              <td className="px-4 py-3 text-gray-600">{row.marginOutbound}</td>
              <td className="px-4 py-3 text-gray-600">{row.fma}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onToggleMarket(row.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    row.isInMarket
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {row.isInMarket ? 'IN' : 'OUT'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}