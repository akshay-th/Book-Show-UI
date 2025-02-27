// components/manager/dashboard.tsx
"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';

// These would normally come from an API
const DAILY_BOOKINGS = [
  { date: 'Mon', bookings: 32, revenue: 28000 },
  { date: 'Tue', bookings: 27, revenue: 24300 },
  { date: 'Wed', bookings: 45, revenue: 40500 },
  { date: 'Thu', bookings: 50, revenue: 45000 },
  { date: 'Fri', bookings: 68, revenue: 61200 },
  { date: 'Sat', bookings: 97, revenue: 87300 },
  { date: 'Sun', bookings: 85, revenue: 76500 },
];

const SCREEN_UTILIZATION = [
  { name: 'Screen 1', value: 78 },
  { name: 'Screen 2', value: 65 },
  { name: 'Screen 3', value: 83 },
  { name: 'Screen 4', value: 72 },
];

const MOVIE_PERFORMANCE = [
  { name: 'Movie A', tickets: 350, revenue: 315000 },
  { name: 'Movie B', tickets: 280, revenue: 252000 },
  { name: 'Movie C', tickets: 210, revenue: 189000 },
  { name: 'Movie D', tickets: 190, revenue: 171000 },
  { name: 'Movie E', tickets: 175, revenue: 157500 },
];

const CANTEEN_SALES = [
  { category: 'Popcorn', sales: 45000 },
  { category: 'Beverages', sales: 38000 },
  { category: 'Snacks', sales: 27000 },
  { category: 'Combos', sales: 55000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface TheatreManagerDashboardProps {
  theatreId: string;
  theatreName: string;
}

export default function TheatreManagerDashboard({
  theatreId,
  theatreName,
}: TheatreManagerDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{theatreName} - Dashboard</h1>
      </div>
      
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">404</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹362,800</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Food Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹165,000</div>
            <p className="text-xs text-muted-foreground">+15% from last week</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Tabs */}
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily Overview</TabsTrigger>
          <TabsTrigger value="movies">Movie Performance</TabsTrigger>
          <TabsTrigger value="screens">Screen Utilization</TabsTrigger>
          <TabsTrigger value="canteen">Canteen Sales</TabsTrigger>
        </TabsList>
        
        {/* Daily Overview Tab */}
        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Bookings & Revenue</CardTitle>
              <CardDescription>
                Overview of daily bookings and revenue for the past week
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={DAILY_BOOKINGS}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="bookings"
                    stroke="#8884d8"
                    name="Bookings"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#82ca9d"
                    name="Revenue (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Movie Performance Tab */}
        <TabsContent value="movies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Movie Performance</CardTitle>
              <CardDescription>
                Ticket sales and revenue by movie
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={MOVIE_PERFORMANCE}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tickets" fill="#8884d8" name="Tickets Sold" />
                  <Bar dataKey="revenue" fill="#82ca9d" name="Revenue (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Screen Utilization Tab */}
        <TabsContent value="screens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Screen Utilization</CardTitle>
              <CardDescription>
                Occupancy percentage by screen
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={SCREEN_UTILIZATION}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={({ name, value }: { name: string; value: number }) => `${name}: ${value}%`}
                  >
                    {SCREEN_UTILIZATION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Canteen Sales Tab */}
        <TabsContent value="canteen" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Canteen Sales</CardTitle>
              <CardDescription>
                Sales by food category
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={CANTEEN_SALES}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `₹${value}`} />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" name="Sales (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>
            Most recent ticket bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left font-medium">Booking ID</th>
                  <th className="p-2 text-left font-medium">Movie</th>
                  <th className="p-2 text-left font-medium">Screen</th>
                  <th className="p-2 text-left font-medium">Date & Time</th>
                  <th className="p-2 text-left font-medium">Seats</th>
                  <th className="p-2 text-left font-medium">Amount</th>
                  <th className="p-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">BK9823</td>
                  <td className="p-2">Movie A</td>
                  <td className="p-2">Screen 2</td>
                  <td className="p-2">25 Feb, 6:30 PM</td>
                  <td className="p-2">G12, G13</td>
                  <td className="p-2">₹900</td>
                  <td className="p-2">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Confirmed
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">BK9822</td>
                  <td className="p-2">Movie C</td>
                  <td className="p-2">Screen 3</td>
                  <td className="p-2">25 Feb, 4:15 PM</td>
                  <td className="p-2">D5, D6, D7</td>
                  <td className="p-2">₹1,350</td>
                  <td className="p-2">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Confirmed
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">BK9821</td>
                  <td className="p-2">Movie B</td>
                  <td className="p-2">Screen 1</td>
                  <td className="p-2">25 Feb, 3:45 PM</td>
                  <td className="p-2">J8, J9</td>
                  <td className="p-2">₹900</td>
                  <td className="p-2">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2">BK9820</td>
                  <td className="p-2">Movie E</td>
                  <td className="p-2">Screen 4</td>
                  <td className="p-2">25 Feb, 1:30 PM</td>
                  <td className="p-2">C10</td>
                  <td className="p-2">₹450</td>
                  <td className="p-2">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Low Inventory Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-orange-800">Low Inventory Alert</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Popcorn (Large)</span>
              <span className="font-medium text-orange-800">15 units left</span>
            </li>
            <li className="flex justify-between">
              <span>Cola (330ml)</span>
              <span className="font-medium text-orange-800">20 units left</span>
            </li>
            <li className="flex justify-between">
              <span>Nachos</span>
              <span className="font-medium text-orange-800">8 units left</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}