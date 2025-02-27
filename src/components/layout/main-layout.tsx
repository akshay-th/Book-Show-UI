// components/layout/main-layout.tsx
"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole, useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Navigation links based on user role
const navigationLinks: Record<UserRole, { title: string; href: string }[]> = {
  CUSTOMER: [
    { title: 'Movies', href: '/movies' },
    { title: 'Theatres', href: '/theatres' },
    { title: 'My Bookings', href: '/bookings' },
  ],
  THEATRE_MANAGER: [
    { title: 'Dashboard', href: '/manager/dashboard' },
    { title: 'Screens', href: '/manager/screens' },
    { title: 'Shows', href: '/manager/shows' },
    { title: 'Employees', href: '/manager/employees' },
    { title: 'Inventory', href: '/manager/inventory' },
  ],
  THEATRE_EMPLOYEE: [
    { title: 'Ticket Counter', href: '/employee/counter' },
    { title: 'Canteen', href: '/employee/canteen' },
  ],
  SYSTEM_ADMIN: [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Users', href: '/admin/users' },
    { title: 'Theatres', href: '/admin/theatres' },
    { title: 'Reports', href: '/admin/reports' },
  ],
};

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, isAuthenticated, logout } = useAuthStore();
  const pathname = usePathname();
  
  // Get the appropriate navigation links based on user role
  const getNavLinks = () => {
    if (!isAuthenticated || !user) return [];
    return navigationLinks[user.role];
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl inline-block">CineTix</span>
            </Link>
            
            {isAuthenticated && (
              <nav className="hidden gap-6 md:flex">
                {getNavLinks().map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      pathname === link.href 
                        ? 'text-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <span className="hidden md:inline-block">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <span className="inline-block md:hidden">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  {user?.role === 'CUSTOMER' && (
                    <DropdownMenuItem asChild>
                      <Link href="/bookings">My Bookings</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-6">
        {children}
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CineTix. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}