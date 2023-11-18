import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import MongoDB_Connection from "./config/mongoDB.connection";

// Routes import
import User from "./routes/user.routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
const oneDay = 100 * 60 * 60 * 24;

MongoDB_Connection()

app.use(cookieParser());
if (!process.env.TOKEN_SECRET) {
  process.exit(1);
}
app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);
app.use(express.json());

/* app.use("/", (req: Request, res: Response) => {
  res.send("Server is running smooth");
}); */
app.use("/user", User);

app.listen(PORT, () => console.log(`🏃🏻 on port: ${PORT}`));
