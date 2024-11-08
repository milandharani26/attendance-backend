import { Router } from "express"
import { createAttendance, deleteAttendance, getAllAttendance, todayAttendanceCount, updateAttendance } from "../controllers/attendance.controller"

const attendanceRouter = Router()

attendanceRouter.get("/", getAllAttendance)
attendanceRouter.post("/", createAttendance)
attendanceRouter.put("/:id", updateAttendance)
attendanceRouter.delete("/:id", deleteAttendance)
attendanceRouter.delete("/:id", deleteAttendance)
attendanceRouter.get("/count", todayAttendanceCount)


export default attendanceRouter