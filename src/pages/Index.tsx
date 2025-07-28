import { useState } from 'react';
import { movies, theaters } from '@/data/movies';
import { Movie, Seat } from '@/types/movie';
import { MovieCard } from '@/components/MovieCard';
import { SeatMap } from '@/components/SeatMap';
import { BookingSummary } from '@/components/BookingSummary';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Film, Ticket } from 'lucide-react';
import heroImage from '@/assets/hero-cinema.jpg';

type BookingStep = 'movies' | 'showtimes' | 'seats' | 'confirmation';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('movies');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const { toast } = useToast();

  const theater = theaters[0]; // Using first theater for demo
  const screen = theater.screens[0]; // Using first screen for demo

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentStep('showtimes');
  };

  const handleShowtimeSelect = (showtime: string) => {
    setSelectedShowtime(showtime);
    setCurrentStep('seats');
  };

  const handleSeatSelect = (seat: Seat) => {
    if (seat.status === 'occupied') return;

    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.id === seat.id);
      if (isSelected) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        if (prev.length >= 6) {
          toast({
            title: "Maximum seats reached",
            description: "You can select up to 6 seats per booking.",
            variant: "destructive"
          });
          return prev;
        }
        return [...prev, { ...seat, status: 'selected' }];
      }
    });
  };

  const handleConfirmBooking = () => {
    toast({
      title: "Booking Confirmed! 🎬",
      description: `Your tickets for ${selectedMovie?.title} have been booked successfully.`,
    });
    setCurrentStep('confirmation');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'showtimes':
        setCurrentStep('movies');
        setSelectedMovie(null);
        break;
      case 'seats':
        setCurrentStep('showtimes');
        setSelectedShowtime('');
        setSelectedSeats([]);
        break;
      case 'confirmation':
        setCurrentStep('movies');
        setSelectedMovie(null);
        setSelectedShowtime('');
        setSelectedSeats([]);
        break;
    }
  };

  const handleStartOver = () => {
    setCurrentStep('movies');
    setSelectedMovie(null);
    setSelectedShowtime('');
    setSelectedSeats([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {currentStep === 'movies' && (
        <div className="relative h-96 overflow-hidden">
          <img
            src={heroImage}
            alt="Cinema Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold text-foreground">
                Cinema <span className="text-cinema-gold">Experience</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Book your favorite movies with the best seats in town
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      {currentStep !== 'movies' && (
        <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-cinema-gold" />
                <span className="font-medium">{selectedMovie?.title}</span>
                {selectedShowtime && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <Badge variant="outline">{selectedShowtime}</Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Movie Selection */}
        {currentStep === 'movies' && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Now Showing</h2>
              <p className="text-muted-foreground">Choose your movie for tonight</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={handleMovieSelect}
                />
              ))}
            </div>
          </div>
        )}

        {/* Showtime Selection */}
        {currentStep === 'showtimes' && selectedMovie && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Select Showtime</h2>
              <p className="text-muted-foreground">Available showtimes for today</p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedMovie.showtimes.map((showtime) => (
                    <Button
                      key={showtime}
                      variant="outline"
                      className="h-16 text-lg"
                      onClick={() => handleShowtimeSelect(showtime)}
                    >
                      {showtime}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Seat Selection */}
        {currentStep === 'seats' && selectedMovie && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Select Your Seats</h2>
                <p className="text-muted-foreground">
                  Choose your preferred seats • {selectedSeats.length} selected
                </p>
              </div>

              <Card className="p-6">
                <SeatMap
                  seatLayout={screen.seatLayout}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSeatSelect}
                />
              </Card>
            </div>

            <div>
              <BookingSummary
                movie={selectedMovie}
                selectedSeats={selectedSeats}
                showtime={selectedShowtime}
                onConfirmBooking={handleConfirmBooking}
                onCancel={handleBack}
              />
            </div>
          </div>
        )}

        {/* Confirmation */}
        {currentStep === 'confirmation' && selectedMovie && (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-cinema-gold rounded-full flex items-center justify-center mx-auto">
                <Ticket className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-cinema-gold">Booking Confirmed!</h2>
              <p className="text-muted-foreground">
                Your tickets have been successfully booked. Check your email for the confirmation details.
              </p>
            </div>

            <Card className="p-6 text-left">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Booking Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Movie:</span>
                    <span className="font-medium">{selectedMovie.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Showtime:</span>
                    <span className="font-medium">{selectedShowtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seats:</span>
                    <span className="font-medium">
                      {selectedSeats.map(seat => seat.id).join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Theater:</span>
                    <span className="font-medium">{theater.name}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Button variant="cinema" onClick={handleStartOver}>
              Book Another Movie
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;