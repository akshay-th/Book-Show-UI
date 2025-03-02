'use client';
import React, { useState } from 'react';
import '@/app/globals.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { loginUser } from '@/lib/api';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

const otpFormSchema = z.object({
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number' }),
  otp: z.string().length(6, { message: 'OTP must be 6 digits' }).optional(),
});

export default function LoginPage() {
  const router = useRouter();
  // Using Sonner toast directly
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const otpForm = useForm({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      phoneNumber: '',
      otp: '',
    },
  });

  async function onLoginSubmit(data: any) {
    setIsLoading(true);
    try {
      const result = await loginUser(data.email, data.password);
      
      // Store tokens and user info
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
      localStorage.setItem('user', JSON.stringify(result.user));
      
      toast.success("Login successful!", {
        description: `Welcome back!`,
      });
      
      // Redirect based on user role
      switch(result.user.userType) {
        case 'CUSTOMER':
          router.push('/movies');
          break;
        case 'THEATRE_MANAGER':
          router.push('/manager-dashboard');
          break;
        case 'THEATRE_EMPLOYEE':
          router.push('/employee-dashboard');
          break;
        case 'SYSTEM_ADMIN':
          router.push('/admin/dashboard');
          break;
        default:
          router.push('/');
      }
    } catch (error) {
      toast.error("Login failed", {
        // @ts-ignore
        description: error.message || "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // async function onLoginSubmit(data:any) {
  //   setIsLoading(true);
  //   try {
  //     // This would be replaced with your actual API call
  //     console.log('Login submitted', data);
      
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     // Mock different user roles for demo purposes
  //     // In a real app, this would come from your authentication API
  //     const userRoles = {
  //       'customer@example.com': 'customer',
  //       'manager@example.com': 'theatre-manager',
  //       'employee@example.com': 'theatre-employee',
  //       'admin@example.com': 'admin',
  //     };
      
  //     // @ts-ignore
  //     const userRole = userRoles[data.email] || 'customer';
      
  //     // Success notification
  //     toast.success("Login successful!", {
  //       description: `Logged in as ${userRole}`,
  //     });
      
  //     // Redirect based on user role
  //     switch(userRole) {
  //       case 'customer':
  //         router.push('/customer/movies');
  //         break;
  //       case 'theatre-manager':
  //         router.push('/theatre-manager/dashboard');
  //         break;
  //       case 'theatre-employee':
  //         router.push('/theatre-employee/dashboard');
  //         break;
  //       case 'admin':
  //         router.push('/admin/dashboard');
  //         break;
  //       default:
  //         router.push('/');
  //     }
  //   } catch (error) {
  //     toast.error("Login failed", {
  //       // @ts-ignore
  //       description: error.message || "Something went wrong. Please try again.",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  // async function onLoginSubmit(data: any) {
  //   setIsLoading(true);
  //   try {
  //     // Replace with your actual backend URL
  //     const response = await fetch('http://localhost:3001/api/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email: data.email,
  //         password: data.password,
  //       }),
  //     });
  
  //     const result = await response.json();
  
  //     if (!response.ok) {
  //       throw new Error(result.error || 'Login failed');
  //     }
      
  //     // Store tokens in localStorage
  //     localStorage.setItem('accessToken', result.accessToken);
  //     localStorage.setItem('refreshToken', result.refreshToken);
  //     localStorage.setItem('user', JSON.stringify(result.user));
      
  //     // Success notification
  //     toast.success("Login successful!", {
  //       description: `Logged in as ${result.user.userType.toLowerCase()}`,
  //     });
      
  //     // Redirect based on user role
  //     switch(result.user.userType) {
  //       case 'CUSTOMER':
  //         router.push('/customer/movies');
  //         break;
  //       case 'THEATRE_MANAGER':
  //         router.push('/theatre-manager/dashboard');
  //         break;
  //       case 'THEATRE_EMPLOYEE':
  //         router.push('/theatre-employee/dashboard');
  //         break;
  //       case 'SYSTEM_ADMIN':
  //         router.push('/admin/dashboard');
  //         break;
  //       default:
  //         router.push('/');
  //     }
  //   } catch (error) {
  //     toast.error("Login failed", {
  //       // @ts-ignore
  //       description: error.message || "Invalid email or password. Please try again.",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function onSendOtp(data:any) {
  //   setIsLoading(true);
  //   try {
  //     // This would be your actual OTP sending API call
  //     console.log('Sending OTP to', data.phoneNumber);
      
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     setIsOtpSent(true);
  //     toast.success("OTP sent", {
  //       description: `We've sent a 6-digit code to ${data.phoneNumber}`,
  //     });
  //   } catch (error) {
  //     toast.error("Failed to send OTP", {
  //       // @ts-ignore
  //       description: error.message || "Something went wrong. Please try again.",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function onVerifyOtp(data: any) {
  //   setIsLoading(true);
  //   try {
  //     // This would be your actual OTP verification API call
  //     console.log('Verifying OTP', data);
      
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     toast.success("Login successful!", {
  //       description: `Logged in as theatre employee`,
  //     });
      
  //     // Redirect to employee dashboard
  //     router.push('/theatre-employee/dashboard');
  //   } catch (error) {
  //     toast.error("OTP verification failed", {
  //       // @ts-ignore
  //       description: error.message || "Invalid OTP. Please try again.",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  async function onSendOtp(data: any) {
    setIsLoading(true);
    try {
      // For now we'll simulate this - you can implement this API endpoint later
      console.log('Sending OTP to', data.phoneNumber);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsOtpSent(true);
      toast.success("OTP sent", {
        description: `We've sent a 6-digit code to ${data.phoneNumber}`,
      });
    } catch (error) {
      toast.error("Failed to send OTP", {
        // @ts-ignore
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  async function onVerifyOtp(data: any) {
    setIsLoading(true);
    try {
      // For now, simulate a successful login - implement real API call later
      console.log('Verifying OTP', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response with tokens and user info
      const mockResult = {
        user: {
          id: 'employee-123',
          email: `${data.phoneNumber}@example.com`,
          firstName: 'Theatre',
          lastName: 'Employee',
          userType: 'THEATRE_EMPLOYEE',
          status: 'ACTIVE'
        },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token'
      };
      
      // Store tokens
      localStorage.setItem('accessToken', mockResult.accessToken);
      localStorage.setItem('refreshToken', mockResult.refreshToken);
      localStorage.setItem('user', JSON.stringify(mockResult.user));
      
      toast.success("Login successful!", {
        description: `Logged in as theatre employee`,
      });
      
      // Redirect to employee dashboard
      router.push('/theatre-employee/dashboard');
    } catch (error) {
      toast.error("OTP verification failed", {
        // @ts-ignore
        description: error.message || "Invalid OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 py-8 md:py-12">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-6 md:mb-8 flex flex-col items-center text-center">
          {/* Replace with your actual logo */}
          <div className="rounded-full bg-white p-2 mb-3 md:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary sm:w-8 sm:h-8">
              <path d="M20 8.4V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v1.4"></path>
              <path d="M2 12h20"></path>
              <path d="M20 16.6V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.4"></path>
              <path d="M4 7v10"></path>
              <path d="M20 7v10"></path>
            </svg>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl md:text-2xl">Movie Ticket Booking</h1>
          <p className="mt-1 md:mt-2 text-xs sm:text-sm text-gray-400">Sign in to access your account</p>
        </div>
        
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 h-auto">
            <TabsTrigger value="email" className="py-2 px-1 sm:py-3 text-xs sm:text-sm">Email Login</TabsTrigger>
            <TabsTrigger value="otp" className="py-2 px-1 sm:py-3 text-xs sm:text-sm">Employee Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <Card className="border-0 bg-gray-800 text-white shadow-lg">
              <CardHeader className="pb-4 md:pb-6">
                <CardTitle className="text-base sm:text-lg">Login with Email</CardTitle>
                <CardDescription className="text-xs sm:text-sm text-gray-400">
                  For customers, theatre managers, and administrators
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-3 sm:space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="name@example.com" 
                              {...field} 
                              className="bg-gray-700 h-9 sm:h-10 text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm">Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              {...field} 
                              className="bg-gray-700 h-9 sm:h-10 text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <div className="text-xs sm:text-sm text-right">
                      <Link href="/forgot-password" className="text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-9 sm:h-10 text-xs sm:text-sm mt-2" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 sm:space-y-4 border-t border-gray-700 pt-4 px-4 sm:px-6">
                <div className="text-xs sm:text-sm text-gray-400 text-center">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  <p className="text-2xs sm:text-xs">For demo purposes, use:</p>
                  <p className="text-2xs sm:text-xs">customer@example.com, manager@example.com,</p>
                  <p className="text-2xs sm:text-xs">employee@example.com, or admin@example.com</p>
                  <p className="text-2xs sm:text-xs">with any password</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="otp">
            <Card className="border-0 bg-gray-800 text-white shadow-lg">
              <CardHeader className="pb-4 md:pb-6">
                <CardTitle className="text-base sm:text-lg">Theatre Employee Login</CardTitle>
                <CardDescription className="text-xs sm:text-sm text-gray-400">
                  For counter staff and canteen employees
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <Form {...otpForm}>
                  <form 
                    onSubmit={otpForm.handleSubmit(isOtpSent ? onVerifyOtp : onSendOtp)} 
                    className="space-y-3 sm:space-y-4"
                  >
                    <FormField
                      control={otpForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm">Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="10-digit mobile number" 
                              {...field} 
                              disabled={isOtpSent}
                              className="bg-gray-700 h-9 sm:h-10 text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    {isOtpSent && (
                      <FormField
                        control={otpForm.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm">One-Time Password</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="6-digit OTP" 
                                {...field} 
                                className="bg-gray-700 h-9 sm:h-10 text-sm"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full h-9 sm:h-10 text-xs sm:text-sm mt-2" 
                      disabled={isLoading}
                    >
                      {isLoading 
                        ? "Processing..." 
                        : isOtpSent 
                          ? "Verify OTP" 
                          : "Send OTP"
                      }
                    </Button>
                    
                    {isOtpSent && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-9 sm:h-10 text-xs sm:text-sm mt-1"
                        onClick={() => {
                          setIsOtpSent(false);
                          otpForm.reset({ phoneNumber: otpForm.getValues().phoneNumber, otp: '' });
                        }}
                      >
                        Resend OTP
                      </Button>
                    )}
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 sm:space-y-4 border-t border-gray-700 pt-4 px-4 sm:px-6">
                <div className="text-xs sm:text-sm text-gray-400 text-center">
                  <p>Theatre employees need to be registered by a theatre manager</p>
                </div>
                <div className="text-2xs sm:text-xs text-gray-500 text-center">
                  <p>For demo purposes, enter any phone number and OTP</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}