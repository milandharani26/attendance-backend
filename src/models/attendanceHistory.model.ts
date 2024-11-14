import { DataTypes, Model, Optional } from 'sequelize';
import db from '../helpers/db.helper';
import { v4 as uuidv4 } from 'uuid';
import Employees from './employee.model';

interface AttendanceHistoryAttributes {
    attendance_history_id: string;
    emp_id: string;
    attendance_date: Date;
    attendance_status: string; // Change to 'absent' | 'present' if you want stricter typing.
}

// Allow `attendance_history_id` to be optional for creation
interface AttendanceHistoryCreationAttributes extends Optional<AttendanceHistoryAttributes, 'attendance_history_id'> { }

class AttendanceHistory extends Model<AttendanceHistoryAttributes, AttendanceHistoryCreationAttributes>
    implements AttendanceHistoryAttributes {
    public attendance_history_id!: string;
    public emp_id!: string;
    public attendance_date!: Date;
    public attendance_status!: string;
}

AttendanceHistory.init(
    {
        attendance_history_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: uuidv4,
        },
        emp_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        attendance_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        attendance_status: {
            type: DataTypes.STRING, // Use ENUM if you want stricter typing: DataTypes.ENUM('absent', 'present')
            allowNull: false,
        },
    },
    {
        sequelize: db.sequelize,
        tableName: 'attendance_history',
        timestamps: false,
    }
);

// Associations
AttendanceHistory.belongsTo(Employees, { foreignKey: 'emp_id' });
Employees.hasMany(AttendanceHistory, { foreignKey: 'emp_id' });

export default AttendanceHistory;
