// components/booking/seat-selection.tsx
"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Seat {
  id: string;
  row: string;
  number: string;
  category: string;
  price: number;
  status: 'AVAILABLE' | 'BOOKED' | 'LOCKED' | 'BLOCKED';
}

interface SeatCategory {
  id: string;
  name: string;
  price: number;
  colorClass: string;
}

interface SeatSelectionProps {
  showId: string;
  seatMap: {
    rows: string[];
    seatsPerRow: Record<string, number>;
    seats: Seat[];
  };
  categories: SeatCategory[];
  onSelectionChange: (selectedSeats: Seat[]) => void;
}

export default function SeatSelection({
  showId,
  seatMap,
  categories,
  onSelectionChange,
}: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  
  // Handle seat click
  const handleSeatClick = (seat: Seat) => {
    if (seat.status !== 'AVAILABLE') return;
    
    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    
    if (isSelected) {
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };
  
  // Update parent component when selection changes
  useEffect(() => {
    onSelectionChange(selectedSeats);
  }, [selectedSeats, onSelectionChange]);
  
  // Get CSS classes for a seat based on its status and selection
  const getSeatClasses = (seat: Seat) => {
    const category = categories.find((c) => c.id === seat.category);
    const baseClasses = "flex items-center justify-center w-8 h-8 rounded m-1 cursor-pointer transition-colors";
    
    if (seat.status === 'BOOKED') {
      return `${baseClasses} bg-gray-400 text-gray-50 cursor-not-allowed opacity-50`;
    }
    
    if (seat.status === 'BLOCKED') {
      return `${baseClasses} opacity-0 cursor-default`;
    }
    
    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    
    if (isSelected) {
      return `${baseClasses} bg-primary text-primary-foreground`;
    }
    
    return `${baseClasses} ${category?.colorClass || 'bg-blue-100'} hover:bg-blue-200`;
  };
  
  // Get total amount for selected seats
  const getTotalAmount = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };
  
  return (
    <div className="flex flex-col items-center w-full">
      {/* Screen representation */}
      <div className="w-3/4 h-8 bg-gray-300 rounded-t-lg mb-8 flex items-center justify-center text-sm text-gray-700">
        SCREEN
      </div>
      
      {/* Seat map */}
      <div className="mb-8">
        {seatMap.rows.map((row) => (
          <div key={row} className="flex items-center mb-2">
            <div className="w-6 text-center font-medium text-gray-500">{row}</div>
            <div className="flex flex-wrap">
              {Array.from({ length: seatMap.seatsPerRow[row] }).map((_, index) => {
                const seatNumber = (index + 1).toString().padStart(2, '0');
                const seat = seatMap.seats.find(
                  (s) => s.row === row && s.number === seatNumber
                );
                
                if (!seat) {
                  return (
                    <div 
                      key={`${row}-${seatNumber}`} 
                      className="w-8 h-8 m-1 opacity-0"
                    />
                  );
                }
                
                return (
                  <div
                    key={seat.id}
                    className={getSeatClasses(seat)}
                    onClick={() => handleSeatClick(seat)}
                  >
                    {seat.status !== 'BLOCKED' ? seatNumber : ''}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-primary rounded mr-2" />
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-400 opacity-50 rounded mr-2" />
          <span className="text-sm">Booked</span>
        </div>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <div className={`w-6 h-6 ${category.colorClass} rounded mr-2`} />
            <span className="text-sm">{category.name}</span>
          </div>
        ))}
      </div>
      
      {/* Selected seats summary */}
      {selectedSeats.length > 0 && (
        <div className="w-full max-w-md p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Selected Seats ({selectedSeats.length})</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedSeats.map((seat) => (
              <div key={seat.id} className="bg-gray-100 px-2 py-1 rounded text-sm">
                {seat.row}-{seat.number}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span>Total Amount:</span>
            <span>₹{getTotalAmount().toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}