"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res, next) => {
    res.json({
        status: "Successfully started type script",
    });
});
app.use("/api/v1", routes_1.default);
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});
