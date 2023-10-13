import { Router } from "express";
import { VerifyUserToken } from "../middlewares/authentication";
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

router.get("/me", VerifyUserToken, getMe);
router.get("/get/:id", VerifyUserToken, getUser);
router.get("/", VerifyUserToken, getUsers);
router.get("/logout", VerifyUserToken, logout);
router.post("/login", login);
router.post("/register", register);
router.patch("/:id", VerifyUserToken, updateUser);
router.delete("/:id", VerifyUserToken, deleteUser);

export default router;
