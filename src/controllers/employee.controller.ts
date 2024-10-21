import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper";
import { request, Request, RequestHandler, Response } from "express";
import models from "../models/index";
import handleError from "../helpers/handleError.helper";


export const getAllEmployees:RequestHandler = async (req: Request, res: Response) => {
    try {
        const allEmployees = await models.Employees.findAll({});

        if (!allEmployees || allEmployees.length === 0) {
            res.status(404).json({ status: "Failure", message: "No employees found" });
        }

        res.status(200).json({ status: "Success", result: allEmployees });
    } catch (error) {
        handleError(res, error, "Error fetching all employees");
    }
};

export const getEmployees:RequestHandler = async (req: Request, res: Response) => {
    const { office_id, org_id, emp_id } = req.query; // Extract office_id or org_id from query parameters

    try {
        let whereClause: any = {}; // Declare whereClause as an object

        // Build the where clause based on the provided query parameters
        if (office_id) {
            whereClause.office_id = office_id;
        } else if (org_id) {
            whereClause.org_id = org_id;
        } else if (emp_id) {
            whereClause.emp_id = emp_id;
        }

        // Fetch employees based on office_id or org_id
        const employees = await models.Employees.findAll({ where: whereClause });

        // If no employees found
        if (employees.length === 0) {
            res.status(404).json({
                status: "404 Not Found",
                message: "No employees found for the provided office_id or org_id",
            });
        }

        // the found employees
        res.status(200).json({
            status: "Success",
            data: employees,
        });
    } catch (error) {
        console.error("Error fetching employees:", error);
        handleError(res, error, "Error fetching employees");
    }
};

export const createEmployee:RequestHandler = async (req: Request, res: Response) => {
    const {
        office_id,
        emp_department,
        emp_designation,
        org_id,
        emp_encoded_image,
        user_name,
        user_email,
        user_password,
        user_birthday,
        user_age
    } = req.body;

    try {
        const employeeRole = await models.Roles.findOne({
            where: { role_name: "employee" },
        });

        const role_id = employeeRole?.dataValues.role_id;

        const newUser = await models.Users.create({
            user_name,
            user_email,
            user_password,
            user_birthday,
            org_id,
            role_id,
            user_age
        });

        if (!newUser) {
            res.status(400).json({ status: "Failure", message: "Error creating user" });
        }

        const userId = newUser.dataValues.user_id;

        const newEmployee = await models.Employees.create({
            user_id: userId,
            office_id,
            emp_department,
            emp_designation,
            org_id,
            emp_encoded_image,
        });

        if (!newEmployee) {
            res.status(400).json({ status: "Failure", message: "Error creating employee" });
        }

        res.status(201).json({ status: "Success", message: "Employee created successfully" });
    } catch (error) {
        handleError(res, error, "Error creating employee");
    }
};

export const updateEmployee:RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        user_id,
        office_id,
        emp_department,
        emp_designation,
        emp_encoded_image,
        org_id,
    } = req.body;

    try {
        const [isEmployeeUpdated] = await models.Employees.update(
            {
                user_id,
                office_id,
                emp_department,
                emp_designation,
                emp_encoded_image,
                org_id,
            },
            { where: { emp_id: id } }
        );

        if (isEmployeeUpdated === 0) {
            res.status(404).json({ status: "Failure", message: "Employee not found or no changes made" });
        }

        res.json({ status: "Success", message: "Employee updated successfully" });
    } catch (error) {
        handleError(res, error, "Error updating employee");
    }
};

export const deleteEmployee:RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const employee = await models.Employees.findOne({ where: { emp_id: id } });

        if (!employee) {
            res.status(404).json({ status: "Failure", message: "Employee not found" });
        }

        await models.Employees.destroy({ where: { emp_id: id } });

        res.json({ status: "Success", message: "Employee deleted successfully" });
    } catch (error) {
        handleError(res, error, "Error deleting employee");
    }
};
