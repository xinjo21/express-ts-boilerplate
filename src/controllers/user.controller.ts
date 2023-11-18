import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { CREATE, DELETE, GET, GETSPECIFIC, UPDATE } from "./constants/methods";

import { loginValidator } from "../middlewares/validation";
import User from "../models/user.model";

// get current user with cookie
export async function getMe(req: Request, res: Response) {
  const id = req.cookies.id;

  GETSPECIFIC(req, res, id, User);
}
// get a specific user
export async function getUser(req: Request, res: Response) {
  const id = req.params.id;

  GETSPECIFIC(req, res, id, User);
}

// get and return all user data
export async function getUsers(req: Request, res: Response) {
  const user = await User.find();

  GET(req, res, user);
}
// get - revoking access
export async function logout(req: Request, res: Response) {
  // removing cookie to revoke access
  res.clearCookie("session");
  res.clearCookie("id");
  return res.status(200).json({ message: "Success" });
}

// post - log in
export async function login(req: Request, res: Response) {
  // data validation
  const { error } = loginValidator(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ message: "Invalid email or password" });

  const validPass = await bcrypt.compare(req.body.password, user.password);
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
  res.cookie("id", user._id, {
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
    return res.status(400).send({ message: "Email already exist" }); // make this a throw error

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
    timelog: {
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
    },
  });

  CREATE(req, res, user);
}

// post - updating an user
export async function updateUser(req: Request, res: Response) {
  const id = req.params.id;
  let hashedPassword;

  // check if there is an existing id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with that ID: ${id}`);

  // check if user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ message: "No user found" });
  // Check password first

  const prevPassword = await bcrypt.compare(req.body.password, user.password);
  if (!prevPassword)
    return res.status(400).send({ message: "Incorrect password" });
  // if there is a new password, hashing
  if (req.body.new_password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = {
    name: {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
    },
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
    timelog: {
      created_at: user.timelog?.created_at,
      updated_at: new Date().getTime(),
    },
  };

  UPDATE(req, res, id, updatedUser, User);
}

// remove - delete user
export async function deleteUser(req: Request, res: Response) {
  const id = req.params.id;

  DELETE(req, res, id, User);
}
