import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "We've received your inquiry and will get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-6"
            >
              <MessageSquare className="w-4 h-4" />
              Get In Touch
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-black text-white tracking-tight mb-6"
            >
              How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-500">help you?</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-400 max-w-2xl mx-auto"
            >
              Whether you're looking for a specific engine, tracking an order, or need technical advice, our team is ready to assist.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl space-y-8">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold">Call Us</p>
                        <p className="text-xl text-white font-display font-bold mt-1">1-800-REX-AUTO</p>
                        <p className="text-sm text-zinc-400">Mon-Fri, 8am-6pm EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold">Email Us</p>
                        <p className="text-xl text-white font-display font-bold mt-1">support@rexautoparts.com</p>
                        <p className="text-sm text-zinc-400">Expect a reply within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold">Headquarters</p>
                        <p className="text-xl text-white font-display font-bold mt-1">977 Heritage Rd</p>
                        <p className="text-sm text-zinc-400">San Diego, CA 92154</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <div className="rounded-xl overflow-hidden border border-white/10">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3361.8!2d-117.0857!3d32.5556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d94894f2c8f3e7%3A0x1234567890abcdef!2s977%20Heritage%20Rd%2C%20San%20Diego%2C%20CA%2092154!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-950/50 border border-white/5">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <p className="text-xs text-zinc-400">Your information is secure and will never be shared with third parties.</p>
                  </div>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="bg-gradient-to-br from-primary/20 to-transparent p-8 rounded-3xl border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                  <h4 className="text-xl font-display font-bold text-white">Business Hours</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Monday - Friday</span>
                    <span className="text-white font-bold">8:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Saturday</span>
                    <span className="text-white font-bold">9:00 AM - 2:00 PM EST</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Sunday</span>
                    <span className="text-zinc-500 italic">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-7"
            >
              <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-xs uppercase tracking-widest font-bold text-zinc-500">First Name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John" 
                        required 
                        className="h-12 bg-zinc-950/50 border-white/10 text-white rounded-xl focus:ring-primary/50"
                        data-testid="input-first-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-xs uppercase tracking-widest font-bold text-zinc-500">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe" 
                        required 
                        className="h-12 bg-zinc-950/50 border-white/10 text-white rounded-xl focus:ring-primary/50"
                        data-testid="input-last-name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-zinc-500">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      className="h-12 bg-zinc-950/50 border-white/10 text-white rounded-xl focus:ring-primary/50"
                      data-testid="input-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-xs uppercase tracking-widest font-bold text-zinc-500">Subject</Label>
                    <select 
                      id="subject"
                      required
                      className="flex h-12 w-full rounded-xl border border-white/10 bg-zinc-950/50 px-4 py-2 text-sm text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                      data-testid="select-subject"
                    >
                      <option value="">Select an inquiry type</option>
                      <option value="quote">Inventory Quote</option>
                      <option value="tracking">Order Tracking</option>
                      <option value="technical">Technical Support</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs uppercase tracking-widest font-bold text-zinc-500">Your Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="How can we help you today?" 
                      required 
                      className="min-h-[150px] bg-zinc-950/50 border-white/10 text-white rounded-xl focus:ring-primary/50 resize-none"
                      data-testid="textarea-message"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-black rounded-xl shadow-xl shadow-primary/20 group"
                    data-testid="button-submit-contact"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                        SENDING...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        SEND MESSAGE
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
