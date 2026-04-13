'use client';

import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AuthProvider } from '@/hooks/use-auth';
import { MOCK_SAVINGS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  PiggyBank, 
  Plus, 
  Target, 
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress, ProgressTrack, ProgressIndicator } from '@/components/ui/progress';

export default function SavingsPage() {
  const totalSaved = MOCK_SAVINGS.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = MOCK_SAVINGS.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  return (
    <AuthProvider>
      <AppShell>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-slate-900">Savings</h1>
              <p className="text-slate-500">Plan for your future and reach your goals.</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl gap-2 shadow-lg shadow-blue-100">
              <Plus className="w-5 h-5" />
              New Goal
            </Button>
          </div>

          {/* Overall Progress Card */}
          <Card className="border-none shadow-sm bg-blue-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <PiggyBank className="w-32 h-32" />
            </div>
            <CardHeader>
              <CardTitle className="text-white/80 text-sm font-medium uppercase tracking-wider">Overall Savings Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="flex items-end gap-3">
                <div className="text-5xl font-heading font-bold">${totalSaved.toLocaleString()}</div>
                <div className="text-white/60 mb-2 font-medium">of ${totalTarget.toLocaleString()}</div>
              </div>
              <div className="space-y-2">
                <Progress value={overallProgress} className="h-3 bg-white/20">
                  <ProgressTrack>
                    <ProgressIndicator className="bg-white" />
                  </ProgressTrack>
                </Progress>
                <div className="flex justify-between text-sm font-medium text-white/80">
                  <span>{overallProgress.toFixed(1)}% Completed</span>
                  <span>${(totalTarget - totalSaved).toLocaleString()} left to go</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SAVINGS.map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              return (
                <Card key={goal.id} className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-heading font-bold">{goal.title}</CardTitle>
                      <CardDescription className="text-slate-500">Target: ${goal.targetAmount}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-400 h-8 w-8 rounded-lg">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-slate-900">${goal.currentAmount}</div>
                      <div className="text-xs font-bold px-2 py-1 bg-slate-100 rounded-lg text-slate-600">
                        {progress.toFixed(0)}%
                      </div>
                    </div>
                    <Progress value={progress} className="h-2 bg-slate-100">
                      <ProgressTrack>
                        <ProgressIndicator style={{ backgroundColor: goal.color }} />
                      </ProgressTrack>
                    </Progress>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-10 text-sm font-semibold">
                        Add Funds
                      </Button>
                      <Button variant="outline" className="flex-1 border-slate-200 hover:bg-slate-50 rounded-xl h-10 text-sm font-semibold">
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </AppShell>
    </AuthProvider>
  );
}
