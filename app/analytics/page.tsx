'use client';

import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AuthProvider } from '@/hooks/use-auth';
import { MOCK_EXPENSES } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Download,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

export default function AnalyticsPage() {
  // Mock data for line chart (daily spending)
  const lineData = [
    { day: 'Mon', amount: 45 },
    { day: 'Tue', amount: 32 },
    { day: 'Wed', amount: 68 },
    { day: 'Thu', amount: 25 },
    { day: 'Fri', amount: 95 },
    { day: 'Sat', amount: 120 },
    { day: 'Sun', amount: 40 },
  ];

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
    <AuthProvider>
      <AppShell>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-slate-900">Analytics</h1>
              <p className="text-slate-500">Deep dive into your spending habits.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-slate-200 hover:bg-slate-50 rounded-xl gap-2 h-11">
                <Calendar className="w-4 h-4 text-slate-400" />
                Last 30 Days
              </Button>
              <Button variant="outline" className="border-slate-200 hover:bg-slate-50 rounded-xl gap-2 h-11">
                <Download className="w-4 h-4 text-slate-400" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Spending Trend */}
            <Card className="lg:col-span-2 border-none shadow-sm bg-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-heading font-bold">Spending Trend</CardTitle>
                  <p className="text-sm text-slate-500">Daily expenses for the current week</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">$425.00</div>
                  <div className="text-xs text-green-600 font-semibold">-5.2% vs last week</div>
                </div>
              </CardHeader>
              <CardContent className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={lineData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="day" 
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
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorAmount)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="border-none shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-heading font-bold">Category Breakdown</CardTitle>
                <p className="text-sm text-slate-500">Where your money goes</p>
              </CardHeader>
              <CardContent className="h-[350px] flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="200">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-full mt-6 space-y-2">
                  {categoryData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="text-slate-600 font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-900">${item.value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm bg-slate-900 text-white">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <CardTitle className="text-lg font-heading font-bold">Spending Insight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">
                  Your spending on <span className="text-white font-bold">Food</span> has increased by 15% this week. Consider using your student discount at the campus cafeteria to save approximately $25 per month.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Info className="w-5 h-5 text-slate-600" />
                </div>
                <CardTitle className="text-lg font-heading font-bold">Budget Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500">Monthly Budget</span>
                  <span className="text-sm font-bold text-slate-900">72% Used</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '72%' }} />
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  You have <span className="font-bold text-slate-900">$420.00</span> remaining for the next 12 days.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppShell>
    </AuthProvider>
  );
}
