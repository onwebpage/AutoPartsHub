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
                  className="h-20 w-auto object-contain brightness-110" 
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
                <span>977 Heritage Rd<br/>San Diego, CA 92154</span>
              </li>
            </ul>
            <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3361.8!2d-117.0857!3d32.5556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d94894f2c8f3e7%3A0x1234567890abcdef!2s977%20Heritage%20Rd%2C%20San%20Diego%2C%20CA%2092154!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className="mb-12 pb-12 border-b border-white/10">
          <h4 className="font-display font-semibold text-white text-center mb-6">Trusted & Certified</h4>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white rounded-lg p-3 h-16 w-16 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#003087">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 18c-3.86-.96-7-5.05-7-9V8.3l7-3.89 7 3.89V11c0 3.95-3.14 8.04-7 9z"/>
                  <path d="M10 14l-3-3 1.41-1.41L10 11.17l5.59-5.58L17 7l-7 7z"/>
                </svg>
              </div>
              <span className="text-xs text-zinc-400 font-semibold">BBB Accredited</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white rounded-lg p-3 h-16 w-16 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#1a73e8">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-xs text-zinc-400 font-semibold">Verified Business</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white rounded-lg p-3 h-16 w-16 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#d32f2f">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="white"/>
                </svg>
              </div>
              <span className="text-xs text-zinc-400 font-semibold">ARA Member</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white rounded-lg p-3 h-16 w-16 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#ff6b00">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-4.28-1.07-7.5-5.53-7.5-10.5V8.3l7.5-4.16 7.5 4.16V10c0 4.97-3.22 9.43-7.5 10.5z"/>
                  <circle cx="12" cy="12" r="3" fill="#ff6b00"/>
                </svg>
              </div>
              <span className="text-xs text-zinc-400 font-semibold">SEMA Affiliate</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white rounded-lg p-3 h-16 w-16 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#2e7d32">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  <circle cx="12" cy="12" r="10" fill="none" stroke="#2e7d32" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-xs text-zinc-400 font-semibold">ISO Certified</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} Rex Auto Parts (RAP). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <img src="/paymentlogo1-removebg-preview.png" alt="Payment" className="h-8 object-contain" />
            <img src="/paymentlogo2-removebg-preview.png" alt="Payment" className="h-8 object-contain" />
            <img src="/paymentlogo3-removebg-preview.png" alt="Payment" className="h-8 object-contain" />
            <img src="/paymentlogo4-removebg-preview.png" alt="Payment" className="h-8 object-contain bg-white rounded px-2" />
            <img src="/paymentlogo5-removebg-preview.png" alt="Payment" className="h-8 object-contain" />
            <img src="/paymentlogo6-removebg-preview.png" alt="Payment" className="h-8 object-contain" />
            <img src="/paymentlogo7-removebg-preview.png" alt="Payment" className="h-8 object-contain" />
          </div>
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
