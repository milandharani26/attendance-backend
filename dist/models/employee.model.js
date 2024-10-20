"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_helper_1 = __importDefault(require("../helpers/db.helper"));
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const user_model_1 = __importDefault(require("./user.model"));
const office_model_1 = __importDefault(require("./office.model"));
const organization_model_1 = __importDefault(require("./organization.model"));
const Employees = db_helper_1.default.sequelize.define('employee', {
    emp_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, uuid_1.v4)()
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
    },
    office_id: {
        type: sequelize_1.DataTypes.UUID,
    },
    org_id: {
        type: sequelize_1.DataTypes.UUID,
    },
    emp_department: {
        type: sequelize_1.DataTypes.STRING
    },
    emp_designation: {
        type: sequelize_1.DataTypes.STRING
    },
    emp_encoded_image: {
        type: sequelize_1.DataTypes.STRING
    }
});
Employees.belongsTo(user_model_1.default, { foreignKey: "user_id" });
user_model_1.default.hasMany(Employees, { foreignKey: "user_id" });
Employees.belongsTo(office_model_1.default, { foreignKey: "office_id" });
office_model_1.default.hasMany(Employees, { foreignKey: "office_id" });
Employees.belongsTo(organization_model_1.default, { foreignKey: "org_id" });
organization_model_1.default.hasMany(Employees, { foreignKey: "org_id" });
exports.default = Employees;
