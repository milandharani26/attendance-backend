import { Router } from "express"
import { createOrganization, deleteOrganization, getAllOrganizations, getOrganization, updateOrganization } from "../controllers/organization.controller"

const orgRouter = Router()

orgRouter.get("/", (req, res)=>{
    console.log("this first plan route")
})

// orgRouter.get("/", getAllOrganizations)
// orgRouter.post( "/", createOrganization)
// orgRouter.get("/:id", getOrganization)
// orgRouter.put("/:id", updateOrganization)
// orgRouter.delete("/:id", deleteOrganization)

export default orgRouter