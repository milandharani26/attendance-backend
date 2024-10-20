"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_helper_1 = __importDefault(require("../helpers/db.helper"));
const uuid_1 = require("uuid");
const Configuration = db_helper_1.default.sequelize.define('configuration', {
    configuration_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, uuid_1.v4)(),
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    org_admin_template: {
        type: sequelize_1.DataTypes.TEXT,
    },
    org_admin_email_subject: {
        type: sequelize_1.DataTypes.TEXT,
    },
    office_admin_template: {
        type: sequelize_1.DataTypes.TEXT,
    },
    office_admin_email_subject: {
        type: sequelize_1.DataTypes.TEXT,
    },
    emp_template: {
        type: sequelize_1.DataTypes.TEXT,
    },
    emp_email_subject: {
        type: sequelize_1.DataTypes.TEXT,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    // Disable timestamps
    timestamps: false,
});
exports.default = Configuration;
