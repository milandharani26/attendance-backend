import db from "../helpers/db.helper"
import { DataTypes, UUIDV4 } from "sequelize"
import { v4 as uuidv4 } from 'uuid'
import Users from "./user.model"
import Offices from "./office.model"
import Organizations from "./organization.model"

const Employees = db.sequelize.define(
    'employee',
    {
        emp_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        user_id: {
            type: DataTypes.UUID,
        },
        office_id: {
            type: DataTypes.UUID,
        },
        org_id: {
            type: DataTypes.UUID,
        },
        emp_department: {
            type: DataTypes.STRING
        },
        emp_designation: {
            type: DataTypes.STRING
        },
        emp_encoded_image: {
            type: DataTypes.STRING
        }

    }
)

Employees.belongsTo(Users, { foreignKey: "user_id" })
Users.hasMany(Employees, { foreignKey: "user_id" })


Employees.belongsTo(Offices, { foreignKey: "office_id" })
Offices.hasMany(Employees, { foreignKey: "office_id" })


Employees.belongsTo(Organizations, { foreignKey: "org_id" })
Organizations.hasMany(Employees, { foreignKey: "org_id" })


export default Employees 