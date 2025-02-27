// components/employee/canteen-management.tsx
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for initial orders
const MOCK_ORDERS = [
  {
    id: 'FO12345',
    bookingId: 'BK9823',
    customerName: 'Rahul Sharma',
    items: [
      { id: '1', name: 'Large Popcorn', quantity: 1, price: 250 },
      { id: '2', name: 'Coke (Large)', quantity: 2, price: 150 },
    ],
    total: 550,
    status: 'PENDING',
    createdAt: '2025-02-26T14:20:00',
    isPrepaid: true,
    isBookingAssociated: true,
  },
  {
    id: 'FO12346',
    bookingId: 'BK9825',
    customerName: 'Neha Gupta',
    items: [
      { id: '3', name: 'Cheese Nachos', quantity: 1, price: 200 },
      { id: '4', name: 'Fanta (Medium)', quantity: 1, price: 120 },
    ],
    total: 320,
    status: 'PREPARING',
    createdAt: '2025-02-26T14:15:00',
    isPrepaid: true,
    isBookingAssociated: true,
  },
  {
    id: 'FO12347',
    bookingId: null,
    customerName: 'Walk-in Customer',
    items: [
      { id: '5', name: 'Caramel Popcorn (Medium)', quantity: 1, price: 220 },
      { id: '6', name: 'Bottled Water', quantity: 2, price: 60 },
    ],
    total: 340,
    status: 'READY',
    createdAt: '2025-02-26T14:10:00',
    isPrepaid: false,
    isBookingAssociated: false,
  },
  {
    id: 'FO12348',
    bookingId: 'BK9820',
    customerName: 'Priya Singh',
    items: [
      { id: '7', name: 'Combo Meal 1', quantity: 2, price: 450 },
    ],
    total: 900,
    status: 'DELIVERED',
    createdAt: '2025-02-26T13:50:00',
    isPrepaid: true,
    isBookingAssociated: true,
  },
];

// Mock menu items for selling without booking association
const MENU_ITEMS = [
  { id: 'm1', name: 'Small Popcorn', price: 150, category: 'Popcorn', vegStatus: 'VEG' },
  { id: 'm2', name: 'Medium Popcorn', price: 200, category: 'Popcorn', vegStatus: 'VEG' },
  { id: 'm3', name: 'Large Popcorn', price: 250, category: 'Popcorn', vegStatus: 'VEG' },
  { id: 'm4', name: 'Caramel Popcorn (Small)', price: 180, category: 'Popcorn', vegStatus: 'VEG' },
  { id: 'm5', name: 'Caramel Popcorn (Medium)', price: 220, category: 'Popcorn', vegStatus: 'VEG' },
  { id: 'm6', name: 'Caramel Popcorn (Large)', price: 280, category: 'Popcorn', vegStatus: 'VEG' },
  { id: 'm7', name: 'Cheese Popcorn (Small)', price: 180, category: 'Popcorn', vegStatus: 'VEG' },
  { id: 'm8', name: 'Cheese Popcorn (Medium)', price: 220, category: 'Popcorn', vegStatus: 'VEG' },
  { id: 'm9', name: 'Cheese Popcorn (Large)', price: 280, category: 'Popcorn', vegStatus: 'VEG' },
  { id: 'm10', name: 'Coke (Small)', price: 100, category: 'Beverages', vegStatus: 'VEG' },
  { id: 'm11', name: 'Coke (Medium)', price: 120, category: 'Beverages', vegStatus: 'VEG' },
  { id: 'm12', name: 'Coke (Large)', price: 150, category: 'Beverages', vegStatus: 'VEG' },
  { id: 'm13', name: 'Fanta (Small)', price: 100, category: 'Beverages', vegStatus: 'VEG' },
  { id: 'm14', name: 'Fanta (Medium)', price: 120, category: 'Beverages', vegStatus: 'VEG' },
  { id: 'm15', name: 'Fanta (Large)', price: 150, category: 'Beverages', vegStatus: 'VEG' },
  { id: 'm16', name: 'Sprite (Small)', price: 100, category: 'Beverages', vegStatus: 'VEG' },
  { id: 'm17', name: 'Sprite (Medium)', price: 120, category: 'Beverages', vegStatus: 'VEG' },
  { id: 'm18', name: 'Sprite (Large)', price: 150, category: 'Beverages', vegStatus: 'VEG' },
  { id: 'm19', name: 'Bottled Water', price: 60, category: 'Beverages', vegStatus: 'VEG' },
  { id: 'm20', name: 'Cheese Nachos', price: 200, category: 'Snacks', vegStatus: 'VEG' },
  { id: 'm21', name: 'French Fries', price: 150, category: 'Snacks', vegStatus: 'VEG' },
  { id: 'm22', name: 'Samosa (2 pcs)', price: 80, category: 'Snacks', vegStatus: 'VEG' },
  { id: 'm23', name: 'Veg Burger', price: 120, category: 'Snacks', vegStatus: 'VEG' },
  { id: 'm24', name: 'Veg Sandwich', price: 100, category: 'Snacks', vegStatus: 'VEG' },
  { id: 'm25', name: 'Combo Meal 1 (Large Popcorn + 2 Large Drinks)', price: 450, category: 'Combos', vegStatus: 'VEG' },
  { id: 'm26', name: 'Combo Meal 2 (Medium Popcorn + 2 Medium Drinks + Nachos)', price: 500, category: 'Combos', vegStatus: 'VEG' },
  { id: 'm27', name: 'Combo Meal 3 (2 Burgers + 2 Medium Drinks + 1 Medium Popcorn)', price: 550, category: 'Combos', vegStatus: 'VEG' },
];

