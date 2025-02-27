// components/manager/screen-management.tsx
"use client"

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data
const MOCK_SCREENS = [
  {
    id: 'screen-1',
    name: 'Screen 1',
    capacity: 180,
    screenType: 'Standard',
    rowCount: 12,
    seatsPerRow: 15,
    categories: [
      { id: 'cat-1', name: 'Silver', priceMultiplier: 1.0, color: 'bg-gray-200', rows: ['A', 'B', 'C', 'D'] },
      { id: 'cat-2', name: 'Gold', priceMultiplier: 1.3, color: 'bg-yellow-100', rows: ['E', 'F', 'G', 'H'] },
      { id: 'cat-3', name: 'Premium', priceMultiplier: 1.6, color: 'bg-blue-100', rows: ['I', 'J', 'K', 'L'] },
    ],
    seatLayout: {
      rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
      blockedSeats: ['A1', 'A2', 'A15', 'A14', 'L1', 'L15'],
    },
  },
  {
    id: 'screen-2',
    name: 'Screen 2',
    capacity: 120,
    screenType: 'Standard',
    rowCount: 10,
    seatsPerRow: 12,
    categories: [
      { id: 'cat-4', name: 'Regular', priceMultiplier: 1.0, color: 'bg-gray-200', rows: ['A', 'B', 'C', 'D', 'E'] },
      { id: 'cat-5', name: 'Executive', priceMultiplier: 1.4, color: 'bg-blue-100', rows: ['F', 'G', 'H', 'I', 'J'] },
    ],
    seatLayout: {
      rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      blockedSeats: ['A1', 'A12', 'J1', 'J12'],
    },
  },
  {
    id: 'screen-3',
    name: 'Screen 3',
    capacity: 240,
    screenType: 'Premium',
    rowCount: 15,
    seatsPerRow: 16,
    categories: [
      { id: 'cat-6', name: 'Classic', priceMultiplier: 1.0, color: 'bg-gray-200', rows: ['A', 'B', 'C', 'D', 'E'] },
      { id: 'cat-7', name: 'Superior', priceMultiplier: 1.3, color: 'bg-yellow-100', rows: ['F', 'G', 'H', 'I', 'J'] },
      { id: 'cat-8', name: 'Deluxe', priceMultiplier: 1.7, color: 'bg-blue-100', rows: ['K', 'L', 'M', 'N', 'O'] },
    ],
    seatLayout: {
      rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
      blockedSeats: ['A1', 'A2', 'A15', 'A16', 'O1', 'O2', 'O15', 'O16'],
    },
  },
];

interface Category {
  id: string;
  name: string;
  priceMultiplier: number;
  color: string;
  rows: string[];
}

interface SeatLayout {
  rows: string[];
  blockedSeats: string[];
}

interface Screen {
  id: string;
  name: string;
  capacity: number;
  screenType: string;
  rowCount: number;
  seatsPerRow: number;
  categories: Category[];
  seatLayout: SeatLayout;
}

interface ScreenManagementProps {
  theatreId: string;
}

