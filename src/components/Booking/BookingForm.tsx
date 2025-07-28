import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, User } from "lucide-react";
import { Passenger, Booking } from "@/types/booking";
import { useToast } from "@/hooks/use-toast";

interface BookingFormProps {
  onSubmit: (booking: Omit<Booking, 'id' | 'bookingReference' | 'bookingDate'>) => void;
  onCancel: () => void;
  initialData?: Booking;
  flightData?: any;
}

const BookingForm = ({ onSubmit, onCancel, initialData, flightData }: BookingFormProps) => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [passengers, setPassengers] = useState<Passenger[]>(
    initialData?.passengers || [
      {
        id: Date.now().toString(),
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nationality: "Kenyan",
        dateOfBirth: "",
        gender: "male"
      }
    ]
  );

  const addPassenger = () => {
    const newPassenger: Passenger = {
      id: Date.now().toString(),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      nationality: "Kenyan",
      dateOfBirth: "",
      gender: "male"
    };
    setPassengers([...passengers, newPassenger]);
  };

  const removePassenger = (id: string) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter(p => p.id !== id));
    }
  };

  const updatePassenger = (id: string, field: keyof Passenger, value: string) => {
    setPassengers(passengers.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleFormSubmit = (data: any) => {
    // Validate all passengers have required fields
    const incompletePassengers = passengers.filter(p => 
      !p.firstName || !p.lastName || !p.email || !p.phone || !p.dateOfBirth
    );

    if (incompletePassengers.length > 0) {
      toast({
        title: "Incomplete passenger information",
        description: "Please fill in all required passenger details.",
        variant: "destructive",
      });
      return;
    }

    const bookingData: Omit<Booking, 'id' | 'bookingReference' | 'bookingDate'> = {
      flightId: flightData?.id || initialData?.flightId || "1",
      flightNumber: flightData?.flightNumber || initialData?.flightNumber || "KQ101",
      from: flightData?.from || initialData?.from || "Nairobi (NBO)",
      to: flightData?.to || initialData?.to || "Mombasa (MBA)",
      departDate: data.departDate || initialData?.departDate,
      departTime: flightData?.departTime || initialData?.departTime || "08:00",
      arriveTime: flightData?.arriveTime || initialData?.arriveTime || "09:15",
      class: data.class || initialData?.class || "middle",
      passengers: passengers,
      totalPrice: (flightData?.price || 180) * passengers.length,
      status: "confirmed",
      seatNumbers: passengers.map((_, index) => `${index + 1}A`)
    };

    onSubmit(bookingData);
    toast({
      title: "Booking submitted successfully!",
      description: "Your flight booking has been processed.",
    });
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-elegant">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center space-x-2">
          <User className="h-6 w-6" />
          <span>{initialData ? "Edit Booking" : "Complete Your Booking"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Flight Information */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">Flight Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="departDate">Departure Date</Label>
                <Input
                  id="departDate"
                  type="date"
                  defaultValue={initialData?.departDate}
                  {...register("departDate", { required: "Departure date is required" })}
                  className="bg-background"
                />
                {errors.departDate && (
                  <p className="text-sm text-destructive mt-1">{errors.departDate.message as string}</p>
                )}
              </div>
              <div>
                <Label htmlFor="class">Travel Class</Label>
                <Select defaultValue={initialData?.class || "middle"} {...register("class")}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive">Executive (Class A) - $250</SelectItem>
                    <SelectItem value="middle">Middle Class (Class B) - $180</SelectItem>
                    <SelectItem value="low">Economy (Class C) - $120</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <div className="text-sm text-muted-foreground">
                  Total: ${((flightData?.price || 180) * passengers.length).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Information */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Passenger Information</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPassenger}
                className="flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add Passenger</span>
              </Button>
            </div>

            <div className="space-y-4">
              {passengers.map((passenger, index) => (
                <Card key={passenger.id} className="bg-background border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Passenger {index + 1}</CardTitle>
                      {passengers.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePassenger(passenger.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>First Name *</Label>
                        <Input
                          value={passenger.firstName}
                          onChange={(e) => updatePassenger(passenger.id, 'firstName', e.target.value)}
                          placeholder="Enter first name"
                          className="bg-input"
                        />
                      </div>
                      <div>
                        <Label>Last Name *</Label>
                        <Input
                          value={passenger.lastName}
                          onChange={(e) => updatePassenger(passenger.id, 'lastName', e.target.value)}
                          placeholder="Enter last name"
                          className="bg-input"
                        />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={passenger.email}
                          onChange={(e) => updatePassenger(passenger.id, 'email', e.target.value)}
                          placeholder="Enter email address"
                          className="bg-input"
                        />
                      </div>
                      <div>
                        <Label>Phone Number *</Label>
                        <Input
                          value={passenger.phone}
                          onChange={(e) => updatePassenger(passenger.id, 'phone', e.target.value)}
                          placeholder="+254712345678"
                          className="bg-input"
                        />
                      </div>
                      <div>
                        <Label>Date of Birth *</Label>
                        <Input
                          type="date"
                          value={passenger.dateOfBirth}
                          onChange={(e) => updatePassenger(passenger.id, 'dateOfBirth', e.target.value)}
                          className="bg-input"
                        />
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <Select 
                          value={passenger.gender} 
                          onValueChange={(value) => updatePassenger(passenger.id, 'gender', value)}
                        >
                          <SelectTrigger className="bg-input">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Nationality</Label>
                        <Input
                          value={passenger.nationality}
                          onChange={(e) => updatePassenger(passenger.id, 'nationality', e.target.value)}
                          placeholder="Nationality"
                          className="bg-input"
                        />
                      </div>
                      <div>
                        <Label>Passport Number</Label>
                        <Input
                          value={passenger.passportNumber || ""}
                          onChange={(e) => updatePassenger(passenger.id, 'passportNumber', e.target.value)}
                          placeholder="Optional for domestic flights"
                          className="bg-input"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="kenya" size="lg">
              {initialData ? "Update Booking" : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;