import { Router } from "express"

const attendanceRouter = Router()

attendanceRouter.get("/", (req, res)=>{
    console.log("this first plan route")
})


export default attendanceRouter