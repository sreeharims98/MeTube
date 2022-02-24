import path from "path";
import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

export let uploadFile = multer({
  storage: storage,
});
