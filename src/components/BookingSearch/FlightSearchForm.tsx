import { useState } from "react";
import { Calendar, MapPin, Plane, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FlightSearchFormProps {
  onSearch: (searchData: any) => void;
}

const FlightSearchForm = ({ onSearch }: FlightSearchFormProps) => {
  const [tripType, setTripType] = useState("round-trip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [classType, setClassType] = useState("middle");

  const handleSearch = () => {
    onSearch({
      tripType,
      from,
      to,
      departDate,
      returnDate,
      passengers,
      classType
    });
  };

  const kenyanCities = [
    "Nairobi (NBO)",
    "Mombasa (MBA)",
    "Kisumu (KIS)",
    "Eldoret (EDL)",
    "Malindi (MYD)"
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-elegant bg-card/95 backdrop-blur border-border">
      <CardContent className="p-6">
        {/* Trip Type Selector */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={tripType === "round-trip" ? "kenya" : "outline"}
            onClick={() => setTripType("round-trip")}
            className="flex-1"
          >
            Round Trip
          </Button>
          <Button
            variant={tripType === "one-way" ? "kenya" : "outline"}
            onClick={() => setTripType("one-way")}
            className="flex-1"
          >
            One Way
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* From */}
          <div className="space-y-2">
            <Label htmlFor="from" className="text-sm font-medium text-foreground flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>From</span>
            </Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="bg-input border-border hover:bg-accent transition-colors">
                <SelectValue placeholder="Departure city" />
              </SelectTrigger>
              <SelectContent className="bg-card shadow-card border-border">
                {kenyanCities.map((city) => (
                  <SelectItem key={city} value={city} className="hover:bg-accent">
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* To */}
          <div className="space-y-2">
            <Label htmlFor="to" className="text-sm font-medium text-foreground flex items-center space-x-1">
              <Plane className="h-4 w-4" />
              <span>To</span>
            </Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="bg-input border-border hover:bg-accent transition-colors">
                <SelectValue placeholder="Destination city" />
              </SelectTrigger>
              <SelectContent className="bg-card shadow-card border-border">
                {kenyanCities.map((city) => (
                  <SelectItem key={city} value={city} className="hover:bg-accent">
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Departure Date */}
          <div className="space-y-2">
            <Label htmlFor="depart" className="text-sm font-medium text-foreground flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Departure</span>
            </Label>
            <Input
              id="depart"
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="bg-input border-border hover:bg-accent transition-colors"
            />
          </div>

          {/* Return Date */}
          {tripType === "round-trip" && (
            <div className="space-y-2">
              <Label htmlFor="return" className="text-sm font-medium text-foreground flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Return</span>
              </Label>
              <Input
                id="return"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="bg-input border-border hover:bg-accent transition-colors"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Passengers */}
          <div className="space-y-2">
            <Label htmlFor="passengers" className="text-sm font-medium text-foreground flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>Passengers</span>
            </Label>
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger className="bg-input border-border hover:bg-accent transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card shadow-card border-border">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <SelectItem key={num} value={num.toString()} className="hover:bg-accent">
                    {num} {num === 1 ? "Passenger" : "Passengers"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Class */}
          <div className="space-y-2">
            <Label htmlFor="class" className="text-sm font-medium text-foreground">
              Class
            </Label>
            <Select value={classType} onValueChange={setClassType}>
              <SelectTrigger className="bg-input border-border hover:bg-accent transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card shadow-card border-border">
                <SelectItem value="executive" className="hover:bg-accent">
                  <div className="flex flex-col">
                    <span className="font-medium">Executive (Class A)</span>
                    <span className="text-xs text-muted-foreground">Premium experience</span>
                  </div>
                </SelectItem>
                <SelectItem value="middle" className="hover:bg-accent">
                  <div className="flex flex-col">
                    <span className="font-medium">Middle Class (Class B)</span>
                    <span className="text-xs text-muted-foreground">Comfort & value</span>
                  </div>
                </SelectItem>
                <SelectItem value="low" className="hover:bg-accent">
                  <div className="flex flex-col">
                    <span className="font-medium">Economy (Class C)</span>
                    <span className="text-xs text-muted-foreground">Budget friendly</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-transparent">Search</Label>
            <Button 
              onClick={handleSearch}
              variant="kenya" 
              size="lg" 
              className="w-full"
              disabled={!from || !to || !departDate}
            >
              Search Flights
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightSearchForm;