import { Plane, Menu, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-card">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-gradient-sky p-2 rounded-lg">
            <Plane className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Kenya Airways</h1>
            <p className="text-xs text-muted-foreground">Book Easy</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Book Flight
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Manage Booking
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Check-in
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary flex items-center space-x-1">
            <HelpCircle className="h-4 w-4" />
            <span>Help</span>
          </Button>
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-card hover:bg-accent">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card shadow-card border border-border">
              <DropdownMenuItem className="hover:bg-accent">Sign In</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent">Register</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent">My Account</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="bg-card hover:bg-accent">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card shadow-card border border-border">
                <DropdownMenuItem className="hover:bg-accent">Book Flight</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent">Manage Booking</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent">Check-in</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent">Help</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;