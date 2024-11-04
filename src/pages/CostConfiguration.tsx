import React, { useState } from 'react';
import { ArrowUpDown, History } from 'lucide-react';
import { generateCostData } from '../utils/costData';
import { ChangeLog } from '../components/CostConfiguration/ChangeLog';
import type { CostSetting, CostChangeLogEntry } from '../types';

const initialData = generateCostData();
const initialChanges: CostChangeLogEntry[] = [
  {
    ...initialData[0],
    timestamp: '2024-03-10 14:30:00',
    user: 'John Smith',
    action: 'update',
    field: 'value',
    oldValue: '2.0',
    newValue: '2.5',
  },
];

export function CostConfiguration() {
  const [data] = useState<CostSetting[]>(initialData);
  const [changes] = useState<CostChangeLogEntry[]>(initialChanges);
  const [showChangeLog, setShowChangeLog] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'effectiveDateTime' as keyof CostSetting,
    direction: 'desc' as 'asc' | 'desc',
  });

  const sortedData = React.useMemo(() => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });
    return sorted;
  }, [data, sortConfig]);

  const handleSort = (key: keyof CostSetting) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-retool-heading">Cost Configuration</h1>
        <button
          onClick={() => setShowChangeLog(true)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-retool-primary"
        >
          <History className="w-4 h-4 mr-2" />
          Change Log
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {[
                  { key: 'operationCode', label: 'Operation Code' },
                  { key: 'settingName', label: 'Setting Name' },
                  { key: 'settingSource', label: 'Setting Source' },
                  { key: 'settingBasis', label: 'Setting Basis' },
                  { key: 'value', label: 'Value' },
                  { key: 'effectiveDateTime', label: 'Date/Time Effective' },
                ].map((column) => (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column.key as keyof CostSetting)}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedData.map((setting) => (
                <tr key={setting.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-900">
                    {setting.operationCode}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {setting.settingName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {setting.settingSource}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {setting.settingBasis}
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {typeof setting.value === 'number'
                      ? setting.value.toFixed(2)
                      : setting.value}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {setting.effectiveDateTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showChangeLog && (
        <ChangeLog
          changes={changes}
          onClose={() => setShowChangeLog(false)}
        />
      )}
    </div>
  );
}