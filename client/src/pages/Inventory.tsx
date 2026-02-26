import { useState } from "react";
import { 
  Search, 
  Filter, 
  ArrowRight, 
  ChevronRight, 
  Package, 
  ShieldCheck, 
  Truck,
  Layers,
  Settings2,
  Clock,
  MapPin,
  CheckCircle2,
  Zap,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import engineThumb from "@/assets/images/hero-engine.jpg";

const inventory = [
  { id: 1, name: "V8 Engine Assembly", vehicle: "2018 Ford F-150", type: "Engine", price: "$2,400", miles: "45k", warranty: "6 Months", image: engineThumb, location: "Dallas, TX", condition: "Tested" },
  { id: 2, name: "Automatic Transmission", vehicle: "2020 Toyota Camry", type: "Transmission", price: "$1,200", miles: "32k", warranty: "1 Year", image: engineThumb, location: "Miami, FL", condition: "Like New" },
  { id: 3, name: "Rear Axle Assembly", vehicle: "2019 Jeep Wrangler", type: "Axle", price: "$950", miles: "28k", warranty: "90 Days", image: engineThumb, location: "Phoenix, AZ", condition: "Certified" },
  { id: 4, name: "Turbocharger Unit", vehicle: "2021 BMW 330i", type: "Engine Part", price: "$850", miles: "15k", warranty: "6 Months", image: engineThumb, location: "Atlanta, GA", condition: "Premium" },
  { id: 5, name: "5.3L V8 Engine", vehicle: "2015 Chevrolet Silverado", type: "Engine", price: "$1,850", miles: "88k", warranty: "6 Months", image: engineThumb, location: "Denver, CO", condition: "Tested" },
  { id: 6, name: "CVT Transmission", vehicle: "2019 Honda Civic", type: "Transmission", price: "$1,100", miles: "41k", warranty: "1 Year", image: engineThumb, location: "Seattle, WA", condition: "Certified" },
];

export default function Inventory() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="min-h-screen pt-32 pb-20 bg-black selection:bg-primary/30">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Global Inventory</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white tracking-tight">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Parts</span> Catalog
            </h1>
            <p className="text-zinc-400 max-w-xl text-lg leading-relaxed">
              Precision-tested components for elite performance. Every part in our catalog undergoes rigorous 150-point inspection and certification.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto"
          >
            <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search Year, Make, Model..." 
                className="bg-zinc-900/50 backdrop-blur-xl border-white/10 pl-12 text-white h-14 rounded-2xl focus:ring-primary/20 transition-all placeholder:text-zinc-600"
              />
            </div>
            <Button variant="outline" className="h-14 w-full sm:w-14 rounded-2xl border-white/10 text-white hover:bg-white/5 hover:border-primary/50 transition-all">
              <Settings2 className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-12 no-scrollbar">
          {["All", "Engines", "Transmissions", "Axles", "Suspension", "Body"].map((cat, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={cat}
            >
              <Button
                onClick={() => setFilter(cat)}
                variant={filter === cat ? "default" : "outline"}
                className={`rounded-xl px-8 h-12 whitespace-nowrap text-sm font-bold transition-all duration-300 ${
                  filter === cat 
                    ? "bg-primary text-white shadow-xl shadow-primary/20 border-none scale-105" 
                    : "bg-zinc-900/40 border-white/5 text-zinc-500 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence>
            {inventory.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                layout
              >
                <Card className="group relative bg-zinc-900/40 backdrop-blur-sm border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-zinc-900/60 shadow-2xl">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-white font-bold px-3 py-1 rounded-lg">
                        {item.type}
                      </Badge>
                      <Badge className="bg-primary/90 text-white border-none font-black text-[10px] tracking-tighter uppercase px-2 py-0.5 rounded shadow-lg">
                        In Stock
                      </Badge>
                    </div>

                    {/* Quick Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                          <CheckCircle2 className="w-3 h-3" /> {item.condition}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-8 space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-display font-black text-white group-hover:text-primary transition-colors leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-zinc-500 text-sm font-bold tracking-tight">
                          {item.vehicle}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-bold text-primary">$</span>
                          <span className="text-3xl font-display font-black text-white tracking-tighter">
                            {item.price.replace('$', '')}
                          </span>
                        </div>
                        <p className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em] mt-1">Verified Price</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <Zap className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Mileage</span>
                        </div>
                        <p className="text-lg text-zinc-200 font-bold tracking-tight">{item.miles}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Warranty</span>
                        </div>
                        <p className="text-lg text-zinc-200 font-bold tracking-tight">{item.warranty}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-grow bg-white text-black hover:bg-primary hover:text-white border-none transition-all duration-500 h-14 rounded-2xl font-black uppercase tracking-widest text-xs group/btn" data-testid={`button-view-${item.id}`}>
                        Configure Order
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                      <Button variant="outline" className="w-14 h-14 rounded-2xl border-white/10 text-white hover:bg-white/5 hover:border-white/20 transition-all">
                        <Tag className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>

                  {/* Hover Accent Line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Premium Footer Info */}
        <div className="mt-24 py-16 border-t border-white/5 flex flex-col items-center text-center space-y-8">
          <div className="flex -space-x-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-black bg-zinc-800 overflow-hidden ring-2 ring-primary/20">
                <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-black bg-primary flex items-center justify-center text-[10px] font-black text-white ring-2 ring-primary/20">
              +4.2k
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-bold text-white">Can't find your specific part?</h2>
            <p className="text-zinc-500">Our nationwide network adds 500+ new verified parts daily.</p>
          </div>
          <Button variant="outline" className="border-white/10 text-zinc-400 hover:text-white px-12 h-16 rounded-2xl text-lg font-bold hover:border-primary/50 transition-all">
            Contact Sourcing Team
          </Button>
        </div>
      </div>
    </div>
  );
}

