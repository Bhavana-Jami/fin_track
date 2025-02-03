"use client"

import { useState } from "react"
import { Search, Bell, MessageCircle, Plus, AlertCircle } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"

interface Budget {
  id: string
  category: string
  limit: number
  spent: number
  color: string
}

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: "1", category: "Housing", limit: 2000, spent: 1800, color: "#4F46E5" },
    { id: "2", category: "Food", limit: 600, spent: 450, color: "#10B981" },
    { id: "3", category: "Transport", limit: 400, spent: 380, color: "#F59E0B" },
    { id: "4", category: "Entertainment", limit: 300, spent: 350, color: "#EF4444" },
    { id: "5", category: "Utilities", limit: 200, spent: 180, color: "#8B5CF6" },
    { id: "6", category: "Shopping", limit: 500, spent: 420, color: "#EC4899" },
  ])

  const [newBudget, setNewBudget] = useState({
    category: "",
    limit: "",
  })

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const remainingBudget = totalBudget - totalSpent

  const pieChartData = budgets.map((budget) => ({
    name: budget.category,
    value: budget.spent,
  }))

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.limit) {
      setBudgets([
        ...budgets,
        {
          id: Date.now().toString(),
          category: newBudget.category,
          limit: Number.parseFloat(newBudget.limit),
          spent: 0,
          color: "#" + Math.floor(Math.random() * 16777215).toString(16), // Random color
        },
      ])
      setNewBudget({ category: "", limit: "" })
    }
  }

  const getBudgetStatus = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100
    if (percentage >= 100) return "bg-red-100 text-red-800"
    if (percentage >= 80) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  return (
    <div className="min-h-screen bg-gray-50">
    

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
       <Breadcrumb pageName="Budget" />

        <div className="grid gap-6">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Total Budget</h3>
              <p className="text-2xl font-bold mt-2">${totalBudget.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
              <p className="text-2xl font-bold mt-2">${totalSpent.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Remaining Budget</h3>
              <p className="text-2xl font-bold mt-2">${remainingBudget.toLocaleString()}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Budget Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {budgets.map((budget, index) => (
                      <Cell key={`cell-${index}`} fill={budget.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Budget vs Spending</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={budgets}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="limit" name="Budget Limit" fill="#4F46E5" />
                  <Bar dataKey="spent" name="Amount Spent" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Add Budget Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Add New Budget</h3>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Category"
                value={newBudget.category}
                onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Budget Limit"
                value={newBudget.limit}
                onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <button
                onClick={handleAddBudget}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add Budget
              </button>
            </div>
          </div>

          {/* Budget List */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Budget Categories</h3>
            <div className="space-y-4">
              {budgets.map((budget) => {
                const percentage = Math.round((budget.spent / budget.limit) * 100)
                return (
                  <div key={budget.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-medium">{budget.category}</h4>
                        <p className="text-sm text-gray-500">
                          ${budget.spent.toLocaleString()} of ${budget.limit.toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${getBudgetStatus(budget.spent, budget.limit)}`}>
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${percentage >= 100 ? "bg-red-500" : percentage >= 80 ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    {percentage >= 80 && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-yellow-700">
                        <AlertCircle className="h-4 w-4" />
                        {percentage >= 100 ? "Over budget!" : "Approaching budget limit"}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

