// src/app/(theatre-manager)/shows/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CalendarDays, 
  Clock, 
  Plus, 
  Film, 
  CreditCard, 
  Monitor, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Info 
} from 'lucide-react';
import { format, addDays, subDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import TheatreManagerLayout from '@/components/layout/theatre-manager-layout';

// Mock data for screens
const screenData = [
  { id: 1, name: 'Screen 1', capacity: 150, type: 'Standard' },
  { id: 2, name: 'Screen 2', capacity: 180, type: 'Premium' },
  { id: 3, name: 'Screen 3', capacity: 120, type: 'Standard' },
];

// Mock data for movies
const movieData = [
  { id: 1, title: 'Avengers: Endgame', duration: 182, language: 'English', certification: 'UA', poster: 'https://placehold.co/300x450' },
  { id: 2, title: 'The Dark Knight', duration: 152, language: 'English', certification: 'UA', poster: 'https://placehold.co/300x450' },
  { id: 3, title: 'Inception', duration: 148, language: 'English', certification: 'UA', poster: 'https://placehold.co/300x450' },
  { id: 4, title: 'Interstellar', duration: 169, language: 'English', certification: 'UA', poster: 'https://placehold.co/300x450' }
];

// Mock data for show times
const showsData = [
  { 
    id: 1, 
    movieId: 1, 
    screenId: 1, 
    date: '2025-03-02', 
    startTime: '10:00', 
    endTime: '13:02', 
    basePrice: 180,
    premiumPrice: 250,
    is3d: true,
    isDolby: false
  },
  { 
    id: 2, 
    movieId: 2, 
    screenId: 1, 
    date: '2025-03-02', 
    startTime: '13:30', 
    endTime: '16:02', 
    basePrice: 200,
    premiumPrice: 280,
    is3d: false,
    isDolby: false
  },
  { 
    id: 3, 
    movieId: 3, 
    screenId: 1, 
    date: '2025-03-02', 
    startTime: '16:30', 
    endTime: '18:58', 
    basePrice: 220,
    premiumPrice: 300,
    is3d: false,
    isDolby: false
  },
  { 
    id: 4, 
    movieId: 4, 
    screenId: 1, 
    date: '2025-03-02', 
    startTime: '19:30', 
    endTime: '22:19', 
    basePrice: 250,
    premiumPrice: 350,
    is3d: false,
    isDolby: true
  },
  { 
    id: 5, 
    movieId: 2, 
    screenId: 2, 
    date: '2025-03-02', 
    startTime: '10:30', 
    endTime: '13:02', 
    basePrice: 200,
    premiumPrice: 280,
    is3d: false,
    isDolby: true
  },
  { 
    id: 6, 
    movieId: 1, 
    screenId: 2, 
    date: '2025-03-02', 
    startTime: '13:30', 
    endTime: '16:32', 
    basePrice: 200,
    premiumPrice: 280,
    is3d: true,
    isDolby: true
  },
  { 
    id: 7, 
    movieId: 3, 
    screenId: 2, 
    date: '2025-03-02', 
    startTime: '17:00', 
    endTime: '19:28', 
    basePrice: 220,
    premiumPrice: 300,
    is3d: false,
    isDolby: true
  },
  { 
    id: 8, 
    movieId: 4, 
    screenId: 3, 
    date: '2025-03-02', 
    startTime: '11:00', 
    endTime: '13:49', 
    basePrice: 180,
    premiumPrice: 250,
    is3d: false,
    isDolby: false
  },
  { 
    id: 9, 
    movieId: 2, 
    screenId: 3, 
    date: '2025-03-02', 
    startTime: '14:15', 
    endTime: '16:47', 
    basePrice: 200,
    premiumPrice: 280,
    is3d: false,
    isDolby: false
  }
];

// Helper function to get movie details by ID
const getMovieById = (id: number) => {
  return movieData.find(movie => movie.id === id);
};

// Helper function to get screen details by ID
const getScreenById = (id: number) => {
  return screenData.find(screen => screen.id === id);
};

export default function TheatreManagerShowsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<string | undefined>(undefined);
  const [selectedMovie, setSelectedMovie] = useState<string | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [is3d, setIs3d] = useState(false);
  const [isDolby, setIsDolby] = useState(false);
  const [shows, setShows] = useState(showsData);
  const [isEditShowOpen, setIsEditShowOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState<any>(null);

  // Create an array of 7 days starting from currentWeekStart
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));

  // Format date string for API
  const formatDateString = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
  };

  // Get shows for current view (date and screen based)
  const getFilteredShows = () => {
    const dateStr = formatDateString(selectedDate);
    return shows.filter(show => show.date === dateStr);
  };

  const filteredShows = getFilteredShows();

  // Navigation handlers
  const handlePreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
  };

  const handleAddShow = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would add the show to the database
    console.log({
      screenId: selectedScreen,
      movieId: selectedMovie,
      date: formatDateString(selectedDate),
      startTime,
      basePrice,
      is3d,
      isDolby
    });
    setShowCreateDialog(false);
  };

  const handleEditShow = (show: any) => {
    setCurrentShow(show);
    setIsEditShowOpen(true);
  };

  const handleEditShowSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the show in the database
    setIsEditShowOpen(false);
  };

  const handleDeleteShow = (id: number) => {
    setShows(shows.filter(show => show.id !== id));
  };

  return (
    <TheatreManagerLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Show Schedule</h1>
          
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Show
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Schedule New Show</DialogTitle>
                <DialogDescription>
                  Add a new movie show to your schedule. Select screen, movie, time, and pricing details.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddShow}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">Date</Label>
                    <div className="col-span-3 text-sm">
                      {format(selectedDate, 'MMMM d, yyyy (EEEE)')}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="screen" className="text-right">Screen</Label>
                    <Select 
                      value={selectedScreen} 
                      onValueChange={setSelectedScreen}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select screen" />
                      </SelectTrigger>
                      <SelectContent>
                        {screenData.map(screen => (
                          <SelectItem key={screen.id} value={screen.id.toString()}>
                            {screen.name} ({screen.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="movie" className="text-right">Movie</Label>
                    <Select 
                      value={selectedMovie} 
                      onValueChange={setSelectedMovie}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select movie" />
                      </SelectTrigger>
                      <SelectContent>
                        {movieData.map(movie => (
                          <SelectItem key={movie.id} value={movie.id.toString()}>
                            {movie.title} ({movie.duration} mins)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startTime" className="text-right">Start Time</Label>
                    <Input 
                      id="startTime" 
                      type="time" 
                      className="col-span-3"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="basePrice" className="text-right">Base Price (₹)</Label>
                    <Input 
                      id="basePrice" 
                      type="number" 
                      placeholder="200"
                      className="col-span-3"
                      value={basePrice}
                      onChange={(e) => setBasePrice(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Premium Price (₹)</Label>
                    <Input 
                      id="premiumPrice" 
                      type="number" 
                      placeholder="300"
                      className="col-span-3"
                      value={basePrice ? (parseInt(basePrice) * 1.4).toString() : ""}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Show Type</Label>
                    <div className="col-span-3 flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="is3d"
                          checked={is3d}
                          onChange={(e) => setIs3d(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="is3d">3D</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isDolby"
                          checked={isDolby}
                          onChange={(e) => setIsDolby(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="isDolby">Dolby Atmos</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Schedule Show</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Edit Show Dialog */}
          {currentShow && (
            <Dialog open={isEditShowOpen} onOpenChange={setIsEditShowOpen}>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Edit Show</DialogTitle>
                  <DialogDescription>
                    Update show details.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditShowSave}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-date" className="text-right">Date</Label>
                      <Input 
                        id="edit-date" 
                        type="date" 
                        className="col-span-3"
                        defaultValue={currentShow.date}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-screen" className="text-right">Screen</Label>
                      <Select defaultValue={currentShow.screenId.toString()}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select screen" />
                        </SelectTrigger>
                        <SelectContent>
                          {screenData.map(screen => (
                            <SelectItem key={screen.id} value={screen.id.toString()}>
                              {screen.name} ({screen.type})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-movie" className="text-right">Movie</Label>
                      <Select defaultValue={currentShow.movieId.toString()}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select movie" />
                        </SelectTrigger>
                        <SelectContent>
                          {movieData.map(movie => (
                            <SelectItem key={movie.id} value={movie.id.toString()}>
                              {movie.title} ({movie.duration} mins)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-startTime" className="text-right">Start Time</Label>
                      <Input 
                        id="edit-startTime" 
                        type="time" 
                        className="col-span-3"
                        defaultValue={currentShow.startTime}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-basePrice" className="text-right">Base Price (₹)</Label>
                      <Input 
                        id="edit-basePrice" 
                        type="number" 
                        className="col-span-3"
                        defaultValue={currentShow.basePrice}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-premiumPrice" className="text-right">Premium Price (₹)</Label>
                      <Input 
                        id="edit-premiumPrice" 
                        type="number" 
                        className="col-span-3"
                        defaultValue={currentShow.premiumPrice}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Show Type</Label>
                      <div className="col-span-3 flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="edit-is3d"
                            defaultChecked={currentShow.is3d}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Label htmlFor="edit-is3d">3D</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="edit-isDolby"
                            defaultChecked={currentShow.isDolby}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Label htmlFor="edit-isDolby">Dolby Atmos</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsEditShowOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between bg-card p-4 rounded-lg border">
          <Button variant="outline" size="sm" onClick={handlePreviousWeek}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous Week
          </Button>
          
          <div className="flex-1 flex justify-center">
            <div className="text-center">
              <h2 className="font-semibold">
                {format(currentWeekStart, 'MMMM yyyy')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d')}
              </p>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={handleNextWeek}>
            Next Week <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <Button
              key={day.toString()}
              variant={isSameDay(day, selectedDate) ? "default" : "outline"}
              className="flex flex-col h-20 p-2"
              onClick={() => handleDayClick(day)}
            >
              <span className="text-xs">{format(day, 'E')}</span>
              <span className="text-2xl font-bold">{format(day, 'd')}</span>
            </Button>
          ))}
        </div>

        {/* Show Schedule */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Schedule for {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            <Badge variant="outline" className="text-sm">
              {filteredShows.length} Shows
            </Badge>
          </div>

          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            </TabsList>
            
            {/* List View */}
            <TabsContent value="list">
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 bg-muted/50 text-sm font-medium">
                      <div className="col-span-1">Screen</div>
                      <div className="col-span-3">Movie</div>
                      <div className="col-span-2">Time</div>
                      <div className="col-span-1 text-center">Duration</div>
                      <div className="col-span-2">Price</div>
                      <div className="col-span-2">Features</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    
                    {screenData.map(screen => {
                      const screenShows = filteredShows.filter(show => show.screenId === screen.id);
                      
                      if (screenShows.length === 0) return null;
                      
                      return (
                        <React.Fragment key={screen.id}>
                          <div className="bg-muted/20 p-2 pl-4 font-medium border-t">
                            {screen.name} - {screen.type} ({screen.capacity} seats)
                          </div>
                          
                          {screenShows.map((show, index) => {
                            const movie = getMovieById(show.movieId);
                            
                            return (
                              <div 
                                key={show.id} 
                                className={`grid grid-cols-12 p-4 items-center ${
                                  index !== screenShows.length - 1 ? 'border-b' : ''
                                }`}
                              >
                                <div className="col-span-1">
                                  {/* Left this cell empty as screen info is in the header */}
                                </div>
                                <div className="col-span-3 flex items-center gap-3">
                                  <div className="h-12 w-8 overflow-hidden rounded">
                                    <img 
                                      src={movie?.poster} 
                                      alt={movie?.title} 
                                      className="object-cover h-full w-full"
                                    />
                                  </div>
                                  <div>
                                    <div className="font-medium">{movie?.title}</div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                                      <Badge variant="outline" className="text-xs">{movie?.certification}</Badge>
                                      <span>•</span>
                                      <span>{movie?.language}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <div className="flex items-center">
                                    <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                                    <span>{show.startTime} - {show.endTime}</span>
                                  </div>
                                </div>
                                <div className="col-span-1 text-center">{movie?.duration} min</div>
                                <div className="col-span-2">
                                  <div className="flex flex-col">
                                    <div className="flex items-center">
                                      <span className="text-muted-foreground text-sm mr-1.5">Regular:</span>
                                      <span>₹{show.basePrice}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-muted-foreground text-sm mr-1.5">Premium:</span>
                                      <span>₹{show.premiumPrice}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  {show.is3d && <Badge className="mr-1">3D</Badge>}
                                  {show.isDolby && <Badge variant="secondary">Dolby</Badge>}
                                </div>
                                <div className="col-span-1 flex items-center justify-end gap-1">
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleEditShow(show)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                                    onClick={() => handleDeleteShow(show.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                    
                    {filteredShows.length === 0 && (
                      <div className="p-8 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                          <CalendarDays className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium text-lg mb-1">No shows scheduled</h3>
                        <p className="text-muted-foreground">
                          There are no shows scheduled for this date. Click the "Add Show" button to schedule a new show.
                        </p>
                        <Button className="mt-4" onClick={() => setShowCreateDialog(true)}>
                          <Plus className="h-4 w-4 mr-2" /> Schedule Show
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Timeline View */}
            <TabsContent value="timeline">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-6">
                    {/* Time scale */}
                    <div className="flex items-center border-b pb-2">
                      <div className="w-24">Screen</div>
                      <div className="flex-1 grid grid-cols-12 gap-0">
                        {Array.from({ length: 12 }).map((_, i) => {
                          const hour = 10 + i; // Start from 10 AM
                          return (
                            <div key={i} className="text-center text-xs text-muted-foreground">
                              {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Screens and shows */}
                    {screenData.map((screen) => {
                      const screenShows = filteredShows.filter(show => show.screenId === screen.id);
                      
                      // Convert time string to minutes since 10 AM (timeline start)
                      const timeToPosition = (timeStr: string) => {
                        const [hours, minutes] = timeStr.split(':').map(Number);
                        const totalMinutes = (hours * 60) + minutes;
                        const minutesSince10AM = totalMinutes - (10 * 60); // 10 AM is our start time
                        // Our grid is 12 hours (720 minutes) wide
                        return (minutesSince10AM / 720) * 100;
                      };
                      
                      const calculateWidth = (startTime: string, endTime: string) => {
                        const startPos = timeToPosition(startTime);
                        const endPos = timeToPosition(endTime);
                        return endPos - startPos;
                      };
                      
                      return (
                        <div key={screen.id} className="flex items-start py-4 border-b last:border-b-0">
                          <div className="w-24 flex-shrink-0">
                            <div className="font-medium">{screen.name}</div>
                            <div className="text-xs text-muted-foreground">{screen.type}</div>
                          </div>
                          
                          <div className="flex-1 relative h-20">
                            {/* Time grid lines */}
                            <div className="absolute inset-0 grid grid-cols-12">
                              {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="border-l h-full last:border-r"></div>
                              ))}
                            </div>
                            
                            {/* Show blocks */}
                            {screenShows.map((show) => {
                              const movie = getMovieById(show.movieId);
                              const leftPosition = timeToPosition(show.startTime);
                              const width = calculateWidth(show.startTime, show.endTime);
                              
                              return (
                                <div
                                  key={show.id}
                                  className="absolute h-16 rounded-md border overflow-hidden shadow-sm hover:shadow transition-shadow bg-white"
                                  style={{
                                    left: `${leftPosition}%`,
                                    width: `${width}%`,
                                    top: '8px',
                                  }}
                                >
                                  <div className={`h-1 w-full ${show.is3d ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                                  <div className="p-2">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-medium text-sm truncate" title={movie?.title}>
                                        {movie?.title}
                                      </h4>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                              <Info className="h-3 w-3" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <div className="space-y-1">
                                              <p className="font-medium">{movie?.title}</p>
                                              <p className="text-xs">{movie?.duration} minutes</p>
                                              <p className="text-xs">
                                                {show.startTime} - {show.endTime}
                                              </p>
                                              <div className="flex gap-1 pt-1">
                                                {show.is3d && <Badge size="sm">3D</Badge>}
                                                {show.isDolby && <Badge variant="secondary" size="sm">Dolby</Badge>}
                                              </div>
                                            </div>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                    <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                                      <span>{show.startTime} - {show.endTime}</span>
                                      <span>₹{show.basePrice}</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                    
                    {filteredShows.length === 0 && (
                      <div className="p-8 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                          <CalendarDays className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium text-lg mb-1">No shows scheduled</h3>
                        <p className="text-muted-foreground">
                          There are no shows scheduled for this date. Click the "Add Show" button to schedule a new show.
                        </p>
                        <Button className="mt-4" onClick={() => setShowCreateDialog(true)}>
                          <Plus className="h-4 w-4 mr-2" /> Schedule Show
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Film className="h-5 w-5 mr-2 text-primary" />
                Manage Movies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Add or edit movies in your theatre's catalog.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/theatre-manager/movies">Go to Movies</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Monitor className="h-5 w-5 mr-2 text-primary" />
                Screen Setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configure screens, seating layout and categories.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/theatre-manager/screens">Manage Screens</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-primary" />
                Pricing Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create pricing templates for different show types and times.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/theatre-manager/pricing">Set Pricing</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </TheatreManagerLayout>
  );
}