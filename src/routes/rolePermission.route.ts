import { Router } from "express"
import { createRolePermission, deleteRolePermission, getAllRolePermission, getRolePermission, updateRolePermission } from "../controllers/rolePermission.controller"
// import helpers from "../helpers/index"

const rolePermissionRouter = Router()

rolePermissionRouter.get("/", getAllRolePermission)
rolePermissionRouter.post("/", createRolePermission)
rolePermissionRouter.get("/:id", getRolePermission)
rolePermissionRouter.put("/:id",  updateRolePermission)
rolePermissionRouter.delete("/:id", deleteRolePermission)
 

export default rolePermissionRouter