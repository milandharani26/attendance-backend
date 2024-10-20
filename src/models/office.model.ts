import db from "../helpers/db.helper"
import { DataTypes, UUIDV4 } from "sequelize"
import { v4 as uuidv4 } from 'uuid'
import Organizations from "./organization.model"

const Offices = db.sequelize.define(
    'office',
    {
        office_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        office_name: {
            type: DataTypes.STRING,
        },
        office_location: {
            type: DataTypes.STRING,
        },
        office_email: {
            type: DataTypes.STRING
        },
        org_id: {
            type: DataTypes.UUID,
        }

    }
)

Offices.belongsTo(Organizations, { foreignKey: "org_id" })
Organizations.hasMany(Offices, { foreignKey: "org_id" })

export default Offices   