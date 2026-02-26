import { motion } from "framer-motion";
import { ShieldCheck, Truck, Users, Award, MapPin, Globe, History, Sparkles, ArrowRight, CheckCircle2, Star, Zap } from "lucide-react";
import aboutTeam from "@/assets/images/about-team.jpg";
import warehouse from "@/assets/images/warehouse.jpg";
import expertMech from "@/assets/images/about-expert.jpg";
import logistics from "@/assets/images/about-logistics.jpg";
import support from "@/assets/images/about-support.jpg";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      {/* Dynamic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={aboutTeam} 
            alt="Our Team" 
            className="w-full h-full object-cover opacity-30 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />
          
          {/* Animated decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold text-primary uppercase tracking-widest">
                <Sparkles className="w-4 h-4 animate-spin-slow" /> 
                Establishing Excellence Since 2018
              </div>
              
              <h1 className="text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tight">
                More Than Just <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-500">Spare Parts.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-xl">
                We are the architects of automotive reliability. Bridging the gap between the world's best salvage networks and your garage.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 h-14 text-lg font-black rounded-xl shadow-xl shadow-primary/20 group"
                  onClick={() => setLocation("/inventory")}
                >
                  EXPLORE OUR STOCK
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex -space-x-4 items-center pl-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-zinc-950 bg-zinc-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                    </div>
                  ))}
                  <div className="pl-6">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-tighter">15,000+ Happy Clients</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Visual Elements */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <img src={warehouse} alt="Our Warehouse" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-black text-xl leading-none">98.4% Accuracy</p>
                      <p className="text-zinc-400 text-sm mt-1">Inventory matching precision</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -top-12 -right-12 z-20 p-6 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl -rotate-6 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-white">48hr</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Avg. Dispatch</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expanded Core Values with Visual Interest */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-black">The RAP Standard</h2>
            <p className="text-zinc-400 text-xl leading-relaxed">
              We've built our reputation on three pillars of excellence. We don't just meet industry standards—we redefine them.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                image: expertMech, 
                title: "Engineering Precision", 
                icon: ShieldCheck, 
                desc: "Every component is verified by master technicians using state-of-the-art diagnostic equipment before it ever leaves our facility.",
                tags: ["Certified Quality", "Multi-point Testing"]
              },
              { 
                image: logistics, 
                title: "Velocity Logistics", 
                icon: Truck, 
                desc: "Powered by Priority 1, our logistics engine ensures your parts cross the country in record time with real-time tracking at every mile.",
                tags: ["Nationwide Reach", "Real-time Tracking"]
              },
              { 
                image: support, 
                title: "Human-First Support", 
                icon: Users, 
                desc: "No automated loops. When you call RAP, you speak to an drivetrain expert who knows your vehicle inside and out.",
                tags: ["Expert Advice", "VIN Verification"]
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden hover:bg-zinc-900/60 transition-all duration-500"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                    {feature.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, ti) => (
                      <span key={ti} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats with Modern Typography */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-black">
            {[
              { label: "Partner Yards", value: "70+", icon: MapPin },
              { label: "Parts Sold", value: "15k+", icon: History },
              { label: "Customer Rating", value: "4.9/5", icon: Award },
              { label: "States Covered", value: "48", icon: Globe }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-6xl font-black tracking-tighter">{stat.value}</div>
                <div className="text-sm font-black uppercase tracking-[0.2em] opacity-60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA / Mission Wrapper */}
      <section className="py-32 bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="glass-panel p-12 md:p-20 rounded-[3rem] border border-white/5 bg-gradient-to-br from-zinc-900 to-zinc-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64" />
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                <h2 className="text-5xl md:text-6xl font-display font-black leading-tight">
                  Driving the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-500">Sustainability.</span>
                </h2>
                <div className="space-y-6 max-w-lg">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">The Mission</h4>
                      <p className="text-zinc-400">To simplify global drivetrain sourcing while drastically reducing the carbon footprint of the automotive manufacturing cycle through intelligent recycling.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">The Vision</h4>
                      <p className="text-zinc-400">To become the world's most trusted digital gateway for high-performance automotive components, powered by data and human expertise.</p>
                    </div>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/5 text-white px-8 h-14 rounded-xl font-bold"
                  onClick={() => setLocation("/inventory")}
                >
                  START SOURCING NOW
                </Button>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000" />
                <img 
                  src={aboutTeam} 
                  alt="Team Celebration" 
                  className="relative rounded-[2rem] border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
