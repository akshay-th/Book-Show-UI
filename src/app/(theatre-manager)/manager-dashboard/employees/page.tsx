// src/app/(theatre-manager)/employees/page.tsx
"use client";

import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Key, 
  Eye, 
  EyeOff, 
  UserPlus, 
  Mail, 
  Phone, 
  CheckCircle, 
  XCircle,
  Clock
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import TheatreManagerLayout from '@/components/layout/theatre-manager-layout';

// Mock data for employees
const employeesMockData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    role: 'COUNTER_STAFF',
    status: 'ACTIVE',
    lastActive: '2025-03-01 10:30 AM',
    avatar: 'https://placehold.co/200',
    permissions: {
      bookTickets: true,
      manageShows: false,
      manageInventory: false,
      processOrders: false
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '9876543211',
    role: 'CANTEEN_STAFF',
    status: 'ACTIVE',
    lastActive: '2025-03-01 09:15 AM',
    avatar: 'https://placehold.co/200',
    permissions: {
      bookTickets: false,
      manageShows: false,
      manageInventory: true,
      processOrders: true
    }
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '9876543212',
    role: 'COUNTER_STAFF',
    status: 'INACTIVE',
    lastActive: '2025-02-28 05:45 PM',
    avatar: 'https://placehold.co/200',
    permissions: {
      bookTickets: true,
      manageShows: false,
      manageInventory: false,
      processOrders: false
    }
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '9876543213',
    role: 'ASSISTANT_MANAGER',
    status: 'ACTIVE',
    lastActive: '2025-03-02 08:30 AM',
    avatar: 'https://placehold.co/200',
    permissions: {
      bookTickets: true,
      manageShows: true,
      manageInventory: true,
      processOrders: true
    }
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david@example.com',
    phone: '9876543214',
    role: 'CANTEEN_STAFF',
    status: 'PENDING',
    lastActive: 'Never',
    avatar: 'https://placehold.co/200',
    permissions: {
      bookTickets: false,
      manageShows: false,
      manageInventory: true,
      processOrders: true
    }
  }
];

