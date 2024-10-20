import { Op, col, fn } from "sequelize";
import { Request, Response } from "express";
import db from "../helpers/db.helper";
import models from "../models/index";

// Define types for user creation and update
interface UserCreationAttributes {
    user_name: string;
    user_email: string;
    user_password: string;
    user_birthday: Date;
    role_id: number;
    org_id: number;
}

// Get all users
export const getAllUsers = async function (req: Request, res: Response): Promise<Response> {
    try {
        const allUsers = await models.Users.findAll({});
        if (!allUsers || allUsers.length === 0) {
            return res.json({ status: "No Users found" });
        }
        return res.json({ status: "success", result: allUsers });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ status: "Failure", message: "Error fetching users" });
    }
};

// Get a specific user by ID
export const getUser = async function (req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
        const user = await models.Users.findOne({ where: { user_id: id } });

        if (!user) {
            return res.status(404).json({ result: "user not found" });
        }

        return res.json({ result: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ status: "Failure", message: "Error fetching user" });
    }
};

// Create a new user
export const createUser = async function (req: Request, res: Response): Promise<Response> {
    const {
        user_name,
        user_email,
        user_password,
        user_birthday,
        role_id,
        org_id,
    }: UserCreationAttributes = req.body;

    try {
        const newUser = await models.Users.create({
            user_name,
            user_email,
            user_password,
            user_birthday,
            role_id,
            org_id,
        });

        if (!newUser) {
            return res.status(400).json({ status: "404 client side error" });
        }

        return res.status(201).json({ status: "Success create User" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ status: "Failure", message: "Error creating user" });
    }
};

// Update an existing user
export const updateUser = async function (req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
        user_name,
        user_email,
        user_password,
        user_birthday,
        role_id,
        org_id,
    }: UserCreationAttributes = req.body;

    try {
        const [isUserUpdated] = await models.Users.update(
            {
                user_name,
                user_email,
                user_password,
                user_birthday,
                role_id,
                org_id,
            },
            { where: { user_id: id } }
        );

        if (!isUserUpdated) {
            return res.status(400).json({ status: "404 client side error" });
        }

        return res.json({ status: "Success update User" });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ status: "Failure", message: "Error updating user" });
    }
};

// Delete a user by ID
export const deleteUser = async function (req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
        // Find the User to ensure it exists
        const user = await models.Users.findOne({ where: { user_id: id } });

        if (!user) {
            return res.status(404).json({ status: "Failure", message: "User not found" });
        }

        // Delete the User
        await models.Users.destroy({ where: { user_id: id } });

        return res.json({ status: "Success", message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ status: "Failure", message: "Error deleting user", error });
    }
};



