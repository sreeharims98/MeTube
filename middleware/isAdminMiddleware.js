import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const isAdminMiddleware = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //get user id from token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // get user from id
      const user = await userModel.findById(decoded.id);
      // req.user = decoded;
      if (user.is_admin) {
        next();
      } else {
        res
          .status(401)
          .json({
            message:
              "Not authorized, You do not have permission for this action!",
          });
      }
    } else {
      res.status(401).json({ message: "Not authorized, no token found" });
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
