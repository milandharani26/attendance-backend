"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_helper_1 = __importDefault(require("../helpers/db.helper"));
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const Plans = db_helper_1.default.sequelize.define("plans", {
    plan_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, uuid_1.v4)(),
    },
    plan_amount: {
        type: sequelize_1.DataTypes.STRING,
    },
    plan_description: {
        type: sequelize_1.DataTypes.STRING
    },
    plan_type: {
        type: sequelize_1.DataTypes.STRING,
    },
    plan_duration: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.default = Plans;
