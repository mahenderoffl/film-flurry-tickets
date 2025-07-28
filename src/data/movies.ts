import { Movie, Theater } from '@/types/movie';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Guardians of the Galaxy Vol. 3',
    genre: 'Action/Adventure',
    duration: 150,
    rating: 'PG-13',
    poster: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
    description: 'Peter Quill must rally his team around him to defend the universe.',
    showtimes: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM']
  },
  {
    id: '2',
    title: 'Spider-Man: Across the Spider-Verse',
    genre: 'Animation/Action',
    duration: 140,
    rating: 'PG',
    poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    description: 'Miles Morales catapults across the Multiverse to save Gwen Stacy.',
    showtimes: ['9:30 AM', '12:30 PM', '3:30 PM', '6:30 PM', '9:30 PM']
  },
  {
    id: '3',
    title: 'John Wick: Chapter 4',
    genre: 'Action/Thriller',
    duration: 169,
    rating: 'R',
    poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    description: 'John Wick uncovers a path to defeating The High Table.',
    showtimes: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM']
  },
  {
    id: '4',
    title: 'The Super Mario Bros. Movie',
    genre: 'Animation/Comedy',
    duration: 92,
    rating: 'PG',
    poster: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
    description: 'A plumber named Mario travels through an underground labyrinth.',
    showtimes: ['10:30 AM', '1:30 PM', '4:30 PM', '7:30 PM']
  },
  {
    id: '5',
    title: 'Scream VI',
    genre: 'Horror/Mystery',
    duration: 123,
    rating: 'R',
    poster: 'https://image.tmdb.org/t/p/w500/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg',
    description: 'The survivors of the Ghostface killings leave Woodsboro behind.',
    showtimes: ['2:00 PM', '5:00 PM', '8:00 PM', '11:00 PM']
  },
  {
    id: '6',
    title: 'Dungeons & Dragons: Honor Among Thieves',
    genre: 'Adventure/Fantasy',
    duration: 134,
    rating: 'PG-13',
    poster: 'https://image.tmdb.org/t/p/w500/A7AoNT06aRAc4SV89Dwxj3EYAgC.jpg',
    description: 'A charming thief and a band of unlikely adventurers undertake an epic heist.',
    showtimes: ['11:30 AM', '2:45 PM', '6:15 PM', '9:45 PM']
  }
];

export const theaters: Theater[] = [
  {
    id: '1',
    name: 'CinePlex Downtown',
    location: 'Downtown Plaza, Main Street',
    screens: [
      {
        id: 'screen1',
        name: 'Screen 1 - IMAX',
        capacity: 150,
        seatLayout: [
          {
            row: 'A',
            seats: Array.from({ length: 10 }, (_, i) => ({
              id: `A${i + 1}`,
              number: `${i + 1}`,
              type: 'regular' as const,
              status: Math.random() > 0.7 ? 'occupied' : 'available' as const,
              price: 15
            }))
          },
          {
            row: 'B',
            seats: Array.from({ length: 12 }, (_, i) => ({
              id: `B${i + 1}`,
              number: `${i + 1}`,
              type: 'regular' as const,
              status: Math.random() > 0.7 ? 'occupied' : 'available' as const,
              price: 15
            }))
          },
          {
            row: 'C',
            seats: Array.from({ length: 14 }, (_, i) => ({
              id: `C${i + 1}`,
              number: `${i + 1}`,
              type: 'premium' as const,
              status: Math.random() > 0.6 ? 'occupied' : 'available' as const,
              price: 20
            }))
          },
          {
            row: 'D',
            seats: Array.from({ length: 14 }, (_, i) => ({
              id: `D${i + 1}`,
              number: `${i + 1}`,
              type: 'premium' as const,
              status: Math.random() > 0.6 ? 'occupied' : 'available' as const,
              price: 20
            }))
          },
          {
            row: 'E',
            seats: Array.from({ length: 8 }, (_, i) => ({
              id: `E${i + 1}`,
              number: `${i + 1}`,
              type: 'vip' as const,
              status: Math.random() > 0.5 ? 'occupied' : 'available' as const,
              price: 30
            }))
          }
        ]
      }
    ]
  }
];