import express from "express";
import path from "path";
import { IMAGES_DIR, PARENT_DIR } from "./constants";
import { getRandomImage } from "./resources";

const app = express();
const port = 3001;

app.use(express.static(IMAGES_DIR));

app.get(
  "/random-image",
  async (req: express.Request, res: express.Response) => {
    const imagePath = await getRandomImage();
    const absoluteImagePath = path.join(PARENT_DIR, IMAGES_DIR, imagePath);
    console.log("Absolute image path to send file", absoluteImagePath);
    res.sendFile(absoluteImagePath);
  }
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
