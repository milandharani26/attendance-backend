import db from "../helpers/db.helper"
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Organizations from "./organization.model";
import Plans from "./plan.model";

const Payments = db.sequelize.define(
    "payments", 
    { 
        payment_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    payment_amount: {
        type: DataTypes.STRING,
    },
    payment_date: {
        type: DataTypes.DATE,
    },
    org_id: {
        type: DataTypes.UUID,
    },
    plan_id: {
        type: DataTypes.UUID,
    }
});

Payments.belongsTo(Organizations, { foreignKey: "org_id" });
Organizations.hasMany(Payments, { foreignKey: "org_id" });

Payments.belongsTo(Plans, {foreignKey: "plan_id"})
Plans.hasMany(Payments, { foreignKey:"plan_id"})

export default Payments;
