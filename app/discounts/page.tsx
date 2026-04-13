'use client';

import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AuthProvider } from '@/hooks/use-auth';
import { MOCK_DISCOUNTS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { 
  Tag, 
  Search, 
  ExternalLink, 
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

export default function DiscountsPage() {
  return (
    <AuthProvider>
      <AppShell>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-slate-900">Student Discounts</h1>
              <p className="text-slate-500">Exclusive deals and offers just for you.</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search brands or deals..." 
                className="pl-10 bg-white border-none shadow-sm rounded-xl focus-visible:ring-blue-600 h-11"
              />
            </div>
          </div>

          {/* Featured Deal */}
          <Card className="border-none shadow-sm bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 space-y-6">
                <Badge className="bg-white/20 text-white border-none hover:bg-white/30 rounded-lg px-3 py-1">
                  Featured Offer
                </Badge>
                <div className="space-y-2">
                  <h2 className="text-4xl font-heading font-bold leading-tight">Get 6 Months of Amazon Prime Free</h2>
                  <p className="text-blue-100 text-lg">Plus 50% off after your trial ends. The ultimate student hack.</p>
                </div>
                <Button className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl px-8 h-12 font-bold text-base gap-2">
                  Claim Deal <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
              <div className="hidden md:flex items-center justify-center relative bg-white/10 backdrop-blur-sm">
                <Sparkles className="w-32 h-32 text-white/20 absolute" />
                <div className="relative z-10 p-8 bg-white rounded-3xl shadow-2xl rotate-3">
                  <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl font-bold text-slate-900">a</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-xl shadow-sm border-none h-12">
              <TabsTrigger value="all" className="rounded-lg px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white">All Deals</TabsTrigger>
              <TabsTrigger value="tech" className="rounded-lg px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Tech</TabsTrigger>
              <TabsTrigger value="fashion" className="rounded-lg px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Fashion</TabsTrigger>
              <TabsTrigger value="food" className="rounded-lg px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Food</TabsTrigger>
              <TabsTrigger value="entertainment" className="rounded-lg px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Entertainment</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_DISCOUNTS.map((discount) => (
                <Card key={discount.id} className="border-none shadow-sm bg-white hover:shadow-md transition-all group overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 relative">
                        <Image 
                          src={discount.logo} 
                          alt={discount.brand} 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none rounded-lg">
                        {discount.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <CardTitle className="text-xl font-heading font-bold text-slate-900">{discount.brand}</CardTitle>
                    <p className="text-slate-600 font-medium line-clamp-2">{discount.offer}</p>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      Expires {discount.expiryDate}
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg font-bold p-0 px-2">
                      View Deal <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </AppShell>
    </AuthProvider>
  );
}
