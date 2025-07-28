import { Movie } from '@/types/movie';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg hover:shadow-cinema-gold/20 transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-cinema-gold/90 text-primary-foreground">
            {movie.rating}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 text-foreground">{movie.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{movie.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{movie.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-cinema-gold" />
            <span>{movie.genre}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Showtimes Today:</p>
          <div className="flex flex-wrap gap-1">
            {movie.showtimes.slice(0, 3).map((time) => (
              <Badge key={time} variant="outline" className="text-xs">
                {time}
              </Badge>
            ))}
            {movie.showtimes.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{movie.showtimes.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="cinema" 
          className="w-full"
          onClick={() => onSelect(movie)}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};