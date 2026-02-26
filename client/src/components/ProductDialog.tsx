import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product;
}

export function ProductDialog({ open, onOpenChange, product }: ProductDialogProps) {
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.imageUrl || null);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to save product');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onOpenChange(false);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partId">Part ID</Label>
              <Input
                id="partId"
                name="partId"
                defaultValue={product?.partId}
                placeholder="RAP-1001"
                required
                className="bg-zinc-950 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Part Type</Label>
              <Select name="type" defaultValue={product?.type} required>
                <SelectTrigger className="bg-zinc-950 border-white/10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10">
                  <SelectItem value="Engine">Engine</SelectItem>
                  <SelectItem value="Transmission">Transmission</SelectItem>
                  <SelectItem value="Axle">Axle</SelectItem>
                  <SelectItem value="Differential">Differential</SelectItem>
                  <SelectItem value="Transfer Case">Transfer Case</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                defaultValue={product?.year}
                placeholder="2020"
                required
                className="bg-zinc-950 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="make">Make</Label>
              <Input
                id="make"
                name="make"
                defaultValue={product?.make}
                placeholder="Ford"
                required
                className="bg-zinc-950 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                defaultValue={product?.model}
                placeholder="F-150"
                required
                className="bg-zinc-950 border-white/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <Input
              id="details"
              name="details"
              defaultValue={product?.details}
              placeholder="5.0L V8"
              required
              className="bg-zinc-950 border-white/10"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                defaultValue={product?.price}
                placeholder="2400"
                required
                className="bg-zinc-950 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={product?.status || "In Stock"}>
                <SelectTrigger className="bg-zinc-950 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10">
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer">Customer (Optional)</Label>
            <Input
              id="customer"
              name="customer"
              defaultValue={product?.customer || "Pending"}
              placeholder="Customer name"
              className="bg-zinc-950 border-white/10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="protection">Protection/Warranty</Label>
            <Input
              id="protection"
              name="protection"
              defaultValue={product?.protection || "90-Day Return"}
              placeholder="e.g., 90-Day Return, 6 Months Warranty"
              className="bg-zinc-950 border-white/10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={product?.location || "Nationwide"}
              placeholder="e.g., Dallas TX, Nationwide"
              className="bg-zinc-950 border-white/10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              defaultValue={product?.description || ""}
              placeholder="Detailed product description..."
              rows={4}
              className="flex w-full rounded-md border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <div className="flex items-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-zinc-950 border-white/10"
              />
              <Button type="button" variant="outline" className="border-white/10" asChild>
                <label htmlFor="image" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </label>
              </Button>
            </div>
            {imagePreview && (
              <div className="mt-4">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg border border-white/10"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-white/10"
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
