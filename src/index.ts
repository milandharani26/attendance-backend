import express, { NextFunction, Request, Response } from "express";
import appRouter from "./routes";

const app = express();

const port = 3000;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: "Successfully started type script",
  });
});

app.use("/api/v1", appRouter)

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});



//"start:dev": "nodemon --exec npx ts-node ./src/index.ts"
