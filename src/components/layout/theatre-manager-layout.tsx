// src/components/layout/theatre-manager-layout.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Film, 
  Clapperboard, 
  Users, 
  ShoppingBasket, 
  BarChart, 
  Settings, 
  Menu, 
  X, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavItem = ({ href, icon, label, active }: NavItemProps) => (
  <Link 
    href={href} 
    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
      active 
        ? 'bg-primary text-primary-foreground' 
        : 'hover:bg-muted'
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

interface TheatreManagerLayoutProps {
  children: React.ReactNode;
}

export default function TheatreManagerLayout({ children }: TheatreManagerLayoutProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  
  // Mock theatre manager data
  const manager = {
    name: 'John Smith',
    theatre: 'Cineplex Central',
    email: 'john@cineplex.com',
    avatarUrl: '/avatar-placeholder.jpg',
  };

  const navItems = [
    { 
      href: '/manager-dashboard/', 
      icon: <LayoutDashboard size={20} />, 
      label: 'Dashboard' 
    },
    { 
      href: '/manager-dashboard/movies', 
      icon: <Film size={20} />, 
      label: 'Movies' 
    },
    { 
      href: '/manager-dashboard//shows', 
      icon: <Clapperboard size={20} />, 
      label: 'Shows' 
    },
    { 
      href: '/manager-dashboard//employees', 
      icon: <Users size={20} />, 
      label: 'Employees' 
    },
    { 
      href: '/manager-dashboard//inventory', 
      icon: <ShoppingBasket size={20} />, 
      label: 'Inventory' 
    },
    { 
      href: '/manager-dashboard//reports', 
      icon: <BarChart size={20} />, 
      label: 'Reports' 
    },
    { 
      href: '/theatre-manager/settings', 
      icon: <Settings size={20} />, 
      label: 'Settings' 
    },
  ];

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-card p-4">
        <div className="flex flex-col h-full">
          <div className="space-y-4">
            <div className="flex flex-col items-center py-4">
              <h1 className="text-xl font-bold">Theatre Manager</h1>
              <p className="text-sm text-muted-foreground">{manager.theatre}</p>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavItem 
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={pathname === item.href}
                />
              ))}
            </nav>
          </div>
          <div className="mt-auto">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden absolute top-4 left-4 z-10">
            <Menu size={20} />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex flex-col h-full p-4">
            <div className="space-y-4">
              <div className="flex flex-col items-center py-4">
                <h1 className="text-xl font-bold">Theatre Manager</h1>
                <p className="text-sm text-muted-foreground">{manager.theatre}</p>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavItem 
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    active={pathname === item.href}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </nav>
            </div>
            <div className="mt-auto">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 md:px-6">
          <div className="md:hidden"></div>
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold">
              {navItems.find(item => pathname === item.href)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={manager.avatarUrl} alt={manager.name} />
                    <AvatarFallback>{manager.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{manager.name}</p>
                    <p className="text-sm text-muted-foreground">{manager.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/theatre-manager/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/theatre-manager/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}