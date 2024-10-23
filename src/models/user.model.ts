import { DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import db from "../helpers/db.helper";
import Roles from "./role.model";
import Organizations from "./organization.model";

// Define User attributes with required and optional fields
interface UserAttributes {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_birthday: Date;
    role_id: string;
    org_id: string;
    user_age : string
    resetOtp: string | null;
    resetOtpExpires: string | null;
}

// Optional fields for model creation (user_id is automatically generated)
interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

// Define the User model class
class Users extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: string;
    public user_name!: string;
    public user_email!: string;
    public user_password!: string;
    public user_age!: string;
    public user_birthday!: Date;
    public role_id!: string;
    public org_id!: string;
    public resetOtp!: string | null;
    public resetOtpExpires!: string | null;

    // Timestamps (optional)
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model definition
Users.init(
    {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: uuidv4
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_age: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_birthday: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        org_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        resetOtp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resetOtpExpires: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db.sequelize, // pass the sequelize instance
        modelName: 'Users',
        tableName: 'users',
        timestamps: true, // to enable createdAt and updatedAt
    }
);

// Define associations
Users.belongsTo(Roles, { foreignKey: 'role_id' });
Roles.hasMany(Users, { foreignKey: 'role_id' });

Users.belongsTo(Organizations, { foreignKey: 'org_id' });
Organizations.hasMany(Users, { foreignKey: 'org_id' });

export default Users;
