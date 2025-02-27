// components/manager/movie-scheduling.tsx
"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format, addMinutes } from 'date-fns';

// Mock data
const MOCK_MOVIES = [
  {
    id: 'movie-1',
    title: 'Inception',
    language: 'English',
    durationMinutes: 148,
    poster: 'https://example.com/inception.jpg',
  },
  {
    id: 'movie-2',
    title: 'The Shawshank Redemption',
    language: 'English',
    durationMinutes: 142,
    poster: 'https://example.com/shawshank.jpg',
  },
  {
    id: 'movie-3',
    title: 'Parasite',
    language: 'Korean',
    durationMinutes: 132,
    poster: 'https://example.com/parasite.jpg',
  },
  {
    id: 'movie-4',
    title: 'The Dark Knight',
    language: 'English',
    durationMinutes: 152,
    poster: 'https://example.com/dark-knight.jpg',
  },
  {
    id: 'movie-5',
    title: '3 Idiots',
    language: 'Hindi',
    durationMinutes: 170,
    poster: 'https://example.com/3-idiots.jpg',
  },
];

const MOCK_SCREENS = [
  { id: 'screen-1', name: 'Screen 1' },
  { id: 'screen-2', name: 'Screen 2' },
  { id: 'screen-3', name: 'Screen 3' },
];

// Schedule data is for one week
const MOCK_SCHEDULE = [
  {
    id: 'show-1',
    screenId: 'screen-1',
    movieId: 'movie-1',
    startTime: '2025-02-26T10:00:00',
    endTime: '2025-02-26T12:28:00',
    basePrice: 200,
    is3d: false,
    isDolby: false,
    isImax: false,
    showType: 'MORNING_SHOW',
  },
  {
    id: 'show-2',
    screenId: 'screen-1',
    movieId: 'movie-1',
    startTime: '2025-02-26T13:00:00',
    endTime: '2025-02-26T15:28:00',
    basePrice: 250,
    is3d: false,
    isDolby: false,
    isImax: false,
    showType: 'MATINEE',
  },
  {
    id: 'show-3',
    screenId: 'screen-1',
    movieId: 'movie-1',
    startTime: '2025-02-26T16:00:00',
    endTime: '2025-02-26T18:28:00',
    basePrice: 300,
    is3d: false,
    isDolby: false,
    isImax: false,
    showType: 'FIRST_SHOW',
  },
  {
    id: 'show-4',
    screenId: 'screen-1',
    movieId: 'movie-1',
    startTime: '2025-02-26T19:00:00',
    endTime: '2025-02-26T21:28:00',
    basePrice: 300,
    is3d: false,
    isDolby: false,
    isImax: false,
    showType: 'SECOND_SHOW',
  },
  {
    id: 'show-5',
    screenId: 'screen-2',
    movieId: 'movie-2',
    startTime: '2025-02-26T10:30:00',
    endTime: '2025-02-26T12:52:00',
    basePrice: 200,
    is3d: false,
    isDolby: false,
    isImax: false,
    showType: 'MORNING_SHOW',
  },
  {
    id: 'show-6',
    screenId: 'screen-2',
    movieId: 'movie-5',
    startTime: '2025-02-26T13:30:00',
    endTime: '2025-02-26T16:20:00',
    basePrice: 250,
    is3d: false,
    isDolby: false,
    isImax: false,
    showType: 'MATINEE',
  },
  {
    id: 'show-7',
    screenId: 'screen-2',
    movieId: 'movie-3',
    startTime: '2025-02-26T17:00:00',
    endTime: '2025-02-26T19:12:00',
    basePrice: 300,
    is3d: false,
    isDolby: false,
    isImax: false,
    showType: 'FIRST_SHOW',
  },
  {
    id: 'show-8',
    screenId: 'screen-2',
    movieId: 'movie-4',
    startTime: '2025-02-26T20:00:00',
    endTime: '2025-02-26T22:32:00',
    basePrice: 300,
    is3d: false,
    isDolby: true,
    isImax: false,
    showType: 'SECOND_SHOW',
  },
  {
    id: 'show-9',
    screenId: 'screen-3',
    movieId: 'movie-4',
    startTime: '2025-02-26T11:00:00',
    endTime: '2025-02-26T13:32:00',
    basePrice: 250,
    is3d: true,
    isDolby: false,
    isImax: false,
    showType: 'MORNING_SHOW',
  },
  {
    id: 'show-10',
    screenId: 'screen-3',
    movieId: 'movie-4',
    startTime: '2025-02-26T14:30:00',
    endTime: '2025-02-26T17:02:00',
    basePrice: 300,
    is3d: true,
    isDolby: false,
    isImax: false,
    showType: 'MATINEE',
  },
  {
    id: 'show-11',
    screenId: 'screen-3',
    movieId: 'movie-3',
    startTime: '2025-02-26T18:00:00',
    endTime: '2025-02-26T20:12:00',
    basePrice: 350,
    is3d: false,
    isDolby: true,
    isImax: false,
    showType: 'FIRST_SHOW',
  },
  {
    id: 'show-12',
    screenId: 'screen-3',
    movieId: 'movie-2',
    startTime: '2025-02-26T21:00:00',
    endTime: '2025-02-26T23:22:00',
    basePrice: 350,
    is3d: false,
    isDolby: true,
    isImax: false,
    showType: 'SECOND_SHOW',
  },
];

