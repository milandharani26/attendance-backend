import { Op, Sequelize, col, fn, where } from "sequelize";
import db from "../helpers/db.helper";
import { request, Request, RequestHandler, Response } from "express";
import models from "../models/index";
import handleError from "../helpers/handleError.helper";
import sequelize from "sequelize";
import bcrypt from "bcrypt"

export const getAllOffices: RequestHandler = async (req: Request, res: Response) => {
    try {
        const allOffices = await models.Offices.findAll({});

        if (!allOffices || allOffices.length === 0) {
            res.status(404).json({ status: "Failure", message: "No offices found" });
        }

        res.status(200).json({ status: "Success", result: allOffices });
    } catch (error) {
        handleError(res, error, "Error fetching all offices");
    }
};

export const getOffice: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const office = await models.Offices.findOne({
            where: { office_id: id },
            attributes: [
                [Sequelize.col('User.user_name'), 'userName'],
                [Sequelize.col('User.user_id'), 'userId'],
                [Sequelize.col('User.user_email'), 'userEmail'],
                [Sequelize.col('User.user_password'), 'userPassword'],
                [Sequelize.col('User.user_birthday'), 'userBirthday'],
                [Sequelize.col('User.user_age'), 'userAge'],
                ["office_name", "officeName"],
                ["office_location", "officeLocation"],
                ["office_email", "officeEmail"],
            ],
            include: [
                {
                    model: models.Users,
                    attributes: []
                },
            ],
            raw: true
        });

        if (!office) {
            res.status(404).json({ status: "Failure", message: "Office not found" });
        }

        res.status(200).json({ status: "Success", result: office });
    } catch (error) {
        handleError(res, error, "Error fetching office");
    }
};

export const createOffice: RequestHandler = async (req: Request, res: Response) => {
    const {
        office_name,
        office_location,
        office_email,
        org_id,
        user_name,
        user_email,
        user_password,
        user_birthday,
        user_age
    } = req.body;

    try {


        const officeAdminRole = await models.Roles.findOne({
            where: { role_name: "officeAdmin" },
        });

        const role_id = officeAdminRole?.dataValues.role_id;

        const userPassword = await bcrypt.hash(user_password, 10)

        const newUser = await models.Users.create({
            user_name,
            user_email,
            user_password: userPassword,
            user_birthday,
            role_id,
            org_id,
            user_age
        });

        const newOffice = await models.Offices.create({
            office_name,
            office_location,
            office_email,
            org_id,
            user_id: newUser.dataValues.user_id
        });

        const updateOfficeUser = await models.Users.update({ office_id: newOffice.dataValues.office_id }, { where: { user_email } })

        if (!newOffice) {
            res.status(400).json({ status: "Failure", message: "Error creating office" });
        }

        res.status(201).json({ status: "Success", message: "Office created successfully" });
    } catch (error) {
        handleError(res, error, "Error creating office");
    }
};

export const updateOffice: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        office_name,
        office_location,
        office_email,
        org_id,
        user_name,
        user_email,
        user_password,
        user_birthday,
        user_age,
        user_id
    } = req.body;

    const transaction = await db.sequelize.transaction()

    try {
        const [isOrgUpdated] = await models.Offices.update(
            {
                office_name,
                office_location,
                office_email,
                org_id,
            },
            { where: { office_id: id }, transaction }
        );

        const [isUserUpdated] = await models.Users.update({
            user_name,
            user_email,
            user_password,
            user_birthday,
            user_age,
        }, { where: { user_id }, transaction })


        if (isUserUpdated === 0) {
            res.status(404).json({ status: "Failure", message: "user not found or no changes made" })
        }

        if (isOrgUpdated === 0) {
            res.status(404).json({ status: "Failure", message: "Office not found or no changes made" });
        }
        transaction.commit()
        res.json({ status: "Success", message: "Office updated successfully" });
    } catch (error) {
        transaction.rollback()
        handleError(res, error, "Error updating office");
    }
}

export const getOfficesByOrgId: RequestHandler = async (req: Request, res: Response) => {
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
            res.status(404).json({
                status: "404 Not Found",
                message: "No offices found for the provided org_id",
            });
        }

        res.status(200).json({
            status: "Success",
            data: offices,
        });
    } catch (error) {
        console.error("Error fetching offices:", error);
        handleError(res, error, "Error fetching offices");
    }
};

export const deleteOffice: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const office = await models.Offices.findOne({ where: { office_id: id } });

        if (!office) {
            res.status(404).json({ status: "Failure", message: "Office not found" });
        }

        await models.Offices.destroy({ where: { office_id: id } });

        res.json({ status: "Success", message: "Office deleted successfully" });
    } catch (error) {
        handleError(res, error, "Error deleting office");
    }
};


