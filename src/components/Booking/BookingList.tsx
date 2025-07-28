import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, Search, Edit, Trash2, Eye, Calendar, Users } from "lucide-react";
import { Booking } from "@/types/booking";

interface BookingListProps {
  bookings: Booking[];
  onEdit: (booking: Booking) => void;
  onDelete: (bookingId: string) => void;
  onView: (booking: Booking) => void;
}

const BookingList = ({ bookings, onEdit, onDelete, onView }: BookingListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.bookingReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.passengers.some(p => 
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesClass = classFilter === "all" || booking.class === classFilter;

    return matchesSearch && matchesStatus && matchesClass;
  });

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
        return { name: "Executive", color: "text-kenya-gold" };
      case "middle":
        return { name: "Middle Class", color: "text-kenya-blue" };
      case "low":
        return { name: "Economy", color: "text-muted-foreground" };
      default:
        return { name: "Unknown", color: "text-muted-foreground" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search & Filter Bookings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by booking reference, flight number, or passenger name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-input"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-input">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="bg-input">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
                <SelectItem value="middle">Middle Class</SelectItem>
                <SelectItem value="low">Economy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </p>
      </div>

      {/* Booking Cards */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No bookings found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" || classFilter !== "all" 
                  ? "Try adjusting your search criteria" 
                  : "No bookings have been made yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => {
            const classInfo = getClassInfo(booking.class);
            return (
              <Card key={booking.id} className="bg-card border-border hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    {/* Booking Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="bg-gradient-sky p-2 rounded-lg">
                            <Plane className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{booking.bookingReference}</h3>
                            <p className="text-sm text-muted-foreground">{booking.flightNumber}</p>
                          </div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{booking.departDate}</p>
                            <p className="text-xs text-muted-foreground">{booking.departTime} - {booking.arriveTime}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{booking.from}</p>
                          <p className="text-xs text-muted-foreground">to {booking.to}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {booking.passengers.length} passenger{booking.passengers.length > 1 ? 's' : ''}
                            </p>
                            <p className={`text-xs font-medium ${classInfo.color}`}>
                              {classInfo.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Passengers: {booking.passengers.map(p => `${p.firstName} ${p.lastName}`).join(", ")}
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="text-center lg:text-right">
                      <div className="mb-4">
                        <p className="text-2xl font-bold text-foreground">${booking.totalPrice}</p>
                        <p className="text-xs text-muted-foreground">Total</p>
                      </div>
                      
                      <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onView(booking)}
                          className="flex items-center space-x-1"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(booking)}
                          className="flex items-center space-x-1"
                        >
                          <Edit className="h-3 w-3" />
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(booking.id)}
                          className="flex items-center space-x-1 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BookingList;