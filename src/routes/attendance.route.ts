import { Router } from "express"
import { createAttendance, deleteAttendance, getAllAttendance, getAttendanceById, todayAttendanceCount, updateAttendance } from "../controllers/attendance.controller"

const attendanceRouter = Router()

attendanceRouter.get("/", getAllAttendance)
attendanceRouter.get("/count", todayAttendanceCount)
attendanceRouter.get("/:id", getAttendanceById)
attendanceRouter.post("/", createAttendance)
attendanceRouter.put("/:id", updateAttendance)
attendanceRouter.delete("/:id", deleteAttendance)
attendanceRouter.delete("/:id", deleteAttendance)


export default attendanceRouter