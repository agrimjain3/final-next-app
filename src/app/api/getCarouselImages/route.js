import path from "path";
import fs from "fs";

export async function GET(req) {
  const imageDir = path.join(process.cwd(), "public", "carousel-images");
  const imageFiles = fs
    .readdirSync(imageDir)
    .filter((file) => file.endsWith(".jpg") || file.endsWith(".png"));

  const images = imageFiles.map((file) => `/carousel-images/${file}`);

  // Return the images as JSON response
  return new Response(JSON.stringify(images), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
