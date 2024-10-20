import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper.js";
import { request, Request, Response } from "express";
import models from "../models/index.js";
import handleError from "../helpers/handleError.helper.js";


// Get all plans
export const getAllPlans = async (req: Request, res: Response): Promise<Response> => {
    try {
        const allPlans = await models.Plans.findAll({});
        if (!allPlans || allPlans.length === 0) {
            return res.status(404).json({ status: "Failure", message: "No plans found" });
        }
        return res.json({ status: "Success", result: allPlans });
    } catch (error) {
        return handleError(res, error, "Failed to retrieve plans");
    }
};

// Get a specific plan
export const getPlan = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const plan = await models.Plans.findOne({ where: { plan_id: id } });
        if (!plan) {
            return res.status(404).json({ status: "Failure", message: "Plan not found" });
        }
        return res.json({ status: "Success", result: plan });
    } catch (error) {
        return handleError(res, error, "Failed to retrieve plan");
    }
};

// Create a new plan
export const createPlan = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { plan_amount, plan_description, plan_type, plan_duration } = req.body;

        const newPlan = await models.Plans.create({
            plan_amount,
            plan_description,
            plan_type,
            plan_duration
        });

        if (!newPlan) {
            return res.status(400).json({ status: "Failure", message: "Failed to create plan" });
        }

        return res.status(201).json({ status: "Success", message: "Plan created successfully" });
    } catch (error) {
        return handleError(res, error, "Failed to create plan");
    }
};

// Update a plan
export const updatePlan = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { plan_amount, plan_description, plan_type, plan_duration } = req.body;

        const [isPlanUpdated] = await models.Plans.update(
            { plan_amount, plan_description, plan_type, plan_duration },
            { where: { plan_id: id } }
        );

        if (!isPlanUpdated) {
            return res.status(404).json({ status: "Failure", message: "Plan not found or update failed" });
        }

        return res.json({ status: "Success", message: "Plan updated successfully" });
    } catch (error) {
        return handleError(res, error, "Failed to update plan");
    }
};

// Delete a plan
export const deletePlan = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        // Find the plan to ensure it exists
        const plan = await models.Plans.findOne({ where: { plan_id: id } });

        if (!plan) {
            return res.status(404).json({ status: "Failure", message: "Plan not found" });
        }

        // Delete the plan
        await models.Plans.destroy({ where: { plan_id: id } });

        return res.json({ status: "Success", message: "Plan deleted successfully" });
    } catch (error) {
        return handleError(res, error, "Failed to delete plan");
    }
};


