import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import models from "../models"; // Adjust the import path for your models
import { CustomRequestAuth } from "../types/express";

// Define custom request interface to handle decoded token data
interface CustomRequest extends Request {

  decoded?: {
    userId: string
  }; // You can define a more specific type for the decoded JWT
}

interface JwtPayload {
  userId: string;
}

export const checkPermission = (requiredPermission: string) => {
  return async (req: CustomRequestAuth, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token: string = req.headers.authorization || "";

      if (!token) {
        res.status(401).json({ message: 'Authorization token is missing' });
      }

      const user = req.user

      const decoded = jwt.verify(token.split(" ")[1], "password") as JwtPayload;


      const rolePermission = await models.RolePermissions.findAll({
        where: { role_id: user?.roleId },
        include: [
          {
            model: models.Permissions,
            as: 'permission',
            attributes: ['permission_code'],
          },
        ],
      });

      const allPermissionForRole = rolePermission.map((permission) => permission.permission.permission_code);

      if (allPermissionForRole.includes(requiredPermission)) {
        return next(); // User has the permission, proceed to the next middleware/route
      }

      res.status(403).json({ message: 'User not authorized' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: "user not authorize" });
    }
  };
};

