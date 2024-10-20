"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = 3000;
app.get("/", (req, res, next) => {
    res.json({
        status: "Successfully started type script",
    });
});
app.use("/api/v1", routes_1.default);
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
