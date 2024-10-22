"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendanceRouter = (0, express_1.Router)();
attendanceRouter.get("/", (req, res) => {
    console.log("this first plan route");
});
// attendanceRouter.get("/", getAllAttendance)
// attendanceRouter.put("/:id", updateAttendance)
// attendanceRouter.delete("/:id", deleteAttendance)
exports.default = attendanceRouter;
