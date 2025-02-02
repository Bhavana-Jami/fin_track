import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, Search, Settings, LogOut } from 'lucide-react';

const Dashboard = () => {
  // Sample data - replace with your Firebase data
  const insuranceData = [
    { type: 'Health Insurance', coverage: '10L', count: 1 },
    { type: 'Vehicle Insurance', coverage: '8L', count: 4 },
    { type: 'Wealth Insurance', coverage: '45L', count: 8 }
  ];

  const portfolioData = [
    { month: 'Jan', earning: 2000, investment: 3000 },
    { month: 'Feb', earning: 15000, investment: 12000 },
    { month: 'Mar', earning: 30000, investment: 20000 },
    { month: 'Apr', earning: 15000, investment: 8000 },
    { month: 'May', earning: 12000, investment: 5000 },
    { month: 'Jun', earning: 7000, investment: 8000 },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Polysure</h2>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Search className="h-5 w-5" />
          <Bell className="h-5 w-5" />
          <div className="h-8 w-8 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r p-4">
          <nav className="space-y-2">
            <div className="flex items-center gap-2 rounded-lg bg-accent/50 px-3 py-2">
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="text-sm font-medium">Policy Cards</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="text-sm font-medium">Earnings</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="text-sm font-medium">Payments</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="text-sm font-medium">Statistics</span>
            </div>
          </nav>
        </div>

        {/* Main Dashboard */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Hello, Daniel</h1>
            <p className="text-sm text-muted-foreground">Check & maintain your insurance status</p>
          </div>

          {/* Insurance Cards Grid */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            {insuranceData.map((insurance, index) => (
              <Card key={index} className={`${
                index === 0 ? 'bg-yellow-100' :
                index === 1 ? 'bg-purple-100' :
                'bg-green-100'
              }`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Coverage</p>
                      <h3 className="text-2xl font-bold">₹{insurance.coverage}</h3>
                    </div>
                    <div className="rounded-full bg-black p-2">
                      <span className="text-white">→</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Portfolio Stats */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Policy Portfolio Stats</CardTitle>
              <p className="text-sm text-muted-foreground">June 14 - July 14, 2022</p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolioData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="earning" stroke="#8884d8" />
                    <Line type="monotone" dataKey="investment" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;