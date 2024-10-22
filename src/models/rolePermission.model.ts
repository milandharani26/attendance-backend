import { DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import db from "../helpers/db.helper";
import Permissions from "./permission.model";
import Roles from "./role.model";

// Define the attributes for RolePermissions
interface RolePermissionsAttributes {
  role_permission_id: string;
  role_id: string;
  role_name: string;
  permission_id: number;
  created_at: Date;
  updated_at: Date;
}

// Define the creation attributes for RolePermissions, excluding the auto-generated fields
interface RolePermissionsCreationAttributes extends Optional<RolePermissionsAttributes, 'role_permission_id' | 'created_at' | 'updated_at'> {}

// Define the RolePermissions model
class RolePermissions extends Model<RolePermissionsAttributes, RolePermissionsCreationAttributes> implements RolePermissionsAttributes {
  public role_permission_id!: string;
  public role_id!: string;
  public role_name!: string;
  public permission_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
    permission: any;
}

RolePermissions.init(
  {
    role_permission_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    role_id: {
      type: DataTypes.UUID,
    },
    role_name: {
      type: DataTypes.STRING,
    },
    permission_id: {
      type: DataTypes.BIGINT.UNSIGNED,
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
    sequelize: db.sequelize, // Reference the sequelize instance from db.helper
    modelName: 'role_permissions',
    timestamps: false, // Disable default timestamps
  }
);

// Define associations
RolePermissions.belongsTo(Permissions, { foreignKey: 'permission_id' });
RolePermissions.belongsTo(Roles, { foreignKey: 'role_id' });
Roles.hasMany(RolePermissions, { foreignKey: 'role_id' });

export default RolePermissions;
