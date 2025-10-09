import { storage } from "../server/storage";
import { insertPhotoSchema } from "../shared/schema";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const photos = await storage.getAllPhotos();
    res.status(200).json(photos);
    return;
  }

  if (req.method === "POST") {
    try {
      const data = insertPhotoSchema.parse(req.body);
      const photo = await storage.createPhoto(data);
      res.status(201).json(photo);
    } catch (error: any) {
      res.status(400).json({ message: "Invalid photo data: " + error.message });
    }
    return;
  }

  res.status(405).json({ message: "Method not allowed" });
}
