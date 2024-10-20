"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_helper_1 = __importDefault(require("../helpers/db.helper"));
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const organization_model_1 = __importDefault(require("./organization.model"));
const plan_model_1 = __importDefault(require("./plan.model"));
const Payments = db_helper_1.default.sequelize.define("payments", {
    payment_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, uuid_1.v4)(),
    },
    payment_amount: {
        type: sequelize_1.DataTypes.STRING,
    },
    payment_date: {
        type: sequelize_1.DataTypes.DATE,
    },
    org_id: {
        type: sequelize_1.DataTypes.UUID,
    },
    plan_id: {
        type: sequelize_1.DataTypes.UUID,
    }
});
Payments.belongsTo(organization_model_1.default, { foreignKey: "org_id" });
organization_model_1.default.hasMany(Payments, { foreignKey: "org_id" });
Payments.belongsTo(plan_model_1.default, { foreignKey: "plan_id" });
plan_model_1.default.hasMany(Payments, { foreignKey: "plan_id" });
exports.default = Payments;
