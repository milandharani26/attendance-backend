import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper.js";
import { request, Request, Response } from "express";
import models from "../models/index.js";
import handleError from "../helpers/handleError.helper.js";


export const getAllAttendance = async (req: Request, res: Response): Promise<Response> => {
    try {
        const allAttendance = await models.Attendance.findAll({});

        if (!allAttendance || allAttendance.length === 0) {
            return res.status(404).json({ status: "Failure", message: "No Attendance found" });
        }

        return res.status(200).json({ status: "Success", result: allAttendance });
    } catch (error) {
        return handleError(res, error, "Error fetching all attendance records");
    }
};

export const createAttendance = async (req: Request, res: Response): Promise<Response> => {
    const { emp_id, attendance_date, entry_time, exit_time } = req.body;

    try {
        const newAttendance = await models.Attendance.create({
            emp_id,
            attendance_date,
            entry_time,
            exit_time,
        });

        if (!newAttendance) {
            return res.status(400).json({ status: "Failure", message: "Error creating attendance" });
        }

        return res.status(201).json({ status: "Success", result: newAttendance });
    } catch (error) {
        return handleError(res, error, "Error creating attendance record");
    }
};

export const updateAttendance = async (req: Request, res: Response): Promise<Response> => {
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
            return res.status(404).json({ status: "Failure", message: "Attendance not found or no changes made" });
        }

        return res.json({ status: "Success", message: "Attendance updated successfully" });
    } catch (error) {
        return handleError(res, error, "Error updating attendance record");
    }
};

export const deleteAttendance = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const attendance = await models.Attendance.findOne({
            where: { attendance_id: id },
        });

        if (!attendance) {
            return res.status(404).json({ status: "Failure", message: "Attendance not found" });
        }

        // Delete the attendance record
        await models.Attendance.destroy({ where: { attendance_id: id } });

        return res.json({ status: "Success", message: "Attendance deleted successfully" });
    } catch (error) {
        console.error("Error deleting attendance:", error);
        return handleError(res, error, "Error deleting attendance");
    }
};
