import { Router } from "express"

const officeRouter = Router()

officeRouter.get("/", (req, res)=>{
    console.log("this first plan route")
})


export default officeRouter