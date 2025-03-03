// src/app/(theatre-manager)/movies/page.tsx
"use client";

import React, { useState } from 'react';
import { 
  Film, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Calendar, 
  ChevronRight 
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import TheatreManagerLayout from '@/components/layout/theatre-manager-layout';

// Mock data for movies
const moviesMockData = [
  {
    id: 1,
    title: 'Avengers: Endgame',
    poster: 'https://placehold.co/300x450',
    duration: 182,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    language: 'English',
    certification: 'UA',
    status: 'Now Showing',
    releaseDate: '2023-04-26',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    poster: 'https://placehold.co/300x450',
    duration: 152,
    genres: ['Action', 'Crime', 'Drama'],
    language: 'English',
    certification: 'UA',
    status: 'Now Showing',
    releaseDate: '2023-07-18',
  },
  {
    id: 3,
    title: 'Inception',
    poster: 'https://placehold.co/300x450',
    duration: 148,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    language: 'English',
    certification: 'UA',
    status: 'Now Showing',
    releaseDate: '2023-07-16',
  },
  {
    id: 4,
    title: 'Interstellar',
    poster: 'https://placehold.co/300x450',
    duration: 169,
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    language: 'English',
    certification: 'UA',
    status: 'Now Showing',
    releaseDate: '2023-11-07',
  },
  {
    id: 5,
    title: 'The Shawshank Redemption',
    poster: 'https://placehold.co/300x450',
    duration: 142,
    genres: ['Drama'],
    language: 'English',
    certification: 'UA',
    status: 'Coming Soon',
    releaseDate: '2024-01-15',
  },
  {
    id: 6,
    title: 'Pulp Fiction',
    poster: 'https://placehold.co/300x450',
    duration: 154,
    genres: ['Crime', 'Drama'],
    language: 'English',
    certification: 'A',
    status: 'Coming Soon',
    releaseDate: '2024-02-10',
  },
];

export default function TheatreManagerMoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const [isEditMovieOpen, setIsEditMovieOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<any>(null);
  const [movies, setMovies] = useState(moviesMockData);

  // Filter movies based on search query and status
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || movie.status.toLowerCase().includes(selectedStatus.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const handleDeleteMovie = (id: number) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const handleEditMovie = (movie: any) => {
    setCurrentMovie(movie);
    setIsEditMovieOpen(true);
  };

  const handleAddMovie = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you would add the movie to the database
    setIsAddMovieOpen(false);
  };

  const handleEditMovieSave = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you would update the movie in the database
    setIsEditMovieOpen(false);
  };

  return (
    <TheatreManagerLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
          
          {/* Add Movie Dialog */}
          <Dialog open={isAddMovieOpen} onOpenChange={setIsAddMovieOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Movie
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add New Movie</DialogTitle>
                <DialogDescription>
                  Add a new movie to your theatre's catalog. Fill in all the necessary details.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddMovie}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" placeholder="Movie title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right">Duration (mins)</Label>
                    <Input id="duration" type="number" placeholder="120" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="language" className="text-right">Language</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                        <SelectItem value="telugu">Telugu</SelectItem>
                        <SelectItem value="kannada">Kannada</SelectItem>
                        <SelectItem value="malayalam">Malayalam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="certification" className="text-right">Certification</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select certification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="u">U</SelectItem>
                        <SelectItem value="ua">U/A</SelectItem>
                        <SelectItem value="a">A</SelectItem>
                        <SelectItem value="s">S</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="releaseDate" className="text-right">Release Date</Label>
                    <Input id="releaseDate" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">Status</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now-showing">Now Showing</SelectItem>
                        <SelectItem value="coming-soon">Coming Soon</SelectItem>
                        <SelectItem value="not-showing">Not Showing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="genres" className="text-right">Genres</Label>
                    <Input id="genres" placeholder="Action, Drama, Comedy, etc." className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="poster" className="text-right">Poster</Label>
                    <Input id="poster" type="file" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddMovieOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Movie</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Edit Movie Dialog */}
          {currentMovie && (
            <Dialog open={isEditMovieOpen} onOpenChange={setIsEditMovieOpen}>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Edit Movie</DialogTitle>
                  <DialogDescription>
                    Update movie details in your theatre's catalog.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditMovieSave}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-title" className="text-right">Title</Label>
                      <Input 
                        id="edit-title" 
                        placeholder="Movie title" 
                        className="col-span-3" 
                        defaultValue={currentMovie.title}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-duration" className="text-right">Duration (mins)</Label>
                      <Input 
                        id="edit-duration" 
                        type="number" 
                        className="col-span-3" 
                        defaultValue={currentMovie.duration}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-language" className="text-right">Language</Label>
                      <Select defaultValue={currentMovie.language.toLowerCase()}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="tamil">Tamil</SelectItem>
                          <SelectItem value="telugu">Telugu</SelectItem>
                          <SelectItem value="kannada">Kannada</SelectItem>
                          <SelectItem value="malayalam">Malayalam</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-certification" className="text-right">Certification</Label>
                      <Select defaultValue={currentMovie.certification.toLowerCase()}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select certification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="u">U</SelectItem>
                          <SelectItem value="ua">U/A</SelectItem>
                          <SelectItem value="a">A</SelectItem>
                          <SelectItem value="s">S</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-releaseDate" className="text-right">Release Date</Label>
                      <Input 
                        id="edit-releaseDate" 
                        type="date" 
                        className="col-span-3" 
                        defaultValue={currentMovie.releaseDate}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-status" className="text-right">Status</Label>
                      <Select defaultValue={currentMovie.status.toLowerCase().replace(' ', '-')}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now-showing">Now Showing</SelectItem>
                          <SelectItem value="coming-soon">Coming Soon</SelectItem>
                          <SelectItem value="not-showing">Not Showing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-genres" className="text-right">Genres</Label>
                      <Input 
                        id="edit-genres" 
                        placeholder="Action, Drama, Comedy, etc." 
                        className="col-span-3" 
                        defaultValue={currentMovie.genres.join(', ')}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-poster" className="text-right">Poster</Label>
                      <div className="col-span-3 flex gap-4 items-center">
                        <div className="h-14 w-10 overflow-hidden rounded">
                          <img 
                            src={currentMovie.poster} 
                            alt={currentMovie.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <Input id="edit-poster" type="file" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsEditMovieOpen(false)}>
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
              placeholder="Search movies..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={selectedStatus}
            onValueChange={setSelectedStatus}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Movies</SelectItem>
              <SelectItem value="now showing">Now Showing</SelectItem>
              <SelectItem value="coming soon">Coming Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Movie tabs */}
        <Tabs defaultValue="grid" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground">
              {filteredMovies.length} movies found
            </div>
          </div>

          {/* Grid View */}
          <TabsContent value="grid" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMovies.map((movie) => (
                <Card key={movie.id} className="overflow-hidden">
                  <div className="aspect-[2/3] relative group">
                    <img 
                      src={movie.poster} 
                      alt={movie.title} 
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handleEditMovie(movie)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteMovie(movie.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span>{movie.duration} mins</span>
                      <span className="mx-1">•</span>
                      <span>{movie.language}</span>
                      <span className="mx-1">•</span>
                      <Badge variant="outline" className="ml-1">{movie.certification}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {movie.genres.slice(0, 2).map((genre) => (
                        <Badge key={genre} variant="secondary" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                      {movie.genres.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{movie.genres.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <Badge 
                      variant={movie.status === "Now Showing" ? "default" : "outline"}
                    >
                      {movie.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Details <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 bg-muted/50 text-sm font-medium">
                    <div className="col-span-5">Movie</div>
                    <div className="col-span-1 text-center">Duration</div>
                    <div className="col-span-2">Language</div>
                    <div className="col-span-2">Release Date</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                  </div>
                  {filteredMovies.map((movie, index) => (
                    <div 
                      key={movie.id} 
                      className={`grid grid-cols-12 p-4 items-center ${
                        index !== filteredMovies.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <div className="col-span-5 flex items-center gap-3">
                        <div className="h-12 w-8 overflow-hidden rounded">
                          <img 
                            src={movie.poster} 
                            alt={movie.title} 
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{movie.title}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Badge variant="outline" className="text-xs">{movie.certification}</Badge>
                            <span>•</span>
                            {movie.genres.slice(0, 2).join(', ')}
                            {movie.genres.length > 2 && '...'}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 text-center">{movie.duration} min</div>
                      <div className="col-span-2">{movie.language}</div>
                      <div className="col-span-2">{movie.releaseDate}</div>
                      <div className="col-span-1 text-center">
                        <Badge 
                          variant={movie.status === "Now Showing" ? "default" : "outline"}
                          className="whitespace-nowrap"
                        >
                          {movie.status}
                        </Badge>
                      </div>
                      <div className="col-span-1 flex items-center justify-end gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0" 
                          onClick={() => handleEditMovie(movie)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteMovie(movie.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {filteredMovies.length === 0 && (
                    <div className="p-8 text-center">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                        <Film className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium text-lg mb-1">No movies found</h3>
                      <p className="text-muted-foreground mb-4">
                        No movies match your current search criteria.
                      </p>
                      <Button onClick={() => {
                        setSearchQuery('');
                        setSelectedStatus('all');
                      }}>
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common movie management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto flex-col p-4 space-y-2" onClick={() => setIsAddMovieOpen(true)}>
                <Plus className="h-5 w-5" />
                <span>Add New Movie</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col p-4 space-y-2" asChild>
                <a href="/theatre-manager/shows">
                  <Calendar className="h-5 w-5" />
                  <span>Schedule Shows</span>
                </a>
              </Button>
              <Button variant="outline" className="h-auto flex-col p-4 space-y-2">
                <Film className="h-5 w-5" />
                <span>Bulk Import Movies</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TheatreManagerLayout>
  );
}