import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper";
import { request, Request, RequestHandler, Response } from "express";
import handleError from "../helpers/handleError.helper";
import models from "../models/index";


// Get all roles
export const getAllRoles:RequestHandler = async (req: Request, res: Response)=> {
    try {
        const allRoles = await models.Roles.findAll({});
        if (!allRoles || allRoles.length === 0) {
            res.status(404).json({ status: "Failure", message: "No roles found" });
        }
        res.json({ status: "Success", result: allRoles });
    } catch (error) {
        handleError(res, error, "Failed to retrieve roles");
    }
};

// Get a specific role
export const getRole:RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const role = await models.Roles.findOne({ where: { role_id: id } });
        if (!role) {
            res.status(404).json({ status: "Failure", message: "Role not found" });
        }
        res.json({ status: "Success", result: role });
    } catch (error) {
        handleError(res, error, "Failed to retrieve role");
    }
};

// Create a new role
export const createRole:RequestHandler = async (req: Request, res: Response) => {
    try {
        const { role_name, role_code } = req.body;
        const newRole = await models.Roles.create({
            role_name,
            role_code,
        });

        if (!newRole) {
            res.status(400).json({ status: "Failure", message: "Failed to create role" });
        }

        res.status(201).json({ status: "Success", message: "Role created successfully" });
    } catch (error) {
        handleError(res, error, "Failed to create role");
    }
};

// Update a role
export const updateRole:RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { role_name, role_code } = req.body;

        const [isRoleUpdated] = await models.Roles.update(
            { role_name, role_code },
            { where: { role_id: id } }
        );

        if (!isRoleUpdated) {
            res.status(404).json({ status: "Failure", message: "Role not found or update failed" });
        }

        res.json({ status: "Success", message: "Role updated successfully" });
    } catch (error) {
        handleError(res, error, "Failed to update role");
    }
};

// Delete a role
export const deleteRole:RequestHandler = async (req: Request, res: Response)=> {
    try {
        const { id } = req.params;
        const role = await models.Roles.findOne({ where: { role_id: id } });

        if (!role) {
            res.status(404).json({ status: "Failure", message: "Role not found" });
        }

        await models.Roles.destroy({ where: { role_id: id } });

        res.json({ status: "Success", message: "Role deleted successfully" });
    } catch (error) {
        handleError(res, error, "Failed to delete role");
    }
};
