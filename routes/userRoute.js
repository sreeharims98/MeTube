import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserByToken,
  loginUser,
  postUser,
  putUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";
import { userValidate, userValidator } from "../middleware/validator.js";

const router = express.Router();

router.get("/", isAdminMiddleware, getAllUsers);
router.post("/", userValidator(), userValidate, postUser);
router.post("/login", loginUser);
router.get("/get", authMiddleware, getUserByToken);
router.put("/:id", authMiddleware, putUser);
router.delete("/:id", authMiddleware, deleteUser);

export { router as userRoute };
