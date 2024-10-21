import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper";
import { request, Request, RequestHandler, Response } from "express";
import models from "../models/index";
import handleError from "../helpers/handleError.helper";


// Get all plans
export const getAllPlans:RequestHandler = async (req: Request, res: Response) => {
    try {
        const allPlans = await models.Plans.findAll({});
        if (!allPlans || allPlans.length === 0) {
            res.status(404).json({ status: "Failure", message: "No plans found" });
        }
        res.json({ status: "Success", result: allPlans });
    } catch (error) {
        handleError(res, error, "Failed to retrieve plans");
    }
};

// Get a specific plan
export const getPlan:RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const plan = await models.Plans.findOne({ where: { plan_id: id } });
        if (!plan) {
            res.status(404).json({ status: "Failure", message: "Plan not found" });
        }
        res.json({ status: "Success", result: plan });
    } catch (error) {
        handleError(res, error, "Failed to retrieve plan");
    }
};

// Create a new plan
export const createPlan:RequestHandler = async (req: Request, res: Response) => {
    try {
        const { plan_amount, plan_description, plan_type, plan_duration } = req.body;

        const newPlan = await models.Plans.create({
            plan_amount,
            plan_description,
            plan_type,
            plan_duration
        });

        if (!newPlan) {
            res.status(400).json({ status: "Failure", message: "Failed to create plan" });
        }

        res.status(201).json({ status: "Success", message: "Plan created successfully" });
    } catch (error) {
        handleError(res, error, "Failed to create plan");
    }
};

// Update a plan
export const updatePlan:RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { plan_amount, plan_description, plan_type, plan_duration } = req.body;

        const [isPlanUpdated] = await models.Plans.update(
            { plan_amount, plan_description, plan_type, plan_duration },
            { where: { plan_id: id } }
        );

        if (!isPlanUpdated) {
            res.status(404).json({ status: "Failure", message: "Plan not found or update failed" });
        }

        res.json({ status: "Success", message: "Plan updated successfully" });
    } catch (error) {
        handleError(res, error, "Failed to update plan");
    }
};

// Delete a plan
export const deletePlan:RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Find the plan to ensure it exists
        const plan = await models.Plans.findOne({ where: { plan_id: id } });

        if (!plan) {
            res.status(404).json({ status: "Failure", message: "Plan not found" });
        }

        // Delete the plan
        await models.Plans.destroy({ where: { plan_id: id } });

        res.json({ status: "Success", message: "Plan deleted successfully" });
    } catch (error) {
        handleError(res, error, "Failed to delete plan");
    }
};


