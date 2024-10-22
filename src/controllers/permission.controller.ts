import { Request, Response } from "express";
import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper.js";
import models from "../models/index.js";

// Define types for request and response
interface PermissionRequest extends Request {
  params: {
    id: string;
  };
  body: {
    permission_code: string;
    permission_name: string;
  };
}

export const getAllPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const allPermission = await models.Permissions.findAll();
    if (!allPermission) {
      res.json({ status: "No Permission found" });
      return;
    }
    res.json({ result: allPermission });
  } catch (error) {
    res.status(500).json({ status: "Error retrieving permissions", error });
  }
};

export const getPermission = async (req: PermissionRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const permission = await models.Permissions.findOne({ where: { permission_id: id } });
    if (!permission) {
      res.json({ result: "Permission not found" });
      return;
    }
    res.json({ result: permission });
  } catch (error) {
    res.status(500).json({ status: "Error retrieving permission", error });
  }
};

export const createPermission = async (req: PermissionRequest, res: Response): Promise<void> => {
  const { permission_code, permission_name } = req.body;

  try {
    const newPermission = await models.Permissions.create({
      permission_code,
      permission_name,
    });

    if (!newPermission) {
      res.status(400).json({ status: "404 client-side error" });
      return;
    }

    res.status(201).json({ status: "Success, created permission" });
  } catch (error) {
    res.status(500).json({ status: "Error creating permission", error });
  }
};

export const updatePermission = async (req: PermissionRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { permission_code, permission_name } = req.body;

  try {
    const [isPermissionUpdated] = await models.Permissions.update(
      {
        permission_code,
        permission_name,
      },
      { where: { permission_id: id } }
    );

    if (!isPermissionUpdated) {
      res.status(400).json({ status: "404 client-side error" });
      return;
    }

    res.json({ status: "Success, updated permission" });
  } catch (error) {
    res.status(500).json({ status: "Error updating permission", error });
  }
};

export const deletePermission = async (req: PermissionRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const permission = await models.Permissions.findOne({ where: { permission_id: id } });

    if (!permission) {
      res.status(404).json({ status: "Failure", message: "Permission not found" });
      return;
    }

    await models.Permissions.destroy({ where: { permission_id: id } });

    res.json({ status: "Success", message: "Permission deleted successfully" });
  } catch (error) {
    console.error("Error deleting permission:", error);
    res.status(500).json({ status: "Failure", message: "Error deleting permission", error });
  }
};
