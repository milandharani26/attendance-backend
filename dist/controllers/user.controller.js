"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
// import models from "../models/index.js";
const getAllUsers = function (req, res) {
    res.json({
        status: "Success",
        result: "All users found"
    });
};
exports.getAllUsers = getAllUsers;
