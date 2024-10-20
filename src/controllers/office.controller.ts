import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper.js";
import { request, Request, Response } from "express";
import models from "../models/index.js";
import handleError from "../helpers/handleError.helper.js";

export const getAllOffices = async (req: Request, res: Response): Promise<Response> => {
    try {
        const allOffices = await models.Offices.findAll({});
        
        if (!allOffices || allOffices.length === 0) {
            return res.status(404).json({ status: "Failure", message: "No offices found" });
        }
        
        return res.status(200).json({ status: "Success", result: allOffices });
    } catch (error) {
        return handleError(res, error, "Error fetching all offices");
    }
};

export const getOffice = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const office = await models.Offices.findOne({ where: { office_id: id } });

        if (!office) {
            return res.status(404).json({ status: "Failure", message: "Office not found" });
        }

        return res.status(200).json({ status: "Success", result: office });
    } catch (error) {
        return handleError(res, error, "Error fetching office");
    }
};

export const createOffice = async (req: Request, res: Response): Promise<Response> => {
    const {
        office_name,
        office_location,
        office_email,
        org_id,
        user_name,
        user_email,
        user_password,
        user_birthday,
    } = req.body;

    try {
        const newOffice = await models.Offices.create({
            office_name,
            office_location,
            office_email,
            org_id,
        });

        const officeAdminRole = await models.Roles.findOne({
            where: { role_name: "officeAdmin" },
        });

        const role_id = officeAdminRole?.dataValues.role_id;

        const newUser = await models.Users.create({
            user_name,
            user_email,
            user_password,
            user_birthday,
            role_id,
            org_id,
        });

        if (!newOffice) {
            return res.status(400).json({ status: "Failure", message: "Error creating office" });
        }

        return res.status(201).json({ status: "Success", message: "Office created successfully" });
    } catch (error) {
        return handleError(res, error, "Error creating office");
    }
};

export const updateOffice = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const {
        office_name,
        office_location,
        office_email,
        org_id,
    } = req.body;

    try {
        const [isOrgUpdated] = await models.Offices.update(
            {
                office_name,
                office_location,
                office_email,
                org_id,
            },
            { where: { office_id: id } }
        );

        if (isOrgUpdated === 0) {
            return res.status(404).json({ status: "Failure", message: "Office not found or no changes made" });
        }

        return res.json({ status: "Success", message: "Office updated successfully" });
    } catch (error) {
        return handleError(res, error, "Error updating office");
    }
};

export const getOfficesByOrgId = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const offices = await models.Offices.findAll({
            where: { org_id: id },
            include: [
                {
                    model: models.Organizations,
                    as: 'organization',
                    attributes: ['org_name', 'org_email'],
                },
            ],
        });

        if (offices.length === 0) {
            return res.status(404).json({
                status: "404 Not Found",
                message: "No offices found for the provided org_id",
            });
        }

        return res.status(200).json({
            status: "Success",
            data: offices,
        });
    } catch (error) {
        console.error("Error fetching offices:", error);
        return handleError(res, error, "Error fetching offices");
    }
};

export const deleteOffice = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const office = await models.Offices.findOne({ where: { office_id: id } });

        if (!office) {
            return res.status(404).json({ status: "Failure", message: "Office not found" });
        }

        await models.Offices.destroy({ where: { office_id: id } });

        return res.json({ status: "Success", message: "Office deleted successfully" });
    } catch (error) {
        return handleError(res, error, "Error deleting office");
    }
};


