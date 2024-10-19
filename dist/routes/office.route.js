"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const officeRouter = (0, express_1.Router)();
officeRouter.get("/", (req, res) => {
    console.log("this first plan route");
});
exports.default = officeRouter;
