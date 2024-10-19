import { Router } from "express"

const roleRouter = Router()

roleRouter.get("/", (req, res)=>{
    console.log("this first role route")
})


export default roleRouter