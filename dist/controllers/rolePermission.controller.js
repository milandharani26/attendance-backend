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
exports.deleteRolePermission = exports.updateRolePermission = exports.createRolePermission = exports.getRolePermission = exports.getAllRolePermission = void 0;
const index_js_1 = __importDefault(require("../models/index.js"));
const getAllRolePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRolePermission = yield index_js_1.default.RolePermissions.findAll();
        if (!allRolePermission) {
            res.json({ status: "No role permission found" });
            return;
        }
        res.json({ result: allRolePermission });
    }
    catch (error) {
        res.status(500).json({ status: "Error retrieving role permissions", error });
    }
});
exports.getAllRolePermission = getAllRolePermission;
const getRolePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const rolePermission = yield index_js_1.default.RolePermissions.findAll({
            where: { role_id: id },
            include: [
                {
                    model: index_js_1.default.Permissions,
                    as: 'permission',
                    attributes: ['permission_code'],
                },
            ],
        });
        if (!rolePermission) {
            res.json({ result: "Permission not found" });
            return;
        }
        const allPermissionForRole = rolePermission.map((permission) => permission.permission.permission_code);
        res.json({ result: allPermissionForRole });
    }
    catch (error) {
        res.status(500).json({ status: "Error retrieving role permission", error });
    }
});
exports.getRolePermission = getRolePermission;
const createRolePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role_id, role_name, permission_id } = req.body;
    try {
        const newRolePermission = yield index_js_1.default.RolePermissions.create({
            role_id,
            role_name,
            permission_id,
        });
        if (!newRolePermission) {
            res.status(400).json({ status: "404 client-side error" });
            return;
        }
        res.status(201).json({ status: "Success, created role permission" });
    }
    catch (error) {
        res.status(500).json({ status: "Error creating role permission", error });
    }
});
exports.createRolePermission = createRolePermission;
const updateRolePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role_id, role_name, permission_id } = req.body;
    try {
        const [isRolePermissionUpdated] = yield index_js_1.default.RolePermissions.update({
            role_id,
            role_name,
            permission_id,
        }, { where: { role_permission_id: id } });
        if (!isRolePermissionUpdated) {
            res.status(400).json({ status: "404 client-side error" });
            return;
        }
        res.json({ status: "Success, updated role permission" });
    }
    catch (error) {
        res.status(500).json({ status: "Error updating role permission", error });
    }
});
exports.updateRolePermission = updateRolePermission;
const deleteRolePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const rolePermission = yield index_js_1.default.RolePermissions.findOne({ where: { role_permission_id: id } });
        if (!rolePermission) {
            res.status(404).json({ status: "Failure", message: "Permission not found" });
        }
        yield index_js_1.default.RolePermissions.destroy({ where: { role_permission_id: id } });
        res.json({ status: "Success", message: "Permission deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ status: "Failure", message: "Error deleting permission", error });
    }
});
exports.deleteRolePermission = deleteRolePermission;
