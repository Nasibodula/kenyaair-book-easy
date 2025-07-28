import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  Plane,
  Calendar,
  FileText,
  BarChart3
} from "lucide-react";
import Header from "@/components/Layout/Header";
import BookingForm from "@/components/Booking/BookingForm";
import BookingList from "@/components/Booking/BookingList";
import BookingInquiry from "@/components/Booking/BookingInquiry";
import { useBookingStore } from "@/hooks/useBookingStore";
import { Booking } from "@/types/booking";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const { bookings, addBooking, updateBooking, deleteBooking, getBookingByReference } = useBookingStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);

  const handleAddBooking = (bookingData: Omit<Booking, 'id' | 'bookingReference' | 'bookingDate'>) => {
    const newBooking = addBooking(bookingData);
    setShowBookingForm(false);
    toast({
      title: "Booking created successfully!",
      description: `Booking reference: ${newBooking.bookingReference}`,
    });
  };

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    setShowBookingForm(true);
  };

  const handleUpdateBooking = (bookingData: Omit<Booking, 'id' | 'bookingReference' | 'bookingDate'>) => {
    if (editingBooking) {
      updateBooking(editingBooking.id, bookingData);
      setShowBookingForm(false);
      setEditingBooking(null);
      toast({
        title: "Booking updated successfully!",
        description: "The booking has been modified.",
      });
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    deleteBooking(bookingId);
    toast({
      title: "Booking deleted",
      description: "The booking has been removed from the system.",
      variant: "destructive",
    });
  };

  const handleViewBooking = (booking: Booking) => {
    setViewingBooking(booking);
  };

  const handleCancelForm = () => {
    setShowBookingForm(false);
    setEditingBooking(null);
  };

  const getStats = () => {
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === "confirmed").length;
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    const totalPassengers = bookings.reduce((sum, booking) => sum + booking.passengers.length, 0);
    
    return { totalBookings, confirmedBookings, totalRevenue, totalPassengers };
  };

  const stats = getStats();

  if (showBookingForm) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <BookingForm
            onSubmit={editingBooking ? handleUpdateBooking : handleAddBooking}
            onCancel={handleCancelForm}
            initialData={editingBooking || undefined}
          />
        </div>
      </div>
    );
  }

  if (viewingBooking) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
            <Button variant="outline" onClick={() => setViewingBooking(null)}>
              ← Back to Dashboard
            </Button>
          </div>
          <BookingInquiry
            onLookup={(ref) => getBookingByReference(ref)}
            onEdit={handleEditBooking}
            onCancel={(booking) => {
              updateBooking(booking.id, { status: "cancelled" });
              setViewingBooking(null);
              toast({
                title: "Booking cancelled",
                description: "The booking has been cancelled successfully.",
              });
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage bookings and system operations</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant="kenya" 
              onClick={() => setShowBookingForm(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Booking</span>
            </Button>
            <Button variant="outline" onClick={() => setActiveTab("inquiry")}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-sky border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-foreground/80">Total Bookings</p>
                  <p className="text-2xl font-bold text-primary-foreground">{stats.totalBookings}</p>
                </div>
                <FileText className="h-8 w-8 text-primary-foreground/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-gold border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/80">Confirmed</p>
                  <p className="text-2xl font-bold text-foreground">{stats.confirmedBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-foreground/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">${stats.totalRevenue}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Passengers</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalPassengers}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center space-x-2">
              <Plane className="h-4 w-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="inquiry" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Inquiry</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2 hidden lg:flex">
              <BarChart3 className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setShowBookingForm(true)}
                    >
                      <Plus className="h-6 w-6" />
                      <span>Add New Booking</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setActiveTab("inquiry")}
                    >
                      <Search className="h-6 w-6" />
                      <span>Find Booking</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setActiveTab("reports")}
                    >
                      <FileText className="h-6 w-6" />
                      <span>Generate Report</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Bookings */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Bookings</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("bookings")}>
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-sky p-2 rounded-lg">
                          <Plane className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{booking.bookingReference}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.passengers[0]?.firstName} {booking.passengers[0]?.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">${booking.totalPrice}</p>
                      </div>
                    </div>
                  ))}
                  {bookings.length === 0 && (
                    <div className="text-center py-8">
                      <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No bookings yet</p>
                      <Button variant="kenya" className="mt-4" onClick={() => setShowBookingForm(true)}>
                        Create First Booking
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <BookingList
              bookings={bookings}
              onEdit={handleEditBooking}
              onDelete={handleDeleteBooking}
              onView={handleViewBooking}
            />
          </TabsContent>

          <TabsContent value="inquiry">
            <BookingInquiry
              onLookup={(ref) => getBookingByReference(ref)}
              onEdit={handleEditBooking}
              onCancel={(booking) => {
                updateBooking(booking.id, { status: "cancelled" });
                toast({
                  title: "Booking cancelled",
                  description: "The booking has been cancelled successfully.",
                });
              }}
            />
          </TabsContent>

          <TabsContent value="reports">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access detailed reports and analytics from the Reports page.
                </p>
                <Button variant="kenya" onClick={() => window.location.href = "/reports"}>
                  Go to Reports
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;