import { Op, Sequelize, col, fn } from "sequelize";
import db from "../helpers/db.helper";
import { request, Request, RequestHandler, Response } from "express";
import models from "../models/index";
import handleError from "../helpers/handleError.helper";


/**
 * {
            "attendance_id": "28b60c4f-d25a-4ca2-ba3c-d4da8b10e883",
            "emp_id": "d38fef62-b0e8-46b0-95cd-e7cd4bea32ba",
            "attendance_date": "2024-08-29T00:00:00.000Z",
            "entry_time": "10:19:22",
            "exit_time": "19:19:22",
            "createdAt": "2024-10-28T19:27:56.000Z",
            "updatedAt": "2024-10-28T19:27:56.000Z",
            "employee.emp_id": "d38fef62-b0e8-46b0-95cd-e7cd4bea32ba",
            "employee.user_id": "641fd97e-413c-414b-b781-6492458d0da6",
            "employee.office_id": "3806c05c-96d6-4347-ad79-e95c1d2c321f",
            "employee.org_id": "1bd2bf21-6a57-457e-854c-5fd5e327459b",
            "employee.emp_department": "web",
            "employee.emp_designation": "Developer",
            "employee.emp_encoded_image": "[0.052291687577962875, -0.08443202078342438, 0.10563474893569946, 0.06592658907175064]",
            "employee.createdAt": "2024-10-27T16:23:41.000Z",
            "employee.updatedAt": "2024-10-27T16:23:41.000Z",
            "employee.User.user_id": "641fd97e-413c-414b-b781-6492458d0da6",
            "employee.User.user_name": "milan Dharanii",
            "employee.User.user_email": "mm32@gmail.com",
            "employee.User.user_age": "21",
            "employee.User.user_password": "Milan26@31",
            "employee.User.user_birthday": "2003-08-26T00:00:00.000Z",
            "employee.User.role_id": "031307ed-5ea3-43d2-88aa-b670d8873ac7",
            "employee.User.org_id": "1bd2bf21-6a57-457e-854c-5fd5e327459b",
            "employee.User.resetOtp": null,
            "employee.User.resetOtpExpires": null,
            "employee.User.createdAt": "2024-10-27T16:23:41.000Z",
            "employee.User.updatedAt": "2024-10-27T16:23:41.000Z"
        },
 * 
 */

export const getAllAttendance: RequestHandler = async (req: Request, res: Response) => {
    try {
        const allAttendance = await models.Attendance.findAll({
            attributes: [
                [Sequelize.col('employee.emp_department'), 'empDepartment'],
                [Sequelize.col('employee.emp_designation'), 'empDesignation'],
                [Sequelize.col('employee.User.user_name'), 'userName'],
                [Sequelize.col('employee.User.user_id'), 'userId'],
                [Sequelize.col('employee.User.user_email'), 'userEmail'],
                [Sequelize.col('employee.User.user_password'), 'userPassword'],
                [Sequelize.col('employee.User.user_birthday'), 'userBirthday'],
                [Sequelize.col('employee.User.user_age'), 'userAge'],
                ['attendance_date', "attendanceDate"],
                ['attendance_id', "id"],
                ['entry_time', "entryTime"],
                ['exit_time', "exitTime"],
            ],
            include: [
                {
                    model: models.Employees,
                    // attributes: ["emp_department", "emp_designation"],
                    attributes: [],
                    include: [
                        {
                            model: models.Users,
                            // attributes:["user_name", "user_email", "user_birthday"]
                            attributes: []
                        }
                    ]
                },
            ],
            raw: true
        });



        if (!allAttendance || allAttendance.length === 0) {
            res.status(404).json({ status: "Failure", message: "No Attendance found" });
        }

        res.status(200).json({ status: "Success", result: allAttendance });
    } catch (error) {
        handleError(res, error, "Error fetching all attendance records");
    }
};

