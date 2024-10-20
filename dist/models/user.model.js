"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const db_helper_1 = __importDefault(require("../helpers/db.helper"));
const role_model_1 = __importDefault(require("./role.model"));
const organization_model_1 = __importDefault(require("./organization.model"));
const Users = db_helper_1.default.sequelize.define('users', {
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, uuid_1.v4)()
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING
    },
    user_email: {
        type: sequelize_1.DataTypes.STRING
    },
    user_password: {
        type: sequelize_1.DataTypes.STRING,
    },
    user_birthday: {
        type: sequelize_1.DataTypes.DATE,
    },
    role_id: {
        type: sequelize_1.DataTypes.UUID,
    },
    org_id: {
        type: sequelize_1.DataTypes.UUID,
    }
});
Users.belongsTo(role_model_1.default, { foreignKey: 'role_id' });
role_model_1.default.hasMany(Users, { foreignKey: 'role_id' });
Users.belongsTo(organization_model_1.default, { foreignKey: 'org_id' });
organization_model_1.default.hasMany(Users, { foreignKey: 'org_id' });
exports.default = Users;
