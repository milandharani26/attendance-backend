import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper";
import { request, Request, RequestHandler, Response } from "express";
import models from "../models/index";
import handleError from "../helpers/handleError.helper";


export const getAllAttendance:RequestHandler = async (req: Request, res: Response) => {
    try {
        const allAttendance = await models.Attendance.findAll({});

        if (!allAttendance || allAttendance.length === 0) {
            res.status(404).json({ status: "Failure", message: "No Attendance found" });
        }

        res.status(200).json({ status: "Success", result: allAttendance });
    } catch (error) {
        handleError(res, error, "Error fetching all attendance records");
    }
};

export const createAttendance:RequestHandler = async (req: Request, res: Response) => {
    const { emp_id, attendance_date, entry_time, exit_time } = req.body;

    try {
        const newAttendance = await models.Attendance.create({
            emp_id,
            attendance_date,
            entry_time,
            exit_time,
        });

        if (!newAttendance) {
            res.status(400).json({ status: "Failure", message: "Error creating attendance" });
        }

        res.status(201).json({ status: "Success", result: newAttendance });
    } catch (error) {
        handleError(res, error, "Error creating attendance record");
    }
};

export const updateAttendance:RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { emp_id, attendance_date, entry_time, exit_time } = req.body;

    try {
        const [isAttendanceUpdated] = await models.Attendance.update(
            {
                emp_id,
                attendance_date,
                entry_time,
                exit_time,
            },
            { where: { attendance_id: id } }
        );

        if (isAttendanceUpdated === 0) {
            res.status(404).json({ status: "Failure", message: "Attendance not found or no changes made" });
        }

        res.json({ status: "Success", message: "Attendance updated successfully" });
    } catch (error) {
        handleError(res, error, "Error updating attendance record");
    }
};

export const deleteAttendance:RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const attendance = await models.Attendance.findOne({
            where: { attendance_id: id },
        });

        if (!attendance) {
            res.status(404).json({ status: "Failure", message: "Attendance not found" });
        }

        // Delete the attendance record
        await models.Attendance.destroy({ where: { attendance_id: id } });

        res.json({ status: "Success", message: "Attendance deleted successfully" });
    } catch (error) {
        console.error("Error deleting attendance:", error);
        handleError(res, error, "Error deleting attendance");
    }
};
