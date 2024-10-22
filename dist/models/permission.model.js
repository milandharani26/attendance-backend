"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_helper_1 = __importDefault(require("../helpers/db.helper"));
// Define the model
class Permissions extends sequelize_1.Model {
}
Permissions.init({
    permission_id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    permission_code: {
        type: sequelize_1.DataTypes.STRING,
    },
    permission_name: {
        type: sequelize_1.DataTypes.STRING,
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
    sequelize: db_helper_1.default.sequelize, // Pass the sequelize instance from your helper
    modelName: 'permissions',
    timestamps: false, // Disable default timestamps handling by Sequelize
});
exports.default = Permissions;
