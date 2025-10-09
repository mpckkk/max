import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertPhotoSchema, insertStorySchema } from "@shared/schema";

// Stripe integration - reference from blueprint:javascript_stripe
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-09-30.clover",
    })
  : null;

export async function registerRoutes(app: Express): Promise<Server> {
  // Photo routes
  app.get("/api/photos", async (_req, res) => {
    try {
      const photos = await storage.getAllPhotos();
      res.json(photos);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching photos: " + error.message });
    }
  });

  app.get("/api/photos/:id", async (req, res) => {
    try {
      const photo = await storage.getPhotoById(req.params.id);
      if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
      }
      res.json(photo);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching photo: " + error.message });
    }
  });

  app.post("/api/photos", async (req, res) => {
    try {
      const validatedData = insertPhotoSchema.parse(req.body);
      const photo = await storage.createPhoto(validatedData);
      res.status(201).json(photo);
    } catch (error: any) {
      res.status(400).json({ message: "Invalid photo data: " + error.message });
    }
  });

  // Story routes
  app.get("/api/stories", async (_req, res) => {
    try {
      const stories = await storage.getAllStories();
      res.json(stories);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching stories: " + error.message });
    }
  });

  app.get("/api/stories/:id", async (req, res) => {
    try {
      const story = await storage.getStoryById(req.params.id);
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
      res.json(story);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching story: " + error.message });
    }
  });

  app.post("/api/stories", async (req, res) => {
    try {
      const validatedData = insertStorySchema.parse(req.body);
      const story = await storage.createStory(validatedData);
      res.status(201).json(story);
    } catch (error: any) {
      res.status(400).json({ message: "Invalid story data: " + error.message });
    }
  });

  // Stripe payment route for one-time donations
  // Reference from blueprint:javascript_stripe
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ 
          message: "Donation functionality is not configured. Please contact the administrator to set up payment processing." 
        });
      }

      const { amount } = req.body;
      
      if (!amount || amount < 1) {
        return res.status(400).json({ message: "Invalid amount" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          purpose: "Max the Shiba Inu donation"
        }
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
