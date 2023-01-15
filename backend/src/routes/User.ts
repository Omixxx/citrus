import express from "express";
import { errorHandler } from "../middleware/errorHandler";
import tryCatch from "../utils/tryCatch";

const router = express.Router();
import {
  getUsername,
  isAuthenticated,
  login,
  registerUser,
} from "../controllers/User";

router.get("/isAuth", tryCatch(isAuthenticated));
router.post("/signup", tryCatch(registerUser));
router.post("/login", tryCatch(login));
router.get("/user/username", tryCatch(getUsername));

router.use(errorHandler);
export default router;
