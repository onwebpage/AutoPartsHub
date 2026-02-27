import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Truck, Clock, Wrench, Search, Star, PackageSearch, ArrowRight, CheckCircle2, Loader2, Quote, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import heroEngine from "@/assets/images/hero-engine-v2.png";
import warehouse from "@/assets/images/warehouse.jpg";

const REVIEWS = [
  { name: "Hector Velilla", location: "Verified Customer", text: "The shipping is very fast, the item was as described, the customer service is outstanding. took the time/ concern to assist me with the order. I do trust them now and I highly recommend them. Best price I found and I checked quite a few. I would buy from them again." },
  { name: "Collin Lugine", location: "Verified Customer", text: "Just bought a transmission for my car. I had many emails back and forth with Matt. He was able to provide all the information along with pictures of my parts that I needed. Overall experience I have had with this business has been positive and professional." },
  { name: "Ferdrick Hernandez", location: "Verified Customer", text: "I had bought a engine from ready to start auto parts after a few weeks I got the engine it had some issues so I contacted ready to start auto parts and one of the custom service guy called Marshal helped me out to with the issue I'm definitely coming back!!!!!!" },
  { name: "Daniel H.", location: "Texas", text: "I ordered a rebuilt engine from Rex Auto Parts (PartsRAP) and what really stood out was the FREE shipping. The engine arrived in just 3 business days, securely packed and exactly as described. Honest pricing and no hidden charges. Highly recommend!" },
  { name: "Marcus L.", location: "Florida", text: "PartsRAP made the whole process simple. I purchased a used transmission and they shipped it FREE to my shop in 4 business days. The quality was excellent and my customer’s car is running perfectly. Definitely ordering again from Rex Auto Parts." },
  { name: "Steven K.", location: "Georgia", text: "Rex Auto Parts delivered my engine within 3 days with FREE nationwide shipping. No delays, no excuses. Everything matched the VIN and fit perfectly. Very professional team." },
  { name: "Anthony R.", location: "California", text: "I’ve dealt with many suppliers, but PartsRAP stands out. Transparent pricing, FREE delivery, and fast dispatch. My rebuilt transmission came well wrapped and ready to install. Smooth transaction from start to finish." },
  { name: "Brian M.", location: "Alabama", text: "Ordered a low-mileage used engine from Rex Auto Parts. They confirmed compatibility before shipping and delivered it FREE within 4 business days. Excellent communication and solid quality." },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
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
                    <img src="/images/engine-1.jpg" className="w-8 h-8 object-cover rounded" alt="Engine" />
                  </div>
                  <div>
                    <p className="text-white font-bold leading-none">90-Day Returns</p>
                    <p className="text-xs text-zinc-500 mt-1">Guaranteed Satisfaction</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-white/5">
                    <img src="/images/transmission-1.jpg" className="w-8 h-8 object-cover rounded" alt="Transmission" />
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
                                  <p className="text-zinc-400 text-sm">Estimated Price: <span className="text-white font-bold">${Math.min(...matchingProducts.map(p => p.price)).toLocaleString()} - ${Math.max(...matchingProducts.map(p => p.price)).toLocaleString()}</span></p>
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

      {/* Infinite Review Marquee - Redesigned to match image */}
      <section className="py-24 bg-zinc-950 border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Testimonials</h2>
        </div>
        
        <div className="relative group">
          <div className="flex animate-marquee gap-8 whitespace-nowrap items-center px-4">
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <div 
                key={i} 
                className="inline-flex flex-col bg-white rounded-lg p-8 min-w-[380px] w-[380px] shadow-lg relative h-[320px] justify-between whitespace-normal"
              >
                <div className="absolute top-6 right-6">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                
                <div className="mb-4">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                    <User className="w-8 h-8 text-zinc-400" />
                  </div>
                  <p className="text-[13px] text-zinc-600 leading-[1.6] line-clamp-6">
                    {review.text}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-zinc-900 text-sm mb-1">{review.name}</h4>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button 
            onClick={() => setShowAllReviews(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold px-8 py-2 h-auto rounded-md shadow-sm border-none"
          >
            View All
          </Button>
        </div>
      </section>

      {/* Reviews Modal */}
      <Dialog open={showAllReviews} onOpenChange={setShowAllReviews}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-white overflow-hidden flex flex-col">
          <DialogHeader className="p-8 pb-4 border-b shrink-0">
            <DialogTitle className="text-3xl font-display font-bold text-zinc-900">All Reviews</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-8">
            <div className="grid gap-6">
              {REVIEWS.map((review, i) => (
                <div key={i} className="bg-zinc-50 rounded-lg p-8 border border-zinc-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-zinc-900 text-lg mb-1">{review.name}</h4>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <p className="text-zinc-600 leading-relaxed italic">"{review.text}"</p>
                  {review.location && <p className="text-xs text-zinc-400 mt-4 uppercase tracking-wider">{review.location}</p>}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* GENUINE OEM PARTS INVENTORY */}
      <section className="py-24 bg-zinc-900/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Genuine OEM Parts Inventory
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="group cursor-pointer" onClick={() => setLocation("/inventory?type=engine")}>
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img src="/images/engine-1.jpg" alt="Engines" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-white text-center group-hover:text-primary transition-colors">Engines</h3>
            </div>
            
            <div className="group cursor-pointer" onClick={() => setLocation("/inventory?type=transmission")}>
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img src="/images/transmission-1.jpg" alt="Transmissions" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-white text-center group-hover:text-primary transition-colors">Transmissions</h3>
            </div>
            
            <div className="group cursor-pointer" onClick={() => setLocation("/inventory?type=axle")}>
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img src="/images/axle-1.jpg" alt="Axles" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-white text-center group-hover:text-primary transition-colors">Axles</h3>
            </div>
            
            <div className="group cursor-pointer" onClick={() => setLocation("/inventory?type=chassis")}>
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img src="/images/chassis-1.jpg" alt="Chassis" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-white text-center group-hover:text-primary transition-colors">Chassis</h3>
            </div>
            
            <div className="group cursor-pointer" onClick={() => setLocation("/inventory?type=differential")}>
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img src="/images/differential-1.jpg" alt="Differentials" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-white text-center group-hover:text-primary transition-colors">Differentials</h3>
            </div>
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
