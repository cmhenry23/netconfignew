import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, Network, DollarSign } from 'lucide-react';

const navItems = [
  { path: '/trailer-pools', icon: Truck, label: 'Trailer Pools' },
  { path: '/network-design', icon: Network, label: 'Network Design' },
  { path: '/cost-configuration', icon: DollarSign, label: 'Cost Configuration' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <nav className="w-64 bg-retool-sidebar border-r border-retool-border">
        <div className="px-4 py-6">
          <div className="mb-8">
            <h1 className="text-lg font-semibold text-white">Network Config</h1>
          </div>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-retool-active text-white'
                        : 'text-retool-text hover:bg-retool-hover hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}