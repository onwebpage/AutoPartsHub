import { Phone, Mail, MapPin, LogOut } from "lucide-react";
import { Link, useLocation } from "wouter";
import logo from "@/assets/logo-removebg-preview_1772118055779.png";

export default function Footer() {
  const [, setLocation] = useLocation();
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin");
    setLocation("/");
  };

  return (
    <footer className="bg-zinc-950 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer group">
                <img 
                  src={logo} 
                  alt="Rex Auto Parts Logo" 
                  className="h-12 w-auto object-contain brightness-110" 
                />
              </div>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Nationwide supplier specializing in high-quality used and rebuilt engines and transmissions. Dependable parts delivered quickly.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/"><span className="text-zinc-400 hover:text-primary transition-colors text-sm cursor-pointer">Home</span></Link></li>
              <li><a href="#about" className="text-zinc-400 hover:text-primary transition-colors text-sm">About RAP</a></li>
              <li><Link href="/inventory"><span className="text-zinc-400 hover:text-primary transition-colors text-sm cursor-pointer">Our Inventory</span></Link></li>
              {isAdmin && (
                <li>
                  <button 
                    onClick={handleLogout}
                    className="text-zinc-400 hover:text-primary transition-colors text-sm flex items-center gap-2"
                  >
                    <LogOut className="w-3 h-3" /> Logout Admin
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-zinc-400 hover:text-primary transition-colors text-sm">Used Engines</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-primary transition-colors text-sm">Rebuilt Transmissions</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-primary transition-colors text-sm">Nationwide Shipping</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-primary transition-colors text-sm">Extended Warranty</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>1-800-REX-AUTO<br/>Mon-Fri, 8am-6pm EST</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>support@rexautoparts.com</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Nationwide Network<br/>70+ Trusted Yards</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} Rex Auto Parts (RAP). All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-zinc-500">
            <Link href="/privacy-policy">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            </Link>
            <Link href="/terms-of-service">
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            </Link>
            <Link href="/refund-policy">
              <span className="hover:text-white transition-colors cursor-pointer">Return Policy</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