export default function ScreenManagement({ theatreId }: ScreenManagementProps) {
  const [screens, setScreens] = useState<Screen[]>(MOCK_SCREENS);
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [activeTab, setActiveTab] = useState('screen-1');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Screen>>({});
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newScreen, setNewScreen] = useState<Partial<Screen>>({
    name: '',
    screenType: 'Standard',
    rowCount: 10,
    seatsPerRow: 12,
  });
  
  // Select a screen for editing
  const handleEditScreen = (screen: Screen) => {
    setSelectedScreen(screen);
    setEditForm({
      name: screen.name,
      screenType: screen.screenType,
      rowCount: screen.rowCount,
      seatsPerRow: screen.seatsPerRow,
    });
    setIsEditing(true);
  };
  
  // Handle edit form changes
  const handleEditFormChange = (field: string, value: any) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  // Save edited screen
  const saveEditedScreen = () => {
    if (!selectedScreen) return;
    
    // Calculate capacity
    const capacity = parseInt(editForm.rowCount as unknown as string) * 
                    parseInt(editForm.seatsPerRow as unknown as string);
    
    const updatedScreen = {
      ...selectedScreen,
      ...editForm,
      capacity,
    };
    
    setScreens(screens.map(screen => 
      screen.id === selectedScreen.id ? updatedScreen : screen
    ));
    
    setIsEditing(false);
    setSelectedScreen(null);
  };
  
  // Handle new screen form changes
  const handleNewScreenChange = (field: string, value: any) => {
    setNewScreen((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  // Add a new screen
  const addNewScreen = () => {
    // Calculate capacity
    const rowCount = parseInt(newScreen.rowCount as unknown as string);
    const seatsPerRow = parseInt(newScreen.seatsPerRow as unknown as string);
    const capacity = rowCount * seatsPerRow;
    
    // Generate rows (A-Z)
    const rows = Array.from({ length: rowCount }, (_, i) => 
      String.fromCharCode(65 + i)
    );
    
    // Create default categories (dividing rows into 2-3 sections)
    const middleIndex = Math.floor(rowCount / 2);
    const thirdIndex = Math.floor(rowCount / 3);
    
    let categories: Category[] = [];
    
    if (rowCount <= 10) {
      // For smaller screens, use 2 categories
      categories = [
        {
          id: `cat-${Date.now()}-1`,
          name: 'Regular',
          priceMultiplier: 1.0,
          color: 'bg-gray-200',
          rows: rows.slice(0, middleIndex),
        },
        {
          id: `cat-${Date.now()}-2`,
          name: 'Executive',
          priceMultiplier: 1.4,
          color: 'bg-blue-100',
          rows: rows.slice(middleIndex),
        },
      ];
    } else {
      // For larger screens, use 3 categories
      categories = [
        {
          id: `cat-${Date.now()}-1`,
          name: 'Silver',
          priceMultiplier: 1.0,
          color: 'bg-gray-200',
          rows: rows.slice(0, thirdIndex),
        },
        {
          id: `cat-${Date.now()}-2`,
          name: 'Gold',
          priceMultiplier: 1.3,
          color: 'bg-yellow-100',
          rows: rows.slice(thirdIndex, 2 * thirdIndex),
        },
        {
          id: `cat-${Date.now()}-3`,
          name: 'Premium',
          priceMultiplier: 1.6,
          color: 'bg-blue-100',
          rows: rows.slice(2 * thirdIndex),
        },
      ];
    }
    
    // Create the new screen
    const newScreenObj: Screen = {
      id: `screen-${Date.now()}`,
      name: newScreen.name as string,
      capacity,
      screenType: newScreen.screenType as string,
      rowCount,
      seatsPerRow,
      categories,
      seatLayout: {
        rows,
        blockedSeats: [],
      },
    };
    
    setScreens([...screens, newScreenObj]);
    setShowAddDialog(false);
    setNewScreen({
      name: '',
      screenType: 'Standard',
      rowCount: 10,
      seatsPerRow: 12,
    });
  };
  
  // Render seat layout
  const renderSeatLayout = (screen: Screen) => {
    const { seatLayout, seatsPerRow, categories } = screen;
    
    return (
      <div className="flex flex-col items-center mt-8">
        {/* Screen representation */}
        <div className="w-3/4 h-8 bg-gray-300 rounded-t-lg mb-8 flex items-center justify-center text-sm text-gray-700">
          SCREEN
        </div>
        
        {/* Seats */}
        <div className="mb-8">
          {seatLayout.rows.map((row) => (
            <div key={row} className="flex items-center mb-2">
              <div className="w-6 text-center font-medium text-gray-500">{row}</div>
              <div className="flex flex-wrap">
                {Array.from({ length: seatsPerRow }, (_, index) => {
                  const seatNumber = (index + 1).toString().padStart(2, '0');
                  const seatId = `${row}${seatNumber}`;
                  const isBlocked = seatLayout.blockedSeats.includes(seatId);
                  
                  // Find which category this row belongs to
                  const category = categories.find(cat => cat.rows.includes(row));
                  
                  return (
                    <div
                      key={seatId}
                      className={`
                        flex items-center justify-center w-8 h-8 rounded m-1 
                        ${isBlocked ? 'opacity-0' : category?.color || 'bg-gray-200'}
                      `}
                    >
                      {!isBlocked && seatNumber}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center mb-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <div className={`w-6 h-6 ${category.color} rounded mr-2`} />
              <span className="text-sm">
                {category.name} (x{category.priceMultiplier.toFixed(1)})
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Screen Management</h1>
        <Button onClick={() => setShowAddDialog(true)}>Add New Screen</Button>
      </div>
      
      {/* Screen Tabs */}
      <Tabs 
        defaultValue={screens[0]?.id || 'no-screens'} 
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          {screens.map((screen) => (
            <TabsTrigger key={screen.id} value={screen.id}>
              {screen.name}
            </TabsTrigger>
          ))}
          {screens.length === 0 && (
            <TabsTrigger value="no-screens">No Screens</TabsTrigger>
          )}
        </TabsList>
        
        {screens.map((screen) => (
          <TabsContent key={screen.id} value={screen.id}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{screen.name}</CardTitle>
                  {!isEditing && (
                    <Button variant="outline" onClick={() => handleEditScreen(screen)}>
                      Edit Screen
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing && selectedScreen?.id === screen.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="screen-name">Screen Name</Label>
                        <Input
                          id="screen-name"
                          value={editForm.name}
                          onChange={(e) => handleEditFormChange('name', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="screen-type">Screen Type</Label>
                        <Select
                          value={editForm.screenType}
                          onValueChange={(value) => handleEditFormChange('screenType', value)}
                        >
                          <SelectTrigger id="screen-type">
                            <SelectValue placeholder="Select screen type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Standard">Standard</SelectItem>
                            <SelectItem value="Premium">Premium</SelectItem>
                            <SelectItem value="IMAX">IMAX</SelectItem>
                            <SelectItem value="3D">3D</SelectItem>
                            <SelectItem value="4DX">4DX</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="row-count">Number of Rows</Label>
                        <Input
                          id="row-count"
                          type="number"
                          min="5"
                          max="26"
                          value={editForm.rowCount}
                          onChange={(e) => handleEditFormChange('rowCount', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="seats-per-row">Seats per Row</Label>
                        <Input
                          id="seats-per-row"
                          type="number"
                          min="5"
                          max="20"
                          value={editForm.seatsPerRow}
                          onChange={(e) => handleEditFormChange('seatsPerRow', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={saveEditedScreen}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <dl className="grid grid-cols-2 gap-2">
                        <dt className="text-sm font-medium text-muted-foreground">Screen Type:</dt>
                        <dd>{screen.screenType}</dd>
                        
                        <dt className="text-sm font-medium text-muted-foreground">Capacity:</dt>
                        <dd>{screen.capacity} seats</dd>
                        
                        <dt className="text-sm font-medium text-muted-foreground">Rows:</dt>
                        <dd>{screen.rowCount}</dd>
                        
                        <dt className="text-sm font-medium text-muted-foreground">Seats per Row:</dt>
                        <dd>{screen.seatsPerRow}</dd>
                        
                        <dt className="text-sm font-medium text-muted-foreground">Categories:</dt>
                        <dd>{screen.categories.length}</dd>
                      </dl>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Seat Categories:</h3>
                      <ul className="space-y-1">
                        {screen.categories.map((category) => (
                          <li key={category.id} className="flex items-center gap-2">
                            <div className={`w-4 h-4 ${category.color} rounded`} />
                            <span>{category.name}</span>
                            <span className="text-sm text-muted-foreground">
                              (Price Multiplier: {category.priceMultiplier.toFixed(1)})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {!isEditing && renderSeatLayout(screen)}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
        
        {screens.length === 0 && (
          <TabsContent value="no-screens">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">
                  You haven't added any screens yet.
                </p>
                <Button onClick={() => setShowAddDialog(true)}>
                  Add Your First Screen
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
      
      {/* Add Screen Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Screen</DialogTitle>
            <DialogDescription>
              Enter the screen details. You can configure more advanced settings after creation.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-screen-name">Screen Name</Label>
              <Input
                id="new-screen-name"
                placeholder="e.g. Screen 4"
                value={newScreen.name}
                onChange={(e) => handleNewScreenChange('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-screen-type">Screen Type</Label>
              <Select
                value={newScreen.screenType as string}
                onValueChange={(value) => handleNewScreenChange('screenType', value)}
              >
                <SelectTrigger id="new-screen-type">
                  <SelectValue placeholder="Select screen type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="IMAX">IMAX</SelectItem>
                  <SelectItem value="3D">3D</SelectItem>
                  <SelectItem value="4DX">4DX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-row-count">Number of Rows</Label>
                <Input
                  id="new-row-count"
                  type="number"
                  min="5"
                  max="26"
                  value={newScreen.rowCount}
                  onChange={(e) => handleNewScreenChange('rowCount', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-seats-per-row">Seats per Row</Label>
                <Input
                  id="new-seats-per-row"
                  type="number"
                  min="5"
                  max="20"
                  value={newScreen.seatsPerRow}
                  onChange={(e) => handleNewScreenChange('seatsPerRow', e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={addNewScreen}
              disabled={!newScreen.name}
            >
              Add Screen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}