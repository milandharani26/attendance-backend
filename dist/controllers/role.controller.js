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
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRole = exports.getAllRoles = void 0;
const handleError_helper_1 = __importDefault(require("../helpers/handleError.helper"));
const index_1 = __importDefault(require("../models/index"));
// Get all roles
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRoles = yield index_1.default.Roles.findAll({});
        if (!allRoles || allRoles.length === 0) {
            res.status(404).json({ status: "Failure", message: "No roles found" });
        }
        res.json({ status: "Success", result: allRoles });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Failed to retrieve roles");
    }
});
exports.getAllRoles = getAllRoles;
// Get a specific role
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const role = yield index_1.default.Roles.findOne({ where: { role_id: id } });
        if (!role) {
            res.status(404).json({ status: "Failure", message: "Role not found" });
        }
        res.json({ status: "Success", result: role });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Failed to retrieve role");
    }
});
exports.getRole = getRole;
// Create a new role
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role_name, role_code } = req.body;
        const newRole = yield index_1.default.Roles.create({
            role_name,
            role_code,
        });
        if (!newRole) {
            res.status(400).json({ status: "Failure", message: "Failed to create role" });
        }
        res.status(201).json({ status: "Success", message: "Role created successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Failed to create role");
    }
});
exports.createRole = createRole;
// Update a role
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { role_name, role_code } = req.body;
        const [isRoleUpdated] = yield index_1.default.Roles.update({ role_name, role_code }, { where: { role_id: id } });
        if (!isRoleUpdated) {
            res.status(404).json({ status: "Failure", message: "Role not found or update failed" });
        }
        res.json({ status: "Success", message: "Role updated successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Failed to update role");
    }
});
exports.updateRole = updateRole;
// Delete a role
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const role = yield index_1.default.Roles.findOne({ where: { role_id: id } });
        if (!role) {
            res.status(404).json({ status: "Failure", message: "Role not found" });
        }
        yield index_1.default.Roles.destroy({ where: { role_id: id } });
        res.json({ status: "Success", message: "Role deleted successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Failed to delete role");
    }
});
exports.deleteRole = deleteRole;
