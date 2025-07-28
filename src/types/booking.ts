export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passportNumber?: string;
  nationality: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
}

export interface Booking {
  id: string;
  bookingReference: string;
  flightId: string;
  flightNumber: string;
  from: string;
  to: string;
  departDate: string;
  departTime: string;
  arriveTime: string;
  class: "executive" | "middle" | "low";
  passengers: Passenger[];
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  bookingDate: string;
  seatNumbers: string[];
}

export interface FlightSearchData {
  tripType: string;
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: string;
  classType: string;
}