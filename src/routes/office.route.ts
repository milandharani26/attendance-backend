import { Router } from "express"
import { createOffice, deleteOffice, getAllOffices, getOffice, getOfficesByOrgId, updateOffice } from "../controllers/office.controller";

const officeRouter = Router()

officeRouter.get("/", (req, res)=>{
    console.log("this first plan route")
})

// officeRouter.get("/", getAllOffices);
// officeRouter.post("/", createOffice);
// officeRouter.get("/:id", getOffice);
// officeRouter.get("/same-orgs/:id", getOfficesByOrgId);
// officeRouter.put("/:id", updateOffice);
// officeRouter.delete("/:id", deleteOffice);


export default officeRouter