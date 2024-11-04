import React from 'react';
import type { CostChangeLogEntry } from '../../types';

export function ChangeLog({
  changes,
  onClose,
}: {
  changes: CostChangeLogEntry[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-retool-heading">Cost Configuration Change Log</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Setting Name</th>
                <th className="px-4 py-3">Field</th>
                <th className="px-4 py-3">Old Value</th>
                <th className="px-4 py-3">New Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {changes.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{entry.timestamp}</td>
                  <td className="px-4 py-3 text-gray-900">{entry.user}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        entry.action === 'update'
                          ? 'bg-blue-100 text-blue-800'
                          : entry.action === 'create'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {entry.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-900">{entry.settingName}</td>
                  <td className="px-4 py-3 text-gray-600">{entry.field}</td>
                  <td className="px-4 py-3 text-gray-600">{entry.oldValue}</td>
                  <td className="px-4 py-3 text-gray-600">{entry.newValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}