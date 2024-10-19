"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roleRouter = (0, express_1.Router)();
roleRouter.get("/", (req, res) => {
    console.log("this first role route");
});
exports.default = roleRouter;
