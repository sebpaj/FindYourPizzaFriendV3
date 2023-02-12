import fs from "fs";
import path from "path";
const publicPath = "./public/images";

const getImage = async () => {
  fs.readdir(publicPath, (err, files) => {
    // handle error
    console.log("reading...");
    if (err) {
      throw err;
    }
    console.log("filtering...");
    // filter only image files
    const imageFiles = files.filter((file) =>
      [".jpg", ".jpeg", ".png", ".gif"].includes(path.extname(file))
    );
    console.log("picking...");
    // pick a random image
    const randomImage =
      imageFiles[Math.floor(Math.random() * imageFiles.length)];
    console.log("found", randomImage);
    return randomImage;
  });
};

export default getImage;
