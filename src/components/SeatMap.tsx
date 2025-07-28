import { Seat, SeatRow } from '@/types/movie';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SeatMapProps {
  seatLayout: SeatRow[];
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

export const SeatMap = ({ seatLayout, selectedSeats, onSeatSelect }: SeatMapProps) => {
  const getSeatVariant = (seat: Seat) => {
    if (seat.status === 'occupied') return 'destructive';
    if (selectedSeats.some(s => s.id === seat.id)) return 'gold';
    return 'outline';
  };

  const getSeatStyle = (seat: Seat) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    if (seat.status === 'occupied') {
      return 'bg-seat-occupied border-seat-occupied cursor-not-allowed opacity-60';
    }
    
    if (isSelected) {
      return 'bg-seat-selected border-seat-selected shadow-lg scale-110';
    }
    
    switch (seat.type) {
      case 'vip':
        return 'bg-seat-vip/20 border-seat-vip hover:bg-seat-vip/40';
      case 'premium':
        return 'bg-cinema-purple/20 border-cinema-purple hover:bg-cinema-purple/40';
      default:
        return 'bg-seat-available/20 border-seat-available hover:bg-seat-available/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Screen */}
      <div className="text-center">
        <div className="mx-auto w-3/4 h-3 bg-gradient-to-r from-cinema-gold/50 via-cinema-gold to-cinema-gold/50 rounded-full mb-4 shadow-lg"></div>
        <p className="text-sm text-muted-foreground">SCREEN</p>
      </div>

      {/* Seat Map */}
      <div className="space-y-3">
        {seatLayout.map((row) => (
          <div key={row.row} className="flex items-center justify-center gap-2">
            {/* Row Label */}
            <div className="w-8 text-center font-medium text-muted-foreground">
              {row.row}
            </div>
            
            {/* Seats */}
            <div className="flex gap-1">
              {row.seats.map((seat, index) => (
                <div key={seat.id} className="relative">
                  {/* Aisle space */}
                  {index === Math.floor(row.seats.length / 2) && (
                    <div className="w-4" />
                  )}
                  
                  <Button
                    variant="seat"
                    size="icon"
                    disabled={seat.status === 'occupied'}
                    onClick={() => onSeatSelect(seat)}
                    className={cn(
                      'relative text-xs font-medium',
                      getSeatStyle(seat)
                    )}
                    title={`${row.row}${seat.number} - ${seat.type.toUpperCase()} - $${seat.price}`}
                  >
                    {seat.number}
                    
                    {/* Seat type indicator */}
                    {seat.type === 'vip' && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-seat-vip rounded-full"></div>
                    )}
                    {seat.type === 'premium' && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-cinema-purple rounded-full"></div>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-seat-available/40 border border-seat-available rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-seat-selected border border-seat-selected rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-seat-occupied border border-seat-occupied rounded opacity-60"></div>
          <span>Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cinema-purple/40 border border-cinema-purple rounded"></div>
          <span>Premium (+$5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-seat-vip/40 border border-seat-vip rounded"></div>
          <span>VIP (+$15)</span>
        </div>
      </div>
    </div>
  );
};