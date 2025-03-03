// src/app/(theatre-manager)/manager-dashboard/page.tsx
"use client";
import ProtectedRoute from '@/components/protected-route';
import React from 'react';
import { 
  Ticket, 
  Users, 
  DollarSign, 
  ShoppingBasket, 
  ArrowUp, 
  ArrowDown, 
  Calendar, 
  AlertCircle, 
  Clapperboard,
  Film
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TheatreManagerLayout from '@/components/layout/theatre-manager-layout';

// Mock data for charts
const salesData = [
  { name: 'Mon', tickets: 32, food: 18 },
  { name: 'Tue', tickets: 38, food: 23 },
  { name: 'Wed', tickets: 30, food: 20 },
  { name: 'Thu', tickets: 35, food: 25 },
  { name: 'Fri', tickets: 70, food: 45 },
  { name: 'Sat', tickets: 95, food: 60 },
  { name: 'Sun', tickets: 85, food: 55 },
];

const occupancyData = [
  { name: 'Screen 1', morning: 60, afternoon: 75, evening: 90 },
  { name: 'Screen 2', morning: 55, afternoon: 70, evening: 85 },
  { name: 'Screen 3', morning: 65, afternoon: 80, evening: 95 },
];

const upcomingShowsData = [
  { id: 1, movie: 'Avengers: Endgame', screen: 'Screen 1', time: '10:00 AM', date: 'Today', occupancy: '45%' },
  { id: 2, movie: 'The Dark Knight', screen: 'Screen 2', time: '12:30 PM', date: 'Today', occupancy: '35%' },
  { id: 3, movie: 'Interstellar', screen: 'Screen 3', time: '3:00 PM', date: 'Today', occupancy: '60%' },
  { id: 4, movie: 'Inception', screen: 'Screen 1', time: '6:30 PM', date: 'Today', occupancy: '75%' },
  { id: 5, movie: 'The Shawshank Redemption', screen: 'Screen 2', time: '9:00 PM', date: 'Today', occupancy: '80%' },
];

const inventoryAlertsData = [
  { id: 1, item: 'Popcorn', status: 'Low Stock', quantity: '5 kg', threshold: '10 kg' },
  { id: 2, item: 'Nachos', status: 'Low Stock', quantity: '15 pcs', threshold: '30 pcs' },
  { id: 3, item: 'Coca Cola', status: 'Out of Stock', quantity: '0 bottles', threshold: '50 bottles' },
];

export default function TheatreManagerDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['THEATRE_MANAGER']}>
    <TheatreManagerLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Today
            </Button>
            <Button>Refresh</Button>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Total Ticket Sales</p>
                <Ticket className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold">₹38,540</h3>
                <div className="flex items-center text-sm text-green-500">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  12%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold">72%</h3>
                <div className="flex items-center text-sm text-green-500">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  5%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Food & Beverage</p>
                <ShoppingBasket className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold">₹12,480</h3>
                <div className="flex items-center text-sm text-red-500">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  3%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold">₹51,020</h3>
                <div className="flex items-center text-sm text-green-500">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  8%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales">Sales Overview</TabsTrigger>
            <TabsTrigger value="occupancy">Occupancy Rates</TabsTrigger>
          </TabsList>
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Sales</CardTitle>
                <CardDescription>
                  Comparison of ticket sales and food & beverage revenue
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tickets" stroke="#8884d8" activeDot={{ r: 8 }} name="Ticket Sales (₹000s)" />
                    <Line type="monotone" dataKey="food" stroke="#82ca9d" name="F&B Sales (₹000s)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="occupancy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Screen Occupancy</CardTitle>
                <CardDescription>
                  Average occupancy percentage by screen and show time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={occupancyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="morning" fill="#8884d8" name="Morning Show (%)" />
                    <Bar dataKey="afternoon" fill="#82ca9d" name="Afternoon Show (%)" />
                    <Bar dataKey="evening" fill="#ffc658" name="Evening Show (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Upcoming shows and alerts */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Upcoming Shows */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Today's Shows</CardTitle>
                <CardDescription>Quick overview of today's screenings</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingShowsData.map((show) => (
                  <div key={show.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div className="space-y-1">
                      <p className="font-medium">{show.movie}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clapperboard className="h-3 w-3" />
                        <span>{show.screen}</span>
                        <span>•</span>
                        <span>{show.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">{show.occupancy}</span>
                      <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: show.occupancy }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inventory Alerts */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Inventory Alerts</CardTitle>
                <CardDescription>Items requiring attention</CardDescription>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryAlertsData.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div className="space-y-1">
                      <p className="font-medium">{alert.item}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className={`h-3 w-3 ${alert.status === 'Out of Stock' ? 'text-red-500' : 'text-amber-500'}`} />
                        <span className={alert.status === 'Out of Stock' ? 'text-red-500' : 'text-amber-500'}>
                          {alert.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>{alert.quantity}</p>
                      <p className="text-xs">Threshold: {alert.threshold}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto flex-col p-4 space-y-2">
                <Film className="h-6 w-6" />
                <span>Add Movie</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col p-4 space-y-2">
                <Clapperboard className="h-6 w-6" />
                <span>Schedule Show</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col p-4 space-y-2">
                <Users className="h-6 w-6" />
                <span>Manage Staff</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col p-4 space-y-2">
                <ShoppingBasket className="h-6 w-6" />
                <span>Restock Items</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TheatreManagerLayout>
    </ProtectedRoute>
  );
}