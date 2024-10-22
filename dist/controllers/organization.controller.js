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
exports.deleteOrganization = exports.updateOrganization = exports.createOrganization = exports.getOrganization = exports.getAllOrganizations = void 0;
const index_1 = __importDefault(require("../models/index"));
const handleError_helper_1 = __importDefault(require("../helpers/handleError.helper"));
const getAllOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrganizations = yield index_1.default.Organizations.findAll({});
        if (!allOrganizations || allOrganizations.length === 0) {
            res.status(404).json({ status: "Failure", message: "No organizations found" });
        }
        res.status(200).json({ status: "Success", result: allOrganizations });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error fetching organizations");
    }
});
exports.getAllOrganizations = getAllOrganizations;
const getOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const organization = yield index_1.default.Organizations.findOne({ where: { org_id: id } });
        if (!organization) {
            res.status(404).json({ status: "Failure", message: "Organization not found" });
        }
        res.status(200).json({ status: "Success", result: organization });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error fetching organization");
    }
});
exports.getOrganization = getOrganization;
const createOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { org_name, org_email } = req.body;
    try {
        const newOrganization = yield index_1.default.Organizations.create({ org_name, org_email });
        res.status(201).json({ status: "Success", message: "Organization created successfully", organization: newOrganization });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error creating organization");
    }
});
exports.createOrganization = createOrganization;
const updateOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { org_email, org_name } = req.body;
    try {
        const [isOrgUpdated] = yield index_1.default.Organizations.update({ org_email, org_name }, { where: { org_id: id } });
        if (isOrgUpdated === 0) {
            res.status(404).json({ status: "Failure", message: "Organization not found or no changes made" });
        }
        res.json({ status: "Success", message: "Organization updated successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error updating organization");
    }
});
exports.updateOrganization = updateOrganization;
const deleteOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const organization = yield index_1.default.Organizations.findOne({ where: { org_id: id } });
        if (!organization) {
            res.status(404).json({ status: "Failure", message: "Organization not found" });
        }
        yield index_1.default.Organizations.destroy({ where: { org_id: id } });
        res.json({ status: "Success", message: "Organization deleted successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error deleting organization");
    }
});
exports.deleteOrganization = deleteOrganization;
