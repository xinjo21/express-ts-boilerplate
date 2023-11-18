import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function VerifyUserToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let verified;
  const token = req.header("Authorization");
  const sessionToken = req.cookies.session;

  if (!token) return res.status(401).send("Access Denied: No Authorization Header");
  if (!sessionToken) return res.status(401).send("Access Denied: No Cookies");

  if (!process.env.TOKEN_SECRET) {
    process.exit(1);
  }

  try {
    if (!token) {
      verified = Jwt.verify(token, process.env.TOKEN_SECRET);
    } else {
      verified = Jwt.verify(sessionToken, process.env.TOKEN_SECRET);
    }
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}
