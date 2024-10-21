import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequestAuth } from "../types/express";
import Users from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

interface JwtPayload {
  userId: string;
}

export const authenticateToken = async (
  req: CustomRequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Check if the token is provided
  if (!token) {
    res.status(401).json({
      status: "false",
      message: "Access denied. No token provided.",
    });
    return; // Use return to exit the function here
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

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
    const user = await Users.findOne({ where: { user_id: decoded.userId } });
    
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
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error verifying token:", error);

    // Check if the error is a JWT error
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("JWT Error:", error); // Log specific JWT error
      res.status(403).json({
        status: "false",
        message: "Invalid token format or signature.",
      });
      return; // Exit after sending the response
    }

    if (error instanceof jwt.TokenExpiredError) {
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
};


