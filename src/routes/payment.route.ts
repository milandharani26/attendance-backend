import { Router } from "express"
import { createPayments, deletePayment, getAllPayments, getPayment, updatePayment } from "../controllers/payment.controller"

const paymentRouter = Router()

paymentRouter.get("/", (req, res)=>{
    console.log("this first plan route")
})

// paymentRouter.get("/", getAllPayments)
// paymentRouter.post("/", createPayments)
// paymentRouter.get("/:id", getPayment)
// paymentRouter.put("/:id", updatePayment)
// paymentRouter.delete("/:id", deletePayment)


export default paymentRouter