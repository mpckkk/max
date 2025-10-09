import { storage } from "../server/storage";
import { insertStorySchema } from "../shared/schema";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const stories = await storage.getAllStories();
    res.status(200).json(stories);
    return;
  }

  if (req.method === "POST") {
    try {
      const data = insertStorySchema.parse(req.body);
      const story = await storage.createStory(data);
      res.status(201).json(story);
    } catch (error: any) {
      res.status(400).json({ message: "Invalid story data: " + error.message });
    }
    return;
  }

  res.status(405).json({ message: "Method not allowed" });
}
