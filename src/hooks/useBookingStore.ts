import { useState } from 'react';
import { Booking, Passenger } from '@/types/booking';

// Mock data store - in a real app this would connect to a database
const mockBookings: Booking[] = [
  {
    id: "1",
    bookingReference: "KQ-2024-001",
    flightId: "1",
    flightNumber: "KQ101",
    from: "Nairobi (NBO)",
    to: "Mombasa (MBA)",
    departDate: "2024-02-15",
    departTime: "08:00",
    arriveTime: "09:15",
    class: "executive",
    passengers: [
      {
        id: "p1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        phone: "+254712345678",
        passportNumber: "A1234567",
        nationality: "Kenyan",
        dateOfBirth: "1985-05-15",
        gender: "male"
      }
    ],
    totalPrice: 250,
    status: "confirmed",
    bookingDate: "2024-01-20",
    seatNumbers: ["1A"]
  },
  {
    id: "2",
    bookingReference: "KQ-2024-002",
    flightId: "2",
    flightNumber: "KQ102",
    from: "Nairobi (NBO)",
    to: "Kisumu (KIS)",
    departDate: "2024-02-20",
    departTime: "14:30",
    arriveTime: "15:45",
    class: "middle",
    passengers: [
      {
        id: "p2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@email.com",
        phone: "+254712345679",
        nationality: "Kenyan",
        dateOfBirth: "1990-08-22",
        gender: "female"
      }
    ],
    totalPrice: 180,
    status: "pending",
    bookingDate: "2024-01-22",
    seatNumbers: ["15B"]
  }
];

export const useBookingStore = () => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const addBooking = (booking: Omit<Booking, 'id' | 'bookingReference' | 'bookingDate'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      bookingReference: `KQ-2024-${String(bookings.length + 1).padStart(3, '0')}`,
      bookingDate: new Date().toISOString().split('T')[0],
    };
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, ...updates } : booking
    ));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const getBookingByReference = (reference: string) => {
    return bookings.find(booking => booking.bookingReference === reference);
  };

  const getBookingById = (id: string) => {
    return bookings.find(booking => booking.id === id);
  };

  return {
    bookings,
    addBooking,
    updateBooking,
    deleteBooking,
    getBookingByReference,
    getBookingById,
  };
};