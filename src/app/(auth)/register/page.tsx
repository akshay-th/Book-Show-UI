'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import '@/app/globals.css';

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Schema for customer registration
const customerFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Schema for theatre manager registration
const managerFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string(),
  theatreName: z.string().min(2, { message: 'Theatre name must be at least 2 characters' }),
  theatreAddress: z.string().min(5, { message: 'Please enter a valid theatre address' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters' }),
  state: z.string().min(2, { message: 'State must be at least 2 characters' }),
  pincode: z.string().min(5, { message: 'Please enter a valid pincode' }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('customer');

  // Form for customer registration
  const customerForm = useForm({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  });

  // Form for theatre manager registration
  const managerForm = useForm({
    resolver: zodResolver(managerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      theatreName: '',
      theatreAddress: '',
      city: '',
      state: '',
      pincode: '',
      termsAccepted: false,
    },
  });

  async function onCustomerSubmit(data:any) {
    setIsLoading(true);
    try {
      // This would be replaced with your actual API call
      console.log('Customer registration submitted', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Registration successful!', {
        description: 'You can now log in with your credentials',
      });
      
      // Redirect to login page after successful registration
      router.push('/login');
    } catch (error) {
      toast.error('Registration failed', {
        // @ts-ignore
        description: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onManagerSubmit(data: any) {
    setIsLoading(true);
    try {
      // This would be replaced with your actual API call
      console.log('Theatre manager registration submitted', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Registration request submitted!', {
        description: 'Your request will be reviewed by our team. You will be notified once approved.',
      });
      
      // Redirect to login page after successful registration
      router.push('/login');
    } catch (error) {
      toast.error('Registration failed', {
        // @ts-ignore
        description: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-900 to-black px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-6 md:mb-8 flex flex-col items-center text-center">
          {/* Logo */}
          <div className="rounded-full bg-white p-2 mb-3 md:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary sm:w-8 sm:h-8">
              <path d="M20 8.4V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v1.4"></path>
              <path d="M2 12h20"></path>
              <path d="M20 16.6V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.4"></path>
              <path d="M4 7v10"></path>
              <path d="M20 7v10"></path>
            </svg>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl md:text-2xl">Create an Account</h1>
          <p className="mt-1 md:mt-2 text-xs sm:text-sm text-gray-400">Join our movie ticket booking platform</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 h-auto">
            <TabsTrigger 
              value="customer" 
              className="py-2 px-1 sm:py-3 text-xs sm:text-sm"
            >
              Customer
            </TabsTrigger>
            <TabsTrigger 
              value="theatre-manager"
              className="py-2 px-1 sm:py-3 text-xs sm:text-sm"
            >
              Theatre Manager
            </TabsTrigger>
          </TabsList>
          
          {/* Customer Registration Form */}
          <TabsContent value="customer">
            <Card className="border-0 bg-gray-800 text-white shadow-lg">
              <CardHeader className="pb-4 md:pb-6">
                <CardTitle className="text-base sm:text-lg">Register as a Customer</CardTitle>
                <CardDescription className="text-xs sm:text-sm text-gray-400">
                  Create an account to book movies and order food
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <Form {...customerForm}>
                  <form onSubmit={customerForm.handleSubmit(onCustomerSubmit)} className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <FormField
                        control={customerForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm">First Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John" 
                                {...field} 
                                className="bg-gray-700 h-9 sm:h-10 text-sm"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={customerForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm">Last Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Doe" 
                                {...field} 
                                className="bg-gray-700 h-9 sm:h-10 text-sm"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={customerForm.control}
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
                      control={customerForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm">Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="10-digit mobile number" 
                              {...field} 
                              className="bg-gray-700 h-9 sm:h-10 text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <FormField
                        control={customerForm.control}
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
                      <FormField
                        control={customerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm">Confirm Password</FormLabel>
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
                    </div>
                    <FormField
                      control={customerForm.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 mt-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-primary"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-xs sm:text-sm">
                              I accept the <Link href="/terms" className="text-primary hover:underline">terms and conditions</Link>
                            </FormLabel>
                            <FormMessage className="text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full h-9 sm:h-10 text-xs sm:text-sm mt-2" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 sm:space-y-4 border-t border-gray-700 pt-4 px-4 sm:px-6">
                <div className="text-xs sm:text-sm text-gray-400 text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Theatre Manager Registration Form */}
          <TabsContent value="theatre-manager">
            <Card className="border-0 bg-gray-800 text-white shadow-lg">
              <CardHeader className="pb-4 md:pb-6">
                <CardTitle className="text-base sm:text-lg">Register as a Theatre Manager</CardTitle>
                <CardDescription className="text-xs sm:text-sm text-gray-400">
                  Create an account to manage your theatre and employees
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <Form {...managerForm}>
                  <form onSubmit={managerForm.handleSubmit(onManagerSubmit)} className="space-y-3 sm:space-y-4">
                    {/* Personal Information */}
                    <div className="space-y-3 sm:space-y-4 mb-4">
                      <h3 className="text-sm font-medium border-b border-gray-700 pb-2">Personal Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <FormField
                          control={managerForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs sm:text-sm">First Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="John" 
                                  {...field} 
                                  className="bg-gray-700 h-9 sm:h-10 text-sm"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={managerForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs sm:text-sm">Last Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Doe" 
                                  {...field} 
                                  className="bg-gray-700 h-9 sm:h-10 text-sm"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <FormField
                          control={managerForm.control}
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
                          control={managerForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs sm:text-sm">Phone Number</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="10-digit mobile number" 
                                  {...field} 
                                  className="bg-gray-700 h-9 sm:h-10 text-sm"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <FormField
                          control={managerForm.control}
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
                        <FormField
                          control={managerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs sm:text-sm">Confirm Password</FormLabel>
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
                      </div>
                    </div>
                    
                    {/* Theatre Information */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-sm font-medium border-b border-gray-700 pb-2">Theatre Information</h3>
                      <FormField
                        control={managerForm.control}
                        name="theatreName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm">Theatre Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Cineplex Movies" 
                                {...field} 
                                className="bg-gray-700 h-9 sm:h-10 text-sm"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={managerForm.control}
                        name="theatreAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm">Theatre Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="123 Main Street" 
                                {...field} 
                                className="bg-gray-700 h-9 sm:h-10 text-sm"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                        <FormField
                          control={managerForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs sm:text-sm">City</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="City" 
                                  {...field} 
                                  className="bg-gray-700 h-9 sm:h-10 text-sm"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={managerForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs sm:text-sm">State</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="State" 
                                  {...field} 
                                  className="bg-gray-700 h-9 sm:h-10 text-sm"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={managerForm.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-1 col-span-2">
                              <FormLabel className="text-xs sm:text-sm">Pincode</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Pincode" 
                                  {...field} 
                                  className="bg-gray-700 h-9 sm:h-10 text-sm"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <FormField
                      control={managerForm.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 mt-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-primary"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-xs sm:text-sm">
                              I accept the <Link href="/terms" className="text-primary hover:underline">terms and conditions</Link>
                            </FormLabel>
                            <FormDescription className="text-2xs sm:text-xs text-gray-400">
                              Your registration will be reviewed by our team before approval
                            </FormDescription>
                            <FormMessage className="text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full h-9 sm:h-10 text-xs sm:text-sm mt-2" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting request..." : "Submit Registration Request"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 sm:space-y-4 border-t border-gray-700 pt-4 px-4 sm:px-6">
                <div className="text-xs sm:text-sm text-gray-400 text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
                <div className="text-2xs sm:text-xs text-gray-500 text-center">
                  <p>Theatre manager accounts require approval before activation</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}