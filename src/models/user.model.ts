import { DataTypes } from "sequelize"
import { v4 as uuidv4 } from 'uuid'
import db from "../helpers/db.helper"
import Roles from "./role.model"
import Organizations from "./organization.model"


const Users = db.sequelize.define(
    'users',
    {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        user_name: {
            type: DataTypes.STRING
        },
        user_email: {
            type: DataTypes.STRING
        },
        user_password: {
            type: DataTypes.STRING,
        },
        user_birthday: {
            type: DataTypes.DATE,
        },
        role_id: {
            type: DataTypes.UUID,
        },
        org_id: {
            type: DataTypes.UUID,
        }
    }
)

Users.belongsTo(Roles, { foreignKey: 'role_id' })
Roles.hasMany(Users, { foreignKey: 'role_id' })

Users.belongsTo(Organizations, { foreignKey: 'org_id' })
Organizations.hasMany(Users, { foreignKey: 'org_id' })

export default Users
