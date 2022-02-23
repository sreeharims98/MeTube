import express from "express";
import {
  checkUserReactionToVideo,
  delVideo,
  dislikeVideo,
  getAllVideos,
  getVideoById,
  likeVideo,
  postVideo,
  putVideo,
} from "../controllers/videoController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";
import { uploadFile } from "../middleware/UploadFileMiddleWare.js";

const router = express.Router();

router.get("/", authMiddleware, getAllVideos);
router.get("/:id", authMiddleware, getVideoById);
router.post(
  "/",
  authMiddleware,
  isAdminMiddleware,
  uploadFile.single("file"),
  postVideo
);
router.put(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  uploadFile.single("file"),
  putVideo
);
router.delete("/:id", authMiddleware, isAdminMiddleware, delVideo);
router.post("/like/:id", authMiddleware, likeVideo);
router.post("/dislike/:id", authMiddleware, dislikeVideo);
router.post("/reaction/:id", authMiddleware, checkUserReactionToVideo);

export { router as videoRoute };
