import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 8000;

app.use("/", (req: Request, res: Response) => {
  res.send("Server is running smooth");
});

app.listen(PORT, () => console.log(`🏃🏻 on port: ${PORT}`));
