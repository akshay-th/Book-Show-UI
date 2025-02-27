// components/movies/movie-card.tsx
"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  duration: number;
  genres: string[];
  ageRating: string;
}

export default function MovieCard({
  id,
  title,
  posterUrl,
  releaseDate,
  duration,
  genres,
  ageRating,
}: MovieCardProps) {
  const formattedDate = new Date(releaseDate).toLocaleDateString();
  const formattedDuration = `${Math.floor(duration / 60)}h ${duration % 60}m`;
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={posterUrl || '/placeholder-movie.jpg'} // Fallback to placeholder
          alt={title}
          fill
          className="object-cover transition-all hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
          {ageRating}
        </div>
      </div>
      
      <CardContent className="flex-grow pt-4">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{formattedDuration}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {genres.slice(0, 3).map((genre) => (
            <span 
              key={genre} 
              className="inline-block bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs"
            >
              {genre}
            </span>
          ))}
          {genres.length > 3 && (
            <span className="inline-block bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">
              +{genres.length - 3}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link href={`/movies/${id}`} className="w-full">
          <Button variant="default" className="w-full">Book Tickets</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}