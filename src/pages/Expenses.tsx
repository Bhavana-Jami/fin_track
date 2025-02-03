"use client"

import { useState } from "react"
import { Search, Bell, MessageCircle, Plus } from "lucide-react"
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
} from "recharts"
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
}

interface Category {
  id: string
  name: string
  type: "income" | "expense"
}

export default function ExpensesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", date: "2024-02-01", description: "Salary", amount: 5000, type: "income", category: "Salary" },
    { id: "2", date: "2024-02-02", description: "Rent", amount: 1500, type: "expense", category: "Housing" },
    { id: "3", date: "2024-02-03", description: "Groceries", amount: 200, type: "expense", category: "Food" },
    { id: "4", date: "2024-02-04", description: "Freelance", amount: 1000, type: "income", category: "Freelancing" },
    { id: "5", date: "2024-02-05", description: "Internet", amount: 80, type: "expense", category: "Utilities" },
  ])

  const categories: Category[] = [
    { id: "1", name: "Salary", type: "income" },
    { id: "2", name: "Freelancing", type: "income" },
    { id: "3", name: "Housing", type: "expense" },
    { id: "4", name: "Food", type: "expense" },
    { id: "5", name: "Utilities", type: "expense" },
    { id: "6", name: "Transport", type: "expense" },
  ]

  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    type: "expense" as "income" | "expense",
    category: "",
  })

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const monthlyData = [
    { name: "Jan", income: 6000, expenses: 4500 },
    { name: "Feb", income: 7000, expenses: 5000 },
    { name: "Mar", income: 8000, expenses: 6000 },
    { name: "Apr", income: 7500, expenses: 5500 },
    { name: "May", income: 8500, expenses: 6500 },
    { name: "Jun", income: 9000, expenses: 7000 },
  ]

  const handleAddTransaction = () => {
    if (newTransaction.description && newTransaction.amount && newTransaction.category) {
      setTransactions([
        ...transactions,
        {
          id: Date.now().toString(),
          date: new Date().toISOString().split("T")[0],
          description: newTransaction.description,
          amount: Number.parseFloat(newTransaction.amount),
          type: newTransaction.type,
          category: newTransaction.category,
        },
      ])
      setNewTransaction({
        description: "",
        amount: "",
        type: "expense",
        category: "",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
   

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb pageName="Expenses" />

        <div className="grid gap-6">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
              <p className="text-2xl font-bold mt-2">${totalIncome.toLocaleString()}</p>
              <p className="text-sm text-green-500 mt-1">+4.35% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
              <p className="text-2xl font-bold mt-2">${totalExpenses.toLocaleString()}</p>
              <p className="text-sm text-green-500 mt-1">+2.59% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Net Savings</h3>
              <p className="text-2xl font-bold mt-2">${(totalIncome - totalExpenses).toLocaleString()}</p>
              <p className="text-sm text-red-500 mt-1">-0.95% from last month</p>
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
                  <Line type="monotone" dataKey="income" stroke="#4F46E5" name="Income" />
                  <Line type="monotone" dataKey="expenses" stroke="#EF4444" name="Expenses" />
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
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                className="p-2 border rounded"
              />
              <select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as "income" | "expense" })}
                className="p-2 border rounded"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <select
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
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
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Description</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-right p-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="p-2">{transaction.date}</td>
                      <td className="p-2">{transaction.description}</td>
                      <td className="p-2">{transaction.category}</td>
                      <td className="p-2">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs ${
                            transaction.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td
                        className={`p-2 text-right ${
                          transaction.type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        ${transaction.amount.toLocaleString()}
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
  )
}

