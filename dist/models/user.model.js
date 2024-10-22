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
// Define the model class that extends Sequelize's Model class
class Users extends sequelize_1.Model {
}
// Initialize the Users model
Users.init({
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, uuid_1.v4)(),
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_age: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_birthday: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    role_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    org_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
}, {
    sequelize: db_helper_1.default.sequelize, // Pass the sequelize instance
    modelName: 'Users', // Model name
    tableName: 'users', // Optional: explicitly specify the table name if it differs
});
// Define associations
Users.belongsTo(role_model_1.default, { foreignKey: 'role_id' });
role_model_1.default.hasMany(Users, { foreignKey: 'role_id' });
Users.belongsTo(organization_model_1.default, { foreignKey: 'org_id' });
organization_model_1.default.hasMany(Users, { foreignKey: 'org_id' });
exports.default = Users;
