import { Router } from "express"
import { createPlan, deletePlan, getAllPlans, getPlan, updatePlan } from "../controllers/plan.controller"

const planRouter = Router()

planRouter.get("/", (req, res)=>{
    console.log("this first plan route")
})

// planRouter.get("/", getAllPlans)
// planRouter.post("/", createPlan)
// planRouter.get("/:id", getPlan)
// planRouter.put("/:id", updatePlan)
// planRouter.delete("/:id", deletePlan)


export default planRouter