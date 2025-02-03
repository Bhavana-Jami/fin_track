'use client';

import { useState } from 'react';
import { Search, Bell, MessageCircle, Plus } from 'lucide-react';
// import Image from "next/image"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

interface FinancialItem {
  id: string;
  name: string;
  value: number;
  type: string;
}

interface NetWorthData {
  date: string;
  netWorth: number;
}

export default function NetworthPage() {
  const [financialItems, setFinancialItems] = useState<FinancialItem[]>([
    { id: '1', name: 'Cash', value: 10000, type: 'asset' },
    { id: '2', name: 'Investments', value: 50000, type: 'asset' },
    { id: '3', name: 'Property', value: 300000, type: 'asset' },
    { id: '4', name: 'Mortgage', value: 250000, type: 'liability' },
    { id: '5', name: 'Car Loan', value: 15000, type: 'liability' },
    { id: '6', name: 'Credit Card', value: 2000, type: 'liability' },
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    value: '',
    type: 'asset',
  });

  const assets = financialItems.filter((item) => item.type === 'asset');
  const liabilities = financialItems.filter(
    (item) => item.type === 'liability',
  );

  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = liabilities.reduce(
    (sum, liability) => sum + liability.value,
    0,
  );
  const netWorth = totalAssets - totalLiabilities;

  // Mock data for net worth growth
  const netWorthData: NetWorthData[] = [
    { date: '2023-01', netWorth: 80000 },
    { date: '2023-02', netWorth: 82000 },
    { date: '2023-03', netWorth: 85000 },
    { date: '2023-04', netWorth: 90000 },
    { date: '2023-05', netWorth: 88000 },
    { date: '2023-06', netWorth: 93000 },
  ];

  const handleAddItem = () => {
    if (newItem.name && newItem.value) {
      setFinancialItems([
        ...financialItems,
        {
          id: Date.now().toString(),
          name: newItem.name,
          value: Number.parseFloat(newItem.value),
          type: newItem.type,
        },
      ]);
      setNewItem({ name: '', value: '', type: 'asset' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb pageName="Networth" />

        <div className="grid gap-6">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Total Assets
              </h3>
              <p className="text-2xl font-bold mt-2">
                ${totalAssets.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Total Liabilities
              </h3>
              <p className="text-2xl font-bold mt-2">
                ${totalLiabilities.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Net Worth</h3>
              <p className="text-2xl font-bold mt-2">
                ${netWorth.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Net Worth Growth Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Net Worth Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={netWorthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="netWorth"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Assets & Liabilities Details */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Assets</h3>
              <div className="space-y-4">
                {assets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">{asset.name}</span>
                    <span className="text-sm">
                      ${asset.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Liabilities</h3>
              <div className="space-y-4">
                {liabilities.map((liability) => (
                  <div
                    key={liability.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">
                      {liability.name}
                    </span>
                    <span className="text-sm">
                      ${liability.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add New Item Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Add New Item</h3>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Value"
                value={newItem.value}
                onChange={(e) =>
                  setNewItem({ ...newItem, value: e.target.value })
                }
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <select
                value={newItem.type}
                onChange={(e) =>
                  setNewItem({ ...newItem, type: e.target.value })
                }
                className="px-3 py-2 border rounded-md"
              >
                <option value="asset">Asset</option>
                <option value="liability">Liability</option>
              </select>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
