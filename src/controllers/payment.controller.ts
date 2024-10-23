import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper";
import { request, Request, RequestHandler, Response } from "express";
import models from "../models/index";
import handleError from "../helpers/handleError.helper";
import crypto from "node:crypto";
import dotenv from "dotenv";
import Razorpay from "razorpay";

dotenv.config();

export const getAllPayments: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const allPayments = await models.Payments.findAll({});
    if (!allPayments || allPayments.length === 0) {
      res.json({ status: "No Payments found" });
    }
    res.json({ result: allPayments });
  } catch (error) {
    handleError(res, error, "Error fetching payments");
  }
};

export const getPayment: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const payment = await models.Payments.findOne({
      where: { payment_id: id },
    });
    if (!payment) {
      res.json({ result: "Payment not found" });
    }
    res.json({ result: payment });
  } catch (error) {
    handleError(res, error, "Error fetching payment");
  }
};

export const createPayments: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { payment_amount, payment_date, org_id } = req.body;

  try {
    const newPayment = await models.Payments.create({
      payment_amount,
      payment_date,
      org_id,
    });

    res.status(201).json({ status: "Success Payment", payment: newPayment });
  } catch (error) {
    handleError(res, error, "Error creating payment");
  }
};

export const updatePayment: RequestHandler = async (
  req: Request,
  res: Response
) => {
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
      res.status(404).json({
        status: "404 Not Found",
        message: "Payment not found or no changes made",
      });
    }

    res.json({ status: "Successfully updated Payment" });
  } catch (error) {
    handleError(res, error, "Error updating payment");
  }
};

export const deletePayment: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    // Find the payment to ensure it exists
    const payment = await models.Payments.findOne({
      where: { payment_id: id },
    });

    if (!payment) {
      res.status(404).json({ status: "Failure", message: "Payment not found" });
    }

    // Delete the payment
    await models.Payments.destroy({ where: { payment_id: id } });

    res.json({ status: "Success", message: "Payment deleted successfully" });
  } catch (error) {
    handleError(res, error, "Error deleting payment");
  }
};

export const order: RequestHandler = async (
    req: Request, 
    res: Response
) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;

    const order = await razorpay.orders.create(options);

    if (!order) {
      res.status(500).json({ msg: "error" });
    }

    res.json({ status: "success", order });
  } catch (error) {
    handleError(res, error, "Error making order");
  }
};

export const validateOrder: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const secret = process.env.RAZORPAY_SECRET as string;
  if (!secret) {
    res
      .status(500)
      .json({ status: "error", msg: "RAZORPAY_SECRET not configured" });
    return;
  }

  const sha = crypto.createHmac("sha256", secret);

  //order_id + "/" + "razorpay_payment_id"
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    res
      .status(400)
      .json({ status: "success", msg: "Transaction is not legit" });
  }

  res.json({
    status: "Success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
};
