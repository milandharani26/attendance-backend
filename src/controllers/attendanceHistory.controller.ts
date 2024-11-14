import { Op, Sequelize, col, fn } from "sequelize";
import db from "../helpers/db.helper";
import { request, Request, RequestHandler, Response } from "express";
import models from "../models/index";
import handleError from "../helpers/handleError.helper";

export const getAllAttendanceHistory: RequestHandler = async (req: Request, res: Response) => {

    const { empId, start, end } = req.body

    try {
        const allAttendanceHistory = await models.AttendanceHistory.findAll({
            where: {
                emp_id: empId,
                attendance_date: {
                    [Op.between]: [start, end] // Filter between start and end dates
                }
            },
            attributes: [
                ['attendance_history_id', 'attendanceHistoryId'],
                ['emp_id', 'empId'],
                ['attendance_date', 'date'],
                ['attendance_status', 'status']
            ]
        });

        if (!allAttendanceHistory || allAttendanceHistory.length === 0) {
            res.status(404).json({ status: "Failure", message: "No Attendance History found" });
            return;
        }

        res.status(200).json({ status: "Success", result: allAttendanceHistory });
    } catch (error) {
        handleError(res, error, "Error fetching all attendance records");
    }
};
