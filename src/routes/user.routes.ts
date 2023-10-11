import { Router } from "express";
import {
  getMe,
  getUser,
  getUsers,
  logout,
  login,
  register,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/me", getMe);
router.get("/:id", getUser);
router.get("/", getUsers);
router.get("/logout", logout);
router.post("/login", login);
router.post("/register", register);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
