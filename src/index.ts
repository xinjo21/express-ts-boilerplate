import express, { Express, Request, Response } from "express";
import session from "express-session";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import mongoDBConnection from "./mongoDB.connection";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
const oneDay = 100 * 60 * 60 * 24;

mongoDBConnection;

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

app.use("/", (req: Request, res: Response) => {
  res.send("Server is running smooth");
});

app.listen(PORT, () => console.log(`🏃🏻 on port: ${PORT}`));
