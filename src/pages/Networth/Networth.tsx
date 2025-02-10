'use client';

import { useState } from 'react';
// import { Search, Bell, MessageCircle, Plus } from 'lucide-react';
import { Plus } from 'lucide-react';
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
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

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
import { useFirebaseFirestore } from '../../hooks/useFirebaseFirestore';
import { useSelector } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseconfig.js';
// import { updateFirestoreData } from '../../hooks/useFirebaseFirestore/updateFirestoreData';
export default function NetworthPage() {
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const { networth, addItemToFirestore, loading, error } =
    useFirebaseFirestore();
  const [newItem, setNewItem] = useState({
    id: Date.now(),
    name: '',
    value: '',
    type: 'asset',
    month: new Date().getMonth()+1,
  });
  const handleAddItem = () => {
    if (!newItem.name.trim()) return;

    addItemToFirestore('networth', newItem);
    setNewItem({
      id: Date.now(),
      name: '',
      value: '',
      type: 'asset',
      month: new Date().getMonth(),
    });
  };

  if (loading) return <p>Loading networth data...</p>;
  if (error) return <p>Error: {error}</p>;

  const assets = networth.filter((item) => item.type === 'asset');
  const liabilities = networth.filter((item) => item.type === 'liability');

  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = liabilities.reduce(
    (sum, liability) => sum + liability.value,
    0,
  );
  const netWorth = totalAssets - totalLiabilities;
 // Function to calculate net worth for each month
const calculateNetWorthForMonth = (month: number, networth: NetWorthItem[]): number => {
  const netMonth= networth.filter((item) => item.month === month);
  const netMonthAss = netMonth.filter((item) => item.type === 'asset').reduce((sum, item) => sum + item.value, 0);
  const netMonthLia = netMonth.filter((item) => item.type === 'liability').reduce((sum, item) => sum + item.value, 0);
  return netMonthAss - netMonthLia;
}

// Mock data for net worth growth for each month
const netWorthData: NetWorthData[] = [
  { date: '2025-01', netWorth: calculateNetWorthForMonth(1, networth) },
  { date: '2025-02', netWorth: calculateNetWorthForMonth(2, networth) },
  { date: '2025-03', netWorth: calculateNetWorthForMonth(3, networth) },
  { date: '2025-04', netWorth: calculateNetWorthForMonth(4, networth) },
  { date: '2025-05', netWorth: calculateNetWorthForMonth(5, networth) },
  { date: '2025-06', netWorth: calculateNetWorthForMonth(6, networth) },
];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb pageName="Networth" />
        <div className="grid gap-6">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Total Assets
              </h3>
              <p className="text-title-md font-bold text-black dark:text-white mt-2">
                ₹{totalAssets.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-6  shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Total Liabilities
              </h3>
              <p className="text-title-md font-bold text-black dark:text-white mt-2">
                ₹{totalLiabilities}
              </p>
            </div>
            <div className="bg-white p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Net Worth</h3>
              <p className="text-title-md font-bold text-black dark:text-white mt-2">
                ₹{netWorth.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Net Worth Growth Chart */}
          <div className="bg-white p-6  shadow-sm">
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
            <div className="bg-white p-6  shadow-sm">
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
            <div className="bg-white p-6  shadow-sm">
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
          <div className="bg-white p-6  shadow-sm">
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
