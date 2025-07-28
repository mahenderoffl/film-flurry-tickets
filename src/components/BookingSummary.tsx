import { Movie, Seat } from '@/types/movie';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Calendar, CreditCard } from 'lucide-react';

interface BookingSummaryProps {
  movie: Movie;
  selectedSeats: Seat[];
  showtime: string;
  onConfirmBooking: () => void;
  onCancel: () => void;
}

export const BookingSummary = ({ 
  movie, 
  selectedSeats, 
  showtime, 
  onConfirmBooking, 
  onCancel 
}: BookingSummaryProps) => {
  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const processingFee = 25;
  const finalAmount = totalAmount + processingFee;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-cinema-gold" />
          Booking Summary
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Movie Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{movie.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{showtime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>CinePlex Downtown - Screen 1</span>
          </div>
          <Badge variant="secondary">{movie.rating}</Badge>
        </div>

        <Separator />

        {/* Selected Seats */}
        <div className="space-y-2">
          <h4 className="font-medium">Selected Seats</h4>
          <div className="space-y-1">
            {selectedSeats.map(seat => (
              <div key={seat.id} className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {seat.id}
                  </Badge>
                  <span className="capitalize">{seat.type}</span>
                </span>
                <span className="font-medium">₹{seat.price}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({selectedSeats.length} tickets)</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Processing Fee</span>
            <span>₹{processingFee}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-cinema-gold">₹{finalAmount}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-4">
          <Button 
            variant="gold" 
            className="w-full"
            onClick={onConfirmBooking}
            disabled={selectedSeats.length === 0}
          >
            Confirm Booking - ₹{finalAmount}
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>

        {/* Notice */}
        <p className="text-xs text-muted-foreground text-center">
          By proceeding, you agree to our terms and conditions. 
          Tickets are non-refundable.
        </p>
      </CardContent>
    </Card>
  );
};