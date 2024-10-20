import { DataTypes } from 'sequelize'
import db from "../helpers/db.helper"
import { v4 as uuidv4 } from 'uuid'

const Configuration = db.sequelize.define(
    'configuration',
    {
      configuration_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      org_admin_template: {
        type: DataTypes.TEXT,
      },
      org_admin_email_subject: {
        type: DataTypes.TEXT,
      },
      office_admin_template: {
        type: DataTypes.TEXT,
      },
      office_admin_email_subject: {
        type: DataTypes.TEXT,
      },
      emp_template: {
        type: DataTypes.TEXT,
      },
      emp_email_subject: {
        type: DataTypes.TEXT,
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
      // Disable timestamps
      timestamps: false,
    },
)

export default Configuration
