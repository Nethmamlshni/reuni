'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const myBorrowedItems = [
    { id: 1, item: 'DSLR Camera', from: 'University', dueDate: 'Jan 15, 2026', status: 'Active' },
    { id: 2, item: 'Calculus Textbook', from: 'Emma L.', dueDate: 'Feb 1, 2026', status: 'Active' },
  ];

  const myListedItems = [
    { id: 1, item: 'Graphing Calculator', category: 'Electronics', status: 'Available', requests: 2 },
    { id: 2, item: 'Biology Lab Coat', category: 'Clothing', status: 'Borrowed', requests: 0 },
    { id: 3, item: 'Yoga Mat', category: 'Sports', status: 'Available', requests: 1 },
  ];

  const myRequests = [
    { id: 1, item: 'Projector', type: 'University', date: 'Jan 2, 2026', status: 'Pending' },
    { id: 2, item: 'Tent', type: 'University', date: 'Dec 30, 2025', status: 'Approved' },
  ];

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your items, borrowings, and requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                📷
              </div>
              <p className="text-2xl font-bold">{myBorrowedItems.length}</p>
              <p className="text-sm text-muted-foreground">Items Borrowed</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                📦
              </div>
              <p className="text-2xl font-bold">{myListedItems.length}</p>
              <p className="text-sm text-muted-foreground">My Listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                📩
              </div>
              <p className="text-2xl font-bold">{myRequests.length}</p>
              <p className="text-sm text-muted-foreground">Active Requests</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="borrowed">Borrowed Items</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="requests">My Requests</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold">Quick Summary</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Borrowings</span>
                    <span className="font-semibold">{myBorrowedItems.length} items</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Items Listed</span>
                    <span className="font-semibold">{myListedItems.length} items</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pending Requests</span>
                    <Badge variant="outline" className="text-amber-700">{myRequests.filter(r => r.status === 'Pending').length} pending</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Incoming Requests</span>
                    <span className="font-semibold">{myRequests.length} requests</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold">Quick Actions</h3>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Link href="/catalog">
                    <Button className="w-full">Browse Available Items</Button>
                  </Link>
                  <Button variant="outline" className="w-full flex justify-between items-center">
                    List a New Item
                    <span className="text-xl font-bold">+</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Borrowed Items */}
          <TabsContent value="borrowed">
            <div className="space-y-4">
              {myBorrowedItems.map((item) => (
                <Card key={item.id} className="flex justify-between items-start p-5">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl">
                      {item.item.includes('Camera') ? '📷' : '📚'}
                    </div>
                    <div>
                      <p className="font-semibold">{item.item}</p>
                      <p className="text-sm text-muted-foreground">From: {item.from}</p>
                      <p className="text-xs text-muted-foreground">Due: {item.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Badge>{item.status}</Badge>
                    <Button variant="outline" size="sm">Return</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Listings */}
          <TabsContent value="listings">
            <div className="space-y-4">
              {myListedItems.map((item) => (
                <Card key={item.id} className="flex justify-between items-start p-5">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl">
                      {item.item.includes('Calculator') ? '🧮' : item.item.includes('Lab') ? '🥼' : '🧘'}
                    </div>
                    <div>
                      <p className="font-semibold">{item.item}</p>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      {item.requests > 0 && <Badge variant="outline" className="mt-2">{item.requests} pending</Badge>}
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Badge variant={item.status === 'Available' ? 'default' : 'secondary'}>{item.status}</Badge>
                    <Button variant="ghost" size="icon">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Requests */}
          <TabsContent value="requests">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left border-b border-border">
                    <th className="px-4 py-2 text-xs font-semibold text-muted-foreground">Item</th>
                    <th className="px-4 py-2 text-xs font-semibold text-muted-foreground">Type</th>
                    <th className="px-4 py-2 text-xs font-semibold text-muted-foreground">Date</th>
                    <th className="px-4 py-2 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="px-4 py-2 text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                  {myRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-4 py-2">{request.item}</td>
                      <td className="px-4 py-2">
                        <Badge variant="secondary">{request.type}</Badge>
                      </td>
                      <td className="px-4 py-2 text-sm text-muted-foreground">{request.date}</td>
                      <td className="px-4 py-2">
                        <Badge variant={request.status === 'Pending' ? 'warning' : 'success'}>
                          {request.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">
                        <Button variant="outline" size="sm">Cancel</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
