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
exports.deletePayment = exports.updatePayment = exports.createPayments = exports.getPayment = exports.getAllPayments = void 0;
const index_1 = __importDefault(require("../models/index"));
const handleError_helper_1 = __importDefault(require("../helpers/handleError.helper"));
const getAllPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPayments = yield index_1.default.Payments.findAll({});
        if (!allPayments || allPayments.length === 0) {
            res.json({ status: "No Payments found" });
        }
        res.json({ result: allPayments });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error fetching payments");
    }
});
exports.getAllPayments = getAllPayments;
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const payment = yield index_1.default.Payments.findOne({ where: { payment_id: id } });
        if (!payment) {
            res.json({ result: "Payment not found" });
        }
        res.json({ result: payment });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error fetching payment");
    }
});
exports.getPayment = getPayment;
const createPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { payment_amount, payment_date, org_id } = req.body;
    try {
        const newPayment = yield index_1.default.Payments.create({
            payment_amount,
            payment_date,
            org_id,
        });
        res.status(201).json({ status: "Success Payment", payment: newPayment });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error creating payment");
    }
});
exports.createPayments = createPayments;
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { payment_amount, payment_date, org_id } = req.body;
    try {
        const [isPaymentUpdated] = yield index_1.default.Payments.update({
            payment_amount,
            payment_date,
            org_id,
        }, { where: { payment_id: id } });
        if (isPaymentUpdated === 0) {
            res.status(404).json({
                status: "404 Not Found",
                message: "Payment not found or no changes made",
            });
        }
        res.json({ status: "Successfully updated Payment" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error updating payment");
    }
});
exports.updatePayment = updatePayment;
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Find the payment to ensure it exists
        const payment = yield index_1.default.Payments.findOne({
            where: { payment_id: id },
        });
        if (!payment) {
            res.status(404).json({ status: "Failure", message: "Payment not found" });
        }
        // Delete the payment
        yield index_1.default.Payments.destroy({ where: { payment_id: id } });
        res.json({ status: "Success", message: "Payment deleted successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error deleting payment");
    }
});
exports.deletePayment = deletePayment;