export const getAttendanceById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const attendance = await models.Attendance.findOne({
            where: {
                attendance_id: id,
            },
            attributes: [
                [Sequelize.col('employee.emp_department'), 'empDepartment'],
                [Sequelize.col('employee.emp_designation'), 'empDesignation'],
                [Sequelize.col('employee.User.user_name'), 'userName'],
                [Sequelize.col('employee.User.user_id'), 'userId'],
                [Sequelize.col('employee.User.user_email'), 'userEmail'],
                [Sequelize.col('employee.User.user_password'), 'userPassword'],
                [Sequelize.col('employee.User.user_birthday'), 'userBirthday'],
                [Sequelize.col('employee.User.user_age'), 'userAge'],
                ['attendance_date', "attendanceDate"],
                ['attendance_id', "id"],
                ['entry_time', "entryTime"],
                ['exit_time', "exitTime"],
            ],
            include: [
                {
                    model: models.Employees,
                    attributes: [],
                    include: [
                        {
                            model: models.Users,
                            attributes: []
                        }
                    ]
                },
            ],
            raw: true
        });

        if (!attendance) {
            res.status(404).json({ status: "Failure", message: "Attendance record not found" });
            return;
        }

        res.status(200).json({ status: "Success", result: attendance });
    } catch (error) {
        handleError(res, error, "Error fetching attendance record by ID");
    }
};


export const createAttendance: RequestHandler = async (req: Request, res: Response) => {
    const { emp_id, attendance_date, entry_time, exit_time } = req.body;

    try {
        const newAttendance = await models.Attendance.create({
            emp_id,
            attendance_date,
            entry_time,
            exit_time,
        });

        const addAttendanceStatus = await models.AttendanceHistory.create({
            emp_id,
            attendance_date,
            attendance_status: "present"
        })

        if (!newAttendance) {
            res.status(400).json({ status: "Failure", message: "Error creating attendance" });
        }

        res.status(201).json({ status: "Success", result: newAttendance });
    } catch (error) {
        handleError(res, error, "Error creating attendance record");
    }
};

export const updateAttendance: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { emp_id, attendance_date, entry_time, exit_time } = req.body;

    // Filter only the fields that are defined
    const updateData: Record<string, any> = {};
    if (emp_id !== undefined) updateData.emp_id = emp_id;
    if (attendance_date !== undefined) updateData.attendance_date = attendance_date;
    if (entry_time !== undefined) updateData.entry_time = entry_time;
    if (exit_time !== undefined) updateData.exit_time = exit_time;

    try {
        const [isAttendanceUpdated] = await models.Attendance.update(updateData, {
            where: { attendance_id: id },
        });

        if (isAttendanceUpdated === 0) {
            res.status(404).json({ status: "Failure", message: "Attendance not found or no changes made" });
            return
        }

        res.json({ status: "Success", message: "Attendance updated successfully" });
    } catch (error) {
        handleError(res, error, "Error updating attendance record");
    }
};

export const deleteAttendance: RequestHandler = async (req: Request, res: Response) => {
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

export const todayAttendanceCount: RequestHandler = async (req: Request, res: Response) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day

    try {
        // Query to count attendance records where attendance_date is today
        const attendanceCount = await models.Attendance.count({
            where: {
                attendance_date: {
                    [Op.gte]: "2024-08-29 00:00:00", // Greater than or equal to start of today
                },
            },
        });

        res.status(200).json({
            status: "Success",
            count: attendanceCount,
        });
    } catch (error) {
        handleError(res, error, "Error fetching today's attendance count");
    }
};



// export const updateAttendance: RequestHandler = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { emp_id, attendance_date, entry_time, exit_time } = req.body;

//     try {
//         const [isAttendanceUpdated] = await models.Attendance.update(
//             {
//                 emp_id,
//                 attendance_date,
//                 entry_time,
//                 exit_time,
//             },
//             { where: { attendance_id: id } }
//         );

//         if (isAttendanceUpdated === 0) {
//             res.status(404).json({ status: "Failure", message: "Attendance not found or no changes made" });
//         }

//         res.json({ status: "Success", message: "Attendance updated successfully" });
//     } catch (error) {
//         handleError(res, error, "Error updating attendance record");
//     }
// };
