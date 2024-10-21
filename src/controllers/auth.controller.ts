import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from "nodemailer";
import { CustomRequest } from "../types/express";
import Users from "../models/user.model";
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER; // Your email address
const EMAIL_PASS = process.env.EMAIL_PASS; // Your email password or app password

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

// Create a token function
const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, "password", {
        expiresIn: "1h", // Token expiration time
    });
};



export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { user_email, user_password } = req.body;

    try {
        const user = await Users.findOne({ where: { user_email } });

        if (!user) {
            res.status(401).json({
                status: "false",
                message: "Invalid email or password",
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(user_password, user.user_password);

        if (!isPasswordValid) {
            res.status(401).json({
                status: "false",
                message: "Invalid email or password",
            });
            return;
        }

        // Generate a new token
        const token = generateToken(user.user_id);

        // Update the currentToken in the database
        // user.currentToken = token;
        await user.save();

        res.status(200).json({
            status: "true",
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            status: "false",
            message: "An error occurred while logging in.",
        });
    }
};

export const logoutUser = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        // Check if the userId is present in the request
        // const userId = req.user;

        const { userId } = req.body

        if (!userId) {
            res.status(400).json({
                status: "false",
                message: "Users ID is missing.",
            });
            return;
        }

        // Find the user and clear the current token
        const user = await Users.findOne({ where: { user_id: userId } });

        if (user) {
            //   user.currentToken = null; // Clear the current token
            //   await user.save();

            res.status(200).json({
                status: "true",
                message: "Users logged out successfully.",
            });
        } else {
            res.status(404).json({
                status: "false",
                message: "Users not found.",
            });
        }
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({
            status: "false",
            message: "An error occurred while logging out.",
        });
    }
};


// Controller to handle forgot password
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { user_email } = req.body;

    try {
        const user = await Users.findOne({ where: { user_email } });

        if (!user) {
            res.status(404).json({
                status: "false",
                message: "Users not found.",
            });
            return;
        }

        // Generate reset token
        const resetToken = generateToken(user.user_id);

        // Send email with the token
        await transporter.sendMail({
            from: EMAIL_USER,
            to: user_email,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset. Use the token below to reset your password within the app:</p>
             <p><strong>${resetToken}</strong></p>`,
        });

        res.status(200).json({
            status: "true",
            message: "Reset token sent to your email.",
        });
    } catch (error) {
        console.error("Error sending reset password email:", error);
        res.status(500).json({
            status: "false",
            message: "An error occurred while sending reset password email.",
        });
    }
};


// Controller to handle reset password
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token, newPassword } = req.body;

    try {
        // Verify the token
        const decoded = jwt.verify(token, "password") as { userId: string };

        // Find the user
        const user = await Users.findOne({ where: { user_id: decoded.userId } });

        if (!user) {
            res.status(404).json({
                status: "false",
                message: "Users not found.",
            });
            return;
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.user_password = hashedPassword;
        await user.save();

        res.status(200).json({
            status: "true",
            message: "Password reset successfully.",
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({
            status: "false",
            message: "An error occurred while resetting the password.",
        });
    }
};



