import { Router } from "express"

const planRouter = Router()

planRouter.get("/", (req, res)=>{
    console.log("this first plan route")
})


export default planRouter