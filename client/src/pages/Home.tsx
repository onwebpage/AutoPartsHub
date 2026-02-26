import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, Truck, Clock, Wrench, Search, Star, PackageSearch, ArrowRight, CheckCircle2 } from "lucide-react";
import heroEngine from "@/assets/images/hero-engine-v2.png";
import warehouse from "@/assets/images/warehouse.jpg";

export default function Home() {
  return (
    <div className="w-full bg-zinc-950">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroEngine} 
            alt="Car Engine Bay" 
            className="w-full h-full object-cover object-center opacity-60 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />
          {/* Animated decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Hero Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary animate-in fade-in slide-in-from-left duration-700">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
                Trusted by 70+ Salvage Yards Nationwide
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[1] text-white tracking-tight animate-in fade-in slide-in-from-left duration-1000 delay-150">
                Premium Parts.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Zero Compromise.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-xl animate-in fade-in slide-in-from-left duration-1000 delay-300">
                Your direct source for high-performance used and rebuilt engines. We bridge the gap between salvage and superior.
              </p>

              <div className="flex flex-wrap items-center gap-8 pt-4 animate-in fade-in slide-in-from-left duration-1000 delay-500">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-white/5">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-bold leading-none">90-Day Returns</p>
                    <p className="text-xs text-zinc-500 mt-1">Guaranteed Satisfaction</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-white/5">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-bold leading-none">Fast Shipping</p>
                    <p className="text-xs text-zinc-500 mt-1">Nationwide Delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Form Card */}
            <div className="lg:col-span-5 relative animate-in fade-in zoom-in duration-1000 delay-500">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/50 to-orange-500/30 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl bg-zinc-900/40 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-1">Instant Inventory Search</h3>
                    <p className="text-zinc-400 text-sm italic">Get a quote in 60 seconds or less</p>
                  </div>
                  <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-primary/10 items-center justify-center border border-primary/20">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Year</Label>
                      <select id="year" className="flex h-12 w-full rounded-xl border border-white/10 bg-zinc-950/50 px-4 py-2 text-sm text-white focus:ring-2 focus:ring-primary/50 transition-all outline-none" data-testid="select-year">
                        <option value="">Select Year</option>
                        {[...Array(30)].map((_, i) => (
                          <option key={i} value={2024 - i}>{2024 - i}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="make" className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Make</Label>
                      <select id="make" className="flex h-12 w-full rounded-xl border border-white/10 bg-zinc-950/50 px-4 py-2 text-sm text-white focus:ring-2 focus:ring-primary/50 transition-all outline-none" data-testid="select-make">
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
                      <Label htmlFor="model" className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Model</Label>
                      <Input id="model" placeholder="e.g. F-150" className="h-12 rounded-xl bg-zinc-950/50 border-white/10 text-white" data-testid="input-model" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="part" className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Part Category</Label>
                      <select id="part" className="flex h-12 w-full rounded-xl border border-white/10 bg-zinc-950/50 px-4 py-2 text-sm text-white focus:ring-2 focus:ring-primary/50 transition-all outline-none" data-testid="select-part">
                        <option value="">Select Part</option>
                        <option value="engine">Engine Assembly</option>
                        <option value="transmission">Transmission</option>
                        <option value="axle">Axle Assembly</option>
                        <option value="transfer_case">Transfer Case</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-black rounded-xl shadow-xl shadow-primary/20 group" data-testid="button-find-part">
                      SEARCH INVENTORY
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-center text-[10px] text-zinc-500 mt-4 uppercase tracking-[0.2em]">Verified Inventory • secure checkouts</p>
                  </div>
                </form>
              </div>
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
