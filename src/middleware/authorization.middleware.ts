import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import models from "../models"; // Adjust the path if needed

// Define a custom request interface that extends the default Request to include the user ID or token data
interface CustomRequest extends Request {
  user?: JwtPayload | string; // Adjust based on how you store token data
}

// Middleware to check if user has the required permission
export const checkPermission = (requiredPermission: string) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: "Authorization token is required" });
      }

      // Verify the JWT token
      const decoded = jwt.verify(token, "password") as JwtPayload;
      req.user = decoded;

      console.log(decoded, "Decoded token");

      const { id } = req.params; // Assuming you have `role_id` in params

      const rolePermission = await models.RolePermissions.findAll({
        where: { role_id: id },
        include: [
          {
            model: models.Permissions,
            as: "permission",
            attributes: ["permission_code"],
          },
        ],
      });

      const allPermissionForRole = rolePermission.map((permission) => permission.permission.permission_code);

      // Check if the user has the required permission
      if (allPermissionForRole.includes(requiredPermission)) {
        return next(); // User has the permission, proceed to the next middleware/route
      }

      return res.status(403).json({ message: "User not authorized" });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  };
};
