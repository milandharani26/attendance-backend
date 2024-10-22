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
exports.deletePlan = exports.updatePlan = exports.createPlan = exports.getPlan = exports.getAllPlans = void 0;
const index_1 = __importDefault(require("../models/index"));
const handleError_helper_1 = __importDefault(require("../helpers/handleError.helper"));
// Get all plans
const getAllPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPlans = yield index_1.default.Plans.findAll({});
        if (!allPlans || allPlans.length === 0) {
            res.status(404).json({ status: "Failure", message: "No plans found" });
        }
        res.json({ status: "Success", result: allPlans });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Failed to retrieve plans");
    }
});
exports.getAllPlans = getAllPlans;
// Get a specific plan
const getPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const plan = yield index_1.default.Plans.findOne({ where: { plan_id: id } });
        if (!plan) {
            res.status(404).json({ status: "Failure", message: "Plan not found" });
        }
        res.json({ status: "Success", result: plan });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Failed to retrieve plan");
    }
});
exports.getPlan = getPlan;
// Create a new plan
const createPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { plan_amount, plan_description, plan_type, plan_duration } = req.body;
        const newPlan = yield index_1.default.Plans.create({
            plan_amount,
            plan_description,
            plan_type,
            plan_duration
        });
        if (!newPlan) {
            res.status(400).json({ status: "Failure", message: "Failed to create plan" });
        }
        res.status(201).json({ status: "Success", message: "Plan created successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Failed to create plan");
    }
});
exports.createPlan = createPlan;
// Update a plan
const updatePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { plan_amount, plan_description, plan_type, plan_duration } = req.body;
        const [isPlanUpdated] = yield index_1.default.Plans.update({ plan_amount, plan_description, plan_type, plan_duration }, { where: { plan_id: id } });
        if (!isPlanUpdated) {
            res.status(404).json({ status: "Failure", message: "Plan not found or update failed" });
        }
        res.json({ status: "Success", message: "Plan updated successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Failed to update plan");
    }
});
exports.updatePlan = updatePlan;
// Delete a plan
const deletePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Find the plan to ensure it exists
        const plan = yield index_1.default.Plans.findOne({ where: { plan_id: id } });
        if (!plan) {
            res.status(404).json({ status: "Failure", message: "Plan not found" });
        }
        // Delete the plan
        yield index_1.default.Plans.destroy({ where: { plan_id: id } });
        res.json({ status: "Success", message: "Plan deleted successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Failed to delete plan");
    }
});
exports.deletePlan = deletePlan;
