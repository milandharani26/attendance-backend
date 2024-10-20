import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper.js";
import { request, Request, Response } from "express";
import models from "../models/index.js";
import handleError from "../helpers/handleError.helper.js";

export const getAllPayments = async (req: Request, res: Response): Promise<Response> => {
    try {
        const allPayments = await models.Payments.findAll({});
        if (!allPayments || allPayments.length === 0) {
            return res.json({ status: "No Payments found" });
        }
        return res.json({ result: allPayments });
    } catch (error) {
        return handleError(res, error, "Error fetching payments");
    }
};

export const getPayment = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const payment = await models.Payments.findOne({ where: { payment_id: id } });
        if (!payment) {
            return res.json({ result: "Payment not found" });
        }
        return res.json({ result: payment });
    } catch (error) {
        return handleError(res, error, "Error fetching payment");
    }
};

export const createPayments = async (req: Request, res: Response): Promise<Response> => {
    const { payment_amount, payment_date, org_id } = req.body;

    try {
        const newPayment = await models.Payments.create({
            payment_amount,
            payment_date,
            org_id,
        });

        return res.status(201).json({ status: "Success Payment", payment: newPayment });
    } catch (error) {
        return handleError(res, error, "Error creating payment");
    }
};

export const updatePayment = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { payment_amount, payment_date, org_id } = req.body;

    try {
        const [isPaymentUpdated] = await models.Payments.update(
            {
                payment_amount,
                payment_date,
                org_id,
            },
            { where: { payment_id: id } }
        );

        if (isPaymentUpdated === 0) {
            return res.status(404).json({
                status: "404 Not Found",
                message: "Payment not found or no changes made",
            });
        }

        return res.json({ status: "Successfully updated Payment" });
    } catch (error) {
        return handleError(res, error, "Error updating payment");
    }
};

export const deletePayment = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        // Find the payment to ensure it exists
        const payment = await models.Payments.findOne({
            where: { payment_id: id },
        });

        if (!payment) {
            return res.status(404).json({ status: "Failure", message: "Payment not found" });
        }

        // Delete the payment
        await models.Payments.destroy({ where: { payment_id: id } });

        return res.json({ status: "Success", message: "Payment deleted successfully" });
    } catch (error) {
        return handleError(res, error, "Error deleting payment");
    }
};


