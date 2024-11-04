import React, { useState } from 'react';
import type { TrailerCost as TrailerCostType } from '../../types';

export function TrailerCost({
  cost,
  onSave,
  onClose,
}: {
  cost: TrailerCostType;
  onSave: (cost: number) => void;
  onClose: () => void;
}) {
  const [monthlyOwnershipCost, setMonthlyOwnershipCost] = useState(
    cost.monthlyOwnershipCost
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-retool-heading">
              Monthly Trailer Cost
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="cost"
                className="block text-sm font-medium text-gray-700"
              >
                Monthly Cost of Ownership
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="cost"
                  value={monthlyOwnershipCost}
                  onChange={(e) =>
                    setMonthlyOwnershipCost(parseFloat(e.target.value))
                  }
                  className="block w-full pl-7 pr-12 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-retool-primary focus:border-retool-primary"
                />
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {cost.lastUpdated} by {cost.lastUpdatedBy}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-retool-primary"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(monthlyOwnershipCost);
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-retool-primary hover:bg-retool-primary-hover rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-retool-primary"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}