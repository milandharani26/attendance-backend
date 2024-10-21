import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper";
import { request, Request, RequestHandler, Response } from "express";
import models from "../models/index";
import handleError from "../helpers/handleError.helper";


export const getAllOrganizations:RequestHandler = async (req: Request, res: Response)=> {
    try {
        const allOrganizations = await models.Organizations.findAll({});
        
        if (!allOrganizations || allOrganizations.length === 0) {
            res.status(404).json({ status: "Failure", message: "No organizations found" });
        }

        res.status(200).json({ status: "Success", result: allOrganizations });
    } catch (error) {
        handleError(res, error, "Error fetching organizations");
    }
};

export const getOrganization:RequestHandler = async (req: Request, res: Response)=> {
    const { id } = req.params;

    try {
        const organization = await models.Organizations.findOne({ where: { org_id: id } });

        if (!organization) {
            res.status(404).json({ status: "Failure", message: "Organization not found" });
        }

        res.status(200).json({ status: "Success", result: organization });
    } catch (error) {
        handleError(res, error, "Error fetching organization");
    }
};

export const createOrganization:RequestHandler = async (req: Request, res: Response)=> {
    const { org_name, org_email } = req.body;

    try {
        const newOrganization = await models.Organizations.create({ org_name, org_email });

        res.status(201).json({ status: "Success", message: "Organization created successfully", organization: newOrganization });
    } catch (error) {
        handleError(res, error, "Error creating organization");
    }
};

export const updateOrganization:RequestHandler = async (req: Request, res: Response)=> {
    const { id } = req.params;
    const { org_email, org_name } = req.body;

    try {
        const [isOrgUpdated] = await models.Organizations.update(
            { org_email, org_name },
            { where: { org_id: id } }
        );

        if (isOrgUpdated === 0) {
            res.status(404).json({ status: "Failure", message: "Organization not found or no changes made" });
        }

        res.json({ status: "Success", message: "Organization updated successfully" });
    } catch (error) {
        handleError(res, error, "Error updating organization");
    }
};

export const deleteOrganization:RequestHandler = async (req: Request, res: Response)=> {
    const { id } = req.params;

    try {
        const organization = await models.Organizations.findOne({ where: { org_id: id } });

        if (!organization) {
            res.status(404).json({ status: "Failure", message: "Organization not found" });
        }

        await models.Organizations.destroy({ where: { org_id: id } });

        res.json({ status: "Success", message: "Organization deleted successfully" });
    } catch (error) {
        handleError(res, error, "Error deleting organization");
    }
};


