import path from "path";
import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, new Date().toISOString().replace(/:/g, "-") + ext);
  },
});

export let uploadFile = multer({
  storage: storage,
});
