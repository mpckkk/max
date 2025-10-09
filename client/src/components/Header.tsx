import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container max-w-6xl mx-auto px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 hover-elevate active-elevate-2 px-2 py-1 rounded-md transition-all" data-testid="link-home">
          <span className="font-serif text-xl font-bold text-foreground">Max</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} data-testid={`link-${link.label.toLowerCase()}`}>
              <span
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <Button asChild variant="default" size="sm" className="ml-2" data-testid="button-donate-header">
            <Link href="/donate">
              <Heart className="w-4 h-4 mr-2" />
              Donate
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-card">
          <nav className="flex flex-col space-y-1 p-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                <span
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-secondary ${
                    location === link.href ? "bg-secondary text-primary" : "text-foreground"
                  }`}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Button asChild variant="default" className="w-full mt-2" data-testid="button-donate-mobile">
              <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                <Heart className="w-4 h-4 mr-2" />
                Donate
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
