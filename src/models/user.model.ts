import { DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import db from "../helpers/db.helper";
import Roles from "./role.model";
import Organizations from "./organization.model";

// Define the attributes for the Users model
interface UserAttributes {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_age: string;
    user_birthday: Date;
    role_id: string;
    org_id: string;
}

// Define creation attributes to allow optional fields during creation (like user_id, which will be auto-generated)
interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

// Define the model class that extends Sequelize's Model class
class Users extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: string;
    public user_name!: string;
    public user_email!: string;
    public user_password!: string;
    public user_age!: string;
    public user_birthday!: Date;
    public role_id!: string;
    public org_id!: string;

    // Timestamps are optional, depending on whether they're used
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the Users model
Users.init(
    {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4(),
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_age: {
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
    },
    {
        sequelize: db.sequelize, // Pass the sequelize instance
        modelName: 'Users',      // Model name
        tableName: 'users',      // Optional: explicitly specify the table name if it differs
    }
);

// Define associations
Users.belongsTo(Roles, { foreignKey: 'role_id' });
Roles.hasMany(Users, { foreignKey: 'role_id' });

Users.belongsTo(Organizations, { foreignKey: 'org_id' });
Organizations.hasMany(Users, { foreignKey: 'org_id' });

export default Users;
