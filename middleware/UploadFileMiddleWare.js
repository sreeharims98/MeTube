import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from "fs";

// var dir = in(__dirname) + "/uploads";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // if (!fs.existsSync(dir)) {
    //   fs.mkdirSync(dir);
    // }
    cb(null, "uploads/");
    // cb(null, path.join(__dirname, "/uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

export let uploadFile = multer({
  storage: storage,
});
