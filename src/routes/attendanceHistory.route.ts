import { Router } from "express"
import { getAllAttendanceHistory } from "../controllers/attendanceHistory.controller"

const attendanceHistoryRouter = Router()

attendanceHistoryRouter.post("/", getAllAttendanceHistory)


export default attendanceHistoryRouter