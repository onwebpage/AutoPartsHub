import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, MapPin, Truck, CheckCircle2, Zap, Clock, Package, Star } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product, Review } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const [, setLocation] = useLocation();
  
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['product', params.id],
    queryFn: async () => {
      const response = await fetch(`/api/products/${params.id}`);
      if (!response.ok) throw new Error('Product not found');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-black text-white">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

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
              src={product.imageUrl || '/placeholder.jpg'} 
              alt={`${product.year} ${product.make} ${product.model}`} 
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
                {product.details}
              </h1>
              <p className="text-2xl text-zinc-400 font-bold">{product.year} {product.make} {product.model}</p>
            </div>

            <div className="flex items-end gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Verified Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">$</span>
                  <span className="text-6xl font-display font-black text-white tracking-tighter">
                    {product.price.toLocaleString()}
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
                <p className="text-2xl text-white font-bold">Part ID: {product.partId}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-zinc-500">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Protection</span>
                </div>
                <p className="text-2xl text-white font-bold">{product.protection}</p>
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
                <p className="text-2xl text-white font-bold">{product.status}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Description</h3>
              <p className="text-zinc-400 leading-relaxed text-lg">
                {product.description || `High-quality ${product.type.toLowerCase()} for ${product.year} ${product.make} ${product.model}. ${product.details}. Sourced from trusted salvage yards with quality guarantee.`}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="flex-grow h-16 bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-white/5">
                Complete Purchase
              </Button>
              <Button 
                variant="outline" 
                className="h-16 px-10 border-white/10 text-white hover:bg-white/5 rounded-2xl font-black uppercase tracking-widest"
                onClick={() => {
                  const invoice = `
REX AUTO PARTS - PRODUCT SPECIFICATION
========================================

Product ID: ${product.partId}
Type: ${product.type}
Vehicle: ${product.year} ${product.make} ${product.model}
Details: ${product.details}
Price: $${product.price.toLocaleString()}
Status: ${product.status}
Protection: ${product.protection}
Location: ${product.location}

Description:
${product.description || `High-quality ${product.type.toLowerCase()} for ${product.year} ${product.make} ${product.model}.`}

========================================
Rex Auto Parts
Nationwide Delivery Available
Contact: support@rexautoparts.com
`;
                  const blob = new Blob([invoice], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `RAP-${product.partId}-Specs.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Download Specs
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-4 pt-6">
              <img src="/paymentlogo1-removebg-preview.png" alt="Payment" className="h-8 object-contain" />
              <img src="/paymentlogo2-removebg-preview.png" alt="Payment" className="h-8 object-contain" />
              <img src="/paymentlogo3-removebg-preview.png" alt="Payment" className="h-8 object-contain" />
              <img src="/paymentlogo4-removebg-preview.png" alt="Payment" className="h-8 object-contain bg-white rounded px-2" />
              <img src="/paymentlogo5-removebg-preview.png" alt="Payment" className="h-8 object-contain" />
              <img src="/paymentlogo6-removebg-preview.png" alt="Payment" className="h-8 object-contain" />
              <img src="/paymentlogo7-removebg-preview.png" alt="Payment" className="h-8 object-contain" />
            </div>

            <div className="flex items-center gap-6 pt-6">
              <Truck className="w-8 h-8 text-white" />
              <div className="h-4 w-px bg-white/10" />
              <CheckCircle2 className="w-8 h-8 text-white" />
              <div className="h-4 w-px bg-white/10" />
              <Package className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </div>
        
        <ReviewSection productId={params.id} />
      </div>
    </div>
  );
}

function ReviewSection({ productId }: { productId: string }) {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  
  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return response.json();
    },
  });
  
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to submit review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      setShowForm(false);
    },
  });
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  };
  
  return (
    <div className="mt-20 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-display font-bold text-white">Customer Reviews</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90">
          {showForm ? 'Cancel' : 'Add Review'}
        </Button>
      </div>
      
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-white font-bold mb-2 block">Your Name</label>
              <input name="name" required className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white" />
            </div>
            
            <div>
              <label className="text-white font-bold mb-2 block">Rating</label>
              <select name="rating" required className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white">
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            
            <div>
              <label className="text-white font-bold mb-2 block">Review</label>
              <textarea name="review" required rows={4} className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white font-bold mb-2 block">Upload Image (Optional)</label>
                <input type="file" name="image" accept="image/*" className="w-full text-zinc-400" />
              </div>
              <div>
                <label className="text-white font-bold mb-2 block">Upload Video (Optional)</label>
                <input type="file" name="video" accept="video/*" className="w-full text-zinc-400" />
              </div>
            </div>
            
            <Button type="submit" disabled={mutation.isPending} className="w-full bg-white text-black hover:bg-zinc-200">
              {mutation.isPending ? 'Submitting...' : 'Submit Review'}
            </Button>
          </form>
        </motion.div>
      )}
      
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-zinc-500 text-center py-12">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold">{review.name}</h3>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-zinc-700'}`} />
                    ))}
                  </div>
                </div>
                <span className="text-zinc-500 text-sm">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-zinc-300 mb-4">{review.review}</p>
              <div className="flex gap-4">
                {review.imageUrl && <img src={review.imageUrl} alt="Review" className="w-32 h-32 object-cover rounded-lg" />}
                {review.videoUrl && <video src={review.videoUrl} controls className="w-64 h-32 rounded-lg" />}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
