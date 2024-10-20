import express, { NextFunction, Request, Response } from "express";
import appRouter from "./routes";
import dotenv from 'dotenv'

const app = express();
dotenv.config()

const port = 3000;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: "Successfully started type script",
  });
});

app.use("/api/v1", appRouter)


// Error handling 
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err && err.isJoi) {
//     // Joi validation error
//     return res.status(400).json({
//       status: "Failure",
//       message: err.details[0].message, // Customize this message as needed
//     });
//   }
//   // Pass other errors to the default Express error handler
//   next(err);
// });

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});



//"start:dev": "nodemon --exec npx ts-node ./src/index.ts"
