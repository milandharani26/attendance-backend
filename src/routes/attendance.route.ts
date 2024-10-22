import { Router } from "express"
import { deleteAttendance, getAllAttendance, updateAttendance } from "../controllers/attendance.controller"

const attendanceRouter = Router()

attendanceRouter.get("/", getAllAttendance)
attendanceRouter.put("/:id", updateAttendance)
attendanceRouter.delete("/:id", deleteAttendance)


export default attendanceRouter