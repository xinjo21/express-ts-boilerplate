import { Express, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { loginValidator } from "../middlewares/validation";

import User from "../models/user.model";

// get
export async function getMe(req: Request, res: Response) {
  // statement here
}
// get
export async function getUser(req: Request, res: Response) {
  // statement here
}
// get
export async function getUsers(req: Request, res: Response) {
  // statement here
}
// get - revoking access
export async function logout(req: Request, res: Response) {
  // removing cookie to revoke access
  req.cookies.destroy();
}

// post - log in
export async function login(req: Request, res: Response) {
  // data validation
  const { error } = loginValidator(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ message: "Invalid email or password" });

  const validPass = await bcrypt.compare(req.body.password, user.password); // watched to be fix
  if (!validPass)
    return res.status(400).send({ message: "Invalid email or password" });

  // generate and assign jwt token here
  if (!process.env.TOKEN_SECRET) {
    process.exit(1);
  }
  const token = Jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1 day",
  });
  // assigns cookie here
  res.cookie("session", token, {
    httpOnly: true,
    maxAge: 12 * 60 * 60 * 1000, // 24hours
  });

  return res.status(200).send("Logged in");
}

// post - creating an user
export async function register(req: Request, res: Response) {
  // checks if email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send({ message: "Email already exist" });

  // hashing/crypting the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
    },
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await user.save();
    return res.status(200).send({ message: "Success" });
  } catch (error) {
    return res.status(400).json({ message: "Failed" });
  }
}

// post - updating an user
export async function updateUser(req: Request, res: Response) {
  // statement here
}

// remove - delete user
export async function deleteUser(req: Request, res: Response) {
  // statement here
}
