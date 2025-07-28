export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: number;
  rating: string;
  poster: string;
  description: string;
  showtimes: string[];
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  screens: Screen[];
}

export interface Screen {
  id: string;
  name: string;
  capacity: number;
  seatLayout: SeatRow[];
}

export interface SeatRow {
  row: string;
  seats: Seat[];
}

export interface Seat {
  id: string;
  number: string;
  type: 'regular' | 'vip' | 'premium';
  status: 'available' | 'selected' | 'occupied';
  price: number;
}

export interface Booking {
  id: string;
  movieId: string;
  screenId: string;
  showtime: string;
  seats: Seat[];
  totalAmount: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  bookingDate: Date;
  status: 'confirmed' | 'cancelled';
}