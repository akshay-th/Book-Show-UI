// src/app/(theatre-manager)/inventory/page.tsx
"use client";

import React, { useState } from 'react';
import { 
  ShoppingBasket, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  AlertCircle, 
  ArrowDown, 
  ArrowUp, 
  RefreshCw, 
  Package, 
  BarChart4, 
  Menu, 
  Coffee, 
  Pizza, 
  Utensils, 
  XCircle,
  CheckCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

import TheatreManagerLayout from '@/components/layout/theatre-manager-layout';

// Mock data for inventory items
const inventoryItemsMockData = [
  {
    id: 1,
    name: 'Popcorn',
    category: 'SNACKS',
    currentStock: 25,
    unit: 'kg',
    reorderLevel: 20,
    averageConsumption: '5 kg/day',
    lastUpdated: '2025-03-01',
    costPerUnit: 120,
    status: 'IN_STOCK'
  },
  {
    id: 2,
    name: 'Coca Cola',
    category: 'BEVERAGES',
    currentStock: 120,
    unit: 'bottles',
    reorderLevel: 80,
    averageConsumption: '40 bottles/day',
    lastUpdated: '2025-03-01',
    costPerUnit: 35,
    status: 'IN_STOCK'
  },
  {
    id: 3,
    name: 'Nachos',
    category: 'SNACKS',
    currentStock: 15,
    unit: 'packs',
    reorderLevel: 20,
    averageConsumption: '8 packs/day',
    lastUpdated: '2025-03-01',
    costPerUnit: 85,
    status: 'LOW_STOCK'
  },
  {
    id: 4,
    name: 'Cheese Dip',
    category: 'SNACKS',
    currentStock: 8,
    unit: 'kg',
    reorderLevel: 10,
    averageConsumption: '2 kg/day',
    lastUpdated: '2025-03-01',
    costPerUnit: 150,
    status: 'LOW_STOCK'
  },
  {
    id: 5,
    name: 'Hot Dogs',
    category: 'FAST_FOOD',
    currentStock: 0,
    unit: 'pieces',
    reorderLevel: 50,
    averageConsumption: '25 pieces/day',
    lastUpdated: '2025-02-25',
    costPerUnit: 25,
    status: 'OUT_OF_STOCK'
  },
  {
    id: 6,
    name: 'French Fries',
    category: 'FAST_FOOD',
    currentStock: 45,
    unit: 'kg',
    reorderLevel: 25,
    averageConsumption: '12 kg/day',
    lastUpdated: '2025-03-01',
    costPerUnit: 90,
    status: 'IN_STOCK'
  },
  {
    id: 7,
    name: 'Mineral Water',
    category: 'BEVERAGES',
    currentStock: 200,
    unit: 'bottles',
    reorderLevel: 100,
    averageConsumption: '40 bottles/day',
    lastUpdated: '2025-03-01',
    costPerUnit: 20,
    status: 'IN_STOCK'
  },
  {
    id: 8,
    name: 'Paper Cups',
    category: 'DISPOSABLES',
    currentStock: 500,
    unit: 'pieces',
    reorderLevel: 300,
    averageConsumption: '150 pieces/day',
    lastUpdated: '2025-03-01',
    costPerUnit: 2,
    status: 'IN_STOCK'
  },
  {
    id: 9,
    name: 'Napkins',
    category: 'DISPOSABLES',
    currentStock: 300,
    unit: 'pieces',
    reorderLevel: 500,
    averageConsumption: '200 pieces/day',
    lastUpdated: '2025-03-01',
    costPerUnit: 0.5,
    status: 'LOW_STOCK'
  }
];

// Mock data for menu items
const menuItemsMockData = [
  {
    id: 1,
    name: 'Large Popcorn',
    category: 'SNACKS',
    price: 150,
    status: 'AVAILABLE',
    ingredients: ['Popcorn', 'Butter', 'Salt'],
    isVeg: true,
    popular: true
  },
  {
    id: 2,
    name: 'Regular Popcorn',
    category: 'SNACKS',
    price: 100,
    status: 'AVAILABLE',
    ingredients: ['Popcorn', 'Butter', 'Salt'],
    isVeg: true,
    popular: false
  },
  {
    id: 3,
    name: 'Cheese Nachos',
    category: 'SNACKS',
    price: 180,
    status: 'LOW_STOCK',
    ingredients: ['Nachos', 'Cheese Dip'],
    isVeg: true,
    popular: true
  },
  {
    id: 4,
    name: 'Hot Dog',
    category: 'FAST_FOOD',
    price: 120,
    status: 'OUT_OF_STOCK',
    ingredients: ['Hot Dogs', 'Bun', 'Sauce'],
    isVeg: false,
    popular: true
  },
  {
    id: 5,
    name: 'French Fries',
    category: 'FAST_FOOD',
    price: 100,
    status: 'AVAILABLE',
    ingredients: ['French Fries', 'Salt'],
    isVeg: true,
    popular: true
  },
  {
    id: 6,
    name: 'Cola (Large)',
    category: 'BEVERAGES',
    price: 80,
    status: 'AVAILABLE',
    ingredients: ['Coca Cola'],
    isVeg: true,
    popular: false
  },
  {
    id: 7,
    name: 'Mineral Water',
    category: 'BEVERAGES',
    price: 40,
    status: 'AVAILABLE',
    ingredients: ['Mineral Water'],
    isVeg: true,
    popular: false
  }
];

// Mock data for consumption
const consumptionData = [
  { date: 'Mon', popcorn: 4, nachos: 6, fries: 10, beverages: 35 },
  { date: 'Tue', popcorn: 3, nachos: 7, fries: 8, beverages: 30 },
  { date: 'Wed', popcorn: 3, nachos: 5, fries: 7, beverages: 28 },
  { date: 'Thu', popcorn: 5, nachos: 8, fries: 12, beverages: 40 },
  { date: 'Fri', popcorn: 7, nachos: 10, fries: 15, beverages: 50 },
  { date: 'Sat', popcorn: 9, nachos: 12, fries: 18, beverages: 65 },
  { date: 'Sun', popcorn: 8, nachos: 11, fries: 16, beverages: 55 }
];

// Helper function to get status badge for inventory
const getInventoryStatusBadge = (status: string) => {
  switch(status) {
    case 'IN_STOCK':
      return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">In Stock</Badge>;
    case 'LOW_STOCK':
      return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500">Low Stock</Badge>;
    case 'OUT_OF_STOCK':
      return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">Out of Stock</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

// Helper function to get status badge for menu items
const getMenuStatusBadge = (status: string) => {
  switch(status) {
    case 'AVAILABLE':
      return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">Available</Badge>;
    case 'LOW_STOCK':
      return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500">Low Stock</Badge>;
    case 'OUT_OF_STOCK':
      return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">Unavailable</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

// Helper function to get category icon
const getCategoryIcon = (category: string) => {
  switch(category) {
    case 'SNACKS':
      return <Package className="h-4 w-4" />;
    case 'BEVERAGES':
      return <Coffee className="h-4 w-4" />;
    case 'FAST_FOOD':
      return <Pizza className="h-4 w-4" />;
    case 'DISPOSABLES':
      return <Utensils className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};
export default function TheatreManagerInventoryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [inventoryItems, setInventoryItems] = useState(inventoryItemsMockData);
    const [menuItems, setMenuItems] = useState(menuItemsMockData);
    const [activeTab, setActiveTab] = useState('inventory');
  
    const [isAddInventoryOpen, setIsAddInventoryOpen] = useState(false);
    const [isEditInventoryOpen, setIsEditInventoryOpen] = useState(false);
    const [currentInventoryItem, setCurrentInventoryItem] = useState<any>(null);
  
    const [isAddMenuItemOpen, setIsAddMenuItemOpen] = useState(false);
    const [isEditMenuItemOpen, setIsEditMenuItemOpen] = useState(false);
    const [currentMenuItem, setCurrentMenuItem] = useState<any>(null);
  
    const [isStockUpdateOpen, setIsStockUpdateOpen] = useState(false);
    const [updateQuantity, setUpdateQuantity] = useState('');
    const [updateType, setUpdateType] = useState('add');
  
    // Filter inventory items based on search query and category
    const filteredInventoryItems = inventoryItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  
    // Filter menu items based on search query and category
    const filteredMenuItems = menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  
    // Handle opening edit dialog for inventory item
    const handleEditInventoryItem = (item: any) => {
      setCurrentInventoryItem(item);
      setIsEditInventoryOpen(true);
    };
  
    // Handle opening stock update dialog
    const handleStockUpdate = (item: any) => {
      setCurrentInventoryItem(item);
      setUpdateQuantity('');
      setUpdateType('add');
      setIsStockUpdateOpen(true);
    };
  
    // Handle opening edit dialog for menu item
    const handleEditMenuItem = (item: any) => {
      setCurrentMenuItem(item);
      setIsEditMenuItemOpen(true);
    };
  
    // Handle deleting inventory item
    const handleDeleteInventoryItem = (id: number) => {
      setInventoryItems(inventoryItems.filter(item => item.id !== id));
    };
  
    // Handle deleting menu item
    const handleDeleteMenuItem = (id: number) => {
      setMenuItems(menuItems.filter(item => item.id !== id));
    };
  
    // Handle adding inventory item
    const handleAddInventoryItem = (event: React.FormEvent) => {
      event.preventDefault();
      // In a real app, you would add the item to the database
      setIsAddInventoryOpen(false);
    };
  
    // Handle updating inventory item
    const handleEditInventorySave = (event: React.FormEvent) => {
      event.preventDefault();
      // In a real app, you would update the item in the database
      setIsEditInventoryOpen(false);
    };
  
    // Handle stock update
    const handleStockUpdateSave = (event: React.FormEvent) => {
      event.preventDefault();
      // In a real app, you would update the stock in the database
      setIsStockUpdateOpen(false);
    };
  
    // Handle adding menu item
    const handleAddMenuItem = (event: React.FormEvent) => {
      event.preventDefault();
      // In a real app, you would add the menu item to the database
      setIsAddMenuItemOpen(false);
    };
  
    // Handle updating menu item
    const handleEditMenuItemSave = (event: React.FormEvent) => {
      event.preventDefault();
      // In a real app, you would update the menu item in the database
      setIsEditMenuItemOpen(false);
    };
  
    return (
      <TheatreManagerLayout>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
            
            {activeTab === 'inventory' ? (
              <Dialog open={isAddInventoryOpen} onOpenChange={setIsAddInventoryOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Add Inventory Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Add Inventory Item</DialogTitle>
                    <DialogDescription>
                      Add a new item to your inventory. Fill in all the necessary details.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddInventoryItem}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Item Name</Label>
                        <Input id="name" placeholder="Item name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SNACKS">Snacks</SelectItem>
                            <SelectItem value="BEVERAGES">Beverages</SelectItem>
                            <SelectItem value="FAST_FOOD">Fast Food</SelectItem>
                            <SelectItem value="DISPOSABLES">Disposables</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="currentStock" className="text-right">Initial Stock</Label>
                        <Input id="currentStock" type="number" placeholder="0" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="unit" className="text-right">Unit</Label>
                        <Input id="unit" placeholder="e.g., kg, bottles, pieces" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="reorderLevel" className="text-right">Reorder Level</Label>
                        <Input id="reorderLevel" type="number" placeholder="0" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="costPerUnit" className="text-right">Cost Per Unit (₹)</Label>
                        <Input id="costPerUnit" type="number" placeholder="0" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddInventoryOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Item</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog open={isAddMenuItemOpen} onOpenChange={setIsAddMenuItemOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Add Menu Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Add Menu Item</DialogTitle>
                    <DialogDescription>
                      Add a new item to your food & beverage menu.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddMenuItem}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Item Name</Label>
                        <Input id="name" placeholder="Menu item name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SNACKS">Snacks</SelectItem>
                            <SelectItem value="BEVERAGES">Beverages</SelectItem>
                            <SelectItem value="FAST_FOOD">Fast Food</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Price (₹)</Label>
                        <Input id="price" type="number" placeholder="0" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="isVeg" className="text-right">Veg/Non-Veg</Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Vegetarian</SelectItem>
                            <SelectItem value="false">Non-Vegetarian</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ingredients" className="text-right">Ingredients</Label>
                        <Input id="ingredients" placeholder="Comma-separated ingredients" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="popular" className="text-right">Mark as Popular</Label>
                        <div className="col-span-3">
                          <input
                            type="checkbox"
                            id="popular"
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddMenuItemOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Menu Item</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
  
          {/* Edit Inventory Dialog */}
          {currentInventoryItem && (
            <Dialog open={isEditInventoryOpen} onOpenChange={setIsEditInventoryOpen}>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Edit Inventory Item</DialogTitle>
                  <DialogDescription>
                    Update inventory item details.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditInventorySave}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-name" className="text-right">Item Name</Label>
                      <Input 
                        id="edit-name" 
                        placeholder="Item name" 
                        className="col-span-3" 
                        defaultValue={currentInventoryItem.name}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-category" className="text-right">Category</Label>
                      <Select defaultValue={currentInventoryItem.category}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SNACKS">Snacks</SelectItem>
                          <SelectItem value="BEVERAGES">Beverages</SelectItem>
                          <SelectItem value="FAST_FOOD">Fast Food</SelectItem>
                          <SelectItem value="DISPOSABLES">Disposables</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-reorderLevel" className="text-right">Reorder Level</Label>
                      <Input 
                        id="edit-reorderLevel" 
                        type="number" 
                        className="col-span-3" 
                        defaultValue={currentInventoryItem.reorderLevel}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-unit" className="text-right">Unit</Label>
                      <Input 
                        id="edit-unit" 
                        className="col-span-3" 
                        defaultValue={currentInventoryItem.unit}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-costPerUnit" className="text-right">Cost Per Unit (₹)</Label>
                      <Input 
                        id="edit-costPerUnit" 
                        type="number" 
                        className="col-span-3" 
                        defaultValue={currentInventoryItem.costPerUnit}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsEditInventoryOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
  
          {/* Stock Update Dialog */}
          {currentInventoryItem && (
            <Dialog open={isStockUpdateOpen} onOpenChange={setIsStockUpdateOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update Stock Level</DialogTitle>
                  <DialogDescription>
                    Update stock level for {currentInventoryItem.name}.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleStockUpdateSave}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="update-type" className="text-right">Action</Label>
                      <Select 
                        value={updateType} 
                        onValueChange={setUpdateType}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="add">Add Stock</SelectItem>
                          <SelectItem value="remove">Remove Stock</SelectItem>
                          <SelectItem value="set">Set Exact Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="update-quantity" className="text-right">Quantity</Label>
                      <Input 
                        id="update-quantity" 
                        type="number" 
                        className="col-span-3" 
                        value={updateQuantity}
                        onChange={(e) => setUpdateQuantity(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Current</Label>
                      <div className="col-span-3 font-medium">
                        {currentInventoryItem.currentStock} {currentInventoryItem.unit}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">After Update</Label>
                      <div className="col-span-3 font-medium">
                        {updateType === 'add' 
                          ? currentInventoryItem.currentStock + (parseInt(updateQuantity) || 0) 
                          : updateType === 'remove' 
                            ? Math.max(0, currentInventoryItem.currentStock - (parseInt(updateQuantity) || 0))
                            : (parseInt(updateQuantity) || 0)
                        } {currentInventoryItem.unit}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsStockUpdateOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Update Stock</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
  
          {/* Edit Menu Item Dialog */}
          {currentMenuItem && (
            <Dialog open={isEditMenuItemOpen} onOpenChange={setIsEditMenuItemOpen}>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Edit Menu Item</DialogTitle>
                  <DialogDescription>
                    Update menu item details.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditMenuItemSave}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-menu-name" className="text-right">Item Name</Label>
                      <Input 
                        id="edit-menu-name" 
                        placeholder="Menu item name" 
                        className="col-span-3" 
                        defaultValue={currentMenuItem.name}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-menu-category" className="text-right">Category</Label>
                      <Select defaultValue={currentMenuItem.category}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SNACKS">Snacks</SelectItem>
                        <SelectItem value="BEVERAGES">Beverages</SelectItem>
                        <SelectItem value="FAST_FOOD">Fast Food</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-menu-price" className="text-right">Price (₹)</Label>
                    <Input 
                      id="edit-menu-price" 
                      type="number" 
                      className="col-span-3" 
                      defaultValue={currentMenuItem.price}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-menu-isVeg" className="text-right">Veg/Non-Veg</Label>
                    <Select defaultValue={currentMenuItem.isVeg.toString()}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Vegetarian</SelectItem>
                        <SelectItem value="false">Non-Vegetarian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-menu-ingredients" className="text-right">Ingredients</Label>
                    <Input 
                      id="edit-menu-ingredients" 
                      placeholder="Comma-separated ingredients" 
                      className="col-span-3" 
                      defaultValue={currentMenuItem.ingredients.join(', ')}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-menu-status" className="text-right">Status</Label>
                    <Select defaultValue={currentMenuItem.status}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AVAILABLE">Available</SelectItem>
                        <SelectItem value="LOW_STOCK">Low Stock</SelectItem>
                        <SelectItem value="OUT_OF_STOCK">Unavailable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-menu-popular" className="text-right">Mark as Popular</Label>
                    <div className="col-span-3">
                      <input
                        type="checkbox"
                        id="edit-menu-popular"
                        defaultChecked={currentMenuItem.popular}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditMenuItemOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                  <h3 className="text-2xl font-bold mt-1">{inventoryItems.length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                  <h3 className="text-2xl font-bold mt-1">{inventoryItems.filter(item => item.status === 'LOW_STOCK').length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                  <h3 className="text-2xl font-bold mt-1">{inventoryItems.filter(item => item.status === 'OUT_OF_STOCK').length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Menu Items</p>
                  <h3 className="text-2xl font-bold mt-1">{menuItems.length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Menu className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <ShoppingBasket className="h-4 w-4" />
              <span>Inventory Items</span>
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <Menu className="h-4 w-4" />
              <span>Menu Items</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart4 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Search and Filter - common for inventory and menu tabs */}
          {(activeTab === 'inventory' || activeTab === 'menu') && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`Search ${activeTab === 'inventory' ? 'inventory' : 'menu'} items...`}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter Category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="SNACKS">Snacks</SelectItem>
                  <SelectItem value="BEVERAGES">Beverages</SelectItem>
                  <SelectItem value="FAST_FOOD">Fast Food</SelectItem>
                  <SelectItem value="DISPOSABLES">Disposables</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Inventory Items Tab */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader className="pb-1">
                <CardTitle>Inventory Stock</CardTitle>
                <CardDescription>
                  Manage your inventory items, track stock levels and update quantities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reorder Level</TableHead>
                      <TableHead>Cost Per Unit</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventoryItems.length > 0 ? (
                      filteredInventoryItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="font-medium">{item.name}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              {getCategoryIcon(item.category)}
                              <span>{item.category.replace('_', ' ')}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>
                                {item.currentStock} {item.unit}
                              </span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleStockUpdate(item)}>
                                      <RefreshCw className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Update stock level</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getInventoryStatusBadge(item.status)}
                          </TableCell>
                          <TableCell>
                            {item.reorderLevel} {item.unit}
                          </TableCell>
                          <TableCell>
                            ₹{item.costPerUnit}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditInventoryItem(item)}>
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStockUpdate(item)}>
                                  Update Stock
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteInventoryItem(item.id)} 
                                  className="text-red-500"
                                >
                                  Delete Item
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-10">
                          <div className="flex flex-col items-center">
                            <div className="rounded-full bg-muted p-3 mb-3">
                              <Package className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="font-medium mb-1">No inventory items found</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              No items match your current search criteria.
                            </p>
                            <Button onClick={() => {
                              setSearchQuery('');
                              setSelectedCategory('all');
                            }}>
                              Clear Filters
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredInventoryItems.length} of {inventoryItems.length} items
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsAddInventoryOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Item
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          {/* Menu Items Tab */}
          <TabsContent value="menu">
            <Card>
              <CardHeader className="pb-1">
                <CardTitle>Food & Beverage Menu</CardTitle>
                <CardDescription>
                  Manage your theatre's food and beverage menu items.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMenuItems.length > 0 ? (
                    filteredMenuItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg flex items-center">
                                {item.name}
                                {item.popular && (
                                  <Badge variant="secondary" className="ml-2 text-xs">Popular</Badge>
                                )}
                              </CardTitle>
                              <div className="flex items-center mt-1">
                                <Badge 
                                  variant="outline" 
                                  className={item.isVeg ? "bg-green-500/10 text-green-500 border-green-500" : "bg-red-500/10 text-red-500 border-red-500"}
                                >
                                  {item.isVeg ? "Veg" : "Non-Veg"}
                                </Badge>
                                <span className="text-sm text-muted-foreground ml-2">
                                  {item.category.replace('_', ' ')}
                                </span>
                              </div>
                            </div>
                            <div className="text-lg font-bold">₹{item.price}</div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground mb-2">
                            Ingredients: {item.ingredients.join(', ')}
                          </p>
                          {getMenuStatusBadge(item.status)}
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditMenuItem(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteMenuItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-muted p-3 mb-3">
                          <Utensils className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium mb-1">No menu items found</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          No items match your current search criteria.
                        </p>
                        <Button onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                        }}>
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredMenuItems.length} of {menuItems.length} items
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsAddMenuItemOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Menu Item
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Consumption</CardTitle>
                  <CardDescription>
                    Consumption of key items over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={consumptionData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Line type="monotone" dataKey="popcorn" stroke="#8884d8" name="Popcorn (kg)" />
                        <Line type="monotone" dataKey="nachos" stroke="#82ca9d" name="Nachos (packs)" />
                        <Line type="monotone" dataKey="fries" stroke="#ffc658" name="Fries (kg)" />
                        <Line type="monotone" dataKey="beverages" stroke="#ff8042" name="Beverages (bottles)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Stock Status</CardTitle>
                  <CardDescription>
                    Current stock levels by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          {
                            name: 'Stock Status',
                            inStock: inventoryItems.filter(item => item.status === 'IN_STOCK').length,
                            lowStock: inventoryItems.filter(item => item.status === 'LOW_STOCK').length,
                            outOfStock: inventoryItems.filter(item => item.status === 'OUT_OF_STOCK').length,
                          }
                        ]}
                        layout="vertical"
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" hide />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="inStock" name="In Stock" fill="#4ade80" stackId="a" />
                        <Bar dataKey="lowStock" name="Low Stock" fill="#facc15" stackId="a" />
                        <Bar dataKey="outOfStock" name="Out of Stock" fill="#f87171" stackId="a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <h4 className="text-sm font-medium">Category Breakdown</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Package className="h-4 w-4" /> Snacks
                        </span>
                        <span>{inventoryItems.filter(item => item.category === 'SNACKS').length} items</span>
                      </div>
                      <Progress 
                        value={
                          (inventoryItems.filter(item => item.category === 'SNACKS').length / inventoryItems.length) * 100
                        } 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Coffee className="h-4 w-4" /> Beverages
                        </span>
                        <span>{inventoryItems.filter(item => item.category === 'BEVERAGES').length} items</span>
                      </div>
                      <Progress 
                        value={
                          (inventoryItems.filter(item => item.category === 'BEVERAGES').length / inventoryItems.length) * 100
                        } 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Pizza className="h-4 w-4" /> Fast Food
                        </span>
                        <span>{inventoryItems.filter(item => item.category === 'FAST_FOOD').length} items</span>
                      </div>
                      <Progress 
                        value={
                          (inventoryItems.filter(item => item.category === 'FAST_FOOD').length / inventoryItems.length) * 100
                        } 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Utensils className="h-4 w-4" /> Disposables
                        </span>
                        <span>{inventoryItems.filter(item => item.category === 'DISPOSABLES').length} items</span>
                      </div>
                      <Progress 
                        value={
                          (inventoryItems.filter(item => item.category === 'DISPOSABLES').length / inventoryItems.length) * 100
                        } 
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Low Stock Alerts</CardTitle>
                  <CardDescription>
                    Items requiring attention or reordering
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Reorder Level</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventoryItems
                        .filter(item => item.status === 'LOW_STOCK' || item.status === 'OUT_OF_STOCK')
                        .map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="font-medium">{item.name}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5">
                                {getCategoryIcon(item.category)}
                                <span>{item.category.replace('_', ' ')}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span>
                                {item.currentStock} {item.unit}
                              </span>
                            </TableCell>
                            <TableCell>
                              {item.reorderLevel} {item.unit}
                            </TableCell>
                            <TableCell>
                              {getInventoryStatusBadge(item.status)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStockUpdate(item)}
                              >
                                Update Stock
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                      
                      {inventoryItems.filter(item => item.status === 'LOW_STOCK' || item.status === 'OUT_OF_STOCK').length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6">
                            <div className="flex flex-col items-center">
                              <div className="rounded-full bg-green-500/10 p-3 mb-3">
                                <CheckCircle className="h-6 w-6 text-green-500" />
                              </div>
                              <h3 className="font-medium mb-1">All items well stocked</h3>
                              <p className="text-sm text-muted-foreground">
                                There are no items requiring immediate attention.
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TheatreManagerLayout>
  );
}