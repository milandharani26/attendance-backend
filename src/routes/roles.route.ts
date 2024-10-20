import { Router } from "express"
import { createRole, getAllRoles, getRole, updateRole, deleteRole } from "../controllers/role.controller"

const roleRouter = Router()

roleRouter.get("/", (req, res)=>{
    console.log("this first plan route")
})

// roleRouter.get("/", getAllRoles)
// roleRouter.post("/", createRole)
// roleRouter.get("/:id", getRole)
// roleRouter.put("/:id", updateRole)
// roleRouter.delete("/:id", deleteRole)


export default roleRouter