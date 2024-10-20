"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_helper_1 = __importDefault(require("../helpers/db.helper"));
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const organization_model_1 = __importDefault(require("./organization.model"));
const Offices = db_helper_1.default.sequelize.define('office', {
    office_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, uuid_1.v4)()
    },
    office_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    office_location: {
        type: sequelize_1.DataTypes.STRING,
    },
    office_email: {
        type: sequelize_1.DataTypes.STRING
    },
    org_id: {
        type: sequelize_1.DataTypes.UUID,
    }
});
Offices.belongsTo(organization_model_1.default, { foreignKey: "org_id" });
organization_model_1.default.hasMany(Offices, { foreignKey: "org_id" });
exports.default = Offices;
