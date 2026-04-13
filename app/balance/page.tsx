'use client';

import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AuthProvider } from '@/hooks/use-auth';
import { 
  MOCK_INCOME, 
  MOCK_EXPENSES,
  USER_PROFILE 
} from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function BalancePage() {
  const totalIncome = MOCK_INCOME.reduce((sum, inc) => sum + inc.amount, 0);
  const totalExpenses = MOCK_EXPENSES.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <AuthProvider>
      <AppShell>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-slate-900">Balance</h1>
              <p className="text-slate-500">Manage your income and track your overall financial health.</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl gap-2 shadow-lg shadow-blue-100">
              <Plus className="w-5 h-5" />
              Add Income
            </Button>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-sm bg-slate-900 text-white overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-400 text-sm font-medium uppercase tracking-wider">Net Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-heading font-bold">${balance.toFixed(2)}</div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="px-2 py-1 bg-blue-500/20 rounded text-blue-400 text-xs font-bold">
                    Safe to spend
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">${totalIncome.toFixed(2)}</div>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4" />
                  +15% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">${totalExpenses.toFixed(2)}</div>
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm font-medium">
                  <ArrowDownRight className="w-4 h-4" />
                  +8% from last month
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Income */}
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-heading font-bold">Income History</CardTitle>
                  <CardDescription>Your recent earnings and allowances</CardDescription>
                </div>
                <History className="w-5 h-5 text-slate-400" />
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="text-xs uppercase text-slate-400 font-bold">Source</TableHead>
                      <TableHead className="text-xs uppercase text-slate-400 font-bold">Date</TableHead>
                      <TableHead className="text-xs uppercase text-slate-400 font-bold text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_INCOME.map((income) => (
                      <TableRow key={income.id} className="hover:bg-slate-50 border-slate-50">
                        <TableCell className="font-semibold text-slate-900">{income.source}</TableCell>
                        <TableCell className="text-slate-500 text-sm">{income.date}</TableCell>
                        <TableCell className="text-right font-bold text-green-600">
                          +${income.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Quick Summary */}
            <Card className="border-none shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-heading font-bold">Financial Summary</CardTitle>
                <CardDescription>How you&apos;re doing this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-slate-400 uppercase">Savings Rate</div>
                    <div className="text-2xl font-bold text-slate-900">24%</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Income utilized</span>
                    <span className="font-bold text-slate-900">{((totalExpenses / totalIncome) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${(totalExpenses / totalIncome) * 100}%` }} 
                    />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    You&apos;ve spent <span className="font-bold text-slate-900">${totalExpenses.toFixed(0)}</span> out of your <span className="font-bold text-slate-900">${totalIncome.toFixed(0)}</span> income. You&apos;re on track to save <span className="font-bold text-green-600">${(totalIncome - totalExpenses).toFixed(0)}</span> this month!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppShell>
    </AuthProvider>
  );
}
