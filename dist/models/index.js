"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const role_model_1 = __importDefault(require("./role.model"));
const plan_model_1 = __importDefault(require("./plan.model"));
const payment_model_1 = __importDefault(require("./payment.model"));
const organization_model_1 = __importDefault(require("./organization.model"));
const office_model_1 = __importDefault(require("./office.model"));
const employee_model_1 = __importDefault(require("./employee.model"));
const configuration_model_1 = __importDefault(require("./configuration.model"));
const attendance_model_1 = __importDefault(require("./attendance.model"));
const permission_model_1 = __importDefault(require("./permission.model"));
const rolePermission_model_1 = __importDefault(require("./rolePermission.model"));
const models = {
    Users: user_model_1.default,
    Roles: role_model_1.default,
    Plans: plan_model_1.default,
    Payments: payment_model_1.default,
    Organizations: organization_model_1.default,
    Offices: office_model_1.default,
    Employees: employee_model_1.default,
    Configuration: configuration_model_1.default,
    Attendance: attendance_model_1.default,
    Permissions: permission_model_1.default,
    RolePermissions: rolePermission_model_1.default
};
exports.default = models;
