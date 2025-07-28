import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  Plane, 
  Search, 
  CreditCard, 
  Users, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  AlertCircle
} from "lucide-react";
import Header from "@/components/Layout/Header";

const HelpPage = () => {
  const helpTopics = [
    {
      category: "Booking Flights",
      icon: <Plane className="h-5 w-5" />,
      questions: [
        {
          question: "How do I book a flight online?",
          answer: "To book a flight: 1) Enter your departure and destination cities, 2) Select travel dates, 3) Choose number of passengers and class, 4) Click 'Search Flights', 5) Select your preferred flight, 6) Fill in passenger details, 7) Complete payment."
        },
        {
          question: "What are the different travel classes?",
          answer: "We offer three classes: Executive (Class A) - Premium experience with business lounge access, priority boarding, and enhanced meals. Middle Class (Class B) - Comfortable seating with good value for money. Economy (Class C) - Budget-friendly option with essential services."
        },
        {
          question: "Can I book for multiple passengers?",
          answer: "Yes, you can book for up to 9 passengers in a single booking. Simply select the number of passengers during your search and fill in details for each passenger during the booking process."
        },
        {
          question: "What information do I need to provide for each passenger?",
          answer: "Required information includes: Full name (as on ID/passport), email address, phone number, date of birth, gender, and nationality. For international flights, passport number is also required."
        }
      ]
    },
    {
      category: "Managing Bookings",
      icon: <Search className="h-5 w-5" />,
      questions: [
        {
          question: "How do I find my booking?",
          answer: "Use the 'Booking Inquiry' section with your booking reference number (format: KQ-YYYY-XXX). You can also access bookings through the 'Manage Booking' option in the main menu."
        },
        {
          question: "Can I change my booking after confirmation?",
          answer: "Yes, you can modify your booking depending on availability and fare rules. Changes may incur fees. Use the booking inquiry feature to find your booking, then click 'Modify Booking'."
        },
        {
          question: "How do I cancel my booking?",
          answer: "To cancel: 1) Find your booking using the booking reference, 2) Click 'Cancel Booking', 3) Confirm cancellation. Cancellation fees may apply based on fare type and timing."
        },
        {
          question: "Can I change passenger information?",
          answer: "Minor corrections (spelling errors) can be made free of charge. Major changes like name changes may require additional documentation and fees. Contact customer service for assistance."
        }
      ]
    },
    {
      category: "Payment & Pricing",
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          question: "What payment methods are accepted?",
          answer: "We accept major credit cards (Visa, Mastercard, American Express), debit cards, and mobile money payments (M-Pesa, Airtel Money). All transactions are secured with SSL encryption."
        },
        {
          question: "Are there additional fees?",
          answer: "Displayed prices include base fare and taxes. Additional fees may apply for: seat selection, extra baggage, meal upgrades, and booking changes. These are clearly shown before final payment."
        },
        {
          question: "What is your refund policy?",
          answer: "Refund eligibility depends on fare type: Fully refundable fares can be cancelled with full refund. Partially refundable fares incur cancellation fees. Non-refundable fares may only receive tax refunds."
        }
      ]
    },
    {
      category: "Check-in & Travel",
      icon: <Calendar className="h-5 w-5" />,
      questions: [
        {
          question: "When can I check in online?",
          answer: "Online check-in opens 24 hours before departure and closes 2 hours before domestic flights and 3 hours before international flights. You can select seats and get your boarding pass."
        },
        {
          question: "What documents do I need for travel?",
          answer: "For domestic flights: Valid government-issued ID (national ID, passport, or driving license). For international flights: Valid passport and visa (if required for destination)."
        },
        {
          question: "What is the baggage allowance?",
          answer: "Executive Class: 30kg checked + 10kg carry-on. Middle Class: 23kg checked + 7kg carry-on. Economy Class: 20kg checked + 7kg carry-on. Excess baggage charges apply for overweight items."
        },
        {
          question: "How early should I arrive at the airport?",
          answer: "Domestic flights: Arrive 2 hours before departure. International flights: Arrive 3 hours before departure. This allows time for check-in, security, and potential delays."
        }
      ]
    }
  ];

  const quickActions = [
    { title: "Book New Flight", description: "Start a new flight booking", action: "book", icon: <Plane className="h-4 w-4" /> },
    { title: "Find My Booking", description: "Look up existing reservation", action: "inquiry", icon: <Search className="h-4 w-4" /> },
    { title: "Contact Support", description: "Get help from our team", action: "contact", icon: <Phone className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-sky p-3 rounded-full mb-4">
            <HelpCircle className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Can We Help You?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about booking, managing reservations, and traveling with Kenya Airways.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="bg-card hover:shadow-card transition-all duration-300 cursor-pointer border-border">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-sky p-3 rounded-full w-fit mx-auto mb-3">
                  {action.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                <Button variant="outline" size="sm">
                  {action.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {helpTopics.map((topic, topicIndex) => (
            <Card key={topicIndex} className="bg-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center space-x-3">
                  <div className="bg-gradient-sky p-2 rounded-lg">
                    {topic.icon}
                  </div>
                  <span>{topic.category}</span>
                  <Badge variant="outline">{topic.questions.length} topics</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {topic.questions.map((qa, qaIndex) => (
                    <AccordionItem key={qaIndex} value={`${topicIndex}-${qaIndex}`}>
                      <AccordionTrigger className="text-left text-foreground hover:text-primary">
                        {qa.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {qa.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card className="mt-8 bg-gradient-to-r from-kenya-sky/20 to-transparent border-border">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>Still Need Help?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our customer service team is here to help.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-card p-4 rounded-lg">
                  <Phone className="h-6 w-6 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground mb-1">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-2">24/7 Customer Service</p>
                  <p className="font-medium text-foreground">+254 20 327 4747</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-card p-4 rounded-lg">
                  <Mail className="h-6 w-6 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground mb-1">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-2">Response within 24 hours</p>
                  <p className="font-medium text-foreground">support@kenyaairways.com</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-card p-4 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground mb-1">Office Location</h3>
                  <p className="text-sm text-muted-foreground mb-2">Head Office</p>
                  <p className="font-medium text-foreground">Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Guide */}
        <Card className="mt-8 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">
              System Usage Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Step-by-Step Booking</span>
                </h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                    <span>Select trip type (Round trip or One way)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                    <span>Choose departure and destination cities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                    <span>Select travel dates and number of passengers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                    <span>Choose your preferred travel class</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">5</span>
                    <span>Review available flights and select your preferred option</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">6</span>
                    <span>Fill in passenger details and complete payment</span>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Accessibility Features</span>
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Keyboard navigation support</li>
                  <li>• Screen reader compatibility</li>
                  <li>• High contrast mode available</li>
                  <li>• Responsive design for all devices</li>
                  <li>• Clear visual indicators</li>
                  <li>• Error messages with helpful guidance</li>
                  <li>• Alternative text for images</li>
                  <li>• Logical tab order throughout the system</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpPage;