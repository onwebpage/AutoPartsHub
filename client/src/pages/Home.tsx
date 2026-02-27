import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Truck, Clock, Wrench, Search, Star, PackageSearch, ArrowRight, CheckCircle2, Loader2, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroEngine from "@/assets/images/hero-engine-v2.png";
import warehouse from "@/assets/images/warehouse.jpg";

const REVIEWS = [
  { name: "Daniel H.", location: "Texas", text: "I ordered a rebuilt engine from Rex Auto Parts (PartsRAP) and what really stood out was the FREE shipping. The engine arrived in just 3 business days, securely packed and exactly as described. Honest pricing and no hidden charges. Highly recommend!" },
  { name: "Marcus L.", location: "Florida", text: "PartsRAP made the whole process simple. I purchased a used transmission and they shipped it FREE to my shop in 4 business days. The quality was excellent and my customer’s car is running perfectly. Definitely ordering again from Rex Auto Parts." },
  { name: "Steven K.", location: "Georgia", text: "Rex Auto Parts delivered my engine within 3 days with FREE nationwide shipping. No delays, no excuses. Everything matched the VIN and fit perfectly. Very professional team." },
  { name: "Anthony R.", location: "California", text: "I’ve dealt with many suppliers, but PartsRAP stands out. Transparent pricing, FREE delivery, and fast dispatch. My rebuilt transmission came well wrapped and ready to install. Smooth transaction from start to finish." },
  { name: "Brian M.", location: "Alabama", text: "Ordered a low-mileage used engine from Rex Auto Parts. They confirmed compatibility before shipping and delivered it FREE within 4 business days. Excellent communication and solid quality." },
  { name: "Carlos D.", location: "Arizona", text: "PartsRAP saved me time and money. FREE shipping on a transmission is a big deal. Delivered fast, installed same week, and no issues at all. Highly trustworthy company." },
  { name: "Kevin S.", location: "North Carolina", text: "Rex Auto Parts is now my go-to supplier. I run a repair shop and their FREE nationwide shipping plus quick 3–4 day delivery helps me keep my customers happy. Great engines and transmissions." },
  { name: "Michael T.", location: "New York", text: "I was skeptical buying an engine online, but PartsRAP exceeded expectations. FREE shipping, fair pricing, and fast delivery. The engine runs like new. 100% satisfied." },
  { name: "Jessica M.", location: "Texas", text: "I ordered a rebuilt engine from Rex Auto Parts (PartsRAP) and I couldn’t be happier. They explained everything clearly, confirmed fitment, and shipped it FREE. It arrived in just 3 business days. Smooth, professional service!" },
  { name: "Ashley R.", location: "Florida", text: "PartsRAP made buying a transmission stress-free. FREE shipping was a huge plus, and it was delivered in 4 business days exactly as promised. Great communication and honest pricing." },
  { name: "Samantha L.", location: "Georgia", text: "I don’t usually buy major car parts online, but Rex Auto Parts earned my trust. My used engine arrived quickly with FREE nationwide delivery. Everything matched perfectly and my mechanic approved the quality." },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState(0);
  const [formData, setFormData] = useState({
    year: "",
    make: "",
    model: "",
    part: ""
  });

  // Fetch real products from database
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.year || !formData.make || !formData.model || !formData.part) return;
    
    setIsSearching(true);
    setSearchStep(1);
  };

  const getMatchingProducts = () => {
    if (!formData.year || !formData.make || !formData.model || !formData.part) {
      return [];
    }

    const yearNum = parseInt(formData.year);
    const makeLower = formData.make.toLowerCase();
    const modelLower = formData.model.toLowerCase();
    const partLower = formData.part.toLowerCase();

    return products.filter(product => {
      const productMake = product.make.toLowerCase();
      const productModel = product.model.toLowerCase();
      const productType = product.type.toLowerCase();
      const productYear = product.year;

      // Check if make matches
      const makeMatches = productMake.includes(makeLower) || makeLower.includes(productMake);
      
      // Check if model matches
      const modelMatches = productModel.includes(modelLower) || modelLower.includes(productModel);
      
      // Check if part type matches
      const partMatches = productType.includes(partLower) || partLower.includes(productType);
      
      // Check if year is within reasonable range (±3 years)
      const yearMatches = Math.abs(productYear - yearNum) <= 3;

      // Product must match make, model, part type, and be within year range
      return makeMatches && modelMatches && partMatches && yearMatches;
    });
  };

  const matchingProducts = getMatchingProducts();
  const matchingCount = matchingProducts.length;

  useEffect(() => {
    if (isSearching && searchStep < 4) {
      const timer = setTimeout(() => {
        setSearchStep(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isSearching, searchStep]);

  return (
    <div className="w-full bg-zinc-950">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-zinc-950" />
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-400">Zero Compromise.</span>
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
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/50 to-red-500/30 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl bg-zinc-900/40 backdrop-blur-xl min-h-[500px] flex flex-col justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {!isSearching ? (
                    <motion.div
                      key="search-form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="w-full"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-2xl font-display font-bold text-white mb-1">Instant Inventory Search</h3>
                          <p className="text-zinc-400 text-sm italic">Get a quote in 60 seconds or less</p>
                        </div>
                        <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-primary/10 items-center justify-center border border-primary/20">
                          <Search className="w-6 h-6 text-primary" />
                        </div>
                      </div>

                      <form className="space-y-5" onSubmit={handleSearch}>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="year" className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Year</Label>
                            <select 
                              id="year" 
                              className="flex h-12 w-full rounded-xl border border-white/10 bg-zinc-950/50 px-4 py-2 text-sm text-white focus:ring-2 focus:ring-primary/50 transition-all outline-none" 
                              data-testid="select-year"
                              required
                              value={formData.year}
                              onChange={(e) => setFormData({...formData, year: e.target.value})}
                            >
                              <option value="">Select Year</option>
                              {[...Array(30)].map((_, i) => (
                                <option key={i} value={2024 - i}>{2024 - i}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="make" className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Make</Label>
                            <select 
                              id="make" 
                              className="flex h-12 w-full rounded-xl border border-white/10 bg-zinc-950/50 px-4 py-2 text-sm text-white focus:ring-2 focus:ring-primary/50 transition-all outline-none" 
                              data-testid="select-make"
                              required
                              value={formData.make}
                              onChange={(e) => setFormData({...formData, make: e.target.value})}
                            >
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
                            <Input 
                              id="model" 
                              placeholder="e.g. F-150" 
                              className="h-12 rounded-xl bg-zinc-950/50 border-white/10 text-white" 
                              data-testid="input-model" 
                              required
                              value={formData.model}
                              onChange={(e) => setFormData({...formData, model: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="part" className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Part Category</Label>
                            <select 
                              id="part" 
                              className="flex h-12 w-full rounded-xl border border-white/10 bg-zinc-950/50 px-4 py-2 text-sm text-white focus:ring-2 focus:ring-primary/50 transition-all outline-none" 
                              data-testid="select-part"
                              required
                              value={formData.part}
                              onChange={(e) => setFormData({...formData, part: e.target.value})}
                            >
                              <option value="">Select Part</option>
                              <option value="engine">Engine Assembly</option>
                              <option value="transmission">Transmission</option>
                              <option value="axle">Axle Assembly</option>
                              <option value="transfer_case">Transfer Case</option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-white/5">
                          <Button 
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-black rounded-xl shadow-xl shadow-primary/20 group" 
                            data-testid="button-find-part"
                          >
                            SEARCH INVENTORY
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                          <p className="text-center text-[10px] text-zinc-500 mt-4 uppercase tracking-[0.2em]">Verified Inventory • secure checkouts</p>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="search-loading"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center text-center space-y-6 py-8"
                    >
                      {searchStep < 4 ? (
                        <>
                          <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                            <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-2xl font-display font-bold text-white">
                              {searchStep === 1 && "Connecting to Salvage Network..."}
                              {searchStep === 2 && "Checking Nationwide Inventory..."}
                              {searchStep === 3 && "Verifying Part Quality..."}
                            </h3>
                            <p className="text-zinc-400">Searching 70+ trusted yards for your {formData.year} {formData.make} {formData.model}...</p>
                          </div>
                          <div className="w-full max-w-xs h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-primary"
                              initial={{ width: "0%" }}
                              animate={{ width: `${(searchStep / 4) * 100}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </>
                      ) : (
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="space-y-6"
                        >
                          {matchingCount > 0 ? (
                            <>
                              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-3xl font-display font-bold text-white">Part Found!</h3>
                                <p className="text-emerald-400 font-medium">We found {matchingCount} matching {matchingCount === 1 ? 'result' : 'results'} for your {formData.year} {formData.make} {formData.model}.</p>
                                {matchingProducts.length > 0 && (
                                  <p className="text-zinc-400 text-sm">Estimated Price: <span className="text-white font-bold">₹{Math.min(...matchingProducts.map(p => p.price)).toLocaleString()} - ₹{Math.max(...matchingProducts.map(p => p.price)).toLocaleString()}</span></p>
                                )}
                              </div>
                              <div className="pt-4 space-y-3">
                                <Button 
                                  className="w-full bg-white text-black hover:bg-zinc-200 h-12 font-bold rounded-xl"
                                  onClick={() => setLocation(`/inventory?q=${encodeURIComponent(`${formData.make} ${formData.model}`)}&type=${formData.part}`)}
                                >
                                  VIEW MATCHING PARTS
                                </Button>
                                <Button 
                                  variant="ghost"
                                  className="w-full text-zinc-400 hover:text-white"
                                  onClick={() => {
                                    setIsSearching(false);
                                    setSearchStep(0);
                                  }}
                                >
                                  New Search
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
                                <PackageSearch className="w-10 h-10 text-red-500" />
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-3xl font-display font-bold text-white">No Matches Found</h3>
                                <p className="text-zinc-400">We couldn't find an exact match for a {formData.year} {formData.make} {formData.model} {formData.part.replace('_', ' ')} in our current local stock.</p>
                                <p className="text-zinc-500 text-sm">Our sourcing team can still help you find this part within our nationwide network.</p>
                              </div>
                              <div className="pt-4 space-y-3">
                                <Button 
                                  className="w-full bg-primary text-white hover:bg-primary/90 h-12 font-bold rounded-xl"
                                  onClick={() => setLocation("/inventory")}
                                >
                                  BROWSE ALL INVENTORY
                                </Button>
                                <Button 
                                  variant="ghost"
                                  className="w-full text-zinc-400 hover:text-white"
                                  onClick={() => {
                                    setIsSearching(false);
                                    setSearchStep(0);
                                  }}
                                >
                                  Try Different Search
                                </Button>
                              </div>
                            </>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
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

      {/* Infinite Review Marquee - Moved below Why Choose RAP */}
      <div className="relative py-8 overflow-hidden border-y border-white/5 bg-zinc-950 group">
        <div className="flex animate-marquee gap-8 whitespace-nowrap items-center">
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div 
              key={i} 
              className="inline-flex items-center gap-4 bg-zinc-900/40 border border-white/5 rounded-2xl p-6 min-w-[450px]"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-base text-zinc-300 italic whitespace-normal leading-relaxed">"{review.text}"</p>
                <p className="text-sm font-bold text-white mt-4">
                  {review.name} <span className="text-zinc-500 font-normal"> – {review.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