const SHOW_TYPES = [
  { id: 'REGULAR', name: 'Regular' },
  { id: 'PREMIERE', name: 'Premiere' },
  { id: 'SPECIAL_SCREENING', name: 'Special Screening' },
  { id: 'MORNING_SHOW', name: 'Morning Show' },
  { id: 'MATINEE', name: 'Matinee' },
  { id: 'FIRST_SHOW', name: 'First Show' },
  { id: 'SECOND_SHOW', name: 'Second Show' },
  { id: 'NIGHT_SHOW', name: 'Night Show' },
];

interface Movie {
  id: string;
  title: string;
  language: string;
  durationMinutes: number;
  poster: string;
}

interface Screen {
  id: string;
  name: string;
}

interface Show {
  id: string;
  screenId: string;
  movieId: string;
  startTime: string;
  endTime: string;
  basePrice: number;
  is3d: boolean;
  isDolby: boolean;
  isImax: boolean;
  showType: string;
}

interface MovieSchedulingProps {
  theatreId: string;
}

export default function MovieScheduling({ theatreId }: MovieSchedulingProps) {
  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [screens, setScreens] = useState<Screen[]>(MOCK_SCREENS);
  const [schedule, setSchedule] = useState<Show[]>(MOCK_SCHEDULE);
  const [selectedDate, setSelectedDate] = useState<string>('2025-02-26');
  const [selectedScreen, setSelectedScreen] = useState<string>(screens[0]?.id || '');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showToDelete, setShowToDelete] = useState<string | null>(null);
  
  // New show form state
  const [newShow, setNewShow] = useState<Partial<Show>>({
    screenId: screens[0]?.id || '',
    movieId: '',
    startTime: `${selectedDate}T10:00`,
    basePrice: 200,
    is3d: false,
    isDolby: false,
    isImax: false,
    showType: 'REGULAR',
  });
  
  // Handle screen change
  const handleScreenChange = (screenId: string) => {
    setSelectedScreen(screenId);
  };
  
  // Handle new show form changes
  const handleNewShowChange = (field: string, value: any) => {
    if (field === 'startTime') {
      // Calculate end time based on selected movie and start time
      const selectedMovie = movies.find(movie => movie.id === newShow.movieId);
      if (selectedMovie) {
        const startDate = new Date(value);
        const endDate = addMinutes(startDate, selectedMovie.durationMinutes);
        
        setNewShow({
          ...newShow,
          startTime: value,
          endTime: endDate.toISOString(),
        });
        return;
      }
    }
    
    if (field === 'movieId') {
      // Calculate end time based on selected movie and start time
      const selectedMovie = movies.find(movie => movie.id === value);
      if (selectedMovie && newShow.startTime) {
        const startDate = new Date(newShow.startTime);
        const endDate = addMinutes(startDate, selectedMovie.durationMinutes);
        
        setNewShow({
          ...newShow,
          movieId: value,
          endTime: endDate.toISOString(),
        });
        return;
      }
    }
    
    setNewShow({
      ...newShow,
      [field]: value,
    });
  };
  
  // Handle toggle fields (3D, Dolby, IMAX)
  const handleToggleField = (field: string) => {
    setNewShow({
      ...newShow,
      [field]: !newShow[field as keyof typeof newShow],
    });
  };
  
  // Add a new show
  const addNewShow = () => {
    const newShowObj: Show = {
      id: `show-${Date.now()}`,
      screenId: newShow.screenId as string,
      movieId: newShow.movieId as string,
      startTime: newShow.startTime as string,
      endTime: newShow.endTime as string,
      basePrice: newShow.basePrice as number,
      is3d: newShow.is3d as boolean,
      isDolby: newShow.isDolby as boolean,
      isImax: newShow.isImax as boolean,
      showType: newShow.showType as string,
    };
    
    setSchedule([...schedule, newShowObj]);
    setShowAddDialog(false);
    
    // Reset form
    setNewShow({
      screenId: selectedScreen,
      movieId: '',
      startTime: `${selectedDate}T10:00`,
      basePrice: 200,
      is3d: false,
      isDolby: false,
      isImax: false,
      showType: 'REGULAR',
    });
  };
  
  // Delete a show
  const deleteShow = () => {
    if (!showToDelete) return;
    
    setSchedule(schedule.filter(show => show.id !== showToDelete));
    setShowDeleteDialog(false);
    setShowToDelete(null);
  };
  
  // Filter schedule by screen and date
  const filteredSchedule = schedule.filter(show => {
    const showDate = show.startTime.split('T')[0];
    return show.screenId === selectedScreen && showDate === selectedDate;
  });
  
  // Sort schedule by start time
  const sortedSchedule = [...filteredSchedule].sort((a, b) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });
  
  // Get movie by ID
  const getMovieById = (movieId: string) => {
    return movies.find(movie => movie.id === movieId);
  };
  
  // Get screen by ID
  const getScreenById = (screenId: string) => {
    return screens.find(screen => screen.id === screenId);
  };
  
  // Get show type name
  const getShowTypeName = (typeId: string) => {
    return SHOW_TYPES.find(type => type.id === typeId)?.name || typeId;
  };
  
  // Format time
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };
  
  // Format duration
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Check if two shows overlap
  const checkOverlap = (startTime: string, endTime: string, excludeShowId?: string) => {
    return schedule.some(show => {
      if (show.screenId !== newShow.screenId) return false;
      if (excludeShowId && show.id === excludeShowId) return false;
      
      const showStart = new Date(show.startTime).getTime();
      const showEnd = new Date(show.endTime).getTime();
      const newStart = new Date(startTime).getTime();
      const newEnd = new Date(endTime).getTime();
      
      // Check if new show starts during existing show
      const startsInside = newStart >= showStart && newStart < showEnd;
      // Check if new show ends during existing show
      const endsInside = newEnd > showStart && newEnd <= showEnd;
      // Check if new show completely contains existing show
      const containsShow = newStart <= showStart && newEnd >= showEnd;
      
      return startsInside || endsInside || containsShow;
    });
  };
  
  // Check if new show overlaps with existing shows
  const hasOverlap = newShow.startTime && newShow.endTime
    ? checkOverlap(newShow.startTime, newShow.endTime)
    : false;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Movie Scheduling</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="screen">Screen</Label>
                <Select
                  value={selectedScreen}
                  onValueChange={handleScreenChange}
                >
                  <SelectTrigger id="screen">
                    <SelectValue placeholder="Select screen" />
                  </SelectTrigger>
                  <SelectContent>
                    {screens.map((screen) => (
                      <SelectItem key={screen.id} value={screen.id}>
                        {screen.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                className="w-full"
                onClick={() => {
                  setShowAddDialog(true);
                  setNewShow({
                    ...newShow,
                    screenId: selectedScreen,
                    startTime: `${selectedDate}T10:00`,
                  });
                }}
              >
                Add New Show
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>
                Schedule for {getScreenById(selectedScreen)?.name} - {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sortedSchedule.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No shows scheduled.</p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setShowAddDialog(true);
                      setNewShow({
                        ...newShow,
                        screenId: selectedScreen,
                        startTime: `${selectedDate}T10:00`,
                      });
                    }}
                  >
                    Add a show
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Movie</TableHead>
                      <TableHead>Show Type</TableHead>
                      <TableHead>Formats</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedSchedule.map((show) => {
                      const movie = getMovieById(show.movieId);
                      return (
                        <TableRow key={show.id}>
                          <TableCell>
                            <div className="font-medium">
                              {formatTime(show.startTime)} - {formatTime(show.endTime)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {movie ? formatDuration(movie.durationMinutes) : '-'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{movie?.title || 'Unknown'}</div>
                            <div className="text-sm text-muted-foreground">
                              {movie?.language || '-'}
                            </div>
                          </TableCell>
                          <TableCell>{getShowTypeName(show.showType)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              {show.is3d && (
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                                  3D
                                </span>
                              )}
                              {show.isDolby && (
                                <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                                  Dolby
                                </span>
                              )}
                              {show.isImax && (
                                <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                                  IMAX
                                </span>
                              )}
                              {!show.is3d && !show.isDolby && !show.isImax && (
                                <span className="text-muted-foreground">Standard</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>₹{show.basePrice}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() => {
                                setShowToDelete(show.id);
                                setShowDeleteDialog(true);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Add Show Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Show</DialogTitle>
            <DialogDescription>
              Schedule a new movie show for {getScreenById(selectedScreen)?.name}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-show-movie">Select Movie</Label>
              <Select
                value={newShow.movieId as string}
                onValueChange={(value) => handleNewShowChange('movieId', value)}
              >
                <SelectTrigger id="new-show-movie">
                  <SelectValue placeholder="Select movie" />
                </SelectTrigger>
                <SelectContent>
                  {movies.map((movie) => (
                    <SelectItem key={movie.id} value={movie.id}>
                      {movie.title} ({movie.language})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-show-time">Start Time</Label>
                <Input
                  id="new-show-time"
                  type="datetime-local"
                  value={newShow.startTime}
                  onChange={(e) => handleNewShowChange('startTime', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-show-price">Base Price (₹)</Label>
                <Input
                  id="new-show-price"
                  type="number"
                  value={newShow.basePrice}
                  onChange={(e) => handleNewShowChange('basePrice', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-show-type">Show Type</Label>
              <Select
                value={newShow.showType as string}
                onValueChange={(value) => handleNewShowChange('showType', value)}
              >
                <SelectTrigger id="new-show-type">
                  <SelectValue placeholder="Select show type" />
                </SelectTrigger>
                <SelectContent>
                  {SHOW_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Formats</Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="new-show-3d"
                    checked={newShow.is3d}
                    onChange={() => handleToggleField('is3d')}
                  />
                  <Label htmlFor="new-show-3d">3D</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="new-show-dolby"
                    checked={newShow.isDolby}
                    onChange={() => handleToggleField('isDolby')}
                  />
                  <Label htmlFor="new-show-dolby">Dolby</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="new-show-imax"
                    checked={newShow.isImax}
                    onChange={() => handleToggleField('isImax')}
                  />
                  <Label htmlFor="new-show-imax">IMAX</Label>
                </div>
              </div>
            </div>
            
            {hasOverlap && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                Warning: This show overlaps with another show on the same screen.
              </div>
            )}
            
            {newShow.movieId && newShow.endTime && (
              <div className="text-sm text-muted-foreground">
                Show will end at {formatTime(newShow.endTime as string)}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={addNewShow}
              disabled={!newShow.movieId || hasOverlap}
            >
              Add Show
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this show? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={deleteShow}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}