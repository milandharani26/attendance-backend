"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentRouter = (0, express_1.Router)();
paymentRouter.get("/", (req, res) => {
    console.log("this first plan route");
});
// paymentRouter.get("/", getAllPayments)
// paymentRouter.post("/", createPayments)
// paymentRouter.get("/:id", getPayment)
// paymentRouter.put("/:id", updatePayment)
// paymentRouter.delete("/:id", deletePayment)
exports.default = paymentRouter;
