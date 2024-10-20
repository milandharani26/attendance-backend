import db from "../helpers/db.helper"
import { DataTypes } from "sequelize"
import { v4 as uuidv4 } from 'uuid'

const Organizations = db.sequelize.define(
    'organization',
    {
        org_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        org_name: {
            type: DataTypes.STRING,
        },
        org_email:{
            type : DataTypes.STRING
        }
    }
)

export default Organizations
