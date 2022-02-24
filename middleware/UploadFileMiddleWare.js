import path from "path";
import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, zpath.join(__dirname, "/uploads/"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date().toISOString().replace(/:/g, "-") + file.originalname);
//   },
// });

export let uploadFile = multer({
  storage: storage,
});
