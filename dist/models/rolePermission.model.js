"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const db_helper_1 = __importDefault(require("../helpers/db.helper"));
const permission_model_1 = __importDefault(require("./permission.model"));
const role_model_1 = __importDefault(require("./role.model"));
// Define the RolePermissions model
class RolePermissions extends sequelize_1.Model {
}
RolePermissions.init({
    role_permission_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, uuid_1.v4)(),
    },
    role_id: {
        type: sequelize_1.DataTypes.UUID,
    },
    role_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    permission_id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
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
    sequelize: db_helper_1.default.sequelize, // Reference the sequelize instance from db.helper
    modelName: 'role_permissions',
    timestamps: false, // Disable default timestamps
});
// Define associations
RolePermissions.belongsTo(permission_model_1.default, { foreignKey: 'permission_id' });
RolePermissions.belongsTo(role_model_1.default, { foreignKey: 'role_id' });
role_model_1.default.hasMany(RolePermissions, { foreignKey: 'role_id' });
exports.default = RolePermissions;
