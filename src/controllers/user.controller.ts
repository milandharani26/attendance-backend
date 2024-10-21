import { Op, col, fn } from "sequelize";
import { NextFunction, Request, RequestHandler, Response } from "express";
import db from "../helpers/db.helper";
import models from "../models/index";
import  bcrypt from "bcrypt"

// Define types for user creation and update
interface UserCreationAttributes {
    user_name: string;
    user_email: string;
    user_password: string;
    user_birthday: Date;
    user_age:string;
    role_id: string;
    org_id: string;
}

// Get all users
export const getAllUsers: RequestHandler = async function (req: Request, res: Response, next: NextFunction) {
    try {
        const allUsers = await models.Users.findAll({});
        if (!allUsers || allUsers.length === 0) {
            res.json({ status: "No Users found" });
        } else {
            res.json({ status: "success", result: allUsers });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ status: "Failure", message: "Error fetching users" });
    }
};

// Get a specific user by ID
export const getUser:RequestHandler = async function (req: Request, res: Response){
    const { id } = req.params;
    try {
        const user = await models.Users.findOne({ where: { user_id: id } });

        if (!user) {
            res.status(404).json({ result: "user not found" });
        }

        res.json({ result: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ status: "Failure", message: "Error fetching user" });
    }
};

// Create a new user
export const createUser:RequestHandler = async function (req: Request, res: Response){

    console.log("Request body:------------------", req.body)

    const {
        user_name,
        user_email,
        user_password,
        user_birthday,
        role_id,
        user_age,
        org_id,
    }: UserCreationAttributes = req.body;

    const hashedPassword = await bcrypt.hash(user_password, 10);

    try {
        const newUser = await models.Users.create({
            user_name,
            user_email,
            user_password : hashedPassword,
            user_birthday,
            role_id,
            user_age,
            org_id,
        });

        if (!newUser) {
            res.status(400).json({ status: "404 client side error" });
        }

        res.status(201).json({ status: "Success create User" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ status: "Failure", message: "Error creating user" });
    }
};

// Update an existing user
export const updateUser:RequestHandler = async function (req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const {
        user_name,
        user_email,
        // user_password, // we disable from front end 
        user_birthday,
        role_id,
        user_age,
        org_id,
    }: UserCreationAttributes = req.body;

    try {
        const [isUserUpdated] = await models.Users.update(
            {
                user_name,
                user_email,
                // user_password,
                user_birthday,
                role_id,
                user_age,
                org_id,
            },
            { where: { user_id: id } }
        );

        if (!isUserUpdated) {
            res.status(400).json({ status: "404 client side error" });
        }

        res.json({ status: "Success update User" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ status: "Failure", message: "Error updating user" });
    }
};

// Delete a user by ID
export const deleteUser:RequestHandler = async function (req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        // Find the User to ensure it exists
        const user = await models.Users.findOne({ where: { user_id: id } });

        if (!user) {
            res.status(404).json({ status: "Failure", message: "User not found" });
        }

        // Delete the User
        await models.Users.destroy({ where: { user_id: id } });

        res.json({ status: "Success", message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ status: "Failure", message: "Error deleting user", error });
    }
};



