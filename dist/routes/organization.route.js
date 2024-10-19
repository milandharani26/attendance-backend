"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orgRouter = (0, express_1.Router)();
orgRouter.get("/", (req, res) => {
    console.log("this first plan route");
});
exports.default = orgRouter;
