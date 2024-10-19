import { Router } from "express"

const employeeRouter = Router()

employeeRouter.get("/", (req, res)=>{
    console.log("this first plan route")
})


export default employeeRouter