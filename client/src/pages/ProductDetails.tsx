import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, MapPin, Truck, CheckCircle2, Zap, Clock, Package } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import engineThumb from "@/assets/images/hero-engine.jpg";

const inventory = [
  { id: 1, name: "V8 Engine Assembly", vehicle: "2018 Ford F-150", type: "Engine", price: "$2,400", miles: "45k", warranty: "6 Months", image: engineThumb, location: "Dallas, TX", condition: "Tested", trending: true, description: "High-performance V8 engine assembly. Rigorously tested for compression and oil pressure. Clean history, ready for installation." },
  { id: 2, name: "Automatic Transmission", vehicle: "2020 Toyota Camry", type: "Transmission", price: "$1,200", miles: "32k", warranty: "1 Year", image: engineThumb, location: "Miami, FL", condition: "Like New", trending: false, description: "Smooth shifting automatic transmission. Low mileage, factory certified replacement part." },
  { id: 3, name: "Rear Axle Assembly", vehicle: "2019 Jeep Wrangler", type: "Axle", price: "$950", miles: "28k", warranty: "90 Days", image: engineThumb, location: "Phoenix, AZ", condition: "Certified", trending: true, description: "Heavy-duty rear axle assembly. Perfect for off-road reliability. Inspected for structural integrity." },
  { id: 4, name: "Turbocharger Unit", vehicle: "2021 BMW 330i", type: "Engine Part", price: "$850", miles: "15k", warranty: "6 Months", image: engineThumb, location: "Atlanta, GA", condition: "Premium", trending: false, description: "OEM turbocharger unit. Precision-balanced for peak efficiency. Like-new condition." },
  { id: 5, name: "5.3L V8 Engine", vehicle: "2015 Chevrolet Silverado", type: "Engine", price: "$1,850", miles: "88k", warranty: "6 Months", image: engineThumb, location: "Denver, CO", condition: "Tested", trending: true, description: "Reliable 5.3L V8 engine. Solid performance history, fully documented service records." },
  { id: 6, name: "CVT Transmission", vehicle: "2019 Honda Civic", type: "Transmission", price: "$1,100", miles: "41k", warranty: "1 Year", image: engineThumb, location: "Seattle, WA", condition: "Certified", trending: false, description: "Genuine CVT transmission. Optimized for fuel economy and smooth acceleration." },
];

export default function ProductDetails({ params }: { params: { id: string } }) {
  const [, setLocation] = useLocation();
  const product = inventory.find(item => item.id === parseInt(params.id));

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-display font-black">Product Not Found</h1>
          <Button onClick={() => setLocation("/inventory")} variant="outline">Back to Inventory</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-black selection:bg-primary/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setLocation("/inventory")}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Inventory</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 aspect-square lg:aspect-auto lg:h-[600px]"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            
            <div className="absolute top-6 left-6 flex flex-col gap-3">
              <Badge className="bg-primary text-white border-none font-black px-4 py-2 rounded-xl text-xs uppercase tracking-widest shadow-2xl">
                {product.type}
              </Badge>
              <Badge className="bg-white/10 backdrop-blur-xl border-white/10 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-widest">
                {product.condition}
              </Badge>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-[0.3em]">Fresh Arrival</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-black text-white leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl text-zinc-400 font-bold">{product.vehicle}</p>
            </div>

            <div className="flex items-end gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Verified Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">$</span>
                  <span className="text-6xl font-display font-black text-white tracking-tighter">
                    {product.price.replace('$', '')}
                  </span>
                </div>
              </div>
              <Badge className="mb-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest">
                Free Shipping
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-8 py-10 border-y border-white/10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Usage</span>
                </div>
                <p className="text-2xl text-white font-bold">{product.miles} Miles</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-zinc-500">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Protection</span>
                </div>
                <p className="text-2xl text-white font-bold">{product.warranty}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-zinc-500">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Location</span>
                </div>
                <p className="text-2xl text-white font-bold">{product.location}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Package className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Status</span>
                </div>
                <p className="text-2xl text-white font-bold">Ready to Ship</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Description</h3>
              <p className="text-zinc-400 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="flex-grow h-16 bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-white/5">
                Complete Purchase
              </Button>
              <Button variant="outline" className="h-16 px-10 border-white/10 text-white hover:bg-white/5 rounded-2xl font-black uppercase tracking-widest">
                Download Specs
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-6 grayscale opacity-50">
              <Truck className="w-8 h-8 text-white" />
              <div className="h-4 w-px bg-white/10" />
              <CheckCircle2 className="w-8 h-8 text-white" />
              <div className="h-4 w-px bg-white/10" />
              <Package className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
