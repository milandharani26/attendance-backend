"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planRouter = (0, express_1.Router)();
planRouter.get("/", (req, res) => {
    console.log("this first plan route");
});
// planRouter.get("/", getAllPlans)
// planRouter.post("/", createPlan)
// planRouter.get("/:id", getPlan)
// planRouter.put("/:id", updatePlan)
// planRouter.delete("/:id", deletePlan)
exports.default = planRouter;
