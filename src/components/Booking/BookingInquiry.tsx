import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Plane, Calendar, Users, MapPin, Clock } from "lucide-react";
import { Booking } from "@/types/booking";
import { useToast } from "@/hooks/use-toast";

interface BookingInquiryProps {
  onLookup: (reference: string) => Booking | undefined;
  onEdit?: (booking: Booking) => void;
  onCancel?: (booking: Booking) => void;
}

const BookingInquiry = ({ onLookup, onEdit, onCancel }: BookingInquiryProps) => {
  const { toast } = useToast();
  const [searchReference, setSearchReference] = useState("");
  const [foundBooking, setFoundBooking] = useState<Booking | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchReference.trim()) {
      toast({
        title: "Please enter a booking reference",
        description: "Booking reference is required to search.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const booking = onLookup(searchReference.trim());
      setFoundBooking(booking || null);
      setIsSearching(false);
      
      if (!booking) {
        toast({
          title: "Booking not found",
          description: "No booking found with the provided reference number.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Booking found successfully",
          description: `Found booking for ${booking.passengers[0]?.firstName} ${booking.passengers[0]?.lastName}`,
        });
      }
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      confirmed: "default",
      pending: "secondary",
      cancelled: "destructive",
      completed: "outline"
    };
    return <Badge variant={variants[status] || "outline"}>{status.toUpperCase()}</Badge>;
  };

  const getClassInfo = (classType: string) => {
    switch (classType) {
      case "executive":
        return { name: "Executive (Class A)", color: "text-kenya-gold", icon: "✈️" };
      case "middle":
        return { name: "Middle Class (Class B)", color: "text-kenya-blue", icon: "🛫" };
      case "low":
        return { name: "Economy (Class C)", color: "text-muted-foreground", icon: "✈️" };
      default:
        return { name: "Unknown", color: "text-muted-foreground", icon: "❓" };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Section */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Booking Inquiry</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your booking reference number to view, modify, or cancel your reservation.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="booking-ref" className="text-sm font-medium text-foreground">
                Booking Reference Number
              </Label>
              <Input
                id="booking-ref"
                value={searchReference}
                onChange={(e) => setSearchReference(e.target.value.toUpperCase())}
                placeholder="e.g., KQ-2024-001"
                className="mt-1 bg-input"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Format: KQ-YYYY-XXX (e.g., KQ-2024-001)
              </p>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                variant="kenya"
                size="lg"
                disabled={isSearching}
                className="flex items-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>{isSearching ? "Searching..." : "Search"}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      {foundBooking && (
        <Card className="bg-card border-border shadow-elegant animate-slide-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-foreground flex items-center space-x-2">
                <Plane className="h-5 w-5" />
                <span>Booking Details</span>
              </CardTitle>
              {getStatusBadge(foundBooking.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Flight Information */}
            <div className="bg-gradient-to-r from-muted/30 to-transparent rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Plane className="h-4 w-4" />
                <span>Flight Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-card rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Flight</p>
                    <p className="font-bold text-foreground">{foundBooking.flightNumber}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-card rounded-lg p-3">
                    <p className="text-sm text-muted-foreground flex items-center justify-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Date</span>
                    </p>
                    <p className="font-bold text-foreground">{foundBooking.departDate}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-card rounded-lg p-3">
                    <p className="text-sm text-muted-foreground flex items-center justify-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Time</span>
                    </p>
                    <p className="font-bold text-foreground">{foundBooking.departTime} - {foundBooking.arriveTime}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-card rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Class</p>
                    <p className={`font-bold ${getClassInfo(foundBooking.class).color}`}>
                      {getClassInfo(foundBooking.class).name}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-4 text-lg">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{foundBooking.from}</span>
                  </div>
                  <div className="text-muted-foreground">→</div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{foundBooking.to}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Passenger Information */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Passenger Information</span>
              </h3>
              <div className="space-y-3">
                {foundBooking.passengers.map((passenger, index) => (
                  <div key={passenger.id} className="bg-muted/30 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium text-foreground">
                          {passenger.firstName} {passenger.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contact</p>
                        <p className="text-sm text-foreground">{passenger.email}</p>
                        <p className="text-sm text-foreground">{passenger.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Seat</p>
                        <p className="font-medium text-foreground">
                          {foundBooking.seatNumbers[index] || `${index + 1}A`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Booking Summary */}
            <div className="bg-gradient-to-r from-kenya-sky/20 to-transparent rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold text-foreground">${foundBooking.totalPrice}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Booking Date</p>
                  <p className="font-medium text-foreground">{foundBooking.bookingDate}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              {foundBooking.status !== "cancelled" && onEdit && (
                <Button
                  variant="kenya"
                  onClick={() => onEdit(foundBooking)}
                  className="flex items-center space-x-2"
                >
                  <span>Modify Booking</span>
                </Button>
              )}
              
              {foundBooking.status === "confirmed" && onCancel && (
                <Button
                  variant="outline"
                  onClick={() => onCancel(foundBooking)}
                  className="flex items-center space-x-2 text-destructive hover:text-destructive"
                >
                  <span>Cancel Booking</span>
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="flex items-center space-x-2"
              >
                <span>Print Ticket</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingInquiry;