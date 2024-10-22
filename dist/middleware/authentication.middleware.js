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
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // Check if the token is not provided
    if (!token) {
        res.status(401).json({
            status: "false",
            message: "Access denied. No token provided.",
        });
        return; // Use return to exit the function here
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Log the decoded information for debugging
        console.log("Decoded token:", decoded);
        // Check if the decoded payload contains userId
        if (!decoded.userId) {
            res.status(400).json({
                status: "false",
                message: "Invalid token payload. User ID is missing.",
            });
            return; // Use return to exit the function here
        }
        // Find the user by userId
        const user = yield user_model_1.default.findOne({ where: { user_id: decoded.userId } });
        // If user not found in the database
        if (!user) {
            res.status(404).json({
                status: "false",
                message: "User not found. The token might be invalid.",
            });
            return; // Use return to exit the function here
        }
        // Check if the current token matches the token stored in the database
        // if (user.currentToken !== token) {
        //   res.status(401).json({
        //     status: "false",
        //     message: "Token mismatch. Please log in again.",
        //   });
        //   return; // Use return to exit the function here
        // }
        // Attach user data to the request for further processing in the next middleware
        req.user = {
            userId: user.user_id,
            role: user.role_id,
        };
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        // Log the error for debugging purposes
        console.error("Error verifying token:", error);
        // Check if the error is a JWT error
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            console.error("JWT Error:", error); // Log specific JWT error
            res.status(403).json({
                status: "false",
                message: "Invalid token format or signature.",
            });
            return; // Exit after sending the response
        }
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            console.error("Token has expired."); // Log token expiration
            res.status(401).json({
                status: "false",
                message: "Token has expired. Please log in again.",
            });
            return; // Exit after sending the response
        }
        // Generic error response for other cases
        res.status(500).json({
            status: "false",
            message: "An error occurred while processing the token.",
        });
    }
});
exports.authenticateToken = authenticateToken;
