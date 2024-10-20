
import { DataTypes } from "sequelize"
import { v4 as uuidv4 } from 'uuid'
import db from "../helpers/db.helper"

const Roles = db.sequelize.define(
  'roles',
  {
    role_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    role_code: {
      type: DataTypes.INTEGER,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  },
)


export default Roles
