// components/booking/food-order.tsx
"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  vegStatus: 'VEG' | 'NON_VEG' | 'VEGAN';
  imageUrl?: string;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

interface OrderItem {
  item: MenuItem;
  quantity: number;
  customizations?: string;
}

interface FoodOrderProps {
  theatreId: string;
  categories: MenuCategory[];
  onOrderChange: (orderItems: OrderItem[], totalAmount: number) => void;
}

export default function FoodOrder({
  theatreId,
  categories,
  onOrderChange,
}: FoodOrderProps) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories.length > 0 ? categories[0].id : ''
  );
  
  // Add item to order
  const addToOrder = (item: MenuItem) => {
    const existingItem = orderItems.find((orderItem) => orderItem.item.id === item.id);
    
    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.item.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setOrderItems([...orderItems, { item, quantity: 1 }]);
    }
    
    updateParent([...orderItems, { item, quantity: 1 }]);
  };
  
  // Remove item from order
  const removeFromOrder = (itemId: string) => {
    const updatedOrder = orderItems.filter((orderItem) => orderItem.item.id !== itemId);
    setOrderItems(updatedOrder);
    updateParent(updatedOrder);
  };
  
  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(itemId);
      return;
    }
    
    const updatedOrder = orderItems.map((orderItem) =>
      orderItem.item.id === itemId
        ? { ...orderItem, quantity }
        : orderItem
    );
    
    setOrderItems(updatedOrder);
    updateParent(updatedOrder);
  };
  
  // Update customization
  const updateCustomization = (itemId: string, customizations: string) => {
    const updatedOrder = orderItems.map((orderItem) =>
      orderItem.item.id === itemId
        ? { ...orderItem, customizations }
        : orderItem
    );
    
    setOrderItems(updatedOrder);
    updateParent(updatedOrder);
  };
  
  // Calculate total
  const calculateTotal = (items: OrderItem[]) => {
    return items.reduce(
      (total, orderItem) => total + orderItem.item.price * orderItem.quantity,
      0
    );
  };
  
  // Update parent component
  const updateParent = (items: OrderItem[]) => {
    onOrderChange(items, calculateTotal(items));
  };
  
  // Get veg status icon
  const getVegStatusIcon = (status: 'VEG' | 'NON_VEG' | 'VEGAN') => {
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
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Menu section */}
      <div className="flex-1">
        <div className="flex border-b mb-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'border-b-2 border-primary font-medium'
                  : 'text-muted-foreground'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {categories
            .find((category) => category.id === selectedCategory)
            ?.items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    {item.imageUrl && (
                      <div className="relative w-24 h-24">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-3 flex-1">
                      <div className="flex items-center gap-2">
                        {getVegStatusIcon(item.vegStatus)}
                        <h3 className="font-medium">{item.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-medium">₹{item.price.toFixed(2)}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToOrder(item)}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
      
      {/* Order summary section */}
      <div className="w-full md:w-80 lg:w-96">
        <div className="sticky top-20">
          <h2 className="text-lg font-semibold mb-4">Your Order</h2>
          
          {orderItems.length === 0 ? (
            <p className="text-muted-foreground">No items added to your order yet.</p>
          ) : (
            <div className="border rounded-lg divide-y">
              {orderItems.map((orderItem) => (
                <div key={orderItem.item.id} className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      {getVegStatusIcon(orderItem.item.vegStatus)}
                      <div>
                        <h4 className="font-medium">{orderItem.item.name}</h4>
                        <p className="text-sm">₹{orderItem.item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={() => 
                          updateQuantity(orderItem.item.id, orderItem.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <span className="w-6 text-center">{orderItem.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={() => 
                          updateQuantity(orderItem.item.id, orderItem.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <Input
                    className="mt-2 text-sm"
                    placeholder="Any special instructions?"
                    value={orderItem.customizations || ''}
                    onChange={(e) => 
                      updateCustomization(orderItem.item.id, e.target.value)
                    }
                  />
                </div>
              ))}
              
              <div className="p-3">
                <div className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal(orderItems).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}