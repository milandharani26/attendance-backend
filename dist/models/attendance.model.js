"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_helper_1 = __importDefault(require("../helpers/db.helper"));
const uuid_1 = require("uuid");
const employee_model_1 = __importDefault(require("./employee.model"));
const Attendance = db_helper_1.default.sequelize.define('attendance', {
    attendance_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, uuid_1.v4)(),
    },
    emp_id: {
        type: sequelize_1.DataTypes.UUID,
    },
    attendance_date: {
        type: sequelize_1.DataTypes.DATE
    },
    entry_time: {
        type: sequelize_1.DataTypes.TIME,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: true
    },
    exit_time: {
        type: sequelize_1.DataTypes.TIME,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: true
    }
});
Attendance.belongsTo(employee_model_1.default, { foreignKey: "emp_id" });
employee_model_1.default.hasMany(Attendance, { foreignKey: "emp_id" });
exports.default = Attendance;
