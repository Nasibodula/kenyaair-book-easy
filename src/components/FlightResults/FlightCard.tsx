import { Clock, Users, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FlightCardProps {
  flight: {
    id: string;
    airline: string;
    flightNumber: string;
    from: string;
    to: string;
    departTime: string;
    arriveTime: string;
    duration: string;
    price: number;
    class: "executive" | "middle" | "low";
    seatsAvailable: number;
    totalSeats: number;
  };
  onSelect: (flightId: string) => void;
}

const FlightCard = ({ flight, onSelect }: FlightCardProps) => {
  const getClassInfo = (classType: string) => {
    switch (classType) {
      case "executive":
        return { name: "Executive (Class A)", color: "bg-kenya-gold text-foreground" };
      case "middle":
        return { name: "Middle Class (Class B)", color: "bg-kenya-blue text-primary-foreground" };
      case "low":
        return { name: "Economy (Class C)", color: "bg-muted text-muted-foreground" };
      default:
        return { name: "Unknown", color: "bg-muted text-muted-foreground" };
    }
  };

  const classInfo = getClassInfo(flight.class);
  const seatPercentage = (flight.seatsAvailable / flight.totalSeats) * 100;
  const isLowSeats = seatPercentage < 20;

  return (
    <Card className="hover:shadow-elegant transition-all duration-300 bg-card border-border">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          {/* Flight Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-sky p-2 rounded-lg">
                  <Plane className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{flight.airline}</h3>
                  <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
                </div>
              </div>
              <Badge className={classInfo.color}>
                {classInfo.name}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              {/* Departure */}
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{flight.departTime}</p>
                <p className="text-sm text-muted-foreground">{flight.from}</p>
              </div>

              {/* Duration */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="h-px bg-border flex-1"></div>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div className="h-px bg-border flex-1"></div>
                </div>
                <p className="text-sm text-muted-foreground">{flight.duration}</p>
              </div>

              {/* Arrival */}
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{flight.arriveTime}</p>
                <p className="text-sm text-muted-foreground">{flight.to}</p>
              </div>
            </div>

            {/* Seat Availability */}
            <div className="mt-4 flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {flight.seatsAvailable} of {flight.totalSeats} seats available
              </span>
              {isLowSeats && (
                <Badge variant="destructive" className="text-xs">
                  Limited seats
                </Badge>
              )}
            </div>
          </div>

          {/* Price and Action */}
          <div className="text-center md:text-right">
            <div className="mb-4">
              <p className="text-3xl font-bold text-foreground">
                ${flight.price}
              </p>
              <p className="text-sm text-muted-foreground">per person</p>
            </div>
            
            {flight.seatsAvailable > 0 ? (
              <Button 
                variant="kenya" 
                size="lg"
                onClick={() => onSelect(flight.id)}
                className="w-full md:w-auto"
              >
                Select Flight
              </Button>
            ) : (
              <div className="text-center">
                <Badge variant="destructive" className="mb-2">
                  Fully Booked
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Check next available date
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;