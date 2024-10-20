import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper.js";
import { request, Request, Response } from "express";
import models from "../models/index.js";
import handleError from "../helpers/handleError.helper.js";


export const getAllOrganizations = async (req: Request, res: Response): Promise<Response> => {
    try {
        const allOrganizations = await models.Organizations.findAll({});
        
        if (!allOrganizations || allOrganizations.length === 0) {
            return res.status(404).json({ status: "Failure", message: "No organizations found" });
        }

        return res.status(200).json({ status: "Success", result: allOrganizations });
    } catch (error) {
        return handleError(res, error, "Error fetching organizations");
    }
};

export const getOrganization = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const organization = await models.Organizations.findOne({ where: { org_id: id } });

        if (!organization) {
            return res.status(404).json({ status: "Failure", message: "Organization not found" });
        }

        return res.status(200).json({ status: "Success", result: organization });
    } catch (error) {
        return handleError(res, error, "Error fetching organization");
    }
};

export const createOrganization = async (req: Request, res: Response): Promise<Response> => {
    const { org_name, org_email } = req.body;

    try {
        const newOrganization = await models.Organizations.create({ org_name, org_email });

        return res.status(201).json({ status: "Success", message: "Organization created successfully", organization: newOrganization });
    } catch (error) {
        return handleError(res, error, "Error creating organization");
    }
};

export const updateOrganization = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { org_email, org_name } = req.body;

    try {
        const [isOrgUpdated] = await models.Organizations.update(
            { org_email, org_name },
            { where: { org_id: id } }
        );

        if (isOrgUpdated === 0) {
            return res.status(404).json({ status: "Failure", message: "Organization not found or no changes made" });
        }

        return res.json({ status: "Success", message: "Organization updated successfully" });
    } catch (error) {
        return handleError(res, error, "Error updating organization");
    }
};

export const deleteOrganization = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const organization = await models.Organizations.findOne({ where: { org_id: id } });

        if (!organization) {
            return res.status(404).json({ status: "Failure", message: "Organization not found" });
        }

        await models.Organizations.destroy({ where: { org_id: id } });

        return res.json({ status: "Success", message: "Organization deleted successfully" });
    } catch (error) {
        return handleError(res, error, "Error deleting organization");
    }
};


