import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  Users, 
  Plane, 
  TrendingUp,
  BarChart3,
  PieChart,
  Printer
} from "lucide-react";
import Header from "@/components/Layout/Header";
import { useBookingStore } from "@/hooks/useBookingStore";

const ReportsPage = () => {
  const { bookings } = useBookingStore();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [reportType, setReportType] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.bookingDate);
    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo) : null;
    
    const dateMatch = (!fromDate || bookingDate >= fromDate) && 
                     (!toDate || bookingDate <= toDate);
    const typeMatch = reportType === "all" || booking.status === reportType;
    const classMatch = classFilter === "all" || booking.class === classFilter;
    
    return dateMatch && typeMatch && classMatch;
  });

  const generateTicketReport = () => {
    const reportData = filteredBookings.map(booking => ({
      reference: booking.bookingReference,
      flight: booking.flightNumber,
      route: `${booking.from} → ${booking.to}`,
      date: booking.departDate,
      passengers: booking.passengers.length,
      class: booking.class,
      total: booking.totalPrice,
      status: booking.status
    }));

    // In a real application, this would generate a PDF or Excel file
    const reportContent = `
KENYA AIRWAYS - TICKET REPORT
Generated: ${new Date().toLocaleString()}
Period: ${dateFrom || 'All'} to ${dateTo || 'All'}
Total Bookings: ${reportData.length}

${reportData.map(booking => `
Booking: ${booking.reference}
Flight: ${booking.flight}
Route: ${booking.route}
Date: ${booking.date}
Passengers: ${booking.passengers}
Class: ${booking.class.toUpperCase()}
Amount: $${booking.total}
Status: ${booking.status.toUpperCase()}
---
`).join('')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateSuccessfulMatchesReport = () => {
    const successfulBookings = filteredBookings.filter(booking => 
      booking.status === "confirmed" || booking.status === "completed"
    );

    const reportContent = `
KENYA AIRWAYS - SUCCESSFUL BOOKINGS REPORT
Generated: ${new Date().toLocaleString()}
Period: ${dateFrom || 'All'} to ${dateTo || 'All'}
Total Successful Bookings: ${successfulBookings.length}
Total Revenue: $${successfulBookings.reduce((sum, booking) => sum + booking.totalPrice, 0)}

${successfulBookings.map(booking => `
Reference: ${booking.bookingReference}
Flight: ${booking.flightNumber}
Passenger(s): ${booking.passengers.map(p => `${p.firstName} ${p.lastName}`).join(', ')}
Route: ${booking.from} → ${booking.to}
Date: ${booking.departDate}
Class: ${booking.class.toUpperCase()}
Amount: $${booking.totalPrice}
Booking Date: ${booking.bookingDate}
---
`).join('')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `successful-bookings-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    const printContent = `
    <html>
      <head>
        <title>Kenya Airways Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .booking { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; }
          .summary { background-color: #f5f5f5; padding: 15px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Kenya Airways - Booking Report</h1>
          <p>Generated: ${new Date().toLocaleString()}</p>
          <p>Period: ${dateFrom || 'All'} to ${dateTo || 'All'}</p>
        </div>
        
        <div class="summary">
          <h3>Summary</h3>
          <p>Total Bookings: ${filteredBookings.length}</p>
          <p>Total Revenue: $${filteredBookings.reduce((sum, booking) => sum + booking.totalPrice, 0)}</p>
        </div>
        
        ${filteredBookings.map(booking => `
          <div class="booking">
            <h4>Booking: ${booking.bookingReference}</h4>
            <p><strong>Flight:</strong> ${booking.flightNumber}</p>
            <p><strong>Route:</strong> ${booking.from} → ${booking.to}</p>
            <p><strong>Date:</strong> ${booking.departDate}</p>
            <p><strong>Passengers:</strong> ${booking.passengers.map(p => `${p.firstName} ${p.lastName}`).join(', ')}</p>
            <p><strong>Class:</strong> ${booking.class.toUpperCase()}</p>
            <p><strong>Amount:</strong> $${booking.totalPrice}</p>
            <p><strong>Status:</strong> ${booking.status.toUpperCase()}</p>
          </div>
        `).join('')}
      </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getClassStats = () => {
    const stats = {
      executive: filteredBookings.filter(b => b.class === "executive").length,
      middle: filteredBookings.filter(b => b.class === "middle").length,
      low: filteredBookings.filter(b => b.class === "low").length,
    };
    return stats;
  };

  const getStatusStats = () => {
    const stats = {
      confirmed: filteredBookings.filter(b => b.status === "confirmed").length,
      pending: filteredBookings.filter(b => b.status === "pending").length,
      cancelled: filteredBookings.filter(b => b.status === "cancelled").length,
      completed: filteredBookings.filter(b => b.status === "completed").length,
    };
    return stats;
  };

  const totalRevenue = filteredBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const totalPassengers = filteredBookings.reduce((sum, booking) => sum + booking.passengers.length, 0);
  const classStats = getClassStats();
  const statusStats = getStatusStats();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-sky p-3 rounded-full mb-4">
            <BarChart3 className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Reports & Analytics
          </h1>
          <p className="text-lg text-muted-foreground">
            Generate detailed reports and view booking analytics
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Report Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="dateFrom">From Date</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-input"
                />
              </div>
              <div>
                <Label htmlFor="dateTo">To Date</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-input"
                />
              </div>
              <div>
                <Label htmlFor="reportType">Status</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="bg-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="classFilter">Class</Label>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="bg-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                    <SelectItem value="middle">Middle Class</SelectItem>
                    <SelectItem value="low">Economy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-sky border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-foreground/80">Total Bookings</p>
                  <p className="text-2xl font-bold text-primary-foreground">{filteredBookings.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary-foreground/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-gold border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/80">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">${totalRevenue}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-foreground/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Passengers</p>
                  <p className="text-2xl font-bold text-foreground">{totalPassengers}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-foreground">
                    {filteredBookings.length > 0 
                      ? Math.round(((statusStats.confirmed + statusStats.completed) / filteredBookings.length) * 100)
                      : 0}%
                  </p>
                </div>
                <PieChart className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-border hover:shadow-card transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Ticket Report</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Generate detailed report of all tickets including passenger information, flight details, and booking status.
              </p>
              <Button onClick={generateTicketReport} variant="kenya" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Ticket Report
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:shadow-card transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Successful Bookings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Report of all confirmed and completed bookings with revenue details and passenger matching.
              </p>
              <Button onClick={generateSuccessfulMatchesReport} variant="kenya" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Success Report
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:shadow-card transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Printer className="h-5 w-5" />
                <span>Print Report</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Print a formatted report with current filter settings for physical records.
              </p>
              <Button onClick={printReport} variant="outline" className="w-full">
                <Printer className="h-4 w-4 mr-2" />
                Print Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Class Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Bookings by Class</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-kenya-gold rounded-full"></div>
                    <span className="text-sm text-foreground">Executive</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{classStats.executive}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {filteredBookings.length > 0 ? Math.round((classStats.executive / filteredBookings.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-kenya-blue rounded-full"></div>
                    <span className="text-sm text-foreground">Middle Class</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{classStats.middle}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {filteredBookings.length > 0 ? Math.round((classStats.middle / filteredBookings.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                    <span className="text-sm text-foreground">Economy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{classStats.low}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {filteredBookings.length > 0 ? Math.round((classStats.low / filteredBookings.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Bookings by Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Confirmed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">{statusStats.confirmed}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {filteredBookings.length > 0 ? Math.round((statusStats.confirmed / filteredBookings.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Pending</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{statusStats.pending}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {filteredBookings.length > 0 ? Math.round((statusStats.pending / filteredBookings.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Cancelled</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive">{statusStats.cancelled}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {filteredBookings.length > 0 ? Math.round((statusStats.cancelled / filteredBookings.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{statusStats.completed}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {filteredBookings.length > 0 ? Math.round((statusStats.completed / filteredBookings.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;