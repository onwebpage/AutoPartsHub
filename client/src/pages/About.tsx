import { motion } from "framer-motion";
import { ShieldCheck, Truck, Users, Award, MapPin, Globe, History, Sparkles } from "lucide-react";
import aboutTeam from "@/assets/images/about-team.jpg";
import warehouse from "@/assets/images/warehouse.jpg";

export default function About() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src={aboutTeam} 
            alt="Our Team" 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-6 uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Our Story
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight">
              Revolutionizing the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-500">Auto Parts Industry.</span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Rex Auto Parts (PartsRAP) was founded with a single mission: to provide a transparent, reliable, and high-performance bridge between salvage yards and vehicle owners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-zinc-900/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Uncompromising Quality</h3>
              <p className="text-zinc-400">
                Every engine and transmission in our inventory undergoes a rigorous multi-point inspection. We don't just sell parts; we sell peace of mind.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Nationwide Logistics</h3>
              <p className="text-zinc-400">
                Through our partnership with Priority 1, we've optimized our delivery network to provide free, fast shipping to anywhere in the lower 48 states.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Expert Support</h3>
              <p className="text-zinc-400">
                Our team consists of industry veterans who understand the technical nuances of modern drivetrains. We're here to ensure you get the right part.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Partner Yards", value: "70+", icon: MapPin },
              { label: "Parts Sold", value: "15k+", icon: History },
              { label: "Customer Rating", value: "4.9/5", icon: Award },
              { label: "States Covered", value: "48", icon: Globe }
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-zinc-600" />
                </div>
                <div className="text-4xl font-black text-white">{stat.value}</div>
                <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
              <img 
                src={warehouse} 
                alt="Our Facility" 
                className="relative rounded-3xl border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition duration-700"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-display font-black">Building the Future of <span className="text-primary">Recycled Reliability.</span></h2>
              <div className="space-y-6">
                <div className="p-6 bg-zinc-900/50 rounded-2xl border border-white/5">
                  <h4 className="text-lg font-bold mb-2">Our Mission</h4>
                  <p className="text-zinc-400">To simplify the process of sourcing high-quality, pre-owned automotive components while reducing the environmental impact of vehicle manufacturing.</p>
                </div>
                <div className="p-6 bg-zinc-900/50 rounded-2xl border border-white/5">
                  <h4 className="text-lg font-bold mb-2">Our Vision</h4>
                  <p className="text-zinc-400">To become the gold standard for recycled auto parts, known for technical expertise, lightning-fast delivery, and unwavering integrity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
