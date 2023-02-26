import fs from "fs";
import { IMAGES_DIR } from "./constants";
import path from "path";

export const getRandomImage = async (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    fs.readdir(
      IMAGES_DIR,
      (err: NodeJS.ErrnoException | null, files: string[]) => {
        if (err) {
          console.log("Error, could not read images");
          reject(err);
        } else {
          // filter out non-image files
          const images = files.filter((file) => {
            const ext = path.extname(file);
            return (
              ext === ".png" ||
              ext === ".jpg" ||
              ext === ".jpeg" ||
              ext === ".gif"
            );
          });

          // select a random image from the list
          const randomIndex = Math.floor(Math.random() * images.length);
          const randomImage = images[randomIndex];

          // return the selected image file
          console.log("Will return file", randomImage);
          resolve(randomImage);
        }
      }
    );
  });
};
