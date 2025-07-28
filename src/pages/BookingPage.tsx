import { useState } from "react";
import Header from "@/components/Layout/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import FlightSearchForm from "@/components/BookingSearch/FlightSearchForm";
import FlightCard from "@/components/FlightResults/FlightCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Info } from "lucide-react";

// Mock flight data
const mockFlights = [
  {
    id: "1",
    airline: "Kenya Airways",
    flightNumber: "KQ101",
    from: "Nairobi (NBO)",
    to: "Mombasa (MBA)",
    departTime: "08:00",
    arriveTime: "09:15",
    duration: "1h 15m",
    price: 250,
    class: "executive" as const,
    seatsAvailable: 8,
    totalSeats: 20,
  },
  {
    id: "2",
    airline: "Kenya Airways",
    flightNumber: "KQ102",
    from: "Nairobi (NBO)",
    to: "Mombasa (MBA)",
    departTime: "14:30",
    arriveTime: "15:45",
    duration: "1h 15m",
    price: 180,
    class: "middle" as const,
    seatsAvailable: 15,
    totalSeats: 50,
  },
  {
    id: "3",
    airline: "Kenya Airways",
    flightNumber: "KQ103",
    from: "Nairobi (NBO)",
    to: "Mombasa (MBA)",
    departTime: "18:00",
    arriveTime: "19:15",
    duration: "1h 15m",
    price: 120,
    class: "low" as const,
    seatsAvailable: 0,
    totalSeats: 100,
  },
  {
    id: "4",
    airline: "Kenya Airways",
    flightNumber: "KQ104",
    from: "Nairobi (NBO)",
    to: "Mombasa (MBA)",
    departTime: "20:30",
    arriveTime: "21:45",
    duration: "1h 15m",
    price: 130,
    class: "low" as const,
    seatsAvailable: 25,
    totalSeats: 100,
  },
];

const BookingPage = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchData, setSearchData] = useState<any>(null);

  const handleSearch = (data: any) => {
    setSearchData(data);
    // Filter flights based on search criteria
    const filteredFlights = mockFlights.filter(flight => {
      if (data.classType === "executive") return flight.class === "executive";
      if (data.classType === "middle") return flight.class === "middle";
      if (data.classType === "low") return flight.class === "low";
      return true;
    });
    setSearchResults(filteredFlights);
    setShowResults(true);
  };

  const handleSelectFlight = (flightId: string) => {
    // Here you would navigate to booking details page
    console.log("Selected flight:", flightId);
  };

  const getAlternativeDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toLocaleDateString());
    }
    return dates;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Search Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <FlightSearchForm onSearch={handleSearch} />
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Available Flights
              </h2>
              <Badge variant="outline" className="bg-card">
                {searchResults.length} flights found
              </Badge>
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onSelect={handleSelectFlight}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No flights available for your selected date
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try searching for alternative dates or different class options.
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-foreground mb-3 flex items-center justify-center space-x-2">
                      <Info className="h-4 w-4" />
                      <span>Alternative Dates Available</span>
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {getAlternativeDates().map((date, index) => (
                        <Button key={index} variant="outline" size="sm" className="bg-card hover:bg-accent">
                          {date}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="kenya" onClick={() => setShowResults(false)}>
                    Search Again
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Flight Class Information */}
        {!showResults && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Choose Your Travel Class
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-gold hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center space-x-2">
                    <div className="w-3 h-3 bg-kenya-gold rounded-full"></div>
                    <span>Executive Class (Class A)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li>• Premium seat comfort</li>
                    <li>• Priority boarding</li>
                    <li>• Complimentary meals</li>
                    <li>• Extra baggage allowance</li>
                    <li>• Business lounge access</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-sky hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary-foreground flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                    <span>Middle Class (Class B)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-primary-foreground/80">
                    <li>• Comfortable seating</li>
                    <li>• In-flight entertainment</li>
                    <li>• Meal service</li>
                    <li>• Standard baggage</li>
                    <li>• Great value for money</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card hover:shadow-elegant transition-all duration-300 border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center space-x-2">
                    <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                    <span>Economy Class (Class C)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Budget-friendly option</li>
                    <li>• Basic comfort</li>
                    <li>• Snack service</li>
                    <li>• Carry-on baggage</li>
                    <li>• Reliable transportation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;