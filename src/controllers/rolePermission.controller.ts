import { Request, Response } from "express";
import { Op, col, fn } from "sequelize";
import models from "../models/index.js";

// Define types for request and response
interface RolePermissionRequest extends Request {
  params: {
    id: string;
  };
  body: {
    role_id: string;
    role_name: string;
    permission_id: number;
  };
}

export const getAllRolePermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const allRolePermission = await models.RolePermissions.findAll();
    if (!allRolePermission) {
      res.json({ status: "No role permission found" });
      return;
    }
    res.json({ result: allRolePermission });
  } catch (error) {
    res.status(500).json({ status: "Error retrieving role permissions", error });
  }
};

export const getRolePermission = async (req: RolePermissionRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const rolePermission = await models.RolePermissions.findAll({
      where: { role_id: id },
      include: [
        {
          model: models.Permissions,
          as: 'permission',
          attributes: ['permission_code'],
        },
      ],
    });

    if (!rolePermission) {
      res.json({ result: "Permission not found" });
      return;
    }

    const allPermissionForRole = rolePermission.map((permission: any) => permission.permission.permission_code);

    res.json({ result: allPermissionForRole });
  } catch (error) {
    res.status(500).json({ status: "Error retrieving role permission", error });
  }
};

export const createRolePermission = async (req: RolePermissionRequest, res: Response): Promise<void> => {
  const { role_id, role_name, permission_id } = req.body;

  try {
    const newRolePermission = await models.RolePermissions.create({
      role_id,
      role_name,
      permission_id,
    });

    if (!newRolePermission) {
      res.status(400).json({ status: "404 client-side error" });
      return;
    }

    res.status(201).json({ status: "Success, created role permission" });
  } catch (error) {
    res.status(500).json({ status: "Error creating role permission", error });
  }
};

export const updateRolePermission = async (req: RolePermissionRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { role_id, role_name, permission_id } = req.body;

  try {
    const [isRolePermissionUpdated] = await models.RolePermissions.update(
      {
        role_id,
        role_name,
        permission_id,
      },
      { where: { role_permission_id: id } }
    );

    if (!isRolePermissionUpdated) {
      res.status(400).json({ status: "404 client-side error" });
      return;
    }

    res.json({ status: "Success, updated role permission" });
  } catch (error) {
    res.status(500).json({ status: "Error updating role permission", error });
  }
};

export const deleteRolePermission = async (req: RolePermissionRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const rolePermission = await models.RolePermissions.findOne({ where: { role_permission_id: id } });

    if (!rolePermission) {
        res.status(404).json({ status: "Failure", message: "Permission not found" });
    }

    await models.RolePermissions.destroy({ where: { role_permission_id: id } });

    res.json({ status: "Success", message: "Permission deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "Failure", message: "Error deleting permission", error });
  }
};
