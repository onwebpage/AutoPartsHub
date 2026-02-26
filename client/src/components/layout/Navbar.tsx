import { Link, useLocation } from "wouter";
import { Wrench, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hidden admin links as per user request
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Inventory", href: "#inventory" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b-0 border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                REX<span className="text-primary">AUTO</span>
              </span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <a
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === link.href ? "text-primary" : "text-zinc-400"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              </Link>
            ))}
            <Button className="bg-primary text-white hover:bg-primary/90 font-semibold" data-testid="button-get-quote-nav">
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinc-400 hover:text-white p-2"
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <a
                  className="block px-4 py-2 text-base font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button className="w-full bg-primary text-white hover:bg-primary/90 font-semibold" data-testid="button-get-quote-mobile">
                Get a Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
