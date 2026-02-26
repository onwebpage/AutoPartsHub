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
  Settings2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import engineThumb from "@/assets/images/hero-engine.jpg";

const inventory = [
  { id: 1, name: "V8 Engine Assembly", vehicle: "2018 Ford F-150", type: "Engine", price: "$2,400", miles: "45k", warranty: "6 Months", image: engineThumb },
  { id: 2, name: "Automatic Transmission", vehicle: "2020 Toyota Camry", type: "Transmission", price: "$1,200", miles: "32k", warranty: "1 Year", image: engineThumb },
  { id: 3, name: "Rear Axle Assembly", vehicle: "2019 Jeep Wrangler", type: "Axle", price: "$950", miles: "28k", warranty: "90 Days", image: engineThumb },
  { id: 4, name: "Turbocharger Unit", vehicle: "2021 BMW 330i", type: "Engine Part", price: "$850", miles: "15k", warranty: "6 Months", image: engineThumb },
  { id: 5, name: "5.3L V8 Engine", vehicle: "2015 Chevrolet Silverado", type: "Engine", price: "$1,850", miles: "88k", warranty: "6 Months", image: engineThumb },
  { id: 6, name: "CVT Transmission", vehicle: "2019 Honda Civic", type: "Transmission", price: "$1,100", miles: "41k", warranty: "1 Year", image: engineThumb },
];

export default function Inventory() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="min-h-screen pt-24 pb-20 bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 text-sm font-medium">
              Live Stock
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white">
              Parts <span className="text-primary">Catalog</span>
            </h1>
            <p className="text-zinc-400 max-w-xl text-lg">
              Explore our current nationwide inventory of tested and certified engines, transmissions, and more.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input 
                placeholder="Search Year, Make, Model..." 
                className="bg-zinc-900 border-white/10 pl-10 text-white h-12"
              />
            </div>
            <Button variant="outline" className="h-12 border-white/10 text-white hover:bg-white/5">
              <Settings2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {["All", "Engines", "Transmissions", "Axles", "Suspension", "Body"].map((cat) => (
            <Button
              key={cat}
              onClick={() => setFilter(cat)}
              variant={filter === cat ? "default" : "outline"}
              className={`rounded-full px-6 whitespace-nowrap ${
                filter === cat ? "bg-primary text-white" : "border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {inventory.map((item) => (
            <Card key={item.id} className="group bg-zinc-900 border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                <Badge className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border-white/10 text-white font-medium">
                  {item.type}
                </Badge>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3" /> Certified
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-zinc-500 text-sm font-medium mt-1">
                      {item.vehicle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-display font-black text-white">
                      {item.price}
                    </span>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">MSRP</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Layers className="w-3 h-3" /> Mileage
                    </span>
                    <p className="text-sm text-zinc-300 font-semibold">{item.miles} Original</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Warranty
                    </span>
                    <p className="text-sm text-zinc-300 font-semibold">{item.warranty}</p>
                  </div>
                </div>

                <Button className="w-full bg-white/5 hover:bg-primary text-white border-white/10 group-hover:border-primary transition-all duration-300 h-12 font-bold group" data-testid={`button-view-${item.id}`}>
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <Button variant="outline" className="border-white/10 text-zinc-400 hover:text-white px-12 h-14 rounded-full text-lg">
            View All 4,200+ Parts
          </Button>
        </div>
      </div>
    </div>
  );
}
