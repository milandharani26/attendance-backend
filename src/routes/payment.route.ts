import { Router } from "express"

const paymentRouter = Router()

paymentRouter.get("/", (req, res)=>{
    console.log("this first plan route")
})


export default paymentRouter