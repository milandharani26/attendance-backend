import { Router } from "express"
import { createOffice, deleteOffice, getAllOffices, getOffice, getOfficesByOrgId, updateOffice } from "../controllers/office.controller";
// import { checkPermission } from "../middleware/authorization.middleware";
import { authenticateToken } from "../middleware/authentication.middleware";
import { checkPermission } from "../middleware/authorization.middleware";

const officeRouter = Router()


officeRouter.get("/", authenticateToken, checkPermission("GET_OFFICE_SAME_ORG"), getAllOffices);
officeRouter.post("/", authenticateToken, createOffice);
officeRouter.get("/:id", authenticateToken, getOffice);

officeRouter.get("/same-orgs/:id",
    authenticateToken,
    checkPermission("GET_OFFICE_SAME_ORG"),
    getOfficesByOrgId
);

officeRouter.put("/:id", updateOffice);
officeRouter.delete("/:id", deleteOffice);


export default officeRouter