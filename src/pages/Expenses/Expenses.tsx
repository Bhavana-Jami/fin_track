'use client';

import { useState } from 'react';
import { Search, Bell, MessageCircle, Plus } from 'lucide-react';
import {
  BarChart,
  Bar,
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
import { useFirebaseFirestore } from '../../hooks/useFirebaseFirestore.js';
import { useSelector } from 'react-redux';
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

export default function ExpensesPage() {
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const { item, addItemToFirestore } = useFirebaseFirestore('expenses');

  const [transactions, setTransactions] = useState<Transaction[]>(item);

  const categories: Category[] = [
    { id: '1', name: 'Salary', type: 'income' },
    { id: '2', name: 'Freelancing', type: 'income' },
    { id: '3', name: 'Housing', type: 'expense' },
    { id: '4', name: 'Food', type: 'expense' },
    { id: '5', name: 'Utilities', type: 'expense' },
    { id: '6', name: 'Transport', type: 'expense' },
  ];

  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: '',
    month: new Date().getMonth(),
  });

  const totalIncome = item
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => parseInt(sum) + parseInt(t.amount), 0);
  console.log(totalIncome);
  const totalExpenses = item
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => parseInt(sum) + parseInt(t.amount), 0);

  const calculateTotalIncomePerMonth = (month, expenses) => {
    const incomeMonth = expenses.filter((item) => item.month === month);
    const totalIncomeMonth = incomeMonth
      .filter((item) => item.type === 'income')
      .reduce((sum, i) => parseInt(sum) + parseInt(i.amount), 0);
    const totalExpensesMonth = incomeMonth
      .filter((item) => item.type === 'expense')
      .reduce((sum, i) => parseInt(sum) + parseInt(i.amount), 0);
    return { totalIncomeMonth, totalExpensesMonth };
  };
  const currentMonthIncome = calculateTotalIncomePerMonth(
    new Date().getMonth(),
    item,
  ).totalIncomeMonth;
  const previousMonthIncome = calculateTotalIncomePerMonth(
    new Date().getMonth() - 1,
    item,
  ).totalIncomeMonth;

  const currentMonthExpenses = calculateTotalIncomePerMonth(
    new Date().getMonth(),
    item,
  ).totalExpensesMonth;
  const previousMonthExpenses = calculateTotalIncomePerMonth(
    new Date().getMonth() - 1,
    item,
  ).totalExpensesMonth;

  function calculatePercentageChange(current, previous) {
    if (typeof current !== 'number' || typeof previous !== 'number')
      return '0%'; // Handle invalid inputs
    if (previous === 0) return current > 0 ? '+100%' : '0%'; // Handle division by zero

    const change = ((current - previous) / Math.abs(previous)) * 100;
    const formattedChange = change.toFixed(2) + '%';

    return change > 0 ? `+${formattedChange}` : formattedChange; // Add "+" for positive values
  }
  const monthlyData = [
    {
      name: 'Jan',
      income: calculateTotalIncomePerMonth(1, item).totalIncomeMonth,
      expenses: calculateTotalIncomePerMonth(1, item).totalExpensesMonth,
    },
    {
      name: 'Feb',
      income: calculateTotalIncomePerMonth(2, item).totalIncomeMonth,
      expenses: calculateTotalIncomePerMonth(2, item).totalExpensesMonth,
    },
    {
      name: 'Mar',
      income: calculateTotalIncomePerMonth(3, item).totalIncomeMonth,
      expenses: calculateTotalIncomePerMonth(3, item).totalExpensesMonth,
    },
    {
      name: 'Apr',
      income: calculateTotalIncomePerMonth(4, item).totalIncomeMonth,
      expenses: calculateTotalIncomePerMonth(4, item).totalExpensesMonth,
    },
    {
      name: 'May',
      income: calculateTotalIncomePerMonth(5, item).totalIncomeMonth,
      expenses: calculateTotalIncomePerMonth(5, item).totalExpensesMonth,
    },
    {
      name: 'Jun',
      income: calculateTotalIncomePerMonth(6, item).totalIncomeMonth,
      expenses: calculateTotalIncomePerMonth(6, item).totalExpensesMonth,
    },
  ];

  const handleAddTransaction = () => {
    if (
      newTransaction.description &&
      newTransaction.amount &&
      newTransaction.category
    ) {
      addItemToFirestore('expenses', newTransaction);
      setNewTransaction({
        description: '',
        amount: '',
        type: 'expense',
        category: '',
        month: new Date().getMonth(),
      });
    }
  };
  console.log(item);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb pageName="Expenses" />

        <div className="grid gap-6">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Total Income
              </h3>
              <p className="text-2xl font-bold mt-2">₹{totalIncome}</p>
              <p className="text-sm text-green-500 mt-1">
                {calculatePercentageChange(
                  currentMonthIncome,
                  previousMonthIncome,
                )}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Total Expenses
              </h3>
              <p className="text-2xl font-bold mt-2">
                ₹{totalExpenses.toLocaleString()}
              </p>
              <p className="text-sm text-green-500 mt-1">
                {calculatePercentageChange(
                  currentMonthExpenses,
                  previousMonthExpenses,
                )}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Net Savings</h3>
              <p className="text-2xl font-bold mt-2">
                ₹{(totalIncome - totalExpenses).toLocaleString()}
              </p>
              <p className="text-sm text-red-500 mt-1">
                -0.95% from last month
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#4F46E5" name="Income" />
                  <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Monthly Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#4F46E5"
                    name="Income"
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#EF4444"
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Add Transaction Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Add Transaction</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <input
                type="text"
                placeholder="Description"
                value={newTransaction.description}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    description: e.target.value,
                  })
                }
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: e.target.value,
                  })
                }
                className="p-2 border rounded"
              />
              <select
                value={newTransaction.type}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    type: e.target.value as 'income' | 'expense',
                  })
                }
                className="p-2 border rounded"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <select
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    category: e.target.value,
                  })
                }
                className="p-2 border rounded"
              >
                <option value="">Select Category</option>
                {categories
                  .filter((cat) => cat.type === newTransaction.type)
                  .map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
              </select>
              <button
                onClick={handleAddTransaction}
                className="flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                <Plus className="h-5 w-5" />
                Add Transaction
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    {/* <th className="text-left p-2">Date</th> */}
                    <th className="text-left p-2">Description</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-right p-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {item.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      {/* <td className="p-2">{transaction.date}</td> */}
                      <td className="p-2">{transaction.description}</td>
                      <td className="p-2">{transaction.category}</td>
                      <td className="p-2">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs ${
                            transaction.type === 'income'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td
                        className={`p-2 text-right ${
                          transaction.type === 'income'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        ₹{transaction.amount.toLocaleString()}
                      </td>
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
