// src/components/protected-route.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    
    if (!user) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(user);
    
    // Check if user has required role
    if (allowedRoles && !allowedRoles.includes(userData.userType)) {
      router.push('/unauthorized');
      return;
    }
    
    setIsAuthorized(true);
    setIsLoading(false);
  }, [router, allowedRoles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? <>{children}</> : null;
}