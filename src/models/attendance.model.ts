import { DataTypes } from 'sequelize'
import db from "../helpers/db.helper"
import { v4 as uuidv4 } from 'uuid'
import Employees from './employee.model'

const Attendance = db.sequelize.define(
    'attendance',
    {
      attendance_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      emp_id: {
        type: DataTypes.UUID,
      },
      attendance_date:{
        type : DataTypes.DATE
      },
      entry_time:{
        type : DataTypes.TIME,
        defaultValue: DataTypes.NOW,
        allowNull : true
      },
      exit_time:{
        type : DataTypes.TIME,
        defaultValue: DataTypes.NOW,
        allowNull: true
      }
    },
)

Attendance.belongsTo(Employees, {foreignKey:"emp_id"})
Employees.hasMany(Attendance, {foreignKey:"emp_id"})


export default Attendance


