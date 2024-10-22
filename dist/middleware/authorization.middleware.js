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
exports.checkPermission = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../models")); // Adjust the path if needed
// Middleware to check if user has the required permission
const checkPermission = (requiredPermission) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ message: "Authorization token is required" });
            }
            // Verify the JWT token
            const decoded = jsonwebtoken_1.default.verify(token, "password");
            req.user = decoded;
            console.log(decoded, "Decoded token");
            const { id } = req.params; // Assuming you have `role_id` in params
            const rolePermission = yield models_1.default.RolePermissions.findAll({
                where: { role_id: id },
                include: [
                    {
                        model: models_1.default.Permissions,
                        as: "permission",
                        attributes: ["permission_code"],
                    },
                ],
            });
            const allPermissionForRole = rolePermission.map((permission) => permission.permission.permission_code);
            // Check if the user has the required permission
            if (allPermissionForRole.includes(requiredPermission)) {
                return next(); // User has the permission, proceed to the next middleware/route
            }
            return res.status(403).json({ message: "User not authorized" });
        }
        catch (error) {
            return res.status(500).json({ message: "Server error", error });
        }
    });
};
exports.checkPermission = checkPermission;
