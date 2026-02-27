import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import type { Product } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Package } from "lucide-react";

export default function Inventory() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(useSearch());
  const initialQuery = searchParams.get('q') || '';
  const initialType = searchParams.get('type') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [filterType, setFilterType] = useState(initialType);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    }
  });

  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      product.make.toLowerCase().includes(searchLower) ||
      product.model.toLowerCase().includes(searchLower) ||
      product.partId.toLowerCase().includes(searchLower) ||
      product.details.toLowerCase().includes(searchLower) ||
      product.year.toString().includes(searchLower);

    const matchesType = !filterType || 
      product.type.toLowerCase().includes(filterType.toLowerCase());

    return matchesSearch && matchesType && product.status === 'In Stock';
  });

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Available Inventory
          </h1>
          <p className="text-zinc-400 text-lg">
            Browse our current selection of quality used and rebuilt parts
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <Input
              placeholder="Search by make, model, year, or part ID..."
              className="pl-10 bg-zinc-900 border-white/10 text-white h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="h-12 rounded-lg border border-white/10 bg-zinc-900 px-4 text-white focus:ring-2 focus:ring-primary/50 outline-none"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="engine">Engines</option>
            <option value="transmission">Transmissions</option>
            <option value="chassis">Chassis Plates</option>
            <option value="axle">Axles</option>
            <option value="differential">Differentials</option>
            <option value="transfer">Transfer Cases</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-zinc-400">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center text-zinc-400 py-20">
            Loading inventory...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              No Products Found
            </h3>
            <p className="text-zinc-400 mb-6">
              Try adjusting your search or filters
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setFilterType('');
              }}
              variant="outline"
              className="border-white/10 text-white"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-zinc-900 border-white/10 overflow-hidden hover:border-primary/50 transition-all group">
                <div className="aspect-video bg-zinc-950 relative overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={`${product.year} ${product.make} ${product.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-zinc-700" />
                    </div>
                  )}
                  <Badge className="absolute top-3 right-3 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {product.status}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="mb-3">
                    <Badge variant="outline" className="text-primary border-primary/30 mb-2">
                      {product.type}
                    </Badge>
                    <h3 className="text-xl font-display font-bold text-white mb-1">
                      {product.year} {product.make} {product.model}
                    </h3>
                    <p className="text-sm text-zinc-400">{product.details}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider">Part ID</p>
                      <p className="text-sm font-mono text-white">{product.partId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4 bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setLocation(`/product/${product.id}`)}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
