import { Router } from "express"

const orgRouter = Router()

orgRouter.get("/", (req, res)=>{
    console.log("this first plan route")
})

export default orgRouter