import { Router } from "express"
import helpers from "../helpers/index"
// import validators from "../validators/index"
import { getAllRolePermission } from "../controllers/rolePermission.controller"
import { createPermission, deletePermission, getPermission, updatePermission } from "../controllers/permission.controller"

const permissionRouter = Router()

permissionRouter.get("/", getAllRolePermission)
permissionRouter.post("/", createPermission)
permissionRouter.get("/:id", getPermission)
permissionRouter.put("/:id",  updatePermission)
permissionRouter.delete("/:id", deletePermission)
 

export default permissionRouter