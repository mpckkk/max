import { type Photo, type InsertPhoto, type Story, type InsertStory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Photo methods
  getAllPhotos(): Promise<Photo[]>;
  getPhotoById(id: string): Promise<Photo | undefined>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  
  // Story methods
  getAllStories(): Promise<Story[]>;
  getStoryById(id: string): Promise<Story | undefined>;
  createStory(story: InsertStory): Promise<Story>;
}

export class MemStorage implements IStorage {
  private photos: Map<string, Photo>;
  private stories: Map<string, Story>;

  constructor() {
    this.photos = new Map();
    this.stories = new Map();
    this.seedData();
  }

  // Seed with initial sample data using the stock images
  private seedData() {
    const samplePhotos: InsertPhoto[] = [
      {
        imageUrl: "/stock_images/adorable_shiba_inu_d_f58c76b3.jpg",
        caption: "Enjoying a beautiful sunny day at the park",
        category: "Adventures",
      },
      {
        imageUrl: "/stock_images/adorable_shiba_inu_d_0a7737de.jpg",
        caption: "Professional napper at work",
        category: "Naps",
      },
      {
        imageUrl: "/stock_images/adorable_shiba_inu_d_127300b3.jpg",
        caption: "Ready for playtime with my favorite toy",
        category: "Play",
      },
      {
        imageUrl: "/stock_images/adorable_shiba_inu_d_608d0ad2.jpg",
        caption: "Exploring new trails and sniffing all the things",
        category: "Adventures",
      },
      {
        imageUrl: "/stock_images/adorable_shiba_inu_d_339e76b0.jpg",
        caption: "My best portrait pose",
        category: "Silly",
      },
      {
        imageUrl: "/stock_images/adorable_shiba_inu_d_30bf54df.jpg",
        caption: "Waiting patiently for dinner time",
        category: "Meals",
      },
      {
        imageUrl: "/stock_images/adorable_shiba_inu_d_712a2a34.jpg",
        caption: "Lounging in my favorite spot",
        category: "Naps",
      },
      {
        imageUrl: "/stock_images/adorable_shiba_inu_d_e0de5fa4.jpg",
        caption: "Making silly faces for treats",
        category: "Adventures",
      },
      {
        imageUrl: "/stock_images/adorable_shiba_inu_d_0ab692a5.jpg",
        caption: "Chasing squirrels at the dog park",
        category: "Play",
      },
      {
        imageUrl: "/stock_images/adorable_shiba_inu_d_740bef4d.jpg",
        caption: "Living my best life",
        category: "Adventures",
      },
    ];

    samplePhotos.forEach(photo => {
      const id = randomUUID();
      this.photos.set(id, { ...photo, id, date: new Date() });
    });

    const sampleStories: InsertStory[] = [
      {
        title: "First Day Home",
        description: "The day I came home as a tiny puppy was the beginning of an amazing journey. I immediately claimed the comfiest spot on the couch!",
        imageUrl: "/stock_images/adorable_shiba_inu_d_f58c76b3.jpg",
      },
      {
        title: "Beach Adventure",
        description: "My first time at the beach was unforgettable. I wasn't sure about the water at first, but the sand was perfect for digging!",
        imageUrl: "/stock_images/adorable_shiba_inu_d_608d0ad2.jpg",
      },
    ];

    sampleStories.forEach(story => {
      const id = randomUUID();
      this.stories.set(id, { ...story, id, date: new Date() });
    });
  }

  async getAllPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getPhotoById(id: string): Promise<Photo | undefined> {
    return this.photos.get(id);
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const id = randomUUID();
    const photo: Photo = { ...insertPhoto, id, date: new Date() };
    this.photos.set(id, photo);
    return photo;
  }

  async getAllStories(): Promise<Story[]> {
    return Array.from(this.stories.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getStoryById(id: string): Promise<Story | undefined> {
    return this.stories.get(id);
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = randomUUID();
    const story: Story = { ...insertStory, id, date: new Date() };
    this.stories.set(id, story);
    return story;
  }
}

export const storage = new MemStorage();
