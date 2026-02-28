 import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import { insertProductSchema } from "@shared/schema";

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|mp4|mov|avi/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = /image|video/.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image and video files are allowed'));
  }
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Create product with image upload or JSON
  app.post("/api/products", (req, res, next) => {
    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('multipart/form-data')) {
      upload.single('image')(req, res, next);
    } else {
      next();
    }
  }, async (req, res) => {
    try {
      let productData = req.body;
      
      if (req.file) {
        productData.imageUrl = `/uploads/${req.file.filename}`;
      }
      
      if (typeof productData.year === 'string') productData.year = parseInt(productData.year);
      if (typeof productData.price === 'string') productData.price = parseInt(productData.price);

      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to create product" });
    }
  });

  // Update product
  app.put("/api/products/:id", upload.single('image'), async (req, res) => {
    try {
      const updates: any = {
        ...req.body,
      };
      
      if (req.body.year) updates.year = parseInt(req.body.year);
      if (req.body.price) updates.price = parseInt(req.body.price);
      if (req.file) updates.imageUrl = `/uploads/${req.file.filename}`;

      const product = await storage.updateProduct(req.params.id, updates);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to update product" });
    }
  });

  // Delete product
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProduct(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });
  
  // Upload category image
  app.post("/api/category-images", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }
      
      const category = req.body.category;
      const fs = await import('fs/promises');
      const pathModule = await import('path');
      
      const uploadPath = req.file.path;
      const targetPath = pathModule.join(process.cwd(), 'client', 'public', 'images', `${category}-1.jpg`);
      
      await fs.copyFile(uploadPath, targetPath);
      await fs.unlink(uploadPath);
      
      // Update version file to bust cache
      const versionPath = pathModule.join(process.cwd(), 'client', 'src', 'lib', 'imageVersion.ts');
      await fs.writeFile(versionPath, `export const IMAGE_VERSION = ${Date.now()};\n`);
      
      res.json({ message: "Image uploaded successfully", path: `/images/${category}-1.jpg` });
    } catch (error: any) {
      console.error('Image upload error:', error);
      res.status(500).json({ message: error.message || "Failed to upload image" });
    }
  });
  
  // Get reviews for a product
  app.get("/api/products/:id/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviewsByProduct(req.params.id);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });
  
  // Create review with image/video upload
  app.post("/api/products/:id/reviews", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const reviewData = {
        productId: req.params.id,
        name: req.body.name,
        rating: parseInt(req.body.rating),
        review: req.body.review,
        imageUrl: files?.image?.[0] ? `/uploads/${files.image[0].filename}` : null,
        videoUrl: files?.video?.[0] ? `/uploads/${files.video[0].filename}` : null,
      };
      
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to create review" });
    }
  });

  return httpServer;
}
