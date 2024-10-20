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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const index_js_1 = __importDefault(require("../models/index.js"));
const handleError_helper_js_1 = __importDefault(require("../helpers/handleError.helper.js"));
const getAllUsers = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield index_js_1.default.Users.findAll();
            // If no users are found
            if (!allUsers || allUsers.length === 0) {
                return res.status(404).json({
                    status: "error",
                    message: "No users found",
                });
            }
            // Return the fetched users with a 200 response
            return res.status(200).json({
                status: "success",
                result: allUsers,
            });
        }
        catch (error) {
            return (0, handleError_helper_js_1.default)(res, error, "Failed to retrieve all users");
        }
    });
};
exports.getAllUsers = getAllUsers;
const getUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield index_js_1.default.Users.findOne({ where: { user_id: id } });
            if (!user)
                res.json({ result: "user not found" });
            res.json({ result: user });
        }
        catch (error) {
            return (0, handleError_helper_js_1.default)(res, error, "Failed to retrieve user");
        }
    });
};
exports.getUser = getUser;
const createUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_name, user_email, user_password, user_birthday, role_id, org_id, } = req.body;
            const newUser = yield index_js_1.default.Users.create({
                user_name,
                user_email,
                user_password,
                user_birthday,
                role_id,
                org_id,
            });
            if (!newUser)
                res.status(400).json({ status: "404 client side error" });
            res.status(201).json({ status: "Success create User" });
        }
        catch (error) {
            return (0, handleError_helper_js_1.default)(res, error, "Failed to create user");
        }
    });
};
exports.createUser = createUser;
const updateUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { user_name, user_email, user_password, user_birthday, role_id, org_id, } = req.body;
        try {
            const [isUserUpdated] = yield index_js_1.default.Users.update({
                user_name,
                user_email,
                user_password,
                user_birthday,
                role_id,
                org_id,
            }, { where: { user_id: id } });
            if (!isUserUpdated) {
                return res.status(400).json({ status: "Failed to update user" });
            }
            return res.status(200).json({ status: "Success", message: "User updated" });
        }
        catch (error) {
            return (0, handleError_helper_js_1.default)(res, error, "Failed to update user");
        }
    });
};
exports.updateUser = updateUser;
const deleteUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            // Find the user to ensure it exists
            const user = yield index_js_1.default.Users.findOne({ where: { user_id: id } });
            if (!user) {
                return res.status(404).json({ status: "Failure", message: "User not found" });
            }
            // Delete the user
            yield index_js_1.default.Users.destroy({ where: { user_id: id } });
            return res.status(200).json({ status: "Success", message: "User deleted successfully" });
        }
        catch (error) {
            return (0, handleError_helper_js_1.default)(res, error, "Error deleting user");
        }
    });
};
exports.deleteUser = deleteUser;
