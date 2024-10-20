import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper.js";
import { request, Request, Response } from "express";
import models from "../models/index.js";
import handleError from "../helpers/handleError.helper.js";


// Get all roles
export const getAllRoles = async (req: Request, res: Response): Promise<Response> => {
    try {
        const allRoles = await models.Roles.findAll({});
        if (!allRoles || allRoles.length === 0) {
            return res.status(404).json({ status: "Failure", message: "No roles found" });
        }
        return res.json({ status: "Success", result: allRoles });
    } catch (error) {
        return handleError(res, error, "Failed to retrieve roles");
    }
};

// Get a specific role
export const getRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const role = await models.Roles.findOne({ where: { role_id: id } });
        if (!role) {
            return res.status(404).json({ status: "Failure", message: "Role not found" });
        }
        return res.json({ status: "Success", result: role });
    } catch (error) {
        return handleError(res, error, "Failed to retrieve role");
    }
};

// Create a new role
export const createRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { role_name, role_code } = req.body;
        const newRole = await models.Roles.create({
            role_name,
            role_code,
        });

        if (!newRole) {
            return res.status(400).json({ status: "Failure", message: "Failed to create role" });
        }

        return res.status(201).json({ status: "Success", message: "Role created successfully" });
    } catch (error) {
        return handleError(res, error, "Failed to create role");
    }
};

// Update a role
export const updateRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { role_name, role_code } = req.body;

        const [isRoleUpdated] = await models.Roles.update(
            { role_name, role_code },
            { where: { role_id: id } }
        );

        if (!isRoleUpdated) {
            return res.status(404).json({ status: "Failure", message: "Role not found or update failed" });
        }

        return res.json({ status: "Success", message: "Role updated successfully" });
    } catch (error) {
        return handleError(res, error, "Failed to update role");
    }
};

// Delete a role
export const deleteRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const role = await models.Roles.findOne({ where: { role_id: id } });

        if (!role) {
            return res.status(404).json({ status: "Failure", message: "Role not found" });
        }

        await models.Roles.destroy({ where: { role_id: id } });

        return res.json({ status: "Success", message: "Role deleted successfully" });
    } catch (error) {
        return handleError(res, error, "Failed to delete role");
    }
};
