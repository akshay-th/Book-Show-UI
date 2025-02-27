// lib/auth.ts
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@/store/auth-store';

// These should be environment variables in a real application
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '15m'; // Access token expiry

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  theatreId?: string; // For theatre-specific users
}

// Create a JWT token
export async function createToken(payload: TokenPayload): Promise<string> {
  const secretKey = new TextEncoder().encode(JWT_SECRET);
  
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secretKey);
  
  return token;
}

// Verify a JWT token
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);
    
    // Safe type assertion by checking if payload has the required properties
    if (
      typeof payload.userId === 'string' &&
      typeof payload.email === 'string' &&
      typeof payload.role === 'string'
    ) {
      return {
        userId: payload.userId,
        email: payload.email,
        role: payload.role as UserRole,
        theatreId: payload.theatreId as string | undefined
      };
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

// Set JWT in cookie for client
export function setTokenCookie(res: NextResponse, token: string) {
  res.cookies.set({
    name: 'auth-token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 15, // 15 minutes
    path: '/',
  });
  
  return res;
}

// Check authentication in API routes
export async function authenticateRequest(request: NextRequest): Promise<{ 
  isAuthenticated: boolean; 
  user?: TokenPayload; 
}> {
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return { isAuthenticated: false };
  }
  
  const payload = await verifyToken(token);
  
  if (!payload) {
    return { isAuthenticated: false };
  }
  
  return { 
    isAuthenticated: true, 
    user: payload 
  };
}

// Role-based authorization middleware
export async function authorizeRole(
  request: NextRequest,
  allowedRoles: UserRole[]
): Promise<{ 
  isAuthorized: boolean; 
  user?: TokenPayload; 
}> {
  const { isAuthenticated, user } = await authenticateRequest(request);
  
  if (!isAuthenticated || !user) {
    return { isAuthorized: false };
  }
  
  const isAuthorized = allowedRoles.includes(user.role);
  
  return {
    isAuthorized,
    user
  };
}

// Get current user from server components
export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auth-token')?.value;
  
  if (!token) {
    return null;
  }
  
  return await verifyToken(token);
}