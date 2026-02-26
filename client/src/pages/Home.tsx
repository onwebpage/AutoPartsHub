import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, Truck, Clock, Wrench, Search, Star, PackageSearch } from "lucide-react";
import heroEngine from "@/assets/images/hero-engine.jpg";
import warehouse from "@/assets/images/warehouse.jpg";

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroEngine} 
            alt="Car Engine Bay" 
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Hero Content */}
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-zinc-300">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                Over 70+ Trusted Salvage Yards Nationwide
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1] text-white">
                Find the Right <span className="text-primary">Parts.</span><br />
                Right <span className="text-gradient">Now.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl">
                Nationwide supplier specializing in high-quality used and rebuilt engines and transmissions. Competitive pricing without compromising quality.
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-zinc-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span>90-Day Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Free Shipping Available</span>
                </div>
              </div>
            </div>

            {/* Search Form */}
            <div className="relative w-full max-w-md mx-auto lg:ml-auto glass-panel p-6 sm:p-8 rounded-2xl shadow-2xl">
              <div className="absolute -top-3 -right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-3">
                FAST QUOTE
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-white mb-2">Find Your Part</h3>
                <p className="text-zinc-400 text-sm">Enter vehicle details to search our nationwide network.</p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-zinc-300">Year</Label>
                    <select id="year" className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white" data-testid="select-year">
                      <option value="">Select Year</option>
                      {[...Array(30)].map((_, i) => (
                        <option key={i} value={2024 - i}>{2024 - i}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="make" className="text-zinc-300">Make</Label>
                    <select id="make" className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white" data-testid="select-make">
                      <option value="">Select Make</option>
                      <option value="ford">Ford</option>
                      <option value="chevrolet">Chevrolet</option>
                      <option value="toyota">Toyota</option>
                      <option value="honda">Honda</option>
                      <option value="bmw">BMW</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model" className="text-zinc-300">Model</Label>
                    <Input id="model" placeholder="e.g. F-150" className="bg-background/50 border-input text-white" data-testid="input-model" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="part" className="text-zinc-300">Part</Label>
                    <select id="part" className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white" data-testid="select-part">
                      <option value="">Select Part</option>
                      <option value="engine">Engine Assembly</option>
                      <option value="transmission">Transmission</option>
                      <option value="axle">Axle Assembly</option>
                      <option value="transfer_case">Transfer Case</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details" className="text-zinc-300">Part Details / Size / Vin (Optional)</Label>
                  <Textarea id="details" placeholder="e.g. 5.0L V8, 4WD..." className="bg-background/50 border-input text-white resize-none" rows={2} data-testid="input-details" />
                </div>

                <div className="pt-2 border-t border-white/10 mt-2">
                  <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider font-semibold">Contact Info</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input id="name" placeholder="Full Name" className="bg-background/50 border-input text-white" data-testid="input-name" />
                    </div>
                    <div className="space-y-2">
                      <Input id="phone" type="tel" placeholder="Phone Number" className="bg-background/50 border-input text-white" data-testid="input-phone" />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Input id="email" type="email" placeholder="Email Address" className="bg-background/50 border-input text-white" data-testid="input-email" />
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg font-bold mt-4" data-testid="button-find-part">
                  <Search className="w-5 h-5 mr-2" />
                  Find My Part
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-zinc-950/50" id="about">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Why Choose RAP?</h2>
            <p className="text-zinc-400 text-lg">
              We deliver dependable engines and transmissions quickly, affordably, and with complete customer confidence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: "Fast Nationwide Delivery", desc: "Shipping across the US with free shipping options available. Most orders arrive within 3-4 business days." },
              { icon: ShieldCheck, title: "Extended Warranties", desc: "Shop with peace of mind. We offer extended warranty options and a standard 90-day return policy." },
              { icon: Star, title: "Transparent Pricing", desc: "No hidden fees. We offer competitive pricing sourced from bank-seized and insurance vehicles." },
              { icon: PackageSearch, title: "Massive Inventory", desc: "Consistent availability sourced from state vehicles and bulk recycling facilities." },
              { icon: Wrench, title: "Specialized Focus", desc: "Engines and transmissions are our core focus, ensuring expert knowledge and high quality." },
              { icon: Clock, title: "Professional Logistics", desc: "Reliable tracking and logistics support through our Priority 1 affiliation." }
            ].map((feature, i) => (
              <div key={i} className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl hover:bg-zinc-900 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & WAREHOUSE */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
              <img 
                src={warehouse} 
                alt="Auto parts warehouse" 
                className="relative rounded-2xl border border-white/10 shadow-2xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="text-4xl font-display font-black text-white mb-1">70+</p>
                <p className="text-zinc-400 font-medium text-sm uppercase tracking-wider">Trusted Yards</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                Our Mission is <span className="text-primary">Simple.</span>
              </h2>
              <div className="space-y-6 text-lg text-zinc-400">
                <p>
                  At Rex Auto Parts (RAP), we aim to deliver dependable engines and transmissions quickly, affordably, and with complete customer confidence.
                </p>
                <p>
                  With access to a strong network of 70+ trusted salvage and recycling yards across the nation, we ensure consistent inventory availability, competitive pricing, and fast delivery.
                </p>
                <p>
                  Our inventory is sourced from state vehicles, bank-seized vehicles, insurance vehicles, and bulk automotive recycling facilities, allowing us to provide reliable parts at cost-effective prices without compromising quality.
                </p>
              </div>
              <Button className="bg-white text-black hover:bg-zinc-200 text-lg font-bold px-8 h-14" data-testid="button-learn-more">
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
