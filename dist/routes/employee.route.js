"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeRouter = (0, express_1.Router)();
employeeRouter.get("/", (req, res) => {
    console.log("this first plan route");
});
exports.default = employeeRouter;