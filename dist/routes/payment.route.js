"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentRouter = (0, express_1.Router)();
paymentRouter.get("/", (req, res) => {
    console.log("this first plan route");
});
exports.default = paymentRouter;