// Helper function to get badge color
const getStatusBadge = (status: string) => {
  switch(status) {
    case 'ACTIVE':
      return <Badge variant="default" className="bg-green-500">Active</Badge>;
    case 'INACTIVE':
      return <Badge variant="secondary">Inactive</Badge>;
    case 'PENDING':
      return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

// Helper function to get role name
const getRoleName = (role: string) => {
  switch(role) {
    case 'COUNTER_STAFF':
      return 'Counter Staff';
    case 'CANTEEN_STAFF':
      return 'Canteen Staff';
    case 'ASSISTANT_MANAGER':
      return 'Assistant Manager';
    default:
      return role;
  }
};

export default function TheatreManagerEmployeesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [employees, setEmployees] = useState(employeesMockData);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [currentEmployee, setCurrentEmployee] = useState<any>(null);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);

  // Filter employees based on search query and role
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.phone.includes(searchQuery);
    const matchesRole = selectedRole === 'all' || employee.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const handleAddEmployee = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you would add the employee to the database
    
    // Generate a random password for the new employee
    const randomPassword = Math.random().toString(36).slice(-8);
    setGeneratedPassword(randomPassword);
    setIsAddEmployeeOpen(false);
  };

  const handleEditEmployee = (employee: any) => {
    setCurrentEmployee(employee);
    setIsEditEmployeeOpen(true);
  };

  const handleSaveEdit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you would update the employee in the database
    setIsEditEmployeeOpen(false);
  };

  return (
    <TheatreManagerLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          
          {/* Add Employee Dialog */}
          <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Add a new employee to your theatre. They will receive login credentials via SMS.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEmployee}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Full Name</Label>
                    <Input id="name" placeholder="Employee name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input id="email" type="email" placeholder="employee@example.com" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">Phone</Label>
                    <Input id="phone" placeholder="10-digit mobile number" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">Role</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="COUNTER_STAFF">Counter Staff</SelectItem>
                        <SelectItem value="CANTEEN_STAFF">Canteen Staff</SelectItem>
                        <SelectItem value="ASSISTANT_MANAGER">Assistant Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-2" />
                  <h3 className="text-lg font-medium">Permissions</h3>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bookTickets" className="text-right">Book Tickets</Label>
                    <div className="col-span-3">
                      <Switch id="bookTickets" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="manageShows" className="text-right">Manage Shows</Label>
                    <div className="col-span-3">
                      <Switch id="manageShows" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="manageInventory" className="text-right">Manage Inventory</Label>
                    <div className="col-span-3">
                      <Switch id="manageInventory" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="processOrders" className="text-right">Process Orders</Label>
                    <div className="col-span-3">
                      <Switch id="processOrders" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Employee</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Password Generated Dialog */}
          {generatedPassword && (
            <Dialog open={!!generatedPassword} onOpenChange={() => setGeneratedPassword('')}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Employee Added Successfully</DialogTitle>
                  <DialogDescription>
                    A temporary password has been generated. Share this with the employee securely.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="relative">
                    <Input 
                      readOnly 
                      value={generatedPassword} 
                      type={showPassword ? "text" : "password"}
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    The employee will be prompted to change this password on first login.
                  </p>
                </div>
                <DialogFooter>
                  <Button onClick={() => setGeneratedPassword('')}>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* Edit Employee Dialog */}
          {currentEmployee && (
            <Dialog open={isEditEmployeeOpen} onOpenChange={setIsEditEmployeeOpen}>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Edit Employee</DialogTitle>
                  <DialogDescription>
                    Update employee details and permissions.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSaveEdit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-name" className="text-right">Full Name</Label>
                      <Input 
                        id="edit-name" 
                        placeholder="Employee name" 
                        className="col-span-3" 
                        defaultValue={currentEmployee.name}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-email" className="text-right">Email</Label>
                      <Input 
                        id="edit-email" 
                        type="email" 
                        placeholder="employee@example.com" 
                        className="col-span-3" 
                        defaultValue={currentEmployee.email}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-phone" className="text-right">Phone</Label>
                      <Input 
                        id="edit-phone" 
                        placeholder="10-digit mobile number" 
                        className="col-span-3" 
                        defaultValue={currentEmployee.phone}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-role" className="text-right">Role</Label>
                      <Select defaultValue={currentEmployee.role}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="COUNTER_STAFF">Counter Staff</SelectItem>
                          <SelectItem value="CANTEEN_STAFF">Canteen Staff</SelectItem>
                          <SelectItem value="ASSISTANT_MANAGER">Assistant Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-status" className="text-right">Status</Label>
                      <Select defaultValue={currentEmployee.status}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                          <SelectItem value="PENDING">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator className="my-2" />
                    <h3 className="text-lg font-medium">Permissions</h3>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-bookTickets" className="text-right">Book Tickets</Label>
                      <div className="col-span-3">
                        <Switch id="edit-bookTickets" defaultChecked={currentEmployee.permissions.bookTickets} />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-manageShows" className="text-right">Manage Shows</Label>
                      <div className="col-span-3">
                        <Switch id="edit-manageShows" defaultChecked={currentEmployee.permissions.manageShows} />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-manageInventory" className="text-right">Manage Inventory</Label>
                      <div className="col-span-3">
                        <Switch id="edit-manageInventory" defaultChecked={currentEmployee.permissions.manageInventory} />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-processOrders" className="text-right">Process Orders</Label>
                      <div className="col-span-3">
                        <Switch id="edit-processOrders" defaultChecked={currentEmployee.permissions.processOrders} />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsEditEmployeeOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={selectedRole}
            onValueChange={setSelectedRole}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter Role" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="COUNTER_STAFF">Counter Staff</SelectItem>
              <SelectItem value="CANTEEN_STAFF">Canteen Staff</SelectItem>
              <SelectItem value="ASSISTANT_MANAGER">Assistant Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Employees Table */}
        <Card>
          <CardHeader className="pb-1">
            <CardTitle>Theatre Staff</CardTitle>
            <CardDescription>
              Manage your theatre staff and their access permissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Last active: {employee.lastActive}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getRoleName(employee.role)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            {employee.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            {employee.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {employee.permissions.bookTickets && (
                            <Badge variant="outline" className="text-xs">
                              Tickets
                            </Badge>
                          )}
                          {employee.permissions.manageShows && (
                            <Badge variant="outline" className="text-xs">
                              Shows
                            </Badge>
                          )}
                          {employee.permissions.manageInventory && (
                            <Badge variant="outline" className="text-xs">
                              Inventory
                            </Badge>
                          )}
                          {employee.permissions.processOrders && (
                            <Badge variant="outline" className="text-xs">
                              Orders
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(employee.status)}
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
                            <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteEmployee(employee.id)} className="text-red-500">
                              Remove Employee
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-muted p-3 mb-3">
                          <Users className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium mb-1">No employees found</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          No employees match your current search criteria.
                        </p>
                        <Button onClick={() => {
                          setSearchQuery('');
                          setSelectedRole('all');
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
        </Card>

        {/* Stats and Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Staff Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Total Employees</div>
                  <div className="text-2xl font-bold">{employees.length}</div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Counter Staff</span>
                    <span>{employees.filter(e => e.role === 'COUNTER_STAFF').length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Canteen Staff</span>
                    <span>{employees.filter(e => e.role === 'CANTEEN_STAFF').length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Assistant Managers</span>
                    <span>{employees.filter(e => e.role === 'ASSISTANT_MANAGER').length}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <div className="flex items-center">
                      <CheckCircle className="text-green-500 h-4 w-4 mr-1.5" />
                      <span>Active</span>
                    </div>
                    <span>{employees.filter(e => e.status === 'ACTIVE').length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <div className="flex items-center">
                      <XCircle className="text-muted-foreground h-4 w-4 mr-1.5" />
                      <span>Inactive</span>
                    </div>
                    <span>{employees.filter(e => e.status === 'INACTIVE').length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <div className="flex items-center">
                      <Clock className="text-amber-500 h-4 w-4 mr-1.5" />
                      <span>Pending</span>
                    </div>
                    <span>{employees.filter(e => e.status === 'PENDING').length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto flex-col p-4 space-y-2" onClick={() => setIsAddEmployeeOpen(true)}>
                  <UserPlus className="h-6 w-6" />
                  <span>Add New Employee</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col p-4 space-y-2">
                  <Key className="h-6 w-6" />
                  <span>Manage Permissions</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TheatreManagerLayout>
  );
}