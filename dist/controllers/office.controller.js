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
exports.deleteOffice = exports.getOfficesByOrgId = exports.updateOffice = exports.createOffice = exports.getOffice = exports.getAllOffices = void 0;
const index_1 = __importDefault(require("../models/index"));
const handleError_helper_1 = __importDefault(require("../helpers/handleError.helper"));
const getAllOffices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOffices = yield index_1.default.Offices.findAll({});
        if (!allOffices || allOffices.length === 0) {
            res.status(404).json({ status: "Failure", message: "No offices found" });
        }
        res.status(200).json({ status: "Success", result: allOffices });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error fetching all offices");
    }
});
exports.getAllOffices = getAllOffices;
const getOffice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const office = yield index_1.default.Offices.findOne({ where: { office_id: id } });
        if (!office) {
            res.status(404).json({ status: "Failure", message: "Office not found" });
        }
        res.status(200).json({ status: "Success", result: office });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error fetching office");
    }
});
exports.getOffice = getOffice;
const createOffice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { office_name, office_location, office_email, org_id, user_name, user_email, user_password, user_birthday, user_age } = req.body;
    try {
        const newOffice = yield index_1.default.Offices.create({
            office_name,
            office_location,
            office_email,
            org_id,
        });
        const officeAdminRole = yield index_1.default.Roles.findOne({
            where: { role_name: "officeAdmin" },
        });
        const role_id = officeAdminRole === null || officeAdminRole === void 0 ? void 0 : officeAdminRole.dataValues.role_id;
        const newUser = yield index_1.default.Users.create({
            user_name,
            user_email,
            user_password,
            user_birthday,
            role_id,
            org_id,
            user_age
        });
        if (!newOffice) {
            res.status(400).json({ status: "Failure", message: "Error creating office" });
        }
        res.status(201).json({ status: "Success", message: "Office created successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error creating office");
    }
});
exports.createOffice = createOffice;
const updateOffice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { office_name, office_location, office_email, org_id, } = req.body;
    try {
        const [isOrgUpdated] = yield index_1.default.Offices.update({
            office_name,
            office_location,
            office_email,
            org_id,
        }, { where: { office_id: id } });
        if (isOrgUpdated === 0) {
            res.status(404).json({ status: "Failure", message: "Office not found or no changes made" });
        }
        res.json({ status: "Success", message: "Office updated successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error updating office");
    }
});
exports.updateOffice = updateOffice;
const getOfficesByOrgId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const offices = yield index_1.default.Offices.findAll({
            where: { org_id: id },
            include: [
                {
                    model: index_1.default.Organizations,
                    as: 'organization',
                    attributes: ['org_name', 'org_email'],
                },
            ],
        });
        if (offices.length === 0) {
            res.status(404).json({
                status: "404 Not Found",
                message: "No offices found for the provided org_id",
            });
        }
        res.status(200).json({
            status: "Success",
            data: offices,
        });
    }
    catch (error) {
        console.error("Error fetching offices:", error);
        (0, handleError_helper_1.default)(res, error, "Error fetching offices");
    }
});
exports.getOfficesByOrgId = getOfficesByOrgId;
const deleteOffice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const office = yield index_1.default.Offices.findOne({ where: { office_id: id } });
        if (!office) {
            res.status(404).json({ status: "Failure", message: "Office not found" });
        }
        yield index_1.default.Offices.destroy({ where: { office_id: id } });
        res.json({ status: "Success", message: "Office deleted successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error deleting office");
    }
});
exports.deleteOffice = deleteOffice;
