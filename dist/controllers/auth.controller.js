"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.logoutUser = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER; // Your email address
const EMAIL_PASS = process.env.EMAIL_PASS; // Your email password or app password
// Setup Nodemailer transporter
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});
// Create a token function
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, "password", {
        expiresIn: "1h", // Token expiration time
    });
};
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_email, user_password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ where: { user_email } });
        if (!user) {
            res.status(401).json({
                status: "false",
                message: "Invalid email or password",
            });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(user_password, user.user_password);
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
        yield user.save();
        res.status(200).json({
            status: "true",
            message: "Login successful",
            token,
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            status: "false",
            message: "An error occurred while logging in.",
        });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the userId is present in the request
        // const userId = req.user;
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({
                status: "false",
                message: "Users ID is missing.",
            });
            return;
        }
        // Find the user and clear the current token
        const user = yield user_model_1.default.findOne({ where: { user_id: userId } });
        if (user) {
            //   user.currentToken = null; // Clear the current token
            //   await user.save();
            res.status(200).json({
                status: "true",
                message: "Users logged out successfully.",
            });
        }
        else {
            res.status(404).json({
                status: "false",
                message: "Users not found.",
            });
        }
    }
    catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({
            status: "false",
            message: "An error occurred while logging out.",
        });
    }
});
exports.logoutUser = logoutUser;
// Controller to handle forgot password
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_email } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ where: { user_email } });
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
        yield transporter.sendMail({
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
    }
    catch (error) {
        console.error("Error sending reset password email:", error);
        res.status(500).json({
            status: "false",
            message: "An error occurred while sending reset password email.",
        });
    }
});
exports.forgotPassword = forgotPassword;
// Controller to handle reset password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword } = req.body;
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, "password");
        // Find the user
        const user = yield user_model_1.default.findOne({ where: { user_id: decoded.userId } });
        if (!user) {
            res.status(404).json({
                status: "false",
                message: "Users not found.",
            });
            return;
        }
        // Hash the new password
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        // Update the user's password
        user.user_password = hashedPassword;
        yield user.save();
        res.status(200).json({
            status: "true",
            message: "Password reset successfully.",
        });
    }
    catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({
            status: "false",
            message: "An error occurred while resetting the password.",
        });
    }
});
exports.resetPassword = resetPassword;
