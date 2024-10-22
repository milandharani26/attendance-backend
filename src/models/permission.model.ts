import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import db from "../helpers/db.helper";

// Define the attributes for the Permissions model
interface PermissionsAttributes {
  permission_id: number;
  permission_code: string;
  permission_name: string;
  created_at: Date;
  updated_at: Date;
}

// Define the creation attributes for Permissions, excluding fields that will be auto-generated
interface PermissionsCreationAttributes extends Optional<PermissionsAttributes, 'permission_id' | 'created_at' | 'updated_at'> {}

// Define the model
class Permissions extends Model<PermissionsAttributes, PermissionsCreationAttributes> implements PermissionsAttributes {
  public permission_id!: number;
  public permission_code!: string;
  public permission_name!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Permissions.init(
  {
    permission_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    permission_code: {
      type: DataTypes.STRING,
    },
    permission_name: {
      type: DataTypes.STRING,
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
    sequelize: db.sequelize, // Pass the sequelize instance from your helper
    modelName: 'permissions',
    timestamps: false, // Disable default timestamps handling by Sequelize
  }
);

export default Permissions;
