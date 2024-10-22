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
const index_1 = __importDefault(require("../models/index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Get all users
const getAllUsers = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield index_1.default.Users.findAll({});
            if (!allUsers || allUsers.length === 0) {
                res.json({ status: "No Users found" });
            }
            else {
                res.json({ status: "success", result: allUsers });
            }
        }
        catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ status: "Failure", message: "Error fetching users" });
        }
    });
};
exports.getAllUsers = getAllUsers;
// Get a specific user by ID
const getUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield index_1.default.Users.findOne({ where: { user_id: id } });
            if (!user) {
                res.status(404).json({ result: "user not found" });
            }
            res.json({ result: user });
        }
        catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ status: "Failure", message: "Error fetching user" });
        }
    });
};
exports.getUser = getUser;
// Create a new user
const createUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Request body:------------------", req.body);
        const { user_name, user_email, user_password, user_birthday, role_id, user_age, org_id, } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(user_password, 10);
        try {
            const newUser = yield index_1.default.Users.create({
                user_name,
                user_email,
                user_password: hashedPassword,
                user_birthday,
                role_id,
                user_age,
                org_id,
            });
            if (!newUser) {
                res.status(400).json({ status: "404 client side error" });
            }
            res.status(201).json({ status: "Success create User" });
        }
        catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ status: "Failure", message: "Error creating user" });
        }
    });
};
exports.createUser = createUser;
// Update an existing user
const updateUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { user_name, user_email, 
        // user_password, // we disable from front end 
        user_birthday, role_id, user_age, org_id, } = req.body;
        try {
            const [isUserUpdated] = yield index_1.default.Users.update({
                user_name,
                user_email,
                // user_password,
                user_birthday,
                role_id,
                user_age,
                org_id,
            }, { where: { user_id: id } });
            if (!isUserUpdated) {
                res.status(400).json({ status: "404 client side error" });
            }
            res.json({ status: "Success update User" });
        }
        catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ status: "Failure", message: "Error updating user" });
        }
    });
};
exports.updateUser = updateUser;
// Delete a user by ID
const deleteUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            // Find the User to ensure it exists
            const user = yield index_1.default.Users.findOne({ where: { user_id: id } });
            if (!user) {
                res.status(404).json({ status: "Failure", message: "User not found" });
            }
            // Delete the User
            yield index_1.default.Users.destroy({ where: { user_id: id } });
            res.json({ status: "Success", message: "User deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ status: "Failure", message: "Error deleting user", error });
        }
    });
};
exports.deleteUser = deleteUser;
