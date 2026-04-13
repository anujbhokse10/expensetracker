'use client';

import React from 'react';
import { 
  MOCK_EXPENSES, 
  MOCK_SAVINGS, 
  MOCK_INCOME,
  USER_PROFILE 
} from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Wallet, 
  TrendingDown, 
  TrendingUp, 
  Plus,
  ArrowRight,
  PiggyBank
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

export default function Dashboard() {
  const totalIncome = MOCK_INCOME.reduce((sum, inc) => sum + inc.amount, 0);
  const totalExpenses = MOCK_EXPENSES.reduce((sum, exp) => sum + exp.amount, 0);
  const totalSavings = MOCK_SAVINGS.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const balance = totalIncome - totalExpenses;

  // Data for category breakdown
  const categoryData = MOCK_EXPENSES.reduce((acc: any[], exp) => {
    const existing = acc.find(item => item.name === exp.category);
    if (existing) {
      existing.value += exp.amount;
    } else {
      acc.push({ name: exp.category, value: exp.amount });
    }
    return acc;
  }, []);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#64748b'];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Welcome back, Alex!</h1>
          <p className="text-slate-500">Here&apos;s what&apos;s happening with your money today.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl gap-2 shadow-lg shadow-blue-100">
          <Plus className="w-5 h-5" />
          Add Expense
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Balance</CardTitle>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Wallet className="w-4 h-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${balance.toFixed(2)}</div>
            <p className="text-xs text-green-600 mt-1 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +2.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Expenses</CardTitle>
            <div className="p-2 bg-red-50 rounded-lg">
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Savings</CardTitle>
            <div className="p-2 bg-green-50 rounded-lg">
              <PiggyBank className="w-4 h-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${totalSavings.toFixed(2)}</div>
            <p className="text-xs text-green-600 mt-1 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Spending Chart */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-heading font-bold">Spending Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Savings Goals */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-heading font-bold">Savings Goals</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {MOCK_SAVINGS.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-700">{goal.title}</span>
                  <span className="text-slate-500">
                    <span className="font-bold text-slate-900">${goal.currentAmount}</span> / ${goal.targetAmount}
                  </span>
                </div>
                <Progress 
                  value={(goal.currentAmount / goal.targetAmount) * 100} 
                  className="h-2 bg-slate-100"
                  style={{ '--progress-foreground': goal.color } as any}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-heading font-bold">Recent Expenses</CardTitle>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_EXPENSES.slice(0, 4).map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                    {expense.category.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{expense.notes}</div>
                    <div className="text-xs text-slate-500">{expense.category} • {expense.date}</div>
                  </div>
                </div>
                <div className="font-bold text-slate-900">-${expense.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
