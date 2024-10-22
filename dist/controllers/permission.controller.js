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
exports.deletePermission = exports.updatePermission = exports.createPermission = exports.getPermission = exports.getAllPermission = void 0;
const index_js_1 = __importDefault(require("../models/index.js"));
const getAllPermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPermission = yield index_js_1.default.Permissions.findAll();
        if (!allPermission) {
            res.json({ status: "No Permission found" });
            return;
        }
        res.json({ result: allPermission });
    }
    catch (error) {
        res.status(500).json({ status: "Error retrieving permissions", error });
    }
});
exports.getAllPermission = getAllPermission;
const getPermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const permission = yield index_js_1.default.Permissions.findOne({ where: { permission_id: id } });
        if (!permission) {
            res.json({ result: "Permission not found" });
            return;
        }
        res.json({ result: permission });
    }
    catch (error) {
        res.status(500).json({ status: "Error retrieving permission", error });
    }
});
exports.getPermission = getPermission;
const createPermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { permission_code, permission_name } = req.body;
    try {
        const newPermission = yield index_js_1.default.Permissions.create({
            permission_code,
            permission_name,
        });
        if (!newPermission) {
            res.status(400).json({ status: "404 client-side error" });
            return;
        }
        res.status(201).json({ status: "Success, created permission" });
    }
    catch (error) {
        res.status(500).json({ status: "Error creating permission", error });
    }
});
exports.createPermission = createPermission;
const updatePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { permission_code, permission_name } = req.body;
    try {
        const [isPermissionUpdated] = yield index_js_1.default.Permissions.update({
            permission_code,
            permission_name,
        }, { where: { permission_id: id } });
        if (!isPermissionUpdated) {
            res.status(400).json({ status: "404 client-side error" });
            return;
        }
        res.json({ status: "Success, updated permission" });
    }
    catch (error) {
        res.status(500).json({ status: "Error updating permission", error });
    }
});
exports.updatePermission = updatePermission;
const deletePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const permission = yield index_js_1.default.Permissions.findOne({ where: { permission_id: id } });
        if (!permission) {
            res.status(404).json({ status: "Failure", message: "Permission not found" });
            return;
        }
        yield index_js_1.default.Permissions.destroy({ where: { permission_id: id } });
        res.json({ status: "Success", message: "Permission deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting permission:", error);
        res.status(500).json({ status: "Failure", message: "Error deleting permission", error });
    }
});
exports.deletePermission = deletePermission;
