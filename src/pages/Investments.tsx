'use client';

import { useState } from 'react';
import {
  Search,
  Bell,
  MessageCircle,
  Plus,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

interface Investment {
  id: string;
  name: string;
  type: string;
  amount: number;
  returns: number;
}

interface Loan {
  id: string;
  name: string;
  type: string;
  amount: number;
  interestRate: number;
}

export default function InvestmentsLoansPage() {
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: '1',
      name: 'S&P 500 ETF',
      type: 'Stock',
      amount: 10000,
      returns: 8.5,
    },
    {
      id: '2',
      name: 'Tech Growth Fund',
      type: 'Mutual Fund',
      amount: 5000,
      returns: 12.3,
    },
    {
      id: '3',
      name: 'Corporate Bond Fund',
      type: 'Bond',
      amount: 7500,
      returns: 3.2,
    },
    {
      id: '4',
      name: 'Real Estate Trust',
      type: 'REIT',
      amount: 15000,
      returns: 6.8,
    },
  ]);

  const [loans, setLoans] = useState<Loan[]>([
    {
      id: '1',
      name: 'Mortgage',
      type: 'Home Loan',
      amount: 250000,
      interestRate: 3.5,
    },
    {
      id: '2',
      name: 'Car Loan',
      type: 'Auto Loan',
      amount: 15000,
      interestRate: 4.2,
    },
    {
      id: '3',
      name: 'Student Loan',
      type: 'Education',
      amount: 30000,
      interestRate: 5.0,
    },
  ]);

  const [newInvestment, setNewInvestment] = useState({
    name: '',
    type: '',
    amount: '',
    returns: '',
  });
  const [newLoan, setNewLoan] = useState({
    name: '',
    type: '',
    amount: '',
    interestRate: '',
  });

  const totalInvestments = investments.reduce(
    (sum, inv) => sum + inv.amount,
    0,
  );
  const totalLoans = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const netWorth = totalInvestments - totalLoans;

  const investmentTypes = [
    'Stock',
    'Mutual Fund',
    'Bond',
    'REIT',
    'Cryptocurrency',
  ];
  const loanTypes = [
    'Home Loan',
    'Auto Loan',
    'Personal Loan',
    'Education',
    'Business Loan',
  ];

  const handleAddInvestment = () => {
    if (
      newInvestment.name &&
      newInvestment.type &&
      newInvestment.amount &&
      newInvestment.returns
    ) {
      setInvestments([
        ...investments,
        {
          id: Date.now().toString(),
          name: newInvestment.name,
          type: newInvestment.type,
          amount: Number.parseFloat(newInvestment.amount),
          returns: Number.parseFloat(newInvestment.returns),
        },
      ]);
      setNewInvestment({ name: '', type: '', amount: '', returns: '' });
    }
  };

  const handleAddLoan = () => {
    if (
      newLoan.name &&
      newLoan.type &&
      newLoan.amount &&
      newLoan.interestRate
    ) {
      setLoans([
        ...loans,
        {
          id: Date.now().toString(),
          name: newLoan.name,
          type: newLoan.type,
          amount: Number.parseFloat(newLoan.amount),
          interestRate: Number.parseFloat(newLoan.interestRate),
        },
      ]);
      setNewLoan({ name: '', type: '', amount: '', interestRate: '' });
    }
  };

  const investmentData = investments.map((inv) => ({
    name: inv.name,
    value: inv.amount,
  }));

  const loanData = loans.map((loan) => ({
    name: loan.name,
    value: loan.amount,
  }));

  const performanceData = [
    { name: 'Jan', returns: 5.2 },
    { name: 'Feb', returns: 5.7 },
    { name: 'Mar', returns: 6.1 },
    { name: 'Apr', returns: 5.9 },
    { name: 'May', returns: 6.5 },
    { name: 'Jun', returns: 7.0 },
  ];

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884D8',
    '#82CA9D',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb pageName="Investments & Loans" />

        <div className="grid gap-6">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Total Investments
              </h3>
              <p className="text-2xl font-bold mt-2">
                ${totalInvestments.toLocaleString()}
              </p>
              <p className="text-sm text-green-500 mt-1 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8.3% from last month
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Total Loans</h3>
              <p className="text-2xl font-bold mt-2">
                ${totalLoans.toLocaleString()}
              </p>
              <p className="text-sm text-red-500 mt-1 flex items-center">
                <TrendingDown className="h-4 w-4 mr-1" />
                -2.1% from last month
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Net Worth</h3>
              <p className="text-2xl font-bold mt-2">
                ${netWorth.toLocaleString()}
              </p>
              <p className="text-sm text-green-500 mt-1 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +5.7% from last month
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Investment Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={investmentData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {investmentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Loan Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={loanData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Investment Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="returns"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Add Investment Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Add New Investment</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <input
                type="text"
                placeholder="Investment Name"
                value={newInvestment.name}
                onChange={(e) =>
                  setNewInvestment({ ...newInvestment, name: e.target.value })
                }
                className="p-2 border rounded"
              />
              <select
                value={newInvestment.type}
                onChange={(e) =>
                  setNewInvestment({ ...newInvestment, type: e.target.value })
                }
                className="p-2 border rounded"
              >
                <option value="">Select Type</option>
                {investmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Amount"
                value={newInvestment.amount}
                onChange={(e) =>
                  setNewInvestment({ ...newInvestment, amount: e.target.value })
                }
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Returns (%)"
                value={newInvestment.returns}
                onChange={(e) =>
                  setNewInvestment({
                    ...newInvestment,
                    returns: e.target.value,
                  })
                }
                className="p-2 border rounded"
              />
              <button
                onClick={handleAddInvestment}
                className="flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                <Plus className="h-5 w-5" />
                Add Investment
              </button>
            </div>
          </div>

          {/* Add Loan Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Add New Loan</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <input
                type="text"
                placeholder="Loan Name"
                value={newLoan.name}
                onChange={(e) =>
                  setNewLoan({ ...newLoan, name: e.target.value })
                }
                className="p-2 border rounded"
              />
              <select
                value={newLoan.type}
                onChange={(e) =>
                  setNewLoan({ ...newLoan, type: e.target.value })
                }
                className="p-2 border rounded"
              >
                <option value="">Select Type</option>
                {loanTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Amount"
                value={newLoan.amount}
                onChange={(e) =>
                  setNewLoan({ ...newLoan, amount: e.target.value })
                }
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Interest Rate (%)"
                value={newLoan.interestRate}
                onChange={(e) =>
                  setNewLoan({ ...newLoan, interestRate: e.target.value })
                }
                className="p-2 border rounded"
              />
              <button
                onClick={handleAddLoan}
                className="flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                <Plus className="h-5 w-5" />
                Add Loan
              </button>
            </div>
          </div>

          {/* Investments List */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Current Investments</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-right p-2">Amount</th>
                    <th className="text-right p-2">Returns</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((investment) => (
                    <tr key={investment.id} className="border-b">
                      <td className="p-2">{investment.name}</td>
                      <td className="p-2">{investment.type}</td>
                      <td className="p-2 text-right">
                        ${investment.amount.toLocaleString()}
                      </td>
                      <td className="p-2 text-right">{investment.returns}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Loans List */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Current Loans</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-right p-2">Amount</th>
                    <th className="text-right p-2">Interest Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan.id} className="border-b">
                      <td className="p-2">{loan.name}</td>
                      <td className="p-2">{loan.type}</td>
                      <td className="p-2 text-right">
                        ${loan.amount.toLocaleString()}
                      </td>
                      <td className="p-2 text-right">{loan.interestRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
