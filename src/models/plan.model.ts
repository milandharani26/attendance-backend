import db from "../helpers/db.helper"
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

const Plans = db.sequelize.define(
    "plans", {
    plan_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    plan_amount: {
        type: DataTypes.STRING,
    },
    plan_description: {
        type: DataTypes.STRING
    },
    plan_type: {
        type: DataTypes.STRING,
    },
    plan_duration: {
        type: DataTypes.STRING,
    },
});

export default Plans;