// Order statuses
const ORDER_STATUSES = ['PENDING', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'];

type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  vegStatus: 'VEG' | 'NON_VEG' | 'VEGAN';
};

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  bookingId: string | null;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  isPrepaid: boolean;
  isBookingAssociated: boolean;
};

interface CanteenManagementProps {
  theatreId: string;
  employeeId: string;
}

export default function CanteenManagement({
  theatreId,
  employeeId,
}: CanteenManagementProps) {
  // State for orders
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(MOCK_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for new walk-in order
  const [selectedItems, setSelectedItems] = useState<{
    item: MenuItem;
    quantity: number;
  }[]>([]);
  const [customerName, setCustomerName] = useState('Walk-in Customer');
  
  // Filter menu items by category
  const getMenuItemsByCategory = (category: string) => {
    return MENU_ITEMS.filter(item => item.category === category);
  };

  // Get unique categories
  const categories = Array.from(new Set(MENU_ITEMS.map(item => item.category)));
  
  // Filter orders based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredOrders(orders);
      return;
    }
    
    const filtered = orders.filter(
      order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.bookingId && order.bookingId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);
  
  // Add item to new order
  const addItemToOrder = (item: MenuItem) => {
    const existingItem = selectedItems.find(
      selectedItem => selectedItem.item.id === item.id
    );
    
    if (existingItem) {
      setSelectedItems(
        selectedItems.map(selectedItem =>
          selectedItem.item.id === item.id
            ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
            : selectedItem
        )
      );
    } else {
      setSelectedItems([...selectedItems, { item, quantity: 1 }]);
    }
  };
  
  // Remove item from new order
  const removeItemFromOrder = (itemId: string) => {
    setSelectedItems(selectedItems.filter(item => item.item.id !== itemId));
  };
  
  // Update item quantity
  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromOrder(itemId);
      return;
    }
    
    setSelectedItems(
      selectedItems.map(selectedItem =>
        selectedItem.item.id === itemId
          ? { ...selectedItem, quantity }
          : selectedItem
      )
    );
  };
  
  // Calculate total for new order
  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, { item, quantity }) => total + item.price * quantity,
      0
    );
  };
  
  // Create new walk-in order
  const createOrder = () => {
    if (selectedItems.length === 0) return;
    
    const newOrder: Order = {
      id: `FO${Math.floor(10000 + Math.random() * 90000)}`,
      bookingId: null,
      customerName,
      items: selectedItems.map(({ item, quantity }) => ({
        id: item.id,
        name: item.name,
        quantity,
        price: item.price,
      })),
      total: calculateTotal(),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      isPrepaid: false,
      isBookingAssociated: false,
    };
    
    setOrders([newOrder, ...orders]);
    setFilteredOrders([newOrder, ...filteredOrders]);
    
    // Reset new order form
    setSelectedItems([]);
    setCustomerName('Walk-in Customer');
  };
  
  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    
    // Update filtered orders as well
    setFilteredOrders(
      filteredOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };
  
  // Render veg/non-veg icon
  const renderVegIcon = (status: 'VEG' | 'NON_VEG' | 'VEGAN') => {
    if (status === 'VEG') {
      return (
        <div className="w-4 h-4 border border-green-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
        </div>
      );
    }
    
    if (status === 'NON_VEG') {
      return (
        <div className="w-4 h-4 border border-red-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
        </div>
      );
    }
    
    return (
      <div className="w-4 h-4 border border-green-700 flex items-center justify-center">
        <div className="w-2 h-2 bg-green-700 rounded-full" />
      </div>
    );
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Canteen Management</h1>
      </div>
      
      <Tabs defaultValue="orders">
        <TabsList className="mb-4">
          <TabsTrigger value="orders">Current Orders</TabsTrigger>
          <TabsTrigger value="new">New Walk-in Order</TabsTrigger>
        </TabsList>
        
        {/* Current Orders Tab */}
        <TabsContent value="orders">
          <div className="space-y-4">
            <div className="flex">
              <Input
                placeholder="Search orders by ID, booking ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {filteredOrders.map(order => (
                <Card key={order.id} className={`overflow-hidden ${
                  order.status === 'PENDING' ? 'border-orange-300' :
                  order.status === 'PREPARING' ? 'border-blue-300' :
                  order.status === 'READY' ? 'border-green-300' :
                  ''
                }`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {order.id}
                          {order.isBookingAssociated && (
                            <span className="text-xs font-normal bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              Booking: {order.bookingId}
                            </span>
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {order.customerName} • {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              {order.status}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {ORDER_STATUSES.map(status => (
                              <DropdownMenuItem
                                key={status}
                                onClick={() => updateOrderStatus(order.id, status)}
                              >
                                {status}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Order Items:</p>
                      <ul className="space-y-1 text-sm">
                        {order.items.map(item => (
                          <li key={item.id} className="flex justify-between">
                            <span>
                              {item.quantity} x {item.name}
                            </span>
                            <span>₹{item.price * item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="pt-2 border-t mt-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Total:</span>
                          <span>₹{order.total}</span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Payment Status:</span>
                          <span>{order.isPrepaid ? 'Pre-paid' : 'Pay at Counter'}</span>
                        </div>
                      </div>
                      
                      <div className="pt-2 flex justify-end gap-2">
                        {order.status === 'PENDING' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                          >
                            Start Preparing
                          </Button>
                        )}
                        
                        {order.status === 'PREPARING' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateOrderStatus(order.id, 'READY')}
                          >
                            Mark as Ready
                          </Button>
                        )}
                        
                        {order.status === 'READY' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                          >
                            Mark as Delivered
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredOrders.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No orders found.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* New Walk-in Order Tab */}
        <TabsContent value="new">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Menu Items */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Menu Items</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs defaultValue={categories[0]} className="w-full">
                    <TabsList className="w-full flex overflow-x-auto justify-start">
                      {categories.map(category => (
                        <TabsTrigger 
                          key={category} 
                          value={category}
                          className="flex-shrink-0"
                        >
                          {category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {categories.map(category => (
                      <TabsContent key={category} value={category} className="pt-4 px-4">
                        <div className="space-y-2">
                          {getMenuItemsByCategory(category).map(item => (
                            <div 
                              key={item.id} 
                              className="flex justify-between items-center p-2 hover:bg-muted rounded cursor-pointer"
                              //@ts-ignore
                              onClick={() => addItemToOrder(item)}
                            >
                              <div className="flex items-center gap-2">
                              {/* @ts-ignore */}
                                {renderVegIcon(item.vegStatus)}
                                <span>{item.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>₹{item.price}</span>
                                <Button variant="ghost" size="sm">+</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  
                  <div className="space-y-2">
                    <p className="font-medium">Selected Items:</p>
                    
                    {selectedItems.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No items selected. Click on menu items to add them to the order.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {selectedItems.map(({ item, quantity }) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {renderVegIcon(item.vegStatus)}
                              <span>{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 rounded-full"
                                onClick={() => updateItemQuantity(item.id, quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-6 text-center">{quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 rounded-full"
                                onClick={() => updateItemQuantity(item.id, quantity + 1)}
                              >
                                +
                              </Button>
                              <span className="w-16 text-right">
                                ₹{item.price * quantity}
                              </span>
                            </div>
                          </div>
                        ))}
                        
                        <div className="pt-2 border-t mt-2">
                          <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <span>₹{calculateTotal()}</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full mt-4" 
                          onClick={createOrder}
                          disabled={selectedItems.length === 0}
                        >
                          Create Order
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}