import { Router } from "express"
import { createPayments, deletePayment, getAllPayments, getPayment, order, updatePayment, validateOrder } from "../controllers/payment.controller"

const paymentRouter = Router()

paymentRouter.get("/", getAllPayments)
paymentRouter.post("/", createPayments)
paymentRouter.post("/order", order)
paymentRouter.post("/validate", validateOrder)
paymentRouter.get("/:id", getPayment)
paymentRouter.put("/:id", updatePayment)
paymentRouter.delete("/:id", deletePayment)


export default paymentRouter