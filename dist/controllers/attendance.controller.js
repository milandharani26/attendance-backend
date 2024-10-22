"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAttendance = exports.updateAttendance = exports.createAttendance = exports.getAllAttendance = void 0;
const index_1 = __importDefault(require("../models/index"));
const handleError_helper_1 = __importDefault(require("../helpers/handleError.helper"));
const getAllAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAttendance = yield index_1.default.Attendance.findAll({});
        if (!allAttendance || allAttendance.length === 0) {
            res.status(404).json({ status: "Failure", message: "No Attendance found" });
        }
        res.status(200).json({ status: "Success", result: allAttendance });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error fetching all attendance records");
    }
});
exports.getAllAttendance = getAllAttendance;
const createAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emp_id, attendance_date, entry_time, exit_time } = req.body;
    try {
        const newAttendance = yield index_1.default.Attendance.create({
            emp_id,
            attendance_date,
            entry_time,
            exit_time,
        });
        if (!newAttendance) {
            res.status(400).json({ status: "Failure", message: "Error creating attendance" });
        }
        res.status(201).json({ status: "Success", result: newAttendance });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error creating attendance record");
    }
});
exports.createAttendance = createAttendance;
const updateAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { emp_id, attendance_date, entry_time, exit_time } = req.body;
    try {
        const [isAttendanceUpdated] = yield index_1.default.Attendance.update({
            emp_id,
            attendance_date,
            entry_time,
            exit_time,
        }, { where: { attendance_id: id } });
        if (isAttendanceUpdated === 0) {
            res.status(404).json({ status: "Failure", message: "Attendance not found or no changes made" });
        }
        res.json({ status: "Success", message: "Attendance updated successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error updating attendance record");
    }
});
exports.updateAttendance = updateAttendance;
const deleteAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const attendance = yield index_1.default.Attendance.findOne({
            where: { attendance_id: id },
        });
        if (!attendance) {
            res.status(404).json({ status: "Failure", message: "Attendance not found" });
        }
        // Delete the attendance record
        yield index_1.default.Attendance.destroy({ where: { attendance_id: id } });
        res.json({ status: "Success", message: "Attendance deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting attendance:", error);
        (0, handleError_helper_1.default)(res, error, "Error deleting attendance");
    }
});
exports.deleteAttendance = deleteAttendance;
